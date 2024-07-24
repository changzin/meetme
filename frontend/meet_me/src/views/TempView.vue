<template>
  <div>
    <!-- <MeetHeader /> -->

    <div class="only-icon-div style_guide_button_one" ref="iconDiv">
      <img
        src="/icon/styleguide/search_1616.svg"
        class="only-icon-div-img"
        @load="resizeDiv"
      />
    </div>

    <div class="only-icon-div style_guide_button_two" ref="iconDiv">
      <img
        src="/icon/styleguide/search_1616.svg"
        class="only-icon-div-img"
        @load="resizeDiv"
      />
    </div>
  </div>
</template>
  
<script>
export default {
  methods: {
    // 원형 만들기
    resizeDiv(event) {
      const img = event.target;
      const div = img.parentElement;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const maxSize = Math.max(imgWidth, imgHeight);
      // 이미지 크기
      // div.style.width = `${maxSize + 10}px`;
      // div.style.height = `${maxSize + 10}px`;
      div.style.width = `${maxSize}px`;
      div.style.height = `${maxSize}px`;
    },
  },
};
</script>



<style scoped>
.only-icon-div {
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box; /* padding을 포함하여 크기 계산 */
}

.style_guide_button_one {
  /* border: 1px solid var(--purple_main); */
  background-color: var(--purple_sub);
  padding: 9px;
}

.style_guide_button_two {
  border: 1px solid var(--purple_main);
  background-color: var(--purple_sub_light);
  padding: 9px;
}

.only-icon-div-img {
  display: block;
  width: auto;
  height: auto;
}
</style>
