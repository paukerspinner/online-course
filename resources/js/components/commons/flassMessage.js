import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class FlassMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.resumeTimer = this.resumeTimer.bind(this);
        this.hide = this.hide.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
    }

    componentDidUpdate() {
        this.remaining = this.props.flassMessage.duration;
        this.resumeTimer();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    resumeTimer() {
        clearTimeout(this.timer);
        this.start = new Date();
        this.timer = setTimeout(this.hide, this.remaining);
    }

    hide() {
        this.props.freeFlashMessage();
    }

    pauseTimer() {
        clearTimeout(this.timer);
        this.remaining -= new Date() - this.start;
    }
    
    render() {
        const { content, status } = this.props.flassMessage;
        return content ? (
            <div className={`card text-white shadow flass-message bg-${status}`} onMouseEnter={this.pauseTimer} onMouseLeave={this.resumeTimer} onClick={this.hide}>
                <div className="card-body p-2">
                    <strong>{renderTitleForStatus(status)}:</strong> { content }
                </div>
            </div>
        ) : null
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        freeFlashMessage: () => {
            dispatch(actions.freeFlashMessage());
        }
    }
}

const renderTitleForStatus = status => {
    switch(status) {
        case 'success':
            return 'Success';
        case 'warning':
            return 'Warning';
        case 'danger':
            return 'Error';
    }
}

export default connect(null, mapDispatchToProps)(FlassMessage);