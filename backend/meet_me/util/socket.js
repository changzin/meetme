const SocketIO = require("socket.io");
const socketSetup = (server) => {
    const io = SocketIO(server, {
        path: '/socket.io',
        cors: {
            origin: '*', // 프론트엔드 서버 주소
            methods: ['GET', 'POST'],
        }
    });
    // app.set("io", io);
    // const chat = io.of("/chat");

    io.on("connection", (socket) =>{
        // console.log("chat 네임스페이스에 접속");
        console.log("a user connected", socket.id);

        socket.on("join", (data) =>{
            // socket.join(data);
            console.log(data);
        });

        socket.on("sendMessage", (data) =>{
            // socket.join(data);
            const { message } = data;
            console.log("sendMessage :", message);
            
            io.emit("receiveMessage", {message});
        });

        

        socket.on("disconnect", () =>{
            console.log("chat 네임스페이스 접속 해제")
        })
    })

    // io.emit("receiveMessage", {
    //     message_content: "message"

    // })
    };

module.exports = socketSetup;