import { combineReducers } from 'redux';
import { usersReducer } from './AddUser/reducer';

const appReducer = combineReducers({
    users: usersReducer
})

export default appReducer;