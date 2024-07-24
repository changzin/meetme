<template>
    <div class="container">
        <div class="safe_zone">
            <div class="mypage_container">
                <div class="profile_box">
                    <img class="mini_profile" src="/model.jpg">
                    <div class="name_title">
                        <div class="name">
                            원영이의 닉네임
                        </div>
                        <div class="live">
                            도봉구
                        </div>
                    </div>
                    <div class="button">
                        <button class="edit">
                            <a href="/">
                            <img src="/icon/mypage/main/edit.svg">
                            </a>
                        </button>
                    </div>
                </div>
                <div class="mypage_box">
                    <div class="mypage_button">
                        <img class="button_icon" src="/icon/mypage/main/user.svg">
                        <div class="button_icon">
                            프로필 등급
                        </div>
                        <div class="user_grade">
                            다이아몬드
                        </div>
                    </div>
                    <div class="mypage_button">
                        <img class="button_icon" src="/icon/mypage/main/store.svg">
                        <div class="button_icon">
                            스토어
                        </div>
                    </div>
                    <div class="mypage_button">
                        <img class="button_icon" src="/icon/mypage/main/heart.svg">
                        <div class="button_icon">
                            보낸 좋아요
                        </div>
                    </div>
                    <div class="mypage_button">
                        <img class="button_icon" src="/icon/mypage/main/letter.svg">
                        <div class="button_icon">
                            자주 묻는 질문
                        </div>
                    </div>
                    <div class="mypage_button">
                        <img class="button_icon" src="/icon/mypage/main/qna.svg">
                        <div class="button_icon">
                            밋미 사연 보내기
                        </div>
                    </div>
                    <div class="mypage_button">
                        <img class="button_icon" src="/icon/mypage/main/warning.svg">
                        <div class="button_icon">
                            회원탈퇴
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {	
    components:{},
    data() {
        return {
            sampleData : ''
        };
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    methods: {}
}
</script>

<style scoped>

.container {
    width: 600px;
    margin: 0 auto;
    justify-content: center;
    box-sizing: border-box;
}

.safe_zone {
    padding: 0 16px 0 16px;
    margin: 0 12px 0 12px;

}

.mypage_container {
    padding-top: 80px;
}

.profile_box {
    height: 130px;
    background-color: FFFFFF;
    box-shadow: 0px 0px 10px;
    border-radius: 10px;
    display: flex;
    margin-bottom: 20px;
}

.mini_profile {
    width: 90px;
    height: 90px;
    border-radius: 100px;
    margin: 20px;
    justify-content: start;
}

.name_title {
    padding: 40px 0 40px 0;
    text-align: start;
}

.name {
    font-weight: 500;
}

.live {
    color: #9D88B3;
}

.button {
    display: flex;
    padding-right: 20px;
    margin-left: auto;
    justify-content: end;
    align-items: center;
}

.edit {
    background-color: #ffffff;
    border: 1px solid #ffffff;
    cursor: pointer;
}

.mypage_box {
    background-color: FFFFFF;
    box-shadow: 0px 0px 10px;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 15px;
}

.mypage_button {
    height: 63px;
    align-items: center;
    display: flex;
    cursor: pointer;
}

.button_icon {
    padding: 15px;
    display: flex;
}

.user_grade {
    margin-left: auto;
    padding-right: 15px;
    font-size: 14px;
    color: #9D88B3;
}





</style>