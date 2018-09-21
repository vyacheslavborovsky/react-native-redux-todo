import {all, fork} from 'redux-saga/effects';
import {TodosWatcher} from './middlewares'


export default function* () {
    yield all([
        fork(TodosWatcher)
    ])
}
