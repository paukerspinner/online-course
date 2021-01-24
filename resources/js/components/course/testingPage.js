import React from 'react';
import { connect } from 'react-redux';
import { store } from '../..';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import * as API from '../../ulties/api';
import QuestionTestForm from './questionTestForm';
import BreadCrumb from '../commons/breadcrumb';

class TestingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test_questions: [],
            test: {},
            time_remainning: null,
        }
        this.timming = this.timming.bind(this);
        this.getTestQuestions = this.getTestQuestions.bind(this);
        this.finishTest = this.finishTest.bind(this);
    }
    componentDidMount() {
        const { is_logged, history } = this.props;
        if (!is_logged) {
            history.push("/login");
        } else {
            this.getTestQuestions();
        }
    }
    getTestQuestions() {
        API.getPendingTest().then(res => {
            this.setState({
                test: res.data.test,
                test_questions: res.data.test_questions,
                time_remainning: res.data.time_remainning
            })
            this.timming();
        }).catch(err => {
            store.dispatch(actions.setFlassMessage('Have something wrong!', 'danger'));
            this.props.history.push('/course/test');
        })
    }

    componentWillUnmount() {
        clearTimeout(this.state.timeout);
    }

    timming() {
        const { time_remainning } = this.state;
        if (time_remainning > 0) {
            this.setState({
                time_remainning: this.state.time_remainning - 1
            })
            this.state.timeout = setTimeout(this.timming, 1000);
        } else {
            clearTimeout(this.state.timeout);
            this.finishTest();
        }
    }

    finishTest() {
        API.finishTest().then(res => {
            console.log(res.data);
            this.props.history.push('/course/progress');
        })
    }

    render() {
        const { test_questions, time_remainning, test } = this.state;
        const title = test.section && test.section.title;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items} />
                <div className="d-flex card shadow bg-primary text-white p-2 mt-4">
                    <h3 className="m-auto pb-2">{title}</h3>
                    <h3 className="m-auto">{renderTime(time_remainning)}</h3>
                </div>
                <div className="row mt-2">
                    {   test_questions.length ? 
                        test_questions.map((test_question, idx) => {
                            return (
                                <div className="col-lg-12" key={idx}>
                                    <QuestionTestForm test_question={test_question} idx={idx} />
                                </div>
                            )
                        }) : null
                    }
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={this.finishTest}>Get score</button>
                </div>
            </div>
        )
    }
}

const renderTime = time_in_second => {
    let min = '00' + Math.floor(time_in_second/60)
    let sec = '00' + time_in_second % 60;
    return min.substr(-2) + ':' + sec.substr(-2)
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
        path: '/course/test'
    },
    {
        label: 'Running',
        active: true
    }
]

const mapStateToProps = state => {
    return {
        is_logged: state.auth.is_logged
    }
}

export default withRouter(connect(mapStateToProps, null)(TestingPage));