import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as API from '../../ulties/api';
import moment from 'moment'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import BreadCrumb from '../commons/breadcrumb';

const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()));

class BlogShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: EditorState.createEmpty(),
            blog: null,
            comments: []
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChangeEditor = this.handleOnChangeEditor.bind(this);
        this.getCommentsOfBlog = this.getCommentsOfBlog.bind(this);
        this.resetInputData = this.resetInputData.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.deleteBlog = this.deleteBlog.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params
        API.getBlog(id).then(res => {
            this.setState({
                blog: res.data.blog
            })
        });

        this.getCommentsOfBlog();
    }

    getCommentsOfBlog() {
        const { id } = this.props.match.params
        API.getCommentsOfBlog(id).then(res => {
            this.setState({
                comments: res.data.comments.data
            })
        })
    }
    
    handleOnChangeEditor(comment) {
        this.setState({ comment });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { comment } = this.state;
        const { id } = this.props.match.params;
        const comment_HTML = getHtml(comment);
        if (comment_HTML.length > 8) {
            API.postCommentToBlog(id, comment_HTML).then(res => {
                this.getCommentsOfBlog();
                this.resetInputData();
            }).catch(err => console.log(err.response))
        }
    }

    deleteComment(id) {
        if (confirm('Do you want to permanently delete this comment?')) {
            API.deleteComment(id).then(res => {
                this.getCommentsOfBlog();
            }).catch(err => console.log(err.response))
        }
    }

    deleteBlog(id) {
        if (confirm('Do you want to permanently delete this blog?')) {
            API.deleteBlog(id).then(res => {
                this.props.history.push('/blogs')
            })
        }
    }

    resetInputData() {
        this.setState({
            comment: EditorState.createEmpty()
        })
    }

    render() {
        const { blog, comment, comments } = this.state;
        const { logged_user } = this.props;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items}/>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card-bt hover-shadow">
                            <div className="card-body">
                                <h3>{blog && blog.title} &nbsp;
                                    {
                                        logged_user && blog && (logged_user.role == 'admin' || logged_user.id == blog.author.id)  && (
                                            <a className="text-secondary" title="Delete" onClick={() => this.deleteBlog(blog.id)} >
                                                <i className="fas fa-trash-alt"></i>
                                            </a>
                                        )
                                    }
                                </h3>
                                <div className="text-right">
                                    <p className="m-0">
                                        <Link to="#">{ blog && blog.author.name }</Link>
                                        / {moment(blog && blog.created_at).format('lll')}
                                    </p>
                                </div>
                                <div dangerouslySetInnerHTML={{__html: blog && blog.content}}></div>

                                <hr/>
                                {
                                    comments && comments.map(cmt => {
                                        return (
                                            <div className="pt-2" key={cmt.id}>
                                                <div className="row pt-0">
                                                    <div className="col-6">
                                                        <Link to="#">{ cmt.author.name }: </Link>
                                                    </div>
                                                    <div className="col-6 text-right">
                                                        {
                                                            logged_user && (logged_user.role == 'admin' || logged_user.id == cmt.author.id)  && (
                                                                <a className="text-secondary" title="Delete" onClick={() => this.deleteComment(cmt.id)} >
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </a>
                                                            )
                                                        }
                                                        &nbsp;
                                                        <small>{ moment(cmt.created_at).fromNow() }</small>
                                                    </div>
                                                    
                                                    <div className="col-12" dangerouslySetInnerHTML={{__html: cmt.content}}></div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                <form onSubmit={this.handleSubmit}>
                                    <Editor
                                        editorState={comment}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={this.handleOnChangeEditor}
                                        toolbar={
                                            {
                                                options: ['inline', 'list'],
                                                inline: { inDropdown: true },
                                                list: { inDropdown: true },
                                            }
                                        }
                                    />
                                <div className="form-group text-center mt-4">
                                    <button type="submit" className="btn btn-primary">Add comment</button>
                                </div>
                            </form>
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
        label: 'Blogs',
        path: '/blogs'
    },
    {
        label: 'Show',
        active:true
    }
]

const mapStateToProps = state => {
    return {
        logged_user: state.auth.user
    }
}

export default connect(mapStateToProps, null)(BlogShow);