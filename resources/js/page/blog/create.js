import React from 'react';
import * as API from '../../ulties/api';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import BreadCrumb from '../../components/commons/breadcrumb';

const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()));

class BlogCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: EditorState.createEmpty(),
            title: ''
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChangeEditor = this.handleOnChangeEditor.bind(this);
        this.handleOnDataChange = this.handleOnDataChange.bind(this);
    }
    
    handleOnChangeEditor(content) {
        this.setState({ content });
    }

    handleOnDataChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title, content } = this.state;
        const content_HTML = getHtml(content);
        API.postBlogs(title, content_HTML).then(res => {
            this.props.history.push('/blogs')
        }).catch(err => {
            console.log(err.response)
        })
        console.log(content_HTML)
    }

    render() {
        const { content } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items}/>
                <div className="row mt-4">
                    <div className="col-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="question_level">Title</label>
                                <input type="text" className="form-control shadow" name="title" onChange={this.handleOnDataChange} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="question">Content</label>
                                <Editor
                                    editorState={content}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.handleOnChangeEditor}
                                    toolbar={
                                        {
                                            options: ['inline', 'list', 'textAlign', 'image'],
                                            inline: { inDropdown: true },
                                            list: { inDropdown: true },
                                            textAlign: { inDropdown: true },
                                            link: { inDropdown: true },
                                            image: {
                                                defaultSize: {
                                                    width: "300"
                                                },
                                            },
                                            history: { inDropdown: true },
                                        }
                                    }
                                />
                            </div>

                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const breadcrumb_items = [
    {
        label: 'Blogs',
        path: '/blogs'
    },
    {
        label: 'Create',
        active:true
    }
]

export default BlogCreate;