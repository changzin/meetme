import axios from 'axios';
import CryptoJS from 'crypto-js';
axios.defaults.baseURL = 'http://localhost:9090';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default{
    methods: {
        async $api(url, data = {}, method = "GET"){
            console.log(url, data, method);
            let errorResult;
            const result = (await axios({
                method: method,
                url,
                data: data
            })
            .then(result=>{
                return result.data;
            })
            .catch(e=>{
                console.error(e);
                errorResult = e.response.data;
            }));

            if (!errorResult){
                console.log(result);
                return result;
            }
            else{
                console.log(errorResult)
                return errorResult;
            }
        },
        
        $getAccessToken(){
            const accessToken1 = this.$cookies.get("meetMeCookie");
            const accessToken2 = this.$store.state.user;

            let accessToken = (accessToken2) ? accessToken2 : null;
            accessToken = (accessToken1) ? accessToken1 : accessToken;
            return accessToken;
        },

        // 쿠키와 localStorage의 accessToken(유저정보)를 지워주는 함수
        $logoutUser(){
            this.$cookies.remove("meetMeCookie")
            this.$store.commit("user", null);            
        },

        // 64base encoding
        $base64(file){
            console.log("file", file);
            return new Promise(resolve =>{
                var a = new FileReader();
                a.onload = e => resolve(e.target.result);
                // 여기서 base64encoding 처리한다.
                a.readAsDataURL(file);
            });
        },
        // TimeStamp를 예쁘게 바꿔줌
        $dateFormat(value){
            if(value == null) {
                return null;
            }
            const format = new Date(value);
            var year = format.getFullYear();
            var month = format.getMonth() + 1;

            if(month<10) 
                month = '0' + month;
            var date = format.getDate();
            if(date<10) 
                date = '0' + date;
            var hour = format.getHours();
            if(hour<10) hour = '0' + hour;
                var min = format.getMinutes();
            if(min<10) 
                min = '0' + min;

            var sec = format.getSeconds();
            if(sec < 10) 
                sec = '0' + sec;
            
            return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
        },
        $dayFormat(value){
            if(value == null) {
                return null;
            }
            const format = new Date(value);
            var year = format.getFullYear();
            var month = format.getMonth() + 1;

            if(month<10) 
                month = '0' + month;
            var date = format.getDate();
            if(date<10) 
                date = '0' + date;
            var hour = format.getHours();
            if(hour<10) hour = '0' + hour;
                var min = format.getMinutes();
            if(min<10) 
                min = '0' + min;

            var sec = format.getSeconds();
            if(sec < 10) 
                sec = '0' + sec;
            
            return year + "-" + month + "-" + date + " ";
        },
        $timeFormatChat(value) {
            if (value == null) {
                return null;
            }
            const format = new Date(value);
            
            // 월과 일 처리
            var month = format.getMonth() + 1;
            if (month < 10) 
                month = '0' + month;
        
            var date = format.getDate();
            if (date < 10) 
                date = '0' + date;
        
            // 시간 처리
            var hour = format.getHours();
            var period = "오전";
            if (hour >= 12) {
                period = "오후";
                hour = hour > 12 ? hour - 12 : hour;
            }
            if (hour < 10) 
                hour = '0' + hour;
        
            // 분 처리
            var min = format.getMinutes();
            if (min < 10) 
                min = '0' + min;
                
            return period + " " + hour + "시 " + min + "분";
        },

        $imageFileFormat(image_path){
            return process.env.VUE_APP_SERVER_URL + '/' + image_path;
        },
        // 숫자를 한국 단위로 점을 찍어준다.
        $numberFormat(value, format = '#,###') {
            if (value == 0 || value == null) return 0;

            var currency = format.substring(0, 1);
            if (currency === '$' || currency === '₩') {
                format = format.substring(1, format.length);
            } else {
                currency = '';
            }

            var groupingSeparator = ",";
            var maxFractionDigits = 0;
            var decimalSeparator = ".";
            if (format.indexOf(".") == -1) {
                groupingSeparator = ",";
            } else {
                if (format.indexOf(",") < format.indexOf(".")) {
                groupingSeparator = ",";
                decimalSeparator = ".";
                maxFractionDigits = format.length - format.indexOf(".") - 1;
                } else {
                groupingSeparator = ".";
                decimalSeparator = ",";
                maxFractionDigits = format.length - format.indexOf(",") - 1;
                }
            }

            var prefix = "";
            var d = "";
            // v = String(parseFloat(value).toFixed(maxFractionDigits));

            var dec = 1;
            for (var i = 0; i < maxFractionDigits; i++) {
                dec = dec * 10;
            }

            var v = String(Math.round(parseFloat(value) * dec) / dec);

            if (v.indexOf("-") > -1) {
                prefix = "-";
                v = v.substring(1);
            }

            if (maxFractionDigits > 0 && format.substring(format.length - 1, format.length) == '0') {
                v = String(parseFloat(v).toFixed(maxFractionDigits));
            }

            if (maxFractionDigits > 0 && v.indexOf(".") > -1) {
                d = v.substring(v.indexOf("."));
                d = d.replace(".", decimalSeparator);
                v = v.substring(0, v.indexOf("."));
            }
            var regExp = /\D/g;
            v = v.replace(regExp, "");
            var r = /(\d+)(\d{3})/;
            while (r.test(v)) {
                v = v.replace(r, '$1' + groupingSeparator + '$2');
            }

            return prefix + currency + String(v) + String(d);
        },

        // 암호화 함수
        $encrypt(data){
            const beforeData = {data: data}
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(beforeData), process.env.VUE_APP_CRYPTO_SECRET_KEY).toString();

            return encryptedData;
        },

        // 복호화 함수
        $decrypt(encryptedData){
            const bytes  = CryptoJS.AES.decrypt(encryptedData, process.env.VUE_APP_CRYPTO_SECRET_KEY);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData['data'];
        }
    }
}
