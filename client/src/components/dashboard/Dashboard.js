import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
	useEffect(
		() => {
			getCurrentProfile();
		},
		[ getCurrentProfile ]
	);
	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary mobile-margin">Admin</h1>
			<p className="lead mobile-margin">
				<i className="fas fa-user" /> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<div className="wrapper-one-column">
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
				</div>
			) : (
				<div className="wrapper-one-column">
					<p>You have not yet setup a profile, please some add some info</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Create Profile
					</Link>
				</div>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
