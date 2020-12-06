import React from 'react';
import { Redirect, Route, Link, Switch, useRouteMatch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as API from './ulties/api';
import * as actions from './actions';

import Topbar from './components/commons/topbar';
import Sidebar from './components/commons/sidebar';
import Footer from './components/commons/footer';
import AuthRoute from './components/auth/authRoute';
import FlassMessage from './components/commons/flassMessage';

import Login from './components/auth/login';
import Register from './components/auth/register';
import ProfilePage from './page/profilePage';
import HomePage from './page/homePage';
import NotFoundPage from './page/notFound';
import QuesitonCreatePage from './page/management/questions/create';
import QuestionEditPage from './page/management/questions/edit';
import QuestionsManagementPage from './page/management/questions'
import CoursePage from './page/course';
import TestPage from './page/course/test';
import TestingPage from './page/course/testing';
import ProgressPage from './page/course/progress';
import MaterialsManagementPage from './page/management/materials';
import MaterialCreatePage from './page/management/materials/create';
import MaterialEditPage from './page/management/materials/edit';
import BlogPage from './page/blog';
import StudentsManagemntPage from './page/management/students';
import StudentResultPage from './page/management/students/result';
import UsersManagementPage from './page/management/users';
// import for testing
// import NotFoundPage from './page/notFound';
//

class App extends React.Component {
    componentDidMount() {
        // window.scrollTo(1000,1000); -> running
        const { successCheckToken, failureCheckToken } = this.props;
        API.checkAuthenticatedToken().then(res => {
            successCheckToken(res.data);
        }).catch(err => {
            failureCheckToken(err.response);
        })
    }
    render() {
        const { is_logged, is_admin, flassMessage } = this.props;
        return (
            <div id="page-top">
                <div id="wrapper">
                    {is_admin && <Sidebar />}
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Topbar />
                            <div>
                                <Switch>
                                    {/* <Route path="/test" exact component={QuestionShow} /> */}
                                    <Route path="/" exact component={HomePage} />
                                    <Route path="/login" exact component={Login} />
                                    <Route path="/register" exact component={Register} />
                                    <AuthRoute path="/profile" exact component={ProfilePage} />
                                    <AuthRoute path="/course" exact component={CoursePage} />
                                    <AuthRoute path="/course/test" exact component={TestPage}/>
                                    <AuthRoute path="/course/testing" exact component={TestingPage}/>
                                    <AuthRoute path="/course/progress" exact component={ProgressPage}/>
                                    <AuthRoute path="/blog" exact component={BlogPage} />

                                    {is_admin && 
                                        (<Switch>
                                            <Route path="/management/questions/create" exact component={QuesitonCreatePage} />
                                            <Route path="/management/questions/:id?" exact component={QuestionsManagementPage} />
                                            <Route path="/management/questions/:id/edit" exact component={QuestionEditPage}/>
                                            <Route path="/management/materials" exact component={MaterialsManagementPage} />
                                            <Route path="/management/materials/create" exact component={MaterialCreatePage} />
                                            <Route path="/management/materials/:id/edit" exact component={MaterialEditPage} />
                                            <Route path="/management/students" exact component={StudentsManagemntPage} />
                                            <Route path="/management/users" exact component={UsersManagementPage} />
                                            <Route path="/management/users/:user_id/result" exact component={StudentResultPage} />
                                        </Switch>)
                                    }
                                    <Route>
                                        <NotFoundPage />
                                    </Route>

                                </Switch>
                            </div>
                        </div>
                        <Footer/>
                        <FlassMessage flassMessage={flassMessage}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        is_admin: state.auth.user && state.auth.user.role == 'admin',
        is_logged: state.auth.is_logged,
        flassMessage: state.flassMessage,
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