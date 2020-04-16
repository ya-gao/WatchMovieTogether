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
                            const modalID = "inviteModal" + (event.id).toString();

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
