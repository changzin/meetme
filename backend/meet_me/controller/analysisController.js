const {getConn, db} = require("../util/db");

exports.analysis = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();
        
        let query = '';
        let result = [];
        let responseBody = {};
        
        
        query = `SELECT 
                    user_gender, 
                    count(*) AS amount 
                FROM 
                    user 
                WHERE 
                    user_email_verified='T' 
                    AND user_profile_entered='T' 
                    AND user_gender is NOT NULL 
                GROUP BY user_gender`;

        const genderRateData = await db(conn, query);

        query = `SELECT 
                    user_gender, 
                    Truncate(user_age / 10, 0) * 10 AS age, 
                    count(*) AS amount 
                FROM 
                    user 
                WHERE 
                    user_email_verified='T' 
                    AND user_profile_entered='T' 
                    AND user_age >= 20 
                    AND user_gender is NOT NULL 
                GROUP BY age, user_gender`;

        const genderAgeData = await db(conn, query);
        
        query = `SELECT 
                    DATE_FORMAT(payment_create_date, '%Y-%m') AS date, 
                    SUM(coin_product_price) AS monthly_profit 
                FROM 
                    payment
                    JOIN coin_product 
                        ON payment.coin_product_id = coin_product.coin_product_id
                GROUP BY DATE_FORMAT(payment_create_date, '%Y-%m') 
                ORDER BY DATE_FORMAT(payment_create_date, '%Y-%m')`;

        const monthlyProfitData = await db(conn, query);

        query = `SELECT 
                    DATE_FORMAT(matching_success_date, '%Y-%m') AS date, 
                    COUNT(*) AS monthly_success
                FROM
                    matching
                WHERE matching_success='T'
                GROUP BY DATE_FORMAT(matching_success_date, '%Y-%m') 
                ORDER BY DATE_FORMAT(matching_success_date, '%Y-%m')`;

        const monthlyMatchingData = await db(conn, query);

        responseBody = {
            status: 200,
            genderRateData: genderRateData,
            genderAgeData: genderAgeData,
            monthlyProfitData: monthlyProfitData,
            monthlyMatchingData: monthlyMatchingData
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