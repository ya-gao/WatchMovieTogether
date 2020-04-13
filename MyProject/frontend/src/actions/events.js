import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_EVENTS } from './types';

// Get events
export const getEvents = (id) => (dispatch, getState) => {
    axios
      .get('/api/events/', tokenConfig(getState))
      .then(response => {
          dispatch({
              type: GET_EVENTS,
              payload: response.data
          });
      }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}