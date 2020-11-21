import React from 'react';
import ProfileCard from '../components/commons/profileCard';

class ProfilePage extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center mt-4">
                    <div className="col-lg-8">
                        <ProfileCard />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilePage;