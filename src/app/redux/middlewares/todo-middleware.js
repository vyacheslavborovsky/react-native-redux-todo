import {call, take, put, fork} from "redux-saga/effects";
import {batchActions} from 'redux-batched-actions';
import {TODO_ACTION_TYPES, TodoActions} from '../actions'
import TodoApi from '../../shared/services/todo-service'

const key = 'todos';
const todoApi = new TodoApi(key);

function* getTodos() {
    try {
        const todos = yield call(todoApi.loadItems);
        yield put(batchActions([
            TodoActions.getTodoCompleted(todos),
            TodoActions.setTodoRequestSuccess({
                hasError: false,
                successText: 'Todos have been loaded!'
            })
        ]))

    } catch (error) {
        yield put(batchActions([
            TodoActions.setTodoRequestSuccess({
                hasError: true,
                errorText: 'There are was an error restoring your todos!'
            })
        ]))
    }
}

function* getTodosFlow() {

    while (true) {
        yield take(TODO_ACTION_TYPES.GET_TODO);
        yield call(getTodos);
    }
}


function* addTodo(todo) {
    try {
        const result = yield call(todoApi.addItem, todo);
        yield put(TodoActions.addTodoCompleted(result));

    } catch (error) {
        yield put(batchActions([
            TodoActions.setTodoRequestSuccess({
                hasError: true,
                errorText: 'There are was an error creating item!'
            })
        ]))
    }
}

function* addTodoFlow() {
    while (true) {
        const action = yield take(TODO_ACTION_TYPES.ADD_TODO)
        yield call(addTodo, action.payload)
    }
}


function* updateTodo(todo) {
    try {
        yield call(todoApi.updateItem, todo);

        yield put(TodoActions.updateTodoCompleted(todo));
    } catch (error) {
        yield put(batchActions([
            TodoActions.setTodoRequestSuccess({
                hasError: true,
                errorText: 'There are was an error update item!'
            })
        ]))
    }
}

function* updateTodoFlow() {
    while (true) {
        const action = yield take(TODO_ACTION_TYPES.UPDATE_TODO)
        yield call(updateTodo, action.payload)
    }
}


function* deleteTodo(id) {
    try {
        yield call(todoApi.destroyItemById, id);

        yield put(TodoActions.deleteTodoCompleted(id))
    } catch (error) {
        yield put(batchActions([
            TodoActions.setTodoRequestSuccess({
                hasError: true,
                errorText: 'There are was an error delete item!'
            })
        ]))
    }
}

function* deleteTodoFlow() {
    while (true) {
        const action = yield take(TODO_ACTION_TYPES.DELETE_TODO);
        yield call(deleteTodo, action.payload)
    }
}


export const TodosWatcher = function* () {
    yield fork(getTodosFlow);
    yield fork(addTodoFlow);
    yield fork(updateTodoFlow);
    yield fork(deleteTodoFlow);
}
