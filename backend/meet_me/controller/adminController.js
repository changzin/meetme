const {getConn, db} = require("../util/db");

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
                    (u.user_email LIKE ? OR u.user_nickname LIKE ?) AND user_type != 'admin'
                    AND u.user_email_verified='T' AND u.user_profile_entered='T'
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

exports.adminUserDetail = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const userId = req.body.user_id;

        query = `SELECT u.user_nickname, u.user_age, u.user_add, u.user_introduction, g.user_grade_value,
                u.user_height, u.user_weight, ai.user_annual_income_value, m.user_mbti_value, bt.user_blood_type_value, r.user_religion_value,
                d.user_drinking_value, u.user_smoke, u.user_tartoo, 
                (SELECT 
					GROUP_CONCAT(i.user_image_path ORDER BY i.user_image_id SEPARATOR ',') 
					FROM user_image AS i 
					WHERE u.user_id = i.user_id) AS user_image_paths,
                (SELECT 
					GROUP_CONCAT(f.user_feature_value ORDER BY fb.user_feature_bridge_id SEPARATOR ',') 
					FROM user_feature_bridge AS fb 
                    JOIN user_feature AS f ON fb.user_feature_id = f.user_feature_id
                    WHERE u.user_id = fb.user_id) AS user_feature_ids
                FROM user AS u
                JOIN user_grade AS g ON u.user_grade_id = g.user_grade_id
                JOIN user_annual_income AS ai ON u.user_annual_income_id = ai.user_annual_income_id
                JOIN user_mbti AS m ON u.user_mbti_id = m.user_mbti_id 
                JOIN user_blood_type AS bt ON u.user_blood_type_id = bt.user_blood_type_id
                JOIN user_religion AS r ON u.user_religion_id = r.user_religion_id
                JOIN user_drinking AS d ON u.user_drinking_id = d.user_drinking_id
                WHERE u.user_id = ?
                LIMIT 1`
                
        result = await db(conn, query, [userId]);
        if (result[0].user_image_paths){
            result[0].user_image_paths = result[0].user_image_paths.split(',');
        }
        if (result[0].user_feature_ids){
            result[0].user_feature_ids = result[0].user_feature_ids.split(',');
        }
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