import { fromJS } from 'immutable';
import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../ulties/api';
import moment from 'moment'
import BreadCrumb from '../../components/commons/breadcrumb';

class NotificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        }
    }
    
    componentDidMount() {
        API.getMyNotifications().then(res => {
            this.setState({
                notifications: res.data.my_notifications.data
            })
        })
    }
    render() {
        const { notifications } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items}/>
                <div className="row mt-4">
                    <div className="col">
                        {
                            notifications && notifications.length ? (
                                notifications.map(elem => {
                                    return (
                                        <Link to={`/notifications/${elem.id}`} className="card-bt none-a hover-shadow mt-2" key={elem.id}>
                                            <div className="card-body">
                                                <div>
                                                    {
                                                        !elem.is_read && (<sup className="fas fa-circle text-primary" title="New"></sup>)
                                                    }
                                                    <span className="h4"> {elem.notification.title}</span>
                                                </div>
                                                <div className="text-right">
                                                    <p className={'m-0 ' + (!elem.is_read ? 'text-primary' : '')}>{moment(elem.notification.created_at).format('lll')}</p>
                                                </div>
                                                <div style={{maxHeight: '40px', overflow: 'hidden'}} className="">
                                                    <div dangerouslySetInnerHTML={{__html: elem.notification.content}}></div>
                                                </div>
                                                <div className="fadeout"></div>
                                            </div>
                                        </Link>
                                    )
                                })
                            ) : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const breadcrumb_items = [
    {
        label: 'Notifications',
        path: '#'
    },
    {
        label: 'All',
        active:true
    }
]

export default NotificationPage;