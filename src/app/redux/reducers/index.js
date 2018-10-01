import {combineReducers} from "redux";
import {TodoReducer} from './todo-reducer'

export default combineReducers({
    todoState: TodoReducer
})
