const express = require('express');

const router = express.Router();

const {sendChat} = require("../controller/chatController");

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.post('/sendchat', sendChat);

module.exports = router;