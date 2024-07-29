<template>
    <div class="container container0">
        <div class="row justify-content-center">
            <div class="card_box row justify-content-center">
                <div class="title">
                    회원가입
                </div>
                <p class="sub_text">회원가입 전, Meet Me 약관들을 확인해주세요</p>
                <div class="sub_title">
                    <div class="sub_title_text col-9">전체동의</div>
                    <button class="check_box" @click="toggleallcheck()">
                        <img src="/icon/signup/checkbox.svg" class="check" v-if="!ischeck">
                        <img src="/icon/signup/checkbox_on.svg" class="check" v-if="ischeck">
                    </button>
                </div>
                <hr class="sub_line">
                <div class="terms_box" style="margin-bottom: 28px;">
                    <div class="terms_text">
                        필수
                    </div>
                    <div class="clause_text">
                        이용약관 동의
                    </div>
                    <img class="terms_icon" src="/icon/signup/i.svg" >
                    <button class="terms_check_box" @click="toggletermscheck()">
                        <img src="/icon/signup/checkbox.svg" class="terms_check" v-if="!istermscheck">
                        <img src="/icon/signup/checkbox_on.svg" class="terms_check" v-if="istermscheck">
                    </button>
                </div>
                <div class="terms_box" style="margin-bottom: 28px;">
                    <div class="terms_text">
                        필수
                    </div>
                    <div class="clause_text">
                        개인정보 수집 및 이용 동의
                    </div>
                    <img src="/icon/signup/i.svg" class="terms_icon">
                    <button class="terms_check_box" @click="toggletermscheck()">
                        <img src="/icon/signup/checkbox.svg" class="terms_check" v-if="!istermscheck">
                        <img src="/icon/signup/checkbox_on.svg" class="terms_check" v-if="istermscheck">
                    </button>
                </div>
                <div class="terms_box" style="margin-bottom: 28px;">
                    <div class="terms_text">
                        선택
                    </div>
                    <div class="clause_text">
                        위치기반 서비스 약관 동의
                    </div>
                    <img src="/icon/signup/i.svg" class="terms_icon">
                    <button class="terms_check_box" @click="toggletermscheck()">
                        <img src="/icon/signup/checkbox.svg" class="terms_check" v-if="!istermscheck">
                        <img src="/icon/signup/checkbox_on.svg" class="terms_check" v-if="istermscheck">
                    </button>
                </div>
                <div class="terms_box" style="margin-bottom: 28px;">
                    <div class="terms_text">
                        선택
                    </div>
                    <div class="clause_text">
                        종교정보 수집 동의
                    </div>
                    <img src="/icon/signup/i.svg" class="terms_icon">
                    <button class="terms_check_box" @click="toggletermscheck()">
                        <img src="/icon/signup/checkbox.svg" class="terms_check" v-if="!istermscheck">
                        <img src="/icon/signup/checkbox_on.svg" class="terms_check" v-if="istermscheck">
                    </button>
                </div>

                <button type="button" class="next_button" style="margin-bottom: 275px;">
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
    color: #5c09e3;
    text-align: center;
    margin-bottom: 5px;
}

.sub_title {
    margin-top: 46px;
    margin-left: 0;
    display: flex;
    align-items: center;
    padding: 0;
}

.sub_title_text {
    margin-left: 30px;
    text-align: start;
    font-size: 20px;
    padding: 0;
}

.check_box {
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

.terms_box {
    margin-left: 40px;
    height: 24px;
    display: flex;
    padding: 0;
}

.clause_text {
    text-align: start;
    font-size: 16px;
    color: #111111;
    margin-left: 35px;
    width: 200px;
}

.terms_text {
    margin-left: 10px;
    width: 30px;
    font-size: 16px;
    color: var(--purple_main);
}

.terms_icon {
    width: 18px;
    height: 18px;
    margin-top: 2px;
}

.next_button {
    color: #FFFFFF;
    background-image: var(--gradient);
    margin-top: 20px;
    width: 508px;
    height: 60px;
    font-size: 20px;
    border-width: 0;
    border-radius: 8px;
}

.subtext {
    font-size: 12px;
    margin-left: 5px;
    text-align: center;
}

.sub_line {
    margin-top: 20px;
    width: 508px;
    color: #e0e0e0;
}

.terms_check_box{
    margin-left: auto;
    width: 24px;
    height: 24px;
    margin-right: 60px;
    border: none;
    background: none;
}
.terms_check {
    margin-left: auto;
    width: 24px;
    height: 24px;
    margin-right: 60px;
    border: none;
    background: none;
}
</style>