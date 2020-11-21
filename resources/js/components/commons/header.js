import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const MenuLink = ({ label, to, activeOnlyWhenExtract }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExtract} children={({ match }) => {
            var active = match ? 'active' : '';
            return (
                <li className={active}>
                    <NavLink to={to} className="nav-link">
                        {label}
                    </NavLink>
                </li>
            )
        }} />
    )
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light shadow">
                <a className="navbar-brand" href="#">Header</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <MenuLink label="Home" to="/" activeOnlyWhenExtract={true} />
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                                </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav">
                        {!this.props.is_logged &&
                            <MenuLink label="Login" to="/client/login" activeOnlyWhenExtract={true} />
                        }
                        {this.props.is_logged &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                        </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <NavLink to="/client/profile" className="dropdown-item" activeClassName="">Profile</NavLink>
                                    <a className="dropdown-item" onClick={this.props.logout}>Logout</a>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        is_logged : state.auth.is_logged
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        logout : () => {
            dispatch(actions.logout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);