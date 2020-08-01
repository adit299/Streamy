import React from 'react';
import ReactDOM from 'react-dom';

// We have created our own div inside of index.html with a className of modal.
// This is where our portal will be hooked, so that we can bypass the majority
// of the application hierarchy
const Modal = props => {
    return ReactDOM.createPortal(
        // We utilized the history object that we created earlier so that when the user clicks
        // the background div, we are redirected to the root path
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            {/* An issues with having onClick event handler on the parentmost element is that
            if we click any of the sibling elements, the event will bubble up all the way to the
            parent element and redirect. To stop that we use the stopPropagation method */}
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
}



export default Modal;