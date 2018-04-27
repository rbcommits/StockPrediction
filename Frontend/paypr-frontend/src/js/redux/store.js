
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './reducer';
import { initSocketListener, subscribe } from './socket-api'

import { UpdateStock } from './actions'
const symbols = [
    "AAPL",
    "MSFT",
    "AABA",
    "ACN",
    "ADP",
    "FB",
    "AMZN",
    "GOOGL",
    "IBM",
    "LMT"
]
//apply some middleware to redux store.
//thunk allows redux to instead return an action, return a function
//logger allows state to show in console.
//promise allows for asynchronous dispatching of actions.
const middleware = applyMiddleware(promise(), thunk);

//create redux store.
const store = createStore(rootReducer, middleware);
const server_websocket = initSocketListener(symbols, (symbol_data)=> {
    store.dispatch(UpdateStock(symbol_data))
})

export default store;
