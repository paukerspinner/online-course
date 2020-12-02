import { fromJS } from 'draft-js/lib/CharacterMetadata';
import React from 'react';
import {Link} from 'react-router-dom';

class BreadCrumb extends React.Component {
    render() {
        const { breadcrumb_items } = this.props;
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0">
                    {
                        breadcrumb_items.map((breadcrumb_item, idx) => {
                            return (
                                <li className="breadcrumb-item" key={idx}>
                                    {renderBreadCrumbItem(breadcrumb_item)}
                                </li>
                            )
                        })
                    }
                </ol>
            </nav>
        );
    }
}

const renderBreadCrumbItem = breadCrumbItem => {
    if (breadCrumbItem.active) {
        return (
                <span>{breadCrumbItem.label}</span>
        )
    }
    return (
        <Link to={breadCrumbItem.path}>
            {breadCrumbItem.label}
        </Link>
    )
}

export default BreadCrumb;