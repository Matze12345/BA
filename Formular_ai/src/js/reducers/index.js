import { combineReducers } from "redux"

import initReducer from "./initReducer"
import clickDataReducer from "./clickDataReducer"
import helpReducer from "./helpReducer"
import helpTrainReducer from "./helpTrainReducer"

export default combineReducers({
    initReducer,
    clickDataReducer,
    helpReducer,
    helpTrainReducer,
})