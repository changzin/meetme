<template>
  <div class="tempDiv">
    <!-- <MeetHeader /> -->

    <!-- 아이콘만 있음 -->
    <div class="one-line">
      <div class="style_guide_button_one" ref="iconDiv">
        <img
          src="/icon/styleguide/search_1616.svg"
          class="only-icon-div-img"
          @load="resizeDiv"
        />
      </div>

      <div class="style_guide_button_two" ref="iconDiv">
        <img
          src="/icon/styleguide/search_1616.svg"
          class="only-icon-div-img"
          @load="resizeDiv"
        />
      </div>

      <div class="style_guide_button_three" ref="iconDiv">
        <img
          src="/icon/styleguide/search_white_1616.svg"
          class="only-icon-div-img"
          @load="resizeDiv"
        />
      </div>

      <div class="style_guide_button_four" ref="iconDiv">
        <img
          src="/icon/styleguide/search_1616.svg"
          class="only-icon-div-img"
          @load="resizeDiv"
        />
      </div>

      <div class="style_guide_button_five" ref="iconDiv">
        <img
          src="/icon/styleguide/search_grey_1616.svg"
          class="only-icon-div-img"
          @load="resizeDiv"
        />
      </div>

      <div class="style_guide_button_six" ref="iconDiv">
        <img
          src="/icon/styleguide/search_1616.svg"
          class="only-icon-div-img"
          @load="resizeDiv"
        />
      </div>

      <div class="style_guide_button_seven" ref="iconDiv">
        <img
          src="/icon/styleguide/search_1616.svg"
          class="only-icon-div-img"
          @load="resizeDiv"
        />
      </div>
    </div>

    <!-- 텍스트만 있음 -->
    <div class="one-line">
      <div class="only-text-div_one" ref="iconDiv">
        <div class="only-text-div_style_guide_button_one">User</div>
      </div>

      <div class="only-text-div_two" ref="iconDiv">
        <div class="only-text-div_style_guide_button_two">User</div>
      </div>

      <div class="only-text-div_three" ref="iconDiv">
        <div class="only-text-div_style_guide_button_three">User</div>
      </div>

      <div class="only-text-div_four" ref="iconDiv">
        <div class="only-text-div_style_guide_button_four">User</div>
      </div>

      <div class="only-text-div_five" ref="iconDiv">
        <div class="only-text-div_style_guide_button_five">User</div>
      </div>

      <div class="only-text-div_six" ref="iconDiv">
        <div class="only-text-div_style_guide_button_six">User</div>
      </div>

      <div class="only-text-div_seven" ref="iconDiv">
        <div class="only-text-div_style_guide_button_seven">User</div>
      </div>
    </div>

    <!-- 아이콘 텍스트 둘 다 있음 -->
    <div class="one-line">
      <div class="icon-text-div_one" ref="iconDiv">
        <img
          src="/icon/styleguide/search_1616.svg"
          class="only-icon-div-img"
          
        />
        <div class="only-text-div_style_guide_button_one">User</div>
      </div>

      <div class="only-text-div_two" ref="iconDiv">
        <img
          src="/icon/styleguide/search_1616.svg"
          class="only-icon-div-img"
          @load="resizeDiv"
        />
        <div class="only-text-div_style_guide_button_two">User</div>
      </div>

      <div class="only-text-div_three" ref="iconDiv">
        <img
          src="/icon/styleguide/search_white_1616.svg"
          class="only-icon-div-img"
          @load="resizeDiv"
        />
        <div class="only-text-div_style_guide_button_three">User</div>
      </div>

      <div class="only-text-div_four" ref="iconDiv">
        <div class="only-text-div_style_guide_button_four">
          <img
            src="/icon/styleguide/search_1616.svg"
            class="only-icon-div-img"
            @load="resizeDiv"
          />User
        </div>
      </div>

      <div class="only-text-div_five" ref="iconDiv">
        <div class="only-text-div_style_guide_button_five">
          <img
            src="/icon/styleguide/search_grey_1616.svg"
            class="only-icon-div-img"
            @load="resizeDiv"
          />User
        </div>
      </div>

      <div class="only-text-div_six" ref="iconDiv">
        <div class="only-text-div_style_guide_button_six">
          <img
            src="/icon/styleguide/search_1616.svg"
            class="only-icon-div-img"
            @load="resizeDiv"
          />User
        </div>
      </div>

      <div class="only-text-div_seven" ref="iconDiv">
        <div class="only-text-div_style_guide_button_seven">
          <img
            src="/icon/styleguide/search_1616.svg"
            class="only-icon-div-img"
            @load="resizeDiv"
          />User
        </div>
      </div>
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
.tempDiv {
  width: 600px;
  margin: 100px auto;
}

.one-line {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
}

.only-icon-div {
  display: inline;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  padding: 9px;
}

