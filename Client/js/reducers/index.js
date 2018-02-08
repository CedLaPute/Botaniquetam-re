import { combineReducers } from 'redux'
import plants from "./plants"
import settings from "./settings"

const rootReducer = combineReducers({
    plants,
    settings
})

export default rootReducer