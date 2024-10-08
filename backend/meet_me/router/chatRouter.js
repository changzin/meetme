const express = require('express');
const {getChatRoomList, saveChat, findUser, getMessageList,getOtherUserInfo,searchChat,uploadimage,deleteChat } = require('../controller/chatController');
const { loginCheck } = require('../middleware/login.js');
const { handleFileUpload} = require('../middleware/imageHandler.js')
const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.post('/getlist',loginCheck, getChatRoomList );
router.post('/savechat', loginCheck, saveChat);
router.post('/finduser', loginCheck, findUser);
router.post('/getmessage', loginCheck, getMessageList);
router.post('/getotheruserinfo',loginCheck, getOtherUserInfo);
router.post('/search', loginCheck, searchChat);
router.post('/uploadimage', handleFileUpload, uploadimage);
router.delete('/del',deleteChat);


module.exports = router;