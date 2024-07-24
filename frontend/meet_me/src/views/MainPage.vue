<template>
<div class="container">
    <div class="header">MEETME</div>
    <dlv>
        <div class="main_header">오늘의 인기<img class="main_header_img" src="/A.png"></div>
    </dlv>
    <div class="img_a">
        <img class="main_img" src="/B.png">
        <a class="img_name" href="https://example.com">
            이름
        </a>
    </div>
    <div class="img_a">
    <img class="main_img" src="/C.png">
    </div>
</div>
</template>
  
<script>
export default {

}
</script>

<style scoped>
.container {
    width: 600px;
    margin: 0 auto;
    justify-content: center;
}

.header{
    padding: 0 0 27px 0;
    font-size: 22px;
    /*border: 11px solid #000000; */
}
.main_header{
    display: flex;
    align-items: center;
    padding: 0 0 20px 20px;
    font-size: 24px;
}
div.main_header_img{
    margin-right: 7px;
}
img.main_img{
    width: 568px;
    height: 580px;
    border-radius: 10px;
}
.img_a{
    padding: 0 16px 30px 16px;
    position: relative;

}

.img_name{
    position: absolute;
    left: 36px;
    top: 417px;
    bottom: 169px;
}
</style>
