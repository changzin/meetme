<template>
    <div class="safety_zone">
        <div class="container">
            <div class="title">
                프로필 수정
            </div>
            <div class="profile_image">
                <img class="edit_profile" src="/model.jpg">
                <img class="edit_profile" src="/model.jpg">
                <img class="edit_profile" src="/model.jpg">
                <img class="edit_profile" src="/model.jpg">
                <img class="edit_profile" src="/model.jpg">
                <img class="edit_profile" src="/model.jpg">
            </div>
            <div class="profile_info">
                <div class="name">
                    이름입니다,23
                </div>
                <div class="live">
                    서울특별시
                </div>
            </div>
        </div>
        <MeetHeader />
    </div>
</template>
<script>
export default {	
    data() {
        return {
            sampleData : ''
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
    methods: {}
}
</script>
<style scoped>

.container {
    padding: 0 15px 0 15px;
    justify-content: center;
}

.title {
    font-size: 24;
    font-weight: 700;
    padding: 30px 0 15px 0;
    margin: 0;
}

.profile_image{
    width: 570px;
    min-width: 570px;
    height: 360px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 8px 0 8px;
}

.edit_profile{
    width: 150px;
    height: 150px;
    margin: 15px;
    border-radius: 10px;
}

.profile_info {
    margin: 15px;
}

.profile_info .name {
    font-size: 24px;
    text-align: start;
    font-weight: 700;
}

.profile_info .live {
    font-size: 16px;
    text-align: start;
    font-weight: 500;
}

</style>