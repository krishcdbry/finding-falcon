import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter as Router , Route, Link} from "react-router-dom";
import store from './store';
import App from './app/container/app';
import Result from './app/container/result';
import Home from './app/container/home';
require('./app/app.scss');

render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/app" component={App}/>
                <Route path="/result" component={Result}/>
            </div>
        </Router>
    </Provider>
, document.getElementById('root'));