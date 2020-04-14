import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createGroup, getGroups } from '../../actions/groups';

import "react-datepicker/dist/react-datepicker.css";

export class Form extends Component {
    state = {
        event_name: '',
        event_location: '',
        event_time: null,
        event_start_vote_time: null,
        event_end_vote_time: null
    };

    static PropTypes = {
        createGroup: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });
    eventTimeOnChange = e => this.setState({event_time: e});
    eventStartVoteTimeOnChange = e => this.setState({event_start_vote_time: e});
    eventEndVoteTimeOnChange = e => this.setState({event_end_vote_time: e});

    onSubmit = e => {
        e.preventDefault();
        const { group_name, group_events } = this.state;
        const group = { group_name, group_events };
        this.props.createGroup(group);
        this.setState({
            group_name: '',
            group_events: ''
        });
        location.reload(true);
    };

    render() {
        const { group_name } = this.state;

        if(this.props.belongsToGroup !== undefined) {
            return (
                <div className="card card-body mt-4 mb-4">
                    <h2>Create Event</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                               className="form-control"
                               type="text"
                               placeholder="Please input an event name"
                               name="event_name"
                               onChange={this.onChange}
                               value={group_name}
                            />
                            <label>Location</label>
                            <input 
                               className="form-control"
                               type="text"
                               placeholder="Please input an event location"
                               name="event_location"
                               onChange={this.onChange}
                               value={group_name}
                            />
                            <label>Event Time</label>
                            <div>
                                <DatePicker
                                    name="event_time"
                                    onChange={this.eventTimeOnChange}
                                    selected={this.state.event_time}
                                />
                            </div>
                            <label>Start Vote Date</label>
                            <div>
                                <DatePicker
                                    name="event_vote_start_time"
                                    onChange={this.eventStartVoteTimeOnChange}
                                    selected={this.state.event_start_vote_time}
                                />
                            </div>
                            <label>End Vote Date</label>
                            <div>
                                <DatePicker
                                    name="event_vote_end_time"
                                    onChange={this.eventEndVoteTimeOnChange}
                                    selected={this.state.event_end_vote_time}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-outline-info">
                                <i className="fas fa-plus-circle" style={{marginRight:"5px", color:"#be79df"}}></i>
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            )
        } else {
            return ""
        }
    }
}

const mapStateToProps = state => ({
    belongsToGroup: state.groups.groups.find(group => group.id == location.hash.substr(location.hash.indexOf("=") + 1))
})

export default connect(mapStateToProps, { createGroup , getGroups})(Form);