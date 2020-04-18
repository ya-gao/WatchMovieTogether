import { CREATE_EVENT, GET_EVENTS, CREATE_VOTE } from '../actions/types.js';

const initialState = {
    events: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload
            }
        case CREATE_EVENT:
            return{
                ...state,
                events: [...state.events, action.payload] 
            }
        case CREATE_VOTE:
            return {
                ...state,
                events: [...state.events.filter(event => {return event.id !== action.payload.id}), action.payload] 
            }
        default:
            return state;
    }
}