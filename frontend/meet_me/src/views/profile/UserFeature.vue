<template>
    <div class="container container0">
        <div class="row justify-content-center">
            <div class="card_box row justify-content-center">
            <div class="title">
                특징 선택
            </div>
            <div class="sub_title"> 
                특징을 선택해주세요
            </div>
            <div class="feature_box">
                <div class="select_box">뭐든 잘먹어요</div>
                <div class="select_box">패션 센스가 좋아요</div>
                <div class="select_box">대화를 잘해요</div>
                <div class="select_box">요리를 잘해요</div>
            </div>
            <div class="feature_box">
                <div class="select_box">혼자 잘 놀아요</div>
                <div class="select_box">유머 감각이 있어요</div>
                <div class="select_box">표현을 잘해요</div>
                <div class="select_box">웃음이 많아요</div>
            </div>
            <div class="feature_box">
                <div class="select_box">운동을 좋아해요</div>
                <div class="select_box">엉덩이가 예뻐요</div>
                <div class="select_box">쌍커플이 없는 눈</div>
                <div class="select_box">손이 예뻐요</div>
            </div>
            <div class="feature_box">
                <div class="select_box">이야기를 잘 들어줘요</div>
                <div class="select_box">높은 경제력</div>
                <div class="select_box"> 표연을 잘해요</div>
                <div class="select_box">허세 없어요</div>
            </div>
            <div class="feature_box">
                <div class="select_box">목소리가 좋아요</div>
                <div class="select_box">배려심이 깊어요</div>
                <div class="select_box">긍정적인 마인드</div>
                <div class="select_box">섹시한 두뇌</div>
            </div>
            <div class="feature_box">
                <div class="select_box">장난기가 많아요</div>
                <div class="select_box">섬세해요</div>
                <div class="select_box">다정해요</div>
                <div class="select_box">솔직해요</div>
                <div class="select_box">보조개</div>
            </div>
            <div class="feature_box">
                <div class="select_box">체력이 좋아요</div>
                <div class="select_box">섹시한 타투</div>
                <div class="select_box">오똑한 콧날</div>
                <div class="select_box">털털해요</div>
                <div class="select_box">큰 눈</div>
            </div>
            <div class="feature_box">
                <div class="select_box">다리가 예뻐요</div>
                <div class="select_box">웃음이 많아요</div>
                <div class="select_box">게임을 잘해요</div>
                <div class="select_box">노래를 잘해요</div>
            </div>
            <div class="feature_box">
                <div class="select_box">재주가 좋아요</div>
                <div class="select_box">비율이 좋아요</div>
                <div class="select_box">피부 미인</div>
                
            </div>
            <div class="container_bottom">
                <button class="next">다음으로</button>
            </div>
        </div>
    </div>
</div>


</template>
<script>
export default {
    data(){
        return{
        }
    },
    computed:{
    },
    methods:{
    }
}
</script>

      

<style scoped>
    .container0 {
    width: 600px;
    border: 1px solid red;
    display: grid;
    /* grid-auto-columns:  */
    align-content: center;
    background-color: #888888;
    }
    input[type="text"]{
        outline: none;
        border: none;
    }
    .card_box {
        border: 1px solid red;
        margin-top: 30px;
        margin-bottom: 80px;
        width: 568px;
        /* display: grid; */
        /* grid-auto-columns: repeat(2, minmax(100px,auto)); */
        background-color: #FFFFFF;
        border-radius: 18px;
    }

    .title {
        margin-top: 44px;
        font-size: 24px;
        color: #111111;
        text-align: center;
        margin-bottom:44px;
        font-weight: bold;
        border: red;
    }
    .sub_title{
        font-weight: 500;
        font-size: 18px;
        color:#111111;
        border: 1px solid red;
    }
    .feature_box{
        display: grid;
        /* grid-template-columns: repeat(auto-fit, minmax(10%, auto));
         */
         grid-template-columns: repeat(auto-fit, minmax(10%, auto));
        border: 1px solid red;
    }
    .none_select_box{
        align-content: center;
        width: 124px;
        height: 40px;
        background-color: #FFFFFF;
        border: solid 1px #b6b6b6;
        border-radius: 8px;
        color: #b6b6b6;
        text-align: center;
    }
    .select_box{
        margin-right: 12px;
        margin-bottom:12px;
        align-content: center;
        width: auto;
        height: 40px;
        /* background-color: #64BAAA; */
        border: none;
        border-radius: 8px;
        /* color: #FFFFFF; */
        color: #111111;
        text-align: center;
        border: 1px solid blue;
    }
    div.container_bottom{
        border: 1px solid red;
    }

</style> 