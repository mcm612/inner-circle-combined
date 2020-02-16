const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Market = require('../../models/Market');
const uploadfile = require('../../middleware/fileupload');
const resizeMarketPhoto = require('../../middleware/resizeMarketPhoto');

// @route    GET api/market/user
// @desc     Get logged in user's market list
// @access   Private
router.get('/user', auth, async (req, res) => {
	let userWithMarkets;
	try {
		userWithMarkets = await User.findById(req.user.id).populate('markets');
		if (!userWithMarkets) {
			res.status(404).send('Could not find places for the provided user id');
		}

		res.json(userWithMarkets.markets);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Fetching places failed, please try again later');
	}
});

// @route    GET api/market/marketlist
// @desc     Get all markets from all users!
// @access   Private
router.get('/marketlist', auth, async (req, res) => {
	try {
		const markets = await Market.find().populate('creator', 'name');
		res.json(markets);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/market/:market_id
// @desc     Get market by id
// @access   Private
router.get('/:market_id', auth, async (req, res) => {
	const marketId = req.params.market_id;
	let market;
	try {
		market = await Market.findById(marketId).populate('creator', 'name');
	} catch (err) {
		res.status(500).send('Something went wrong, could not find market');
	}

	if (!market) {
		res.status(404).send('Could not find place for the provided id.');
	}

	res.json(market);
});

// @route    POST api/market/createmarket
// @desc     Create a new market for user
// @access   Private
router.post(
	'/createmarket',
	[
		auth,
		uploadfile.single('file'),
		resizeMarketPhoto,
		[
			check('location', 'Market location is required').not().isEmpty(),
			check('state', 'State is required').not().isEmpty(),
			check('why_this_property', 'Why did you select this property is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}

		const {
			location,
			state,
			why_this_property,
			min_price,
			max_price,
			min_cap_rate,
			max_cap_rate,
			min_units,
			max_units,
			building_class_type,
			unemployment_change,
			population_change,
			employers_list,
			vacancy_rate,
			median_rental_rate,
			building_permits
		} = req.body;

		// Build market object
		const marketFields = {};
		if (location) marketFields.location = location;
		if (state) marketFields.state = state;
		if (why_this_property) marketFields.why_this_property = why_this_property;
		if (min_price) marketFields.min_price = min_price;
		if (max_price) marketFields.max_price = max_price;
		if (min_cap_rate) marketFields.min_cap_rate = min_cap_rate;
		if (max_cap_rate) marketFields.max_cap_rate = max_cap_rate;
		if (min_units) marketFields.min_units = min_units;
		if (max_units) marketFields.max_units = max_units;
		if (building_class_type) marketFields.building_class_type = building_class_type;
		if (unemployment_change) marketFields.unemployment_change = unemployment_change;
		if (population_change) marketFields.population_change = population_change;
		if (employers_list) marketFields.employers_list = employers_list.split(',').map((employer) => employer.trim());
		if (vacancy_rate) marketFields.vacancy_rate = vacancy_rate;
		if (median_rental_rate) marketFields.median_rental_rate = median_rental_rate;
		if (building_permits) marketFields.building_permits = building_permits;
		if (req.user.id) marketFields.creator = req.user.id;
		// Add url + file path to profile object
		const url = req.protocol + '://' + req.get('host');
		if (req.file) marketFields.market_photo = url + '/public/img/markets/' + req.file.filename;

		const createdMarket = new Market(marketFields);

		let user;
		try {
			user = await User.findById(req.user.id).populate('markets');
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Creating market failed, please try again.');
		}
		if (!req.user.id) {
			res.status(404).send('Could not find user for provided id.');
		}

		try {
			await createdMarket.save();
			user.markets.unshift(createdMarket);
			await user.save();
			res.status(201).json(user.markets);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Creating market failed, please try again');
		}
	}
);

// @route    PATCH api/editmarket/:market_id
// @desc     Update market created by user
// @access   Private

router.patch(
	'/editmarket/:market_id',
	[
		auth,
		uploadfile.single('file'),
		resizeMarketPhoto,
		[
			check('location', 'Market location is required').not().isEmpty(),
			check('state', 'State is required').not().isEmpty(),
			check('why_this_property', 'Why did you select this property is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}
		const marketId = req.params.market_id;
		const {
			location,
			state,
			why_this_property,
			min_price,
			max_price,
			min_cap_rate,
			max_cap_rate,
			min_units,
			max_units,
			building_class_type,
			unemployment_change,
			population_change,
			employers_list,
			vacancy_rate,
			median_rental_rate,
			building_permits
		} = req.body;

		// Build market object
		const marketFields = {};
		if (location) marketFields.location = location;
		if (state) marketFields.state = state;
		if (why_this_property) marketFields.why_this_property = why_this_property;
		if (min_price) marketFields.min_price = min_price;
		if (max_price) marketFields.max_price = max_price;
		if (min_cap_rate) marketFields.min_cap_rate = min_cap_rate;
		if (max_cap_rate) marketFields.max_cap_rate = max_cap_rate;
		if (min_units) marketFields.min_units = min_units;
		if (max_units) marketFields.max_units = max_units;
		if (building_class_type) marketFields.building_class_type = building_class_type;
		if (unemployment_change) marketFields.unemployment_change = unemployment_change;
		if (population_change) marketFields.population_change = population_change;
		if (employers_list) marketFields.employers_list = employers_list.split(',').map((employer) => employer.trim());
		if (vacancy_rate) marketFields.vacancy_rate = vacancy_rate;
		if (median_rental_rate) marketFields.median_rental_rate = median_rental_rate;
		if (building_permits) marketFields.building_permits = building_permits;
		if (req.user.id) marketFields.creator = req.user.id;
		// Add url + file path to profile object
		const url = req.protocol + '://' + req.get('host');
		if (req.file) marketFields.market_photo = url + '/public/img/markets/' + req.file.filename;

		try {
			// Using upsert option (creates new doc if no match is found):
			let market = await Market.findOneAndUpdate(
				{
					_id: marketId
				},
				marketFields,
				{
					new: true
				}
			).populate('creator', 'name');
			res.json(market);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    DELETE api/market/:exp_id
// @desc     Delete market from market list
// @access   Private

router.delete('/:market_id', auth, async (req, res) => {
	const marketId = req.params.market_id;
	let market;
	try {
		//populate -> refer to a document in another collection
		//            and to work with data in that document of that other collection
		// Accomplishes two objectives
		// 1. Change something in the user document.
		// 2. Change something in the market document.
		market = await Market.findById(marketId).populate('creator');
	} catch (err) {
		res.status(500).send('Something went wrong, could not delete place');
	}

	if (!market) {
		res.status(404).send('Could not find market for this id to delete');
	}

	if (market.creator.id !== req.user.id) {
		res.status(401).send('You are not allowed to delete this place');
	}

	try {
		//We want to find the id of the market to delete
		//And search the user's market collection and make sure the id with a market is deleted

		/*-delete document that was found with "findById" in market model-*/
		await market.remove();

		/*-delete the market id from the user-*/

		//pull will automatically remove the id! We don't have to explicity tell
		//mongo that we have to remove an id. Done internally by default.
		market.creator.markets.pull(market);
		//we are referring to another model (user)? Not place
		await market.creator.save();
		// we can use market pull and save since the creator thanks to 'populate'
		// GAVE US THE FULL USER OBJECT LINKED TO THAT MARKET
		const updatedUserMarketList = await User.findById(req.user.id).populate('markets');
		res.status(200).json(updatedUserMarketList.markets);
	} catch (err) {
		res.status(500).status('Something went wrong, could not delete place');
	}
});

module.exports = router;
