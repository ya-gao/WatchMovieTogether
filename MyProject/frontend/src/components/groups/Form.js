import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createGroup, getGroups } from '../../actions/groups';

export class Form extends Component {
    state = {
        group_name: ''
    };

    static PropTypes = {
        createGroup: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { group_name } = this.state;
        const group = { group_name };
        this.props.createGroup(group);
        this.setState({
            group_name: ''
        });
        location.reload(true);
    };

    render() {
        const { group_name } = this.state;
        
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Create Group</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="mb-0 mt-1">Name</label>
                        <input 
                           className="form-control"
                           type="text"
                           placeholder="Please input a group name"
                           name="group_name"
                           onChange={this.onChange}
                           value={group_name}
                        />
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
    }
}

export default connect(null, { createGroup , getGroups})(Form);
