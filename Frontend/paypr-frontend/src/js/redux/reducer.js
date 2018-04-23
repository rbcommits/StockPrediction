
import {combineReducers} from "redux"
import {sessionReducer} from 'redux-react-session';
import {sessionService} from 'redux-react-session';
// import other reducer actions here we will have multiple actions in redux and
// would like to combine them using combineReducers.
const defaultState = {
  logged_in: false,
  AAPL: {},
  MSFT: {},
  AABA: {},
  ACN: {},
  ADP: {},
  FB: {},
  AMZN: {},
  GOOGL: {},
  IBM: {},
  LMT: {},
}

const authentication = (state = [], action) => {
  switch (action.type) {

    case 'LOGIN':
      return {
        ...state
      }
    case 'LOGOUT':
      sessionService.deleteSession();
      sessionService.deleteUser();
      return {
        ...state
      }
    default:
      return defaultState
  }
}
const stock_state = (state = [], action) => {
  switch (action.type) {

    case 'UPDATE_STOCK':
    switch(action.symbol) {
      case "AAPL":
      return {
        ...state,
        AAPL: {timestamp: action.timestamp,price: action.price, volume: action.volume}
      }
    }
    return{
      ...state,
      
      data: action.data
    }
    default:
      return defaultState
  }
}
const rootReducer = combineReducers({authentication, stock_state, session: sessionReducer})

export default rootReducer