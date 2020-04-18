import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { CREATE_EVENT, GET_EVENTS,CREATE_VOTE } from './types';

// Create event
export const createEvent = (event, chosen_movie_list) => (dispatch, getState) => {
  axios
    .post('/api/events/', {event_pass:event, movie_list_pass: chosen_movie_list}, tokenConfig(getState))
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

export const createVote= (movie_id, event_id)=> (dispatch, getState) => {
  axios
    .post( '/api/vote/' , {movie_id_pass: movie_id, event_id_pass: event_id},tokenConfig(getState))
    .then(response => {
        dispatch(createMessage({ createVote: 'Group Created'}));
        dispatch({
            type: CREATE_VOTE,
            payload: response.data
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};