import state from '../redux-state'
import {handleActions} from "redux-actions";
import combineActions from "redux-actions/es/combineActions";

import {TODO_ACTION_TYPES} from '../actions'

const defaultState = {
    ...state.todoState
}

export const TodoReducer = handleActions({
    [combineActions(
        TODO_ACTION_TYPES.TODO_REQUEST_PENDING,
        TODO_ACTION_TYPES.GET_TODO
    )]: (state, action) => ({
        ...state,
        loading: true
    }),

    [TODO_ACTION_TYPES.TODO_REQUEST_SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        hasError: action.payload.hasError === true,
        success: action.payload.hasError === false,
        errorMessage: action.payload.errorText ? action.payload.errorText : null,
        successMessage: action.payload.successText ? action.payload.successText : null,
    }),

    [TODO_ACTION_TYPES.GET_TODO_COMPLETED]: (state, action) => ({
        ...state,
        todos: action.payload
    }),

    [TODO_ACTION_TYPES.ADD_TODO_COMPLETED]: (state, action) => ({
        ...state,
        todos: [...state.todos, action.payload]
    }),

    [TODO_ACTION_TYPES.UPDATE_TODO_COMPLETED]: (state, action) => {

        const todos = state.todos.map(todo => {
            if (todo.id === action.payload.id) {
                return action.payload
            }

            return todo;
        })

        return {
            ...state,
            editModalVisible: false,
            todos
        }
    },

    [TODO_ACTION_TYPES.DELETE_TODO_COMPLETED]: (state, action) => ({
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
    }),

    [TODO_ACTION_TYPES.ADDING_TODO]: (state, action) => ({
        ...state,
        addingTodo: action.payload
    }),

    [TODO_ACTION_TYPES.EDIT_TODO]: (state, action) => ({
        ...state,
        editModalVisible: action.payload
    }),

    [TODO_ACTION_TYPES.SET_SEARCH_TEXT]: (state, action) => ({
        ...state,
        searchText: action.payload && action.payload.trim().length > 0 ? action.payload : ''
    }),

    [TODO_ACTION_TYPES.REST_TODO_FLAGS]: (state, action) => ({
        ...state,
        hasError: null,
        errorMessage: null,
        success: null,
        successMessage: null
    })

}, defaultState);
