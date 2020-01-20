
import React from 'react'
import { Route } from 'react-router-dom'
import Main from './Main'

// const Routes = () => {
//     return (
//         <Route path="/" component={Main} />)
//     ;
// } 

class Routes extends React.Component {
    render() {
        return (
            <Route path="/" component={Main} />
        );
    }
}

export default Routes