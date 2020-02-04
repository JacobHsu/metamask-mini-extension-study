/**
 * @file      The central metamask controller. Aggregates other controllers and exports an api.
 * @copyright Copyright (c) 2018 MetaMask
 * @license   MIT
 */

import EventEmitter from 'events'

import pump from 'pump'

import extension from 'extensionizer'

import { setupMultiplex } from './lib/stream-utils.js'


export default class MetamaskController extends EventEmitter {

  /**
   * Used to create a multiplexed stream for connecting to a trusted context,
   * like our own user interfaces, which have the provider APIs, but also
   * receive the exported API from this controller, which includes trusted
   * functions, like the ability to approve transactions or sign messages.
   *
   * @param {*} connectionStream - The duplex stream to connect to.
   * @param {MessageSender} sender - The sender of the messages on this stream
   */
  setupTrustedCommunication (connectionStream, sender) {
    // setup multiplexing
    const mux = setupMultiplex(connectionStream)
    // connect features
    //this.setupControllerConnection(mux.createStream('controller'))
    //this.setupProviderConnection(mux.createStream('provider'), sender, true)
  }

    /**
   * Sets whether or not the user will have usage data tracked with MetaMetrics
   * @param {boolean} bool - True for users that wish to opt-in, false for users that wish to remain out.
   * @param {Function} cb - A callback function called when complete.
   */
    setParticipateInMetaMetrics (bool, cb) {
      try {
        const metaMetricsId = this.preferencesController.setParticipateInMetaMetrics(bool)
        cb(null, metaMetricsId)
      } catch (err) {
        cb(err)
      }
    }

}
