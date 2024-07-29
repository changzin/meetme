<template>
    <div class="container container0">
        <div class="row justify-content-center">
            <div class="card_box row justify-content-center">
            <div class="title">
                특징 선택
            </div>
            <div class="sub_text"> 
                특징을 선택해주세요
            </div>
            <div class="character_box">
                <div class="select_box">
                    뭐든 잘 먹어요 
                </div>
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
    }
    .character_box{
        margin: auto 9px;
        display: flex;
        margin: auto auto;
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
        width: 124px;
        height: 40px;
        background-color: #64BAAA;
        border: none;
        border-radius: 8px;
        color: #FFFFFF;
        text-align: center;
    }

</style> 