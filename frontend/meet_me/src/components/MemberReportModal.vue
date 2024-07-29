<template>
  <div>
    <div
      v-if="this.$store.state.modalOn"
      class="modal-overlay"
      @click="handleOverlayClick"
    >
      <div class="modal-popup" ref="modalPopup" @click.stop>
        <div class="modal-popup-header-text">
          <div style="width:20px;"></div>
          신고 내역
        <img
          src="/icon/main_recommend/delete.svg"
          @click="x_click"
          class="x_click_div"
        />
        </div>
        <div>
          <table class="admin_modal_table">
                <thead>
                    <tr class="admin_modal_table_thead">
                        <td>신고자 닉네임</td>
                        <td>신고 내역</td>
                    </tr>
                </thead>
                <tbody class="admin_modal_table_body">
                    <tr :class="{tr_gray: (index%2==0), tr_white: (index%2==1) }"
                          v-for="(report, index) in data.reportList" :key="index">
                        <td>{{report.user_nickname}}</td>
                        <td>
                            {{report.report_content}}
                        </td>
                    </tr>
                </tbody>
            </table>
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
                  reportList: [
                    {
                      user_nickname: "#",
                      report_content: "#",
                    }
                  ]
                };
          } 
    }
  },
  created(){
    console.log("asdf");
  },
  methods: {
    x_click() {
      this.$store.commit("setModalOff");
    },

    handleOverlayClick(event) {
      // 모달 팝업이 아닌 영역을 클릭한 경우 모달을 닫음
      if (!this.$refs.modalPopup.contains(event.target)) {
        this.$store.commit("setModalOff");
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
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  border-radius: 12px;
  overflow: scroll;
  padding: 20px;
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

</style>