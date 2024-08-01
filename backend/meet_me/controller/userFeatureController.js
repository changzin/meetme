const { response } = require("express");
const {getConn, db} = require("../util/db");

exports.FeatureList = async (req, res)=>{
    // 기본적으로 connection을 받아와야 트랜잭션을 걸 수 있다.
    const conn = await getConn();

    let query = '';
    let result = [];
    let responseBody = {};

    try{
        await conn.beginTransaction();
        
        query = "SELECT * FROM user_feature;"
        console.log(query);
        result = await db(conn,query);
        
        console.log(result);

        const responseBody = {
            status : 200,
            userFeature : result,
            message : "userFeature 조회 성공"
        }
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


