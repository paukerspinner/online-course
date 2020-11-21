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
                <h1>About Us</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, id consectetur. Eveniet, nulla beatae ab, aliquid nihil quam repellat maiores numquam adipisci ut rerum voluptatibus, nam quas esse dolorem dignissimos!</p>
                <div className="row justify-content-md-center">
                    <div className="col-sm-12 col-lg-3">
                        <div className="card-aboutus">
                            <div className="card-img">
                                <i className="fa fa-address-book-o" aria-hidden="true"></i>
                            </div>
                            <h3>Education Center</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim modi, ea autem unde quos.</p>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-3">
                        <div className="card-aboutus">
                            <div className="card-img">
                                <i className="fa fa-address-book-o" aria-hidden="true"></i>
                            </div>
                            <h3>Education Center</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim modi, ea autem unde quos.</p>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-3">
                        <div className="card-aboutus">
                            <div className="card-img">
                                <i className="fa fa-address-book-o" aria-hidden="true"></i>
                            </div>
                            <h3>Education Center</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim modi, ea autem unde quos.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(null, null)(AboutUs);