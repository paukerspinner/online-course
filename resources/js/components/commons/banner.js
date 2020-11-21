import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Banner extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="banner-top" className="banner">
                <div className="banner-cover"></div>
                <div className="banner-text">
                    <h1>Your course to Success</h1>
                    <p>Build skills with courses, certificates, and degrees online from world-class universities and companies</p>
                    <a href="" className="btn btn-primary">Join now</a>
                </div>
            </div>
        );
    }
}


export default connect(null, null)(Banner);