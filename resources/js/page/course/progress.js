import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as API from '../../ulties/api';
import { connect } from 'react-redux'
import * as actions from '../../actions';
import { store } from '../..';
import TestResult from '../../components/test/testResult';
import BreadCrumb from '../../components/commons/breadcrumb';
import Transcript from '../../components/user/transcript';
import { stringOfTestLevel } from '../../ulties/string';

class ProgressPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: [],
            recommended_materials: [],
            transcript: {},
            fail_modules_in_exam: []
        }
        this.getRecommendedMaterials = this.getRecommendedMaterials.bind(this);
        this.getTest = this.getTest.bind(this);
        this.requestUpLevel = this.requestUpLevel.bind(this);
        this.requestDownLevel = this.requestDownLevel.bind(this);
        this.getMyTranscript = this.getMyTranscript.bind(this)
    }
    componentDidMount() {
        this.getTest();
        this.getRecommendedMaterials();
        this.getFailModulesInExam();
        this.getMyTranscript();
    }
    getTest() {
        API.getMyTests().then(res => {
            this.setState({
                tests: res.data.tests
            })
        }).catch(err => {
            // console.log(err.response)
        })
    }

    getMyTranscript() {
        API.getMyTranscript().then(res => {
            this.setState({
                transcript: res.data.transcript
            })
        });
    }

    getRecommendedMaterials() {
        API.getRecommendedMaterials().then(res => {
            this.setState({
                recommended_materials: res.data.materials
            });
        })
    }

    getFailModulesInExam() {
        API.getFailModulesInExam().then(res => {
            this.setState({
                fail_modules_in_exam: res.data.fail_modules
            });
        })
    }

    requestUpLevel() {
        API.requestUpLevel().then(res => {
            store.dispatch(actions.setFlassMessage(res.data.message));
            this.getRecommendedMaterials();
        }).catch(err => {
            if (err.response.status == 403) {
                store.dispatch(actions.setFlassMessage(err.response.data.message_error, 'warning'))
            }
        })
    }

    requestDownLevel() {
        API.requestDownLevel().then(res => {
            store.dispatch(actions.setFlassMessage(res.data.message));
            this.getRecommendedMaterials();
        }).catch(err => {
            if (err.response.status == 403) {
                store.dispatch(actions.setFlassMessage(err.response.data.message_error, 'warning'))
            }
        })
    }

    render() {
        const { tests, recommended_materials, transcript, fail_modules_in_exam } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items} />
                <div className="row">
                    {
                        <div className="col-lg-8 col-md-9 m-auto">
                            <div className="card-bt hover-shadow  mt-4">
                                <div className="card-body text-center p-0">
                                    <div className="row">
                                        {
                                            (transcript.data && transcript.data.slice(-1)[0].rating > 0) ? (
                                                <div className="col-12 pt-4">
                                                    <span className="mb-2 text-xs font-weight-bold">You should carefully learn the following modules: </span>
                                                    {
                                                        fail_modules_in_exam.length ? fail_modules_in_exam.map(fail_module => fail_module.title).join(', ') : 'no module at all'
                                                    }
                                                </div>
                                            ) : null
                                        }
                                        {
                                            recommended_materials.length && recommended_materials[0].section_id > 1 && recommended_materials[0].section_id < 10 ? (  // section from 2 to 9 are modules
                                                <div className="col-lg-6 mt-4 text-center">
                                                    <div className="mb-2 text-xs font-weight-bold">Current level</div>
                                                    <a className="btn btn-sm btn-primary" onClick={this.requestDownLevel}>
                                                        <i className="fas fa-arrow-alt-circle-down"></i>
                                                    </a>
                                                    <span className="text-xs font-weight-bold text-primary text-uppercase p-4">{stringOfTestLevel(recommended_materials[0].level)}</span>
                                                    <a className="btn btn-sm btn-primary" onClick={this.requestUpLevel}>
                                                        <i className="fas fa-arrow-alt-circle-up"></i>
                                                    </a>
                                                </div>
                                            ) : null
                                        }
                                        {
                                            recommended_materials.length ? (
                                                <div className="col-lg-6 m-auto text-center">
                                                    <div>
                                                        <div className="mt-4 mb-2 text-xs font-weight-bold">Recommended materials</div>
                                                    </div>
                                                    {
                                                        recommended_materials.map((material, idx) => {
                                                            return (
                                                                <div key={idx}>
                                                                    <a className="m-0" href={'/' + material.path} target="_blank">{idx + 1}. {material.title}</a>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            ) : null
                                        }
                                        <div className="col-12 p-4">
                                            <Link to="/course" className="btn btn-primary">Go to course</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className="row">
                    <div className="col-xl-4 col-md-8 offset-md-2 offset-xl-0 mt-4">
                        <Transcript transcript={transcript.data} fullname={transcript.fullname}/>
                    </div>
                    <div className="col-xl-8 col-md-8 offset-md-2 offset-xl-0 mt-4">
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
                                    }) : 'You have not completed any test.'
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

const mapStateToProps = state => {
    return {
        logged_user: state.auth.user
    }
}

export default connect(mapStateToProps)(withRouter(ProgressPage));