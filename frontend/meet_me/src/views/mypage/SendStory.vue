<template>
    <div class="safety_zone">
        <div class="container">
            <div class="title">
                사연 보내기
            </div>
            <div class="input-container">
                <textarea type="text" class="input-box" placeholder="사연을 입력하세요"></textarea>
            </div>
            <div class="story_send_container">
            <button class="story_send_button" @click="1">사연 보내기</button>
            </div>
        </div>
    </div>
    <MeetHeader />
</template>

<script>
export default {	
    data() {
        return {
            sampleData : '',
        };
        
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    methods: {},
}
    
</script>

<style scoped>
.container {
    min-width: 600px;
    padding: 0 15px 0 15px;
    justify-content: center;
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
    height: 563px;
    width: 540px; /* 너비 */
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