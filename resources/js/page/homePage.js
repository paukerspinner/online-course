import React from 'react';
import Banner from '../components/commons/banner';
import AboutUs from '../components/commons/aboutUs';
import CourseTarget from '../components/commons/courseTarget';
import CourseBanner from '../components/commons/courseBanner';

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