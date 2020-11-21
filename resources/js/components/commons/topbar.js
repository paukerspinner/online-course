import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class Topbar extends React.Component {
    render() {
        return (
            <nav id="topbar" className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>
                <a href="/" className="nav-link topbar-logo">OCourse</a>
                <ul className="navbar-nav">
                    <li><a href="#course-target" className="nav-link">Target</a></li>
                    <li><a href="#course-banner" className="nav-link">Course</a></li>
                    <li><a href="#aboutus" className="nav-link">AboutUs</a></li>
                </ul>

                <ul className="navbar-nav ml-auto">

                    <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link" href="#" role="button">
                            link1
                        </a>
                    </li>

                    <div className="topbar-divider d-none d-sm-block"></div>
                    {this.props.is_logged &&
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.props.username}</span>
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Profile
                                        </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Settings
                                        </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Activity Log
                                        </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" onClick={this.props.logout} href="#" data-toggle="modal" data-target="#logoutModal">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Logout
                                        </a>
                            </div>
                        </li>
                    }
                    {!this.props.is_logged &&
                        <li className="nav-item no-arrow">
                            <Link className="nav-link" to="/login">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Login</span>
                                <i className="fa fa-sign-in" aria-hidden="true"></i>
                            </Link>
                        </li>
                    }
                </ul>

            </nav>
        )
    }
}

const mapStateToProps = state => {
    let username = state.auth.user ? state.auth.user.name + ' ' + state.auth.user.surname : ''
    return {
        is_logged: state.auth.is_logged,
        username
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        logout: () => {
            dispatch(actions.logout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);