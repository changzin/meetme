<template>
<div class="container container0">
        <div class="row justify-content-center">
            <div class="cardbox row justify-content-center">
                <div class="title">
                    MEET ME
                </div>
                <div class="inputbox" style="margin-bottom: 20px;">
                        <img src="/user.svg" class="icon">
                        <input type="text" class="logintext" value="이메일">
                </div>
                <div class="inputbox">
                    <img src="/user.svg" class="icon">
                    <input type="text" class="logintext" value="비밀번호">
                </div>
                <button type="button" class="loginbutton">
                    로그인
                </button>
                <div class="option">
                    <img src="/user.svg">
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
                    카카오로그인
                </div>
                <div class="dummylogin3" style="margin-top: 10px;" >
                    카카오로그인
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {

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
        background-color: #888888;
     }
     .cardbox{
        margin-top: 30px;
        margin-bottom: 80px;
        width: 568px;
        /* height: 605px; */
        display: flex;
        background-color: #FFFFFF;
        border-radius: 18px;
     }
     .title{
        margin-top: 65px;
        font-size: 24px;
        color: #5c09e3;
        text-align: center;
        margin-bottom: 35px;
     }
     .inputbox{
        border-radius: 8px;
        border:1px solid #D2D2D2;
        width: 346px;
        height: 48px;
        display: flex;
        align-items: center;
     }
     .option{
        display: flex;
        margin-left: 180px;
        font-size: 12px;
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
     }
     
/* img */
     .icon{
        width: 24px;
        height: 24px;
        margin-left: 12px;
        /* margin-top: 12px; */
     }
/* input */
     .logintext{
        font-size: 14px;
        margin-left: 4px;
        /* margin-top: 10px; */
        border-width: 0px;
        border:none;
     }
/* p */
     .option1{
        font-size: 12px;
        margin-left: 5px;
     }
     .option2{
        font-size: 12px;
        margin-left: 43px;
     }
     .option3{
        font-size: 12px;
        margin-left: 43px;
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
    }
    
</style>