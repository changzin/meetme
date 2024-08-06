<template>
    <div class="container container0">
        <div class="row justify-content-center">
            <div class="cardbox row justify-content-center">
            <div class="title">
                이메일 인증확인
            </div>
            <div class="textbox">
                <div class="subtitle">
                    이메일 인증은 필수!
                </div>
                <div class="subtext">
                    이메일 인증 후 프로필을 등록하시면 첫 가입 보상 300코인과 활동을 시작할 수 있어요.<br/>우리 같이 연애해요 ^^
                </div>
            </div>
            <button type="button" class="nextbutton" style="margin-bottom: 438px;" @click="checkEmailVerfication">
                이메일 인증 후 프로필 등록하기
            </button>
        </div>
    </div>
</div>

</template>
<script>
import { firebaseApp } from "../../util/firebase";
import { getAuth, sendEmailVerification } from "firebase/auth";
export default {
    data(){
        return{
            
        }
    },
    async created(){
        await this.sendEmailAuth();
    },
    methods:{
        async sendEmailAuth(){
            try{
                this.auth = getAuth(firebaseApp);
                await sendEmailVerification(this.auth.currentUser);
            }
            catch(err){
                console.error(err);
            }
        },
        async checkEmailVerfication() {
            try{
                await this.auth.currentUser.reload();
                if (this.auth.currentUser.emailVerified) {                    
                    const result = await this.$api("/user/emailisverified", {user_email: this.auth.currentUser.email}, "POST");
                    if (result.status == 200){
                        let requestBody = {
                            email: this.auth.currentUser.email, 
                            loginType: "local"
                        }
                        const result = await this.$api("/user/login", requestBody, "POST");
                        await this.storeToken(result.accessToken);

                        this.$router.push({name: 'profile'});
                    }
                    else{
                        alert("이메일 인증에 실패했습니다. 다시 시도해주세요.")
                    }
                }else{
                    alert("이메일 인증을 해주세요");
                } 
            }
            catch(err){
                console.error(err);
            }
        },
        // 로그인 마지막 처리
        async storeToken(accessToken){
            this.$cookies.set("meetMeCookie", accessToken);
            if (this.remain){
                await this.$store.commit("user", {accessToken: accessToken});
            }
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

    .cardbox {
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
        margin-bottom:44px;
        font-weight: bold;
    }
    .textbox{
        width: 544px;
        height: 119px;
        background-color: #F2F2F2;
        margin-bottom: 44px;
        /* display: flex; */
        /* align-items: center; */
        border-radius: 10px;
        padding: 0px;
        box-shadow: 0px 4px 20px rgba(157, 136, 179, 0.14);
        
    }
    .subtitle{
        margin-top: 15px;
        /* margin-bottom: 30px; */
        font-weight: 500px;
        font-size: 16px;
        color: #111111;
        text-align: start;
        /* width: 100px; */
        margin-left: 20px;
    }
    .subtext{
        align-self: auto;
        margin-left: 20px;
        margin-top:10px;
        font-size: 14px;
        text-align: start;
        color: #BBAFC8;
    }
    
    .nextbutton {
    color: #FFFFFF;
    background-image: var(--gradient);
    margin-top: 20px;
    width: 508px;
    height: 60px;
    font-size: 20px;
    font-weight: 500;
    border-width: 0;
    border-radius: 8px;
}

</style> 