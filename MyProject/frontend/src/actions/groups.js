import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_GROUPS, UNSUBSCRIBE_GROUP, CREATE_GROUP, JOIN_GROUP } from './types';

// GET GROUPS
export const getGroups = () => (dispatch, getState) => {
    axios
      .get('/api/viewGroups/', tokenConfig(getState))
      .then(response => {
          dispatch({
              type: GET_GROUPS,
              payload: response.data
          });
      }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UNSUBSCRIBE GROUP
export const unsubscribeGroup = (id) => (dispatch, getState) => {
    axios
      .delete(`/api/groups/${id}/`, tokenConfig(getState))
      .then(response => {
          
          dispatch(createMessage({ unsubscribeGroup: 'Group Unsubscribed'}));
          dispatch({
              type: UNSUBSCRIBE_GROUP,
              payload: id
          });
      }).catch(err => console.log(err));
};

// CREATE GROUP
export const createGroup = (group) => (dispatch, getState) => {
    axios
      .post('/api/groups/', group, tokenConfig(getState))
      .then(response => {
          dispatch(createMessage({ createGroup: 'Group Created'}));
          dispatch({
              type: CREATE_GROUP,
              payload: response.data
          });
      })
      .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// JOIN GROUP
export const joinGroup = (group) => (dispatch, getState) => {
    axios
      .patch('/api/groups/', group, tokenConfig(getState))
      .then(response => {
          dispatch({
              type: JOIN_GROUP,
              payload: response.data
          });
      })
      .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};