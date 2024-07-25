<template>
  <div>
    <div
      v-if="isModalVisible"
      class="modal-overlay"
      @click="handleOverlayClick"
    >
      <div class="modal-popup" ref="modalPopup" @click.stop>
        <div class="modal-title">제목임</div>
        <div class="modal-description">
          하고싶은 내용을 적고 아래에 버튼 누르게 하셈
        </div>
        <div class="modal-divider"></div>
        <div class="modal-select-div">
          <div class="modal-select-left" @click="no_click">NO</div>
          <div class="modal-select-right" @click="ok_click">OK</div>
        </div>
      </div>
    </div>
    <img src="B.png" class="img_img" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalVisible: true,
    };
  },
  methods: {
    no_click() {
      this.isModalVisible = false;
    },
    ok_click() {
      this.isModalVisible = false;
    },
    handleOverlayClick(event) {
      // 모달 팝업이 아닌 영역을 클릭한 경우 모달을 닫음
      if (!this.$refs.modalPopup.contains(event.target)) {
        this.isModalVisible = false;
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
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 배경을 덮도록 z-index 설정 */
}

.modal-popup {
  position: fixed;
  top: 20%;
  left: 50%;
  width: 270px;
  height: 140px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(60px);
  z-index: 1000;
  display: flex;
  border-radius: 15px;

  padding: 20px 0px;
  padding-bottom: 0px;
  /* visibility: collapse; */
  flex-direction: column;
}

.modal-title {
  font-size: 17px;
  font-weight: 500;
  color: #000;
}

.modal-description {
  font-size: 13px;
  color: #000;
  padding: 0px 16px;
}

.modal-divider {
  padding: 15px 0px;
  padding-bottom: 0px;
  border-bottom: 1px solid #898989;
}

.modal-select-div {
  display: flex;
  height: 100%;
  align-items: center;
}

.modal-select-left {
  flex: 1;
  color: #0e72ed;
  font-size: 17px;
  border-right: 1px solid #898989;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-select-right {
  flex: 1;
  color: #e30909;
  font-size: 17px;
  font-weight: 500;
}
</style>