import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { CREATE_MOVIES, GET_MOVIES } from './types';

// Create movie
export const createMovies = (movie_list, event_id) => (dispatch, getState) => {
  axios
    .post(`/api/movies/${event_id}`, movie_list, tokenConfig(getState))
    // .then(response => {
    //     dispatch(createMessage({ createMovies: 'Group Created'}));
    //     dispatch({
    //         type: CREATE_MOVIES,
    //         payload: response.data
    //     });
    // })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// Get movie
export const getMovies = (groupId) => (dispatch, getState) => {
    axios
      .get('/api/movies/', tokenConfig(getState))
      .then(response => {
            const movies = response.data
        
            dispatch({
              type: GET_MOVIES,
              payload: response.data
          });
      }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}