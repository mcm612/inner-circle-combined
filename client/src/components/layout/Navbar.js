import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import defaultImg from '../../img/default.jpg';

const Navbar = ({ profile: { profile }, auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul>
			<li>
				<Link to="/dashboard-market">Market Dashboard</Link>
			</li>
			<li>
				<a onClick={logout} href="#!">
					<i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
				</a>
			</li>
			<li>
				<Link to="/dashboard">
					<img
						className="nav__user-img"
						src={!profile ? defaultImg : profile.profilephoto || defaultImg}
						alt={!profile ? '' : profile.user._id}
					/>
				</Link>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to="/profiles">Investors</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="far fa-building" /> Inner Circle
				</Link>
				<div className="navbar__heading--sub">Apartment Investing</div>
			</h1>
			{!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { logout })(Navbar);
