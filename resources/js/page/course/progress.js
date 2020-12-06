import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as API from '../../ulties/api';
import { QUESTION_LEVEL as TEST_LEVEL, TEST_GRADE, USER_LEVEL } from '../../constants';
import * as actions from '../../actions';
import { store } from '../..';
import TestResult from '../../components/test/testResult';
import BreadCrumb from '../../components/commons/breadcrumb';
import Transcript from '../../components/user/transcript';

class ProgressPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: [],
            recommended_materials: [],
            myself: {}
        }
        this.getRecommendedMaterials = this.getRecommendedMaterials.bind(this);
        this.getTest = this.getTest.bind(this);
        this.requestUpLevel = this.requestUpLevel.bind(this);
        this.getMyself = this.getMyself.bind(this);
    }
    componentDidMount() {
        this.getTest();
        this.getRecommendedMaterials();
        this.getMyself();
    }
    getTest() {
        API.getMyTests().then(res => {
            this.setState({
                tests: res.data.tests
            })
            console.log(res.data.tests)
        }).catch(err => {
            console.log(err.response)
        })
    }

    getMyself() {
        API.getMyself().then(res => {
            this.setState({ myself: res.data.user });
            console.log(res.data)
        })
    }

    getRecommendedMaterials() {
        API.getRecommendedMaterials().then(res => {
            this.setState({
                recommended_materials: res.data.materials
            });
            console.log(res.data.materials)
        })
    }

    requestUpLevel() {
        if (confirm('You sure to upgrade level')) {
            API.requestUpLevel().then(res => {
                store.dispatch(actions.setFlassMessage(res.data.message));
                this.getRecommendedMaterials();
            }).catch(err => {
                if (err.response.status == 403) {
                    store.dispatch(actions.setFlassMessage(err.response.data.message_error, 'warning'))
                }
            })
        }
    }

    render() {
        const { tests, recommended_materials, myself } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items} />
                <div className="row">
                    {
                        recommended_materials.length ?
                        (<div className="col mt-4">
                            <div className="card shadow">
                                <div className="card-header bg-primary">
                                    <h5 className="m-0 font-weight-bold text-light">
                                        Information
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <div>
                                        <p className="m-0">Your level: {renderUserLevel(recommended_materials[0].level)}</p>
                                        <a className="" onClick={this.requestUpLevel}>Request up level {'>>'}</a>
                                    </div><hr />
                                    <div>
                                        <span className="">Recommended materials:</span>
                                    </div>
                                    {
                                        recommended_materials.map((material, idx) => {
                                            return (
                                                <div key={idx}>
                                                    <p className="m-0">{idx + 1}. {material.title}</p>
                                                    <a href={'/' + material.path} target="_blank" className="pl-6">
                                                        Show {'-->'}
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="row mt-2 text-center">
                                        <div className="col">
                                            <Link to="/course" className="btn btn-primary">Go to course</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>) : null
                    }
                </div>
                <div className="row">
                    <div className="col-lg-4 mt-4">
                        <Transcript transcript={myself.transcript} fullname={[myself.surname, myself.name, myself.patronymic].join(' ')}/>
                    </div>
                    <div className="col mt-4">
                        <div className="card shadow">
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

const renderTestLevel = test_level => {
    switch (test_level) {
        case TEST_LEVEL.EASY:
            return 'EASY';
        case TEST_LEVEL.MEDIUM:
            return 'MEDIUM';
        case TEST_LEVEL.HARD:
            return 'HARD';
    }
}

const renderUserLevel = user_level => {
    switch (user_level) {
        case USER_LEVEL.PASS:
            return 'Normal';
        case USER_LEVEL.GOOD:
            return 'Good';
        case USER_LEVEL.HARD:
            return 'Excellent';
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
        label: 'Progress',
        active: true
    }
]

export default withRouter(ProgressPage);