<template>
    <div class="safety_zone">
        <div class="container">
            <div class="main_title">프로필 상세보기</div>
        </div>

        <div class="main_image">
            <div class="image_tab">
                <div v-for="(item, i) in userImg.length" :key="i" :class="{number2: index == i, number: index != i}"></div>
            </div>
                <div class="prev_button" @click="count(-1)">
                </div>
                <div class="next_button" @click="count(1)">
                </div>
                <img :src="this.$imageFileFormat(userImg[index])" @click="count(1)">
                <div class="report">
                    <img src="/icon/main_recommend/report.svg" @click="this.$router.push({ name:'SelectModal'})" class="icon_report" >
                </div>
                <div class="block">
                    <img src="/icon/main_recommend/block.svg" @click="this.$router.push({ name:'SelectModal'})" class="icon_block">
                </div>
        </div>
        <div class="user_name" >
            {{userData.user_nickname}},{{ userData.user_age }}
        </div>
        <div class="region">
            {{ userData.user_add }}
        </div>
        <div class="profile_box">
            <div class="profile">{{ userData.user_introduction }}</div>
        </div>
        <div class="information_title">
            기본 정보
        </div>
        <div class="information_box">
            <div class="information">{{ userData.user_height}}</div>
            <div class="information_A">{{ userData.user_weight}}</div>
            <div class="information_B">{{ userData.user_mbti_value }}</div>
            <div class="information_C">{{ userData.user_religion_value }}</div>
            <div class="information_D" v-if="(userData.user_smoke) === 'T'">흡연</div>
            <div class="information_D" v-if="(userData.user_smoke) === 'F'">비흡연</div>
            <div class="information_E" v-if="(userData.user_tartoo) === 'T'">문신있음</div>
            <div class="information_E" v-if="(userData.user_tartoo) === 'F'">문신없음</div>
        </div>
        <div class="point">
            특징
        </div>
        <div v-if="userFeature.length > 0">
        <div class="point_box" >
            <div class="point_box_A" v-for="(feature, i) in userFeature" :key="i">{{feature}}</div>
            
        </div>
    </div>
</div>
    <MeetHeader />
</template>
<script>

export default {	
    data() {
        return {
            userImg : [],
            sampleData : '',
            index: 0,
            userData: {},
            user_feature_ids: [],
            userFeature: [],

        };
    },
    beforeCreate() {},
    async created() {
        await this.userList();
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
            if(this.index == this.userImg.length){
                return this.index = 0;
            }else if(this.index < 0) {
                return this.index = this.userImg.length-1;
            }
        },
        async userList(){
            try{
                let user_id2 = this.$route.query.data
                user_id2 = this.$decrypt(user_id2)

                const result = await this.$api(`/user/profiledetail` , {access_token: this.$getAccessToken() , user_id2} , "POST");
                this.userData = result.user;
                this.userImg = this.userData.user_image_paths;
                this.userFeature = this.userData.user_feature_ids
            }catch(err){
                console.log(err);
            }
            
        }
    }
}
</script>

<style scoped>
.main_title{
    font-size: 24px;
    padding: 30px 220px 23px 220px;
    margin: auto;
    text-align: center;
    white-space: nowrap;
    font-weight: bold;
}
.main_image{
    width: 540px;
    min-width: 540px;
    display: flex;
    padding: 0 30px 0 30px;
    border-radius: 10px;
    position: relative;
}
.main_image > img{
    width: 540px;
    min-width: 540px;
    height: 500px;
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
    z-index: 1;
}

.next_button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    width: 50%;
    height: 100%;
    z-index: 1;
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
    margin-left: 34px;
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
.user_name{
    font-size: 24px;
    text-align: left;
    margin: 20px 0 0 30px;
    font-weight: bold;
}
.region{
    font-size: 16px;
    text-align: left;
    margin: 10px 0 0 30px;
    font-weight: bold;
}
.profile_box{
    padding: 20px;
    font-size: 16px;
    width: 540px;
    border-radius: 10px;
    margin: 30px 30px 30px 30px;
    display: flex;
    align-items: center;
    background-color: #F1EFF6;
    justify-content: flex-start;
}
.profile_box .profile{
    word-break: break-all;
}
.information_title{
    font-size: 16px;
    text-align: left;
    margin: 20px 0 10px 30px;
    font-weight: bold;
}
.information_box{
    width: 500px;
    height: 142px;
    text-align: left;
    color: #555555;
    font-size: 14px;
    margin: 10px 20px 0 30px;
    position: relative;
}
.information_box .information{
    position: absolute;
}
.information_box .information_A{
    position: absolute;
    /*padding-left: 199px;*/
    left: 199px;
}
.information_box .information_B{
    position: absolute;
    top: 49px;
}
.information_box .information_C{
    position: absolute;
    top: 48px;
    left: 199px;
}
.information_box .information_D{
    position: absolute;
    top: 97px;
}
.information_box .information_E{
    position: absolute;
    top: 97px;
    left: 199px;
}
.point{
    font-size: 16px;
    text-align: left;
    padding: 0 0 10px 30px;
    font-weight: bold;
}
/*.point_box{
    width: 570px;
    height: 100px;
    margin-top: 12px;
    margin-left: 27px;
}
.point_box .point_box_A{
    text-align: left;
    border: #64BAAA 1px;
}*/
.point_box {
    display: flex;
    gap: 5px;
    margin-top: 12px;
    margin-left: 27px;
    flex-wrap: wrap;
  }
  
  
  .point_box_A {
    border-radius: 8px;
    border: 1px solid #64BAAA;
    background-color: white;
    color: #64BAAA;
    padding: 10px 20px 10px 20px;
    font-size: 14px;
}
.report{
    position: absolute;
    left: 491px;
    z-index: 2;
    top: 10px;
  }

  .icon_report:hover {
    cursor: pointer;
  }
  .block{
    position: absolute;
    left: 529px;
    z-index: 2;
    top: 10px;
  }

</style>