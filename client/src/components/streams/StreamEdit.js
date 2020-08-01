import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

// We converted to a class based component, so that we can utilize the 
// componentDidMount lifecycle method
class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        // We call the editStream action creator with the id of the stream and the
        // updated title and description values for the stream.
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>;
        }
        
        return ( 
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    // Initial Values is a special method, which will look for fields which
                    // have names matching to title and description, and supply the values
                    // that are assigned to it, into the fields. (so this.props.stream will
                    // fill in the fields with the values that are required.)

                    // For out current backend, passing in all of the stream information in
                    // this.props.stream is ok, but for other APIs, it might not work out as 
                    // well. Thus, we only want to pass title and description for initialValues 
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit} 
                />
            </div>
        );
    }
}

// Recall that everytime we call mapStateToProps, we can obtain two
// big sources of data, state which has access to our redux store, and 
// ownProps which can access the component specific props object

// We will use the ownProps property to find the ID of the stream we want to access
// out of our state object

// An error that we are encountering is that when the user directly tries to access a URL
// (like /streams/edit/:id), the streams are not loaded up at that point. Only after we access
// the root path, are the streams loaded into our state object, and accessible.
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
    mapStateToProps, 
    { fetchStream, editStream }
)(StreamEdit);














