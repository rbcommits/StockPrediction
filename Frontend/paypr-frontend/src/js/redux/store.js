
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './reducer';
import initSocketListener from './socket-api'

//apply some middleware to redux store.
//thunk allows redux to instead return an action, return a function
//logger allows state to show in console.
//promise allows for asynchronous dispatching of actions.
const middleware = applyMiddleware(promise(), thunk);

//create redux store.
const store = createStore(rootReducer, middleware);
const server_websocket = initSocketListener()

export default store;
