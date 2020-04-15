import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { CREATE_EVENT, GET_EVENTS } from './types';

// Create event
export const createEvent = (event) => (dispatch, getState) => {
  axios
    .post('/api/events/', event, tokenConfig(getState))
    .then(response => {
        dispatch(createMessage({ createEvent: 'Group Created'}));
        dispatch({
            type: CREATE_EVENT,
            payload: response.data
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// Get events
export const getEvents = (groupId) => (dispatch, getState) => {
    axios
      .get('/api/events/', tokenConfig(getState))
      .then(response => {
            const events = response.data
        
            dispatch({
              type: GET_EVENTS,
              payload: events.filter(event => event.group == groupId)
          });
      }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}