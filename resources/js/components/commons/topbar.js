import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import * as actions from '../../actions';
import * as API from '../../ulties/api';
import { Link } from 'react-router-dom';

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.getMyUnreadNotifications = this.getMyUnreadNotifications.bind(this);
        this.logout = this.logout.bind(this);
    }
    
    componentDidMount() {
        if (this.props.access_token) {
            this.getMyUnreadNotifications();
        }
    }

    componentDidUpdate(prevprops, prevstate) {
        if (prevprops.access_token != this.props.access_token && this.props.access_token) {
            this.getMyUnreadNotifications();
        }
    }
    
    getMyUnreadNotifications() {
        API.getMyNotifications({
            limit: 4,
            is_read: false
        }).then(res => {
            this.props.setNewNotifications(res.data.my_notifications.data)
        })
    }

    logout() {
        API.logout().then(res => {
            this.props.logout();
            this.props.resetAllState();
            this.props.history.push('/');
        })
    }

    render() {
        const { logged_user, new_notifications } = this.props;
        const username = logged_user && logged_user.name + ' ' + logged_user.surname;
        let notification_count = new_notifications && new_notifications.length;

        return (
            <nav id="topbar" className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>
                <a href="/" className="nav-link topbar-logo">
                    <img src="/images/logo/logo-blue.png" width="100px" alt=""/>
                </a>
                <ul className="navbar-nav">
                    <li><Link to="/course" className="nav-link"><b>Course</b></Link></li>
                    <li><Link to="/course/progress" className="nav-link"><b>Progress</b></Link></li>
                    <li><Link to="/blogs" className="nav-link"><b>Blog</b></Link></li>
                </ul>

                
                    {this.props.is_logged &&
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown no-arrow mx-1">
                                <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-bell fa-fw"></i>
                                    <span className="badge badge-danger badge-counter">{ renderNotificationCount(notification_count) }</span>
                                </a>
                                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="alertsDropdown">
                                    <h6 className="dropdown-header">
                                        New unread notifications
                                    </h6>
                                    {
                                        new_notifications ? new_notifications.slice(0, 3).map(notification => {
                                            return (
                                                <Link to={`/notifications/${notification.id}`} className="dropdown-item d-flex align-items-center" href="#" key={notification.id}>
                                                    <div>
                                                        <span className={!notification.is_read ? "font-weight-bold" : ''}>{ notification.notification.title }</span>
                                                        <div className="small text-gray-500">{ moment(notification.notification.created_at).format('ll') }</div>
                                                    </div>
                                                </Link>
                                            )
                                        }) : (
                                            <a className="dropdown-item text-center" href="#">
                                                <div className="small text-gray-500">Loading...</div>
                                            </a>
                                        )
                                    }
                                    <Link className="dropdown-item text-center small text-gray-500" to="/notifications">Show All Notifications</Link>
                                </div>
                            </li>

                            <div className="topbar-divider d-none d-sm-block"></div>
                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{username}</span>
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <Link className="dropdown-item" to="/profile">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" onClick={this.logout} href="#" data-toggle="modal" data-target="#logoutModal">
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                    }
                    {!this.props.is_logged &&
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item no-arrow">
                                <Link className="nav-link" to="/login">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                        Login&nbsp;
                                    </span>
                                    <i className="fas fa-sign-in-alt small" aria-hidden="true"/>
                                </Link>
                            </li>
                        </ul>
                    }
            </nav>
        )
    }
}

const renderNotificationCount = notification_count => {
    if (notification_count > 3) return '3+';
    if (notification_count == 0) return '';
    return notification_count;
}

const mapStateToProps = state => {
    return {
        is_logged: state.auth.is_logged,
        logged_user: state.auth.user,
        new_notifications: state.notification.new,
        access_token: state.auth.access_token
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        logout: () => {
            dispatch(actions.logout());
        },
        setNewNotifications: new_notifications => {
            dispatch(actions.setNewNotifications(new_notifications))
        },
        resetAllState: () => {
            dispatch(actions.resetAllState());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Topbar));