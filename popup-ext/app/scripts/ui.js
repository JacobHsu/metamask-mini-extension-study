import log from 'loglevel'

start().catch(log.error)

async function start () {
    log.warn("unreasonably simple");
    console.log('devMode ui.js')
}