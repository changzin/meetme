<template>
    <div class="container container0">
        <div class="row justify-content-center">
            <div class="cardbox row justify-content-center">
            <div class="title">
                정보입력
            </div>
            <p class="subtext">회원가입에 필요한 최소한의 정보를 입력해주세요!</p>
            <div class="box">
                <div class="subtitle">
                    이메일
                </div>
                <div class="inputbox" style="margin-bottom: 20px;">
                    <img src="icon/login/user.svg" class="icon">
                    <input type="text" class="inputtext" placeholder="이메일">
                </div>
            </div>
            <div class="box">
                <div class="subtitle">
                    비밀번호
                </div>
                <div class="inputbox" style="margin-bottom: 20px;">
                    <img src="/icon/login/password.svg" class="icon">
                    <input type="text" class="inputtext" placeholder="비밀번호">
                </div>
            </div>
            <div class="box">
                <div class="subtitle">
                    비밀번호 확인
                </div>
                <div class="inputbox" style="margin-bottom: 20px;">
                    <img src="/icon/login/password.svg" class="icon">
                    <input type="text" class="inputtext" placeholder="비밀번호 확인">
                </div>
            </div>
            <button type="button" class="loginbutton" style="margin-bottom: 324px;">
                이메일 인증하러 가기
            </button>
        </div>
    </div>
</div>

</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
       
    }
}
</script>

      

<style scoped>
    .container0 {
    width: 600px;
    border: 1px solid red;
    display: grid;
    align-content: center;
    background-color: #888888;
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
        margin-bottom: 5px;
        font-weight: bold;
    }
    .box{
        display: flex;
        align-items: center;
        padding: 0px;
    }
    .subtitle{
        margin-top: 0px;
        margin-bottom: 30px;
        font-weight: 500px;
        font-size: 16px;
        margin-left: 30px;
        width: 100px;
        
    }
    .subtext{
        margin-top: 5px;
        margin-bottom: 44px;
        font-size: 16px;
        font-weight: 500px;

    }
    .inputbox{
            border-radius: 8px;
            border:1px solid #D2D2D2;
            width: 380px;
            height: 48px;
            display: flex;
            align-items: center;
            padding: 0px;
            margin-left: 36px;
        }
    .inputbox input::placeholder{
        color:#9e9e9e;
    }

</style> 