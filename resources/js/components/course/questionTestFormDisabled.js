import React from 'react';
import { QUESTION_TYPE } from '../../constants';

class QuestionTestFormDisabled extends React.Component {
    render() {
        const { test_question } = this.props;
        const { test_answers } = test_question;
        return (
                    <form>
                        {test_question.type == QUESTION_TYPE.SINGLE_CHOICE &&
                            test_answers.map(test_answer => {
                                return (
                                    <div key={test_answer.id}>
                                        <input 
                                            type="radio" 
                                            id={test_answer.id} 
                                            value={test_answer.id}
                                            name="test_answer"
                                            disabled
                                            checked={test_answer.is_selected}
                                        />&nbsp;
                                        <label htmlFor={test_answer.id}>
                                            {test_answer.text}
                                            {renderCorrection(test_answer)}
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
                                            checked={test_answer.is_selected}
                                            disabled
                                        />&nbsp;
                                        <label htmlFor={test_answer.id}>
                                            {test_answer.text}
                                            {renderCorrection(test_answer)}
                                        </label>
                                    </div>
                                )
                            })}
                        <div className="text-right">
                            {isCorrectAnswers(test_answers) && <button type="submit" disabled className="btn btn-success">
                                <i className="fa fa-check" aria-hidden="true"></i>    
                            </button>}
                            {!isCorrectAnswers(test_answers) && <button type="submit" disabled className="btn btn-danger">
                                <i className="fa fa-times" aria-hidden="true"></i>    
                            </button>}
                        </div>
                    </form>
        )
    }
}

const renderCorrection = answer => {
    if (answer.is_corrected) {
        return <i className="fas fa-check text-success pl-2" title="Correct answer"></i>
    };
}

const isCorrectAnswers = answers => {
    return answers.reduce((is_correct, answer) => {
        return is_correct && (answer.is_selected == answer.is_corrected)
    }, true);
}

export default QuestionTestFormDisabled;