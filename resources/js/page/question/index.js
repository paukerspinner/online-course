import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as API from '../../ulties/api';
import { QUESTION_LEVEL, QUESTION_TYPE } from '../../constants';
import QuestionShow from '../../components/questions/questionShow';

class QuestionManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            preview_question_id: parseInt(this.props.match.params.id)
        }
    }

    componentDidMount() {
        API.getQuestions().then(res => {
            this.setState({
                questions: res.data
            })
        })
    }

    showPreviewQuesiton(question_id) {
        const {preview_question_id} = this.state;
        this.setState({
            preview_question_id: preview_question_id == question_id? null : question_id
        })
    }
    
    render() {
        const { questions, preview_question_id } = this.state;
        return (
            <div className="container mt-4">
                <Link to="/management/questions/create" className="btn btn-primary">Create New Question</Link>
                <table className="table table-hover mt-4">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">STT</th>
                            <th scope="col">Module</th>
                            <th scope="col">Level</th>
                            <th scope="col">Type</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    {/* <tbody> */}
                    {questions.map((question, idx) => {
                        return (
                            <tbody key={idx}>
                                <tr className="text-center">
                                    <td>{idx+1}</td>
                                    <td>{question.section_id}</td>
                                    <td>{question.level == QUESTION_LEVEL.EASY ? 'Easy' : question.level == QUESTION_LEVEL.MEDIUM? 'Medium' : 'Hard'}</td>
                                    <td>{question.type == QUESTION_TYPE.MULTIPLE_CHOICE? 'Multiple Choice' : 'Single Choice'}</td>
                                    <td>
                                        <Link to={`/management/questions/${question.id}/edit`} className="btn btn-sm btn-success">Edit</Link>&nbsp;
                                        <a className="btn btn-sm btn-success" onClick={() => this.showPreviewQuesiton(question.id)}>Preview</a>
                                    </td>
                                </tr>
                                { preview_question_id == question.id &&
                                    <tr>
                                        <td colSpan="5" style={{ maxWidth: '10px' }}>
                                            <QuestionShow question={question}/>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        )
                    })}
                    {/* </tbody> */}
                </table>
                
            </div>
        )
    }
}


export default withRouter(connect(null, null)(QuestionManagement));