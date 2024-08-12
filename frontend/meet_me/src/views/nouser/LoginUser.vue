<template>
<div class="container container0">
        <div class="row justify-content-center">
            <div class="card_box row justify-content-center">
                <div class="title">
                    MEET ME
                </div>
                <form style="width:346px; padding: 0" @submit="login">
                    <div class="input_box" style="margin-bottom: 20px;">
                        <img src="icon/login/user.svg" class="icon">
                        <input type="text" class="input_text" placeholder="이메일" v-model="email">
                    </div>
                    <div class="input_box">
                        <img src="/icon/login/password.svg" class="icon" >
                        <input type="password" class="input_text" placeholder="비밀번호" v-model="password">
                    </div>
                    <input type="submit" class="login_button" value="로그인" @click="login">
                </form>
                    
                <div class="option" >
                    <img src="/icon/login/checkbox.svg" class="icon_login" v-if="!remain" @click="toggleRemain">
                    <img src="/icon/login/checkbox_on.svg" class="icon_login" v-if="remain" @click="toggleRemain">
                    <p class="option1">로그인 상태 유지</p>
                    <p class="option2" @click="goToSignUp">회원가입</p>
                    <p class="option3" @click="goToForgotPassword">비밀번호를 잊으셨나요?</p>
                </div>
                <div class="line-container" style="width: 346px;">
                    <hr>
                    <span>또는 다음으로 로그인</span>
                    <hr>
                </div>
                <div class="dummy_login1" style="margin-top: 14px;" @click="kakaoLogin">
                    <img src="/icon/login/kakao.svg" class="naver_logo">
                    <div>카카오 로그인</div>
                </div>
                <div class="dummy_login2" style="margin-top: 10px" @click="naverInit">
                    <img src="/icon/login/naver.svg" class="naver_logo">
                    <div>네이버 로그인</div>
                    <div id="naverIdLogin" hidden></div>
                </div>
                <div class="dummy_login3" style="margin-top: 10px; margin-bottom: 80px;" @click="googleLogin">
                    <img src="/icon/login/google.svg" class="naver_logo">
                    <div>구글 로그인</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { firebaseApp } from "../../util/firebase";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default {
    data(){
        return{
            email: null,
            password: null,
            remain: false,
        }
    },
    methods:{
        toggleRemain(){
            this.remain = !this.remain;
        },
        async login(event){
                // 파이어베이스로 먼저 인증을 시작한다.
                event.preventDefault();
                try{
                    const auth = await getAuth(firebaseApp);
                    // 파이어베이스 로그인 함수 (실패하면 에러 발생)
                    await signInWithEmailAndPassword(auth, this.email, this.password);
                    // 서버 쪽에서 계정이 있는지 또 확인하고, 성공하면 DB에 저장된 accessToken을 가져온다.
                    await this.loginEnd("local", this.email);
                }
                catch(err){
                    // 파이어베이스에서 인증 실패 (signInWithEmailAndPassword)할 경우를 위한 catch문이다.
                    alert("일치하는 계정이 없습니다!")
                    console.error(err);
                }
            },

        // 카카오 로그인 실행 함수 -> 로그인 결과로 accessToken을 받아오거나, 회원가입으로 보낸다.
        kakaoLogin(){
            try{
                window.Kakao.Auth.login({
                    scope: 'profile_nickname account_email',
                    success: this.getKakaoAccount,
                });
            }
            catch(err){
                console.error(err);
                alert("에러처리해야됨");
            }
        },
        async getKakaoAccount(){
            let nickname = null;
            let email = null;
            await window.Kakao.API.request({
                url: '/v2/user/me',
                success: res=>{
                    const kakao_account = res.kakao_account;
                    nickname = kakao_account.profile.nickname;
                    email = kakao_account.email;
                },
                fail: error => {
                    console.log(error);
                }
            });
            if (nickname && email){
                await window.Kakao.Auth.logout();
                this.loginEnd("kakao", email);
            }
        },
        async googleLogin(){
            const provider = new GoogleAuthProvider();
            let auth = await getAuth(firebaseApp);
            try{
                await signInWithPopup(auth, provider)
                    .then(async (result)=>{
                        const user = result.user;
                        const email = user.email;
                        await this.loginEnd("google", email);
                    }).catch((error) => {
                        console.error(error);
                    });
            }
            catch(err){
                console.error(err);
                alert("예기치 못한 에러로 로그인이 실패했습니다. 다시 시도해 주세요.")
            }
        },
        async naverInit(){
            try{
                this.naverLogin = new window.naver.LoginWithNaverId({
                    clientId: "FkAYkKQaYKYBZPgPFIhI",
                    callbackUrl: "http://localhost:8080/loginBridge",
                    isPopup: true,
                    loginButton: {
                        color: "green", type: 3, height: 60,
                    },
                });
                this.naverLogin.init();
                window.open("/loginBridge", 'test', 'width=600, height=1000', '_blank');
                window.call = async (email)=>{
                    if(email){
                        await this.loginEnd("naver", email);
                        return;
                    }
                    else{
                        alert("네이버 이메일을 불러오지 못했습니다. 다시 시도해 주세요.");
                        return;
                    }
                }
            }
            catch(err){
                console.error(err);
                alert("네이버가 응답하지 않습니다. 다시 시도해주세요.");
            }
        },
        // 로그인 후처리 공통 로직
        async loginEnd(mode, email){
            try{
                let requestBody = {
                    email: email, 
                    loginType: mode
                }
                const result = await this.$api("/user/login", requestBody, "POST");
                // 소셜 첫 로그인 시 구분
                if (result.status == 300){
                    await this.storeToken(result.accessToken);
                    this.$router.push({
                        name: "profile"
                    });
                    return;
                }
                else if (result.status == 200){
                    await this.storeToken(result.accessToken);
                    console.log(result);
                    if (result.type=="admin"){
                        this.$router.push({name: 'member'});
                    }
                    else{
                        this.$router.push({name: 'MainPage'});
                    }
                    return;
                }
                else{
                    alert("동일한 이메일의 계정이 존재합니다. 다른 이메일을 사용해 주세요");
                    return;
                }
            }
            catch (err){
                throw new Error("");
            }
        },

        // 로그인 마지막 처리
        async storeToken(accessToken){
            this.$cookies.set("meetMeCookie", accessToken);
            if (this.remain){
                await this.$store.commit("user", {accessToken: accessToken});
            }
        },

        goToSignUp(){
            this.$router.push({name:"terms"})
        },
        goToForgotPassword(){
            this.$router.push({name:"forgotpassword"})
        }
    }
}
</script>
<style scoped>
/* div */
    .container0{
        width: 600px;
        display: grid;
        align-content: center;
        /* background-color: #888888; */
        padding: 0px;
     }
     .card_box{
        width: 568px;
        /* height: 605px; */
        display: flex;
        background-color: #FFFFFF;
        border-radius: 18px;
        padding: 0px;

     }
     .title{
        margin-top: 65px;
        font-size: 24px;
        color: #5c09e3;
        text-align: center;
        margin-bottom: 35px;
        padding: 0px;

     }
     .input_box{
        border-radius: 8px;
        border:1px solid #D2D2D2;
        width: 346px;
        height: 48px;
        display: flex;
        align-items: center;
        padding: 0px;
     }
     .input_box input::placeholder{
        color:#9e9e9e;
     }
     .option{
        display: flex;
        /* margin-left: 180px; */
        font-size: 12px;
        justify-content: center;
        padding: 0px;

     }
     .dummy_login1{
        cursor: pointer;
        width: 346px;
        height: 40px;
        border-width: 0px;
        border-radius: 8px;
        background-color: #FFE812;
        color: #232323;
        font-weight: 500;
        font-size: 16px;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .dummy_login2{
        cursor: pointer;
        width: 346px;
        height: 40px;
        border-width: 0px;
        border-radius: 8px;
        background-color: #03C75A;
        color:#FFFFFF;
        font-size: 16px;
        font-weight: 500;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .dummy_login3{
        cursor: pointer;
        width: 346px;
        height: 40px;
        border-width: 0px;
        border-radius: 8px;
        background-color: #F2F2F2;
        color: #232323;
        font-weight: 500;
        font-size: 16px;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    
/* button */
     .login_button{
        margin-top: 20px;
        width: 346px;
        height: 48px;
        font-size: 20px;
        border-width: 0px;
        border-radius: 8px;
        margin-bottom: 8px;
        background-image:var(--gradient);
        color:#FFFFFF;
        font-size: 20px;
        text-align: center;
     }
     
/* img */
     .icon{
        width: 24px;
        height: 24px;
        margin-left: 12px;
        /* margin-top: 12px; */
     }
     .icon_login{
        cursor:pointer;
        width: 18px;
        height: 18px;
        /* margin-right: 5px; */
     }
/* input */
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
     .input_text::value{
        color: #888888;
     }
/* p */
     .option1{
        font-size: 12px;
        margin-left: 5px;
        color: #555555;
     }
     .option2{
        cursor: pointer;
        font-size: 12px;
        margin-left: 43px;
        color: #555555;

     }
     .option3{
        cursor: pointer;
        font-size: 12px;
        margin-left: 33px;
        color: #555555;

     }
     .login_text{
        color:#FFFFFF;
        font-size: 20px;
        text-align: center;
        border: none;
        /* align-items: center; */
        margin-top: 10px;
        margin-bottom: 10px;
        /* display: flex;
        align-items: center; */
     }
     .line-container {
        display: flex;
        align-items: center;
    }
/* hr */
    .line-container hr {
        flex-grow: 1; /* hr 태그가 가능한 공간을 모두 차지하도록 함 */
        border: none;
        height: 1px;
        background-color: #ccc; /* 선의 색상 */
    }
    .line-container span {
        padding: 0 10px; /* 텍스트 주변에 여백을 추가 */
        font-size: 12px;
        color: #AAAAAA;
    }
    .naver_login{
        font-weight: bold;
        border-radius: 5px;
        display:flex;
        justify-content: center;    
        align-items: center;
        width: 220px;
        padding-right:28px;
        height :48px;
        font-size: 15px;
        background: rgb(3, 199, 90);
        color: white;
    }

    .naver_logo{
        margin-right:10px;
    }
</style>