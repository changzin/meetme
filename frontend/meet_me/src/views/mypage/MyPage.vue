<template>
    <div class="safety_zone">
        <div class="container">
            <div class="mypage_container" v-if="userData">
                <div class="profile_box">
                    <img class="mini_profile" :src="userData.user_image_path ? this.$imageFileFormat(userData.user_image_path) : '/model.jpg'">
                    <div class="name_title">
                        <div class="name">
                            {{userData.user_nickname}}
                        </div>
                        <div class="live">
                            {{userData.user_add}}
                        </div>
                    </div>
                    <div class="button">
                        <button class="edit" @click="this.$router.push({name: 'MyPageEdit'})">
                            <img src="/icon/mypage/main/edit.svg">
                        </button>
                    </div>
                </div>
                <div class="mypage_box">
                    <div class="mypage_button" @click="this.$router.push({name: 'ProfileGrade'})">
                        <img class="button_icon" src="/icon/mypage/main/user.svg">
                        <div class="button_icon">
                            프로필 등급
                        </div>
                        <div class="user_grade">
                            {{userData.user_grade_value}}
                        </div>
                    </div>
                    <div class="mypage_button" @click="this.$router.push({name: 'mypagestore'})">
                        <img class="button_icon" src="/icon/mypage/main/store.svg">
                        <div class="button_icon">
                            스토어
                        </div>
                    </div>
                    <div class="mypage_button" @click="this.$router.push({name: 'SendHeart'})">
                        <img class="button_icon" src="/icon/mypage/main/heart.svg">
                        <div class="button_icon">
                            보낸 좋아요
                        </div>
                    </div>
                    <div class="mypage_button" @click="this.$router.push({name: 'Qna'})">
                        <img class="button_icon" src="/icon/mypage/main/letter.svg">
                        <div class="button_icon">
                            자주 묻는 질문
                        </div>
                    </div>
                    <div class="mypage_button" @click="this.$router.push({name: 'SendStory'})">
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
                    <div class="mypage_button" @click='logout'>
                        <img class="button_icon" src="/icon/admin/blackout.svg" width="56">
                        <div class="button_icon">
                            로그아웃
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MeetHeader />
    </div>
</template>
<script>
export default {	
    data() {
        return {
            userData: {},
            profile: {},
        };
    },
    async created() {
        await this.getUser();
    },
    methods: {
        async getUser() {
            try{
                const result = await this.$api(`/user/mypageprofile`, {access_token: this.$getAccessToken()}, "POST");
                this.userData = result.user;
                
                console.log(this.userData)
            }catch(err){
                console.log(err);
            }
        },
        logout(){
            alert("로그아웃하였습니다.")
            this.$cookies.remove("meetMeCookie")
            this.$store.commit("user", null);            
            this.$router.push({name: "loginuser"})
        }
    }

}
</script>

<style scoped>

.container {
    min-width: 600px;
    padding: 0 16px 0 16px;
}

.mypage_container {
    padding-top: 80px;
} 

.profile_box {
    height: 130px;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.23);
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
    object-fit: cover;
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
    background-color: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.23);
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 15px;
}

.mypage_button {
    height: 63px;
    align-items: center;
    display: flex;
    cursor: pointer;
    background-color: #ffffff;
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