import { GET_INVITATIONS, ACCEPT_INVITATION, DENY_INVITATION, SEND_INVITATION } from '../actions/types.js';

const initialState = {
    invitations: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_INVITATIONS:
            return {
                ...state,
                invitations: action.payload
            };
        case DENY_INVITATION:
            return {
                ...state,
                invitations: state.invitations.filter(invitation => invitation.id !== action.payload)
            };
        case ACCEPT_INVITATION:
            return {
                ...state,
                invitations: state.invitations.filter(invitation => invitation.id !== action.payload)
            };
        case SEND_INVITATION:
            return {
                ...state,
                invitations: [...state.invitations, action.payload] 
            };
        default:
            return state;
    }
}