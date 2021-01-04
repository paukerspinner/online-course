import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {

    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <br/>
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="mx-3">OCourse <sup>*</sup></div>
                </a>
                <br/>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="fas fa-tachometer-alt"></i>Dashboard
                    </a>
                </li>

                <hr className="sidebar-divider" />

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                        <i className="fas fa-book-open"></i>
                        <span>Contents</span>
                    </a>
                    <div id="collapseOne" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/management/materials">
                                <i className="fas fa-file-pdf" aria-hidden="true" /> &nbsp;Materials
                            </Link>
                            <Link className="collapse-item" to="/management/questions">
                                <i className="fas fa-question-circle" aria-hidden="true"/> Question
                            </Link>
                        </div>
                    </div>
                </li>

                <hr className="sidebar-divider" />

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-address-book"></i>
                        <span>Accounts</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" to="/management/users">
                                <i className="fa fa-user-circle" aria-hidden="true"/> &nbsp;Users
                            </Link>
                            <Link className="collapse-item" to="/management/students">
                                <i className="fa fa-graduation-cap" aria-hidden="true" /> Students
                            </Link>
                        </div>
                    </div>
                </li>

                <hr className="sidebar-divider" />

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseThree"
                        aria-expanded="true" aria-controls="collapseThree">
                        <i className="fas fa-comments"></i>
                        <span>Communication</span>
                    </a>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="#">
                                <i className="fa fa-envelope" aria-hidden="true"/> Messages
                            </Link>
                            <Link className="collapse-item" to="/management/notifications/create">
                                <i className="fa fa-bell" aria-hidden="true" /> Notifications
                            </Link>
                        </div>
                    </div>
                </li>

                <hr className="sidebar-divider d-none d-md-block" />

                <div className="card bg-primary border-0 text-light">
                    <div className="card-body text-center">
                        <p className="text-center mb-2"><strong>OCOURSE</strong> is developed by Pauker. Click the button below for more infomation</p>
                        <a className="btn btn-success btn-sm" href="https://www.facebook.com/xuancanh.pham.165/">Contact !</a>
                    </div>
                </div>

            </ul>
        )
    }
}

export default Sidebar;