import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEvents } from '../../actions/events';
import { Link } from 'react-router-dom';

export class Events extends Component {
    state = {
        invited_username: ''
    };

    static PropTypes = {
        events: PropTypes.array.isRequired,
        getEvents: PropTypes.func.isRequired
    };

    componentDidMount() {
        var groupId = this.props.location.search.substr(this.props.location.search.indexOf("=") + 1);
        this.props.getEvents(groupId);
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { invited_username } = this.state;
        const group_name = e.target.group_name.value;
        const group_id = e.target.group_id.value;
        const newInvitation = { group_name, group_id, invited_username };
        this.props.sendInvitation(newInvitation);
        this.setState({invited_username: ''});
    };

    render() {
        const { invited_username } = this.state;
        return (
            <Fragment>
                <h2>Events</h2>
                <div className="container">
                    <div className="row">
                    {
                        this.props.events.map(event => {
                            const modalID = "inviteModal" + (event.id).toString();
                            const modalTarget = "#" + modalID;

                            return (
                                <Fragment key={event.id}>
                                    <div className="col-4">
                                        <div className="card h-100">
                                            <div className="card-header d-flex justify-content-between">
                                                {event.event_name}
                                            </div>
                                            
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <i className="fas fa-map-marker-alt" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        Location: {event.event_location}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="far fa-calendar" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        Event Time: {event.event_time.substr(0, 10) + " " + event.event_time.substr(11, 8)}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="fas fa-hourglass-start" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        Start Vote Date: {event.event_start_vote_time.substr(0, 10)}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="fas fa-hourglass-end" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        End Vote Date: {event.event_end_vote_time.substr(0, 10)}
                                                    </li>
                                                </ul>

                                                <button 
                                                    className="btn btn-outline-info btn-sm btn-block"
                                                    style={{marginTop: "10px"}}
                                                >
                                                    {" "}  
                                                    View Movie List
                                                </button>

                                                <button 
                                                    className="btn btn-danger btn-sm btn-block"
                                                >
                                                    {" "}  
                                                    Vote
                                                </button>
                                            </div>   
                                        </div>
                                    </div>

                                    <div className="modal fade" id={modalID} role="dialog">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="inviteModalLabel">Send Invitation</h5>
                                                    <button type="button" className="close" data-dismiss="modal">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={this.onSubmit}>
                                                        <input type="hidden" name="group_id" value={event.id} />
                                                        <div className="form-group">
                                                            <label htmlFor="group_name" className="col-form-label">Group:</label>
                                                            <input type="text" name="group_name" className="form-control" value={event.group_name} readOnly />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="Invited_username" className="col-form-label">Username:</label>
                                                            <input type="text" name="invited_username" className="form-control" onChange={this.onChange} value={invited_username} required />
                                                        </div>
                                                        
                                                        <hr />
                                                        <input type="submit" value="Send" className="btn btn-block btn-secondary" />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>                      
                        );})
                    }
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    events: state.events.events
})

export default connect(mapStateToProps, { getEvents })(Events);
