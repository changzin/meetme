const { getConn, db } = require("../util/db");
const { deleteFile } = require("../util/image.js");

exports.mypageProfile = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    await conn.beginTransaction();
    const userId = req.body.user_id;

    query = `SELECT u.user_nickname, u.user_age, u.user_add, g.user_grade_value, i.user_image_path
                FROM user AS u
                JOIN user_grade AS g ON u.user_grade_id = g.user_grade_id
                LEFT OUTER JOIN user_image AS i ON u.user_id = i.user_id
                WHERE u.user_id = ?
                ORDER BY i.user_image_id
                LIMIT 1`;
    result = await db(conn, query, [userId]);

    responseBody = {
      status: 200,
      user: result[0],
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};
//건용
exports.getProfile = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    query = `SELECT
        (SELECT GROUP_CONCAT(user_mbti_value ORDER BY user_mbti_id SEPARATOR ',') FROM user_mbti) AS user_mbti_values,
        (SELECT GROUP_CONCAT(user_blood_type_value ORDER BY user_blood_type_id SEPARATOR ',') FROM user_blood_type) AS user_blood_type_values,
        (SELECT GROUP_CONCAT(user_annual_income_value ORDER BY user_annual_income_id SEPARATOR ',') FROM user_annual_income) AS user_annual_income_values,
        (SELECT GROUP_CONCAT(user_drinking_value ORDER BY user_drinking_id SEPARATOR ',') FROM user_drinking) AS user_drinking_values,
        (SELECT GROUP_CONCAT(user_religion_value ORDER BY user_religion_id SEPARATOR ',') FROM user_religion) AS user_religion_values,
        (SELECT GROUP_CONCAT(user_feature_value ORDER BY user_feature_id SEPARATOR ',') FROM user_feature) AS user_feature_values`;

    result = await db(conn, query);
    result[0].user_mbti_values = result[0].user_mbti_values.split(",");
    result[0].user_blood_type_values =
      result[0].user_blood_type_values.split(",");
    result[0].user_annual_income_values =
      result[0].user_annual_income_values.split(",");
    result[0].user_drinking_values = result[0].user_drinking_values.split(",");
    result[0].user_religion_values = result[0].user_religion_values.split(",");
    result[0].user_feature_values = result[0].user_feature_values.split(",");

    responseBody = {
      status: 200,
      categoryList: result[0],
    };

    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};
//건용
exports.idolList = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let idol = [];
    let responseBody = {};
    query = `SELECT
		(SELECT GROUP_CONCAT(user_mbti_value ORDER BY user_mbti_id SEPARATOR ',') FROM user_mbti) AS user_mbti_values,
        (SELECT GROUP_CONCAT(user_idol_age_value ORDER BY user_idol_age_id SEPARATOR ',') FROM user_idol_age) AS user_idol_age_values,
        (SELECT GROUP_CONCAT(user_blood_type_value ORDER BY user_blood_type_id SEPARATOR ',') FROM user_blood_type) AS user_blood_type_values,
        (SELECT GROUP_CONCAT(user_annual_income_value ORDER BY user_annual_income_id SEPARATOR ',') FROM user_annual_income) AS user_annual_income_values,
        (SELECT GROUP_CONCAT(user_idol_height_value ORDER BY user_idol_height_id SEPARATOR ',') FROM user_idol_height) AS user_idol_height_values,
        (SELECT GROUP_CONCAT(user_idol_weight_value ORDER BY user_idol_weight_id SEPARATOR ',') FROM user_idol_weight) AS user_idol_weight_values,
        (SELECT GROUP_CONCAT(user_religion_value ORDER BY user_religion_id SEPARATOR ',') FROM user_religion) AS user_religion_values,
        (SELECT GROUP_CONCAT(user_drinking_value ORDER BY user_drinking_id SEPARATOR ',') FROM user_drinking) AS user_drinking_values`;

    idol = await db(conn, query);

    idol[0].user_mbti_values = idol[0].user_mbti_values.split(",");

    idol[0].user_blood_type_values = idol[0].user_blood_type_values.split(",");

    idol[0].user_annual_income_values =
      idol[0].user_annual_income_values.split(",");

    idol[0].user_drinking_values = idol[0].user_drinking_values.split(",");

    idol[0].user_religion_values = idol[0].user_religion_values.split(",");

    idol[0].user_idol_height_values =
      idol[0].user_idol_height_values.split(",");

    idol[0].user_idol_weight_values =
      idol[0].user_idol_weight_values.split(",");

    idol[0].user_idol_age_values = idol[0].user_idol_age_values.split(",");

    responseBody = {
      status: 200,
      idolList: idol[0],
    };

    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};
