<template>
    <div class="container0">
        <div class="card_box">
            <div class="container_top">
                <div class="title">프로필 입력</div>
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
                </div>
                <div class="sub_title3">
                    필수 입력
                </div>
                <!-- 몸무게 -->
               
                <div class="container_essential">
                    <div class="select_box">
                        <label for="number" class="box_tag">나이</label>
                        <input type="number" class="box_input"  value="나이">
                        <label class="box_end">세</label>
                    </div>
                    <div class="select_box">
                        <label for="text" class="box_tag">연봉</label>
                         <input type="number" class="box_input" value="연봉">
                         <label for="text" class="box_end">만원</label>
                    </div>
                    <div class="select_box">
                        <label for="number" class="box_tag">키</label>
                        <input type="number" class="box_input" value="키">
                        <label for="nubmer" class="box_end">cm</label>
                    </div>
                    <div class="select_box">
                        <label for="number" class="box_tag">몸무게</label>
                        <input type="number" v-model="wheit_Value" class="box_input" value="몸무게" @input="validate" />
                        <label for="number" class="box_end">kg</label>
                    </div>
                    
                   
                    
                    <!-- v-if isVisible isEnabled 상태 구성 백단에서 불러온 데이터를 셀렉트에 넣기
                    @click 으로 선택되면 isEnabled 활성화 보라색으로 변환 @click 이 풀릴시 isVisible로 변환 -->
                    <!-- 최종 선택된 데이터를 다음 버튼 클릭시 포스트로 서버에 전송 dB에 insert시킴 -->

                    <!-- MBTI -->
                    <select name="MBTI"  class="select_dropdown_button"  v-model="select_mbti" @blur="enable_mbti()" @change="handle_mbti_change($event)" :class="{'visible_dropdown_button' : !is_mbti_enabled}">
                        <option v-if="!is_mbti_enabled"  class="dropdown_item" value="none" selected  disabled hidden>MBTI</option>
                        <option  class="dropdown_item" value="ESFJ" >ESFJ</option>
                        <option  class="dropdown_item" value="ESFP">ESFP</option>
                        <option  class="dropdown_item" value="ESTJ">ESTJ</option>
                        <option  class="dropdown_item" value="ESTP">ESTP</option>
                        <option  class="dropdown_item" value="ENFJ">ENFJ</option>
                        <option  class="dropdown_item" value="ENFP">ENFP</option>
                        <option  class="dropdown_item" value="ENTJ">ENTJ</option>
                        <option  class="dropdown_item" value="ENTP">ENTP</option>
                        <option  class="dropdown_item" value="ISFJ">ISFJ</option>
                        <option  class="dropdown_item" value="ISFP">ISFP</option>
                        <option  class="dropdown_item" value="ISTJ">ISTJ</option>
                        <option  class="dropdown_item" value="ISTP">ISTP</option>
                        <option  class="dropdown_item" value="INFJ">INFJ</option>
                        <option  class="dropdown_item" value="INFP">INFP</option>
                        <option  class="dropdown_item" value="INTJ">INTJ</option>
                        <option  class="dropdown_item" value="INTP">INTP</option>
                    </select>

                     
                    
                    
                    
                    <!-- 혈액형 -->
                    <select name="blood_type" class="select_dropdown_button"  v-model="select_blood_type" @blur="enable_blood_type()" @change="handle_blood_type_change($event)" :class="{'visible_dropdown_button' : !is_blood_type_enabled}">
                        <option class="dropdown_item" value="none" selected disabled hidden>혈액형</option>
                        <option class="dropdown_item" value="A">A</option>
                        <option class="dropdown_item" value="B">B</option>
                        <option class="dropdown_item" value="O">O</option>
                        <option class="dropdown_item" value="AB">AB</option>
                    </select>
                        
                    
                    

                    <!-- 종교 -->
                    <select name="religion" class="select_dropdown_button"  v-model="select_religion_type" @blur="enable_religion_type()" @change="handle_religion_change($event)" :class="{'visible_dropdown_button' : !is_religion_enabled}">
                        <option v-if="!is_religion_enabled" class="dropdown_item" value="none" selected disabled hidden>종교</option>
                        <option class="dropdown_item" value="atheism">무교</option>
                        <option class="dropdown_item" value="Christian">기독교</option>
                        <option class="dropdown_item" value="buddhism">불교</option>
                        <option class="dropdown_item" value="Catholic">천주교</option>
                        <option class="dropdown_item" value="etc.">기타</option>
                    </select>

                    <!-- 주량 -->
                    <select class="select_dropdown_button">
                        <option class="dropdown_item" value="none" selected disabled hidden>주량</option>
                        <option class="dropdown_item" value="drinking">~1병</option>
                        <option class="dropdown_item" value="drinking">1병~</option>
                        <option class="dropdown_item" value="drinking">2병~</option>
                        <option class="dropdown_item" value="drinking">3병~</option>
                    </select>
                    <!-- 흡연 -->
                    <select class="select_dropdown_button">
                        <option class="dropdown_item" value="none" selected disabled hidden>흡연</option>
                        <option class="dropdown_item" value="yes_tartoo">흡연</option>
                        <option class="dropdown_item" value="none_tartoo">비흡연</option>
                    </select>
                    <!-- 문신 -->
                    <select class="select_dropdown_button">
                        <option class="dropdown_item" value="none" selected disabled hidden>문신</option>
                        <option class="dropdown_item" value="yes_tartoo">문신 허용</option>
                        <option class="dropdown_item" value="none_tartoo">문신 안됨</option>
                    </select>

                    
                    

                    <!-- 선택된 상태 -->
                    
                </div>


                <div class="sub_title3">
                    주소지
                </div>
                <div class="adress">
                    <div class="address_box">
                        <img src="icon/admin/search.svg" alt="">
                        <input type="text" placeholder="지번,도로명,건물명으로 검색"  class="input_address"/>
                    
                        <button type="submit" class="search_address">주소찾기</button>
                    </div>
                </div>
                <div class="sub_title3">
                    자기소개
                </div>
                <textarea class="intro">자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~
                </textarea>

            </div>
            <div class="container_bottom">
                <button class="next">다음으로</button>
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
            activeGender: 'male',  // 초기 활성화상태 '남' 
            is_mbti_enabled : false,
            is_blood_type_enabled : false,
            is_religion_enabled : false,
            is_tartoo_enabled : false,
            // isVisalbed : true,
            select_mbti: 'none', //초기 값
            select_blood_type :'none',
            select_religion_type :'none',
            select_tartoo_type: 'none',
        };
    },
    computed:{
        maleClass(){
            return this.activeGender === 'male' ? 'active' : 'inactive';
        },
        femaleClass(){
            return this.activeGender === 'female' ? 'active' : 'inactive';
        },
       

    },
    methods: {
        toggleGender(gender){
          this.activeGender = gender;
       },
        // MBTI
       enable_mbti(){
        this.is_mbti_enabled = false;
        // this.isEnabled = true;
        console.log("isEnabled" +" "+ this.isEnabled);
       },
       handle_mbti_change(event){
        this.selectedMBTI = event.target.value;
        console.log('Current MBTI:', this.select_mbti); // 콘솔에 현재 MBTI 출력
        this.is_mbti_enabled = true;
       },
       
       enable_blood_type(){
        this.is_blood_type_enabled = false;
        // this.isEnabled = true;
        console.log("isEnabled" +" "+ this.is_blood_type_enabled);
       },
       handle_blood_type_change(event){
        this.select_blood_type = event.target.value;
        console.log('Current Blood:', this.select_blood_type); // 콘솔에 현재 MBTI 출력
        this.is_blood_type_enabled = true;
       },

       enable_religion_type(){
        this.is_religion_enabled = false;
        // this.isEnabled = true;
        console.log("isEnabled" +" "+ this.is_religion_enabled);
       },
       handle_religion_change(event){
        this.select_religion_type = event.target.value;
        console.log('Current religion:', this.select_religion_type); // 콘솔에 현재 MBTI 출력
        this.is_religion_enabled = true;
       },
       //
       enable_tartoo_type(){
        this.is_tartoo_enabled = false;
        // this.isEnabled = true;
        console.log("isEnabled" +" "+ this.is_religion_enabled);
       },
       handle_tartoo_change(event){
        this.select_tartoo_type = event.target.value;
        console.log('Current religion:', this.select_tartoo_type); // 콘솔에 현재 MBTI 출력
        this.is_tartoo_enabled = true;
       },
       
    }
}
</script>

