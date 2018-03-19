import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Home from "./pages/Standard";
import Geld from "./pages/Geld";
import Therm from "./pages/Therm";
import Auto from "./pages/Auto";
import Lager from "./pages/Lager";
import Layout from "./pages/Layout";
import store from "./store"


const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Home}></IndexRoute>
                <Route path="geld" name="geld" component={Geld}></Route>
                <Route path="therm" name="therm" component={Therm}></Route>
                <Route path="auto" name="auto" component={Auto}></Route>
                <Route path="lager" name="lager" component={Lager}></Route>
            </Route>
        </Router>
    </Provider>,
app);
