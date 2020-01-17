import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthRoute from './../component/authroute/authroute'
import Login from './../container/login/login'
import Register from './../container/register/register'
import BossInfo from './../container/bossinfo/bossinfo'
import GeniusInfo from './../container/geniusinfo/geniusinfo'
import Dashboard from './../component/dashboard/dashboard'
import Chat from './../component/chat/chat'

export default class ERouter extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path='/bossinfo' component={BossInfo}></Route>
                        <Route path='/geniusinfo' component={GeniusInfo}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                        <Route path='/chat/:user' component={Chat}></Route>
                        <Route component={Dashboard}></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}