import React from 'react';
import * as API from '../../ulties/api'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { store } from '../..'
import * as actions from '../../actions'

class ProfileShow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            name: '',
            surname: '',
            patronymic: '',
            is_male: -1,
            date_of_birth: null
        }

        this.handleChangeData = this.handleChangeData.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.logged_user) {
            this.getProfile(this.props.logged_user.id)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.logged_user && this.props.logged_user) {
            this.getProfile(this.props.logged_user.id)
        }
    }

    getProfile(user_id) {
        API.getProfile(user_id).then(res => {
            this.setState({
                email: res.data.profile.email,
                name: res.data.profile.name,
                surname: res.data.profile.surname,
                is_male: res.data.profile.is_male + '',
                date_of_birth: res.data.profile.date_of_birth,
                patronymic: res.data.profile.patronymic
            })
        })
    }

    handleChangeData(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const user_id = this.props.logged_user.id;
        const { name, surname, patronymic, is_male, date_of_birth} = this.state;
        API.updateProfile(user_id, {
            name,
            surname,
            patronymic,
            is_male: is_male != '-1' ? is_male : null,
            date_of_birth
        }).then(res => {
            const {name, surname, patronymic, is_male, date_of_birth } = res.data.profile;
            this.setState({name, surname, patronymic, is_male: is_male+'', date_of_birth})
            store.dispatch(actions.setFlassMessage(res.data.message))
        })
    }
    
    render() {
        const { email, name, surname, is_male, date_of_birth, patronymic } = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center mt-4">
                    <div className="col-lg-8">
                        <div className="card mb-4 border-0">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold">Profile</h6>
                            </div>
                            <div className="card-body">
                                <div className="text-right">
                                    <Link to="/change-password" className="btn btn-sm btn-secondary">Change password</Link>
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control shadow" id="email" name="email" value={email} onChange={this.handleChangeData} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">First name</label>
                                        <input type="text" className="form-control shadow" id="name" name="name" value={name} onChange={this.handleChangeData}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="surname">Last name</label>
                                        <input type="text" className="form-control shadow" id="surname" name="surname" value={surname} onChange={this.handleChangeData}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="patronymic">Patronymic</label>
                                        <input type="text" className="form-control shadow" id="patronymic" name="patronymic" value={patronymic} onChange={this.handleChangeData}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="is_male">Sex</label>
                                        <select className="form-control shadow" name="is_male" id="is_male" value={is_male || ''} onChange={this.handleChangeData}>
                                            <option value='-1'>------</option>
                                            <option value={1}>Male</option>
                                            <option value={0}>Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date_of_birth">Date Of Birth</label>
                                        <input type="date" className="form-control shadow" value={date_of_birth || ''} id="date_of_birth" name="date_of_birth" onChange={this.handleChangeData}/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        logged_user: state.auth.user
    }
}

export default connect(mapStateToProps)(ProfileShow);