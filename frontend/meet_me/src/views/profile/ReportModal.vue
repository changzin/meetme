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
        <div class="safety_zone">
            <div class="container">
                <div class="title">
                    신고 하기
                </div>
                <div class="input-container">
                    <textarea type="text" class="input-box" id="report" placeholder="신고 사유를 적으세요"></textarea>
                </div>
                <div class="story_send_container">
                <button class="story_send_button" @click="sendReport(data.user_id2)">신고하기</button>
                </div>
            </div>
        </div>          
        {{data}}



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
    async sendReport(){
        try{
            const report = document.getElementById('report').value;
            if(report){
                await this.$api(`/user/addreport`, {access_token: this.$getAccessToken(), user_id2: this.data.user_id2, report}, 'POST');
                alert('신고가 완료되었습니다..');
                this.$emit("close");
            } else {
                alert('신고 사유를 입력해주세요.');
            }
        }catch(err){    
            console.log(err);
        }
    }
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
  height: 70%;
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
.container {
    min-width: 600px;
    padding: 0 19px 0 0;
    justify-content: start;
}
.title{
    font-size: 22px;
    padding: 16px 246px 34px 246px;
    text-align: center;
    white-space: nowrap;
    color: black;
    margin-left: -21px;
}
.input-container {
    text-align: center; /* 컨테이너 내 텍스트 가운데 정렬 */
    padding: 0 14px 30px 14px;
}
.input-box {
    font-size: 16px; /* 폰트 크기 */
    height: 400px;
    width: 500px; /* 너비 */
    border: 1px solid #ccc; /* 테두리 */
    border-radius: 4px; /* 둥근 테두리 */
    box-sizing: border-box; /* 패딩과 테두리를 포함한 박스 크기 계산 */
    outline: none; /* 포커스 시 외곽선 제거 */
    border-radius: 6px;
    padding: 10px;
    }
.story_send_container{
    text-align: center;
}
.story_send_button{
    width: 550px;
    height: 60px;
    border-radius: 8px;
    background-image: linear-gradient(to right,#497af5 ,#884afb);
    margin: auto;
    background-position: center center;
    border: 1px solid #ccc;
    color: #ffff;
}
</style>