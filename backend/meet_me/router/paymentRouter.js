const express = require('express');
const { intoPayment } = require('../controller/paymentController.js');
const { loginCheck } = require('../middleware/login.js');

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.post('/intopayment', loginCheck, intoPayment);

module.exports = router;