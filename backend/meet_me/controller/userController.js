const {getConn, db} = require("../util/db");

exports.mypageProfile = async(req, res) => {
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;

        query = `SELECT u.user_nickname, u.user_age, u.user_add, g.user_grade_value, i.user_image_path
                FROM user AS u
                JOIN user_image AS i ON u.user_id = i.user_id
                JOIN user_grade AS g ON u.user_grade_id = g.user_grade_id
                WHERE u.user_id = ?
                ORDER BY i.user_image_id
                LIMIT 1;`
        result = await db(conn, query, [userId]);
        
        responseBody = {
            status : 200,
            user : result[0],
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

exports.profileInfo = async(req, res) => {
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;

        query = `SELECT u.user_nickname, u.user_age, u.user_add, u.user_introduction, g.user_grade_value, 
                GROUP_CONCAT(i.user_image_path ORDER BY i.user_image_id SEPARATOR ',') AS user_image_paths
                FROM user AS u
                JOIN user_image AS i ON u.user_id = i.user_id
                JOIN user_grade AS g ON u.user_grade_id = g.user_grade_id
                WHERE u.user_id = ?
                GROUP BY u.user_nickname, u.user_age, u.user_add, u.user_introduction
                LIMIT 1;`
                
        result = await db(conn, query, [userId]);
        result[0].user_image_paths = result[0].user_image_paths.split(',');
        responseBody = {
            status : 200,
            user : result[0],
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

exports.getHeart = async(req, res) => {
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;

        query = `SELECT u.user_nickname , u.user_id, m.user_id2 as matching
                FROM heart as h 
                JOIN user AS u ON u.user_id = h.user_id2
				LEFT OUTER JOIN matching AS m ON h.user_id1 = m.user_id1 AND h.user_id2 = m.user_id2
                WHERE h.user_id1 = ?
                ORDER BY h.heart_create_date`
        result = await db(conn, query, [userId]);
        responseBody = {
            status : 200,
            heart : result,
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

exports.sendMatching = async(req, res) => {
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;
        const userId2 = req.body.user_id2;

        console.log(userId, userId2);
        query = `SELECT user_id1, user_id2 FROM matching
                WHERE user_id1 = ? AND user_id2 = ?`
        result = await db(conn, query, [userId, userId2]);

        if(result.length == 0){
            query = `INSERT INTO matching(user_id1, user_id2)
                    VALUES(?,?)`
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

exports.deleteMatching = async(req, res) => {
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;
        const userId2 = req.body.user_id2;

        console.log(userId, userId2);
        query = `DELETE FROM matching
                WHERE user_id1 = ? AND user_id2 = ?`
        result = await db(conn, query, [userId, userId2]);

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

exports.deleteHeart = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;
        const userId2 = req.body.user_id2;

        query = `DELETE FROM heart
                WHERE user_id1 = ? AND user_id2 = ?`
        result = await db(conn, query, [userId, userId2]);

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

exports.enterPhoto = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.userId;
        const photos = req.body.photos;
        const score = req.body.user_grade_id;

        const imagePathList = req.body.image_path_list;
        query = `DELETE FROM user_image
                 WHERE user_id = ?`;
        result = await db(conn, query, [userId]);

        query = `INSERT INTO user_image(user_id, user_image_path)
                 VALUES(?, ?)`;
        for(let imagePath of imagePathList){
            result = await db(conn, query, [userId, imagePath]);
        }

        console.log(score);
        query = `UPDATE user 
                SET user_profile_entered='T', user_grade_id=?
                WHERE user_id=?`;
        result = await db(conn, query, [score, userId]);
        
        responseBody = {
            status: 200,
            message: "이미지 등록 완료"
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