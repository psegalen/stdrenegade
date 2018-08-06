import { createStore, combineReducers } from "redux"
import renegadeReducer from "./renegade/reducer"

const rootReducer = combineReducers({
    renegade: renegadeReducer,
})

const store = createStore(rootReducer)

export default store
