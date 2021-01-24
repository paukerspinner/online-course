import React from 'react';
import * as API from '../../../ulties/api';
import BreadCrumb from '../../commons/breadcrumb';
import TestResult from '../../course/testResult';
import Transcript from '../../course/transcript';

class StudentResultPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: [],
            transcript: {}
        }
    }

    componentDidMount() {
        const { user_id } = this.props.match.params;
        API.getTestsOfUser(user_id).then(res => {
            this.setState({ tests: res.data.tests });
        });

        API.getTranscript(user_id).then(res => {
            this.setState({
                transcript: res.data.transcript
            })
        })
    }

    render() {
        const { tests, transcript } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items} />
                <div className="row mt-4">
                    <div className="col-xl-4 col-md-8 offset-md-2 offset-xl-0 mb-2">
                        <Transcript transcript={transcript.data} fullname={transcript.fullname} />
                    </div>
                    <div className="col-xl-8 col-md-8 offset-md-2 offset-xl-0 mb-2">
                        <div className="card-bt hover-shadow h-100">
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