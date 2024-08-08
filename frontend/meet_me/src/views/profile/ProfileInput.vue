<template>
  <div class="container0">
    <div class="card_box">
      <div class="container_top">
        <div class="title">프로필 입력</div>
      </div>
      <div class="container_middle">
        <div class="container_gen_age">
          <div class="gender">
            <div class="sub_title">닉네임</div>
            <div
              class="select_nickname_box"
              :class="{
                select_nickname_box: activeInput === 'nickname',
                visible_select_nickname_box: activeInput !== 'nickname',
              }"
              style="width: 198px"
            >
              <input
                id="nickname"
                type="text"
                @focus="setActive('nickname')"
                @blur="clearActive"
                class="select_nickname_input"
                :class="{
                  select_nickname_input: activeInput === 'nickname',
                  visible_nickname_input: activeInput !== 'nickname',
                }"
                placeholder="닉네임을 입력해주세요"
                v-model="inputNickname"
              />
            </div>
          </div>
          <div class="gender">
            <div class="sub_title">성별</div>
            <div class="select_gender">
              <button :class="maleClass" @click="toggleGender('M')">남</button>
              <button :class="femaleClass" @click="toggleGender('F')">
                여
              </button>
            </div>
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
              @focus="setActive('age')"
              @blur="clearActive"
              class="select_input"
              :class="{
                select_input: activeInput === 'age',
                visible_input: activeInput !== 'age',
              }"
              v-model="inputAge"
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
              @focus="setActive('height')"
              @blur="clearActive"
              class="select_input"
              :class="{
                select_input: activeInput === 'height',
                visible_input: activeInput !== 'height',
              }"
              v-model="inputHeight"
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
              @focus="setActive('weight')"
              @blur="clearActive"
              class="select_input"
              :class="{
                select_input: activeInput === 'weight',
                visible_input: activeInput !== 'weight',
              }"
              v-model="inputWeight"
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

          <select
            id="annual_income"
            class="select_dropdown_button"
            @focus="setActive('annual_income')"
            @blur="clearActive"
            :class="{
              visible_dropdown_button: activeInput === 'annual_income',
              visible_dropdown_button: activeInput !== 'annual_income',
            }"
            v-model="selectAnnualIncome"
          >
            <option class="dropdown_item" value="null" selected disabled hidden>
              연봉
            </option>
            <option
              class="dropdown_item"
              v-for="(
                annual_income, i
              ) in categoryList.user_annual_income_values"
              :key="i"
              :value="i + 1"
            >
              {{ annual_income }}
            </option>
          </select>

          <select
            id="MBTI"
            class="select_dropdown_button"
            @focus="setActive('MBTI')"
            @blur="clearActive"
            :class="{
              visible_dropdown_button: activeInput === 'MBTI',
              visible_dropdown_button: activeInput !== 'MBTI',
            }"
            v-model="selectedMbti"
          >
            <option class="dropdown_item" value="null" selected disabled hidden>
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
            id="blood_type"
            class="select_dropdown_button"
            @focus="setActive('blood_type')"
            @blur="clearActive"
            :class="{
              visible_dropdown_button: activeInput === 'blood_type',
              visible_dropdown_button: activeInput !== 'blood_type',
            }"
            v-model="selectedBloodType"
          >
            <option class="dropdown_item" value="null" selected disabled hidden>
              혈액형
            </option>
            <option
              class="dropdown_item"
              v-for="(blood_type, i) in categoryList.user_blood_type_values"
              :key="i"
              :value="i + 1"
            >
              {{ blood_type }}
            </option>
          </select>

          <!-- 종교 -->
          <select
            id="religion"
            class="select_dropdown_button"
            @focus="setActive('religion')"
            @blur="clearActive"
            :class="{
              visible_dropdown_button: activeInput === 'religion',
              visible_dropdown_button: activeInput !== 'religion',
            }"
            v-model="selectedReligion"
          >
            <option class="dropdown_item" value="null" selected disabled hidden>
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
            id="drinking"
            class="select_dropdown_button"
            @focus="setActive('drinking')"
            @blur="clearActive"
            :class="{
              visible_dropdown_button: activeInput === 'drinking',
              visible_dropdown_button: activeInput !== 'drinking',
            }"
            v-model="selectedDrinking"
          >
            <option class="dropdown_item" value="null" selected disabled hidden>
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
            id="smoke"
            class="select_dropdown_button"
            @focus="setActive('smoke')"
            @blur="clearActive"
            :class="{
              visible_dropdown_button: activeInput === 'smoke',
              visible_dropdown_button: activeInput !== 'smoke',
            }"
            v-model="selectedSmoke"
          >
            <option class="dropdown_item" value="null" selected disabled hidden>
              흡연 여부
            </option>
            <option class="dropdown_item" value="T">흡연</option>
            <option class="dropdown_item" value="F">비흡연</option>
          </select>

          <!-- 문신 -->
          <select
            id="tartoo"
            class="select_dropdown_button"
            @focus="setActive('tartoo')"
            @blur="clearActive"
            :class="{
              visible_dropdown_button: activeInput === 'tartoo',
              visible_dropdown_button: activeInput !== 'tartoo',
            }"
            v-model="selectedTartoo"
          >
            <option class="dropdown_item" value="null" selected disabled hidden>
              문신 여부
            </option>
            <option class="dropdown_item" value="T">문신 있음</option>
            <option class="dropdown_item" value="F">문신 없음</option>
          </select>
        </div>

        <div class="sub_title3" style="margin-top: 5px">주소지</div>
        <div class="adress">
          <div class="address_box">
            <img src="icon/profile/search.svg" alt="" />
            <input
              id="address"
              type="text"
              placeholder="지번,도로명,건물명으로 검색"
              class="input_address"
              v-model="inputUserAddress"
            />

            <button type="submit" class="search_address" @click="zipload()">
              주소찾기
            </button>
          </div>
        </div>
        <div class="sub_title3">자기소개</div>
        <textarea
          id="userintroduction"
          class="select_intro"
          v-model="inputUserIntroduction"
          @focus="setActive('intro')"
          @blur="clearActive"
          :class="{
            visible_select_intro: activeInput === 'intro',
            visible_select_intro: activeInput !== 'intro',
          }"
        >
