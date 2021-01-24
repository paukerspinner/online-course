import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// function RedirectToLogin() {
//     return (
//         <Redirect to="/login" />
//     )
// }

// function AuthRoute ({component: Component, is_logged, location, ...rest}) {
//     return (
//         <Route {...rest} component={ is_logged ? Component : RedirectToLogin} />
//     )
// }


function AuthRoute({ component, is_logged, location, ...rest }) {
    return is_logged ? (
        <Route {...rest} component={component} />
    ) : (
        <Redirect to={{
            pathname: '/login',
            state: { from: location }
        }} />
    );
}

const mapStateToProps = state => {
    return {
        is_logged: state.auth.is_logged
    }
}

export default connect(mapStateToProps, null)(AuthRoute);