import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as API from '../../ulties/api';
import { formatDate } from '../../ulties/string';
import BreadCrumb from '../../components/commons/breadcrumb';

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
            console.log(res.data)
            this.setState({
                materials: res.data.materials
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
                                    <div className="card border-left-primary shadow h-100">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-lg-8">
                                                    <i className="fa fa-file-pdf-o fa-2x text-gray-300"/>
                                                    <a href={'/' + material.path} target="_blank" className="none-a h5 pl-2 font-weight-bold text-gray-800">
                                                        {material.title}
                                                    </a>
                                                </div>
                                                <div className="col-lg-4">
                                                    {/* <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Earnings (Monthly)</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div> */}
                                                    <div className="pl-2 pt-2">
                                                        Updated: {formatDate(material.updated_at)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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