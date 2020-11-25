import React from 'react';
import QuestionForm from '../../components/questions/questionForm';

class QuesitonEditPage extends React.Component {
    render() {
        return (
            <div className="container mt-4">
                <QuestionForm type='edit'/>
            </div>
        );
    }
}

export default QuesitonEditPage;