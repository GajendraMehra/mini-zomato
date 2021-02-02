import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import App from './App'

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

const Home=()=>{
    return (
        <h1>
            Hello
        </h1>
    )
}

export default Routes
