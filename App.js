if (typeof global.self === 'undefined') {
    global.self = global;
}

import React from 'react';
import RootComponent from "./src/app/RootComponent";
import {createReduxStore} from './src/app/redux/redux-store'
import {Provider} from "react-redux";

const reduxStore = createReduxStore();

const App = () => (
    <Provider store={reduxStore}>
        <RootComponent/>
    </Provider>
);

export default App;
