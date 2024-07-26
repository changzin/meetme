<template>
    <div class="safety_zone">
        <div class="container">
            <div class="title">
                프로필 등급
            </div>
            <div class="main_image">
                <div class="prev_button" @click="count(-1)">
                </div>
                <div class="next_button" @click="count(1)">
                </div>
                <img :src="user_image[index]" @click="count(1)">  
            </div>
            <div class="profile_info">
                <div class="introduce">
                    안녕하세요, 장원영입니다. 원영이는 너무 귀여워~ 카와이네~~~~~~ 안녕하세요, 장원영입니다. 원영이는 너무 귀여워~ 카와이네~~~~~~안녕하세요, 장원영입니다. 원영이는 너무 귀여워~ 카와이네~~~~~~안녕하세요, 장원영입니다. 원영이는 너무 귀여워~ 카와이네~~~~~~
                </div>
                <div class="name">
                    장원영입니다,23
                </div>
                <div class="live">
                    서울특별시
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

.profile_info .name {
    font-size: 24px;
    text-align: start;
    font-weight: 700;
}

.profile_info .live {
    font-size: 16px;
    text-align: start;
    font-weight: 500;
    padding-bottom: 10px;
}

.introduce {
    border-radius: 10px;
    background-color: #F1EFF6;
    padding: 20px;
    text-align: left;
    margin: 0 auto;
}
</style>