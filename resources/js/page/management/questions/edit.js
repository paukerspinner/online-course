import React from 'react';
import QuestionForm from '../../../components/questions/questionForm';
import BreadCrumb from '../../../components/commons/breadcrumb';

class QuesitonEditPage extends React.Component {
    render() {
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items}/>
                <QuestionForm type='edit'/>
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
        label: 'Edit',
        active: true
    }
]

export default QuesitonEditPage;