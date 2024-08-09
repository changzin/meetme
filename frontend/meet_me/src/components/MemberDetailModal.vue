<template>
  <div>
    <div
      class="modal-overlay"
      @click="handleOverlayClick"
    >
      <div class="modal-popup" ref="modalPopup" @click.stop>
        <div class="modal-popup-header-text">
          <div style="width:20px;"></div>
          
        <img
          src="/icon/main_recommend/delete.svg"
          @click="x_click"
          class="x_click_div"
        />
        </div>
        <div class="container">
          <div class="title">프로필 상세</div>
          
          <div class="sub_title3">상세 보기</div>
          <div class="container_essential">
            <!-- 나이 -->
            <div
              class="visible_select_box"
            >
              <label
                for="age"
                >나이</label
              >
              <input
                id="age"
                type="number"
                class="select_input"
              />
              <label
                for="age"
                >세</label
              >
            </div>

            <!-- 연봉 -->
            <!-- <div class="select_box" :class="{'select_box': activeInput ==='annual_income' ,'visible_select_box' : activeInput !== 'annual_income'  }">
                            <label for="annual_income" :class="{'box_tag': activeInput ==='annual_income' ,'visible_box_tag' : activeInput !== 'annual_income'  }" >연봉</label>
                            <input id="annual_income" type="number" @focus="setActive('annual_income')" @blur="clearActive" class="select_input" :class="{'select_input': activeInput ==='annual_income' ,'visible_input' : activeInput !== 'annual_income' }" >
                            <label for="annual_income" :class="{'box_end': activeInput ==='annual_income' ,'visible_box_end' : activeInput !== 'annual_income'  }">만원</label>
                        </div>  -->

            <select
              name="annual_income"
              class="visible_dropdown_button"
            >
              <option class="dropdown_item" value="none" selected disabled hidden>
                연봉
              </option>
            </select>

            <!-- 키 -->
            <div
              class="visible_select_box"
            >
              <label
                for="height"
                >키</label
              >
              <input
                id="height"
                type="number"
              />
              <label
                for="height"
                >cm</label
              >
            </div>

            <!-- 몸무게 -->
            <div
              class="visible_select_box"
            >
              <label
                for="weight"
                >몸무게</label
              >
              <input
                id="weight"
                type="number"
              />
              <label
                for="weight"
                >kg</label
              >
            </div>

            <!-- v-if isVisible isEnabled 상태 구성 백단에서 불러온 데이터를 셀렉트에 넣기
                        @click 으로 선택되면 isEnabled 활성화 보라색으로 변환 @click 이 풀릴시 isVisible로 변환 -->
            <!-- 최종 선택된 데이터를 다음 버튼 클릭시 포스트로 서버에 전송 dB에 insert시킴 -->

            <!-- MBTI -->
            <select
              name="MBTI"
              class="visible_dropdown_button"
            >
              <option class="dropdown_item" value="none" selected disabled hidden>
                MBTI
              </option>
            </select>

            <!-- 혈액형 -->
            <select
              name="blood_type"
              class="visible_dropdown_button"
              disabled
            >
              <option class="dropdown_item" value="none" selected disabled hidden>
                혈액형
              </option>
            </select>

            <!-- 종교 -->
            <select
              name="religion"
              class="visible_dropdown_button"
            >
              <option class="dropdown_item" value="none" selected disabled hidden>
                종교
              </option>
            </select>

            <!-- 주량 -->
            <select
              name="drinking"
              class="visible_dropdown_button"
            >
              <option class="dropdown_item" value="none" selected disabled hidden>
                주량
              </option>
            </select>

            <!-- 흡연 -->
            <select
              name="smoke"
              class="visible_dropdown_button"
            >
              <option class="dropdown_item" value="none" selected disabled hidden>
                흡연 여부
              </option>
              <option class="dropdown_item" value="T">흡연</option>
              <option class="dropdown_item" value="F">비흡연</option>
            </select>

            <!-- 문신 -->
            <select
              name="tartoo"
              class="visible_dropdown_button"
            >
              <option class="dropdown_item" value="none" selected disabled hidden>
                문신 여부
              </option>
              <option class="dropdown_item" value="T">문신 허용</option>
              <option class="dropdown_item" value="F">문신 안됨</option>
            </select>
            <!-- 선택된 상태 -->
          </div>
          
          <div class="address_title">주소지</div>
          <div class="address">

            <div class="search-container">
              <div class="input-wrapper">
                <input
                  type="text"
                  class="input-address"
                />
              </div>
            </div>

            <!-- </div> -->
          </div>
          <div class="address_title">자기소개</div>
          <div class="introduce">
              <input type="text" placeholder="asdf">
          </div>

          <div class="address_title">프로필 사진</div>
          <div class="profile_image">
            <!-- <div v-for="(img, i) in 6" :key="i">
              <img class="edit_profile" :src="profile[i] ? this.$imageFileFormat(profile[i]) : '/model.jpg'"/>
            </div> -->
            
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props:{
    data: {
      type:Object,
      default: function(){
                return {
                  userData: [
                    {
                      user_nickname: "#",
                      report_content: "#",
                    }
                  ]
                };
          } 
    }
  },
  methods: {
    x_click() {
      this.$emit("close");
    },

    handleOverlayClick(event) {
      // 모달 팝업이 아닌 영역을 클릭한 경우 모달을 닫음
      if (!this.$refs.modalPopup.contains(event.target)) {
        this.$emit("close");
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px); /* 블러 효과 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 배경을 덮도록 z-index 설정 */
}

.modal-popup {
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 800px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  border-radius: 12px;
  overflow: scroll;
  padding: 10px;
  /* visibility: collapse; */
  flex-direction: column;
  
}
.modal-popup::-webkit-scrollbar {
        display: none;
}   
.modal-popup-header-text{
  display:flex;
  justify-content: space-between;

}
td{
    padding:0px;
    border-spacing: 0px;  
    border: 0px solid black;
}
.x_click_div {
  width: 20px;
  height: 20px;
}
tr{
    height:44px;
}
.tr_gray{
    background-color: #F2F3F5;
}
.tr_white{
    background-color: #FFFFFF;
}
tbody tr:hover{
    background-color: #EBEBFF;
}
tbody tr:last-child td:first-child{
    border-bottom-left-radius: 8px;
}
tbody tr:last-child td:last-child{
    border-bottom-right-radius: 8px;
}
button {
  outline: none;
  background: none;
  border: none;
}
input {
  border: none;
  outline: none;
}
input[type="number"]::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
textarea {
  height: 300px;
  border: none;
  resize: none;
  padding: 20px;
  text-align: start;
  overflow: hidden;
}
textarea:focus {
  overflow: auto;
}


.title {
  font-size: 24px;
  font-weight: 700;
  padding: 30px 0 15px 0;
  margin: 0;
}

.profile_image {
  width: 570px;
  min-width: 570px;
  height: 360px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 8px 0 8px;
}

.edit_profile {
  width: 150px;
  height: 150px;
  margin: 15px;
  border-radius: 10px;
  object-fit: cover;
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
  background-color: #f1eff6;
  padding: 20px;
  text-align: left;
  margin-bottom:30px;
}

.introduce input {
  background-color: rgba(216, 191, 216, 0);
  cursor: pointer;
}

div.sub_title3 {
  /* border: 1px solid red; */
  font-size: 16px;
  font-weight: 500;
  /* margin-left: 16px; */
  text-align: start;
  align-content: center;
  margin-left: 17px;
  margin-bottom: 10px;
}

div.container_essential {
  /* border: 1px solid red; */
  display: grid;
  padding: 15px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1ex;
  row-gap: 20px;
  column-gap: 20px;
}
.container_essential div {
  /* border: 1px solid blue; */
}

.address {
  /* border: 1px solid red; */
  display: grid;
  width: 570px;
  /* grid-gap: 20px; */
}
.address_box {
  /* border: 1px solid red; */
  display: grid;
  /*grid-gap: 20px;*/
  position: relative;
  margin-left: 17px;
  margin-bottom: 30px;
  grid-gap: 20px;
  grid-template-columns: 440px 75px;

  /* border: 1px solid #6E7680; */
  height: 36px;
}

.address_title {
  font-size: 16px;
  font-weight: 500;
  text-align: start;
  align-content: center;
  margin-left: 17px;
  margin-bottom: 12px;
}

.search-container {
  display: flex;
  align-items: center;
  padding: 0 15px;
  padding-bottom: 30px;
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  flex-grow: 1;
  margin-right: 10px;
}

.search-icon {
  position: absolute;
  left: 10px;
  width: 24px;
  height: 24px;
}

.input-address {
  width: 100%;
  padding: 10px 10px 10px 50px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  border: 1px solid #6E7680;
}

.search-button {
  background-color: var(--purple_main);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 7px 14px;
  font-size: 12px;
  cursor: pointer;
}

/* .input_address {
  outline: none;
  padding-bottom: 1px;
  border: 1px solid #6e7680;
  padding-left: 42px;
  border-radius: 8px;
  height: 36px;
  align-content: center;
  width: 100%;
}
.search_address {
  margin-top: 3px;
  background-color: var(--purple_main);
  color: #ffffff;
  border-radius: 10px;
  align-content: center;
  justify-content: center;
  width: 74px;
  height: 30px;
  font-size: 12px;
  box-sizing: border-box;
} */

textarea.intro {
  background: #f1eff6;
  border-radius: 6px;
  margin-bottom: 30px;
  margin-left: 15px;
  margin-right: 15px;
  width: 540px;
}

div.container_bottom {
  /* border: 1px solid red; */
}
/* div.sub_title{
        font-size: 16px;
        font-weight: 500px;
        margin-left: 17px;
        text-align: start;
    } */
.active {
  background-color: var(--purple_main);
  color: #ffffff;
  border: none;
  margin-top: 2px;
  margin-bottom: 2px;
  width: 57px;
  height: 30px;
  border-radius: 7px;
}
.inactive {
  background: none;
  color: #111111;
  border: none;
  margin-top: 2px;
  margin-bottom: 2px;
  width: 57px;
  height: 30px;
}
.age_input_box {
  /* position: relative; */
  /* display: inline-block; */
  /* margin-left: 31px; */
  width: 102px;
  background-color: #d9d9d9;
  border-radius: 9px;
}
.age_input {
  padding-top: 5px;
  /* padding-left: 10px; */
  background: none;
  text-align: end;
  width: 40px;
}

.visible_select_box {
  display: grid;
  height: 36px;
  grid-template-columns: 80px 100px 60px;
  /* background-color:#B3B3B3; */
  border: solid 1px #b3b3b3;
  border-radius: 6px;
  outline: none;
  box-shadow: none;
  align-content: center;
  color: #979797;

  /* outline: none; */
}
.select_nickname_box {
  color: var(--purple_main);
  height: 36px;
  background-color: #ffffff;
  border: solid 1px var(--purple_main);
  border-radius: 6px;
  outline: none;
  box-shadow: 0px 1px 12px rgba(92, 9, 227, 0.28);
  align-content: center;
  /* outline: none; */
}
.visible_select_nickname_box {
  height: 36px;
  /* background-color:#B3B3B3; */
  border: solid 1px #b3b3b3;
  border-radius: 6px;
  outline: none;
  box-shadow: none;
  align-content: center;

  /* outline: none; */
}

.box_tag {
  margin-left: 12px;
  text-align: start;
  align-content: center;
  color: var(--purple_main);
  font-size: 14px;

  /* border: 1px solid red; */
}
.visible_box_tag {
  margin-left: 12px;
  text-align: start;
  align-content: center;
  color: #b3b3b3;
  font-size: 14px;

  /* border: 1px solid red; */
}
.box_end {
  /* margin-left: 12px; */
  text-align: start;
  align-content: center;
  color: var(--purple_main);
  font-size: 14px;
  /* border: 1px solid red; */
}
.visible_box_end {
  /* margin-left: 12px; */
  text-align: start;
  align-content: center;
  color: #b3b3b3;
  font-size: 14px;
  /* border: 1px solid red; */
}
.select_input {
  color: var(--purple_main);
  font-size: 14px;
  text-align: end;
}
.visible_input {
  color: #979797;
  font-size: 14px;
  text-align: end;
}
.select_nickname_input {
  color: var(--purple_main);
  font-size: 14px;
  text-align: start;
}
.visible_nickname_input {
  color: #979797;
  font-size: 14px;
  text-align: start;
}


.visible_dropdown_button {
  /* margin-right: 20px; */
  appearance: none;
  padding-left: 12px;
  height: 36px;
  border: solid 1px #b3b3b3;
  border-radius: 6px;
  align-content: center;
  outline: none;
  color: #b3b3b3;
  box-shadow: none;
}
.dropdown_item {
  /* outline: none; */
  border: none;

  cursor: pointer;
}
.box_input {
  /* grid-gap: 10px; */
  text-align: center;
  align-content: center;
  font-size: 14px;
  color: var(--purple_main);
  box-shadow: 0px 1px 12px rgba(92, 9, 227, 0.28);
  border: var(--purple_main);
  border: none;
  outline: none;
  /* position: relative; */
  /* align-content: end; */
}
.visible_box_input {
  /* grid-gap: 10px; */
  text-align: center;
  align-content: center;
  font-size: 14px;
  color: #b3b3b3;
  border: 1px solid #b3b3b3;
  border: 1px solid blue;
  /* border: none; */
  /* outline: none; */
  box-shadow: none;
  /* position: relative; */
  /* align-content: end; */
}
select option {
  color: #979797;
  background-color: #ffffff;
  border: 1px solid #ebebeb;
}

.feature_box{
        display: grid;
        grid-template-columns : repeat(auto-fit,minmax(120px,1fr));
        gap:15px; /* 그리드 아이템 사이의 간격 */
        align-content: center;
        justify-items: stretch;
        /* border: 1px ssolid green; */
        margin: 15px;
        margin-bottom: 30px;
        
    }
    
    .select_box2{
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

.class_button {
  border-radius: 10px;
  width: 540px;
  height: 60px;
  margin: 0 auto;
  background-image: linear-gradient(to right, #497af5, #884afb);
  display: flex;
  justify-content: center;
  align-items: center;
}

.class {
  color: #f1eff6;
}
</style>