<style scoped>

    button{
        outline: none;
        background: none;
        border: none;
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
    textarea{
        height: 300px;
        border: none;
        resize: none;
        padding: 10px;
        text-align: start;
        overflow: hidden;
    }
    textarea:focus{
        overflow: auto;
    }
    
/* div */
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
        margin-top: 51px;
        border: 1px solid red;
        /* margin-bottom: 20px; */
    }

    div.container_middle{
        margin-top: 48px;
        border: 1px solid blue;
        display: flex;
        flex-direction: column; 
        /* gap: 10px; */
    }

    div.container_gen_age{
        border: 1px solid green;
        display: grid;
        grid-template-columns: 1fr 1fr;
         
    }

    div.gender{
        /* border: 1px solid red; */
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
        /* border: 1px solid red; */
        display: grid;
        grid-template-columns: 60px 2fr;
        justify-items: start;
        
    }

    div.sub_title{
        /* border: 1px solid red; */
         font-size: 16px;
        font-weight: 500;
        margin-left: 16px;
        text-align: start;
        align-content: center;
    }

    div.title{
        font-size: 24px;
        font-weight: 500;
        text-align: center;

    }
    div.sub_title2{
        /* border: 1px solid red; */
         font-size: 16px;
        font-weight: 500;
        /* margin-left: 16px; */
        text-align: start;
        align-content: center;
    
    }
    div.sub_title3{
        border: 1px solid red;
        font-size: 16px;
        font-weight: 500;
        /* margin-left: 16px; */
        text-align: start;
        align-content: center;
        margin-left: 17px;
        margin-bottom: 10px;
    }

    div.container_essential{
        border: 1px solid red;
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 1ex;
    }
    .container_essential div{
        /* border: 1px solid blue; */
    }

    div.adress{
        /* border: 1px solid red; */
        display: grid;
        /* grid-gap: 20px; */
        
        

    }
    div.address_box{
        border: 1px solid red;
        display: grid;
        /*grid-gap: 20px;*/
        position:relative;
        margin-left: 17px;
        margin-bottom: 30px;
        grid-gap: 20px;
        grid-template-columns: 440px 75px;
        /* border: 1px solid #6E7680; */
        height: 36px;
    }
    input.input_address{
        outline: none;
        /* border: none; */
        border: 1px solid #6E7680;
        padding-left: 42px;
        border-radius: 8px;
        
        
    }
    .search_address{
        background-color: var(--purple_main);
        color: #FFFFFF;
        border-radius: 10px;
        width: 74px;
        padding: 7px 14px;
        font-size: 12px;
        
    }
    img{
        position: absolute;
        margin-left: 12px;
        margin-top: 8px;
        width: 20px;
        height: 20px;
        
    }

    textarea.intro{
        border: 1px solid red;
        background: #F1EFF6;
        border-radius: 6px;
        margin-bottom: 30px;
        margin-left: 17px;
        margin-left: 13px;
        width: 540px;
    }

    div.container_bottom{
        /* border: 1px solid red; */

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
        margin-bottom:2px;
        width: 57px;
        height: 30px;
        border-radius: 7px;
        
    }
    .inactive{
        background:none;
        color: #111111;
        border: none;
        margin-top:2px;
        margin-bottom:2px;
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
        display: grid;
        margin-bottom: 20px;
        margin-left: 17px;
        margin-right: 20px;
        height: 36px;
        grid-template-columns: 80px 100px 60px;
        /* grid-template-columns: 1fr 1fr 1fr; */
        background-color:#FFFFFF;
        border: solid 1px var(--purple_main);
        border-radius: 6px;
        outline: no;
        box-shadow: 0px 1px 12px rgba(92, 9, 227, 0.28);
        align-content: center;
        /* outline: none; */
    }
    .dropdown{
        margin-top: 20px;
        margin-left: 17px;
        margin-right: 20px;

        height: 36px;
        border: solid 1px var(--purple_main);
        border-radius: 6px;
        align-content: center;

        /* box-shadow: 0px 1px 12px rgba(92, 9, 227, 0.28); */

        color: var(--purple_main);  
    }   
    .dropdown_toggle{
        /* padding: 10px; */
        border: 2px solid purple;
        background-color: white;
        cursor: pointer;
        outline: none;
        border-radius: 5px;
    }
    .dropdown_botten{
        color: var(--purple_main);
        /* border: 1px solid red; */
        text-align: start;
    }
    .select_dropdown_button{
        margin-bottom: 20px;
        margin-left: 17px;
        margin-right: 20px;
        appearance: none;
        padding-left: 12px;
        height: 36px;
        border: solid 1px var(--purple_main);
        border-radius: 6px;
        align-content: center;
        box-shadow: 0px 1px 12px rgba(92, 9, 227, 0.28);
        color: var(--purple_main);  
        outline: none;
    }

    .visible_dropdown_button{
        
        margin-bottom: 20px;
        margin-left: 17px;
        margin-right: 20px;
        appearance: none;
        padding-left: 12px;
        height: 36px;
        border: solid 1px #B3B3B3;
        border-radius: 6px;
        align-content: center;
        outline: none;
        color: #B3B3B3;  
        box-shadow: none;
    }
    .dropdown_item{
        /* outline: none; */
        border: none;
        
        cursor: pointer;
    } 


    .box_input{
        grid-gap: 10px;
        text-align: end;
        align-content: center;
        font-size: 14px;
        color: var(--purple_main);
        /* border: 1px solid blue; */
        border: none;
        outline: none;
        /* align-content: end; */
    }
    .box_tag{
        margin-left: 12px;
        text-align: start;
        align-content: center;
        color: var(--purple_main);
        font-size: 14px;
        
        /* border: 1px solid red; */
    }
    .box_end{
        /* margin-left: 12px; */
        text-align: start;
        align-content: center;
        color: var(--purple_main);
        font-size: 14px;
        /* border: 1px solid red; */
    }
    
   



    
    .next{
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
