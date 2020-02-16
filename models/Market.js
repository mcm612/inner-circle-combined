const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema({
	location: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	why_this_property: {
		type: String,
		required: true
	},
	market_photo: {
		type: String
	},
	min_price: {
		type: Number
	},
	max_price: {
		type: Number
	},
	min_cap_rate: {
		type: Number
	},
	max_cap_rate: {
		type: Number
	},
	min_units: {
		type: Number
	},
	max_units: {
		type: Number
	},
	building_class_type: {
		type: String
	},
	unemployment_change: {
		type: Number
	},
	population_change: {
		type: Number
	},
	employers_list: {
		type: [ String ]
	},
	vacancy_rate: {
		type: Number
	},
	median_rental_rate: {
		type: Number
	},
	building_permits: {
		type: Number
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'user'
	}
});

module.exports = Market = mongoose.model('market', MarketSchema);
