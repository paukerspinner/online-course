import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class CourseBanner extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="course-banner" className="banner">
                <div className="banner-cover"></div>
                <div className="banner-text">
                    <h1>Design of PCB Altium Designer</h1>
                    <p>Cod of course: PCB</p>
                    <p className="text-justify small">The advanced training course is designed for engineers and technicians with higher professional education, who are engaged in the design and technological design of radioelectronic, electronic computing equipment, automation and control systems, etc. for various purposes, as well as for middle managers of design organizations.</p>
                </div>
            </div>
        );
    }
}


export default connect(null, null)(CourseBanner);