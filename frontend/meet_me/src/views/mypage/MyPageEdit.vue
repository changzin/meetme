<template>
  <div class="safety_zone">
    <div class="container">
      <div class="title">프로필 수정</div>
      <div class="profile_image">
        <div v-for="(img, i) in userData.user_image_paths" :key="i">
          <img class="edit_profile" :src="img" />
        </div>
      </div>
      <div class="profile_info">
        <div class="name">
          {{ userData.user_nickname }},{{ userData.user_age }}
        </div>
        <div class="live">
          {{ userData.user_add }}
        </div>
        <div class="introduce">
          <input type="text" v-model="userData.user_introduction" />
        </div>
      </div>
      <div class="sub_title3">필수 입력</div>

      <!-- 입력 -->
      <div class="container_essential">
        <!-- 나이 -->
        <div
          class="select_box"
          :class="{
            select_box: activeInput === 'age',
            visible_select_box: activeInput !== 'age',
          }"
        >
          <label
            for="age"
            :class="{
              box_tag: activeInput === 'age',
              visible_box_tag: activeInput !== 'age',
            }"
            >나이</label
          >
          <input
            id="age"
            type="number"
            v-model="userData.user_age"
            @focus="setActive('age')"
            @blur="clearActive"
            class="select_input"
            :class="{
              select_input: activeInput === 'age',
              visible_input: activeInput !== 'age',
            }"
          />
          <label
            for="age"
            :class="{
              box_end: activeInput === 'age',
              visible_box_end: activeInput !== 'age',
            }"
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
          v-model="userData.user_annual_income_id"
          class="select_dropdown_button"
          @focus="setActive('annual_income')"
          @blur="clearActive"
          :class="{
            visible_dropdown_button: activeInput === 'annual_income',
            visible_dropdown_button: activeInput !== 'annual_income',
          }"
        >
          <option class="dropdown_item" value="none" selected disabled hidden>
            연봉
          </option>
          <option class="dropdown_item" v-for="(annual_income, i) in categoryList.user_annual_income_values" :key="i" :value="i + 1">
            {{ annual_income }}
          </option>
        </select>

        <!-- 키 -->
        <div
          class="select_box"
          :class="{
            select_box: activeInput === 'height',
            visible_select_box: activeInput !== 'height',
          }"
        >
          <label
            for="height"
            :class="{
              box_tag: activeInput === 'height',
              visible_box_tag: activeInput !== 'height',
            }"
            >키</label
          >
          <input
            id="height"
            type="number"
            v-model="userData.user_height"
            @focus="setActive('height')"
            @blur="clearActive"
            class="select_input"
            :class="{
              select_input: activeInput === 'height',
              visible_input: activeInput !== 'height',
            }"
          />
          <label
            for="height"
            :class="{
              box_end: activeInput === 'height',
              visible_box_end: activeInput !== 'height',
            }"
            >cm</label
          >
        </div>

        <!-- 몸무게 -->
        <div
          class="select_box"
          :class="{
            select_box: activeInput === 'weight',
            visible_select_box: activeInput !== 'weight',
          }"
        >
          <label
            for="weight"
            :class="{
              box_tag: activeInput === 'weight',
              visible_box_tag: activeInput !== 'weight',
            }"
            >몸무게</label
          >
          <input
            id="weight"
            type="number"
            v-model="userData.user_weight"
            @focus="setActive('weight')"
            @blur="clearActive"
            class="select_input"
            :class="{
              select_input: activeInput === 'weight',
              visible_input: activeInput !== 'weight',
            }"
          />
          <label
            for="weight"
            :class="{
              box_end: activeInput === 'weight',
              visible_box_end: activeInput !== 'weight',
            }"
            >kg</label
          >
        </div>

        <!-- v-if isVisible isEnabled 상태 구성 백단에서 불러온 데이터를 셀렉트에 넣기
                    @click 으로 선택되면 isEnabled 활성화 보라색으로 변환 @click 이 풀릴시 isVisible로 변환 -->
        <!-- 최종 선택된 데이터를 다음 버튼 클릭시 포스트로 서버에 전송 dB에 insert시킴 -->

        <!-- MBTI -->
        <select
          name="MBTI"
          class="select_dropdown_button"
          v-model="userData.user_mbti_id"
          @focus="setActive('MBTI')"
          @blur="clearActive"
          :class="{
            visible_dropdown_button: activeInput === 'MBTI',
            visible_dropdown_button: activeInput !== 'MBTI',
          }"
        >
          <option class="dropdown_item" value="none" selected disabled hidden>
            MBTI
          </option>
          <option
            class="dropdown_item"
            v-for="(mbti, i) in categoryList.user_mbti_values"
            :key="i"
            :value="i + 1"
          >
            {{ mbti }}
          </option>
        </select>

        <!-- 혈액형 -->
        <select
          name="blood_type"
          class="select_dropdown_button"
          v-model="userData.user_blood_type_id"
          @focus="setActive('blood_type')"
          @blur="clearActive"
          :class="{
            visible_dropdown_button: activeInput === 'blood_type',
            visible_dropdown_button: activeInput !== 'blood_type',
          }"
        >
          <option class="dropdown_item" value="none" selected disabled hidden>
            혈액형
          </option>
          <option
            class="dropdown_item"
            v-for="(blood, i) in categoryList.user_blood_type_values"
            :key="i"
            :value="i + 1"
          >
            {{ blood }}
          </option>
        </select>

        <!-- 종교 -->
        <select
          name="religion"
          class="select_dropdown_button"
          v-model="userData.user_religion_id"
          @focus="setActive('religion')"
          @blur="clearActive"
          :class="{
            visible_dropdown_button: activeInput === 'religion',
            visible_dropdown_button: activeInput !== 'religion',
          }"
        >
          <option class="dropdown_item" value="none" selected disabled hidden>
            종교
          </option>
          <option
            class="dropdown_item"
            v-for="(religion, i) in categoryList.user_religion_values"
            :key="i"
            :value="i + 1"
          >
            {{ religion }}
          </option>
        </select>

        <!-- 주량 -->
        <select
          name="drinking"
          class="select_dropdown_button"
          v-model="userData.user_drinking_id"
          @focus="setActive('drinking')"
          @blur="clearActive"
          :class="{
            visible_dropdown_button: activeInput === 'drinking',
            visible_dropdown_button: activeInput !== 'drinking',
          }"
        >
          <option class="dropdown_item" value="none" selected disabled hidden>
            주량
          </option>
          <option
            class="dropdown_item"
            v-for="(drinking, i) in categoryList.user_drinking_values"
            :key="i"
            :value="i + 1"
          >
            {{ drinking }}
          </option>
        </select>

        <!-- 흡연 -->
        <select
          name="smoke"
          class="select_dropdown_button"
          v-model="userData.user_smoke"
          @focus="setActive('smoke')"
          @blur="clearActive"
          :class="{
            visible_dropdown_button: activeInput === 'smoke',
            visible_dropdown_button: activeInput !== 'smoke',
          }"
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
          class="select_dropdown_button"
          v-model="userData.user_tartoo"
          @focus="setActive('tartoo')"
          @blur="clearActive"
          :class="{
            visible_dropdown_button: activeInput === 'tartoo',
            visible_dropdown_button: activeInput !== 'tartoo',
          }"
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
            <img
              src="icon/profile/search.svg"
              class="search-icon"
              alt="Search"
            />
            <input
              type="text"
              v-model="userData.user_add"
              class="input-address"
            />
          </div>
          <button type="submit" class="search-button" @click="zipload()">주소 변경</button>
        </div>

        <!-- </div> -->
      </div>
      <div class="sub_title3">특징</div>

        <div class="feature_box">
            <div v-for="(feature, i) in userData.user_feature_ids" :key="i">
                <div class="select_box2">{{this.featureList[feature-1]}}</div>
            </div>
        </div>
      

      <div class="class_button" @click="edit()">
        <span class="class">수정하기</span>
      </div>
    </div>
    <MeetHeader />
  </div>
