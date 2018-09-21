import {combineReducers} from "redux";
import {TodoReducer} from './reducers'

export default combineReducers({
    todoState: TodoReducer
})
