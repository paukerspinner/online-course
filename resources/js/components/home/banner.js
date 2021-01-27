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
                    <p>Our goal is your employment. We have become the system of motivation of employees and teachers to the results of students.</p>
                    <a href="/course" className="btn btn-primary">Join now</a>
                </div>
            </div>
        );
    }
}


export default connect(null, null)(Banner);