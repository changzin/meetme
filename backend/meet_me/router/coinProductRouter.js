const express = require('express');
const { coinProductList } = require('../controller/coinProductController.js');

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.get('/list', coinProductList);

module.exports = router;