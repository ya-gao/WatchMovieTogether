import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createGroup, getGroups } from '../../actions/groups';

import "react-datepicker/dist/react-datepicker.css";

export class Form extends Component {
    state = {
        group_name: '',
        group_events: ''
    };

    static PropTypes = {
        createGroup: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

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
                               name="group_name"
                               onChange={this.onChange}
                               value={group_name}
                            />
                            <label>Location</label>
                            <input 
                               className="form-control"
                               type="text"
                               placeholder="Please input an event location"
                               name="group_name"
                               onChange={this.onChange}
                               value={group_name}
                            />
                            <label>Event Time</label>
                            <div><DatePicker selected={null}/></div>
                            <label>Start Vote Date</label>
                            <div><DatePicker selected={null}/></div>
                            <label>End Vote Date</label>
                            <div><DatePicker selected={null}/></div>
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
