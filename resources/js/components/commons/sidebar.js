import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {

    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">OCourse <sup>*</sup></div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>

                <hr className="sidebar-divider" />

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                        <b>Management</b>
                    </a>
                    <div id="collapseOne" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/management/materials">
                                <i className="fa fa-file-pdf-o" aria-hidden="true" /> Materials
                            </Link>
                            <Link className="collapse-item" to="/management/questions">
                                <i className="fa fa-question-circle" aria-hidden="true"/> Question
                            </Link>
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="#" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <b>Management</b>
                    </a>
                    <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/management/materials">
                                <i className="fa fa-file-pdf-o" aria-hidden="true" /> Materials
                            </Link>
                            <Link className="collapse-item" to="/management/questions">
                                <i className="fa fa-question-circle" aria-hidden="true"/> Question
                            </Link>
                        </div>
                    </div>
                </li>

                <hr className="sidebar-divider d-none d-md-block" />

                <div className="text-center d-none d-md-inline">
                    {/* <button className="rounded-circle border-0" id="sidebarToggle"></button> */}
                </div>
                <div className="sidebar-card">
                    <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="" />
                    <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                    <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
                </div>

            </ul>
        )
    }
}

export default Sidebar;