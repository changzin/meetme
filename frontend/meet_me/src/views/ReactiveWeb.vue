<template>
  <div class="reactive-class">
    <div class="img-div">
      <img src="B.png" class="img_img" />
      <div class="only-text-div_style_guide_button_one">User</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.reactive-class {
  margin: 0 300px;
}

.img-div {
  border: 1px solid black;
  background-color: red;
  margin: 0 50px;
  text-align: center; 
}

.img_img {
  width: 100%; 
  /* height가 auto로 주면 높이도 자동으로 비율이 맞춰짐 */
  height: auto;
}

@media (max-width: 1200px) {
  .img_img {
    width: 80%;
  }
}

@media (max-width: 768px) {
  .reactive-class {
    margin: 0 20px;
  }

  .img-div {
    margin: 0 10px;
  }

  .img_img {
    width: 100%;
  }
}
</style>
