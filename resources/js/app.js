import React from 'react';
import { Redirect, Route, Link, Switch, useRouteMatch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as API from './ulties/api';
import * as actions from './actions';

import Topbar from './components/commons/topbar';
import Sidebar from './components/layouts/admin/sidebar';
import Footer from './components/commons/footer';

import Client from './components/layouts/client';
import Admin from './components/layouts/admin';
import Login from './components/auth/login';
import Register from './components/auth/register';
import ProfilePage from './page/profilePage';
import HomePage from './page/homePage';


class App extends React.Component {
    componentDidMount() {
        API.checkAuthenticatedToken(this.props.access_token).then(res => {
            this.props.successCheckToken(res.data);
        }).catch(err => {
            this.props.failureCheckToken(err.response);
        })
    }
    render() {
        return (
            <div id="page-top">
                <div id="wrapper">
                    {this.props.is_admin && <Sidebar />}
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Topbar />
                            <div>
                                <Switch>
                                    <Route path="/" exact component={HomePage} />
                                    <Route path="/login" exact component={Login} />
                                    <Route path="/register" exact component={Register} />
                                    <Route path="/profile" exact component={ProfilePage} />
                                    <Route>
                                        {/* {this.props.is_admin && <Admin/>}
                                        {!this.props.is_admin && <Client/>} */}
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        is_admin: state.auth.user && state.auth.user.role == 'admin',
        // is_user : state.auth.user && state.auth.user.role == 'user',
        access_token: state.auth.access_token
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        successCheckToken: (payload) => {
            dispatch(actions.successCheckToken(payload))
        },
        failureCheckToken: payload => {
            dispatch(actions.failureCheckToken(payload))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));