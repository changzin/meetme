<template>
    <div class="container container0">
        <div class="row justify-content-center">
            <div class="cardbox row justify-content-center">
                <div class="title">
                    회원가입
                </div>
                <p class="subtext">회원가입 전, Meet Me 약관들을 확인해주세요</p>
                <div class="subtitle">
                    <div class="subtitletext col-9">전체동의</div>
                    <button class="checkbox" @click="toggleallcheck()">
                        <img src="/icon/signup/checkbox.svg" class="check" v-if="!ischeck">
                        <img src="/icon/signup/checkbox_on.svg" class="check" v-if="ischeck">
                    </button>
                </div>
                <hr class="subline">
                <div class="termsbox" style="margin-bottom: 28px;">
                    <div class="termstext">
                        필수
                    </div>
                    <div class="clausetext">
                        이용약관 동의
                    </div>
                    <img class="termsicon" src="/icon/signup/i.svg" >
                    <button class="termscheckbox" @click="toggletermscheck()">
                        <img src="/icon/signup/checkbox.svg" class="termscheck" v-if="!istermscheck">
                        <img src="/icon/signup/checkbox_on.svg" class="termscheck" v-if="istermscheck">
                    </button>
                </div>
                <div class="termsbox" style="margin-bottom: 28px;">
                    <div class="termstext">
                        필수
                    </div>
                    <div class="clausetext">
                        개인정보 수집 및 이용 동의
                    </div>
                    <img src="/icon/signup/i.svg" class="termsicon">
                    <button class="termscheckbox" @click="toggletermscheck()">
                        <img src="/icon/signup/checkbox.svg" class="termscheck" v-if="!istermscheck">
                        <img src="/icon/signup/checkbox_on.svg" class="termscheck" v-if="istermscheck">
                    </button>
                </div>
                <div class="termsbox" style="margin-bottom: 28px;">
                    <div class="termstext">
                        선택
                    </div>
                    <div class="clausetext">
                        위치기반 서비스 약관 동의
                    </div>
                    <img src="/icon/signup/i.svg" class="termsicon">
                    <button class="termscheckbox" @click="toggletermscheck()">
                        <img src="/icon/signup/checkbox.svg" class="termscheck" v-if="!istermscheck">
                        <img src="/icon/signup/checkbox_on.svg" class="termscheck" v-if="istermscheck">
                    </button>
                </div>
                <div class="termsbox" style="margin-bottom: 28px;">
                    <div class="termstext">
                        선택
                    </div>
                    <div class="clausetext">
                        종교정보 수집 동의
                    </div>
                    <img src="/icon/signup/i.svg" class="termsicon">
                    <button class="termscheckbox" @click="toggletermscheck()">
                        <img src="/icon/signup/checkbox.svg" class="termscheck" v-if="!istermscheck">
                        <img src="/icon/signup/checkbox_on.svg" class="termscheck" v-if="istermscheck">
                    </button>
                </div>

                <button type="button" class="loginbutton" style="margin-bottom: 275px;">
                    동의하고 다음 단계로 진행하기
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            ischeck: false,
            istermscheck: false,
        }
    },
    methods:{
        toggleallcheck(){
            this.ischeck = !this.ischeck;
        },
        toggletermscheck(){
            this.istermscheck = !this.istermscheck;
        }
    }
}
</script>

      

<style>
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
    color: #5c09e3;
    text-align: center;
    margin-bottom: 5px;
}

.subtitle {
    margin-top: 46px;
    margin-left: 0;
    display: flex;
    align-items: center;
    padding: 0;
}

.subtitletext {
    margin-left: 30px;
    text-align: start;
    font-size: 20px;
    padding: 0;
}

.checkbox {
    width: 400px;
    margin-left: 30px;
    margin-right: 30px;
    border: none;
    background: none;
}

.check {
    margin-left: 10px;
    width: 24px;
    height: 24px;
}

.termsbox {
    margin-left: 40px;
    height: 24px;
    display: flex;
    padding: 0;
}

.clausetext {
    text-align: start;
    font-size: 16px;
    color: #111111;
    margin-left: 35px;
    width: 200px;
}

.termstext {
    margin-left: 10px;
    width: 30px;
    font-size: 16px;
    color: var(--purple_main);
}

.termsicon {
    width: 18px;
    height: 18px;
    margin-top: 2px;
}

.loginbutton {
    color: #FFFFFF;
    margin-top: 20px;
    width: 346px;
    height: 48px;
    font-size: 20px;
    border-width: 0;
    border-radius: 8px;
    margin-bottom: 8px;
}

.subtext {
    font-size: 12px;
    margin-left: 5px;
    text-align: center;
}

.subline {
    margin-top: 20px;
    width: 508px;
    color: #e0e0e0;
}

.termscheckbox{
    margin-left: auto;
    width: 24px;
    height: 24px;
    margin-right: 60px;
    border: none;
    background: none;
}
.termscheck {
    margin-left: auto;
    width: 24px;
    height: 24px;
    margin-right: 60px;
    border: none;
    background: none;
}
</style>