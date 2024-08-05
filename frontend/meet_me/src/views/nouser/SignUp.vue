<template>
    <div class="container container0">
        <div class="row justify-content-center">
            <div class="card_box row justify-content-center">
            <div class="title">
                정보입력
            </div>
            <p class="sub_text">회원가입에 필요한 최소한의 정보를 입력해주세요!</p>
            <div class="container_middle">
                <div class="box">
                    <div class="sub_title2">
                        이메일
                    </div>
                    <form class="input_box" >
                        <img src="icon/login/user.svg" class="icon">
                        <input type="text" class="input_text" placeholder="이메일" v-model="email">
                    </form>
                </div>
                <div class="box">
                    <div class="sub_title2">
                        비밀번호
                    </div>
                    <form class="input_box" >
                        <img src="/icon/login/password.svg" class="icon">
                        <input type="password" class="input_text" placeholder="비밀번호" v-model="password">
                    </form>
                </div>
                <div class="box">
                    <div class="sub_title2" style="margin-left: 30px;">
                        비밀번호 확인
                    </div>
                    <form class="input_box" >
                        <img src="/icon/login/password.svg" class="icon">
                        <input type="password" class="input_text" placeholder="비밀번호 확인" v-model="passwordCheck">
                    </form>
                </div>
            </div>
                <input type="submit" class="next_button" style="margin-bottom: 324px;" value="이메일 인증하러 가기" @click="emailVerify">
        </div>
    </div>
</div>

</template>
<script>
import { firebaseApp } from "../../util/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
    data(){
        return{
            email: "",
            password: "",
            passwordCheck: "",
        }
    },
    methods:{
        async emailVerify(){
            try{                
                // 이메일, 패스워드 검증
                if (!this.verifyUser()){
                    alert("값 입력 검증 실패");
                    return;
                }
                let requestBody = {
                    "user_email": this.email
                }
                // 이메일 중복체크
                let result = await this.$api("/user/duplicatecheck", requestBody, "POST");
                if(result.status==400){
                    throw new Error("이메일이 중복되었습니다.")
                }
                requestBody = {
                    "user_email": this.email,
                    "type": "local"
                }
                // 회원가입 진행

                // DB 계정 생성
                result = await this.$api("/user/signup", requestBody, "POST");
                if(result.status!=201){
                    throw new Error("에러가 발생하였습니다. 다시 시도해주세요.")
                }

                // firebase 계정
                const auth = getAuth(firebaseApp);
                    createUserWithEmailAndPassword(auth, this.email, this.password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            console.log(user);
                            this.$router.push({name: "emailcheck"});
                        })
                        .catch((error) => {
                            console.error(error);
                            alert("firebase 오류입니다. 처음부터 다시 시도해 주십시오.");
                        });
            }
            catch(err){
                console.error(err);
                alert(err.message);
            }
        },
        verifyUser(){
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            let userEmailVerify = true;
            let userPasswordVerify = true;

            if (this.email == "" || !emailRegex.test(this.email) || this.email.length > 100){
                userEmailVerify = false;
            }
            else{
                userEmailVerify = true;
            }
            if (this.password != this.passwordCheck || this.password == "" || this.password.length < 8 || this.password.length > 30){
                userPasswordVerify = false;
            }
            else{
                userPasswordVerify = true;
            }
            return userEmailVerify && userPasswordVerify;
        },
    }
}
</script>

      

<style scoped>
    .container0 {
    width: 600px;
    display: grid;
    align-content: center;
    /* border: 1px solid orange; */
    column-gap: 15px;
    }

    .card_box {
        margin-top: 30px;
        margin-bottom: 80px;
        width: 568px;
        display: flex;
        background-color: #FFFFFF;
        border-radius: 18px;
        padding:0px;
        /* margin-left: 15px; */
        
    }

    .title {
        margin-top: 44px;
        font-size: 24px;
        color: #111111;
        text-align: center;
        margin-bottom: 5px;
        font-weight: bold;
    }
    .box{
        display: grid;
        grid-template-columns: 128px 380px ;
        padding: 0px;
        /* border: 1px solid red; */
        column-gap: 30px;
        
        align-items: center;
    }
    div.container_middle{
        /* margin-top: 48px; */
        /* border: 1px solid blue; */
        display: grid;
        padding: 0px;
        /* grid-template-columns: 158px 410px ; */
        /* flex-direction: column;  */
        /* gap: 10px; */
        row-gap: 30px;
    }
    .sub_title{
        
        margin-top: 0px;
        /* margin-bottom: 30px; */
        font-weight: 500;
        font-size: 16px;
        margin-left: 30px;
        /* width: 100px; */
        text-align: start;
        align-items: center;
    }
    .sub_text{
        /* margin-top: 5px; */
        margin-bottom: 44px;
        font-size: 16px;
        font-weight: 500;
        align-items: center;

    }
    .sub_text2{
        /* margin-top: 5px; */
        /* margin-bottom: 44px; */
        font-size: 16px;
        text-align: left;
        font-weight: 500;
        
    /* margin-left: 30px; */
        /* align-items: center; */

    }
    .input_box{
            /* margin-top: 15px; */
            border-radius: 8px;
            border:1px solid #D2D2D2;
            /* width: 380px; */
            /* margin-right: 30px; */
            height: 48px;
            display: flex;
            align-items: center;
            padding: 0px;
            /* border: 1px solid orange; */
            margin-left: 36px;
        }
    .input_box input::placeholder{
        color:#9e9e9e;
    }
    .next_button {
    color: #FFFFFF;
    background-image: var(--gradient);
    
    margin-top: 44px;
    width: 508px;
    height: 60px;
    font-weight: 500;
    font-size: 22px;
    border-width: 0;
    border-radius: 8px;
}
.input_text{
        width:90%;
        height: 80%;
        font-size: 14px;
        margin-left: 4px;
        /* margin-top: 10px; */
        border-width: 0px;
        border:none;
        outline: none;
        padding: 0px;
     }
.icon{
  margin-left: 12px; 
}

</style> 