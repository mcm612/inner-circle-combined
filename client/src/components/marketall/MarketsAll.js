import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MarketItem from './MarketItem';
import { getAllMarkets } from '../../actions/market';

const MarketsAll = ({ getAllMarkets, market: { marketall, loading } }) => {
	useEffect(
		() => {
			getAllMarkets();
		},
		[ getAllMarkets ]
	);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className="large text-primary mobile-margin">All Markets</h1>
					<p className="lead mobile-margin">
						<i className="fas fa-search-location" /> Browse and view all markets
					</p>
					{marketall.length > 0 ? (
						<div className="wrapper-one-column">
							<MarketItem marketall={marketall} />
						</div>
					) : (
						<div className="wrapper-one-column">
							<p>No Markets</p>
						</div>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	market: state.market
});

export default connect(mapStateToProps, { getAllMarkets })(MarketsAll);