</template>
<script>
export default {
  data() {
    return {
      sampleData: "",
      userData: {},
      activeGender: "male", // 초기 활성화상태 '남'
      activeInput: null,
      categoryList: {},
      featureList: {},
    };
  },
  beforeCreate() {},
  async created() {
    this.getUser();
    this.getCategory();
  },
  beforeMount() {},
  mounted() {
    this.loadDaumPostcodeScript() 
  },
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  computed: {
    maleClass() {
      return this.activeGender === "male" ? "active" : "inactive";
    },
    femaleClass() {
      return this.activeGender === "female" ? "active" : "inactive";
    },
  },
  methods: {
    async getUser() {
      try {
        const result = await this.$api(
          `/user/profileinfo`,
          { user_id: 1 },
          "POST"
        );
        this.userData = result.user;
        console.log(this.userData);
      } catch (err) {
        console.log(err);
      }
    },
    async getCategory() {
      try {
        const result = await this.$api(`/user/getcategory`, {}, "POST");
        this.categoryList = result.categoryList;
        this.featureList = result.categoryList.user_feature_values;
        console.log(this.categoryList);
      } catch (err) {
        console.log(err);
      }
    },
    toggleGender(gender) {
      this.activeGender = gender;
    },
    setActive(inputName) {
      this.activeInput = inputName;
    },
    clearActive() {
      this.activeInput = null;
    },
    async edit() {
      const userInfo = this.userData;
      console.log(userInfo);
      try {
        await this.$api(
          `/user/updateprofile`,
          { userInfo, user_id: 1 },
          "POST"
        );
        this.getUser();

      } catch (err) {
        console.log(err);
      }
    },
    loadDaumPostcodeScript(){
       const script = document.createElement('script');
       script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
       script.onload = () => {
        this.isScriptLoaded = true;
       };
       document.head.appendChild(script);
    },
    zipload(){
        if (window.daum && window.daum.Postcode) {
            if(!this.userData.user_add){
                new window.daum.Postcode({
                    oncomplete: (data) => {
                    console.log(data);
                    const add1 = data.sido;
                    const add2 = data.sigungu;
                    this.userData.user_add = `${add1} ${add2}`;
                    }
                }).open();
            }else {
                new window.daum.Postcode({
                    oncomplete: (data) => {
                    console.log(data)
                    const add1 = data.sido;
                    const add2 = data.sigungu;
                    this.userData.user_add = `${add1} ${add2}`;
                    }
                }).open();
            }
        } else {
        console.error("Daum Postcode 스크립트가 로드되지 않았습니다.");
        }
    },
    // async getFeature(index){
    //   try{
    //     if(){

    //     }
    //   }catch(err){
    //   console.log(err);
    // }
    // }
  },
};
</script>
<style scoped>
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

.container {
  min-width: 600px;
  padding: 0 15px 0 15px;
  justify-content: center;
  display: grid;
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
.select_box {
  display: grid;
  color: var(--purple_main);
  height: 36px;
  grid-template-columns: 80px 100px 60px;
  background-color: #ffffff;
  border: solid 1px var(--purple_main);
  border-radius: 6px;
  outline: none;
  box-shadow: 0px 1px 12px rgba(92, 9, 227, 0.28);
  align-content: center;
  /* outline: none; */
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

.select_dropdown_button {
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