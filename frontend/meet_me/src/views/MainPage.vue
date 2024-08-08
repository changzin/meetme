<template>
<div class="safety_zone">
    <div class="container">
            <div class="mian_title">MeetMe
            </div>
            <div class="title" >
                오늘의 인기
                <img class="title_img" src="/A.png">
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
            <img :src="user_image[index]" @click="count(1)">  
            <div class="name" @click="this.$router.push({ name:'ProfileDetail'})">장원영,23
            </div>
            <div class="category">
                <div class="category_A">마마마마마마마마마마마
                </div>
                <div class="category_B">러키비키
                </div>
                <div class="category_C">유머감각이 있어요
                </div>
                <div class="category_D">러키비키
                </div>
            </div>
            <div class="action_btn_container">
                <div>
                    <img src="/icon/main_recommend/airplane.svg" class="airplane" @click="this.$router.push({ name:'MyPageEdit'})">
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
    <div class="next_img">
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
        <img :src="user_image[index]" @click="count(1)">  
        <div class="name" @click="this.$router.push({ name:'MyPageEdit'})">장원영,23
        </div>
        <div class="category">
            <div class="category_A">마마마마마마마마마마마
            </div>
            <div class="category_B">러키비키
            </div>
            <div class="category_C">유머감각이 있어요
            </div>
            <div class="category_D">러키비키
            </div>
        </div>
        <div class="action_btn_container">
            <div>
                <img src="/icon/main_recommend/airplane.svg" class="airplane" @click="this.$router.push({ name:'MyPageEdit'})">
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
<div class="next_img">
</div>
        <MeetHeader />
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
    text-align: left;
    color: #090909;
}
.main_title{
    padding: 16px 0 16px 0;
    font-size: 22px;
    font-weight: bold;
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
    padding: 41px;
}


</style>