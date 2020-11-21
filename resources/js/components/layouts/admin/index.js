import { divide } from 'lodash';
import React from 'react';
import Sidebar from './sidebar';
import Topbar from '../../commons/topbar';

class Admin extends React.Component {
    render() {
        return (
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar/>
                        <div className="containter-fluid">
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;