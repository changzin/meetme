<template>
<div class="safety_zone">
    <MeetHeader />
    <div class="header">MEETME</div>
    <dlv>
        <div class="main_header">오늘의 인기<img class="main_header_img" src="/A.png"></div>
    </dlv>
    <div class="img_a">
        <div class="prev_button" @click="count(-1)">
        </div>
        <div class="next_button" @click="count(1)">
        </div>
        <img :src="user_image[index]" @click="count(1)">
        <a class="img_name" href="https://example.com">
            이름
        </a>
    </div>
    <div class="img_a">
    <img class="main_img" src="/C.png">
    </div>
</div>
</template>
  
<script>

export default {
    data(){
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
.header{
    /*padding: 0 0 27px 0;
    font-size: 22px;*/
    /*border: 11px solid #000000; */
    font-size: 24;
    font-weight: 700;
    padding: 30px 0 15px 0;
    margin: 0;
}
.main_header{
    display: flex;
    align-items: center;
    padding: 0 0 20px 20px;
    font-size: 24px;
}
div.main_header_img{
    margin-right: 7px;
}

.img_a{
    padding: 0 16px 30px 16px;
    position: relative;

}

.img_name{
    position: absolute;
    left: 36px;
    top: 417px;
    bottom: 169px;
}
/*.prev_button {
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
}*/
</style>