자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~~~~~~~자기소개해봐~~~~~
                </textarea
        >
      </div>
      <div class="container_bottom">
        <button class="next" @click="validateAndPostProfile()">다음으로</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      activeGender: "M", // 초기 활성화상태 '남'
      activeInput: null,
      categoryList: {},
      inputDatas : [],
      inputs:[],
      //항목 선택
      selectGender: null,
      selectAnnualIncome: null,
      selectedMbti: null,
      selectedBloodType:null,
      selectedReligion: null,
      selectedDrinking: null,
      selectedSmoke: null,
      selectedTartoo: null,
      //input
      inputNickname: null,
      inputAge: null,
      inputWeight: null,
      inputHeight: null,
      inputUserIntroduction: null,
      inputUserAddress: null,
      user_id: 26,
    };
  },
  async created() {
    // this.getUser();
    this.getCategory();
  },
  mounted() {
    this.loadDaumPostcodeScript();
  },
  computed: {
    maleClass() {
      return this.activeGender === "M" ? "active" : "inactive";
    },
    femaleClass() {
      return this.activeGender === "F" ? "active" : "inactive";
    },
  },
  methods: {
    async getCategory() {
      try {
        const result = await this.$api(`/user/profile`, {}, "POST");
        this.categoryList = result.categoryList;
        console.log(this.categoryList);
      } catch (err) {
        console.log(err);
      }
    },
    validateInputs() {
       this.inputDatas = {
        user_nickname: this.inputNickname,
        user_gender: this.selectGender,
        user_age: this.inputAge,
        user_height: this.inputHeight,
        user_weight: this.inputWeight,
        user_annual_income: this.selectAnnualIncome,
        user_mbti: this.selectedMbti,
        user_blood_type: this.selectedBloodType,
        user_religion: this.selectedReligion,
        user_drinking: this.selectedDrinking,
        user_smoke: this.selectedSmoke,
        user_tartoo: this.selectedTartoo,
        user_address: this.inputUserAddress,
        user_introduction: this.inputUserIntroduction,
      };
      let inputs = this.inputDatas
      console.log(inputs)
      for (let key in inputs) {
        if (
          inputs[key] === null ||
          inputs[key] === "" ||
          inputs[key] === "none"
        ) {
          // let keyKorenName = this.korean(key);
          console.error(`${key} 입력값이 유효하지 않습니다.`);
          // alert(keyKorenName + "" + "정보를 입력해주세요");

          return false;
        } else if (
          inputs[key] !== null ||
          inputs[key] !== "" ||
          inputs[key] !== "none"
        ) {
          console.log(`${key} 입력` )
          return true;
        }
      }
    },
    korean(category) {
      if (category == "user_nickname") {
        return "닉네임";
      }
      if (category == "user_gender") {
        return "성별";
      }
      if (category == "user_age") {
        return "나이";
      }
      if (category == "user_height") {
        return "키";
      }
      if (category == "user_weight") {
        return "몸무게";
      }
      if (category == "user_annual_income") {
        return "MBTI";
      }
      if (category == "user_mbti") {
        return "MBTI";
      }
      if (category == "user_blood_type") {
        return "혈액형";
      }
      if (category == "user_religion") {
        return "종교";
      }
      if (category == "user_drinking") {
        return "주량";
      }
      if (category == "user_smoke") {
        return "흡연 여부";
      }
      if (category == "user_tartoo") {
        return "문신 여부";
      }
      if (category == "user_address") {
        return "주소";
      }
      if (category == "user_introduction") {
        return "자기 소개";
      }
    },
    async validateAndPostProfile() {
      if ( this.validateInputs()!== null) {
        this.postUserProfile();
      } else {
        alert(" dd")
        console.log(this.validateInputs());
      }
    },

    async postUserProfile() {
      try {
        const requestBody = {
          access_token: this.$getAccessToken(),
          user_nickname: this.inputNickname,
          user_gender: this.selectGender,
          user_age: this.inputAge,
          user_mbti_id: this.selectedMbti,
          user_blood_type_id: this.selectedBloodType,
          user_height: this.inputHeight,
          user_weight: this.inputWeight,
          user_annual_income_id: this.selectAnnualIncome,
          user_smoke: this.selectedSmoke,
          user_drinking_id: this.selectedDrinking,
          user_tartoo: this.selectedTartoo,
          user_religion_id: this.selectedReligion,
          user_introduction: this.inputUserIntroduction,
          user_add: this.inputUserAddress,
        };
        const request = await this.$api(
          "/user/profileinput",
          requestBody,
          "POST"
        );
        console.log(request);
        if (request.status === 200) {
          this.$router.push({
            name: "idol",
          });
        }
      } catch (err) {
        alert("정보를 입력해주세요");
        console.log(err);
      }
    },

    //성별 선택
    toggleGender(gender) {
      this.activeGender = gender;
      this.selectGender = this.activeGender;
      console.log(this.selectGender);
    },
    loadDaumPostcodeScript() {
      const script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = () => {
        this.isScriptLoaded = true;
      };
      document.head.appendChild(script);
    },
    zipload() {
      if (window.daum && window.daum.Postcode) {
        if (!this.inputUserAddress) {
          new window.daum.Postcode({
            oncomplete: (data) => {
              console.log(data);
              const add1 = data.sido;
              const add2 = data.sigungu;
              this.inputUserAddress = `${add1} ${add2}`;
              console.log(this.inputUserAddress);
            },
          }).open();
        } else {
          new window.daum.Postcode({
            oncomplete: (data) => {
              console.log(data);
              const add1 = data.sido;
              const add2 = data.sigungu;
              this.inputUserAddress = `${add1} ${add2}`;
            },
          }).open();
        }
      } else {
        console.error("Daum Postcode 스크립트가 로드되지 않았습니다.");
      }
    },
    setActive(inputName) {
      this.activeInput = inputName;
    },
    clearActive() {
      this.activeInput = null;
      this.assignId();

    },
    assignId() {
      this.user_mbti_id = this.selectedMbti;
      this.user_annual_income_id = this.selectAnnualIncome;
      this.user_blood_type_id = this.selectedBloodType;
      this.user_religion_id = this.selectedReligion;
      this.user_drinking_id = this.selectedDrinking;
    },
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
  outline: none;
}
textarea:focus {
  overflow: auto;
}

