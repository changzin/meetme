const {getConn, db} = require("../util/db");
const { writeFile } = require("../util/image")


exports.mypageProfile = async(req, res) => {
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;

        query = `SELECT u.user_nickname, u.user_age, u.user_add, g.user_grade_value, i.user_image_path
                FROM user AS u
                JOIN user_grade AS g ON u.user_grade_id = g.user_grade_id
                LEFT OUTER JOIN user_image AS i ON u.user_id = i.user_id
                WHERE u.user_id = ?
                ORDER BY i.user_image_id
                LIMIT 1`
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
                u.user_height, u.user_weight, u.user_annual_income_id, u.user_mbti_id, u.user_blood_type_id, u.user_religion_id,
                u.user_drinking_id, u.user_smoke, u.user_tartoo, 
                (SELECT GROUP_CONCAT(i.user_image_path ORDER BY i.user_image_id SEPARATOR ',') FROM user_image AS i WHERE u.user_id = i.user_id) AS user_image_paths,
                (SELECT GROUP_CONCAT(fb.user_feature_id ORDER BY fb.user_feature_bridge_id SEPARATOR ',') FROM user_feature_bridge AS fb WHERE u.user_id = fb.user_id) AS user_feature_ids
                FROM user AS u
                JOIN user_grade AS g ON u.user_grade_id = g.user_grade_id
                WHERE u.user_id = ?
                LIMIT 1`
                
        result = await db(conn, query, [userId]);
        result[0].user_image_paths = result[0].user_image_paths.split(',');
        result[0].user_feature_ids = result[0].user_feature_ids.split(',');
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

exports.getCategory = async(req, res) => {
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};

        query = `SELECT
                (SELECT GROUP_CONCAT(user_mbti_value ORDER BY user_mbti_id SEPARATOR ',') FROM user_mbti) AS user_mbti_values,
                (SELECT GROUP_CONCAT(user_blood_type_value ORDER BY user_blood_type_id SEPARATOR ',') FROM user_blood_type) AS user_blood_type_values,
                (SELECT GROUP_CONCAT(user_annual_income_value ORDER BY user_annual_income_id SEPARATOR ',') FROM user_annual_income) AS user_annual_income_values,
                (SELECT GROUP_CONCAT(user_drinking_value ORDER BY user_drinking_id SEPARATOR ',') FROM user_drinking) AS user_drinking_values,
                (SELECT GROUP_CONCAT(user_religion_value ORDER BY user_religion_id SEPARATOR ',') FROM user_religion) AS user_religion_values,
                (SELECT GROUP_CONCAT(user_feature_value ORDER BY user_feature_id SEPARATOR ',') FROM user_feature) AS user_feature_values`

        result = await db(conn, query);
        result[0].user_mbti_values = result[0].user_mbti_values.split(',');
        result[0].user_blood_type_values = result[0].user_blood_type_values.split(',');
        result[0].user_annual_income_values = result[0].user_annual_income_values.split(',');
        result[0].user_drinking_values = result[0].user_drinking_values.split(',');
        result[0].user_religion_values = result[0].user_religion_values.split(',');
        result[0].user_feature_values = result[0].user_feature_values.split(',');

        responseBody = {
            status : 200,
            categoryList : result[0],
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

exports.updateProfile = async(req, res) => {
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;
        const userInfo = req.body.userInfo;

        query = `UPDATE user SET 
                user_add = ?, user_age = ?, user_annual_income_id = ?, user_drinking_id = ?, user_height = ?, user_blood_type_id = ?,
                user_introduction = ?, user_mbti_id = ?, user_religion_id = ?, user_smoke = ?, user_tartoo = ?, user_weight = ?
                WHERE user_id = ?`
                
        result = await db(conn, query, [userInfo.user_add, userInfo.user_age, userInfo.user_annual_income_id, userInfo.user_drinking_id, userInfo.user_height, userInfo.user_blood_type_id, userInfo.user_introduction, userInfo.user_mbti_id, userInfo.user_religion_id, userInfo.user_smoke, userInfo.user_tartoo, userInfo.user_weight ,userId]);

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
        const imagePathList = req.body.image_path_list;
        query = `DELETE FROM user_image
                 WHERE user_id = ?`;
        result = await db(conn, query, [userId]);

        query = `INSERT INTO user_image(user_id, user_image_path)
                 VALUES(?, ?)`;
        for(let imagePath of imagePathList){
            result = await db(conn, query, [userId, imagePath]);
        }

        query = `UPDATE user 
                SET user_profile_entered='T'
                WHERE user_id=?`;
        result = await db(conn, query, [userId]);
        
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