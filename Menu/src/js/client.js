import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Set2 from "./pages/Set2";
import Set3 from "./pages/Set3";
import Set1 from "./pages/Set1";
import Set4 from "./pages/Set4";
import Set5 from "./pages/Set5";
import End from "./pages/End";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import store from "./store"


const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Login}></IndexRoute>
                <Route path="set2" name="set2" component={Set2}></Route>
                <Route path="set3" name="set3" component={Set3}></Route>
                <Route path="set1" name="set1" component={Set1}></Route>
                <Route path="set4" name="set4" component={Set4}></Route>
                <Route path="set5" name="set5" component={Set5}></Route>
                <Route path="end" name="end" component={End}></Route>
            </Route>
        </Router>
    </Provider>,
app);