/* div */
div.container0 {
  width: 600px;
  /* height: 100vh; */
  margin: 0 auto;
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
  /* border: 1px solid red; */
  margin-top: 30px;
  /* margin-bottom:175px ; */
  margin-left: 15px;
  /* margin-bottom: 80px;  */
  width: 570px;
  display: grid;
  /* grid-auto-columns: repeat(2, minmax(100px,auto));  */
  background-color: #ffffff;
  border-radius: 18px;
}
div.container_top {
  margin-top: 54px;
  /* border: 1px solid red; */
  /* margin-bottom: 20px; */
}

div.container_middle {
  margin-top: 48px;
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
}

div.container_gen_age {
  /* border: 1px solid green; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* row-gap: 20px; */
  column-gap: 20px;
}

div.gender {
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: 78px 50px;
  justify-items: start;
  margin-bottom: 30px;
}
div.select_gender {
  /* margin-left: 33px; */
  /* grid-gap: 33px; */
  /* border: 1px solid blue; */
  justify-content: space-between;
  background-color: #d9d9d9;
  border-radius: 9px;
  display: grid;
  font-size: 13px;
  grid-template-columns: 1fr 1fr;
  padding-left: 4px;
  padding-right: 4px;
}

div.age {
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: 60px 2fr;
  justify-items: start;
}

