import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { store } from '../../';
import * as actions from '../../actions';
import * as API from '../../ulties/api';
import { QUESTION_LEVEL as MATERIAL_LEVEL } from '../../constants';

class MaterialForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            section_id: 1,
            title: '',
            level: MATERIAL_LEVEL.MEDIUM,
            file: null,
            path_file: ''
        }
        this.handleOnChangeData = this.handleOnChangeData.bind(this)
    }

    componentDidMount() {
        API.getSections().then(res => {
            this.setState({
                sections: res.data
            });
        })
        if (this.props.type == 'edit') {
            API.getMaterial(this.props.match.params.id).then(res => {
                this.setState({
                    level: res.data.material.level,
                    section_id: res.data.material.section_id,
                    title: res.data.material.title,
                    path_file: res.data.material.path
                })
            }).catch(err => {
                console.log(err.response)
            })
        }
    }

    handleOnChangeData(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnUploadFile(event) {
        this.setState({
            file: event.target.files[0]
        })
    }

    handleSubmit(event) {
        const { section_id, title, level, file } = this.state;
        let marerial_data_form = new FormData();
        marerial_data_form.append('section_id', section_id);
        marerial_data_form.append('title', title);
        marerial_data_form.append('level', level);
        marerial_data_form.append('file', file);
        // Form Data suports only 2 types: text or file)
        if (this.props.type == 'create') {
            API.addMaterial(marerial_data_form).then(res => {
                store.dispatch(actions.setFlassMessage(res.data.message));
                this.props.history.push('/management/materials');
            }).catch(err => {
                console.log(err.response);
            });
        } else {
            let id = this.props.match.params.id;
            marerial_data_form.append('id', id);
            API.updateMaterial(marerial_data_form).then(res => {
                store.dispatch(actions.setFlassMessage(res.data.message));
                this.props.history.push('/management/materials');
            }).catch(err => {
                console.log(err.response);
            });
        }
        
        event.preventDefault();
    }
    render() {
        const { sections, level, title, section_id, path_file } = this.state;
        const { type } = this.props;
        return (
            <form className="user" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="section_id">Module</label>
                    <select 
                        name="section_id" 
                        className="form-control shadow" 
                        id="section_id"
                        value={section_id}
                        onChange={this.handleOnChangeData}
                        required>
                            {
                                sections.map(section => {
                                    if (!section.is_exam) {
                                        return (
                                            <option value={section.id} key={section.id}>{section.title}</option>
                                        )
                                    }
                                })
                            }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        onChange={this.handleOnChangeData}
                        value={title}
                        className="form-control shadow"
                        id="title"
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="level">Level</label>
                    <select 
                        name="level"
                        className="form-control shadow"
                        id="level"
                        onChange={this.handleOnChangeData}
                        value={level}
                        required>
                            <option value={MATERIAL_LEVEL.EASY} key={MATERIAL_LEVEL.EASY}>EASY</option>
                            <option value={MATERIAL_LEVEL.MEDIUM} key={MATERIAL_LEVEL.MEDIUM}>MEDIUM</option>
                            <option value={MATERIAL_LEVEL.HARD} key={MATERIAL_LEVEL.HARD}>HARD</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="file">Upload file</label><br/>
                    <input 
                        type="file"
                        name="file" 
                        className="shadow" 
                        id="file"
                        accept=".pdf"
                        onChange={this.handleOnUploadFile.bind(this)}
                        required={type == 'create'}
                    />
                    {
                        type == 'edit' && <a href={'/'+path_file} target="_blank" className="btn btn-sm btn-info">show</a>
                    }
                </div>
                <div className="form-group mt-4">
                    <button type="submit" className="btn btn-primary btn-user btn-block">
                        Save
                    </button>
                </div>
            </form>

        )
    }
}

export default withRouter(connect(null, null)(MaterialForm));