import React from 'react';

class ProfileCard extends React.Component {
    render() {
        return (
            <div className="card mb-4 border-0">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold">Basic Card Example</h6>
                </div>
                <div className="card-body">
                    <form className="">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control shadow"
                                id="email" placeholder="Enter Email Address..." />
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <label htmlFor="firstname">First name</label>
                                <input type="text" className="form-control shadow"
                                    id="firstname" placeholder="Enter Your First Name..." />
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="lastname">First name</label>
                                <input type="text" className="form-control shadow"
                                    id="lastname" placeholder="Enter Your Last Name" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <label htmlFor="sex">Sex</label>
                                <select className="form-control shadow" name="sex" id="sex">
                                    <option>------</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="dateOfBirth">Date Of Birth</label>
                                <input type="date" className="form-control shadow"
                                    id="dateOfBirth"/>
                            </div>
                        </div>
                        <a href="index.html" className="btn btn-primary btn-user btn-block">
                            Save
                        </a>
                    </form>
                </div>
            </div>
        )
    }
}

export default ProfileCard;