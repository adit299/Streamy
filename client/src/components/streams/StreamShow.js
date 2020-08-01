import React from 'react';
// flv can be thought of as a similar utility to axios, allowing us
// to access an external server, from which the video stream can be obtained 
// and played on our video player
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        // References can be used within React to reference elements outside of the DOM
        // (Note: not sure why this works?)
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    // The video component was active even after we navigate away from the page, so this lifecycle
    // method is needed to resolve that
    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        // If a previous instance of player is active or we haven't
        // initilized the stream, simply return
        if (this.player || !this.props.stream) {
            return;
        }
        // See the flv documentation and/or the usage in the following:
        // https://github.com/illuspas/Node-Media-Server#npm-version-recommended
        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);














