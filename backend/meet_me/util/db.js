const mysql = require('mysql2/promise')

const dbConfig = {
    database: "meet_me",
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "1234"
};


const dbPool = mysql.createPool(dbConfig);

exports.getConn = async()=>{
    return await dbPool.getConnection();
}


// 쿼리문을 합쳐서 
exports.db = async (conn, query, param = []) => {
    try{
        const result = await conn.query(query, param, function(err, result){
            return result;
        });
        return result[0];
    }
    catch(err){
        console.error(err);
        err.status = 500;
        err.message = "DB 에러입니다";
        throw err;
    }
    
}
