import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as API from '../../ulties/api';

class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error_message: ''
        }
        this.handleOnChangeData = this.handleOnChangeData.bind(this)
    }
    handleOnChangeData(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        API.login(this.state.email, this.state.password).then(res => {
            this.props.history.push('/');
            this.props.successLogin(res.data);
        }).catch(err => {
            this.setState({
                error_message: err.response.data.error_message
            })
            console.log(err.response.data.error_message)
            this.props.failureLogin(err.response);
        })
        event.preventDefault();
    }
    render() {
        return (
            <div className="container mt-0">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form className="user" onSubmit={this.handleSubmit.bind(this)}>
                                                <div className="form-group">
                                                    <input type="email" name="email" onChange={this.handleOnChangeData} className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..." required/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" name="password" onChange={this.handleOnChangeData} className="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Password" required/>
                                                    <small className="text-danger">{this.state.error_message}</small>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </button>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <Link to="/register" className="small">Create an Account</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        successLogin: (payload) => {
            dispatch(actions.successLogin(payload));
        },
        failureLogin: payload => {
            dispatch(actions.failureLogin(payload));
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(QuestionForm));