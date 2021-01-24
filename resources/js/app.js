import React from 'react';
import { Redirect, Route, Link, Switch, useRouteMatch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as API from './ulties/api';
import * as actions from './actions';

import Topbar from './components/commons/topbar';
import Sidebar from './components/commons/sidebar';
import Footer from './components/commons/footer';
import AuthRoute from './routes/authRoute';
import FlassMessage from './components/commons/flassMessage';

import Login from './components/auth/loginPage';
import Register from './components/auth/registerPage';
import ChangePassword from './components/auth/changePasswordPage';

import ProfileShow from './components/profile/showPage';
import HomePage from './components/home/indexPage';
import NotFoundPage from './components/errors/notFound';
import QuesitonCreatePage from './components/management/questions/createPage';
import QuestionEditPage from './components/management/questions/editPage';
import QuestionsManagementPage from './components/management/questions/indexPage'
import CoursePage from './components/course/indexPage';
import TestPage from './components/course/testPage';
import TestingPage from './components/course/testingPage';
import ProgressPage from './components/course/progressPage';
import MaterialsManagementPage from './components/management/materials/indexPage';
import MaterialCreatePage from './components/management/materials/createPage';
import MaterialEditPage from './components/management/materials/editPage';
import BlogPage from './components/blog/indexPage';
import StudentsManagemntPage from './components/management/students/indexPage';
import StudentResultPage from './components/management/students/resultPage';
import UsersManagementPage from './components/management/users/indexPage';
import BlogCreate from './components/blog/createPage';
import BlogShow from './components/blog/showPage';
import  NotificationPage from './components/notification/indexPage';
import NotificationShow from './components/notification/showPage';
import NotificationCreate from './components/management/notification/createPage';

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
                                    <AuthRoute path="/change-password" exact component={ChangePassword} />
                                    <AuthRoute path="/profile" exact component={ProfileShow} />
                                    <AuthRoute path="/course" exact component={CoursePage} />
                                    <AuthRoute path="/course/test" exact component={TestPage}/>
                                    <AuthRoute path="/course/testing" exact component={TestingPage}/>
                                    <AuthRoute path="/course/progress" exact component={ProgressPage}/>
                                    <AuthRoute path="/blogs" exact component={BlogPage} />
                                    <AuthRoute path="/blogs/create" exact component={BlogCreate} />
                                    <AuthRoute path="/blogs/:id" exact component={BlogShow} />
                                    <AuthRoute path="/notifications" exact component={NotificationPage} />
                                    <AuthRoute path="/notifications/:id" exact component={NotificationShow} />

                                    {is_admin && 
                                        (<Switch>
                                            <Route path="/management/questions/create" exact component={QuesitonCreatePage} />
                                            <Route path="/management/questions/:id?" exact component={QuestionsManagementPage} />
                                            <Route path="/management/questions/:id/edit" exact component={QuestionEditPage}/>
                                            <Route path="/management/materials" exact component={MaterialsManagementPage} />
                                            <Route path="/management/materials/create" exact component={MaterialCreatePage} />
                                            <Route path="/management/materials/:id/edit" exact component={MaterialEditPage} />
                                            <Route path="/management/users" exact component={UsersManagementPage} />
                                            <Route path="/management/students" exact component={StudentsManagemntPage} />
                                            <Route path="/management/students/:user_id/result" exact component={StudentResultPage} />
                                            <Route path="/management/notifications/create" exact component={NotificationCreate} />
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