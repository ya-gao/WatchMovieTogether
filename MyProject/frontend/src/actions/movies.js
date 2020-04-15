import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { CREATE_MOVIE, GET_MOVIES } from './types';

// // Create movie
// export const createMovie = (event) => (dispatch, getState) => {
//   axios
//     .post('/api/events/', event, tokenConfig(getState))
//     .then(response => {
//         dispatch(createMessage({ createEvent: 'Group Created'}));
//         dispatch({
//             type: CREATE_MOVIE,
//             payload: response.data
//         });
//     })
//     .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
// };

// // Get movie
// export const getMovies = (groupId) => (dispatch, getState) => {
//     axios
//       .get('/api/events/', tokenConfig(getState))
//       .then(response => {
//             const events = response.data
        
//             dispatch({
//               type: GET_MOVIES,
//               payload: events.filter(event => event.group == groupId)
//           });
//       }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
// }