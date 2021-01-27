import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="aboutus" className="container-fluid content">
                <h1 className="mb-0">About Us</h1>
                <p>A distinctive feature of our company is the high speed and quality of project fulfillment. This is achieved through the use of advanced technologies and the experience of a stable, friendly team of professionals in the education process.</p>
                <div className="row justify-content-md-center">
                    <div className="col-sm-12 col-lg-3 mb-2">
                        <div className="card-aboutus h-100">
                            <div className="card-img">
                                <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
                            </div>
                            <h3>Easy and absorbing</h3>
                            <p>
                                <a href="https://docs.google.com/forms/d/17b5YVhTZ8EwIevn5hD6kq22Qi3XGhTI7m7_ikb6hHpY/edit" target="_blank" className="btn btn-primary">Registration</a>
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-3 mb-2">
                        <div className="card-aboutus h-100">
                            <div className="card-img">
                                <i className="fas fa-hourglass-start" aria-hidden="true"></i>
                            </div>
                            <h3>Save time </h3>
                            <p>No more rushing to class. Now you choose the time for your classes - learn when you want!</p>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-3 mb-2">
                        <div className="card-aboutus h-100">
                            <div className="card-img">
                                <i className="far fa-comment-dots" aria-hidden="true"></i>
                            </div>
                            <h3>Learn faster than the rest!</h3>
                            <p>
                                <a href="https://docs.google.com/forms/d/1GntQzGvyb7e4jsOEauFFjtiiSyZY1EdZB016DIaS5VE/edit" target="_blank" className="btn btn-primary">Feedback</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(null, null)(AboutUs);