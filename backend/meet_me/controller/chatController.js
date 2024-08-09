const {getConn, db} = require("../util/db");

exports.sendChat = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;
        const chatListId = req.body.chat_list_id;
        const chat = req.body.chat

        query = `INSERT INTO chat(chat_list_id, user_id, chat_create_date, chat_content, chat_view, chat_image_path)
                    VALUES(?,?, "2024-08-04", ? , "T", "null" );`;
        result = await db(conn, query, [chatListId, userId, chat]);

        responseBody = {
            status: 200,
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

