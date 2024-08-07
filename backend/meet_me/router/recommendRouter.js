const express = require('express');
const { recommend , heart , sendMatching , heartCheck , userDelete} = require('../controller/recommendController.js');
// const { loginCheck } = require('../middleware/login.js');

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.post('/list', recommend);
router.post('/heart', heart);
router.post('/sendmatching', sendMatching);
router.post('/heartcheck', heartCheck);
router.post('/userdelete', userDelete);

module.exports = router;