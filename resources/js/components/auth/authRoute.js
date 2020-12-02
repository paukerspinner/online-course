import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function RedirectToLogin() {
    return (
        <Redirect to="/login" />
    )
}

function AuthRoute ({component: Component, is_logged, ...rest}) {
    return (
        <Route {...rest} component={ is_logged ? Component : RedirectToLogin} />
    )
}

const mapStateToProps = state => {
    return {
        is_logged: state.auth.is_logged
    }
}

export default connect(mapStateToProps, null)(AuthRoute);