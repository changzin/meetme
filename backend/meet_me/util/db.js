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
    return await conn.query(query, param, function(err, result){
        if (err)
            return err;
        return result;
    });
}
