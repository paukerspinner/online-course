import React from 'react';

class Transcript extends React.Component {
    render() {
        const { transcript, fullname } = this.props;
        return (
            <div className="card shadow">
                <div className="card-header bg-primary">
                    <h5 className="m-0 font-weight-bold text-light">
                        Transcript
                    </h5>
                </div>
                <div className="card-body">
                    <strong>Student: </strong><span>{ fullname }</span>
                    <table className="table table-hover mt-4 text-center">
                        <thead>
                            <tr>
                                <th scope="col">Module</th>
                                <th scope="col">Rating</th>
                            </tr>
                        </thead>
                        {
                            transcript ? (
                                <React.Fragment>
                                    <tbody>
                                        {
                                            transcript.map(section_rating => {
                                                return (
                                                    <tr key={section_rating.section_id}>
                                                        <td>{section_rating.section_label}</td>
                                                        <td>{section_rating.rating}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th scope="col">Total</th>
                                            <th scope="col">{calculateTranscript(transcript)}</th>
                                        </tr>
                                    </tfoot>
                                </React.Fragment>
                            ) : null
                        }
                    </table>
                </div>
            </div>
        )
    }
}

const calculateTranscript = transcript => {
    return transcript.reduce((result, section_rating) => {
        return result + section_rating.rating
    }, 0);
}

export default Transcript;