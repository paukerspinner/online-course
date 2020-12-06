import React from 'react';
import * as API from '../../../ulties/api';
import BreadCrumb from '../../../components/commons/breadcrumb';
import TestResult from '../../../components/test/testResult';
import Transcript from '../../../components/user/transcript';

class StudentResultPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: [],
            user: {}
        }
    }

    componentDidMount() {
        API.getTestsOfUser(this.props.match.params.user_id).then(res => {
            this.setState({ tests: res.data.tests });
        });
        API.getUser(this.props.match.params.user_id).then(res => {
            this.setState({ user: res.data.user })
        })
    }

    render() {
        const { tests, user } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items} />
                <div className="row">
                    <div className="col-lg-4 mt-4">
                        <Transcript transcript={user.transcript} fullname={[user.surname, user.name, user.patronymic].join(' ')} />
                    </div>
                    <div className="col">
                        <div className="card shadow mt-4">
                            <div className="card-header bg-primary">
                                <h5 className="m-0 font-weight-bold text-light">
                                    Test results
                                </h5>
                            </div>
                            <div className="card-body">
                                {
                                    tests.length ? tests.map((test, idx) => {
                                        return (
                                            <div key={test.id}>
                                                <TestResult test={test} />
                                                { tests[idx+1] != undefined && test.section_id != tests[idx+1].section_id ? (<hr/>) : (<br/>) }
                                            </div>
                                        )
                                    }) : 'Student has not completed any test.'
                                }
                            </div>
                        </div>
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
        label: 'Students',
        path: '/management/students',
    },
    {
        label: 'Result',
        active: true
    }
]

export default StudentResultPage;