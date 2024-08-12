const express = require('express');
const { analysis } = require('../controller/analysisController.js');
const { adminLoginCheck } = require("../middleware/login.js")

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.post('/', adminLoginCheck, analysis);

module.exports = router;