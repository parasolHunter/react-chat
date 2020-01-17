import React from 'react'
import ReactDom from 'react-dom'
import Router from './router/index'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
// import './style/common.less'
import './index.css'

import reducers from './reducer'
import './config'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDom.render(
    (<Provider store={store}>
        <Router>
        </Router>
    </Provider>),
    document.getElementById('root')
)
