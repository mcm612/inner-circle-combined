import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMarket } from '../../actions/market';
import './MarketList.css';
import defaultImg from '../../img/apartment-default.png';

const MarketList = ({ marketuserlist, deleteMarket }) => {
	// Create our number formatter.
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});

	const markets = marketuserlist.map((market) => (
		<div key={market._id} className="market">
			<div className="market-card__picture">
				<div className="market-card__picture-overlay" />
				{market.market_photo ? (
					<img className="market-card__picture-img" src={market.market_photo} alt="market" />
				) : (
					<img className="market-card__picture-img" src={defaultImg} alt="market" />
				)}
			</div>
			<h4 className="market__name">{`${market.location}, ${market.state}`}</h4>
			<div className="market__why_this_property">
				<h4>Why this market</h4>
				<p>{market.why_this_property.slice(0, 50)}</p>
			</div>
			<div className="market__min_price">
				<span className="market__key">Min Price</span>
				<span className="market__value">{formatter.format(market.min_price)}</span>
			</div>
			<div className="market__max_price">
				<span className="market__key">Max Price</span>
				<span className="market__value">{formatter.format(market.max_price)}</span>
			</div>

			<div className="market__min_cap_rate">
				<span className="market__key">Min Cap Rate</span>
				<span className="market__value">{market.min_cap_rate.toFixed(2) + '%'}</span>
			</div>

			<div className="market__max_cap_rate">
				<span className="market__key">Max Cap Rate</span>
				<span className="market__value">{market.max_cap_rate.toFixed(2) + '%'}</span>
			</div>

			<div className="market__min_units">
				<span className="market__key">Min Units</span>
				<span className="market__value">{market.min_units.toLocaleString()}</span>
			</div>

			<div className="market__min_units">
				<span className="market__key">Max Units</span>
				<span className="market__value">{market.max_units.toLocaleString()}</span>
			</div>
			<div className="market__actions">
				<button className="market__button--color-1">
					<Link to={`/market/${market._id}`}>View</Link>
				</button>
				<button className="market__button--color-2">
					<Link to={`/edit-market/${market._id}`}>Edit</Link>
				</button>
				<button className="market__button--color-3" onClick={() => deleteMarket(market._id)}>
					Trash
				</button>
			</div>
		</div>
	));
	return (
		<Fragment>
			<h2 className="my-2">Researched Markets</h2>
			<section className="markets">{markets}</section>
		</Fragment>
	);
};

export default connect(null, { deleteMarket })(MarketList);