exports.idolInput = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};

    //ProfileInput에서 불러옴
    let user_id = req.body.user_id;

    let user_idol_age_id = req.body.user_idol_age_id;
    let user_mbti_id = req.body.user_mbti_id;
    let user_blood_type_id = req.body.user_blood_type_id;
    let user_idol_height_id = req.body.user_idol_height_id;
    let user_idol_weight_id = req.body.user_idol_weight_id;
    let user_annual_income_id = req.body.user_annual_income_id;
    let user_idol_smoke = req.body.user_idol_smoke;
    let user_drinking_id = req.body.user_drinking_id;
    let user_idol_tartoo = req.body.user_idol_tartoo;
    let user_religion_id = req.body.user_religion_id;

    del =`DELETE FROM  user_idol WHERE user_id = ?`;
    query = 
            `INSERT INTO user_idol 
                (user_id,user_idol_age_id,
                user_mbti_id,
                user_blood_type_id,
                user_idol_height_id,
                user_idol_weight_id,
                user_annual_income_id,
                user_idol_smoke,user_drinking_id,
                user_idol_tartoo,user_religion_id)
                VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

    delect = await db(conn,del,[
      user_id
    ])
    result = await db(conn,query,[
      user_id,
      user_idol_age_id,
      user_mbti_id,
      user_blood_type_id,
      user_idol_height_id,
      user_idol_weight_id,
      user_annual_income_id,
      user_idol_smoke,
      user_drinking_id,
      user_idol_tartoo,
      user_religion_id,
    ]);

    responseBody = {
      status: 200,
      userIdolClear : delect,
      userIdol: result,
      message: "유저 이상형 정보가 업데이트 되었습니다.",
    };

    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};
//건용
exports.profileInput = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    //ProfileInput에서 불러옴
    let user_id = req.body.user_id;
    let user_nickname = req.body.user_nickname;
    let user_gender = req.body.user_gender;
    let user_age = req.body.user_age;
    let user_mbti_id = req.body.user_mbti_id;
    let user_blood_type_id = req.body.user_blood_type_id;
    let user_height = req.body.user_height;
    let user_weight = req.body.user_weight;
    let user_annual_income_id = req.body.user_annual_income_id;
    let user_smoke = req.body.user_smoke;
    let user_drinking_id = req.body.user_drinking_id;
    let user_tartoo = req.body.user_tartoo;
    let user_religion_id = req.body.user_religion_id;
    let user_introduction = req.body.user_introduction;
    let user_add = req.body.user_add;


    query = `UPDATE user
        SET
          user_nickname = ?,
          user_gender = ?,
          user_age = ?,
          user_mbti_id = ?,
          user_blood_type_id = ?,
          user_height = ?,
          user_weight = ?,
          user_add = ?,
          user_annual_income_id = ?,
          user_smoke = ?,
          user_drinking_id = ?,
          user_tartoo = ?,
          user_religion_id = ?,
          user_introduction = ?
        WHERE user_id = ?`;

    result = await db(conn, query, [
      user_nickname,
      user_gender,
      user_age,
      user_mbti_id,
      user_blood_type_id,
      user_height,
      user_weight,
      user_add,
      user_annual_income_id,
      user_smoke,
      user_drinking_id,
      user_tartoo,
      user_religion_id,
      user_introduction,
      user_id,
    ]);

    responseBody = {
      status: 200,
      profile: result,
      message: "유저 프로필 정보가 업데이트 되었습니다.",
    };

    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.profileInfo = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    await conn.beginTransaction();
    const userId = req.body.user_id;

    query = `SELECT u.user_nickname, u.user_age, u.user_add, u.user_introduction, g.user_grade_value,
                u.user_height, u.user_weight, u.user_annual_income_id, u.user_mbti_id, u.user_blood_type_id, u.user_religion_id,
                u.user_drinking_id, u.user_smoke, u.user_tartoo, 
                (SELECT GROUP_CONCAT(i.user_image_path ORDER BY i.user_image_id SEPARATOR ',') FROM user_image AS i WHERE u.user_id = i.user_id) AS user_image_paths,
                (SELECT GROUP_CONCAT(fb.user_feature_id ORDER BY fb.user_feature_bridge_id SEPARATOR ',') FROM user_feature_bridge AS fb WHERE u.user_id = fb.user_id) AS user_feature_ids
                FROM user AS u
                JOIN user_grade AS g ON u.user_grade_id = g.user_grade_id
                WHERE u.user_id = ?
                LIMIT 1`;

    result = await db(conn, query, [userId]);
    result[0].user_image_paths = result[0].user_image_paths.split(",");
    if (result[0].user_feature_ids) {
      result[0].user_feature_ids = result[0].user_feature_ids.split(",");
    }

    responseBody = {
      status: 200,
      user: result[0],
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.getCategory = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    await conn.beginTransaction();
    query = `SELECT
                (SELECT GROUP_CONCAT(user_mbti_value ORDER BY user_mbti_id SEPARATOR ',') FROM user_mbti) AS user_mbti_values,
                (SELECT GROUP_CONCAT(user_blood_type_value ORDER BY user_blood_type_id SEPARATOR ',') FROM user_blood_type) AS user_blood_type_values,
                (SELECT GROUP_CONCAT(user_annual_income_value ORDER BY user_annual_income_id SEPARATOR ',') FROM user_annual_income) AS user_annual_income_values,
                (SELECT GROUP_CONCAT(user_drinking_value ORDER BY user_drinking_id SEPARATOR ',') FROM user_drinking) AS user_drinking_values,
                (SELECT GROUP_CONCAT(user_religion_value ORDER BY user_religion_id SEPARATOR ',') FROM user_religion) AS user_religion_values,
                (SELECT GROUP_CONCAT(user_feature_value ORDER BY user_feature_id SEPARATOR ',') FROM user_feature) AS user_feature_values`;

    result = await db(conn, query);
    result[0].user_mbti_values = result[0].user_mbti_values.split(",");
    result[0].user_blood_type_values =
      result[0].user_blood_type_values.split(",");
    result[0].user_annual_income_values =
      result[0].user_annual_income_values.split(",");
    result[0].user_drinking_values = result[0].user_drinking_values.split(",");
    result[0].user_religion_values = result[0].user_religion_values.split(",");
    result[0].user_feature_values = result[0].user_feature_values.split(",");

    responseBody = {
      status: 200,
      categoryList: result[0],
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.updateProfile = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    await conn.beginTransaction();
    const userId = req.body.user_id;
    const userInfo = req.body.userInfo;

    query = `UPDATE user SET 
                user_add = ?, user_age = ?, user_annual_income_id = ?, user_drinking_id = ?, user_height = ?, user_blood_type_id = ?,
                user_introduction = ?, user_mbti_id = ?, user_religion_id = ?, user_smoke = ?, user_tartoo = ?, user_weight = ?
                WHERE user_id = ?`;

    result = await db(conn, query, [
      userInfo.user_add,
      userInfo.user_age,
      userInfo.user_annual_income_id,
      userInfo.user_drinking_id,
      userInfo.user_height,
      userInfo.user_blood_type_id,
      userInfo.user_introduction,
      userInfo.user_mbti_id,
      userInfo.user_religion_id,
      userInfo.user_smoke,
      userInfo.user_tartoo,
      userInfo.user_weight,
      userId,
    ]);

    responseBody = {
      status: 200,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.deletePhoto = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    await conn.beginTransaction();
    const userId = req.body.user_id;
    const user_image_path = req.body.user_image_path;

    query = `DELETE FROM user_image WHERE user_id = ? AND user_image_path = ?`;

    result = await db(conn, query, [userId, user_image_path]);

    deleteFile(user_image_path);

    responseBody = {
      status: 200,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.featureEdit = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    await conn.beginTransaction();
    const userId = req.body.user_id;
    const feature_id = req.body.user_feature_ids;

    query = `SELECT user_feature_id FROM user_feature_bridge WHERE user_id = ?`;

    result = await db(conn, query, [userId]);
    console.log(result);
    if (result.length > 0) {
      query = `DELETE FROM user_feature_bridge WHERE user_id = ?`;

      result = await db(conn, query, [userId]);
    }
    for (let i = 0; i < feature_id.length; i++) {
      const featureId = feature_id[i];
      query = `INSERT INTO user_feature_bridge(user_id, user_feature_id) VALUES(?,?)`;

      result = await db(conn, query, [userId, featureId]);
    }
    responseBody = {
      status: 200,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.getHeart = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    await conn.beginTransaction();
    const userId = req.body.user_id;
    //내가 누른 좋아요나 매칭을 한 사람 정보를 가져오는것
    query = `SELECT u.user_nickname, u.user_id AS heart, null AS matching,
            (SELECT i.user_image_path FROM user_image AS i WHERE h.user_id2 = i.user_id limit 1) AS image_path,
            h.heart_create_date AS create_date
            FROM user AS u
            JOIN heart AS h ON u.user_id = h.user_id2
            WHERE h.user_id1 = ?


            UNION ALL

            SELECT u.user_nickname, null ,u.user_id AS matching,
            (SELECT i.user_image_path FROM user_image AS i WHERE m.user_id2 = i.user_id limit 1) AS image_path,
            m.matching_create_date AS create_date
            FROM user AS u
            JOIN matching AS m ON u.user_id = m.user_id2
            WHERE m.user_id1 = ?

            ORDER BY create_date`;

    result = await db(conn, query, [userId, userId]);
    responseBody = {
      status: 200,
      heart: result,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.sendMatching = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    await conn.beginTransaction();
    const userId = req.body.user_id;
    const userId2 = req.body.user_id2;
    const useCoin = req.body.useCoin;
    query = `UPDATE user
    SET user_coin = user_coin - ?
    WHERE user_id=?`;
    result = await db(conn, query, [useCoin, userId]);

    query = `SELECT user_id1, user_id2 FROM matching
                WHERE user_id1 = ? AND user_id2 = ?`;
    result = await db(conn, query, [userId, userId2]);

    if (result.length == 0) {
      query = `INSERT INTO matching(user_id1, user_id2)
                    VALUES(?,?)`;
      result = await db(conn, query, [userId, userId2]);
    } else {
      throw new Error("매칭신청이 중복 되었습니다.");
    }

    responseBody = {
      status: 200,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.acceptMatching = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    await conn.beginTransaction();
    const userId = req.body.user_id;
    const userId2 = req.body.user_id2;

    // 내가 채팅방 개설
    query = `INSERT INTO chat_list(user_id1, user_id2) VALUES(?, ?)`;
    result = await db(conn, query, [userId, userId2]);
    // 매칭 신청한 사람의 알림창에 등록
    query = `INSERT INTO alarm(user_id, alarm_type, matching_id) VALUES(?, ? , (SELECT matching_id FROM matching WHERE user_id1 = ? AND user_id2 = ? limit 1))`;
    result = await db(conn, query, [userId2, 'matching_success', userId2, userId]);

    //내가 누른 좋아요나 매칭을 한 사람 정보를 가져오는것
    query = `UPDATE matching SET matching_success = 'T' WHERE user_id1 = ? AND user_id2 = ?`;

    result = await db(conn, query, [userId2, userId]);


    responseBody = {
      status: 200,
      heart: result,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.deleteMatching = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    await conn.beginTransaction();
    const userId = req.body.user_id;
    const userId2 = req.body.user_id2;

    query = `DELETE FROM matching
                WHERE user_id1 = ? AND user_id2 = ?`;
    result = await db(conn, query, [userId, userId2]);

    responseBody = {
      status: 200,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.deleteHeart = async (req, res) => {
  const conn = await getConn();
  try {
    await conn.beginTransaction();

    let query = "";
    let result = [];
    let responseBody = {};

    const userId = req.body.user_id;
    const userId2 = req.body.user_id2;

    query = `DELETE FROM heart
                WHERE user_id1 = ? AND user_id2 = ?`;
    result = await db(conn, query, [userId, userId2]);

    responseBody = {
      status: 200,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.deleteAlarm = async (req, res) => {
  const conn = await getConn();
  try {
    await conn.beginTransaction();

    let query = "";
    let result = [];
    let responseBody = {};

    const userId = req.body.user_id;
    const userId2 = req.body.user_id2;

    query = `DELETE FROM alarm
                WHERE user_id = ? AND alarm_id = ?`;
    result = await db(conn, query, [userId, userId2]);

    responseBody = {
      status: 200,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.enterPhoto = async (req, res) => {
  const conn = await getConn();
  try {
    await conn.beginTransaction();

    let query = "";
    let result = [];
    let responseBody = {};

    const userId = req.body.userId;
    const photos = req.body.photos;
    const score = req.body.user_grade_id;

    const imagePathList = req.body.image_path_list;
    query = `DELETE FROM user_image
                 WHERE user_id = ?`;
    result = await db(conn, query, [userId]);

    query = `INSERT INTO user_image(user_id, user_image_path)
                 VALUES(?, ?)`;
    for (let imagePath of imagePathList) {
      result = await db(conn, query, [userId, imagePath]);
    }

    query = `UPDATE user 
                SET user_profile_entered='T', user_grade_id=?
                WHERE user_id=?`;
    result = await db(conn, query, [score, userId]);

    responseBody = {
      status: 200,
      message: "이미지 등록 완료",
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.userCoin = async (req, res) => {
  const conn = await getConn();
  try {
    await conn.beginTransaction();
    let query = "";
    let result = [];
    let responseBody = {};

    const userId = req.body.user_id;

    query = `SELECT user_coin, user_nickname
            FROM user
            WHERE user_id=?`;
    result = await db(conn, query, [userId]);

    responseBody = {
      status: 200,
      userCoin: result[0].user_coin,
      user_nickname: result[0].user_nickname,
    };

    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.getAlarm = async (req, res) => {
  const conn = await getConn();
  try {
    await conn.beginTransaction();

    let query = "";
    let result = [];
    let results = [];
    let responseBody = {};

    const userId = req.body.user_id;

    query = `(SELECT al.*, u.user_nickname, i.user_image_path, m.user_id1 AS send_user_id, m.matching_success
                FROM alarm AS al
                JOIN matching AS m ON al.matching_id = m.matching_id
                JOIN user AS u ON u.user_id =(CASE WHEN (al.alarm_type='matching_success') then m.user_id2 ELSE m.user_id1 END)
                JOIN (SELECT user_id, user_image_path
                FROM user_image AS ui
                WHERE user_image_id = (
                SELECT MIN(user_image_id)
                FROM user_image
                WHERE user_id = ui.user_id
                )) AS i ON i.user_id = (CASE WHEN (al.alarm_type='matching_success') then m.user_id2 ELSE m.user_id1 END)
                WHERE al.user_id = ?
                                
                UNION

                SELECT al.*, u.user_nickname, i.user_image_path, h.user_id1 AS send_user_id, null
                FROM alarm AS al
                JOIN heart AS h ON al.heart_id = h.heart_id
                JOIN user AS u ON u.user_id = h.user_id1
                JOIN (SELECT user_id, user_image_path
                FROM user_image AS ui
                WHERE user_image_id = (
                SELECT MIN(user_image_id)
                FROM user_image
                WHERE user_id = ui.user_id
                )) AS i ON h.user_id1 = i.user_id
                WHERE al.user_id = ?) ORDER BY alarm_create_date`;

    result = await db(conn, query, [userId, userId]);

    query = `UPDATE alarm SET alarm_view = 'T' WHERE user_id = ?`

    results = await db(conn, query, [userId]);

    responseBody = {
      status: 200,
      alarm: result,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.countAlarm = async (req, res) => {
  const conn = await getConn();
  try {
    await conn.beginTransaction();

    let query = "";
    let result = [];
    let responseBody = {};

    const userId = req.body.user_id;

    query = `SELECT COUNT(*) AS count FROM alarm WHERE user_id = ? AND alarm_view = 'F'`

    result = await db(conn, query, [userId]);
    responseBody = {
      status: 200,
      alarm: result[0].count,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.profileDetail = async (req, res) => {
  const conn = await getConn();
  try {
    let query = "";
    let result = [];
    let responseBody = {};
    await conn.beginTransaction();

    const userId = req.body.user_id2;

    query = `SELECT u.user_nickname, u.user_age, u.user_add, u.user_introduction, g.user_grade_value,
                u.user_height, u.user_weight, ai.user_annual_income_value, m.user_mbti_value, bt.user_blood_type_value, r.user_religion_value,
                d.user_drinking_value, u.user_smoke, u.user_tartoo, 
                (SELECT 
					GROUP_CONCAT(i.user_image_path ORDER BY i.user_image_id SEPARATOR ',') 
					FROM user_image AS i 
					WHERE u.user_id = i.user_id) AS user_image_paths,
                (SELECT 
					GROUP_CONCAT(f.user_feature_value ORDER BY fb.user_feature_bridge_id SEPARATOR ',') 
					FROM user_feature_bridge AS fb 
                    JOIN user_feature AS f ON fb.user_feature_id = f.user_feature_id
                    WHERE u.user_id = fb.user_id) AS user_feature_ids
                FROM user AS u
                JOIN user_grade AS g ON u.user_grade_id = g.user_grade_id
                JOIN user_annual_income AS ai ON u.user_annual_income_id = ai.user_annual_income_id
                JOIN user_mbti AS m ON u.user_mbti_id = m.user_mbti_id 
                JOIN user_blood_type AS bt ON u.user_blood_type_id = bt.user_blood_type_id
                JOIN user_religion AS r ON u.user_religion_id = r.user_religion_id
                JOIN user_drinking AS d ON u.user_drinking_id = d.user_drinking_id
                WHERE u.user_id = ?
                LIMIT 1`;

    result = await db(conn, query, [userId]);
    result[0].user_image_paths = result[0].user_image_paths.split(",");
    result[0].user_feature_ids = result[0].user_feature_ids.split(",");

    responseBody = {
      status: 200,
      user: result[0],
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.userVerify = async (req, res) => {
  const conn = await getConn();
  try {
    await conn.beginTransaction();

    let query = "";
    let result = [];
    let responseBody = {};

    const userId = req.body.user_id;

    query = `SELECT user_email_verified, user_profile_entered, user_block, user_type
                FROM user
                WHERE user_id=?`;
    result = await db(conn, query, [userId]);
    if (result[0]) {
      responseBody = {
        status: 200,
        userCoin: result[0],
      };
    } else {
      throw new Error("인증 실패!");
    }

    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.regrade = async (req, res) => {
  const conn = await getConn();
  try {
    await conn.beginTransaction();

    let query = "";
    let result = [];
    let responseBody = {};

    const userId = req.body.user_id;
    const useCoin = req.body.useCoin;

    query = `UPDATE user
                    SET user_grade_id = (user_grade_id+1)%3+1,
                        user_coin = user_coin - ?
                    WHERE user_id= ?`;
    result = await db(conn, query, [useCoin, userId]);

    responseBody = {
      status: 200,
      message: "변경 완료되었습니다.",
    };

    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.addReport = async (req, res) => {
  const conn = await getConn();
  try {
    await conn.beginTransaction();

    let query = "";
    let result = [];
    let responseBody = {};

    const userId = req.body.user_id;
    const userId2 = req.body.user_id2;
    const report = req.body.report;

    query = `INSERT 
                INTO report(user_id1, user_id2, report_content)
                VALUES(?, ?, ?)`;
    result = await db(conn, query, [userId, userId2, report]);

    responseBody = {
      status: 200,
      reportList: result,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.addBlock = async (req, res) => {
  const conn = await getConn();
  try {
    await conn.beginTransaction();

    let query = "";
    let result = [];
    let responseBody = {};

    const userId = req.body.user_id;
    const userId2 = req.body.user_id2;

    query = `INSERT 
                INTO user_block(user_id1, user_id2)
                VALUES(?, ?)`;
    result = await db(conn, query, [userId, userId2]);

    responseBody = {
      status: 200,
      reportList: result,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

exports.reRollList = async (req, res) => {
  const conn = await getConn();
  try {
    await conn.beginTransaction();

    let query = "";
    let result = [];
    let responseBody = {};

    const userId = req.body.user_id;
    const useCoin = req.body.useCoin;

    query = `SELECT DATE_FORMAT(user_reroll, '%Y-%m-%d') AS last_date
                FROM user
                WHERE user_id=?`;
    result = await db(conn, query, [userId]);

    if (result[0].last_date == getToday()) {
      throw new Error("이미 결제하였습니다.");
    }

    query = `UPDATE user
              SET user_coin = user_coin - ?,
                  user_reroll = NOW()
              WHERE user_id=?`;
    result = await db(conn, query, [useCoin, userId]);

    responseBody = {
      status: 200,
      message: "결제 완료. 추천 리스트 확장",
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};

function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

exports.deleteUser = async (req, res) => {
  const conn = await getConn();
  try {
    await conn.beginTransaction();

    let query = "";
    let result = [];
    let responseBody = {};

    const userId = req.body.user_id;

    query = `UPDATE user SET user_email_verified = 'F', user_profile_entered = 'F', user_block = 'T' WHERE user_id = ?`;
    result = await db(conn, query, [userId]);

    responseBody = {
      status: 200,
      reportList: result,
    };
    await conn.commit();
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    await conn.rollback();
    const statusCode = err.status ? err.status : 400;
    responseBody = {
      status: statusCode,
      message: err.message,
    };
    return res.status(statusCode).json(responseBody);
  } finally {
    conn.release();
  }
};
