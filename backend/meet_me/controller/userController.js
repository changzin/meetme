const {getConn, db} = require("../util/db");

exports.userList = async (req, res)=>{
    // 기본적으로 connection을 받아와야 트랜잭션을 걸 수 있다.
    const conn = await getConn();
    try{
        let query = '';
        let result = [];
        let responseBody = {};

        // 트랜잭션 시작 : 이 이후에 쿼리를 여러번 날리다가 중간에 에러가 나면, 이 시점의 DB로 롤백된다.
        await conn.beginTransaction();

        query = `SELECT
                             u.user_id, 
                             u.user_email, 
                             u.user_nickname, 
                             u.user_block, 
                             (SELECT COUNT(*) FROM report WHERE user_id2 = u.user_id GROUP BY user_id2) as reportCount, 
                             (SELECT SUM(payment_price) FROM payment WHERE u.user_id = user_id GROUP BY user_id) as payment 
                        FROM 
                            user u
                        `;

        result = await db(conn, query, []);
        // 트랜잭션 끝 : 이 코드를 거쳐 DB의 변경사항이 저장된다.
        await conn.commit();
        return res.status(200).json(result);
    }
    catch(err){
        console.error(err);
        await conn.rollback();
        return res.status(400).json();
    }
    finally{
        conn.release();
    }
}