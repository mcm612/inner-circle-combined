import {
	GET_USER_MARKET_LIST, //Get current users market list
	GET_ALL_MARKETS, // Get all markets
	GET_SINGLE_MARKET, // Get market by id
	UPDATE_SINGLE_MARKET,
	UPDATE_USER_MARKET_LIST, //Add current user new market or delete a market
	CLEAR_MARKET,
	MARKET_ERROR
} from '../actions/types';

const initialState = {
	marketuserlist: [],
	marketall: [],
	marketbyid: null,
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_USER_MARKET_LIST:
		case UPDATE_USER_MARKET_LIST: // needs to return full market list
			return {
				...state,
				marketuserlist: payload,
				loading: false
			};
		case GET_ALL_MARKETS:
			return {
				...state,
				marketall: payload,
				loading: false
			};
		case GET_SINGLE_MARKET:
		case UPDATE_SINGLE_MARKET:
			return {
				...state,
				marketbyid: payload,
				loading: false
			};
		case CLEAR_MARKET:
			return {
				...state,
				marketuserlist: [],
				marketall: [],
				marketbyid: null,
				loading: false
			};
		case MARKET_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		default:
			return state;
	}
}
