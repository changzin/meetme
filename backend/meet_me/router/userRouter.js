const express = require('express');



const { mypageProfile, profileInfo, getHeart, sendMatching, acceptMatching, deleteMatching, deleteHeart, deleteAlarm, enterPhoto, getCategory, updateProfile, deletePhoto, getProfile,profileInput, featureEdit, getAlarm, idolList, idolInput, userCoin} = require('../controller/userController.js');
const { userLogin, emailDuplicateCheck, signup, emailIsVerified } = require("../controller/authController.js")
const { userList, userBlock, userUnblock, userReport, userPayment, adminUserDetail } = require("../controller/adminController.js")
const { handleFileUpload, insertPhoto, updatePhoto } = require('../middleware/imageHandler.js')
const { loginCheck, adminLoginCheck } = require('../middleware/login.js')

const router = express.Router();

// adminController
router.post('/list', adminLoginCheck, userList);
router.post('/block', adminLoginCheck, userBlock);
router.post('/unblock', adminLoginCheck, userUnblock);
router.post('/report', adminLoginCheck, userReport);
router.post('/payment', adminLoginCheck, userPayment);
router.post('/admindetail', adminLoginCheck, adminUserDetail);

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
router.post('/acceptmatching', loginCheck, acceptMatching);
router.post('/deletematching', loginCheck, deleteMatching);
router.post('/deleteheart', loginCheck, deleteHeart);
router.post('/deletealarm', loginCheck, deleteAlarm);
router.post('/featureedit', loginCheck, featureEdit);
router.post('/getcategory', getCategory);
router.post('/updateprofile', loginCheck, updateProfile);
router.post('/deletephoto', loginCheck, deletePhoto);
router.post('/getalarm', loginCheck, getAlarm);
router.post('/coin', loginCheck, userCoin);


router.post('/profile',getProfile);
router.post('/profileinput',loginCheck,profileInput)
router.post('/idollist',idolList)
router.post('/idolinput',loginCheck,idolInput)



router.post('/insertphoto', insertPhoto);
router.post('/updatephoto', updatePhoto);
router.post('/enterphoto', handleFileUpload, enterPhoto)



module.exports = router;