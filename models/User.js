const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	markets: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'market'
		}
	]
});

module.exports = User = mongoose.model('user', UserSchema);
