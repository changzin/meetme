const {getConn, db} = require("../util/db");

// requestBody의 accessToken을 중간에서 user_id로 넣어주는 미들웨어, accessToken이 필요한 컨트롤러에서 인증 처리 + user_id를 찾는 중복 쿼리를 줄일 수 있다.
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
