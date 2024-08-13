const SocketIO = require("socket.io");

const { getOUserInfo } = require("../controller/chatController");

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
            io.to(room).emit("receiveMessage", { message, room }); // 특정 room으로만 메시지 전송
        });

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
        });
    });
};

module.exports = socketSetup;
