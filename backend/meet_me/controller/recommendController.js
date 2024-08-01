const {getConn, db} = require("../util/db");

exports.recommend = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};
        let user_id1 = 1;
        
        
        
        query = `call get_user_recommend_list(3)`;
        result = await db(conn, query);
        
        query = `SELECT u2.user_id, u2.user_nickname, u2.user_age 
                FROM recommend_list rc
                JOIN user u1 ON rc.user_id1 = u1.user_id
                JOIN user u2 ON rc.user_id2 = u2.user_id
                WHERE rc.user_id1 = ?`;
        results = await db(conn, query, [user_id1]);
        
        query = `SELECT ufb.user_feature_bridge_id, uf.user_feature_value, u1.user_id
                FROM user_feature_bridge ufb
                JOIN user u1 ON ufb.user_id = u1.user_id
                JOIN user_feature uf ON ufb.user_feature_id = uf.user_feature_id
                WHERE u1.user_id = ?`;

        for(let i = 0; i < results.length; i++) {
            let user_id = results[i].user_id;
            // let user_id = 1;
            result = await db(conn, query, [user_id]);

            results[i].user_feature_value = [];

            for(let j = 0; j < result.length; j++){
                results[i].user_feature_value.push(result[j].user_feature_value);
                console.log(results[i])
            }
        }

        responseBody = {
            status: 200,
            paymentList: result,
            results : results
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