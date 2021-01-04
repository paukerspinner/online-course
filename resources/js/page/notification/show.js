import { fromJS } from 'immutable';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import * as API from '../../ulties/api';
import moment from 'moment'
import BreadCrumb from '../../components/commons/breadcrumb';

class NotificationShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: null
        }
        this.getNotification = this.getNotification.bind(this);
    }
    
    componentDidMount() {
        this.getNotification();
    }

    componentDidUpdate(prevprops, prevstate) {
        const prevId = prevprops.match.params.id;
        const nextId = this.props.match.params.id;
        if (prevId != nextId) {
            this.getNotification();
        }
    }

    getNotification() {
        const { id } = this.props.match.params;
        console.log('get')
        API.getMyNotification(id).then(res => {
            this.setState({
                notification: res.data.notification_user
            })
            if (!res.data.notification_user.is_read) {
                API.updateMyNotification(id, { is_read: true });
                API.getMyNotifications({
                    limit: 4,
                    is_read: false
                }).then(res => {
                    this.props.setNewNotifications(res.data.my_notifications.data)
                })
            }
        })
    }

    render() {
        const { notification } = this.state;
        return (
            <div className="container mt-4">
                <BreadCrumb breadcrumb_items={breadcrumb_items}/>
                <div className="row mt-4">
                    <div className="col">
                        <a className="card-bt none-a hover-shadow mt-2">
                            {
                                notification ? (
                                    <div className="card-body">
                                        <h4> {notification.notification.title}</h4>
                                        <div className="text-right">
                                            <p className='m-0'>{moment(notification.notification.created_at).format('lll')}</p>
                                        </div>
                                        <div dangerouslySetInnerHTML={{__html: notification.notification.content}}></div>
                                    </div>
                                ) : (
                                    <div className="card-body text-center">
                                        Loading...
                                    </div>
                                )
                            }
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

const breadcrumb_items = [
    {
        label: 'Notifications',
        path: '/notifications'
    },
    {
        label: 'Show',
        active:true
    }
]

const mapDispatchToProps = (dispatch, props) => {
    return {
        setNewNotifications: new_notifications => {
            dispatch(actions.setNewNotifications(new_notifications));
        }
    }
}

export default connect(null, mapDispatchToProps)(NotificationShow);