const axios = require('axios');

exports.chatGptService = async (file) => {
    image = base64(file);
    console.log(image);
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
              {"type": "text", "text": "이 사람을 외모 점수가 높은 순서대로 1~4점 사이로 매겨줘. 무조건 답이 나와야해"} ,
              {
                "type":"image_url",
                "image_url": {
                    "url": image
                }
              }
            ]
          }
        ]
    };
    try{
        const result = axios
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
                console.log(response.data);
                console.log(response.data.choices[0].message.content);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    catch(err){
        // console.error(err);
    }   
};

function base64(file){
    return new Promise(resolve =>{
        var a = new FileReader();
        a.onload = e => resolve(e.target.result);
        // 여기서 base64encoding 처리한다.
        a.readAsDataURL(file);
    });
}