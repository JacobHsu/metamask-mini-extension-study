import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Routes from './routes'

const Index = () => {

    return (
        <HashRouter hashType="noslash">
            <Routes/>
        </HashRouter>
    );
} 
export default Index