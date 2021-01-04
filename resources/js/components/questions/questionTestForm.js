import React from 'react';
import { QUESTION_TYPE } from '../../constants';
import QuestionTestFormDisabled from './questionTestFormDisabled';
import * as API from '../../ulties/api';

class QuestionTestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test_answers: [],
            is_corrected: false,
            is_success_answers: null
        }

        this.correctAnswer = this.correctAnswer.bind(this);
    }

    componentDidMount() {
        const { test_question } = this.props;

        this.setState({
            test_answers: shuffle(test_question.test_answers)
        });
    }

    handleSelectSingleChoice(event) {
        this.state.test_answers.forEach(test_answer => {
            test_answer.is_selected = test_answer.id == parseInt(event.target.value)
        });
    }

    handleSelectMultipleChoice(event) {
        this.state.test_answers.forEach(test_answer => {
            if (test_answer.id == parseInt(event.target.value)) {
                test_answer.is_selected = !test_answer.is_selected
            }
        });
    }

    handleOnSubmit(event) {
        event.preventDefault();

        API.updataTestAnswers(this.state.test_answers).then(res => {
            this.setState({
                test_answers: res.data.test_answers_with_corrected,
                is_corrected: true,
                is_success_answers: this.checkSuccessAnswers(res.data.test_answers_with_corrected)
            })
        }).catch(err => {
            console.log(err.response)
        });
    }

    correctAnswer(test_answers_with_corrected) {
        let test_answers = [...this.state.test_answers];
        test_answers.forEach(test_answer => {
            test_answers_with_corrected.forEach(test_answer_with_corrected => {
                if (test_answer.id == test_answer_with_corrected.id) {
                    test_answer.is_corrected = test_answer_with_corrected.is_corrected;
                }
            });
        });
        this.setState({
            test_answers,
            is_corrected: true,
            is_success_answers: this.checkSuccessAnswers(test_answers)
        });
    }

    checkSuccessAnswers(test_answers) {
        return test_answers.reduce((result, test_answer) => {
            return result && (test_answer.is_corrected == test_answer.is_selected)
        }, true);
    }

    render() {
        const { test_question, idx } = this.props;
        const { test_answers, is_corrected, is_success_answers } = this.state;
        return (
            <div className="card-bt hover-shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Question {idx + 1}</h6>
                </div>
                <div className="card-body">
                    <div dangerouslySetInnerHTML={{ __html: test_question.text }}></div>
                    {
                        test_question && test_question.is_submited &&
                        <QuestionTestFormDisabled test_question={test_question} />
                    }
                    {
                        test_question && !test_question.is_submited &&
                        <form onSubmit={this.handleOnSubmit.bind(this)}>
                            {test_question.type == QUESTION_TYPE.SINGLE_CHOICE &&
                                test_answers.map(test_answer => {
                                    return (
                                        <div key={test_answer.id}>
                                            <input
                                                type="radio"
                                                id={test_answer.id}
                                                value={test_answer.id}
                                                name="test_answer"
                                                disabled={is_corrected}
                                                onChange={this.handleSelectSingleChoice.bind(this)}
                                                required
                                            />&nbsp;
                                            <label htmlFor={test_answer.id}>
                                                {test_answer.text}
                                                {is_corrected && renderCorrection(test_answer)}
                                            </label>
                                        </div>
                                    )
                                })}
                            {test_question.type == QUESTION_TYPE.MULTIPLE_CHOICE &&
                                test_answers.map(test_answer => {
                                    return (
                                        <div key={test_answer.id}>
                                            <input
                                                type="checkbox"
                                                id={test_answer.id}
                                                name="test_answer"
                                                value={test_answer.id}
                                                disabled={is_corrected}
                                                onChange={this.handleSelectMultipleChoice.bind(this)}
                                            />&nbsp;
                                            <label htmlFor={test_answer.id}>
                                                {test_answer.text}
                                                {is_corrected && renderCorrection(test_answer)}
                                            </label>
                                        </div>
                                    )
                                })}
                            <div className="text-right">
                                {!is_corrected && <button type="submit" className="btn btn-primary">Submit</button>}
                                {is_success_answers && <button type="submit" disabled className="btn btn-success">
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                </button>}
                                {is_success_answers === false && <button type="submit" disabled className="btn btn-danger">
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                </button>}
                            </div>
                        </form>
                    }
                </div>
            </div>
        )
    }
}

const renderCorrection = answer => {
    if (answer.is_corrected != answer.is_selected) {
        return <span className="text-danger"> X</span>
    };
}

const shuffle = arr => {
    return arr.sort(() => Math.random() - 0.5);
}

export default QuestionTestForm;