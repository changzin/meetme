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
                <div class="sub_title2">
                    필수 입력
                </div>
                <div class="container_essential">
                    <div class="select_box">
                        <label for="text" class="box_tag">연봉</label>
                         <input type="number" class="box_input" value="연봉">
                         <label for="text" class="box_end">만원</label>
                    </div>
                   
                    
                        <!-- <span>MBTI</span> -->
                     <div class="dropdown"> 
                        <button class="dropdown_toggle"></button>
                        <ul class="dropdown_menu">
                            <li class="dropdown_item">ESFJ</li>
                            <li class="dropdown_item" >ISFP</li>
                            <li class="dropdown_item" >ESTP</li>
                            <li class="dropdown_item">ISFJ</li>
                            <li class="dropdown_item">ISFJ</li>
                        </ul>
                    </div> 
                    
                    <div class="dropdown">박스</div>
                    <div class="dropdown">박스</div>
                    <div class="dropdown">박스</div>
                    <div class="dropdown">박스</div>
                    <div class="select_box">
                        <label for="text" class="box_tag">키</label>
                         <input type="number" class="box_input" value="키">
                         <label for="text" class="box_end">cm</label>
                    </div>
                    <div class="select_box">
                        <label for="text" class="box_tag">몸무게</label>
                         <input type="number" class="box_input" value="몸무게">
                         <label for="text" class="box_end">kg</label>
                        </div>
                </div>
                <div class="sub_title2">
                    주소지
                </div>
                <div class="adress">
                    <input type="text" placeholder="주소검색"  class="input_address"/>
                    <input type="submit" class="search_address" value="주소 찾기"/>
                </div>
                <div class="sub_title2">
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
       },
       toggleDropdown(){
        let dropdownMenu = document.querySelector('.dropdown_menu');
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
       },
        updateMBTI(mbti) {
    // 드롭다운 버튼 텍스트 업데이트
        document.querySelector('.dropdown-toggle').textContent = mbti;
    // 오른쪽 텍스트 필드 업데이트
        document.getElementById('selected-mbti').textContent = mbti;
        }
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
    btn{
        border:none;
        display: grid;
        outline: none;
        /* grid-template-columns: 150px 110px; */
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

    textarea.intro{
        /* border: 1px solid red; */
        background: #F1EFF6;
        border-radius: 6px;
        margin-bottom: 30px;

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
        display: grid;
        margin-top: 10px;
        margin-left: 17px;
        margin-right: 20px;
        height: 36px;
        grid-template-columns: 80px 100px 60px;
        /* grid-template-columns: 1fr 1fr 1fr; */
        background-color:#FFFFFF;
        border: solid 1px var(--purple_main);
        border-radius: 6px;
        box-shadow: 0px 1px 12px rgba(92, 9, 227, 0.28);
        align-content: center;
        /* outline: none; */
    }
    .dropdown{
        /* position: relative; */
        
         /* display: grid; */
        margin-top: 10px;
        margin-left: 17px;
        margin-right: 20px;
        /* padding-left: 14px; */
        height: 36px;
        border: solid 1px var(--purple_main);
        border-radius: 6px;
        align-content: center;
        /* text-align:  */
        box-shadow: 0px 1px 12px rgba(92, 9, 227, 0.28);
         /* grid-template-columns: 1fr 1fr;  */
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
        border: 1px solid red;
        text-align: start;
    }
    .dropdown_menu{
        /* border:1px solid blue; */
        text-align: end;
        display: none;
        /* position: absolute; */
        background-color: white;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        z-index: 1;
    }
    .dropdown_item{
        /* width: 70px; */
        /* font-size: 16px;
        color: var(--purple_main);
        margin-right: 12px;
        text-align: end;
        align-content: center;
        /* border: 1px solid red; */
        padding: 12px 20px;
        display: block;
        width: 100%;
        border: none;
        background: none;
        cursor: pointer;
    } 
        /* 호버 시 드롭다운 메뉴 보이기 */
    /* .dropdown:hover .dropdown_menu {
        display: block;
    }

    /* 드롭다운 아이템 호버 스타일 */
    /* .dropdown_item:hover { */
    /* background-color: #f1f1f1; */
    /* } */

    .box_input{
        grid-gap: 10px;
        text-align: end;
        align-content: center;
        font-size: 16px;
        color: var(--purple_main);
        border: 1px solid blue;
        /* align-content: end; */
    }
    .box_tag{
        margin-left: 12px;
        text-align: start;
        align-content: center;
        color: var(--purple_main);
        border: 1px solid red;
    }
    .box_end{
        /* margin-left: 12px; */
        text-align: start;
        align-content: center;
        color: var(--purple_main);
        border: 1px solid red;
    }
    
   



    input.input_address{
        border: 1px solid #6E7680;
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
