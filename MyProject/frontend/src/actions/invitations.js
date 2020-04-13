import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_INVITATIONS, ACCEPT_INVITATION, DENY_INVITATION, SEND_INVITATION } from './types';

// GET INVITATIONS
export const getInvitations = () => (dispatch, getState) => {
    axios
      .get('/api/invitations/', tokenConfig(getState))
      .then(response => {
          dispatch({
              type: GET_INVITATIONS,
              payload: response.data
          });
      }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DENY INVITATION
export const denyInvitation = (id) => (dispatch, getState) => {
    axios
      .delete(`/api/denyInvitations/${id}/`, tokenConfig(getState))
      .then(response => {
          dispatch(createMessage({ denyInvitation: 'Invitation Denied'}));
          dispatch({
              type: DENY_INVITATION,
              payload: id
          });
      }).catch(err => console.log(err));
};

// ACCEPT INVITATION
export const acceptInvitation = (id) => (dispatch, getState) => {
    axios
      .delete(`/api/invitations/${id}/`, tokenConfig(getState))
      .then(response => {
          dispatch(createMessage({ acceptInvitation: 'Invitation Accepted'}));
          dispatch({
              type: ACCEPT_INVITATION,
              payload: id
          });
      }).catch(err => console.log(err));
};

// SEND INVITATIONS
export const sendInvitation = (invitation) => (dispatch, getState) => {
    axios
      .post('/api/invitations/', invitation, tokenConfig(getState))
      .then(response => {
          dispatch(createMessage({ sendInvitation: 'Invitation Sent'}));
          dispatch({
              type: SEND_INVITATION,
              payload: response.data
          });
      }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
