import axios from 'axios';
import { setAlert } from './alert';

import {
	GET_USER_MARKET_LIST, //Get current users market list
	GET_ALL_MARKETS, // Get all markets
	GET_SINGLE_MARKET, // Get market by id
	UPDATE_SINGLE_MARKET, // Update Market by id
	UPDATE_USER_MARKET_LIST, //Add current user new market or delete a market
	MARKET_ERROR
} from './types';

// Get users market list
export const getUserMarketList = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/market/user');
		dispatch({
			type: GET_USER_MARKET_LIST,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: MARKET_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get all markets
export const getAllMarkets = () => async (dispatch) => {
	try {
		const res = await axios.get('api/market/marketlist');
		dispatch({
			type: GET_ALL_MARKETS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: MARKET_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get market by ID
export const getMarketById = (market_id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/market/${market_id}`);

		dispatch({
			type: GET_SINGLE_MARKET,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: MARKET_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Update market by ID
export const updateMarketById = (market_id, formData) => async (dispatch) => {
	try {
		const res = await axios.patch(`/api/market/editmarket/${market_id}`, formData);
		dispatch({
			type: UPDATE_SINGLE_MARKET,
			payload: res.data
		});
		dispatch(setAlert('Market Edited', 'success'));
	} catch (err) {
		dispatch({
			type: MARKET_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
// Add Market
export const addMarket = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.post('api/market/createmarket', formData, config);

		dispatch({
			type: UPDATE_USER_MARKET_LIST,
			payload: res.data
		});

		dispatch(setAlert('Market Added', 'success'));

		history.push('/dashboard-market');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: MARKET_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Delete Market
export const deleteMarket = (exp_id) => async (dispatch) => {
	if (window.confirm('Are you sure that you want to delete this market?')) {
		try {
			const res = await axios.delete(`api/market/${exp_id}`);

			dispatch({
				type: UPDATE_USER_MARKET_LIST,
				payload: res.data
			});

			dispatch(setAlert('Market Removed', 'success'));
		} catch (err) {
			dispatch({
				type: MARKET_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	}
};
