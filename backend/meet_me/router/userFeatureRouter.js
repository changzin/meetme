const express = require('express');
const { FeatureList,FeatureInsert } = require('../controller/userFeatureController.js');
const { loginCheck } = require('../middleware/login.js')

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.get('/list', FeatureList);
router.post('/insert',loginCheck,FeatureInsert)
module.exports = router;