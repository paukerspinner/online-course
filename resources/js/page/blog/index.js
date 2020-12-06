import React from 'react';
import BlogShow from '../../components/blog/blogShow';
import * as API from '../../ulties/api';

class BlogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: []
        }
    }
    
    componentDidMount() {
        API.getBlogs().then(res => {
            this.setState({blogs: res.data.blogs})
        })
    }
    render() {
        const { blogs } = this.state;
        return (
            <div className="container mt-4">
                <div className="mt-4 text-right">
                    <a href="#" className="btn btn-primary shadow-sm">
                        Create question
                    </a>
                </div>
                <div className="row">
                    <div className="col">
                        {
                            blogs.length ? (
                                blogs.map(blog => {
                                    return (
                                        <div key={blog.id}>
                                            <BlogShow blog={blog}/>
                                            <hr/>
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

export default BlogPage;