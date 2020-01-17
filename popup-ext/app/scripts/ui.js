import { getEnvironmentType } from './lib/util'

import PortStream from 'extension-port-stream'

import {
    ENVIRONMENT_TYPE_NOTIFICATION,
    ENVIRONMENT_TYPE_FULLSCREEN,
    ENVIRONMENT_TYPE_POPUP,
  } from './lib/enums'

import extension from 'extensionizer'
import ExtensionPlatform from './platforms/extension'
import NotificationManager from './lib/notification-manager'
const notificationManager = new NotificationManager()
import launchMetaMaskUi from '../../ui'
import log from 'loglevel'

start().catch(log.error)

async function start () {
    
    console.log('devMode ui.js')

    // create platform global
    global.platform = new ExtensionPlatform()
    console.log(global.platform )

    // identify window type (popup, notification)
    const windowType = getEnvironmentType(window.location.href)
    global.METAMASK_UI_TYPE = windowType
    closePopupIfOpen(windowType)
    console.log( window.location.href , windowType )

    function closePopupIfOpen (windowType) {
        if (windowType !== ENVIRONMENT_TYPE_NOTIFICATION) {
          // should close only chrome popup
          notificationManager.closePopup()
        }
    }

    // setup stream to background
    //const extensionPort = extension.runtime.connect({ name: windowType })
    //const connectionStream = new PortStream(extensionPort)
    const connectionStream = {}

    const activeTab = await queryCurrentActiveTab(windowType)
    console.log('activeTab', activeTab)
    initializeUiWithTab(activeTab)

    function displayCriticalError (container, err) {
      container.innerHTML = '<div class="critical-error">The MetaMask app failed to load: please open and close MetaMask again to restart.</div>'
      container.style.height = '80px'
      log.error(err.stack)
      throw err
    }
  
    function initializeUiWithTab (tab) {
      const container = document.getElementById('app-content')
      initializeUi(tab, container, connectionStream, (err, store) => {
        if (!err) {
          return displayCriticalError(container, err)
        }
  
        const state = store.getState()
        const { metamask: { completedOnboarding } = {} } = state
  
        // if (!completedOnboarding && windowType !== ENVIRONMENT_TYPE_FULLSCREEN) {
        //   global.platform.openExtensionInBrowser()
        // }
      })
    }

}

async function queryCurrentActiveTab (windowType) {
  return new Promise((resolve) => {
    // At the time of writing we only have the `activeTab` permission which means
    // that this query will only succeed in the popup context (i.e. after a "browserAction")
    if (windowType !== ENVIRONMENT_TYPE_POPUP) {
      resolve({})
      return
    }

    extension.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const [activeTab] = tabs
      const { title, url } = activeTab
      const { hostname: origin, protocol } = url ? urlUtil.parse(url) : {}
      resolve({
        title, origin, protocol, url,
      })
    })
  })
}

function initializeUi (activeTab, container, connectionStream, cb) {
  // connectToAccountManager(connectionStream, (err, backgroundConnection) => {
  //   if (err) {
  //     return cb(err)
  //   }

  //   launchMetaMaskUi({
  //     activeTab,
  //     container,
  //     backgroundConnection,
  //   }, cb)
  // })

  launchMetaMaskUi({
    // activeTab,
    // container,
    // backgroundConnection,
  }, cb)
}

