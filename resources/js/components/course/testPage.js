import React from 'react';
import { store } from '../..';
import * as actions from '../../actions';
import { withRouter, Link } from 'react-router-dom';
import * as API from '../../ulties/api';
import BreadCrumb from '../commons/breadcrumb';
import { stringOfTestLevel } from '../../ulties/string';
import moment from 'moment'

class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: {}
        }
        this.getTest = this.getTest.bind(this);
    }
    componentDidMount() {
        this.getTest();
    }
    getTest() {
        API.makeTest().then(res => {
            this.setState({
                test: res.data.test
            });
            console.log(res.data.test)
        }).catch(err => {
            console.log(err.response)
            if (err.response.status == 403) {
                store.dispatch(actions.setFlassMessage(err.response.data.message_error, 'warning'))
                this.props.history.push('/course/progress');
            } else {
                store.dispatch(actions.setFlassMessage('Have something wrong!', 'danger'))
            }
        })
    }

    render() {
        const { test } = this.state;
        const is_exam = test.section && test.section.is_exam;
        const title = test.section && test.section.title;
        
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items} />
                <div className="row mt-4">
                    <div className="col">
                        <div className="card-bt hover-shadow mb-4">
                            <div className="card-header bg-primary py-3">
                                <h5 className="m-0 font-weight-bold text-light">Infomation about test</h5>
                            </div>
                            <div className="card-body">
                                {/* <div className="p-2">
                                    <b>Type: </b>
                                    <span> {is_exam ? 'Examination' : 'Module test'}</span>
                                </div>     */}
                                <div className="p-2">
                                    <b>Title: </b>
                                    <span> {title}</span>
                                </div>
                                {
                                    test.type == 'module' ? (
                                        <div className="p-2">
                                            <b>Level: </b>
                                            <span> { stringOfTestLevel(test.level)}</span>
                                        </div>
                                    ) : null
                                }
                                <div className="p-2">
                                    <b>Completion Time: </b>
                                    <span> {renderTime(test.completion_time)} minutes</span>
                                </div>
                                <div className="p-2">
                                    <b>Status: </b>
                                    <span> {getStatusTest(test)}</span>
                                </div>
                                <div className="text-center">
                                    <Link to="/course/testing" className="btn btn-primary">
                                        {test.started_at == null ? 'Start' : 'Continue'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const renderNote = test_type => {
    switch(test_type) {
        case 'module':
            return 'In the difficulty level you will get 100% of the points. That number is respectively at the medium level of 80% and 60% at the easy level.';
        case 'exam':
            return 'The maximum ball is 20 for examination. Congratulation!';
        case 'entrance':
            return 'You need to complete the entrance test to continue the course.'
    }
}

const renderTime = time_in_second => {
    return time_in_second ? Math.round(time_in_second / 60) : 0;
}

const getStatusTest = test => {
    if (test.started_at == null) {
        return 'Ready';
    } else if (test.finished_at == null) {
        return 'Running';
    } else if (test.grade != null) {
        return 'Finished';
    }
}

const breadcrumb_items = [
    {
        label: 'Home',
        path: '/'
    },
    {
        label: 'Course',
        path: '/course'
    },
    {
        label: 'Test',
        active: true
    }
]

export default withRouter(TestPage);