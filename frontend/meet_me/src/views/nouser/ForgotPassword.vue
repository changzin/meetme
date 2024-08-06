<template>
    <div class="container container0">
        <div class="row justify-content-center">
            <div class="card_box row justify-content-center">
            <div class="title">
                비밀번호를 잊으셨나요?
            </div>
            <p class="sub_text">가입했던 이메일을 통해 비밀번호를 변경할 수 있어요!</p>
            <div class="box">
                <div class="sub_title">
                    이메일
                </div>
                <form class="input_box" style="margin-bottom: 20px;">
                    <img src="icon/login/user.svg" class="icon">
                    <input type="text" class="input_text" placeholder="이메일" v-model="email">
                </form>
            </div>
            <input type="submit" class="next_button" style="margin-bottom: 324px;" value="비밀번호 변경 메일 발송하기" @click="emailVerify">
        </div>
    </div>
</div>

</template>
<script>
import { firebaseApp } from "../../util/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
    data(){
        return{
            email: "",
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

                // firebase 계정
                const auth = getAuth(firebaseApp);
                sendPasswordResetEmail(auth, this.email)
                    .then(() => {
                        alert("비밀번호 변경 메일이 발송되었습니다.")
                    })
                    .catch((error) => {
                        console.error(error);
                        alert("해당되는 이메일이 없습니다.")
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

            if (this.email == "" || !emailRegex.test(this.email) || this.email.length > 100){
                userEmailVerify = false;
            }
            else{
                userEmailVerify = true;
            }
            return userEmailVerify;
        },
    }
}
</script>

      

<style scoped>
    .container0 {
    width: 600px;
    display: grid;
    align-content: center;
    
    }

    .card_box {
        margin-top: 30px;
        margin-bottom: 80px;
        width: 568px;
        display: flex;
        background-color: #FFFFFF;
        border-radius: 18px;
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
        display: flex;
        align-items: center;
        padding: 0px;
    }
    .sub_title{
        margin-top: 0px;
        margin-bottom: 30px;
        font-weight: 500;
        font-size: 16px;
        margin-left: 30px;
        width: 100px;
        text-align: start;
        
    }
    .sub_text{
        margin-top: 5px;
        margin-bottom: 44px;
        font-size: 16px;
        font-weight: 500;

    }
    .input_box{
            border-radius: 8px;
            border:1px solid #D2D2D2;
            width: 380px;
            height: 48px;
            display: flex;
            align-items: center;
            padding: 0px;
            margin-left: 36px;
        }
    .input_box input::placeholder{
        color:#9e9e9e;
    }
    .next_button {
    color: #FFFFFF;
    background-image: var(--gradient);
    margin-top: 20px;
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

</style> 