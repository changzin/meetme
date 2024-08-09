const {getConn, db} = require("../util/db");

exports.main = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();
        let query = '';
        let result = [];
        let responseBody = {};
        let user_id1 = req.body.user_id;
        
        query = `SET @logged_in_user_id = 1`;
        user = await db(conn, query); //나중에 로그인한 유저 변수 지정해줘야함
        
        query = `DROP TEMPORARY TABLE IF EXISTS temp`;
        temp = await db(conn, query);
        
        query = `CREATE TEMPORARY TABLE temp AS
                SELECT u.user_id, u.user_nickname, u.user_age, u.user_gender, u.user_block, ub.user_id1, ub.user_id2
                FROM meet_me.user u
                LEFT JOIN user_block ub
                ON u.user_id = ub.user_id2 AND ub.user_id1 = @logged_in_user_id
                WHERE u.user_id != @logged_in_user_id AND u.user_gender != (SELECT user_gender FROM user WHERE user_id=@logged_in_user_id) AND u.user_block != 'T' AND ub.user_id2 IS NULL AND u.user_type != 'admin'
                ORDER BY RAND()
                LIMIT 10`;
        rand = await db(conn, query);


        query = `SELECT * FROM temp`;
        results = await db(conn, query);

        
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
            mainList : results,
            getHeart : getHeart,
            getMatching : getMatching,
            
        };

        console.log("responseBody >>>" ,responseBody )

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

exports.sendMatching = async(req, res) => { //매칭 신청
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;
        console.log("userId>>>" , userId)
        const userId2 = req.body.user_id2;
        console.log("userId2>>>" , userId2)

        query = `SELECT user_id1, user_id2 FROM matching
                WHERE user_id1 = ? AND user_id2 = ?`;
        result = await db(conn, query, [userId, userId2]);

        if(result.length == 0){
            query = `INSERT INTO matching(user_id1, user_id2)
                    VALUES(?,?)`;
            result = await db(conn, query, [userId, userId2]);
        }else{
            throw new Error('매칭신청이 중복 되었습니다.');
        }

        responseBody = {
            status : 200,
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