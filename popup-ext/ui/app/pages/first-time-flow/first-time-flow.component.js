
import React, { PureComponent } from 'react'
import { Switch, Route } from 'react-router-dom'
import FirstTimeFlowSwitch from './first-time-flow-switch'
import Welcome from './welcome'
import SelectAction from './select-action'

import {
  DEFAULT_ROUTE,
  INITIALIZE_WELCOME_ROUTE,
  INITIALIZE_CREATE_PASSWORD_ROUTE,
  INITIALIZE_SEED_PHRASE_ROUTE,
  INITIALIZE_UNLOCK_ROUTE,
  INITIALIZE_SELECT_ACTION_ROUTE,
  INITIALIZE_END_OF_FLOW_ROUTE,
  INITIALIZE_METAMETRICS_OPT_IN_ROUTE,
  INITIALIZE_BACKUP_SEED_PHRASE_ROUTE,
} from '../../helpers/constants/routes'

export default class FirstTimeFlow extends PureComponent {

  render () {
    
    return (
      <div className="first-time-flow">
        <Switch>
         <Route
            path={INITIALIZE_SELECT_ACTION_ROUTE}
            component={SelectAction}
          />
          <Route
              exact
              path={INITIALIZE_WELCOME_ROUTE}
              component={Welcome}
            />
          <Route
            exact
            path="*"
            component={FirstTimeFlowSwitch}
          />
        </Switch>  
      </div>
    )
  }
}

