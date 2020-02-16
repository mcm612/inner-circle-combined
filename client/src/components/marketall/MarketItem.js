import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MarketItem.css';
import defaultImg from '../../img/apartment-default.png';

const MarketItem = ({ marketall }) => {
	const auth = useSelector((state) => state.auth);

	// Create our number formatter.
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});

	const markets = marketall.map((market) => (
		<div key={market._id} className="market-item">
			<Link className="market-item__creator" to={`/profile/${market.creator._id}`}>
				{market.creator._id === auth.user._id ? <h3>by: me</h3> : <h3>{`by: ${market.creator.name}`}</h3>}
			</Link>
			<div className="market-item-card__picture">
				<div className="market-item-card__picture-overlay" />
				{market.market_photo ? (
					<img className="market-item-card__picture-img" src={market.market_photo} alt={market.location} />
				) : (
					<img className="market-item-card__picture-img" src={defaultImg} alt={market.location} />
				)}
			</div>
			<h4 className="market-item__name">{`${market.location}, ${market.state}`}</h4>
			<div className="market-item__why_this_property m-4-bottom">
				<h4>Why this market</h4>
				<p>{market.why_this_property.slice(0, 50)}</p>
			</div>
			<div className="market-item__min_price m-4-bottom">
				<span className="market__key">Min Price</span>
				<span className="market__value">{formatter.format(market.min_price)}</span>
			</div>
			<div className="market-item__max_price m-4-bottom">
				<span className="market__key">Max Price</span>
				<span className="market__value">{formatter.format(market.max_price)}</span>
			</div>

			<div className="market-item__min_cap_rate m-4-bottom">
				<span className="market__key">Min Cap Rate</span>
				<span className="market__value">{market.min_cap_rate.toFixed(2) + '%'}</span>
			</div>

			<div className="market-item__max_cap_rate m-4-bottom">
				<span className="market__key">Max Cap Rate</span>
				<span className="market__value">{market.max_cap_rate.toFixed(2) + '%'}</span>
			</div>

			<div className="market-item__min_units m-4-bottom">
				<span className="market__key">Min Units</span>
				<span className="market__value">{market.min_units.toLocaleString()}</span>
			</div>

			<div className="market-item__max_units m-4-bottom">
				<span className="market__key">Max Units</span>
				<span className="market__value">{market.max_units.toLocaleString()}</span>
			</div>
			<div className="market__actions">
				<button className="market__button--color-1">
					<Link to={`/market/${market._id}`}>View</Link>
				</button>
			</div>
		</div>
	));
	return (
		<Fragment>
			<section className="markets">{markets}</section>
		</Fragment>
	);
};

export default MarketItem;
