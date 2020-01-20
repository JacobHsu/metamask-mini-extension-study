import React from 'react'

import log from 'loglevel'

import { render } from 'react-dom'
import Root from './app/pages'


export default launchMetamaskUi

log.setLevel(global.METAMASK_DEBUG ? 'debug' : 'warn')

function launchMetamaskUi (opts, cb) {
    const { backgroundConnection } = opts
    console.log('launchMetamaskUi',opts)
    
    // ReactDOM.render(<Home />, document.getElementById('app-content'));
    render(<Root />, opts.container);

    cb(null)
  }