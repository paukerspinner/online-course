import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class CourseTarget extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="course-target" className="container-fluid content">
                <h1>Targets</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, id consectetur. Eveniet, nulla beatae ab, aliquid nihil quam repellat maiores numquam adipisci ut rerum voluptatibus, nam quas esse dolorem dignissimos!</p>
                <div className="row justify-content-md-center">
                    <div className="col-sm-12 col-lg-6">
                        <div className="card-target">
                            <div className="card-img">
                                <i className="fa fa-address-book-o" aria-hidden="true"></i>
                            </div>
                            <div className="card-text">
                                <h4>Education Center</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim modi, ea autem unde quos.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <div className="card-target">
                            <div className="card-img">
                                <i className="fa fa-address-book-o" aria-hidden="true"></i>
                            </div>
                            <div className="card-text">
                                <h4>Education Center</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim modi, ea autem unde quos.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <div className="card-target">
                            <div className="card-img">
                                <i className="fa fa-address-book-o" aria-hidden="true"></i>
                            </div>
                            <div className="card-text">
                                <h4>Education Center</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim modi, ea autem unde quos.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <div className="card-target">
                            <div className="card-img">
                                <i className="fa fa-address-book-o" aria-hidden="true"></i>
                            </div>
                            <div className="card-text">
                                <h4>Education Center</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim modi, ea autem unde quos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(null, null)(CourseTarget);