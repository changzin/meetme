const {getConn, db} = require("../util/db");

exports.main = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();
        let query = '';
        let result = [];
        let responseBody = {};
        
        query = `SET @logged_in_user_id = ?`;
        results = await db(conn, query, [3]); //나중에 로그인한 유저 변수 지정해줘야함
        
        query = `DROP TEMPORARY TABLE IF EXISTS temp`;
        results = await db(conn, query);
        
        query = `CREATE TEMPORARY TABLE temp AS
                SELECT user_id, user_nickname, user_age 
                FROM meet_me.user
                WHERE user_id != @logged_in_user_id
                ORDER BY RAND()
                LIMIT 10`;
        results = await db(conn, query); //성별 구분 확인 , 차단 여부 확인

        query = `SELECT * FROM temp`;
        results = await db(conn, query);

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
                console.log(results)
            }
        }

        responseBody = {
            status: 200,
            recommendList: result,
            results : results,
            // featureList : featureList,
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