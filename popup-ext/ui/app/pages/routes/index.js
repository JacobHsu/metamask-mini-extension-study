
import React from 'react'
import { Route, Switch } from 'react-router-dom'


// init
import FirstTimeFlow from '../first-time-flow'
// other views
import Home from '../home'
// Authenticated 定義了 Redirect 至 INITIALIZE_ROUTE = '/initialize'
import Authenticated from '../../helpers/higher-order-components/authenticated'

// Routes
import {
    DEFAULT_ROUTE,
    LOCK_ROUTE,
    UNLOCK_ROUTE,
    SETTINGS_ROUTE,
    REVEAL_SEED_ROUTE,
    MOBILE_SYNC_ROUTE,
    RESTORE_VAULT_ROUTE,
    ADD_TOKEN_ROUTE,
    CONFIRM_ADD_TOKEN_ROUTE,
    CONFIRM_ADD_SUGGESTED_TOKEN_ROUTE,
    NEW_ACCOUNT_ROUTE,
    SEND_ROUTE,
    CONFIRM_TRANSACTION_ROUTE,
    INITIALIZE_ROUTE,
    INITIALIZE_UNLOCK_ROUTE,
    CONNECT_ROUTE,
    CONNECTED_ROUTE,
  } from '../../helpers/constants/routes'

class Routes extends React.Component {
    renderRoutes() {
        const routes = (
            <Switch>
                <Route path={INITIALIZE_ROUTE} component={FirstTimeFlow} />
                <Authenticated path={DEFAULT_ROUTE} component={Home} exact />
            </Switch>
        )
        return routes
    }

    render() {
        return (
            <div className="main-container-wrapper">
                { this.renderRoutes() } 
            </div>
        );
    }
}

export default Routes