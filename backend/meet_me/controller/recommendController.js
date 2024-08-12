const {getConn, db} = require("../util/db");

exports.recommend = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};
        let user_id1 = req.body.user_id;
        let offset = 10;

        query = `SELECT DATE_FORMAT(user_reroll, '%Y-%m-%d') AS last_date
                FROM user
                WHERE user_id=?`;
        result = await db(conn, query, [user_id1]);

        if(result[0].last_date==getToday()){
            offset = 20;
        }
        query = `call get_user_recommend_list(?)`;
        result = await db(conn, query, [user_id1]);
        
        query = `SELECT u2.user_id, u2.user_nickname, u2.user_age, rc.user_id1, rc.user_id2
                FROM recommend_list rc
                JOIN user u1 ON rc.user_id1 = u1.user_id
                JOIN user u2 ON rc.user_id2 = u2.user_id
                WHERE rc.user_id1 = ?
                ORDER BY recommend_list_id ASC
                LIMIT ?`;
        results = await db(conn, query, [user_id1, offset]);
        
        query = `SELECT user_id2 AS heart_status from heart where user_id1 = ?`;
        getHeart = await db(conn, query, [user_id1]);

        query = `SELECT user_id2 AS matching_status from matching where user_id1 = ?`;
        getMatching = await db(conn, query, [user_id1]);
        
        query = `SELECT ufb.user_feature_bridge_id, uf.user_feature_value, u1.user_id
        FROM user_feature_bridge ufb
        JOIN user u1 ON ufb.user_id = u1.user_id
        JOIN user_feature uf ON ufb.user_feature_id = uf.user_feature_id
        WHERE u1.user_id = ?
        LIMIT 10`;

        for(let i = 0; i < results.length; i++) {
            let user_id = results[i].user_id;
            // let user_id = 1;
            result = await db(conn, query, [user_id]);
            
            results[i].user_feature_value = [];
            
            for(let j = 0; j < result.length; j++){
                results[i].user_feature_value.push(result[j].user_feature_value);
            }
        }

        query = `SELECT user_image_path FROM user_image WHERE user_id = ?`;

        for(let i = 0; i < results.length; i++) {
            let user_id = results[i].user_id;
            result = await db(conn, query, [user_id]);
            
            results[i].user_image_path = [];
            
            for(let j = 0; j < result.length; j++){
                results[i].user_image_path.push(result[j].user_image_path);
            }
        }

        responseBody = {
            status: 200,
            recommendList: result,
            results : results,
            getHeart : getHeart,
            getMatching : getMatching
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

exports.heart = async(req, res) => { //좋아요/하트 신청
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};
        
        const userId = req.body.user_id;
        const user_id2 = req.body.user_id2;
        const useCoin = req.body.useCoin;

        query = `UPDATE user
                SET user_coin = user_coin - ?
                WHERE user_id=?`;
        result = await db(conn, query, [useCoin , userId]);

        query = `INSERT IGNORE INTO heart (user_id1, user_id2) 
                VALUES (?, ?)`;

        result = await db(conn, query, [userId, user_id2]);

        responseBody = {
            status : 200,
            message: "좋아요 잘 보냈습니다 ^^",
        };
        await conn.commit();
        res.status(200).json(responseBody);
    }catch(err){
        console.log(err);
        await conn.rollback();
        const statusCode = (err.status) ? err.status : 400;
        responseBody = {
            status: statusCode,
            message : err.message
        }
        return res.status(statusCode).json(responseBody);
    }finally{
        conn.release();
    }
}

exports.heartCheck = async(req, res) => { 
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;
        const userId2 = req.body.user_id2;
        query = `SELECT user_id2 from heart where user_id1 = ? AND user_id2 = ?`;
        result = await db(conn, query, [userId, userId2]);
        if(result.length > 0){
            responseBody = {
                status : 200,
                result: false
            }
        }else if(result.length == 0){
            responseBody = {
                status : 200,
                result: true
            };
        }

        await conn.commit();
        res.status(200).json(responseBody);
    }catch(err){
        console.log(err);
        await conn.rollback();
        const statusCode = (err.status) ? err.status : 400;
        responseBody = {
            status: statusCode,
            message : err.message
        }
        return res.status(statusCode).json(responseBody);
    }finally{
        conn.release();
    }
}

exports.userDelete = async(req, res) => { //유저 삭제
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};
        await conn.beginTransaction();

        const userId = req.body.user_id;
        const user_id2 = req.body.user_id2;

        query = `DELETE FROM recommend_list
                WHERE user_id1 = ? AND user_id2 = ?`;

        result = await db(conn, query, [userId, user_id2]);
        responseBody = {
            status : 200,
            message: "해당 유저 삭제 완료",
        };
        await conn.commit();
        res.status(200).json(responseBody);
    }catch(err){
        console.log(err);
        await conn.rollback();
        const statusCode = (err.status) ? err.status : 400;
        responseBody = {
            status: statusCode,
            message : err.message
        }
        return res.status(statusCode).json(responseBody);
    }finally{
        conn.release();
    }
}

function getToday(){
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}