const { response } = require("express");
const {getConn, db} = require("../util/db");

exports.getChatRoomList = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;

        query = `WITH user_chat AS (
    SELECT 
        CASE 
            WHEN cl.user_id1 = ? THEN cl.user_id2 
            ELSE cl.user_id1 
        END AS opponent_user_id, 
        u.user_nickname,          
        cl.chat_list_id    
    FROM 
        chat_list cl
    JOIN  
        user u ON u.user_id = CASE 
                                WHEN cl.user_id1 = ? THEN cl.user_id2 
                                ELSE cl.user_id1 
                              END
    WHERE 
        (cl.user_id1 = ? OR cl.user_id2 = ?)
),
ranked_images AS (
    SELECT 
        uc.opponent_user_id,
        uc.user_nickname,
        ui.user_image_path,
        uc.chat_list_id,
        ROW_NUMBER() OVER (PARTITION BY uc.opponent_user_id ORDER BY ui.user_image_path) AS rn
    FROM 
        user_chat uc
    JOIN 
        user_image ui ON ui.user_id = uc.opponent_user_id
),
latest_messages AS (
    SELECT 
        c.chat_list_id,
        MAX(c.chat_create_date) AS latest_date
    FROM 
        chat c
    GROUP BY 
        c.chat_list_id
),
latest_chat_content AS (
    SELECT 
        c.chat_list_id,
        c.chat_content,
        c.chat_create_date
    FROM 
        chat c
    JOIN 
        latest_messages lm
    ON 
        c.chat_list_id = lm.chat_list_id AND c.chat_create_date = lm.latest_date
),
user_chat_with_messages AS (
    SELECT
        uc.opponent_user_id,
        uc.user_nickname,
        ri.user_image_path,
        uc.chat_list_id,
        lcc.chat_content,
        lcc.chat_create_date
    FROM
        user_chat uc
    JOIN
        ranked_images ri ON ri.opponent_user_id = uc.opponent_user_id AND ri.chat_list_id = uc.chat_list_id
    LEFT JOIN
        latest_chat_content lcc ON lcc.chat_list_id = uc.chat_list_id
    WHERE
        ri.rn = 1
)
SELECT 
    opponent_user_id,
    user_nickname,
    user_image_path,
    chat_list_id,
    chat_content,
    chat_create_date
FROM 
    user_chat_with_messages
ORDER BY
    chat_create_date DESC;
`;

        result = await db(conn, query, [userId, userId, userId, userId]);

        responseBody = {
            status: 200,
            roomList: result,

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
},

exports.getOtherUserInfo = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;
        const roomId = req.body.chatListId;
        // const roomId = req.body.roomId;
        console.log("유저아이디", userId);

        query = `SELECT 
        CASE 
            WHEN cl.user_id1 = ? THEN cl.user_id2 
            ELSE cl.user_id1 
            END AS opponent_user_id, 
            u.user_nickname,          
            ui.user_image_path     
        FROM
            chat_list cl
        JOIN
            user u ON u.user_id = CASE 
                                    WHEN cl.user_id1 = ? THEN cl.user_id2 
                                    ELSE cl.user_id1 
                                END
        JOIN
            user_image ui ON ui.user_id = u.user_id
        WHERE
            (cl.user_id1 = ? OR cl.user_id2 = ?) AND
            cl.chat_list_id = ?
        LIMIT 1`;

         result = await db(conn, query, [userId, userId, userId, userId, roomId ]);
        responseBody = {
            status: 200,
            otherUserInfo: result,

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

exports.searchChat = async(req, res) =>{

    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;
        const text = req.body.text

        query = `WITH user_chat AS (
        SELECT 
                CASE 
                    WHEN cl.user_id1 = ? THEN cl.user_id2 
                    ELSE cl.user_id1 
                END AS opponent_user_id, 
                u.user_nickname,          
                cl.chat_list_id    
            FROM 
                chat_list cl
            JOIN  
                user u ON u.user_id = CASE 
                                        WHEN cl.user_id1 = ? THEN cl.user_id2 
                                        ELSE cl.user_id1 
                                    END
            WHERE 
                (cl.user_id1 = ? OR cl.user_id2 = ?)
        ),
        ranked_images AS (
            SELECT 
                uc.opponent_user_id,
                uc.user_nickname,
                ui.user_image_path,
                uc.chat_list_id,
                ROW_NUMBER() OVER (PARTITION BY uc.opponent_user_id ORDER BY ui.user_image_path) AS rn
            FROM 
                user_chat uc
            JOIN 
                user_image ui ON ui.user_id = uc.opponent_user_id
        ),
        ranked_messages AS (
            SELECT 
                ri.opponent_user_id,
                ri.user_nickname,
                ri.user_image_path,
                ri.chat_list_id,
                ROW_NUMBER() OVER (PARTITION BY ri.opponent_user_id ORDER BY ri.rn) AS rn
            FROM 
                ranked_images ri
            JOIN
                chat c ON ri.chat_list_id = c.chat_list_id
            WHERE 
                ri.user_nickname LIKE CONCAT('%', ?, '%') -- 사용자 닉네임에 검색어가 포함된 경우
                OR c.chat_content LIKE CONCAT('%', ?, '%') -- 채팅 내용에 검색어가 포함된 경우
        )
    SELECT 
        opponent_user_id,
        user_nickname,
        user_image_path,
        chat_list_id
    FROM 
        ranked_messages
    WHERE 
    rn = 1; -- 각 opponent_user_id에 대해 하나의 결과만 선택`;

        result = await db(conn, query, [userId, userId, userId, userId, text, text]);

        responseBody = {
            status: 200,
            searchList: result,

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
},

exports.findUser = async(req, res) =>{

    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let responseBody = {};

        const userId = req.body.user_id;

    
        responseBody = {
            status: 200,
            userId
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
        console.log("Executing query with values:", [roomId, userId, chatDate, text, chatView, imagepath]);

        responseBody = {
            status: 200,
            message: "db에 채팅 저장 완료",
            userId,
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

exports.getMessageList = async(req, res) =>{

    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const chatListId = req.body.chatListId;

        query = `
            SELECT * FROM (SELECT 
            user.user_nickname, 
            chat_id,
            chat_list_id, 
            chat.user_id, 
            chat_create_date, 
            chat_content, 
            chat_view, 
            chat_image_path, 
            (SELECT user_image_path FROM user_image WHERE user_id=chat.user_id limit 1) AS user_image_path
            FROM chat
            JOIN user ON chat.user_id = user.user_id
            WHERE chat_list_id = ?
            ORDER BY chat_create_date DESC
            LIMIT 0, 1000) a
            ORDER BY a.chat_id`;
        result = await db(conn, query, [chatListId]);

        responseBody = {
            status: 200,
            message: "채팅 목록 불러오기 완료",
            messageList: result
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
