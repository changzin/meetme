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
            <button type="button" class="loginbutton" style="margin-bottom: 324px;">
                이메일 인증 후 프로필 등록하기
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

</style> 