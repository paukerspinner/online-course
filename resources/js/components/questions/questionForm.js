import React from 'react';
import { withRouter } from 'react-router-dom';
import { store } from '../../';
import * as actions from '../../actions';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import * as API from '../../ulties/api';
// import { convertToHTML, convertFromHTML } from 'draft-convert';
// import stateToHTML from 'draft-js-export-html';
import htmlToDraft from 'html-to-draftjs';
import { QUESTION_TYPE, QUESTION_LEVEL } from '../../constants';

const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()));
const htmlToEditorState = html_markup => {
    const blocksFromHTML = htmlToDraft(html_markup);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );
    return EditorState.createWithContent(state)
}

const toolbar_config = {
    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'image'],
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    image: {
        defaultSize: {
            width: "300"
        }
    },
    history: { inDropdown: true },
}

class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            question: {
                text: null,
                type: QUESTION_TYPE.SINGLE_CHOICE,
                level: QUESTION_LEVEL.MEDIUM,
                section_id: 1
            },
            answers: [
                {
                    text: '', is_correct: false
                },
                {
                    text: '', is_correct: false
                },
                {
                    text: '', is_correct: false
                },
                {
                    text: '', is_correct: false
                }
            ],
            sections: []
        }
        this.handleOnChangeEditor = this.handleOnChangeEditor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectSingleChoice = this.handleSelectSingleChoice.bind(this);
        this.handleSelectMultipleChoice = this.handleSelectMultipleChoice.bind(this);
        this.handleChangeDataQuestion = this.handleChangeDataQuestion.bind(this);
        this.handleChangeDataAnswer = this.handleChangeDataAnswer.bind(this);
    }

    componentDidMount() {
        const question_id = parseInt(this.props.match.params.id);
        if (this.props.type == 'edit') {
            API.getQuestion(question_id).then(res => {
                let question = Object.assign({}, res.data, { answers: undefined });
                this.setState({
                    question,
                    answers: res.data.answers,
                    editorState: htmlToEditorState(question.text)
                })
            }).catch(err => console.log(err.response))
        }

        API.getSections().then(res => {
            this.setState({
                sections: res.data
            })
        })
    }

    handleChangeDataQuestion(event) {
        let question = { ...this.state.question };
        question[event.target.name] = parseInt(event.target.value);
        this.setState({
            question
        })
        if (event.target.name == 'type') {
            this.state.answers.forEach(answer => {
                answer.is_correct = false
            });
        }
    }

    handleChangeDataAnswer(event) {
        let answers = [...this.state.answers];
        let question_key = parseInt(event.target.name);
        answers[question_key].text = event.target.value;
        this.setState({
            answers
        })
    }

    handleOnChangeEditor(editorState) {
        this.setState({ editorState });
    }

    handleSelectSingleChoice(event) {
        let answer_key = parseInt(event.target.value)
        let answers = [...this.state.answers];
        for (let index = 0; index < answers.length; index++) {
            answers[index].is_correct = index == answer_key
        }
        this.setState({
            answers
        })
    }

    handleSelectMultipleChoice(event) {
        let answer_key = parseInt(event.target.value)
        let answers = [...this.state.answers];
        answers[answer_key].is_correct = !answers[answer_key].is_correct;
        this.setState({
            answers
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const content_HTML = getHtml(this.state.editorState);
        console.log(content_HTML)
        this.state.question.text = content_HTML;
        let { question, answers } = this.state;
        if (this.props.type == 'create') {
            API.addNewQuestion(question, answers).then(res => {
                this.resetData();
                this.props.history.push(`/management/questions/${res.data.question.id}`);
                store.dispatch(actions.setFlassMessage(res.data.message))
            }).catch(err => {
                store.dispatch(actions.setFlassMessage('Have something wrong. Please try again'));
            });
        } else if (this.props.type == 'edit') {
            const question_id = parseInt(this.props.match.params.id);
            API.editQuestion(question, answers, question_id).then(res => {
                this.resetData();
                this.props.history.push(`/management/questions/${question_id}`);
                store.dispatch(actions.setFlassMessage(res.data.message))
            }).catch(err => {
                store.dispatch(actions.setFlassMessage('Have something wrong. Please try again'));
            })
        }
    }

    resetData() {
        this.setState({
            editorState: EditorState.createEmpty(),
            question: {
                text: null,
                type: QUESTION_TYPE.SINGLE_CHOICE,
                level: QUESTION_LEVEL.MEDIUM
            },
            answers: [
                {
                    text: '', is_correct: false
                },
                {
                    text: '', is_correct: false
                },
                {
                    text: '', is_correct: false
                },
                {
                    text: '', is_correct: false
                }
            ]
        })
    }

    render() {
        const { editorState, question, answers, sections } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="question_level">Question Module</label>
                        <select name="section_id" className="form-control shadow" id="question_section" value={question.section_id} onChange={this.handleChangeDataQuestion}>
                            {
                                sections.map(section => {
                                    if (!section.is_exam) {
                                        return (
                                            <option value={section.id} key={section.id}>{section.title}</option>
                                        )
                                    }
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="question_level">Question Level</label>
                        <select name="level" className="form-control shadow" id="question_level" value={question.level} onChange={this.handleChangeDataQuestion}>
                            <option value={QUESTION_LEVEL.EASY}>Easy</option>
                            <option value={QUESTION_LEVEL.MEDIUM}>Medium</option>
                            <option value={QUESTION_LEVEL.HARD}>Hard</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="question">Question Content</label>
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={this.handleOnChangeEditor}
                            toolbar={toolbar_config}
                        />
                    </div>
                    {
                        answers.map((answer, idx) => {
                            return (
                                <div className="form-group" key={idx}>
                                    <label htmlFor={`option${idx}`} >Option {idx + 1}</label>
                                    <input type="text" className="form-control shadow" id={`option${idx}`} name={idx} value={answers[idx].text} required onChange={this.handleChangeDataAnswer}></input>
                                </div>
                            )
                        })
                    }


                    <div className="form-group">
                        <label htmlFor="question_type">Question Type</label>
                        <select name="type" className="form-control shadow" id="question_type" value={question.type} onChange={this.handleChangeDataQuestion}>
                            <option value={QUESTION_TYPE.SINGLE_CHOICE}>Single choice</option>
                            <option value={QUESTION_TYPE.MULTIPLE_CHOICE}>Multiple choice</option>
                        </select>
                    </div>
                    {question.type == QUESTION_TYPE.SINGLE_CHOICE &&
                        <div className="form-group row">
                            <div className="col-12">
                                <label>Answer</label>
                            </div>
                            {[0, 1, 2, 3].map(value => {
                                return (
                                    <div className="col-md-3 col-sm-6" key={value}>
                                        <input type="radio" id={`select${value}`} name="answer" value={value} onChange={this.handleSelectSingleChoice} checked={answers[value].is_correct} />&nbsp;
                                        <label htmlFor={`select${value}`}>Option {value + 1}</label>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    {question.type == QUESTION_TYPE.MULTIPLE_CHOICE &&
                        <div className="form-group row">
                            <div className="col-12">
                                <label htmlFor="Option4">Answer</label>
                            </div>
                            {[0, 1, 2, 3].map(value => {
                                return (
                                    <div className="col-md-3 col-sm-6" key={value}>
                                        <input type="checkbox" id={`select${value}`} name="multichoice_select1" value={value} onChange={this.handleSelectMultipleChoice} checked={answers[value].is_correct} />&nbsp;
                                        <label htmlFor={`select${value}`}>Option {value + 1}</label>
                                    </div>
                                )
                            })}
                        </div>
                    }

                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(QuestionForm);