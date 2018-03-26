
import {combineReducers} from "redux"
import {sessionReducer} from 'redux-react-session';
import {sessionService} from 'redux-react-session';
// import other reducer actions here we will have multiple actions in redux and
// would like to combine them using combineReducers.
const defaultState = {
  logged_in: false
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

const rootReducer = combineReducers({authentication, session: sessionReducer})

export default rootReducer