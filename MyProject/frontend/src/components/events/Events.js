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
        this.props.getEvents();
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
                        this.props.groups.map(group => {
                            const modalID = "inviteModal" + (group.id).toString();
                            const modalTarget = "#" + modalID;

                            return (
                                <Fragment key={group.id}>
                                    <div className="col-4">
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
                                                        Group Administrator: {group.owner}
                                                    </li>
                                                    <li className="list-group-item">
                                                        <i className="fas fa-user-friends" style={{marginRight:"5px", color:"#be79df"}}></i>
                                                        Group Member: {group.members}
                                                    </li>
                                                </ul>

                                                <Link className="text-decoration-none" to="/group">
                                                    <button 
                                                        className="btn btn-outline-info btn-sm btn-block"
                                                        onClick={this.props.getEvents.bind(this, group.id)}
                                                        style={{marginTop: "10px"}}
                                                    >
                                                        {" "}  
                                                        Events
                                                    </button>
                                                </Link>

                                                <button 
                                                    className="btn btn-danger btn-sm btn-block"
                                                >
                                                    {" "}  
                                                    Unsubscribe
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
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    groups: state.groups.groups
})

export default connect(mapStateToProps, { getEvents })(Events);
