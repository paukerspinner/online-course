import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as API from '../../../ulties/api';
import { QUESTION_LEVEL, QUESTION_TYPE } from '../../../constants';
import QuestionShow from './questionShow';
import BreadCrumb from '../../commons/breadcrumb';
import { store } from '../../../'
import * as actions from '../../../actions'

class QuestionsManagementPage extends React.Component {
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
                questions: res.data.questions.data
            })
        })
    }

    showPreviewQuesiton(question_id) {
        const {preview_question_id} = this.state;
        this.setState({
            preview_question_id: preview_question_id == question_id? null : question_id
        })
    }

    deleteQuestion(question_id) {
        API.deleteQuestion(question_id).then(res => {
            store.dispatch(actions.setFlassMessage(res.data.message))
            this.setState({
                questions: this.state.questions.filter(question => question.id != question_id)
            })
        })
    }
    
    render() {
        const { questions, preview_question_id } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items}/>
                <div className="text-right">
                    <Link to="/management/questions/create" className="btn btn-primary mt-4">Create New Question</Link>
                </div>
                <table className="table table-striped mt-4">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">№</th>
                            <th scope="col">Module</th>
                            <th scope="col">Level</th>
                            <th scope="col">Type</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {questions.map((question, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <tr className="text-center">
                                    <td>{idx+1}</td>
                                    <td>{question.section.title}</td>
                                    <td>{question.level == QUESTION_LEVEL.EASY ? 'Easy' : question.level == QUESTION_LEVEL.MEDIUM? 'Medium' : 'Hard'}</td>
                                    <td>{question.type == QUESTION_TYPE.MULTIPLE_CHOICE? 'Multiple Choice' : 'Single Choice'}</td>
                                    <td>
                                        <Link to={`/management/questions/${question.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>&nbsp;
                                        <a className="btn btn-sm btn-info" onClick={() => this.showPreviewQuesiton(question.id)}>Preview</a>&nbsp;
                                        <button onClick={() => this.deleteQuestion(question.id)} className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                                { preview_question_id == question.id &&
                                    <tr>
                                        <td colSpan="5" style={{ maxWidth: '10px' }}>
                                            <QuestionShow question={question}/>
                                        </td>
                                    </tr>
                                }
                            </React.Fragment>
                        )
                    })}
                    </tbody>
                </table>
                
            </div>
        )
    }
}

const breadcrumb_items = [
    {
        label: 'Management',
        path: '#',
    },
    {
        label: 'Questions',
        active: true
    }
]

export default withRouter(connect(null, null)(QuestionsManagementPage));