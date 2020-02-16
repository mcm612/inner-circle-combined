import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserMarketList, deleteMarket } from '../../actions/market';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardMarketActions from './DashboardMarketActions';
import MarketList from './MarketList';

const DashboardMarket = ({
	getUserMarketList,
	getCurrentProfile,
	deleteMarket,
	auth: { user },
	market: { marketuserlist, loading }
}) => {
	useEffect(
		() => {
			getCurrentProfile();
			getUserMarketList();
		},
		[ getUserMarketList, getCurrentProfile ]
	);
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary mobile-margin">My Markets</h1>
			<p className="lead mobile-margin">
				<i className="fas fa-user" /> Welcome {user && user.name}
			</p>
			{marketuserlist.length > 0 ? (
				<div className="wrapper-one-column">
					<DashboardMarketActions />
					<MarketList marketuserlist={marketuserlist} />
				</div>
			) : (
				<div className="wrapper-one-column">
					<p>You have not created a market. Please set-up one.</p>
					<Link to="/create-market" className="btn btn-primary my-1">
						Create a Market
					</Link>
				</div>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	market: state.market
});

export default connect(mapStateToProps, { getUserMarketList, deleteMarket, getCurrentProfile })(DashboardMarket);
