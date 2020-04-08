import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGroups, unsubscribeGroup, createGroup } from '../../actions/groups';

export class Groups extends Component {
    static PropTypes = {
        groups: PropTypes.array.isRequired,
        getGroups: PropTypes.func.isRequired,
        unsubscribeGroup: PropTypes.func.isRequired,
        createGroup: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getGroups();
    }

    render() {
        return (
            <Fragment>
                <h2>Groups</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Events</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.groups.map(group => (
                                <tr key={group.id}>
                                    <td>{group.id}</td>
                                    <td>{group.group_name}</td>
                                    <td>{group.group_events}</td>
                                    <td><button 
                                           onClick={this.props.unsubscribeGroup.bind(this, group.id)} 
                                           className="btn btn-danger btn-sm"
                                        >
                                        {" "}  
                                        Unsubscribe
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    groups: state.groups.groups
})

export default connect(mapStateToProps, { getGroups, unsubscribeGroup, createGroup })(Groups);
