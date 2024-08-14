const SocketIO = require("socket.io");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");


const socketSetup = (server) => {
    const io = SocketIO(server, {
        path: '/socket.io',
        cors: {
            origin: '*', // 프론트엔드 서버 주소
            methods: ['GET', 'POST'],
        }
    });

    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);


        // 사용자가 특정 방에 참가하도록 하는 이벤트 리스너
        socket.on("join", (data) => {
            const { room } = data; // data에서 room(chat_list_id)을 추출
            socket.join(room); // 사용자를 해당 room에 join 시킴
            console.log(`소켓에 연결된 룸 번호 ${room}`);
        });

        // 메시지를 특정 방으로 보내는 이벤트 리스너
        socket.on("sendMessage", async (data) => {
            const { message, room } = data; // message와 room(chat_list_id)을 data에서 추출
            console.log(`sendMessage to room ${room}:`, message);

            // 여기서 저장

            const image = message.image;

            if (image){
                console.log("--------------------------------------------");
                //경로설정
                let dest = "uploads/";
                dest = path.join(dest, "chats", room+'');

                // 디렉토리가 없으면 생성
                fs.mkdirSync(dest, { recursive: true });

                const timestamp = getToday();
                const randomBytes = crypto.randomBytes(16).toString("hex");

                const mimeTypeMatch = image.match(/^data:(image\/\w+);base64,/);
                if (!mimeTypeMatch) {
                  throw new Error("Invalid image data");
                }
                const mimeType = mimeTypeMatch[1];
                const ext = mimeType.split("/")[1];

                const filename = `${timestamp}-${randomBytes}.${ext}`;
                const filePath = path.join(dest, filename);

                // 이미지파싱
                const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
                const buffer = Buffer.from(base64Data, "base64");

                // 파일 저장 (메모리에서 디스크로)
                fs.writeFileSync(filePath, buffer);
                console.log("-------------------------------------")

                // 여기서 insert문 작성
                console.log(filePath);
                // 

            }                        
            io.to(room).emit("receiveMessage", { message, room }); // 특정 room으로만 메시지 전송
        });

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
        });
    });
};

module.exports = socketSetup;


function getToday(){
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

