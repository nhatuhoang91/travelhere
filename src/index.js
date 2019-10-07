import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './components/app/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './store/rootReducer.js'
import {loggerMiddleware} from './middlewares/logger.js'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker';
const middlewares = [loggerMiddleware, thunk]
const middlewaresEnhance = applyMiddleware(...middlewares)

const store = createStore(rootReducer, middlewaresEnhance)
const travelHere = (
    <Provider store = {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
   
)

ReactDOM.render(travelHere, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
