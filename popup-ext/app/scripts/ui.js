import { getEnvironmentType } from './lib/util'

import {
    ENVIRONMENT_TYPE_NOTIFICATION,
    ENVIRONMENT_TYPE_FULLSCREEN,
    ENVIRONMENT_TYPE_POPUP,
  } from './lib/enums'

import extension from 'extensionizer'
import ExtensionPlatform from './platforms/extension'
import NotificationManager from './lib/notification-manager'
const notificationManager = new NotificationManager()
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

}

