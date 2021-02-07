import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import App from './App'
import Home from './components/home/'

import Restaurants from './restaurants/index'

function Routes() {
    return (
       <BrowserRouter>
       <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/restaurants" component={Restaurants}></Route>
       </Switch>
       </BrowserRouter>
    )
}



export default Routes
