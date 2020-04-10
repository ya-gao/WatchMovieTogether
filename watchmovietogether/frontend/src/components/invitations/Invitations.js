import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getInvitations, denyInvitation, acceptInvitation } from '../../actions/invitations';

// Work Flow: The component calls GET_INVITATIONS when is mount, then the invitations come down from the reducer into the component as a prop
export class Invitations extends Component {
    static PropTypes = {
        invitations: PropTypes.array.isRequired,
        getInvitations: PropTypes.func.isRequired,
        denyInvitation: PropTypes.func.isRequired,
        acceptInvitation: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getInvitations();
    }

    render() {
        return (
            <Fragment>
                <h2>Invitations</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Inviter</th>
                            <th>Group</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.invitations.map((invitation) => (
                            <tr key={invitation.id}>
                                <td>{invitation.inviter_username}</td>
                                <td>{invitation.group_name}</td>
                                <td>
                                <button
                                    onClick={this.props.acceptInvitation.bind(this, invitation.id)}
                                    className="btn btn-success btn-sm"
                                >
                                    {' '}
                                    Accept
                                </button>
                                </td>
                                <td>
                                <button
                                    onClick={this.props.denyInvitation.bind(this, invitation.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    {' '}
                                    Deny
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    invitations: state.invitations.invitations
});

export default connect(mapStateToProps, { getInvitations, denyInvitation, acceptInvitation })(Invitations);
