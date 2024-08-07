const {getConn, db} = require("../util/db");

exports.userStoryCreate = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;
        const story = req.body.story;
        
        query=`INSERT 
                INTO user_story(user_id, user_story_content)
                VALUES(?, ?)`
        result = await db(conn, query, [userId, story]);

        responseBody = {
            status:200,
            message: "유저 사연 생성 완료."
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