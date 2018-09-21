import createAction from "redux-actions/es/createAction";
import createTypes from 'redux-create-action-types';

export const TODO_ACTION_TYPES = createTypes(
    'ADD_TODO',
    'GET_TODO',
    'UPDATE_TODO',
    'DELETE_TODO',

    'ADD_TODO_COMPLETED',
    'GET_TODO_COMPLETED',
    'UPDATE_TODO_COMPLETED',
    'DELETE_TODO_COMPLETED',

    'ADDING_TODO',
    'EDIT_TODO',

    'TODO_REQUEST_PENDING',
    'TODO_REQUEST_SUCCESS',

    'REST_TODO_FLAGS'
);

export const TodoActions = {

    addTodo: createAction(TODO_ACTION_TYPES.ADD_TODO),
    getTodo: createAction(TODO_ACTION_TYPES.GET_TODO),
    updateTodo: createAction(TODO_ACTION_TYPES.UPDATE_TODO),
    deleteTodo: createAction(TODO_ACTION_TYPES.DELETE_TODO),

    addTodoCompleted: createAction(TODO_ACTION_TYPES.ADD_TODO_COMPLETED),
    getTodoCompleted: createAction(TODO_ACTION_TYPES.GET_TODO_COMPLETED),
    updateTodoCompleted: createAction(TODO_ACTION_TYPES.UPDATE_TODO_COMPLETED),
    deleteTodoCompleted: createAction(TODO_ACTION_TYPES.DELETE_TODO_COMPLETED),

    setAddingTodo: createAction(TODO_ACTION_TYPES.ADDING_TODO),
    setTodoEditing: createAction(TODO_ACTION_TYPES.EDIT_TODO),

    setTodoRequestPending: createAction(TODO_ACTION_TYPES.TODO_REQUEST_PENDING),
    setTodoRequestSuccess: createAction(TODO_ACTION_TYPES.TODO_REQUEST_SUCCESS),

    resetTodoFlags: createAction(TODO_ACTION_TYPES.REST_TODO_FLAGS)
}
