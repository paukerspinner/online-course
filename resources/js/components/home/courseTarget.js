import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class CourseTarget extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="course-target" className="container-fluid content">
                <h1 className="mb-2">Targets</h1>
                <p>The purpose of the course is to instil in the students form the basic knowledge and skills of computer-aided design of radioelectronics means equipment using CAD software Altium Designer. After the course, learners are able to form practical skills in computer-aided design of radioelectronic devices for the design of assemblies on PCB, their capabilities, the appointment of basic software and design stages.</p>
                <div className="row justify-content-md-center">
                    <div className="col-sm-12 col-lg-6 mb-4">
                        <div className="card-target h-100">
                            <div className="card-img">
                                <i className="fas fa-tasks" aria-hidden="true"></i>
                            </div>
                            <div className="card-text">
                                <h4>Tasks</h4>
                                <p className="m-0">
                                    - Mastering the methods of CAD of radioelectronics.
                                </p>
                                <p className="m-0">- Formation of practical skills in the design of nodes on the PCB. </p>
                                <p className="m-0">- Use of CAD software radioelectronics for the design of nodes at PP</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 mb-4">
                        <div className="card-target h-100">
                            <div className="card-img">
                                <i className="fa fa-list-ul" aria-hidden="true"></i>
                            </div>
                            <div className="card-text">
                                <h4>Requirements</h4>
                                <p className="m-0">- Physics</p>
                                <p className="m-0">- Electrical and Electronic Engineering</p>
                                <p className="m-0">- Engineering and computer graphics</p>
                                <p className="m-0">- Thermophysical processes in electronic means</p>
                                <p className="m-0">- Electromagnetic processes in electronic devices</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 mb-4">
                        <div className="card-target h-100">
                            <div className="card-img">
                                <i className="far fa-file-alt" aria-hidden="true"></i>
                            </div>
                            <div className="card-text">
                                <h4>Methodical instructions</h4>
                                <p className="m-0">The system presupposes a rational combination of such types of educational activities as lectures, practical classes, independent work of students, as well as control of the acquired knowledge.
                                    &nbsp;<a href="https://docs.google.com/document/d/13O-vd5ozlCFLyyH_Ep-zG5j0tiGEHOgX_JJpGFq62qY/edit">Read more >></a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 mb-4">
                        <div className="card-target h-100">
                            <div className="card-img">
                                <i className="far fa-calendar-check" aria-hidden="true"></i>
                            </div>
                            <div className="card-text">
                                <h4>Results</h4>
                                <p className="m-0">- Know the modern electronic components base of the electronic equipment, the methodology for the design of nodes on the PCB.</p>
                                <p className="m-0">- To be able to design nodes on the PCB according to the terms of reference. Master the methods of designing modern electronic equipment using the tools of the APR Altium Designer.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(null, null)(CourseTarget);