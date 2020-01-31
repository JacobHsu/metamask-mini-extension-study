import React from 'react'

import log from 'loglevel'

import { render } from 'react-dom'
import Root from './app/pages'
import * as actions from './app/store/actions'
import configureStore from './app/store/store'
import { fetchLocale } from './app/helpers/utils/i18n-helper'


export default launchMetamaskUi

log.setLevel(global.METAMASK_DEBUG ? 'debug' : 'warn')

function launchMetamaskUi (opts, cb) {
    const { backgroundConnection } = opts
    actions._setBackgroundConnection(backgroundConnection)
    console.log('launchMetamaskUi',opts)
    
    // ReactDOM.render(<Home />, document.getElementById('app-content'));
    //render(<Root />, opts.container);
    //cb(null)

    startApp(opts)
    .then((store) => {
      cb(null, store)
    })
}

async function startApp (opts) {

  const enLocaleMessages = await fetchLocale('en')

  const store = configureStore({
    activeTab: opts.activeTab,

    // metamaskState represents the cross-tab state
    metamask: 'metamaskState',

    // appState represents the current tab's popup state
    appState: {},

    localeMessages: {
      en: enLocaleMessages,
    },


  })

  // start app
  render(
    <Root
      store={store}
    />,
    opts.container,
  )

  return store
}  
