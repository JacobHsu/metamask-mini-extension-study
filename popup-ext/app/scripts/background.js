import endOfStream from 'end-of-stream'
import extension from 'extensionizer'
import PortStream from 'extension-port-stream'
import ReadOnlyNetworkStore from './lib/network-store'
import LocalStore from './lib/local-store'
import log from 'loglevel'
import ExtensionPlatform from './platforms/extension'
import Migrator from './lib/migrator'
import migrations from './migrations'
import MetamaskController from './metamask-controller'
import rawFirstTimeState from './first-time-state'
import setupSentry from './lib/setupSentry'
import getFirstPreferredLangCode from './lib/get-first-preferred-lang-code'
import getObjStructure from './lib/getObjStructure'

import {
    ENVIRONMENT_TYPE_POPUP,
    ENVIRONMENT_TYPE_NOTIFICATION,
    ENVIRONMENT_TYPE_FULLSCREEN,
  } from './lib/enums'

// METAMASK_TEST_CONFIG is used in e2e tests to set the default network to localhost
const firstTimeState = Object.assign({}, rawFirstTimeState, global.METAMASK_TEST_CONFIG)

const platform = new ExtensionPlatform()

// setup sentry error reporting
const release = platform.getVersion()
const sentry = setupSentry({ release })

let popupIsOpen = false
let notificationIsOpen = false
const openMetamaskTabsIDs = {}
const requestAccountTabIds = {}

// state persistence
const inTest = process.env.IN_TEST === 'true'
const localStore = inTest
  ? new ReadOnlyNetworkStore()
  : new LocalStore()
let versionedData

// initialization flow
initialize().catch(log.error)

/**
 * Initializes the MetaMask controller, and sets up all platform configuration.
 * @returns {Promise} - Setup complete.
 */
async function initialize () {
    const initState = await loadStateFromPersistence()
    const initLangCode = await getFirstPreferredLangCode()
    await setupController(initState, initLangCode)
    log.debug('MetaMask initialization complete.')
}
//
// State and Persistence
//

/**
 * Loads any stored data, prioritizing the latest storage strategy.
 * Migrates that data schema in case it was last loaded on an older version.
 * @returns {Promise<MetaMaskState>} - Last data emitted from previous instance of MetaMask.
 */
async function loadStateFromPersistence () {
    // migrations
    const migrator = new Migrator({ migrations })

    // read from disk
    // first from preferred, async API:
    versionedData = (await localStore.get()) ||
                    migrator.generateInitialState(firstTimeState)
             
    // check if somehow state is empty
    // this should never happen but new error reporting suggests that it has
    // for a small number of users
    // https://github.com/metamask/metamask-extension/issues/3919
    if (versionedData && !versionedData.data) {
      // unable to recover, clear state
      versionedData = migrator.generateInitialState(firstTimeState)
      sentry.captureMessage('MetaMask - Empty vault found - unable to recover')
    }

    // report migration errors to sentry
    migrator.on('error', (err) => {
      // get vault structure without secrets
      const vaultStructure = getObjStructure(versionedData)
      sentry.captureException(err, {
        // "extra" key is required by Sentry
        extra: { vaultStructure },
      })
    })

    // migrate data
    versionedData = await migrator.migrateData(versionedData)
    if (!versionedData) {
      throw new Error('MetaMask - migrator returned undefined')
    }

    // write to disk
    if (localStore.isSupported) {
      localStore.set(versionedData)
    } else {
      // throw in setTimeout so as to not block boot
      setTimeout(() => {
        throw new Error('MetaMask - Localstore not supported')
      })
    }

    // return just the data
    return versionedData.data
}
  
/**
 * Initializes the MetaMask Controller with any initial state and default language.
 * Configures platform-specific error reporting strategy.
 * Streams emitted state updates to platform-specific storage strategy.
 * Creates platform listeners for new Dapps/Contexts, and sets up their data connections to the controller.
 *
 * @param {Object} initState - The initial state to start the controller with, matches the state that is emitted from the controller.
 * @param {string} initLangCode - The region code for the language preferred by the current user.
 * @returns {Promise} - After setup is complete.
 */
