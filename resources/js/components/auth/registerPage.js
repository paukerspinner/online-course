import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as API from '../../ulties/api';
import { connect } from 'react-redux';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            patronymic: '',
            email: '',
            password: '',
            confirm: '',
            error_message: {}
        }
        this.handleOnChange = this.handleOnChange.bind(this)
    }
    handleOnChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleOnSubmit(event) {
        API.register({
            name: this.state.name, 
            surname: this.state.surname, 
            patronymic: this.state.patronymic, 
            email: this.state.email, 
            password: this.state.password, 
            confirm: this.state.confirm
        }).then(res => {
            console.log(res.data)
            this.props.history.push('/login');
        }).catch(err => {
            console.log(err.response)
            this.setState({
                error_message: err.response.data
            })
        })
        event.preventDefault();
    }
    render() {
        return (
            <div className="container mt-0">
                <div className="card-bt o-hidden hover-shadow my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    <form className="user" onSubmit={this.handleOnSubmit.bind(this)}>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input onChange={this.handleOnChange} type="text" className="form-control form-control-user" name="name"
                                                    placeholder="First Name" />
                                                <small className="text-danger">{this.state.error_message.name}</small>
                                            </div>
                                            <div className="col-sm-6">
                                                <input onChange={this.handleOnChange} type="text" className="form-control form-control-user" name="surname"
                                                    placeholder="Last Name" />
                                                <small className="text-danger">{this.state.error_message.surname}</small>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.handleOnChange} type="text" className="form-control form-control-user" name="patronymic"
                                                placeholder="Patronymic" />
                                            <small className="text-danger">{this.state.error_message.patronymic}</small>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.handleOnChange} type="email" className="form-control form-control-user" name="email"
                                                placeholder="Email Address" />
                                            <small className="text-danger">{this.state.error_message.email}</small>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input onChange={this.handleOnChange} type="password" className="form-control form-control-user"
                                                    name="password" placeholder="Password" />
                                                <small className="text-danger">{this.state.error_message.password}</small>
                                            </div>
                                            <div className="col-sm-6">
                                                <input onChange={this.handleOnChange} type="password" className="form-control form-control-user"
                                                    name="confirm" placeholder="Repeat Password" />
                                                <small className="text-danger">{this.state.error_message.confirm}</small>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-user btn-block">
                                            Register Account
                                        </button>
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        {/* <a className="small" href="forgot-password.html">Forgot Password?</a> */}
                                    </div>
                                    <div className="text-center">
                                        <Link to="/login" className="small">Already have an account? Login!</Link>
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

export default withRouter(connect(null, null)(Register));