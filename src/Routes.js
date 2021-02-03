import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import App from './App'
import Home from './components/Home'

function Routes() {
    return (
       <BrowserRouter>
       <Switch>
        <Route path="/" exact component={App}></Route>
        <Route path="/home" component={Home}></Route>
       </Switch>
       </BrowserRouter>
    )
}



export default Routes
