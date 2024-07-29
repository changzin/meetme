<template>
    <div class="container0">
        <div class="card_box">
            <div class="container_top">
                <div class="tilte">프로필 입력</div>
            </div>
            <div class="container_middle">
                <div class="container_gen_age">
                    <div class="gender">
                        <div class="sub_title">성별</div>
                        <div class="select_gender">
                            <button :class="maleClass" @click="toggleGender('male')">
                            남
                            </button>
                            <button :class="femaleClass" @click="toggleGender('female')">
                            여
                            </button>
                        </div>
                    </div>
                    <div class="age">
                        <div class="sub_title2">나이</div>
                        <div class="age_input_box">
                            <input type="number" class="age_input" >
                            <span class="flxed_text">세</span>
                        </div>
                    </div>
                </div>
                <div class="subtitle">
                    필수 입력
                </div>
                <div class="container_essential">
                    <div class="select_box">
                        <label for="text" class="essential_tag">연봉</label>
                         <input type="number" class="essential_input" value="연봉">
                         <label for="text" class="essential_tag">만원</label>

                    </div>
                   
                    <div class="select_box">박스</div>
                    <div class="select_box">박스</div>
                    <div class="select_box">박스</div>
                    <div class="select_box">박스</div>
                    <div class="select_box">박스</div>
                    <div class="select_box">박스</div>
                    <div class="select_box">박스</div>

                </div>
                <div class="subtitle">
                    주소지
                </div>
                <div class="adress">
                    <input type="text" placeholder="주소검색" />
                    <input type="submit" />
                </div>
                <div class="subtitle">
                    자기소개
                </div>
                <div class="intro">
                    g하이
                </div>

            </div>
            <div class="container_bottom">
                <button calss="next">다음으로</button>
            </div>
        </div>
    </div>


</template>
<script>
export default {	
    name:'',
    components:{},
    data() {
        return {
            activeGender: 'male'  // 초기 활성화상태 '남' 
        };
    },
    computed:{
        maleClass(){
            return this.activeGender === 'male' ? 'active' : 'inactive';
        },
        femaleClass(){
            return this.activeGender === 'female' ? 'active' : 'inactive';
        }
    },
    methods: {
        toggleGender(gender){
          this.activeGender = gender;
       }
    }
}
</script>

<style scoped>
 /* div */
    button{
        outline: none;
    }
    input{
        border: none;
        outline:none;
    }   
    input[type="number"]::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
      -webkit-appearance: none;
      margin: 0;
    }
    div.container0{
        width: 600px;
        height: 100vh;
        margin:0 auto; 
        /* border:1px solid red; */
        display: flex; 
        flex-direction: column; 
        justify-content: flex-start; 
        border: none;
        background: none;
        border-radius: 10px;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.23);
    }
    .card_box {
         
        border: 1px solid red;
        margin-top: 30px;
        /* margin-bottom: 80px;  */
        width: 568px; 
        display: grid;
        /* grid-auto-columns: repeat(2, minmax(100px,auto));  */
        background-color: #FFFFFF; 
        border-radius: 18px;
     } 
    div.container_top{
        margin-top: 54px;
        border: 1px solid red;
        /* margin-bottom: 20px; */
    }

    div.container_middle{
        margin-top: 48px;
        border: 1px solid blue;
        display: flex;
        flex-direction: column; 
        gap: 10px;
    }

    div.container_gen_age{
        border: 1px solid green;
        display: grid;
        grid-template-columns: 1fr 1fr;
         
    }

    div.gender{
        border: 1px solid red;
        display: grid;
        grid-template-columns: 78px 50px;
        
        justify-items: start;

    }
    div.select_gender{
        /* margin-left: 33px; */
        /* grid-gap: 33px; */
        border: 1px solid blue;
        justify-content: space-between;
        background-color: #d9d9d9;
        border-radius: 9px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding-left: 4px;
        padding-right: 4px;

    }


    div.age{
        border: 1px solid red;
        display: grid;
        grid-template-columns: 60px 2fr;
        justify-items: start;
        
    }

    div.sub_title{
        border: 1px solid red;
         font-size: 16px;
        font-weight: 500px;
        margin-left: 16px;
        text-align: start;
        align-content: center;

    }
    div.sub_title2{
        border: 1px solid red;
         font-size: 16px;
        font-weight: 500px;
        /* margin-left: 16px; */
        text-align: start;

    }

    div.container_essential{
        border: 1px solid red;
        display: grid;
        grid-template-columns: 1fr 1fr;

    }
    .container_essential div{
        border: 1px solid blue;
    }

    div.adress{
        border: 1px solid red;
        display: grid;
        grid-gap: 20px;
        grid-template-columns: 440px 75px;

    }

    div.intro{
        /* border: 1px solid red; */
        background: #888888;
        height: 300px;

    }

    div.container_bottom{
        border: 1px solid red;

    }
    /* div.sub_title{
        font-size: 16px;
        font-weight: 500px;
        margin-left: 17px;
        text-align: start;
    } */
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
    .age_input_box{
        /* position: relative; */
        /* display: inline-block; */
        /* margin-left: 31px; */
        width:102px;
        background-color: #d9d9d9;
        border-radius: 9px;
    }
    .age_input{
        padding-top: 5px ;
        /* padding-left: 10px; */
        background: none;
        text-align: end;
        width: 40px;
    }
    .select_box{
        display: flex;
        margin-top: 10px;
        margin-left: 17px;
        margin-right: 20px;
        height: 36px;
        background-color:#FFFFFF;
        border: solid 1px var(--purple_main);
        border-radius: 6px;
        box-shadow: 0px 1px 12px rgba(92, 9, 227, 0.28);
        /* outline: none; */
    }
    .essential_input{
        margin-left: 100px;
        width: 50px;
        font-size: 16px;
        color: var(--purple_main);
        /* align-content: end; */
    }
    .essential_tag{
        margin-left: 12px;
        align-content: center;
        color: var(--purple_main);
    }
</style>
