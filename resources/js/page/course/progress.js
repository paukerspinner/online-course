import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as API from '../../ulties/api';
import { QUESTION_LEVEL as TEST_LEVEL, TEST_GRADE, USER_LEVEL } from '../../constants';
import BreadCrumb from '../../components/commons/breadcrumb';

class ProgressPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: {},
            recommended_materials: []
        }
        this.getRecommendedMaterials = this.getRecommendedMaterials.bind(this);
        this.getTest = this.getTest.bind(this);
        this.requestUpLevel = this.requestUpLevel.bind(this);
    }
    componentDidMount() {
        this.getTest();
        this.getRecommendedMaterials();
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
                    console.log(res.data.message)
            }).catch(err => {
                console.log(err.response.data.message_error)
            })
        }
    }

    render() {
        const { tests, recommended_materials } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items} />
                <div className="row">
                    <div className="col-lg-4 mt-4">
                        {
                            recommended_materials.length &&
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
                                    </div><hr/>
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
                        }
                    </div>
                    <div className="col-lg-8 mt-4">
                        <div className="card shadow">
                            <div className="card-header bg-primary">
                                <h5 className="m-0 font-weight-bold text-light">
                                    Test results
                                </h5>
                            </div>
                            <div className="card-body">
                                {
                                    tests && tests.map(test => {
                                        return (
                                            <div className="row no-gutters align-items-center" key={test.id}>
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        <span>{test.section.title} - </span>
                                                        <span>
                                                            {renderTestLevel(test.level)}
                                                        </span>
                                                    </div>
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col-3">
                                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                                {test.grade || 0}%
                                                            </div>
                                                        </div>
                                                        <div className="col-9">
                                                            <div className="progress progress-sm mr-2">
                                                                <div className={test.grade >= TEST_GRADE.PASS ? 'progress-bar bg-success' : 'progress-bar bg-warning'} role="progressbar"
                                                                    style={{ width: `${test.grade}%` }} aria-valuenow={50} aria-valuemin={0}
                                                                    aria-valuemax={100}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        )
                                    })
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

export default withRouter(connect(null, null)(ProgressPage));