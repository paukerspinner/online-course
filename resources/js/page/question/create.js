import React from 'react';
import QuestionForm from '../../components/questions/questionForm';

class QuesitonCreatePage extends React.Component {
    render() {
        return (
            <div className="container mt-4">
                <QuestionForm type='create'/>
            </div>
        );
    }
}

export default QuesitonCreatePage;