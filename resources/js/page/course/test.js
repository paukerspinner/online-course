import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as API from '../../ulties/api';
import BreadCrumb from '../../components/commons/breadcrumb';

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
        }).catch(err => console.log(err.response))
    }

    render() {
        const { test } = this.state;
        const is_exam = test.section && test.section.is_exam;
        const title = test.section && test.section.title;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items} />
                <div className="row mt-2">
                    <div className="col">
                        <div className="card shadow mb-4">
                            <div className="card-header bg-primary py-3">
                                <h5 className="m-0 font-weight-bold text-light">Infomation about test</h5>
                            </div>
                            <div className="card-body">
                                <div className="p-2">
                                    <b>Type: </b>
                                    <span> {is_exam ? 'Examination' : 'Module test'}</span>
                                </div>    
                                <div className="p-2">
                                    <b>Title: </b>
                                    <span> {title}</span>
                                </div>
                                <div className="p-2">
                                    <b>Level: </b>
                                    <span> {test.level}</span>
                                </div>
                                <div className="p-2">
                                    <b>Completion Time: </b>
                                    <span> {renderTime(test.completion_time)} min</span>
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

const renderTime = time_in_second => {
    let min = '00' + Math.floor(time_in_second / 60)
    let sec = '00' + time_in_second % 60;
    return min.substr(-2) + ':' + sec.substr(-2)
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

const mapStateToProps = state => {
    return {

    }
}

export default withRouter(connect(mapStateToProps, null)(TestPage));