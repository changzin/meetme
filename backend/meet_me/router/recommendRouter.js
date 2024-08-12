const express = require('express');
const { recommend , heart , heartCheck , userDelete} = require('../controller/recommendController.js');
const { sendMatching } = require("../controller/userController.js")
const { loginCheck } = require('../middleware/login.js');
const { paymentCheck } = require("../middleware/paymentCheck.js")

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.post('/list', loginCheck, recommend);
router.post('/heart',loginCheck, paymentCheck, heart);
router.post('/sendmatching', loginCheck, sendMatching);
router.post('/heartcheck', loginCheck, heartCheck);
router.post('/userdelete', loginCheck, userDelete);

module.exports = router;