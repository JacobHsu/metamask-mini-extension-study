
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'


export default class Welcome extends PureComponent {
  // static propTypes = {
  //   history: PropTypes.object,
  //   participateInMetaMetrics: PropTypes.bool,
  //   welcomeScreenSeen: PropTypes.bool,
  // }

  static contextTypes = {
    t: PropTypes.func,
  }

  // constructor (props) {
  //   super(props)
  // }

  // componentDidMount () {
  //   const { history, participateInMetaMetrics, welcomeScreenSeen } = this.props

  //   if (welcomeScreenSeen && participateInMetaMetrics !== null) {
  //     history.push(INITIALIZE_CREATE_PASSWORD_ROUTE)
  //   } else if (welcomeScreenSeen) {
  //     history.push(INITIALIZE_SELECT_ACTION_ROUTE)
  //   }
  // }

  // handleContinue = () => {
  //   this.props.history.push(INITIALIZE_SELECT_ACTION_ROUTE)
  // }

  render () {
    const { t } = this.context

    return (
      <div className="welcome-page__wrapper">
        <div className="welcome-page">
          Mascot welcome UI
          <div className="welcome-page__header">
            { t('welcome') }
          </div>
          {/* <Mascot
            animationEventEmitter={this.animationEventEmitter}
            width="125"
            height="125"
          /> */}
          {/* <div className="welcome-page__header">
            { t('welcome') }
          </div> */}
          {/* <div className="welcome-page__description">
            <div>{ t('metamaskDescription') }</div>
            <div>{ t('happyToSeeYou') }</div>
          </div>
          <Button
            type="primary"
            className="first-time-flow__button"
            onClick={this.handleContinue}
          >
            { t('getStarted') }
          </Button> */}
        </div>
      </div>
    )
  }
}
