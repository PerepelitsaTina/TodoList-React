import { combineReducers } from "redux";
import todos from "./todos";
import filter from "./visibleFilter"

export const rootReducer = combineReducers({
    todos_store: todos,
    filter_store: filter 
})