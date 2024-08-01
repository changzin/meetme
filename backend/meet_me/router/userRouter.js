const express = require('express');
const { userList, userBlock, userUnblock, userReport, userPayment, mypageProfile, profileInfo, getHeart, sendMatching, deleteMatching, deleteHeart} = require('../controller/userController.js');

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.post('/list', userList);
router.post('/block', userBlock);
router.post('/unblock', userUnblock);
router.post('/report', userReport);
router.post('/payment', userPayment);
router.post('/mypageprofile', mypageProfile);
router.post('/profileinfo', profileInfo);
router.post('/getheart', getHeart);
router.post('/sendmatching', sendMatching);
router.post('/deletematching', deleteMatching);
router.post('/deleteheart', deleteHeart);


module.exports = router;