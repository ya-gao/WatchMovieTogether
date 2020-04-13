import { GET_GROUPS, UNSUBSCRIBE_GROUP, CREATE_GROUP } from '../actions/types.js';

const initialState = {
    groups: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: action.payload
            };
        case UNSUBSCRIBE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group.id !== action.payload)
            };
        case CREATE_GROUP:
            return {
                ...state,
                groups: [...state.groups, action.payload] 
            };
        default:
            return state;
    }
}