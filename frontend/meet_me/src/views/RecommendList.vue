<template>
    <div class="safety_zone">
        <div class="container">
            <div class="title">
                오늘의 추천
                <img class="title_img" src="/icon/main_recommend/fier.svg">
            </div>
            <div v-if="results.length > 0">
                <div class="main_image next_img" v-for="(user, i) in results" :key="i">
                    <div class="image_tab">
                        <div v-for="(image_paths, j) in user.user_image_path" :key="j"
                            :class="{ number2: user.index == j, number: user.index != j }"></div>
                    </div>
                    <div class="prev_button" @click="count(-1, user)">
                    </div>
                    <div class="next_button" @click="count(1, user)">
                    </div>
                    <img :src="this.$imageFileFormat(user.user_image_path[user.index])" @click="count(1, user)">
                    <div class="name" @click="clickeToProfileDetail(user.user_id2)">
                        {{ user.user_nickname }} , {{ user.user_age }}
                    </div>
                    <div class="category">
                        <div class="category_A" v-if="user.user_feature_value[0]">{{ user.user_feature_value[0] }}
                        </div>
                        <div class="category_B" v-if="user.user_feature_value[1]">{{ user.user_feature_value[1] }}
                        </div>
                        <div class="category2">
                            <div class="category_C" v-if="user.user_feature_value[2]">{{ user.user_feature_value[2] }}
                            </div>
                            <div class="category_D" v-if="user.user_feature_value[3]">{{ user.user_feature_value[3] }}
                            </div>
                        </div>
                    </div>

                    <div class="action_btn_container">
                        <div class="button">
                            <img v-if="!user.giveMatching" src="/icon/main_recommend/airplane.svg"
                                @click="sendMatching(user.user_id2)" class="airplane">
                            <img v-if="user.giveMatching" src="/icon/main_recommend/airplane_delete.svg"
                                class="airplane">


                            <img v-if="!user.giveHeart" src="/icon/main_recommend/heart.svg" alt="Image 1"
                                @click="heart(user.user_id2)" class="heart" />
                            <img v-if="user.giveHeart" src="icon/main_recommend/heart_delete.svg" alt="Image 2"
                                class="heart" />


                            <img src="/icon/main_recommend/delete.svg" @click="userDelete(user.user_id2)"
                                class="delete">
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
            // visibleModal: false,
            isImageTwoVisible: false, //이미지
            isImageTwoVisible2: false, //이미지
            // recommendList: [],
            user_id1: '',
            user_id2: '',
            results:[],
            sampleData : '',
            // user_image : [
            //     "/model3.png",
            //     "/model.jpg",
            //     "/model2.jpg",
            //     "/model5.jpg",
            //     "/model6.jpg",
            //     "/images.jpg"
            // ],
            index: 0,
            heartData: {},
        };
        
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.getRecommendList();
        this.getHeart();
    },
    methods: {
    
        handleClose() {
            this.visibleModal = false;
        },
        count(cnt, user){
            user.index += cnt;            

            if(user.index == user.user_image_path.length){
                return user.index = 0;
            }else if(user.index < 0) {
                return user.index = user.user_image_path.length-1;
            }
        },

        async getRecommendList(){
                try{
                    let requestBody = {
                        access_token: this.$getAccessToken()
                    };
                    const result = await this.$api(`/recommend/list`, requestBody , "POST");
                    this.recommendList = result;
                    this.results = result.results;
                    let heartList = result.getHeart;
                    let matchingList = result.getMatching
                    this.results = result.results.map(user => {
                        user.index = 0;  // 각 사용자에 인덱스 속성을 추가
                        return user;
                    });
                    
                    
                    for(let i in heartList){
                        for(let j in this.results){
                            if(this.results[j].user_id2 == heartList[i].heart_status){
                                this.results[j].giveHeart = true;
                            }                                                                
                        }                            
                    }
                    for(let i in matchingList){
                        for(let j in this.results){
                            if(this.results[j].user_id2 == matchingList[i].matching_status){
                                this.results[j].giveMatching = true;
                            }                                                                
                        }                            
                    }
                    
                }
                catch(err){
                    console.error(err);
            }
        },

        async heart(user_id2){  
            // this.visibleModal = !this.visibleModal;
            this.isImageTwoVisible = !this.isImageTwoVisible; //이미지 변경

            try{
                let requestBody = {
                    access_token: this.$getAccessToken(), //user_id = 나
                    user_id2
                };

                const result = await this.$api(`/recommend/heart`, requestBody , "POST");
                this.heartData = result,
                this.message = result.message;
                await this.getRecommendList();
            }
            catch(err){
                console.error(err);
            }
        },
        async sendMatching(user_id2) {
            try {
                await this.$api(`/recommend/sendmatching`, { access_token: this.$getAccessToken(), user_id2 }, "POST");
                await this.getRecommendList();
            } catch (err) {
                console.error(err);
            }
        },
        async getHeart(){
            const result = await this.$api(`/user/getheart`, {access_token: this.$getAccessToken()},"POST");
            this.heartData = result.heart;
            console.log("this.heartData" ,this.heartData)
        },
        async userDelete(user_id2){  
            try{
                let requestBody = {
                    access_token: this.$getAccessToken(),
                    user_id2
                };

                const result = await this.$api(`/recommend/userdelete`, requestBody , "POST");
                this.delete = result,
                this.message = result.message;
                await this.getRecommendList();
            }
            catch(err){
                console.error(err);
            }
        },
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

.mian_title {
    padding: 16px 0 16px 0;
    font-size: 22px;
}

.title_img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    display: inline-block;
    margin: 3px 10px 10px -3px;
}

