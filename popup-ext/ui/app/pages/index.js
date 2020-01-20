import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Main from './Main'

const Index = () => {

    // return <div>ui pages index </div>
    return (
        <HashRouter hashType="noslash">
            <Route path="/" component={Main} />
        </HashRouter>
    );
} 
export default Index