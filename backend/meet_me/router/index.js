const express = require('express');
const userRouter = require('./userRouter');
const coinProductRouter = require('./coinProductRouter');
const userStoryRouter = require("./userStoryRouter");
const router = express.Router();

// 여러 라우터 파일을 모아서 묶어주는 역할을 수행
router.use("/user", userRouter);
router.use("/coinproduct", coinProductRouter);
router.use("/userstory", userStoryRouter);
module.exports = router;