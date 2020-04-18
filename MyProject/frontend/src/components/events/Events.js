import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEvents } from '../../actions/events';
import { Link } from 'react-router-dom';

export class Events extends Component {
    static PropTypes = {
        events: PropTypes.array.isRequired,
        getEvents: PropTypes.func.isRequired
    };

    componentDidMount() {
        var groupId = location.hash.substr(location.hash.indexOf("=") + 1);
        this.props.getEvents(groupId);
    }

    render() {
        return (
            <Fragment>
                <h2 id="events-header">Events</h2>
                <div id="events-list" className="container">
                    <div className="row">
                    {
                        this.props.events.map(event => {
                            const modalID = "voteModal" + (event.id).toString();
                            const modalTarget = "#" + modalID;

                            return (
                                <Fragment key={event.id}>
                                    <div className="col-4 mb-3">
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
                                                        Event Time: {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New_York'}).format(new Date(event.event_time))}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="fas fa-hourglass-start" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        Start Vote Date: {new Intl.DateTimeFormat('en-US', {timeZone: 'America/New_York'}).format(new Date(event.event_start_vote_time))}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="fas fa-hourglass-end" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        End Vote Date: {new Intl.DateTimeFormat('en-US', {timeZone: 'America/New_York'}).format(new Date(event.event_end_vote_time))}
                                                    </li>
                                                </ul>

                                                <button 
                                                    className="btn btn-outline-info btn-sm btn-block"
                                                    data-toggle="modal" data-target={modalTarget}
                                                    style={{marginTop: "10px"}}
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
                                                    <h5 className="modal-title" id="voteModalLabel">Choose a movie from the list</h5>
                                                    <button type="button" className="close" data-dismiss="modal">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={this.onSubmit}>
                                                        <input type="hidden" name="event_id" value={event.id} />
                                                        <div className="form-group">
                                                            <label htmlFor="event_name" className="col-form-label">Event:</label>
                                                            <input type="text" name="event_name" className="form-control" value={event.event_name} readOnly />
                                                        </div>
                                                        {/* <div className="form-group">
                                                            <label htmlFor="Invited_username" className="col-form-label">Username:</label>
                                                            <input type="text" name="invited_username" className="form-control" onChange={this.onChange} value={invited_username} required />
                                                        </div> */}
                                                        
                                                        <hr />
                                                        <input type="submit" value="Vote" className="btn btn-block btn-secondary" />
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
