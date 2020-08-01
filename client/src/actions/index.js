import streams from '../apis/streams';
import history from '../history';
import { SIGN_IN, 
         SIGN_OUT, 
         CREATE_STREAM, 
         FETCH_STREAM,
         FETCH_STREAMS, 
         EDIT_STREAM, 
         DELETE_STREAM } from "./types";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

// Making a post request using axios
export const createStream = formValues => async (dispatch, getState) => {
    // We are simply accessing the state with this line, and obtaining the userId
    // from the state 
    const { userId } = getState().auth
    
    // We have edited the response so that the userId in addition to the formValues
    // are sent in the post request 
    const response = await streams.post('/streams', {...formValues, userId});
    
    // Dipatching to redux store, to update it 
    dispatch({ type: CREATE_STREAM, payload: response.data });

    // After creating a stream, we want to redirect the user back to the root route
    // (if the creation of the stream was successful)

    // History.push allows us to redirect our user to different routes in our browser
    history.push('/');

};

// Action creators for the rest of the CRUD operations which we will perform on the our API

// Note that for some of the action creators like editStream, both an id (for which stream)
// and formValues field is needed (denoting the edit that was made)


export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
};

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
    history.push('/');
}












