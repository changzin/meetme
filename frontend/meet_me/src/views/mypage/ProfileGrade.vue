<template>
    <div class="safety_zone">
        <div class="container">
            <div class="title">
                프로필 등급
            </div>
            <div class="main_image">
                <div class="image_tab">
                    <div :class="{number2: index == 0, number: index != 0}"></div>
                    <div :class="{number2: index == 1, number: index != 1}"></div>
                    <div :class="{number2: index == 2, number: index != 2}"></div>
                    <div :class="{number2: index == 3, number: index != 3}"></div>
                    <div :class="{number2: index == 4, number: index != 4}"></div>
                    <div :class="{number2: index == 5, number: index != 5}"></div>
                </div>
                <div class="prev_button" @click="count(-1)">
                </div>
                <div class="next_button" @click="count(1)">
                </div>
                <img :src="this.$imageFileFormat(userImage[index])" @click="count(1)">  
            </div>
            <div class="profile_info">
                <div class="introduce">
                    <div class="grade">
                        현재 등급 : {{userData.user_grade_value}}
                    </div>
                    <div class="notice">
                        회원님의 매력을 측정해 더 높은 점수에 도전해보세요.
                    </div>
                </div>
            </div>
            <div class="class_button" @click="makeReGrade">
                <span class="class">새로 측정하기</span>
            </div>
        </div>
        <MeetHeader />
    </div>
</template>
<script>
export default {	
    data() {
        return {
            sampleData : '',
            userImage : [],
            index: 0,
            userData: {}
        };
        
    },
    beforeCreate() {},
    async created() {
        this.getUser();
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    methods: {
        count(cnt){
            this.index += cnt;
            if(this.index == 6){
                return this.index = 0;
            }else if(this.index < 0) {
                return this.index = 5;
            }
        },
        async getUser() {
            try{
                const result = await this.$api(`/user/profileinfo`, {access_token: this.$getAccessToken()}, "POST");
                this.userData = result.user;
                this.userImage = this.userData.user_image_paths;
                console.log(this.userData)
                console.log(this.userImage)
            }catch(err){
                console.log(err);
            }
        },
        async makeReGrade(){
            try{
                const result = await this.$api('/user/regrade', {access_token: this.$getAccessToken()}, "POST");
                if (result.status == 200){
                    await this.getUser();
                    alert("재측정 완료되었습니다.")
                }
                else{
                    alert("재측정에 실패하였습니다. 다시 시도해 주세요.");
                }
            }
            catch(err){
                alert("재측정에 실패하였습니다. 다시 시도해 주세요.");
                console.log(err);
            }
        }
    }
}
</script>
<style scoped>
.container {
    min-width: 600px;
    padding: 0 15px 0 15px;
    justify-content: center;
}

.title {
    font-size: 24px;
    font-weight: 700;
    padding: 30px 0 15px 0;
    margin: 0;
}

.main_image{
    width: 568px;
    min-width: 568px;
    height: 700px;
    display: flex;
    padding: 0 8px 0 8px;
    border-radius: 10px;
    position: relative;
}

.image_tab {
    margin-top: 5px;
    width: 150px;
    height: 18px;
    background-color: rgba(183, 67, 67, 0);
    border-radius: 100px;
    position: absolute;
    display: flex;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 3;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
}

.number {
    width: 20px;
    height: 2px;
    border-radius: 100px;
    background-color: slategrey;
    display: flex;
    justify-content: space-between;
}

.number2 {
    width: 20px;
    height: 2px;
    border-radius: 100px;
    background-color: rgb(252, 252, 252);
    display: flex;
    justify-content: space-between;
}

img{
    min-width: 540px;
    width: 568px;
    height: 700px;
    display: block;
    margin: 0 8px 0 8px;
    object-fit: cover;
    border-radius: 10px;
}

.prev_button {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 50%;
    height: 100%;
}

.next_button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    width: 50%;
    height: 100%;
}

.profile_info {
    margin: 15px;
}

.introduce {
    border-radius: 10px;
    background-color: #F1EFF6;
    text-align: left;
    margin: 0 auto;
    height: 106px;
    padding: 20px;
}

.grade {

    font-weight: 500;

}

.notice {

    font-size: 14px;
    color: #9D88B3;
    padding-top: 20px;

}

.class_button {
    border-radius: 10px;
    width: 540px;
    height: 60px;
    margin: 0 auto;
    background-image: linear-gradient(to right,#497af5 ,#884afb);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.class {
    color: #F1EFF6;
}

</style>