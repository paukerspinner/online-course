import { divide } from 'lodash';
import React from 'react';
import Footer from '../../commons/footer';
import Header from '../../commons/header';
import Topbar from '../../commons/topbar';
import { Route, Switch } from 'react-router-dom';
import ProfilePage from '../../../page/profilePage';
import Register from '../../auth/register';
import Login from '../../auth/login';
import { connect } from 'react-redux';

class Client extends React.Component {
    // constructor(props) {
    //     super(props);
    // };
    render() {
        const {is_logged} = this.props;
        return (
            <div>
                <Topbar/>
                <Switch>
                    <Route path="/client/login" exact component={Login} />
                    <Route path="/client/register" exact component={Register} />
                    <Route path="/client/profile" component={ProfilePage}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        is_logged : state.auth.is_logged
    }
}

export default connect(mapStateToProps, null)(Client);