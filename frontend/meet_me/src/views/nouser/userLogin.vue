<template>
<div class="container container0">
        <div class="row justify-content-center">
            <div class="cardbox row justify-content-center">
                <div class="title">
                    MEET ME
                </div>
                <div class="inputbox" style="margin-bottom: 20px;">
                        <img src="icon/login/user.svg" class="icon">
                        <input type="text" class="inputtext" placeholder="이메일">
                </div>
                <div class="inputbox">
                    <img src="/icon/login/password.svg" class="icon" >
                    <input type="text" class="inputtext" placeholder="비밀번호">
                </div>
                <button type="button" class="loginbutton">
                    <p class="logintext">로그인</p> 
                </button>
                <div class="option" >
                    <img src="/icon/login/checkbox.svg" class="icon_login" >
                    <img src="/icon/login/checkbox_on.svg" class="icon_login">
                    <p class="option1">로그인 상태 유지</p>
                    <p class="option2">회원가입</p>
                    <p class="option3">비밀번호를 잊으셨나요?</p>
                </div>
                <div class="line-container" style="width: 346px;">
                    <hr>
                    <span>또는 다음으로 로그인</span>
                    <hr>
                </div>
                <div class="dummylogin1" style="margin-top: 14px;">
                    카카오로그인
                </div>
                <div class="dummylogin2" style="margin-top: 10px">
                    네이버로그인
                </div>
                <div class="dummylogin3" style="margin-top: 10px;" >
                    구글로그인
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>
<style >
/* div */
    .container0{
        width: 600px;
        /* height: 879px; */
        /* margin:0 auto;  */
        border:1px solid red;
        display: grid;
        align-content: center;
        /* background-color: #888888; */
        padding: 0px;
     }
     .cardbox{
        margin-top: 30px;
        margin-bottom: 80px;
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
     .inputbox{
        border-radius: 8px;
        border:1px solid #D2D2D2;
        width: 346px;
        height: 48px;
        display: flex;
        align-items: center;
        padding: 0px;
     }
     .inputbox input::placeholder{
        color:#9e9e9e;
     }
     .option{
        display: flex;
        /* margin-left: 180px; */
        font-size: 12px;
        justify-content: center;
        padding: 0px;

     }
     .dummylogin1{
        display: flex;
        align-items: center;
        width: 346px;
        height: 40px;
        border: 1px solid black;
    }
    .dummylogin2{
        margin-top: 10px;
        display: flex;
        align-items: center;
        width: 346px;
        height: 40px;
        border: 1px solid black;
    }
    .dummylogin3{
        display: flex;
        align-items: center;
        width: 346px;
        height: 40px;
        border: 1px solid black;
        margin-bottom: 80px;
    }
/* button */
     .loginbutton{
        margin-top: 20px;
        width: 346px;
        height: 48px;
        font-size: 20px;
        border-width: 0px;
        border-radius: 8px;
        margin-bottom: 8px;
        background-image: linear-gradient(to right,#497af5 ,#884afb);
     }
     
/* img */
     .icon{
        width: 24px;
        height: 24px;
        margin-left: 12px;
        /* margin-top: 12px; */
     }
     .icon_login{
        width: 18px;
        height: 18px;
        /* margin-right: 5px; */
     }
/* input */
     .inputtext{
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
     .inputtext::value{
        color: #888888;
     }
/* p */
     .option1{
        font-size: 12px;
        margin-left: 5px;
        color: #555555;
     }
     .option2{
        font-size: 12px;
        margin-left: 43px;
        color: #555555;

     }
     .option3{
        font-size: 12px;
        margin-left: 33px;
        color: #555555;

     }
     .logintext{
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
    
</style>