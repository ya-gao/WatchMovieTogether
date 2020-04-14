import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_EVENTS } from './types';

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