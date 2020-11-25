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
import QuestionForm from './components/questions/questionForm';
import NotFoundPage from './page/notFound';
import QuesitonCreatePage from './page/question/create';
import QuestionEditPage from './page/question/edit';
import QuestionManagement from './page/question'
import CoursePage from './page/course';


// import for testing
import QuestionShow from './components/questions/questionShow';
//

class App extends React.Component {
    componentDidMount() {
        window.scrollTo(1000,1000);
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
                                    <Route path="/test" exact component={QuestionShow} />
                                    <Route path="/" exact component={HomePage} />
                                    <Route path="/login" exact component={Login} />
                                    <Route path="/register" exact component={Register} />
                                    <Route path="/profile" exact component={ProfilePage} />
                                    <Route path="/course" exact component={CoursePage} />

                                    {this.props.is_admin && 
                                        (<Switch>
                                            <Route path="/management/questions/create" exact component={QuesitonCreatePage} />
                                            <Route path="/management/questions/:id?" exact component={QuestionManagement} />
                                            <Route path="/management/questions/:id/edit" exact component={QuestionEditPage}/>
                                        </Switch>)
                                    }
                                    <Route>
                                        <NotFoundPage />
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