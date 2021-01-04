import { fromJS } from 'immutable';
import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../ulties/api';
import moment from 'moment'
import BreadCrumb from '../../components/commons/breadcrumb';

class BlogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: []
        }
    }
    
    componentDidMount() {
        API.getBlogs().then(res => {
            this.setState({blogs: res.data.blogs.data})
        })
    }
    render() {
        const { blogs } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items}/>
                <div className="mt-4 text-right">
                    <Link to="/blogs/create" className="btn btn-primary shadow-sm">
                        Create a new blog
                    </Link>
                </div>
                <div className="row">
                    <div className="col">
                        {
                            blogs.length ? (
                                blogs.map(blog => {
                                    return (
                                        <div className="card-bt hover-shadow mt-2" key={blog.id}>
                                            <div className="card-body">
                                                <h3>{blog.title}</h3>
                                                <div style={{maxHeight: '100px', overflow: 'hidden'}}>
                                                    <div dangerouslySetInnerHTML={{__html: blog.content}}></div>
                                                </div>
                                                <div className="fadeout"></div>
                                                <div className="text-right">
                                                    <p className="m-0">{blog.author.name} - {moment(blog.created_at).format('lll')}</p>
                                                    <Link to={`/blogs/${blog.id}`}>Read more...</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const breadcrumb_items = [
    {
        label: 'Blogs',
        path: '#'
    },
    {
        label: 'All',
        active:true
    }
]

export default BlogPage;