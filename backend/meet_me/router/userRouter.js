const express = require('express');

const { mypageProfile, profileInfo, getHeart, sendMatching, deleteMatching, deleteHeart, enterPhoto} = require('../controller/userController.js');
const { userLogin, emailDuplicateCheck, signup, emailIsVerified } = require("../controller/authController.js")
const { userList, userBlock, userUnblock, userReport, userPayment } = require("../controller/adminController.js")
const { handleFileUpload } = require('../middleware/imageHandler.js')
const { loginCheck } = require('../middleware/login.js')
const router = express.Router();

// adminController
router.post('/list', userList);
router.post('/block', userBlock);
router.post('/unblock', userUnblock);
router.post('/report', userReport);
router.post('/payment', userPayment);

// AuthController
router.post('/login', userLogin);
router.post('/signup', signup);
router.post('/duplicatecheck', emailDuplicateCheck);
router.post('/emailisverified', emailIsVerified);

// UserController
router.post('/mypageprofile', mypageProfile);
router.post('/profileinfo', profileInfo);
router.post('/getheart', getHeart);
router.post('/sendmatching', sendMatching);
router.post('/deletematching', deleteMatching);
router.post('/deleteheart', deleteHeart);
router.post('/enterphoto', handleFileUpload, enterPhoto)


module.exports = router;