.only-text-div {
  box-sizing: content-box;
  border-radius: 40px;
  display: inline;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 14px;
  line-height: 100%;
}

/* 첫번째 줄 icon */

.style_guide_button_one {
  border: 1px solid var(--purple_sub);
  background-color: var(--purple_sub);

  display: inline;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  padding: 9px;
}

.style_guide_button_two {
  border: 1px solid var(--purple_main);
  background-color: var(--purple_sub_light);

  display: inline;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  padding: 9px;
}

.style_guide_button_three {
  border: 1px solid var(--purple_main);
  background-color: var(--purple_main);

  display: inline;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  padding: 9px;
}

.style_guide_button_four {
  border: 1px solid var(--grey_main);
  background-color: var(--grey_main);

  display: inline;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  padding: 9px;
}

.style_guide_button_five {
  border: 1px solid var(--grey_main);
  background-color: var(--grey_main);

  display: inline;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  padding: 9px;
}

.style_guide_button_six {
  border: 1px solid var(--purple_main);
  background-color: var(--white_main);

  display: inline;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  padding: 9px;
}

.style_guide_button_seven {
  border: 1px solid var(--white_main);
  background-color: var(--white_main);
  box-shadow: var(--box-shadow_purple_main);

  display: inline;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  padding: 9px;
}

/* 두번째 줄 icon + text */

/* icon + text 아이콘 하나만 가져가려면 여기서부터 */
.only-text-div_one {
  box-sizing: content-box;
  border-radius: 40px;
  display: inline;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 14px;
  line-height: 100%;
  background-color: var(--purple_sub);
  border: 1px solid var(--purple_sub);
}

.only-text-div_style_guide_button_one {
  color: var(--purple_main);
}

/* 여기까지가 가져가시면 됩니다 */

/* icon + text 아이콘 하나만 가져가려면 여기서부터 */

.only-text-div_two {
  box-sizing: content-box;
  border-radius: 40px;
  display: inline;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 14px;
  line-height: 100%;
  background-color: var(--purple_sub-light);
  border: 1px solid var(--purple_main);
}

.only-text-div_style_guide_button_two {
  color: var(--purple_main);
}

/* 여기까지가 가져가시면 됩니다 */

/* icon + text 아이콘 하나만 가져가려면 여기서부터 */

.only-text-div_three {
  box-sizing: content-box;
  border-radius: 40px;
  display: inline;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 14px;
  line-height: 100%;
  background-color: var(--purple_main);
  border: 1px solid var(--purple_main);
}

.only-text-div_style_guide_button_three {
  color: var(--white_main);
}

/* 여기까지가 가져가시면 됩니다 */

/* icon + text 아이콘 하나만 가져가려면 여기서부터 */

.only-text-div_four {
  box-sizing: content-box;
  border-radius: 40px;
  display: inline;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 14px;
  line-height: 100%;
  background-color: var(--grey_main);
  border: 1px solid var(--grey_main);
}

.only-text-div_style_guide_button_four {
  color: var(--purple_main);
}

/* 여기까지가 가져가시면 됩니다 */

/* icon + text 아이콘 하나만 가져가려면 여기서부터 */

.only-text-div_five {
  box-sizing: content-box;
  border-radius: 40px;
  display: inline;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 14px;
  line-height: 100%;
  background-color: var(--grey_main);
  border: 1px solid var(--grey_main);
}

.only-text-div_style_guide_button_five {
  color: var(--grey_sub_dark);
  /* color: red; */
}

/* 여기까지가 가져가시면 됩니다 */

/* icon + text 아이콘 하나만 가져가려면 여기서부터 */

.only-text-div_six {
  box-sizing: content-box;
  border-radius: 40px;
  display: inline;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 14px;
  line-height: 100%;
  background-color: var(--white_main);
  border: 1px solid var(--purple_main);
}

.only-text-div_style_guide_button_six {
  color: var(--purple_main);
}
/* 여기까지가 가져가시면 됩니다 */

/* icon + text 아이콘 하나만 가져가려면 여기서부터 */

.only-text-div_seven {
  box-sizing: content-box;
  border-radius: 40px;
  display: inline;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 14px;
  line-height: 100%;
  background-color: var(--white_main);
  border: 1px solid var(--white_main);
  box-shadow: var(--box-shadow_purple_main);
}

.only-text-div_style_guide_button_seven {
  color: var(--purple_main);
}

/* 여기까지가 가져가시면 됩니다 */


.icon-text-div_one {
  box-sizing: content-box;
  border-radius: 40px;
  display: inline;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 14px;
  line-height: 100%;
  border: 1px solid var(--purple_main);
  /* align-items: baseline; */
}












.only-icon-div-img {
  display: block;
  width: auto;
  height: auto;
}
</style>
