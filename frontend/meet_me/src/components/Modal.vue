<template>
  <div>
    <div
      v-if="isModalVisible"
      class="modal-overlay"
      @click="handleOverlayClick"
    >
      <div class="modal-popup" ref="modalPopup" @click.stop>
        <img
          src="/icon/main_recommend/delete.svg"
          @click="x_click"
          class="x_click_div"
        />
        기본 모달창
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
    x_click() {
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
  backdrop-filter: blur(5px); /* 블러 효과 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 배경을 덮도록 z-index 설정 */
}

.modal-popup {
  position: fixed;
  bottom: 70px;
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

  padding: 20px;
  /* visibility: collapse; */
  flex-direction: column;
}

.x_click_div {
  width: 20px;
  height: 20px;
}
</style>