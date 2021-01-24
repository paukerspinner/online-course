import React from 'react';
import Banner from './banner';
import AboutUs from './aboutUs';
import CourseTarget from './courseTarget';
import CourseBanner from './courseBanner';

class ProfilePage extends React.Component {
    render() {
        return (
            <div>
                <Banner></Banner>
                <CourseTarget></CourseTarget>
                <CourseBanner></CourseBanner>
                <AboutUs></AboutUs>
            </div>
        )
    }
}

export default ProfilePage;