div.sub_title {
  /* border: 1px solid red; */
  font-size: 16px;
  font-weight: 500;
  margin-left: 16px;
  text-align: start;
  align-content: center;
}

div.title {
  font-size: 24px;
  font-weight: 500;
  text-align: center;
}
div.sub_title2 {
  /* border: 1px solid red; */
  font-size: 16px;
  font-weight: 500;
  /* margin-left: 16px; */
  text-align: start;
  align-content: center;
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

div.adress {
  /* border: 1px solid red; */
  display: grid;
  /* grid-gap: 20px; */
}
div.address_box {
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
input.input_address {
  outline: null;
  padding-bottom: 1px;
  /* border: null; */
  border: 1px solid #6e7680;
  padding-left: 42px;
  border-radius: 8px;
  height: 36px;
  align-content: center;
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
  /* padding: 6px 14px; */
  font-size: 12px;
  box-sizing: border-box;
}
img {
  position: absolute;
  margin-left: 12px;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 20px;
  height: 20px;
}

textarea.select_intro {
  /* border: 1px solid red; */
  background: #f1eff6;
  border-radius: 6px;
  margin-bottom: 30px;
  /* margin-left: 17px; */
  margin-left: 15px;
  margin-right: 15px;
  width: 540px;
  border: 1px solid var(--purple_main);
  box-shadow: 0px 1px 12px rgba(92, 9, 227, 0.28);
}
textarea.visible_select_intro {
  /* border: 1px solid red; */
  background: #f1eff6;
  border-radius: 6px;
  margin-bottom: 30px;
  /* margin-left: 17px; */
  margin-left: 15px;
  margin-right: 15px;
  width: 540px;
  border: none;
  box-shadow: none;
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
  border: null;
  margin-top: 2px;
  margin-bottom: 2px;
  width: 57px;
  height: 30px;
  border-radius: 7px;
}
.inactive {
  background: none;
  color: #111111;
  border: null;
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
  /* outline: null; */
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

  /* outline: null; */
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
  /* outline: null; */
}
.visible_select_nickname_box {
  height: 36px;
  /* background-color:#B3B3B3; */
  border: solid 1px #b3b3b3;
  border-radius: 6px;
  outline: none;
  box-shadow: none;
  align-content: center;

  /* outline: null; */
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
  appearance: null;
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
  /* outline: null; */
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
  /* border: null; */
  /* outline: null; */
  box-shadow: none;
  /* position: relative; */
  /* align-content: end; */
}
select option {
  color: #979797;
  background-color: #ffffff;
  border: 1px solid #ebebeb;
}

.next {
  margin-bottom: 30px;
  width: 540px;
  height: 60px;
  text-align: center;
  font-size: 22px;
  font-weight: 500;
  color: #fdf7ff;
  background-image: var(--gradient);
  border-radius: 8px;
  border: none;
}
</style>
