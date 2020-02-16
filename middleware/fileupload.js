const multer = require('multer');
const AppError = require('./../utils/appError');

// const multerStorage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		//first argument if there is an error
// 		cb(null, 'public/img/users');
// 	},
// 	filename: (req, file, cb) => {
// 		//user-9797af797afa9f7-3943947394.jpg
// 		const ext = file.mimetype.split('/')[1];
// 		cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
// 	}
// });

//image upload will be stored as a buffer rather than a file system
const multerStorage = multer.memoryStorage();

//to test if the uploaded file is an image
//if it so, we pass true to the callback function or false along with error
const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new AppError('Not an image! Please upload only images', 400), false);
	}
};
const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter
});

module.exports = upload;
