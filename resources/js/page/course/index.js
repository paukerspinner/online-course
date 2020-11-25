import React from 'react';
import TestForm from '../../components/test/testForm';
import * as API from '../../ulties/api';

class CoursePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }
    }
    componentDidMount() {
        API.makeTest().then(res => {
            console.log(res.data)
            this.setState({
                questions: res.data.questions
            })
        })
    }

    render() {
        return (
            <div className="container mt-4">
                <TestForm type="test" />
            </div>
        )
    }
}

export default CoursePage;