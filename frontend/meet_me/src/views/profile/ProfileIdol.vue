<template>
  <div class="container0">
    <form class="card_box" @submit.prevent="postIdolList()">
      <div class="container_top">
        <div class="title">이상형 선택</div>
      </div>
      <div class="container_middle">
        <div class="sub_title3">필수 입력</div>

        <!-- 입력 -->
        <div class="container_essential">
          <!-- 나이 -->
          <select
            id="age"
            class="select_dropdown_button"
            @focus="setActive('age')"
            @blur="clearActive"
            :class="{
              visible_dropdown_button: activeInput === 'age',
              visible_dropdown_button: activeInput !== 'age',
            }"
            v-model="form.selectedIdolAge"
            required
          >
            <option class="dropdown_item" value=""  disabled hidden>
              연령대
            </option>
            <option class="dropdown_item" v-for="(idolAge, i) in idolList.user_idol_age_values " :key="i" :value="i + 1">
              {{ idolAge }}
            </option>
          </select>

          <!-- 연봉 -->
          <select
            id="annual_income"
            class="select_dropdown_button"
            @focus="setActive('annual_income')"
            @blur="clearActive"
            :class="{
              visible_dropdown_button: activeInput === 'annual_income',
              visible_dropdown_button: activeInput !== 'annual_income',
            }"
            v-model="form.selectedAnnualIncome"
            required
          >
            <option class="dropdown_item" value=""  disabled hidden>
              연봉
            </option>
            <option class="dropdown_item" v-for="(
                annual_income, i
              ) in idolList.user_annual_income_values"
              :key="i"
              :value="i + 1"
              
            >
                {{ annual_income }}
                </option>
            </select>
            

          <!-- 키 -->
          <select
            id="height"
            class="select_dropdown_button"
            @focus="setActive('height')"
            @blur="clearActive"
            :class="{
              visible_dropdown_button: activeInput === 'height',
              visible_dropdown_button: activeInput !== 'height',
            }"
            v-model="form.selectedIdolHeight"
            required
          >
            <option class="dropdown_item" value=""  disabled hidden>
              키
            </option>
            <option class="dropdown_item" v-for="(idolHeight, i) in idolList.user_idol_height_values" :key="i" :value="i + 1" >
            {{ idolHeight }}
            </option>
          </select>

          <!-- 몸무게 -->
          <select
            name="weight"
            class="select_dropdown_button"
            @focus="setActive('weight')"
            @blur="clearActive"
            :class="{
              visible_dropdown_button: activeInput === 'weight',
              visible_dropdown_button: activeInput !== 'weight',
            }"
            v-model="form.selectedIdolWeight"
            required
          >
            <option class="dropdown_item" value=""  disabled hidden>
              몸무게
            </option>
            <option class="dropdown_item" v-for="(idolWeight, i) in idolList.user_idol_weight_values" :key="i" :value="i + 1">
                {{ idolWeight }}
            </option>
            
          </select>

          <!-- v-if isVisible isEnabled 상태 구성 백단에서 불러온 데이터를 셀렉트에 넣기
                    @click 으로 선택되면 isEnabled 활성화 보라색으로 변환 @click 이 풀릴시 isVisible로 변환 -->
          <!-- 최종 선택된 데이터를 다음 버튼 클릭시 포스트로 서버에 전송 dB에 insert시킴 -->

          <!-- MBTI -->
          <select
            name="MBTI"
            class="select_dropdown_button"
            @focus="setActive('MBTI')"
            @blur="clearActive"
            :class="{
              visible_dropdown_button: activeInput === 'MBTI',
              visible_dropdown_button: activeInput !== 'MBTI',
            }"
            v-model="form.selectedMbti"
            required
          >
            <option class="dropdown_item" value=""  disabled hidden>
              MBTI
            </option>
            <option class="dropdown_item" v-for="(idolMbti, i) in idolList.user_mbti_values" :key="i" :value="i + 1">
                {{ idolMbti }}
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
            v-model="form.selectedBloodType"
            required
          >
            <option class="dropdown_item" value=""  disabled hidden>
              혈액형
            </option>
            <option
              class="dropdown_item"
              v-for="(bloodType, i) in idolList.user_blood_type_values"
              :key="i"
              :value="i + 1"
            >
              {{ bloodType }}
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
            v-model="form.selectedReligion"
            required
          >
            <option class="dropdown_item" value=""  disabled hidden>
              종교
            </option>
            <option
              class="dropdown_item"
              v-for="(religion, i) in idolList.user_religion_values"
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
            v-model="form.selectedDrinking"
            required
          >
            <option class="dropdown_item" value=""  disabled hidden>
              주량
            </option>
            <option
              class="dropdown_item"
              v-for="(drinking, i) in idolList.user_drinking_values"
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
            v-model="form.selectedSmoke"
            required
          >
            <option class="dropdown_item" value=""  disabled hidden>
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
            v-model="form.selectedTartoo"
            required
          >
            <option class="dropdown_item" value="" selected disabled hidden>
              문신 여부
            </option>
            <option class="dropdown_item" value="T">문신 허용</option>
            <option class="dropdown_item" value="F">문신 안됨</option>
          </select>
        </div>
          <!-- 선택된 상태 -->
      </div>
      <div class="container_bottom">
        <button class="next" type="submit">다음으로</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
        activeInput: null,
        idolList : {},
        form:{
          selectedIdolAge : "",
          selectedIdolHeight : "",
          selectedIdolWeight : "",
          selectedAnnualIncome : "",
          selectedMbti : "",
          selectedBloodType : "",
          selectedReligion : "",
          selectedDrinking : "",
          selectedSmoke : "",
          selectedTartoo : "",
        },
        userIdol:{}
        
    };
  },
  async created() {
    this.getIdolList();
  },
  computed: {
    maleClass() {
      return this.activeGender === "male" ? "active" : "inactive";
    },
    femaleClass() {
      return this.activeGender === "female" ? "active" : "inactive";
    },
  },
  methods: {
    async getIdolList() {
      try {
        const result = await this.$api(`/user/idollist`, {}, "POST");
        this.idolList = result.idolList;
        console.log(this.idolList);
      } catch (err) {
        console.log(err);
      }
    },
    async postIdolList(){
        try{
            const requestBody ={
                access_token: this.$getAccessToken(),
                user_mbti_id : this.form.selectedMbti,
                user_annual_income_id : this.form.selectedAnnualIncome,
                user_blood_type_id : this.form.selectedBloodType,
                user_religion_id : this.form.selectedReligion,
                user_drinking_id : this.form.selectedDrinking,
                user_idol_age_id : this.form.selectedIdolAge,
                user_idol_height_id : this.form.selectedIdolHeight,
                user_idol_weight_id : this.form.selectedIdolWeight,
                user_idol_smoke: this.form.selectedSmoke,
                user_idol_tartoo: this.form.selectedTartoo,
            };
            const request = await this.$api(`/user/idolinput`,requestBody,"POST")
            console.log(request);
            
            if(request.status === 200){
                this.userIdol = request.userIdol
                this.$router.push({
                  path: '/feature'
                })
            }
        }catch(err){
            console.log(err);
        }
    },

    //성별 선택
    toggleGender(gender) {
      this.activeGender = gender;
    },

    setActive(inputName) {
      this.activeInput = inputName;
    },
    clearActive() {
      this.activeInput = null;
      this.assignId();
      console.log(
        "MBTI" +
          this.form.selectedMbti + " " +
          "연봉" +
          this.form.selectedAnnualIncome + " " +
          "혈액형" +
          this.form.selectedBloodType + " " + 
          "종교" +
          this.form.selectedReligion + " " +
          "주량" +
          this.form.selectedDrinking + " " +
          "나이" +
          this.form.selectedIdolAge + " " +
          "키" +
          this.form.selectedIdolHeight + " " +
          "몸무게" +
          this.form.selectedIdolWeight + " " +
          "흡연" +
          this.form.selectedSmoke + " " +
          "문신" +
          this.form.selectedTartoo + " " 
          
      );
    },
    assignId() {
      this.user_mbti_id = this.form.selectedMbti;
      this.user_annual_income_id = this.form.selectedAnnualIncome;
      this.user_blood_type_id = this.form.selectedBloodType;
      this.user_religion_id = this.form.selectedReligion;
      this.user_drinking_id = this.form.selectedDrinking;
      this.user_idol_age_values = this.form.selectedIdolAge;
      this.user_idol_height_values = this.form.selectedIdolHeight;
      this.user_idol_weight_values = this.form.selectedIdolWeight;
      
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
  margin-top: 51px;
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
  outline: none;
  padding-bottom: 1px;
  /* border: none; */
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

textarea.intro {
  /* border: 1px solid red; */
  background: #f1eff6;
  border-radius: 6px;
  margin-bottom: 30px;
  /* margin-left: 17px; */
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

.next {
  margin-top: 30px;
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
