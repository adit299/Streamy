import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin(stream) {
        // We have added the currentUserId to the props object so we can access
        // it to see if the currentUserId matches the stream.userId
        if(stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    {/* Creating a route for the stream edit page */}
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
                        Edit
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            ); 
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {/* The method that creates the buttons needs to be called at the beginning
                    for semantic UI to style everything properly */}
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    }

    // Adding a button for the create stream button
    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                // We want to add a button to create stream that visible 
                // only if the user is currently signed in (recall we have to use
                // the react-router link property, not a regular anchor tag)
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );

        }

    }


    
    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // Object.values is a built-in javascript method which converts a javaScript object
    // into an array by taking the values of the javascript object and inserting it into
    // an array
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);














