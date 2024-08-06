<template>
  <div class="modal-backdrop" @click.self="closeModal" v-if="isVisible">
    <div class="modal-content">
      <img :src="image" alt="Enlarged Photo" class="modal-image" />
      <img
        class="close-button"
        src="icon/picture/XIcon.svg"
        @click="closeModal"
        alt="Close"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    isVisible: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;

  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  text-align: center;
  max-width: 90vw;
  max-height: 80vh;
    width: auto;
  height: auto;
  overflow: hidden; 
}

.modal-image {
  width: auto;
  height: auto; 
  max-width: 100%; 
  max-height: 100%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff5e5e;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;
}
</style>
