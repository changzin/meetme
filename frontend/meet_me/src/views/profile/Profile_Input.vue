<template>
    <div class="container container0">
        <div class="row justify-content-center">
            <div class="card_box row justify-content-center">
            <div class="title">
                프로필 입력
            </div>
            <div class="row_box1">
                <div class="sub_title1">
                    성별
                </div>
                <div class="gender_select">
                    <button :class="maleClass" @click="toggleGender('male')">
                        남
                    </button>
                    <button :class="femaleClass" @click="toggleGender('female')">
                        여
                    </button>
                </div>
                <div class="age_box">
                    <div class="sub_title2">
                        나이
                    </div>
                    <div class="age_input_box">
                        <input type="number" class="age_input" >
                        <span class="flxed_text">세</span>
                    </div>                    
                </div>
            </div>
            <div class="row_box2" style="margin-top: 30px;">
                <div class="sub_title1">
                    필수 입력
                </div>
            </div>
            <div class="row_box2">
                <div class="select_box">
                    <span class="inline_text">연봉</span>
                    <input type="text">
                </div>
                <div class="complete_box">
                    <span class="inline_text">연봉</span>
                    <input type="text">
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
        activeGender: 'male'  // 초기 활성화상태 '남' 
        }
    },
    computed:{
        maleClass(){
            return this.activeGender === 'male' ? 'active' : 'inactive';
        },
        femaleClass(){
            return this.activeGender === 'female' ? 'active' : 'inactive';
        }
    },
    methods:{
       toggleGender(gender){
        this.activeGender = gender;
       }
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
    }
    .row_box1{
        border: 1px solid red;
        display: flex;
        padding: 0px;
        height: 34px;
    }
    .row_box2{
        border: 1px solid red;
        display: flex;
        padding: 0px;
        height: 34px;
    }
    .sub_title1{
        border: 1px solid red;
        font-size: 16px;
        font-weight: 500px;
        margin-left: 17px;
        text-align: start;
    }
    .sub_title2{
        border: 1px solid red;
        font-size: 16px;
        font-weight: 500px;
        /* margin-left: 30px; */
        text-align: start;
    }

    .gender_select{
        /* grid-column-start: 2; */
        border: 1px solid red;
        margin-left: 31px;
        margin-right: 100px;
        /* max-width:118px; */
        justify-content: space-between;
        background-color: #d9d9d9;
        border-radius: 9px;
        width: auto;
        padding-left: 4px;
        padding-right: 4px;

    }
    .active{
        background-color: var(--purple_main);
        color: #FFFFFF;
        border: none;
        margin-top:2px;
        width: 57px;
        height: 30px;
        border-radius: 7px;
        
    }
    .inactive{
        
        background:none;
        color: #111111;
        border: none;
        width: 57px;
        height: 30px;
    }
    .age_box{
        display: flex;
        padding: 0px;
        width: 181px;
        height: 34px;

    }
    .age_input_box{
        position: relative;
        display: inline-block;
        margin-left: 31px;
        width:60px;
        background-color: #d9d9d9;
        border-radius: 9px;
        
    }
    .age_input{
        border:none;
        outline: none;
        padding-top: 5px ;
        background: none;
        width: 20px;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
      -webkit-appearance: none;
      margin: 0;
    }
    .flxed_text{
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        color: #979797;
    }
    .select_box{
        display: flex;
        margin-top: 10px;
        margin-left: 17px;
        margin-right: 20px;
        width: 260px;
        height: 36px;
        background-color:#FFFFFF;
        border: solid 1px var(--purple_main);
        border-radius: 6px;
        color: var(--purple_main);
        box-shadow: 0px 1px 12px rgba(92, 9, 227, 0.28);
        /* outline: none; */
    }
    .complete_box{
        margin-top: 10px;
        display: flex;
        margin-left: 17px;
        margin-right: 20px;
        width: 260px;
        height: 36px;
        border-radius: 6px;
        background-color: #FFFFFF;
        border: solid 1px #64BAAA;
        color:#64BAAA;
    }
    .none_select_box{
        display: flex;
        margin-top: 10px;
        margin-left: 17px;
        margin-right: 20px;
        width: 260px;
        height: 36px;
        color: #979797;
        background-color: #FFFFFF;
        border: #979797;
    }
    .inline_text{
        /* position: absolute; */
        right: 5px;
        top: 50%;
        /* transform: translateY(-50%); */
        color: var(--purple_main);
        /* margin-right: 137px; */
    }
    

</style> 