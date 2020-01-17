import React from 'react'

import log from 'loglevel'

import ReactDOM from 'react-dom';
import Home from './Home'

export default launchMetamaskUi

log.setLevel(global.METAMASK_DEBUG ? 'debug' : 'warn')

function launchMetamaskUi (opts, cb) {
    const { backgroundConnection } = opts
    console.log('launchMetamaskUi',opts)
      

    ReactDOM.render(<Home />, document.getElementById('app-content'));

    cb(null)
  }