import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { store } from '../..'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as API from '../../ulties/api';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            new_password: '',
            confirm: '',
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
        const { password, new_password, confirm } = this.state;
        API.changePassword(password, new_password, confirm).then(res => {
            this.props.logout();
            store.dispatch(actions.setFlassMessage(res.data.message));
            this.props.history.push('/login');
        }).catch(err => {
            console.log(err.response)
            this.setState({
                error_message: err.response.data.error_message
            })
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
                                                <h1 className="h4 text-gray-900 mb-4">Change password!</h1>
                                            </div>
                                            <form className="user" onSubmit={this.handleSubmit.bind(this)}>
                                                <div className="form-group">
                                                    <input type="password" name="password" onChange={this.handleOnChangeData} className="form-control form-control-user"
                                                        placeholder="Your current password" required/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" name="new_password" onChange={this.handleOnChangeData} className="form-control form-control-user" placeholder="New password" required/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" name="confirm" onChange={this.handleOnChangeData} className="form-control" placeholder="Password confirm"/>
                                                    <small className="text-danger">{this.state.error_message}</small>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    Change password
                                                </button>
                                            </form>
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
        logout: () => {
            dispatch(actions.logout());
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Login));