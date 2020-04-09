import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export class Header extends Component {
    static propTypes = {
      auth: PropTypes.object.isRequired,
      logout: PropTypes.func.isRequired
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <span className="navbar-text mr-3">
              <strong>
                { user ? `Welcome ${user.username}` : "" }
              </strong>
            </span>
            <li className="nav-item active">
              <button 
                className="nav-link btn btn-info btn-sm text-light"
                style={{marginRight: "10px"}}
                onClick={this.props.logout}
              >
                <i className="fas fa-bell" style={{marginRight: "5px"}}></i>
                Notifications
              </button> 
            </li>
            <li className="nav-item active">
              <button 
                className="nav-link btn btn-info btn-sm text-light"
                onClick={this.props.logout}
              >
                <i className="fas fa-sign-out-alt" style={{marginRight: "5px"}}></i>
                Logout
              </button> 
            </li>
          </ul>
        );

        const guestLinks = (
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
            <li className="nav-item active">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          </ul>
        );

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" href="#">
                  <i className="fab fa-weebly" style={{color:"#be79df"}}></i>
                  atch Movie Together
                </a>
                { isAuthenticated ? authLinks : guestLinks }
              </div>
              
            </nav>
        )
    }
}

// map state to props because we wanna access auth
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
