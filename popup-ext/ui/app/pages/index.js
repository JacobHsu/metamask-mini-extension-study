import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import Routes from './routes'
import I18nProvider from '../helpers/higher-order-components/i18n-provider'

const Index = props => {
    const { store } = props
    return (
        <Provider store={store}>
            <HashRouter hashType="noslash">
                <I18nProvider>
                    <Routes/>
                </I18nProvider>
            </HashRouter>
        </Provider>
    );
} 
export default Index