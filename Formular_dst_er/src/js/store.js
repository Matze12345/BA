import { applyMiddleware, createStore } from "redux"

import { createLogger } from 'redux-logger'
import promise from "redux-promise-middleware"
import thunk from "redux-thunk"

import reducer from "./reducers"

const middlewareOptions = [
  promise(),
  thunk,
    (process.env.NODE_ENV !== 'production') && createLogger(),
].filter(Boolean);

const middleware = applyMiddleware(...middlewareOptions);

export default createStore(reducer, middleware)