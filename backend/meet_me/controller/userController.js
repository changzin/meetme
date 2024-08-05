const {getConn, db} = require("../util/db");
const { v4  } = require('uuid');

exports.userList = async (req, res)=>{
    // 기본적으로 connection을 받아와야 트랜잭션을 걸 수 있다.
    const conn = await getConn();
    try{
        // 트랜잭션 시작 : 이 이후에 쿼리를 여러번 날리다가 중간에 에러가 나면, 이 시점의 DB로 롤백된다.
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        // 페이징에 필요한 query 가져오는 부분 + 전처리
        let {page, offset, keyword} = req.query;
        let maxPage = 1;

        page = (!page) ? 0 : Number(page) - 1;
        keyword = (!keyword) ? "" : keyword;
        offset = (!offset) ? 10 : Number(offset);
        keyword = "%" + keyword + "%";

        query = `SELECT
                    u.user_id,
                    u.user_email,
                    u.user_nickname,
                    u.user_block,
                    (SELECT COUNT(*) 
                        FROM report 
                        WHERE user_id2 = u.user_id GROUP BY user_id2) as reportCount,
                    (SELECT SUM(coin_product_price) 
                        FROM payment JOIN coin_product ON payment.coin_product_id = coin_product.coin_product_id
                        WHERE u.user_id = user_id GROUP BY user_id) as payment
                FROM 
                    user u
                WHERE
                    u.user_email LIKE ? OR u.user_nickname LIKE ?
                ORDER BY 
                    u.user_create_date desc
                LIMIT ? OFFSET ?`;
        result = await db(conn, query, [keyword, keyword, offset, page*10]);


        query = `SELECT
                    count(*) AS maxpage        
                FROM 
                    user u
                WHERE
                    u.user_email LIKE ? OR u.user_nickname LIKE ?`
        maxPage = await db(conn, query, [keyword, keyword]);
        maxPage = maxPage[0]['maxpage'];

        responseBody = {
            status: 200,
            userList: result,
            maxPage: Math.ceil(maxPage / 10),
        };
        // 트랜잭션 끝 : 이 코드를 거쳐 DB의 변경사항이 저장된다.
        await conn.commit();
        return res.status(200).json(responseBody);
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

// 유저를 차단하는 컨트롤러
exports.userBlock = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();
        
        let query = '';
        let result = [];
        let responseBody = {};
        
        const userId = req.body.user_id;
      
        query = 'UPDATE user SET user_block="T" WHERE user_id=?';
        result = await db(conn, query, [userId]);

        // changedRows는 바뀐 행 개수이다.
        // 하나 이상 바뀌거나 0개 바뀌었다면 에러를 던짐 -> 아래의 catch문이 400 에러로 응답한다.    
        if (result.affectedRows != 1){
            throw Error("차단을 할 유저를 찾을 수 없습니다.");
        }    

        responseBody = {
            status: 200,
            message: "유저 차단 완료."
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

// 유저 차단을 해제하는 컨트롤러
exports.userUnblock = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;

        query = 'UPDATE user SET user_block="F" WHERE user_id=?';
        result = await db(conn, query, [userId]);

        if (result.affectedRows != 1){
            throw Error("잘못된 요청입니다.");
        }        

        responseBody = {
            status: 200,
            message: "유저 차단 해제 완료."
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

exports.userReport = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;

        query = `SELECT 
                    user.user_nickname, report.report_content 
                FROM 
                    report, user 
                WHERE 
                    user.user_id = report.user_id1 AND user_id2=? ORDER BY report_create_date`;
        result = await db(conn, query,[userId]);

        responseBody = {
            status: 200,
            reportList: result
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

exports.userPayment = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;

        query = `SELECT 
                    coin_product.coin_product_price AS payment_price, payment.payment_code
                FROM 
                    payment
                JOIN 
                    coin_product ON payment.coin_product_id=coin_product.coin_product_id
                WHERE 
                    payment.user_id=? ORDER BY payment.payment_create_date`;
        result = await db(conn, query, [userId]);

        responseBody = {
            status: 200,
            paymentList: result
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

exports.userLogin = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();
        
        let query = '';
        let result = [];
        let responseBody = {};
        
        const {email, loginType} = req.body;

        const accessToken = v4();

        // DB에 일치하는 녀석들 - 로그인 가능한 녀석들 처리
        // 프로필 작성이랑 구분하려면 select에서 더 가져와서 다른 곳으로 300으로 보낼 것.
        query = `SELECT user_id, user_profile_entered
                FROM user 
                WHERE user_email = ? 
                    AND user_email_verified = 'T' 
                    AND user_block='F' 
                    AND user_type=?`;
        result = await db(conn, query, [email, loginType]);
        if (result.length == 1){
            user = result[0];
            // user_access_token을 update해주는 쿼리문 실행
            query = "UPDATE user SET user_access_token = ? WHERE user_id = ?";
            result = await db(conn, query, [accessToken, user.user_id]);
            
            if (user.user_profile_entered='T'){
                responseBody = {
                    status: 200,
                    accessToken: accessToken,
                    type: loginType,
                    message: "로그인 완료했습니다"
                }
            }
            else{
                responseBody = {
                    status: 300,
                    accessToken: accessToken,
                    type: loginType,
                    message: "로그인 완료. 프로필 작성으로 넘어가야 합니다."
                }
            }
            res.json(responseBody);
            return;
        }

        //일치하는 유저가 DB에 존재하지 않는 경우
        // 1. 관리자(로그인)
        if (loginType == 'local'){
            query = `SELECT user_id, user_profile_entered
                    FROM user 
                    WHERE user_email = ? 
                        AND user_type='admin'`;
            result = await db(conn, query, [email]);
            if (result.length == 1){
                user = result[0];
                // user_access_token을 update해주는 쿼리문 실행
                query = "UPDATE user SET user_access_token = ? WHERE user_id = ?";
                result = await db(conn, query, [accessToken, user.user_id]);
                responseBody = {
                    status: 200,
                    accessToken: accessToken,
                    type: 'admin',
                    message: "로그인 완료했습니다"
                }
                res.json(responseBody);
                return;
            }
        }
        // 2. 소셜 유저(자동 회원가입)
        // 겹치는 이메일이 있는지 확인하고, 없으면 로그인을 시도할 수 있다.
        if (loginType != 'local'){
            query = `SELECT user_id
                    FROM user 
                    WHERE user_email = ?`;
            result = await db(conn, query, [email, loginType]);
            
            // 겹치는 이메일이 없다면 회원가입
            if(result.length == 0){
                query = `INSERT 
                        INTO user(user_email, user_type)
                        VALUES(?, ?)`;
                result = await db(conn, query, [email, loginType]);
                query = "UPDATE user SET user_access_token = ? WHERE user_email = ?";

                result = await db(conn, query, [accessToken, email]);
                responseBody = {
                    status: 300,
                    accessToken: accessToken,
                    type: loginType,
                    message: "로그인 완료. 프로필 작성으로 넘어가야 합니다."
                }
                res.json(responseBody);
                return;
            }
        }
        throw new Error("로그인 방법이나 계정이 존재하지 않습니다.");

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

