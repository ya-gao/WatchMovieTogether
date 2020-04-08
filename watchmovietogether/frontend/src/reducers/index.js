import { combineReducers } from 'redux';
import groups from './groups';
import errors from './errors';
import messages from './messages';
import auth from './auth';


export default combineReducers({
    groups,
    errors,
    messages,
    auth
});