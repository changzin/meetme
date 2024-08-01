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
                <div class="select_box">혼자 잘 놀아요</div>
                <div class="select_box">유머 감각이 있어요</div>
                <div class="select_box">표현을 잘해요</div>
                <div class="select_box">웃음이 많아요</div>
                <div class="select_box">운동을 좋아해요</div>
                <div class="select_box">엉덩이가 예뻐요</div>
                <div class="select_box">쌍커플이 없는 눈</div>
                <div class="select_box">손이 예뻐요</div>
                <div class="select_box">이야기를 잘 들어줘요</div>
                <div class="select_box">높은 경제력</div>
                <div class="select_box"> 표연을 잘해요</div>
                <div class="select_box">허세 없어요</div>
                <div class="select_box">목소리가 좋아요</div>
                <div class="select_box">배려심이 깊어요</div>
                <div class="select_box">긍정적인 마인드</div>
                <div class="select_box">섹시한 두뇌</div>
                <div class="select_box">장난기가 많아요</div>
                <div class="select_box">섬세해요</div>
                <div class="select_box">다정해요</div>
                <div class="select_box">솔직해요</div>
                <div class="select_box">보조개</div>
                <div class="select_box">체력이 좋아요</div>
                <div class="select_box">섹시한 타투</div>
                <div class="select_box">오똑한 콧날</div>
                <div class="select_box">털털해요</div>
                <div class="select_box">큰 눈</div>
                <div class="select_box">다리가 예뻐요</div>
                <div class="select_box">웃음이 많아요</div>
                <div class="select_box">게임을 잘해요</div>
                <div class="select_box">노래를 잘해요</div>
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
            user_feature_id:[],
            user_feature_value:[],
        }
    },
    computed:{
    },
    methods:{
        async fetchFeature(){
            const requestBody = {}
            const response = await this.$api(`/userFeature/list`,requestBody,"GET")
            console.log(response);
            
            if(response.status == 200){
                const getFeature = response.userFeature;
                console.log(getFeature);
            }
        }

    }
}
</script>

      

<style scoped>
    .container0 {
    width: 600px;
    /* border: 1px solid red; */
    display: grid;
    /* grid-auto-columns:  */
    align-content: center;
    
    }
    input[type="text"]{
        outline: none;
        border: none;
    }
    .card_box {
        /* border: 1px soslid red; */
        margin-top: 30px;
        margin-bottom: 80px;
        width: 568px;
        /* display: grid; */
        /* grid-auto-columns: repeat(2, minmax(100px,auto)); */
        background-color: #FFFFFF;
        border-radius: 18px;
    }

    .title {
        margin-top: 54px;
        font-size: 24px;
        color: #111111;
        text-align: center;
        margin-bottom:30px;
        font-weight: bold;
        /* border: red; */
    }
    .sub_title{
        text-align: start;
        font-weight: 500;
        font-size: 18px;
        margin-bottom: 15px;
        color:#111111;
        /* border: 1px solid red; */
    }
    .feature_box{
        display: grid;
        grid-template-columns : repeat(auto-fit,minmax(120px,1fr));
        gap:15px; /* 그리드 아이템 사이의 간격 */
        align-content: center;
        justify-items: stretch;
        /* border: 1px ssolid green; */
        margin-bottom: 30px;
        
    }
    
    .select_box{
        align-content: center;
        justify-content: center;
        height: 40px;
        border-radius: 8px;
        color: #FFFFFF;
        background-color: #64BAAA ;
        text-align: center;
        border: none;
        font-size: 14px;
    }
    .select_box:hover{
        cursor: pointer;
    }

    .visble_select_box{
        align-content: center;
        justify-content: center;
        height: 40px;
        border-radius: 8px;
        color: #888888;
        text-align: center;
        border: 1px solid #b6b6b6;
        font-size: 14px;
    }
    .visble_select_box:hover{
        cursor: pointer;
    }

    div.container_bottom{
        /* border: 1px solid red; */
    }

    .next{
        margin-bottom: 30px;
        width: 540px;
        height: 60px;
        text-align: center;
        font-size: 22px;
        font-weight: 500;
        color: #FDF7FF;
        background-image: var(--gradient);
        border-radius: 8px;
        border: none;
    }

</style> 