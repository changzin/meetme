const SocketIO = require("socket.io");

module.exports = (server) => {
    const io = SocketIO(server, {
        path: '/socket.io',
        cors: {
            origin: 'http://localhost:8080', // 프론트엔드 서버 주소
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        const req = socket.request;
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        console.log("새로운 클라이언트 접속", ip, socket.id, req.ip);

        // 클라이언트가 연결을 해제했을 때
        socket.on("disconnect", () => {
            console.log("클라이언트 접속 해제", ip, socket.id);
            clearInterval(socket.interval); // 오타 수정
        });

        // 오류 발생 시
        socket.on("error", (error) => {
            console.error(error);
        });

        // 클라이언트로부터 "reply" 이벤트 수신
        socket.on("reply", (data) => {
            console.log(data);
        });

        // 3초마다 클라이언트에게 메시지 전송
        socket.interval = setInterval(() => {
            socket.emit("news", "hello socket.io");
        }, 3000);
    });
};
