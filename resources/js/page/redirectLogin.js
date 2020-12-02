import React from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class RedirectLogin extends React.Component {
    componentDidMount() {
        console.log('You need login!')
    }
    
    render() {
        return (<Redirect to="/login" />)
    }
}

export default withRouter(RedirectLogin);