function setupController (initState, initLangCode) {
    //
    // MetaMask Controller
    //
  
    const controller = new MetamaskController({
      // User confirmation callbacks:
      showUnconfirmedMessage: triggerUi,
      showUnapprovedTx: triggerUi,
      //openPopup: openPopup,
      //closePopup: notificationManager.closePopup.bind(notificationManager),
      // initial state
      initState,
      // initial locale code
      initLangCode,
      // platform specific api
      platform,
      getRequestAccountTabIds: () => {
        return requestAccountTabIds
      },
      getOpenMetamaskTabsIds: () => {
        return openMetamaskTabsIDs
      },
    })

  
    //
    // connect to other contexts
    //
    extension.runtime.onConnect.addListener(connectRemote)
    extension.runtime.onConnectExternal.addListener(connectExternal)
  
    const metamaskInternalProcessHash = {
      [ENVIRONMENT_TYPE_POPUP]: true,
      [ENVIRONMENT_TYPE_NOTIFICATION]: true,
      [ENVIRONMENT_TYPE_FULLSCREEN]: true,
    }
  
    const metamaskBlacklistedPorts = [
      'trezor-connect',
    ]
  
    const isClientOpenStatus = () => {
      return popupIsOpen || Boolean(Object.keys(openMetamaskTabsIDs).length) || notificationIsOpen
    }
  
    /**
     * A runtime.Port object, as provided by the browser:
     * @see https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port
     * @typedef Port
     * @type Object
     */
  
    /**
     * Connects a Port to the MetaMask controller via a multiplexed duplex stream.
     * This method identifies trusted (MetaMask) interfaces, and connects them differently from untrusted (web pages).
     * @param {Port} remotePort - The port provided by a new context.
     */
    function connectRemote (remotePort) {
      const processName = remotePort.name
      const isMetaMaskInternalProcess = metamaskInternalProcessHash[processName]
  console.log('[background.js] remotePort.name', processName)
      if (metamaskBlacklistedPorts.includes(remotePort.name)) {
        return false
      }
  
      if (isMetaMaskInternalProcess) {
        const portStream = new PortStream(remotePort)
        // communication with popup
        controller.isClientOpen = true
        controller.setupTrustedCommunication(portStream, remotePort.sender)
  
        if (processName === ENVIRONMENT_TYPE_POPUP) {
          popupIsOpen = true
  
          endOfStream(portStream, () => {
            popupIsOpen = false
            controller.isClientOpen = isClientOpenStatus()
          })
        }
  
        if (processName === ENVIRONMENT_TYPE_NOTIFICATION) {
          notificationIsOpen = true
  
          endOfStream(portStream, () => {
            notificationIsOpen = false
            controller.isClientOpen = isClientOpenStatus()
          })
        }
  
        if (processName === ENVIRONMENT_TYPE_FULLSCREEN) {
          const tabId = remotePort.sender.tab.id
          openMetamaskTabsIDs[tabId] = true
  
          endOfStream(portStream, () => {
            delete openMetamaskTabsIDs[tabId]
            controller.isClientOpen = isClientOpenStatus()
          })
        }
      } else {
        if (remotePort.sender && remotePort.sender.tab && remotePort.sender.url) {
          const tabId = remotePort.sender.tab.id
          const url = new URL(remotePort.sender.url)
          const origin = url.hostname
  
          remotePort.onMessage.addListener(msg => {
            if (msg.data && msg.data.method === 'eth_requestAccounts') {
              requestAccountTabIds[origin] = tabId
            }
          })
        }
        connectExternal(remotePort)
      }
    }
  
    // communication with page or other extension
    function connectExternal (remotePort) {
      const portStream = new PortStream(remotePort)
      controller.setupUntrustedCommunication(portStream, remotePort.sender)
    }
    
    return Promise.resolve()
}

//
// Etc...
//

/**
 * Opens the browser popup for user confirmation
 */
function triggerUi () {
    // extension.tabs.query({ active: true }, tabs => {
    //   const currentlyActiveMetamaskTab = Boolean(tabs.find(tab => openMetamaskTabsIDs[tab.id]))
    //   if (!popupIsOpen && !currentlyActiveMetamaskTab && !notificationIsOpen) {
    //     notificationManager.showPopup()
    //     notificationIsOpen = true
    //   }
    // })
}