import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DashboardMarketActions = (props) => {
	return (
		<Fragment>
			<h2 className="m-2-bottom">Market Navigation</h2>
			<div className="dash-buttons">
				<Link to="/create-market" className="btn btn-light">
					<i className="fas fa-map-pin text-primary" /> <span>Create Market</span>
				</Link>
				<Link to="/markets-all" className="btn btn-light">
					<i className="fas fa-map-marked-alt text-primary" /> <span>All Markets</span>
				</Link>
				<Link to="/profiles" className="btn btn-light">
					<i className="fab fa-black-tie text-primary" /> <span>Investors</span>
				</Link>
				<Link to="/posts" className="btn btn-light">
					<i className="fas fa-comments text-primary" /> <span>Posts by Investors</span>
				</Link>
			</div>
		</Fragment>
	);
};

export default DashboardMarketActions;
