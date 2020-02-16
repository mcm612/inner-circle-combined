import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import defaultImg from '../../img/market-city-line-default.jpg';
import './Market.css';

import { getMarketById } from '../../actions/market';

const Market = ({ getMarketById, market: { marketbyid, loading }, auth, match, history }) => {
	useEffect(
		() => {
			getMarketById(match.params.id);
		},
		[ getMarketById, match.params.id ]
	);
	// Create our number formatter.
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});

	return (
		<div className="wrapper-one-column">
			{marketbyid === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<button onClick={() => history.goBack()} className="btn btn-light">
						<i className="fas fa-arrow-left" />
					</button>
					{auth.isAuthenticated &&
					auth.loading === false &&
					auth.user._id === marketbyid.creator._id && (
						<Link to={`/edit-market/${marketbyid._id}`} className="btn btn-dark">
							Edit Market
						</Link>
					)}
					<div className="market-info__top">
						<div className="market-info__pictures">
							<img
								className="market-info__top__img--1"
								src={marketbyid.market_photo ? marketbyid.market_photo : defaultImg}
								alt={marketbyid.location}
							/>
						</div>
						<div className="market-info__content">
							<h3> {marketbyid.location + ', ' + marketbyid.state} </h3>
							<Link to={`/profile/${marketbyid.creator._id}`} className="overview-box__detail">
								<span className="overview-box__label">investor: </span>
								<span className="overview-box__text">
									{marketbyid.creator._id === auth.user._id ? 'me' : marketbyid.creator.name}
								</span>
							</Link>
							<h4> Why this Property </h4>
							<p className="story-text"> {marketbyid.why_this_property} </p>
						</div>
					</div>
					<div className="market-info__data">
						<div className="market-info__data__major-info">
							<h4> My Economic Targets </h4>
							<div className="market-info__data__min-max-price">
								<span className="market-info__key"> Min Price </span>
								<span className="market-info__key"> Max Price </span>
								<span className="market-info__value">{formatter.format(marketbyid.min_price)}</span>
								<span className="market-info__value">{formatter.format(marketbyid.max_price)}</span>
							</div>
							<div className="market-info__data__min-max-cap-rate">
								<span className="market-info__key"> Min Cap Rate </span>
								<span className="market-info__key"> Max Cap Rate </span>
								<span className="market-info__value">{marketbyid.min_cap_rate.toFixed(2) + '%'}</span>
								<span className="market-info__value">{marketbyid.max_cap_rate.toFixed(2) + '%'}</span>
							</div>
							<div className="market-info__data__min-max-units">
								<span className="market-info__key"> Min Units </span>
								<span className="market-info__key"> Max Units </span>
								<span className="market-info__value">{marketbyid.min_units.toLocaleString()}</span>
								<span className="market-info__value">{marketbyid.max_units.toLocaleString()}</span>
							</div>
						</div>
						<div className="market-info__data__secondary-info">
							<h4> Economic & Demographic Info </h4> <h3> Building Class Type </h3>
							<span> {marketbyid.building_class_type} </span>
							<h3> Unemployment Change </h3>
							<span> {marketbyid.unemployment_change.toFixed(2) + '%'} </span>
							<h3> Population Change </h3> <span> {marketbyid.population_change.toFixed(2) + '%'} </span>
							<h3> List of Employers </h3>
							<ul>
								{marketbyid.employers_list.map((employer, index) => <li key={index}> {employer} </li>)}
							</ul>
							<h3> Vacancy Rate </h3> <span> {marketbyid.vacancy_rate.toFixed(2) + '%'} </span>
							<h3> Median Rental Rate </h3>
							<span> {formatter.format(marketbyid.median_rental_rate)} </span>
							<h3> Building Permits </h3> <span> {marketbyid.building_permits.toLocaleString()} </span>
						</div>
					</div>
				</Fragment>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	market: state.market,
	auth: state.auth
});

export default connect(mapStateToProps, {
	getMarketById
})(Market);
