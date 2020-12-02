import React from 'react';
import MaterialForm from '../../../components/materials/materialForm';
import BreadCrumb from '../../../components/commons/breadcrumb';

class MaterialCreatePage extends React.Component {
    render() {
        return (
            <div className="container mt-4">
                <BreadCrumb 
                    breadcrumb_items={breadcrumb_items}
                />

                <div className="row mt-4">
                    <div className="col-lg-8 m-auto">
                        <MaterialForm type='create' />
                    </div>
                </div>
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
        label: 'Materials',
        path: '/management/materials'
    },
    {
        label: 'Create',
        active: true
    }
]

export default MaterialCreatePage;