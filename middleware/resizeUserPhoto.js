const sharp = require('sharp');
const resizeUserPhoto = (req, res, next) => {
	if (!req.file) return next();

	//we need to set this to 'filename' for our middleware function
	req.file.filename = `user-${req.user.id}-${Date.now()}.jpg`;

	sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`public/img/users/${req.file.filename}`);

	next();
};

module.exports = resizeUserPhoto;
