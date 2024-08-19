const { response } = require("express");
const {getConn, db} = require("../util/db");
const { v4  } = require('uuid');

exports.userLogin = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();
        
        let query = '';
        let result = [];
        let responseBody = {};
        
        const {email, loginType} = req.body;

        const accessToken = v4();

        // DB에 일치하는 녀석들 - 로그인 가능한 녀석들 처리
        // 프로필 작성이랑 구분하려면 select에서 더 가져와서 다른 곳으로 300으로 보낼 것.
        query = `SELECT user_id, user_profile_entered
                FROM user 
                WHERE user_email = ? 
                    AND user_email_verified = 'T' 
                    AND user_block='F' 
                    AND user_type=?`;
        result = await db(conn, query, [email, loginType]);
        if (result.length == 1){
            user = result[0];
            // user_access_token을 update해주는 쿼리문 실행
            query = "UPDATE user SET user_access_token = ? WHERE user_id = ?";
            result = await db(conn, query, [accessToken, user.user_id]);
            
            if (user.user_profile_entered=='T'){
                responseBody = {
                    status: 200,
                    accessToken: accessToken,
                    type: loginType,
                    message: "로그인 완료했습니다"
                }
            }
            else{
                responseBody = {
                    status: 300,
                    accessToken: accessToken,
                    type: loginType,
                    message: "로그인 완료. 프로필 작성으로 넘어가야 합니다."
                }
            }
            await conn.commit();
            res.json(responseBody);
            return;
        }

        //일치하는 유저가 DB에 존재하지 않는 경우
        // 1. 관리자(로그인)
        if (loginType == 'local'){
            query = `SELECT user_id, user_profile_entered
                    FROM user 
                    WHERE user_email = ? 
                        AND user_type='admin'`;
            result = await db(conn, query, [email]);
            if (result.length == 1){
                user = result[0];
                // user_access_token을 update해주는 쿼리문 실행
                query = "UPDATE user SET user_access_token = ? WHERE user_id = ?";
                result = await db(conn, query, [accessToken, user.user_id]);
                responseBody = {
                    status: 200,
                    accessToken: accessToken,
                    type: 'admin',
                    message: "로그인 완료했습니다"
                }
                await conn.commit();
                res.json(responseBody);
                return;
            }
        }
        // 2. 소셜 유저(자동 회원가입)
        // 겹치는 이메일이 있는지 확인하고, 없으면 로그인을 시도할 수 있다.
        if (loginType != 'local'){
            query = `SELECT user_id
                    FROM user 
                    WHERE user_email = ?`;
            result = await db(conn, query, [email, loginType]);

            // 겹치는 이메일이 없다면 회원가입
            if(result.length == 0){
                query = `INSERT 
                        INTO user(user_email, user_type, user_email_verified)
                        VALUES(?, ?, 'T')`;
                result = await db(conn, query, [email, loginType]);

                query = "UPDATE user SET user_access_token = ? WHERE user_email = ?";
                result = await db(conn, query, [accessToken, email]);
                responseBody = {
                    status: 300,
                    accessToken: accessToken,
                    type: loginType,
                    message: "로그인 완료. 프로필 작성으로 넘어가야 합니다."
                }
                await conn.commit();
                res.json(responseBody);
                return;
            }
        }
        throw new Error("로그인 방법이나 계정이 존재하지 않습니다.");
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

exports.emailDuplicateCheck = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const user_email = req.body.user_email;

        query = `SELECT 
                    count(*) AS count 
                FROM user 
                WHERE user_email=?`;                

        result = await db(conn, query, [user_email]);
        count = result[0]['count'];
        if (count != 0){
            throw new Error("중복된 이메일입니다.")
        }
        responseBody = {
            status: 200,
            message: "중복되지 않은 이메일입니다."
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

exports.signup = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const {user_email, type} = req.body;

        query = `INSERT 
                INTO user(user_email, user_type)
                VALUES(?, ?)`;                

        result = await db(conn, query, [user_email, 'local']);
        
        responseBody = {
            status: 201,
            message: "회원가입 완료되었습니다."
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

exports.emailIsVerified = async(req, res)=>{
    const conn = await getConn();
    try{
        await conn.beginTransaction();

        let query = '';
        let result = [];
        let responseBody = {};

        const user_email = req.body.user_email;

        query = 'UPDATE user SET user_email_verified="T" WHERE user_email=?';
        result = await db(conn, query, [user_email]);
        result = result.changedRows;

        if (result != 1){
            throw Error("해당 유저를 찾을 수 없습니다.");
        }        
        responseBody = {
            status: 200,
            message: "이메일 인증 반영 완료."
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