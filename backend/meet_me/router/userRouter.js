const express = require('express');


const { mypageProfile, profileInfo, getHeart, sendMatching, deleteMatching, deleteHeart, enterPhoto, getCategory, updateProfile, deletePhoto,getProfile,profileInput} = require('../controller/userController.js');

const { userLogin, emailDuplicateCheck, signup, emailIsVerified } = require("../controller/authController.js")
const { userList, userBlock, userUnblock, userReport, userPayment } = require("../controller/adminController.js")
const { handleFileUpload, insertPhoto, updatePhoto } = require('../middleware/imageHandler.js')
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
router.post('/mypageprofile', loginCheck, mypageProfile);
router.post('/profileinfo', loginCheck, profileInfo);
router.post('/getheart', loginCheck, getHeart);
router.post('/sendmatching', loginCheck, sendMatching);
router.post('/deletematching', loginCheck, deleteMatching);
router.post('/deleteheart', loginCheck, deleteHeart);
router.post('/getcategory', getCategory);

router.post('/updateprofile', updateProfile);
router.post('/profile',getProfile);
router.post('/profileinput',profileInput)

router.post('/updateprofile', loginCheck, updateProfile);
router.post('/deletephoto', loginCheck, deletePhoto);



router.post('/insertphoto', insertPhoto);
router.post('/updatephoto', updatePhoto);
router.post('/enterphoto', handleFileUpload, enterPhoto)



module.exports = router;