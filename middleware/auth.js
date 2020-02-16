const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');

	// Check if not token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	// Verify token
	try {
		//Once the JWT is received, the verification will take the "Header + Payload"
		//and together with a "secret" that is still saved on the server, which will
		//generate a TEST SIGNATURE. But the ORIGINAL SIGNATURE that was originally created
		//with the web token is still in the token. COMPARE TEST SIGNATURE WITH ORIGINAL SIGNATURE
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
