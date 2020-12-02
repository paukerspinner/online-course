import React from 'react';
import { QUESTION_TYPE } from '../../constants';

class QuestionShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const { question, type } = this.props;
        
        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Question {question.id}</h6>
                </div>
                <div className="card-body">
                    <div dangerouslySetInnerHTML={{ __html: question.text }}></div>
                    <div>
                        {question.type == QUESTION_TYPE.SINGLE_CHOICE &&
                            question.answers.map(answer => {
                            return (
                                <div key={answer.id}>
                                    <input type="radio" id={answer.id} name="answer" value={answer.id} disabled checked={answer.is_correct}/>&nbsp;
                                    <label htmlFor={answer.id}>{answer.text}</label>
                                </div>
                            )
                        })}
                        {question.type == QUESTION_TYPE.MULTIPLE_CHOICE &&
                            question.answers.map(answer => {
                            return (
                                <div key={answer.id}>
                                    <input type="checkbox" id={answer.id} name="answer" value={answer.id} disabled checked={answer.is_correct}/>&nbsp;
                                    <label htmlFor={answer.id}>{answer.text}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionShow;