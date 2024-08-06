const axios = require('axios');
const fs = require('fs');

exports.chatGptService = async (file) => {
    
    const requestBody = await makeRequestBody(file);
    try{
        const result = await axios
            .post(
                "https://api.openai.com/v1/chat/completions",
                requestBody,
                {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                }
            )
            .then((response) => {
                console.log("-------------성공-------------------");
                console.log(response.data.choices[0]);
                let result = JSON.parse(response.data.choices[0].message.content);
                return result.score;
            })
            .catch((err) => {
                console.log("-------------실패-------------------")
                console.error(err.response.data);
            });
    }
    catch(err){
        console.error(err.data);
    }   
};

async function makeRequestBody(filePath){
    const contents = await fs.readFileSync(filePath, {encoding: 'base64'})
    const requestBody = {
        "model": "gpt-4o-mini",
        "response_format": { "type": "json_object" },
        "messages": [
          {
            "role": "system",
            "content": "You are a helpful assistant designed to output JSON."
          },
          {
            "role": "user",
            "content": [
              {"type": "text", "text": "이 사람을 외모 점수가 높은 순서대로 1~4점 사이로 매겨줘. score라는 변수로 줘"} ,
              {
                "type":"image_url",
                "image_url": {
                    "url": `data:image/png;base64,${contents}`
                }
              }
            ]
          }
        ]
    };
    return requestBody
}