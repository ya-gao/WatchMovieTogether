import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createEvent } from '../../actions/events';

import "react-datepicker/dist/react-datepicker.css";

export class Form extends Component {
    state = {
        group: '',
        event_name: '',
        event_location: '',
        event_start_vote_time: null,
        event_end_vote_time: null,
        event_time: null,
        chosen_movie_list:[],
    };

    static PropTypes = {
        createEvent: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });
    eventTimeOnChange = e => this.setState({event_time: e});
    eventStartVoteTimeOnChange = e => this.setState({event_start_vote_time: e});
    eventEndVoteTimeOnChange = e => this.setState({event_end_vote_time: e});

    openChooseMoviesPopUp = () => {
        // Show Choose Movies popup
        document.getElementById("create-event").classList.add("d-none");
        document.getElementById("events-header").classList.add("d-none");
        document.getElementById("events-list").classList.add("d-none");
        document.getElementById("choose-movies").classList.remove("d-none");
    }
    
    onSubmit = e => {
        e.preventDefault();
        this.state.group = this.props.group
        const { group, event_name, event_location, event_start_vote_time, event_end_vote_time, event_time } = this.state;
        const event = { group, event_name, event_location, event_start_vote_time, event_end_vote_time, event_time };
      
        // location.refresh();
        // document.getElementById("chosen_movie_list")
        var chosen_movie_list = [];
        var chosenMovies = document.getElementsByClassName("chosen-movie");
        for(var i = 0; i < chosenMovies.length; i++) {
            chosen_movie_list.push({
                movie_id: chosenMovies[i].id.substr(6),
                movie_overview: chosenMovies[i].getAttribute("data-overview"),
                movie_title: chosenMovies[i].getAttribute("data-title"),
                movie_year: chosenMovies[i].getAttribute("data-year"),
                movie_youtubeLink: chosenMovies[i].getAttribute("data-youtube-link")
            });
        }

        this.props.createEvent(event, chosen_movie_list);

        // Clear chosen movies list
        document.getElementById("chosen-movies-list").innerHTML = ""
        
        this.setState({
            group: '',
            event_name: '',
            event_location: '',
            event_time: null,
            event_start_vote_time: null,
            event_end_vote_time: null,
            chosen_movie_list:[]
        });

    };

    render() {
        if(this.props.belongsToGroup !== undefined) {
            return (
                <div id="create-event" className="card card-body mt-4 mb-4">
                    <div className="d-flex justify-content-between">
                        <h2>Create Event</h2>
                        <button 
                            className="btn btn-outline-info btn-sm"
                            onClick={this.openChooseMoviesPopUp}
                        >
                            <i className="far fa-hand-pointer" style={{marginRight:"5px", color:"#be79df"}}></i>
                            Choose Movies
                        </button>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label className="mb-0 mt-1">Name</label>
                            <input 
                               className="form-control"
                               type="text"
                               placeholder="Please input an event name"
                               name="event_name"
                               onChange={this.onChange}
                               value={this.state.event_name}
                            />
                            <label className="mb-0 mt-1">Location</label>
                            <input 
                               className="form-control"
                               type="text"
                               placeholder="Please input an event location"
                               name="event_location"
                               onChange={this.onChange}
                               value={this.state.event_location}
                            />
                            <div className="d-flex">
                                <div>
                                    <label className="mb-0 mt-1">Event Time</label>
                                    <div>
                                        <DatePicker
                                            dateFormat="MM/dd/yyyy HH:mm a"
                                            name="event_time"
                                            onChange={this.eventTimeOnChange}
                                            selected={this.state.event_time}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            showTime={{ use12Hours: true, format: "HH:mm a" }}
                                            format="YYYY-MM-DD HH:mm a"
                                        />
                                    </div>
                                    <label className="mb-0 mt-1">Start Vote Date</label>
                                    <div>
                                        <DatePicker
                                            name="event_vote_start_time"
                                            onChange={this.eventStartVoteTimeOnChange}
                                            selected={this.state.event_start_vote_time}
                                        />
                                    </div>
                                    <label className="mb-0 mt-1">End Vote Date</label>
                                    <div>
                                        <DatePicker
                                            name="event_vote_end_time"
                                            onChange={this.eventEndVoteTimeOnChange}
                                            selected={this.state.event_end_vote_time}
                                        />
                                    </div>
                                </div>
                                <div className="ml-5">
                                    <label className="mb-0 mt-1">Movies:</label>
                                    <ul id="chosen-movies-list"></ul>
                                </div>
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
    group: location.hash.substr(location.hash.indexOf("=") + 1),
    belongsToGroup: state.groups.groups.find(group => group.id == location.hash.substr(location.hash.indexOf("=") + 1))
})

export default connect(mapStateToProps, { createEvent })(Form);
