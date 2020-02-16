import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { deleteAccount } from '../../actions/profile';
import { connect } from 'react-redux';

const DashboardActions = ({ deleteAccount }) => {
	return (
		<Fragment>
			<h2 className="m-2-bottom">Profile Settings</h2>
			<div className="dash-buttons">
				<Link to="/edit-profile" className="btn btn-light">
					<i className="fas fa-user-circle text-primary" /> <span>Edit Profile</span>
				</Link>
				<Link to="/add-experience" className="btn btn-light">
					<i className="fab fa-black-tie text-primary" /> <span>Add Experience</span>
				</Link>
				<Link to="/add-education" className="btn btn-light">
					<i className="fas fa-graduation-cap text-primary" /> <span>Add Education</span>
				</Link>
				<button className="btn btn-danger btn-danger__dashboard-actions" onClick={() => deleteAccount()}>
					<i className="fas fa-user" /> <span>Delete Account</span>
				</button>
			</div>
		</Fragment>
	);
};

export default connect(null, { deleteAccount })(DashboardActions);
