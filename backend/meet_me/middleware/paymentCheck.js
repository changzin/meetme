const {getConn, db} = require("../util/db");

exports.paymentCheck = async (req, res, next) => {
  const conn = await getConn();
  try {
    const useCoin = req.body.useCoin;
    const userId = req.body.user_id;
    
    query = `SELECT user_coin
                FROM user
                WHERE user_id=?`;
    result = await db(conn, query, [userId]);

    if (result[0].user_coin >= useCoin){
      next();
    }
    else{
      throw new Error("코인 수가 모자랍니다.")
    }
  } catch (err) {
    console.error(err);
    responseBody = {
      status: 400,
      message: "사용자가 보유한 코인이 모자랍니다.",
    };
    res.json(responseBody);
    return;
  }
  finally{
    conn.release();
  }
};
