import React from 'react';
import MaterialForm from '../../../components/materials/materialForm';
import BreadCrumb from '../../../components/commons/breadcrumb';

class MaterialEditPage extends React.Component {
    render() {
        return (
            <div className="container mt-4">
                <BreadCrumb 
                    breadcrumb_items={breadcrumb_items}
                />

                <div className="row mt-4">
                    <div className="col">
                        <MaterialForm type='edit' />
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
        label: 'Edit',
        active: true
    }
]

export default MaterialEditPage;