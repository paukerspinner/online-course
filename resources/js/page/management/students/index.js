import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../../ulties/api';
import BreadCrumb from '../../../components/commons/breadcrumb';
class StudentsManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        API.getUsers({role: 'student'}).then(res => {
            this.setState({students: res.data.users.data});
        });
    }
    
    render() {
        const { students } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items}/>
                <table className="table table-hover mt-4">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">STT</th>
                            <th scope="col">Full name</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Grade</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {students.map((user, idx) => {
                        return (
                            <tr className="text-center" key={idx}>
                                <td>{ idx + 1 }</td>
                                <td>{ [user.surname, user.name, user.patronymic].join(' ') }</td>
                                <td>{ user.rating }</td>
                                <td>
                                    {
                                        user.grade
                                        ? <span className="text-uppercase">{ user.grade }</span> 
                                         : (<span title="Student have not completed the course">-</span>) 
                                    }
                                </td>
                                <td>
                                    <Link to={`/management/students/${user.id}/result`} className="btn btn-sm btn-info">Detail</Link>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                
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
        label: 'Students',
        active: true
    }
]

export default StudentsManagementPage;