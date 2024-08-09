const {getConn, db} = require("../util/db");

exports.getChatRoomList = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;

        query = `SELECT 
    CASE 
        WHEN cl.user_id1 = 1 THEN cl.user_id2 
        ELSE cl.user_id1 
        END AS opponent_user_id, 
        u.user_nickname,          
        ui.user_image_path     
    FROM -- 첫번째로 실행: chat_list 테이블에서 데이터를 가져옴
        chat_list cl
    JOIN  -- 세번째로 실행: user 테이블과 연결함 상대방의 user_id와 일치하는 행을 찾아 연결
        user u ON u.user_id = CASE 
                                WHEN cl.user_id1 = 53 THEN cl.user_id2 
                                ELSE cl.user_id1 
                            END
    JOIN -- 네번째로 실행: user_image 테이블과 연결함 상대방의 user_id와 일치하는 행을 찾아 연결
        user_image ui ON ui.user_id = u.user_id
    WHERE  -- 두번째로 실행: chat_list 테이블에서 현재 사용자의 user_id가 user_id1 또는 user_id2에 있는 행만 선택
        (cl.user_id1 = 53 OR cl.user_id2 = 53)
    LIMIT 1;`;

        result = await db(conn, query, [userId, userId, userId]);

        responseBody = {
            status: 200,
            roomList: result
        };
        await conn.commit();
        res.status(200).json(responseBody);
    }
    catch(err){
        console.error(err);
        await conn.rollback();
        const statusCode = (err.status) ? err.status : 400;
        responseBody = {
            status: statusCode,
            message: err.message
        }
        return res.status(statusCode).json(responseBody);
    }
    finally{
        conn.release();
    }   
}

exports.saveChat = async(req, res) =>{

    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const roomId = req.body.roomId;
        const userId = req.body.user_id;
        const chatDate = req.body.chatDate;
        const text = req.body.text;
        const chatView = req.body.chatView;
        const imagepath = req.body.image;


        query = `INSERT INTO chat 
        (chat_list_id, user_id, chat_create_date, chat_content, chat_view, chat_image_path) 
        value (?,?,?,?,?,?)`;
        result = await db(conn, query, [roomId, userId, chatDate, text, chatView, imagepath ]);

        responseBody = {
            status: 200,
            message: "db에 채팅 저장 완료"
        };
        await conn.commit();
        res.status(200).json(responseBody);
    }
    catch(err){
        console.error(err);
        await conn.rollback();
        const statusCode = (err.status) ? err.status : 400;
        responseBody = {
            status: statusCode,
            message: err.message
        }
        return res.status(statusCode).json(responseBody);
    }
    finally{
        conn.release();
    }   

}
