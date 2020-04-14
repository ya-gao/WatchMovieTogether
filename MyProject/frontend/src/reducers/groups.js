import { GET_GROUPS, UNSUBSCRIBE_GROUP, UNSUBSCRIBE_BELONGED_GROUP, CREATE_GROUP, GET_BELONGED_GROUPS } from '../actions/types.js';

const initialState = {
    groups: [],
    belonged_groups: []
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
        case UNSUBSCRIBE_BELONGED_GROUP:
            return {
                ...state,
                belonged_groups: state.belonged_groups.filter(group => group.id !== action.payload)
            };
        case CREATE_GROUP:
            return {
                ...state,
                groups: [...state.groups, action.payload] 
            };
        case GET_BELONGED_GROUPS:
            return{
                ...state,
                belonged_groups:action.payload
            }
        default:
            return state;
    }
}