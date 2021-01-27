import React from 'react';
import * as API from '../../../ulties/api';
import BreadCrumb from '../../commons/breadcrumb';
class UsersManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        API.getUsers().then(res => {
            this.setState({users: res.data.users.data});
        })
    }
    
    render() {
        const { users } = this.state; 
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items}/>
                <div className="row">
                    <div className="col">
                    <table className="table table-striped mt-4">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">№</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, idx) => {
                        return (
                            <tr className="text-center" key={idx}>
                                <td>{ idx + 1 }</td>
                                <td>{ [user.surname, user.name, user.patronymic].join(' ') }</td>
                                <td>{ user.email }</td>
                                <td>{ user.role }</td>
                                <td>actions</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                    </div>
                </div>
                
            </div>
        )
    }
}

const breadcrumb_items = [
    {
        label: 'Management',
        path: '#',
    },
    {
        label: 'Users',
        active: true
    }
]

export default UsersManagementPage;