import React from 'react';
import { connect } from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from './StreamForm';


class StreamCreate extends React.Component {
    onSubmit = (formValues) => {
        // Since we are utilizing a redux built-in function to take care of the form
        // submission, we dont have to add something like (event.preventdefault)

        // When we submit our form, we call the createStream action creator, with the form values
        this.props.createStream(formValues);
    }

    render() {
        return ( 
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}


// To hookup redux forms

// Essentially the name that we are supplying to reduxForm (streamCreate) will be used to create
// a seperate object which contains all the values that we enter under field


export default connect(null, { createStream })(StreamCreate);















