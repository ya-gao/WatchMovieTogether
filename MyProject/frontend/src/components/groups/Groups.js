import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getGroups, getBelongedGroups,unsubscribeGroup, unsubscribeBelongedGroup, createGroup } from '../../actions/groups';
import { sendInvitation } from '../../actions/invitations';
import { Link } from 'react-router-dom';

export class Groups extends Component {
    state = {
        invited_username: ''
    };

    static PropTypes = {
        groups: PropTypes.array.isRequired,
        getGroups: PropTypes.func.isRequired,
        getBelongedGroups: PropTypes.func.isRequired,
        unsubscribeGroup: PropTypes.func.isRequired,
        unsubscribeBelongedGroup: PropTypes.func.isRequired,
        createGroup: PropTypes.func.isRequired,
        sendInvitation: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getGroups();
        this.props.getBelongedGroups();
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
                <h2>Groups</h2>
                <div className="container">
                    <div className="row">
                    {
                        this.props.groups.map(group => {
                            const modalID = "inviteModal" + (group.id).toString();
                            const modalTarget = "#" + modalID;

                            return (
                                <Fragment key={group.id}>
                                    <div className="col-4 mb-3">
                                        <div className="card h-100">
                                            <div className="card-header d-flex justify-content-between">
                                                {group.group_name}
                                                <button 
                                                    className="btn btn-outline-info btn-sm" data-toggle="modal" data-target={modalTarget}
                                                    
                                                >
                                                    <i className="fas fa-user-plus" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                    Invite
                                                </button>
                                            </div>
                                            
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <i className="fas fa-user-tie" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        Group Administrator: {group.owner.username}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="fas fa-user-friends" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        Group Member: {(group.members.map(member => (member.username))).join()}
                                                    </li>
                                                </ul>

                                                <Link className="btn-block text-decoration-none" to={"/events?groupId=" + group.id}>
                                                    <button 
                                                        className="btn btn-outline-info btn-sm btn-block"
                                                        style={{marginTop: "10px"}}
                                                    >
                                                        {" "}  
                                                        Events
                                                    </button>
                                                </Link>

                                                <button 
                                                    className="btn btn-danger btn-sm btn-block"
                                                    onClick={this.props.unsubscribeGroup.bind(this, group.id)}  
                                                    
                                                >
                                                    {" "}  
                                                    Delete
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
                                                        <input type="hidden" name="group_id" value={group.id} />
                                                        <div className="form-group">
                                                            <label htmlFor="group_name" className="col-form-label">Group:</label>
                                                            <input type="text" name="group_name" className="form-control" value={group.group_name} readOnly />
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
                <br></br>
                <h2>Group Belongs To</h2>
                <div className="container">
                    <div className="row">
                    {
                        this.props.belonged_groups.map(group => {

                            return (
                                <Fragment key={group.id}>
                                    <div className="col-4 mb-3">
                                        <div className="card h-100">
                                            <div className="card-header d-flex justify-content-between">
                                                {group.group_name}
                                               
                                            </div>
                                            
                                            <div className="card-body">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <i className="fas fa-user-tie" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        Group Administrator: {group.owner.username}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="fas fa-user-friends" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        Group Member: {(group.members.map(member => (member.username))).join()}
                                                    </li>
                                                </ul>

                                                <Link className="btn-block text-decoration-none" to={"/events?groupId=" + group.id}>
                                                    <button 
                                                        className="btn btn-outline-info btn-sm btn-block"
                                                        style={{marginTop: "10px"}}
                                                    >
                                                        {" "}  
                                                        Events
                                                    </button>
                                                </Link>

                                                <button 
                                                    className="btn btn-danger btn-sm btn-block"
                                                    onClick={this.props.unsubscribeBelongedGroup.bind(this, group.id)}  
                                                    
                                                >
                                                    {" "}  
                                                    Unsubscribe
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
    groups: state.groups.groups,
    belonged_groups:state.groups.belonged_groups,
})

export default connect(mapStateToProps, { getGroups, getBelongedGroups, unsubscribeGroup, unsubscribeBelongedGroup, createGroup, sendInvitation })(Groups);
