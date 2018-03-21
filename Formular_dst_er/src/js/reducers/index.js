import { combineReducers } from "redux"

import initReducer from "./initReducer"
import clickDataReducer from "./clickDataReducer"

export default combineReducers({
    initReducer,
    clickDataReducer,
})