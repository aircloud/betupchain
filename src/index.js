import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.less';
import { Provider } from "react-redux"
import store from  "./store"
import registerServiceWorker from './registerServiceWorker';
import CRouter from "./routes"

ReactDOM.render(
    <Provider store={store}>
        <CRouter store={store}/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
