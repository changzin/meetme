const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const {getConn, db} = require("../util/db");
const {chatGptService} = require('../util/chatGpt')
const sharp = require('sharp');
// 메모리 저장소 설정
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  // 10MB
  limits: { fileSize: 10 * 1024 * 1024 },
}).any();

/**
 * ChatGpt를 사용하는 버전의 미들웨어. 
 * 이미지당 chatGpt에게 요청을 보내기 위한 이미지를 생성하고, 요청을 보내는 코드가 포함됨.
 */
exports.handleFileUploadWithChatGpt = (req, res, next) => {
    try{
        upload(req, res, async (err) => {
            if (err) {
              return res
                .status(400)
                .send({ message: "Error uploading file", error: err.message });
            }
        
            // 파일 유형에 따라 경로를 설정
            const fileType = req.body.fileType;
            const accessToken = req.body.access_token;
            const chatId = req.body.chatId;

            //access_token으로 user_id 가져오는 작업 (폴더구조를 만들기 위함)
            const conn = await getConn();
            query = "SELECT user_id FROM user WHERE user_access_token = ?";
            result = await db(conn, query, [accessToken]);
            const userId = result[0].user_id + "";
            req.body.userId = userId;

            let id = null;
            req.body.image_path_list = [];
            let index = 0;
            let dest = "uploads/";
        
            // 파일 저장 처리
            req.files.forEach(async (file) => {
              dest = "uploads/";
        
              if (fileType === "profile") {
                dest = path.join(dest, "profile", userId);
                id = userId;
              } else if (fileType === "chat") {
                dest = path.join(dest, "chats", chatId);
                id = chatId;
              } else {
                // 추후 에러처리
                console.log("no type");
              }
        
              // 업데이트를 위해서 일단 삭제를 먼저 진행함.(업데이트 시에는 폴더 자체를 지우고 전부 다시 넣는 방식으로 진행할 예정)
              try{
                fs.rmdirSync(dest, { recursive: true });
              }
              catch(err){
                ;
              }
              // 디렉토리가 없으면 생성
              fs.mkdirSync(dest, { recursive: true });
        
              const timestamp = getToday();
              const randomBytes = crypto.randomBytes(16).toString("hex");
              const ext = path.extname(file.originalname);
              const filename = `${timestamp}-${index}-${randomBytes}${ext}`;
              const filePath = path.join(dest, filename);
        
              // 파일 저장 (메모리에서 디스크로)
              fs.writeFileSync(filePath, file.buffer);
              req.body.image_path_list.push(`${fileType}/${id}/${filename}`)
              index++;

              // chatGPT 평가용 사진 저장
              const tempFilename = "temp"+filename;
              const tempFilePath = path.join(dest, tempFilename);
              let image = await sharpImage(filePath, tempFilePath, ext);
              // chatGPT 평가용 사진 삭제
              if (image){
                let score = await chatGptService(tempFilePath);
                req.body.user_grade_id=score;
              }
              await fs.rmSync(tempFilePath);
            });
            next();
          });
    }
    catch(err){
        console.log(err);
    }
};

/**
 * ChatGpt를 사용하지 않는 버전의 미들웨어. 
 * 사용자의 등급을 난수로 생성한다.
 */
exports.handleFileUpload = (req, res, next) => {
  try{
      upload(req, res, async (err) => {
          if (err) {
            return res
              .status(400)
              .send({ message: "Error uploading file", error: err.message });
          }
      
          // 파일 유형에 따라 경로를 설정
          const fileType = req.body.fileType;
          const accessToken = req.body.access_token;
          const chatId = req.body.chatId;

          //access_token으로 user_id 가져오는 작업 (폴더구조를 만들기 위함)
          const conn = await getConn();
          query = "SELECT user_id FROM user WHERE user_access_token = ?";
          result = await db(conn, query, [accessToken]);
          const userId = result[0].user_id + "";
          req.body.userId = userId;

          let id = null;
          req.body.image_path_list = [];
          let index = 0;
          let dest = "uploads/";
      
          // 파일 저장 처리
          req.files.forEach(async (file) => {
            dest = "uploads/";
      
            if (fileType === "profile") {
              dest = path.join(dest, "profile", userId);
              id = userId;
            } else if (fileType === "chat") {
              dest = path.join(dest, "chats", chatId);
              id = chatId;
            } else {
              // 추후 에러처리
              console.log("no type");
            }
      
            // 업데이트를 위해서 일단 삭제를 먼저 진행함.(업데이트 시에는 폴더 자체를 지우고 전부 다시 넣는 방식으로 진행할 예정)
            try{
              fs.rmdirSync(dest, { recursive: true });
            }
            catch(err){
              ;
            }
            // 디렉토리가 없으면 생성
            fs.mkdirSync(dest, { recursive: true });
      
            const timestamp = getToday();
            const randomBytes = crypto.randomBytes(16).toString("hex");
            const ext = path.extname(file.originalname);
            const filename = `${timestamp}-${index}-${randomBytes}${ext}`;
            const filePath = path.join(dest, filename);
      
            // 파일 저장 (메모리에서 디스크로)
            fs.writeFileSync(filePath, file.buffer);
            req.body.image_path_list.push(`${fileType}/${id}/${filename}`)
            index++;
          });
          let score = Math.floor(Math.random() * 3 + 1);
          req.body.user_grade_id=score;
          next();
        });
  }
  catch(err){
      console.log(err);
  }
};

function getToday(){
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

async function sharpImage(filePath, tempFilePath, ext) {
  const image = await sharp(filePath)
      .resize(300, 300, { fit: 'contain' }) // fit : contain 가로 세로 비율을 강제 유지
      .withMetadata() // 원본 이미지의 메타데이터 포함
      .toFormat(ext.substr(1), { quality : 50 }) // 포맷, 퀄리티 지정
      .toFile(tempFilePath, (err, info) => { // 리사이징된 이미지를 로컬에 저장
        console.log(`리사이징 이미지 info : ${JSON.stringify(info, null, 2)}`);
      })
      .toBuffer(); // 리사이징된 이미지를 노드에서 읽을수 있게 buffer로 변환
  return image;
};