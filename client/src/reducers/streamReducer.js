import _ from 'lodash';
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM 
} from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        // By default, the fetch_streams command returns an array of all the streams
        // we want to convert this to a json object so we use the lodash mapKeys method.
        // Map keys in this instance will return an object which has as keys, the ids of
        // each of the streams and as values the action.payload of each of the values.

        // ex. const colors  = [{hue: 'green'}]
        // _.mapKeys(colors, 'hue') = {'green': {'hue': 'green'}}

        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }; 
        // So note that all three of these actions have the exact same code when it comes
        // to how it effects our state
        case FETCH_STREAM:
        case CREATE_STREAM:
        case EDIT_STREAM:    
            // This is a bit of some new ES2015 syntax, which basically allows us
            // to return a new state object, but with a new entry of the action.payload.id and 
            // action.payload
            return {...state, [action.payload.id]: action.payload}
        // The lodash library allows us to easily delete a particular entry from our state object,
        // while returning a new state object
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
    



};