.image_tab {
        margin-top: 5px;
        width: 510px;
        height: 18px;
        background-color: rgba(183, 67, 67, 0);
        border-radius: 100px;
        position: absolute;
        display: flex;
        top: 0;
        gap: 15px;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 3;
        justify-content: space-between;
        align-items: center;
        padding: 6px;
   }
    .number {
        width: 100%;
        height: 2px;
        border-radius: 100px;
        background-color: slategrey;
        display: flex;
        justify-content: space-between;
    }
    
    .number2 {
        width: 100%;
        height: 2px;
        border-radius: 100px;
        background-color: rgb(252, 252, 252);
        display: flex;
        justify-content: space-between;
    }

.main_image {
    width: 568px;
    min-width: 540px;
    display: flex;
    padding: 0 8px 0 8px;
    border-radius: 10px;
    position: relative;
}

.main_image>img {
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

.name {
    cursor: pointer;
    position: absolute;
    z-index: 4;
    font-size: 26px;
    margin: 550px 0 0 36px;
    color: #FFFFFF
}

.category {
    position: absolute;
    z-index: 3;
    margin: 600px 200px 0 36px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: baseline;
}

.category2 {
    width: 500px;
    position: absolute;
    z-index: 3;
    padding-top: 25px;
    /*margin: 600px 200px 0 36px;*/
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: baseline;
}

.category .category_A {
    background-color: #090909;
    border-radius: 4px;
    font-size: 12px;
    padding: 3px 17px 3px 17px;
    color: #FFFFFF;
}

.category .category_B {
    padding: 3px 17px 3px 17px;
    background-color: #FF3C3C;
    border-radius: 4px;
    font-size: 12px;
    color: #FFFFFF;
    margin-left: 15px;
}

.category .category_C {
    padding: 3px 17px 3px 17px;
    background-color: #07B242;
    border-radius: 4px;
    font-size: 12px;
    color: #FFFFFF;
    margin-top: 11px;
}

.category .category_D {
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
    margin-right: 23px;
    margin-bottom: 11px;
}

.airplane {
    cursor: pointer;
}

.heart {
    cursor: pointer;
}

.delete {
    cursor: pointer;
}

.next_img {
    margin-bottom: 41px;
}

.modal-popup .modal {
    width: 400px;
    height: 220px;
}
</style>
