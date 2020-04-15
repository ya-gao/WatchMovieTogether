import { CREATE_MOVIES, GET_MOVIES } from '../actions/types.js';

const initialState = {
    movies: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MOVIES:
            return {
                ...state,
                movies: action.payload
            }
        case CREATE_MOVIES:
            return{
                ...state,
                movies: [...state.events, action.payload] 
            }
        default:
            return state;
    }
}