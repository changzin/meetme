<template>
    <div class="safety_zone">
        <!-- <AlertModal v-if="visibleModal" message="좋아요 신청을 하시겠습니까?" @close="handleClose" class="modal"/> -->
        <div class="container">
            <div class="title">
                오늘의 추천
                <img class="title_img" src="/icon/main_recommend/fier.svg">
            </div>
            <div v-if="results.length > 0">
                <div class="main_image next_img" v-for="(user,i) in results" :key="i"> 
                    <div class="image_tab">
                        <div v-for="(image_paths,j) in user.user_image_path" :key="j" :class="{number2: user.index == j, number: user.index != j}"></div>
                    </div>
                    <div class="prev_button" @click="count(-1, user)">
                    </div>
                    <div class="next_button" @click="count(1, user)">
                    </div>
                    <img :src="this.$imageFileFormat(user.user_image_path[user.index])" @click="count(1, user)">
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
                        <div class="button">
                            <img v-if="!user.giveMatching" src="/icon/main_recommend/airplane.svg" @click="sendMatching(user.user_id2)" class="airplane">
                            <img v-if="user.giveMatching" src="/icon/main_recommend/airplane_delete.svg" class="airplane">


                            <img v-if="!user.giveHeart" src="/icon/main_recommend/heart.svg" alt="Image 1" @click="heart(user.user_id2)" class="heart" />
                            <img v-if="user.giveHeart" src="icon/main_recommend/heart_delete.svg" alt="Image 2" class="heart"/>


                            <img src="/icon/main_recommend/delete.svg" @click="userDelete(user.user_id2)" class="delete">
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
            async sendMatching(user_id2){
                
                this.isImageTwoVisible2 = !this.isImageTwoVisible2;
                
                try{
                    await this.$api(`/recommend/sendmatching`, {access_token: this.$getAccessToken() , user_id2}, "POST");
                    await this.getRecommendList();
                }catch(err){
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
        margin-right: 23px;
        margin-bottom: 11px;
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
    .modal-popup .modal{
        width: 400px;
        height: 220px;
    }
    
    
    </style>











//윈터
profile/13/1d21c1eb9f199cfeba2133adbcc157ed05c7e0ff.gif
profile/13/화면 캡처 2024-08-07 135748.png
profile/13/화면 캡처 2024-08-07 135819.png
profile/13/화면 캡처 2024-08-07 135650.png
profile/13/화면 캡처 2024-08-07 135709.png
profile/13/화면 캡처 2024-08-07 135723.png

//민지
profile/14/debfce8f72116b5ec54d4b06b379871b1fd80ead.gif
profile/14/화면 캡처 2024-08-07 135224.png
profile/14/화면 캡처 2024-08-07 135434.png
profile/14/화면 캡처 2024-08-07 135331.png
profile/14/화면 캡처 2024-08-07 135404.png
profile/14/화면 캡처 2024-08-07 135458.png

//안유진
profile/15/KakaoTalk_20240807_135807312_02.jpg
profile/15/KakaoTalk_20240807_135807312_01.jpg
profile/15/KakaoTalk_20240807_135807312.jpg
profile/15/KakaoTalk_20240807_135807312_04.jpg
profile/15/KakaoTalk_20240807_135807312_03.jpg

//카리나
profile/16/KakaoTalk_20240807_140632305_03.jpg
profile/16/KakaoTalk_20240807_140632305_04.jpg
profile/16/KakaoTalk_20240807_140632305_05.jpg
profile/16/KakaoTalk_20240807_140632305.jpg
profile/16/KakaoTalk_20240807_140632305_01.jpg
profile/16/KakaoTalk_20240807_140632305_02.jpg

//지우
profile/17/KakaoTalk_20240807_140651975_02.jpg
profile/17/KakaoTalk_20240807_140651975_03.jpg
profile/17/KakaoTalk_20240807_140651975_05.jpg
profile/17/KakaoTalk_20240807_140651975_01.jpg
profile/17/KakaoTalk_20240807_140651975.jpg
profile/17/KakaoTalk_20240807_140651975_04.png

//해린
profile/18/KakaoTalk_20240807_141411691.jpg
profile/18/KakaoTalk_20240807_141411691_05.jpg
profile/18/KakaoTalk_20240807_141411691_01.jpg
profile/18/KakaoTalk_20240807_141411691_03.jpg
profile/18/KakaoTalk_20240807_141411691_02.jpg
profile/18/KakaoTalk_20240807_141411691_04.jpg

//미연
profile/19/다운로드.gif
profile/19/화면 캡처 2024-08-07 141855.png
profile/19/화면 캡처 2024-08-07 142229.png
profile/19/화면 캡처 2024-08-07 142150.png
profile/19/화면 캡처 2024-08-07 142133.png
profile/19/화면 캡처 2024-08-07 142214.png

//1호
profile/1/KakaoTalk_20240807_135436085.png
profile/1/KakaoTalk_20240807_135444008.png
profile/1/KakaoTalk_20240807_135455667.png

//2호
profile/2/KakaoTalk_20240807_141323996.png
profile/2/KakaoTalk_20240807_141242881.png
profile/2/KakaoTalk_20240807_141310809.png

//3호
profile/3/KakaoTalk_20240807_141844948_02.jpg
profile/3/KakaoTalk_20240807_141844948_03.jpg
profile/3/KakaoTalk_20240807_141844948_04.jpg
profile/3/KakaoTalk_20240807_141844948_01.jpg
profile/3/KakaoTalk_20240807_141844948.jpg

//4호
profile/4/KakaoTalk_20240807_142149480.png
profile/4/KakaoTalk_20240807_142159356.png
profile/4/KakaoTalk_20240807_142130032.png
profile/4/KakaoTalk_20240807_142228500.png
profile/4/KakaoTalk_20240807_142136973.png








INSERT 
    INTO user_image(user_id, user_image_path)
    VALUES
        (13, 'profile/13/1d21c1eb9f199cfeba2133adbcc157ed05c7e0ff.gif'),
        (13, 'profile/13/화면 캡처 2024-08-07 135748.png'),
        (13, 'profile/13/화면 캡처 2024-08-07 135819.png'),
        (13, 'profile/13/화면 캡처 2024-08-07 135650.png'),
        (13, 'profile/13/화면 캡처 2024-08-07 135709.png'),
        (13, 'profile/13/화면 캡처 2024-08-07 135723.png'),

        (14, 'profile/14/debfce8f72116b5ec54d4b06b379871b1fd80ead.gif'),
        (14, 'profile/14/화면 캡처 2024-08-07 135224.png'),
        (14, 'profile/14/화면 캡처 2024-08-07 135434.png'),
        (14, 'profile/14/화면 캡처 2024-08-07 135331.png'),
        (14, 'profile/14/화면 캡처 2024-08-07 135404.png'),
        (14, 'profile/14/화면 캡처 2024-08-07 135458.png'),

        (15, 'profile/15/KakaoTalk_20240807_135807312_02.jpg'),
        (15, 'profile/15/KakaoTalk_20240807_135807312_01.jpg'),
        (15, 'profile/15/KakaoTalk_20240807_135807312.jpg'),
        (15, 'profile/15/KakaoTalk_20240807_135807312_04.jpg'),
        (15, 'profile/15/KakaoTalk_20240807_135807312_03.jpg'),

        (16, 'profile/16/KakaoTalk_20240807_140632305_03.jpg'),
        (16, 'profile/16/KakaoTalk_20240807_140632305_04.jpg'),
        (16, 'profile/16/KakaoTalk_20240807_140632305_05.jpg'),
        (16, 'profile/16/KakaoTalk_20240807_140632305.jpg'),
        (16, 'profile/16/KakaoTalk_20240807_140632305_01.jpg'),
        (16, 'profile/16/KakaoTalk_20240807_140632305_02.jpg'),

        (17, 'profile/17/KakaoTalk_20240807_140651975_02.jpg'),
        (17, 'profile/17/KakaoTalk_20240807_140651975_03.jpg'),
        (17, 'profile/17/KakaoTalk_20240807_140651975_05.jpg'),
        (17, 'profile/17/KakaoTalk_20240807_140651975_01.jpg'),
        (17, 'profile/17/KakaoTalk_20240807_140651975.jpg'),
        (17, 'profile/17/KakaoTalk_20240807_140651975_04.png'),

        (18, 'profile/18/KakaoTalk_20240807_141411691.jpg'),
        (18, 'profile/18/KakaoTalk_20240807_141411691_05.jpg'),
        (18, 'profile/18/KakaoTalk_20240807_141411691_01.jpg'),
        (18, 'profile/18/KakaoTalk_20240807_141411691_03.jpg'),
        (18, 'profile/18/KakaoTalk_20240807_141411691_02.jpg'),
        (18, 'profile/18/KakaoTalk_20240807_141411691_04.jpg'),

        (19, 'profile/19/다운로드.gif'),
        (19, 'profile/19/화면 캡처 2024-08-07 141855.png'),
        (19, 'profile/19/화면 캡처 2024-08-07 142229.png'),
        (19, 'profile/19/화면 캡처 2024-08-07 142150.png'),
        (19, 'profile/19/화면 캡처 2024-08-07 142133.png'),
        (19, 'profile/19/화면 캡처 2024-08-07 142214.png'),

        (1, 'profile/1/KakaoTalk_20240807_135436085.png'),
        (1, 'profile/1/KakaoTalk_20240807_135444008.png'),
        (1, 'profile/1/KakaoTalk_20240807_135455667.png'),

        (2, 'profile/2/KakaoTalk_20240807_141323996.png'),
        (2, 'profile/2/KakaoTalk_20240807_141242881.png'),
        (2, 'profile/2/KakaoTalk_20240807_141310809.png'),

        (3, 'profile/3/KakaoTalk_20240807_141844948_02.jpg'),
        (3, 'profile/3/KakaoTalk_20240807_141844948_03.jpg'),
        (3, 'profile/3/KakaoTalk_20240807_141844948_04.jpg'),
        (3, 'profile/3/KakaoTalk_20240807_141844948_01.jpg'),
        (3, 'profile/3/KakaoTalk_20240807_141844948.jpg'),

        (4, 'profile/4/KakaoTalk_20240807_142149480.png'),
        (4, 'profile/4/KakaoTalk_20240807_142159356.png'),
        (4, 'profile/4/KakaoTalk_20240807_142130032.png'),
        (4, 'profile/4/KakaoTalk_20240807_142228500.png'),
        (4, 'profile/4/KakaoTalk_20240807_142136973.png');

