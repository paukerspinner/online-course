import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as API from '../../ulties/api';

class Login extends React.Component {
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
        event.preventDefault();
        API.login(this.state.email, this.state.password).then(res => {
            this.props.successLogin(res.data);
            const { from } = this.props.location.state || { from: { pathname: '/' }};
            this.props.history.push(from)
        }).catch(err => {
            this.setState({
                error_message: err.response.data.error_message
            })
            console.log(err.response.data.error_message)
            this.props.failureLogin(err.response);
        })
    }
    render() {
        return (
            <div className="container mt-0">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card-bt o-hidden hover-shadow my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome to OCourse!</h1>
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

const mapStateToProps = state => {
    return {
        is_logged: state.auth.is_logged
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));