<template>
    <div class="safety_zone">
        <div class="container">
            <div class="title">
                오늘의 추천
                <img class="title_img" src="/icon/main_recommend/fier.svg">
            </div>
            <div v-if="results.length>0">
                <div class="main_image next_img" v-for="(user,i) in results" :key="i">
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
                    <img :src="user_image[index]" @click="count(1)">
                    <div class="name" @click="this.$router.push({ name:'ProfileDetail'})">
                        {{user.user_nickname}} , {{ user.user_age }}
                    </div>
                    <div class="category">
                        <div class="category_A" v-if="user.user_feature_value[0]">{{user.user_feature_value[0]}}
                            
                        </div>
                        <div class="category_B" v-if="user.user_feature_value[1]">{{user.user_feature_value[1]}}
                        </div>
                        <div class="category_C" v-if="user.user_feature_value[2]">{{user.user_feature_value[2]}}
                        </div>
                        <div class="category_D" v-if="user.user_feature_value[3]">{{user.user_feature_value[3]}}
                        </div>
                    </div>
                    <div class="action_btn_container">
                        <div>
                            <img src="/icon/main_recommend/airplane.svg" class="airplane"
                                @click="this.$router.push({ name:'MyPageEdit'})">
                        </div>
                        <div>
                            <img src="/icon/main_recommend/heart.svg" class="heart">
                        </div>
                        <div>
                            <img src="/icon/main_recommend/delete.svg" class="delete">
                        </div>
                    </div>
                </div>
            </div>
        <MeetHeader />
        </div>
    </div>
</template>
    <script>
    
    export default {	
        data() {
            return {
                // recommendList: [],
                results:[],
                sampleData : '',
                user_image : [
                    "/model3.png",
                    "/model.jpg",
                    "/model2.jpg",
                    "/model5.jpg",
                    "/model6.jpg",
                    "/images.jpg"
                ],
                index: 0
            };
            
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            this.getRecommendList();
        },
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
            
            async getRecommendList(){
                try{
                    let requestBody = {
                    };
                    const result = await this.$api(`/recommend/list`, requestBody , "POST");
                    this.recommendList = result;
                    this.results = result.results;
                }
                catch(err){
                    console.error(err);
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
        font-size: 24;
        font-weight: 700;
        padding: 30px 0 15px 0;
        margin: 0;
        text-align: left;
        color: #090909;
    }
    .mian_title{
        padding: 16px 0 16px 0;
        font-size: 22px;
    }
    .title_img{
        width: 20px;
        height: 20px;
        vertical-align: middle;
        display: inline-block;
        margin: 3px 10px 10px -3px;
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
    
    .main_image{
        width: 568px;
        min-width: 540px;
        display: flex;
        padding: 0 8px 0 8px;
        border-radius: 10px;
        position: relative;
    }
    
    .main_image > img{
        width: 568px;
        min-width: 540px;
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
    .name{
        cursor: pointer;
        position: absolute;
        z-index: 4;
        font-size: 26px;
        margin: 550px 0 0 36px;
        color: #FFFFFF
    }
    .category{
        position: absolute;
        z-index: 3;
        margin: 600px 200px 0 36px;
        display: flex;
        flex-wrap: wrap;
    }
    .category .category_A{
        background-color: #090909;
        border-radius: 4px;
        font-size: 12px;
        padding: 3px 17px 3px 17px;
        color: #FFFFFF;
    }
    .category .category_B{
        padding: 3px 17px 3px 17px;
        background-color: #FF3C3C;
        border-radius: 4px;
        font-size: 12px;
        color: #FFFFFF;
        margin-left: 15px;
    }
    .category .category_C{
        padding: 3px 17px 3px 17px;
        background-color: #07B242;
        border-radius: 4px;
        font-size: 12px;
        color: #FFFFFF;
        margin-top: 11px;
    }
    .category .category_D{
        padding: 3px 17px 3px 17px;
        background-color: #7F1BFF;
        border-radius: 4px;
        font-size: 12px;
        color: #FFFFFF;
        margin-left: 15px;
        margin-top: 11px;
    }
    .action_btn_container {
        position: absolute;
        z-index: 5;
        bottom: 15px;
        right: 0;
        display: flex;
    }
    .action_btn_container div img {
        width: 48px;
        height: 48px;
        margin-right: 20px;
    }
    .action_btn_container div:last-child img {
        margin-right: 28px;
    }
    .airplane{
        cursor: pointer;
    }
    .heart{
        cursor: pointer;
    }
    .delete{
        cursor: pointer;
    }
    .next_img{
        margin-bottom: 41px;
    }
    
    
    </style>