const express = require('express');
const { userList } = require('../controller/userController.js');

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.post('/list', userList);

module.exports = router;