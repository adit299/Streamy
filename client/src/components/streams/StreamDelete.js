import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        const { id } = this.props.match.params;
        return (
            // The React fragment element acts as an invisible JSX element (not a div), so that
            // these two elements can be returned in a valid way (and our styling will not be messed
            // up since these two elements are not enclosed in a div)

            // An arrow function is the appropriate function to pass in here, because just entering
            // this.props.deleteStream, invokes the correct action creator, but we did not supply the id
            // Also, in this way, this function will be called anytime renderActions is called.
            // In this way, the delete stream function is correctly called only when we click the button
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Loading...'
        }

        return `Are you want to delete the stream with title: ${this.props.stream.title}?`

    }
    
    render() {
        return (
            <Modal 
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}


export default connect(
    mapStateToProps, 
    { fetchStream, deleteStream }
)(StreamDelete);














