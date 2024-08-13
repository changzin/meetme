const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require('fs');
const path = require("path");
const indexRouter = require('./router');
const socketSetup = require("./util/socket");

// .env 폴더 설정
dotenv.config();

const app = express();

// CORS 설정 object
let corsOption = {
    origin: 'http://localhost:8080',
    credential: true
}
// 사진 이미지 넣을 폴더 생성
let dir = path.join(__dirname, `./uploads`);
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
dir = path.join(__dirname, `./uploads/profile`);
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
dir = path.join(__dirname, `./uploads/chat`);
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// 포트 9090으로 설정
app.set('port', process.env.PORT || 9090);
// CORS
app.use(cors(corsOption));
// 개발자 모드로 설정 (수정 -> 저장 시 서버 자동 재시작)
app.use(morgan('dev'));

// uploads폴더를 public하게 만듦
app.use(express.static(path.join(__dirname, '/uploads')));

// http 메시지 크기 제한
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));

app.use('/', indexRouter);

const server = app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), 'port listening...')
});


socketSetup(server, app);