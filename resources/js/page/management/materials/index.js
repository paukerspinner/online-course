import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as API from '../../../ulties/api';
import BreadCrumb from '../../../components/commons/breadcrumb';
import { QUESTION_LEVEL as MATERIAL_LEVEL } from '../../../constants';

class MaterialManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            materials: []
        }
    }

    componentDidMount() {
        API.getMaterials().then(res => {
            this.setState({
                materials: res.data.materials
            });
            console.log(res.data)
        })
    }

    render() {
        const { materials } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items} />
                <div className="row">
                    <div className="col">
                        <Link to="/management/materials/create" className="btn btn-primary mt-4">Create New Material</Link>
                        <table className="table table-hover mt-4">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">STT</th>
                                    <th scope="col">Module</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Level</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    materials && materials.map((material, idx) => {
                                        return (
                                            <tr className="text-center" key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{material.section_id}</td>
                                                <td>{material.title}</td>
                                                <td>{renderMaterialLevel(material.level)}</td>
                                                <td>
                                                    <Link to={`/management/materials/${material.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>&nbsp;
                                                    <a href={'/' + material.path} className="btn btn-sm btn-info" target="_blank">Show</a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const breadcrumb_items = [
    {
        label: 'Management',
        path: '#',
    },
    {
        label: 'Materials',
        active: true
    }
]

const renderMaterialLevel = material_level => {
    switch (material_level) {
        case MATERIAL_LEVEL.EASY:
            return 'Easy';
        case MATERIAL_LEVEL.MEDIUM:
            return 'Medium';
        case MATERIAL_LEVEL.HARD:
            return 'Hard';
    }
}

export default withRouter(connect(null, null)(MaterialManagement));