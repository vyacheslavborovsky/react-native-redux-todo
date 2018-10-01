import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, createStore} from "redux";
import {enableBatching} from "redux-batched-actions";

import AppReducer from './reducers'
import AppMiddleware from './middlewares'

export const createReduxStore = function () {
    const sagaMiddleware = createSagaMiddleware();

    return {
        ...createStore(
            enableBatching(AppReducer),
            applyMiddleware(sagaMiddleware)
        ),
        runSaga: sagaMiddleware.run(AppMiddleware)
    }
}
