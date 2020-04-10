import { combineReducers } from 'redux';
import groups from './groups';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import invitations from './invitations';

// A reducer is basically a function that evaluates an action, and send down certain state depending on what does that action does
export default combineReducers({
    groups,
    errors,
    messages,
    auth,
    invitations
});