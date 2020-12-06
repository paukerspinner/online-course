import React from 'react';
import { formatTimestamp } from '../../ulties/string';

class BlogShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            is_expanded: false
        }
    }

    toggleCommentShow() {
        this.setState({
            is_expanded: !this.state.is_expanded
        })
    }
    
    render() {
        const { blog } = this.props
        const { comments, is_expanded } = this.state;
        return (
            <div>
                <h3>{blog.title}</h3>
                <div dangerouslySetInnerHTML={{__html: blog.content}}></div>
                <div className="text-right">
                    <p className="m-0">{blog.author_name} - {formatTimestamp(blog.created_at)}</p>
                    {
                        !is_expanded
                        ? (
                            <a className="" onClick={this.toggleCommentShow.bind(this)}>read more...</a>
                        )
                        : (
                            <a className="" onClick={this.toggleCommentShow.bind(this)}>close...</a>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default BlogShow;