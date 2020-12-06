import React from 'react';
import { QUESTION_LEVEL as TEST_LEVEL, TEST_GRADE, USER_LEVEL } from '../../constants';

class TestResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { test } = this.props;
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
                </div>
                <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
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

export default TestResult;