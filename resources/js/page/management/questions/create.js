import React from 'react';
import QuestionForm from '../../../components/questions/questionForm';
import BreadCrumb from '../../../components/commons/breadcrumb';

class QuesitonCreatePage extends React.Component {
    render() {
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items}/>
                <QuestionForm type='create'/>
            </div>
        );
    }
}

const breadcrumb_items = [
    {
        label: 'Management',
        path: '#',
    },
    {
        label: 'Questions',
        path: '/management/questions'
    },
    {
        label: 'Create',
        active: true
    }
]

export default QuesitonCreatePage;