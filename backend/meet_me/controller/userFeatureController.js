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

        result = await db(conn,query);
        

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

exports.FeatureInsert = async (req,res) =>{
  // 기본적으로 connection을 받아와야 트랜잭션을 걸 수 있다.
  const conn = await getConn();

  let query = '';
  let result = [];
  let responseBody = {};
  let user_id = req.body.user_id
  let user_feature_ids = req.body.user_feature_id;
  let user_feature_id 
    console.log(user_id)
    console.log(user_feature_ids);

    
  try{
      await conn.beginTransaction();
      //user 없어서 대충 넣기 

        for(let i=0; i< user_feature_ids.length; i++){
             user_feature_id = user_feature_ids[i]; 
            query = `INSERT INTO user_feature_bridge (user_id,user_feature_id) VALUES (?,?)`;
            result = await db(conn,query,[user_id,user_feature_id]);
        }
        

        const responseBody = {
            status : 200,
            featureIn : result,
            message : "userfeature 인서트 성공"
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


