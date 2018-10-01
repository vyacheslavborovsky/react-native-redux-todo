import {all, fork} from 'redux-saga/effects';
import {TodosWatcher} from './todo-middleware'

export default function* () {
    yield all([
        fork(TodosWatcher)
    ])
}
