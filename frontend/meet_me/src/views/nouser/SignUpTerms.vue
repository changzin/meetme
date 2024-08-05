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
                        <img src="/icon/signup/checkbox.svg" class="check" v-if="!isAllChecked">
                        <img src="/icon/signup/checkbox_on.svg" class="check" v-if="isAllChecked">
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
                    <button class="terms_check_box" @click="toggleEssentialTermscheck(0)">
                        <img src="/icon/signup/checkbox.svg" class="terms_check" v-if="!essentialTerms[0]">
                        <img src="/icon/signup/checkbox_on.svg" class="terms_check" v-if="essentialTerms[0]">
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
                    <button class="terms_check_box" @click="toggleEssentialTermscheck(1)">
                        <img src="/icon/signup/checkbox.svg" class="terms_check" v-if="!essentialTerms[1]">
                        <img src="/icon/signup/checkbox_on.svg" class="terms_check" v-if="essentialTerms[1]">
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
                    <button class="terms_check_box" @click="toggleInEssentialTermscheck(0)">
                        <img src="/icon/signup/checkbox.svg" class="terms_check" v-if="!inEssentialTerms[0]">
                        <img src="/icon/signup/checkbox_on.svg" class="terms_check" v-if="inEssentialTerms[0]">
                    </button>
                </div>
                <div class="terms_box" style="margin-bottom: 28px;">
                    <div class="terms_text">
                        선택
                    </div>
                    <div class="clause_text">
                        카메라 접근 허가
                    </div>
                    <img src="/icon/signup/i.svg" class="terms_icon">
                    <button class="terms_check_box" @click="toggleInEssentialTermscheck(1)">
                        <img src="/icon/signup/checkbox.svg" class="terms_check" v-if="!inEssentialTerms[1]">
                        <img src="/icon/signup/checkbox_on.svg" class="terms_check" v-if="inEssentialTerms[1]">
                    </button>
                </div>

                <input type="submit" class="next_button" style="margin-bottom: 275px;" value="동의하고 다음 단계로 진행하기" @click="goToSignUp">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isAllChecked: false,
            essentialTerms:[false, false],
            inEssentialTerms: [false, false],
        }
    },
    methods:{
        toggleallcheck(){
            if (!this.isAllChecked){
                for(let i in this.essentialTerms){
                    this.essentialTerms[i] = true;
                }
                for(let i in this.inEssentialTerms){
                    this.inEssentialTerms[i] = true;
                }
                this.isAllChecked = true;
            }
            else{
                for(let i in this.essentialTerms){
                    this.essentialTerms[i] = false;
                }
                for(let i in this.inEssentialTerms){
                    this.inEssentialTerms[i] = false;
                }
                this.isAllChecked = false;
            }
        },
        toggleEssentialTermscheck(input){
            this.essentialTerms[input] = !this.essentialTerms[input];
            if(this.checkAllTermsChecked()){
                this.isAllChecked = true;
            }
            else{
                this.isAllChecked = false;
            }
        },
        toggleInEssentialTermscheck(input){
            this.inEssentialTerms[input] = !this.inEssentialTerms[input];
            if(this.checkAllTermsChecked()){
                this.isAllChecked = true;
            }
            else{
                this.isAllChecked = false;
            }
        },
        checkAllTermsChecked(){
            let checked = true;
            for(let i of this.essentialTerms){
                if (!i){
                    checked = false;
                }
            }
            for(let i of this.inEssentialTerms){
                if (!i){
                    checked = false;
                }
            }
            return checked;
        },
        goToSignUp(){
            try{
                let checked = true;
                for(let i of this.essentialTerms){
                    if (!i){
                        checked = false;
                    }
                }
                if (checked){
                    this.$router.push({name: "signup"});
                }
                else{
                    alert("필수 동의사항에 동의하셔야 회원가입을 진행할 수 있습니다.");
                }
            }
            catch(err){
                console.error(err);
            }
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