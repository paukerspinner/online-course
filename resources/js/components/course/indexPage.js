import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as API from '../../ulties/api';
import moment from 'moment'
import BreadCrumb from '../commons/breadcrumb';

class CoursePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            materials: []
        }
    }
    componentDidMount() {
        API.getSections().then(res => {
            this.setState({
                sections: res.data
            })
        })

        API.getMaterials().then(res => {
            this.setState({
                materials: res.data.materials.data
            })
        })
    }

    render() {
        const { materials } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items}/>
                <div className="text-right mt-4">
                    <Link to="course/test" className="btn btn-primary">Next test</Link>
                </div>
                <div className="row mt-4">
                    {
                        materials.map(material => {
                            return (
                                <div className="col-xl-6 mb-2" key={material.id}>
                                    <a className="card-bt hover-shadow h-100 none-a" href={'/' + material.path} target="_blank" >
                                        <div className="card-body">
                                            <div className="">
                                                <div>
                                                    <i className="far fa-file-pdf fa-2x text-gray-300"/>
                                                    <span className="h5 pl-2 font-weight-bold text-gray-800">
                                                        {material.title}
                                                    </span>
                                                </div>
                                                <p className="text-right mb-0">
                                                    Updated: {moment(material.updated_at).format('DD/MM/YYYY')}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const breadcrumb_items = [
    {
        label: 'Home',
        path: '/'
    },
    {
        label: 'Course',
        path: 'course',
        active:true
    }
]

export default withRouter(CoursePage);