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
                    (SELECT COUNT(*) FROM report WHERE user_id2 = u.user_id GROUP BY user_id2) as reportCount, 
                    (SELECT SUM(payment_price) FROM payment WHERE u.user_id = user_id GROUP BY user_id) as payment 
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
        result = await db(conn, query, [userId]);

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
                    payment_price, payment_code
                FROM 
                    payment
                WHERE 
                    user_id=? ORDER BY payment_create_date`;
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