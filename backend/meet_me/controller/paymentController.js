const {getConn, db} = require("../util/db");
const { v4  } = require('uuid');

exports.intoPayment = async(req, res) => { //좋아요/하트 신청
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};
        await conn.beginTransaction();

        const userId = req.body.user_id;
        const payCode = v4();
        const prodId = req.body.coin_product_id;
        const coin = req.body.coinUpdate

        query = `INSERT INTO meet_me.payment(user_id, payment_code, coin_product_id)
                VALUES(?,?,?)`;

        result = await db(conn, query, [userId, payCode, prodId]);
        
        query = `UPDATE user SET user_coin = user_coin + ? WHERE user_id= ?`;

        result = await db(conn, query, [coin, userId]);

        responseBody = {
            status : 200,
            message: "입력완료",
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
