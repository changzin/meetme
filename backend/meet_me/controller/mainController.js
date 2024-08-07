const {getConn, db} = require("../util/db");

exports.main = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();
        let query = '';
        let result = [];
        let responseBody = {};
        
        query = `SET @logged_in_user_id = 1`;
        await db(conn, query); //나중에 로그인한 유저 변수 지정해줘야함
        
        query = `DROP TEMPORARY TABLE IF EXISTS temp`;
        await db(conn, query);
        
        query = `CREATE TEMPORARY TABLE temp AS
                SELECT u.user_id, u.user_nickname, u.user_age, u.user_gender, u.user_block, ub.user_id1, ub.user_id2
                FROM meet_me.user u
                LEFT JOIN user_block ub
                ON u.user_id = ub.user_id2 AND ub.user_id1 = @logged_in_user_id
                WHERE u.user_id != @logged_in_user_id AND u.user_gender != ? AND u.user_block != 'T' AND ub.user_id2 IS NULL
                ORDER BY RAND()
                LIMIT 10`;
        await db(conn, query);

        query = `SELECT * FROM temp`;
        results = await db(conn, query);
        console.log("results>>>" , results)

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
            // user : user,
            // temp : temp,
            mainList : results,
            // selectTemp : selectTemp,
            recommendList: result,
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