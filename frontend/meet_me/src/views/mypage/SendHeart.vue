<template>
    <div class="safety_zone">
        <div class="container">
            <div class="title">
                보낸 좋아요
            </div>
            <div class="profile_box" v-for="(like, i) in index" :key="i">
                <img class="mini_profile" src="/model.jpg">
                <div class="name_title">
                    <div class="status">
                        원영이에게 좋아요를 보냈습니다.
                    </div>
                </div>
                <div class="button" @click="matching()">
                    <div :class="{matching_button: matching_status == 0, matching_cencel: matching_status == 1}">
                        <span v-if="matching_status == 0">매칭 신청</span>
                        <span v-if="matching_status == 1">매칭 취소</span>
                    </div>
                    <button class="trash">
                        <a href="/mypageedit">
                        <img src="/icon/mypage/like/trash.svg">
                        </a>
                    </button>
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
            sampleData : '',
            index: 5,
            matching_status: 0,
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
    methods: {
        matching(){
            if(this.matching_status == 0){
                this.matching_status += 1
                return this.matching_status;
            }else if(this.matching_status == 1){
                this.matching_status -= 1
                return this.matching_status == 0;
            }   
            
        }
    }
}
</script>
<style scoped>

.container {
    padding: 0 16px 0 16px;
    margin: 0 12px 0 12px;
    
}

.mypage_container {
    padding-top: 80px;
}

.profile_box {

    display: flex;
    margin-bottom: 20px;
}

.mini_profile {

    width: 60px;
    height: 60px;
    border-radius: 100px;
    margin: 10px;
    justify-content: start;
    object-fit: cover;
}

.name_title {
    padding: 10px 0 10px 0;
    text-align: start;
    display: flex;
    align-items: center;
}

.status {
    font-weight: 400;
    padding: 0 10px 0 10px;
}

.live {
    color: #9D88B3;
}

.button {
    display: flex;
    padding-right: 20px;
    margin-left: auto;
    justify-content: end;
    align-items: center;
    cursor: pointer;
}

.matching_button {
    border: 2px solid var(--purple_main);
    border-radius: 10px;
    margin: 0 15px 0 15px;
    padding: 8px 16px;
    color: var(--purple_main);
}

.matching_cencel {
    border: 2px solid var(--purple_main);
    border-radius: 10px;
    margin: 0 15px 0 15px;
    padding: 8px 16px;
    background-color: var(--purple_main);
    color: #ffffff;
}

.trash {
    border-color: #9d88b300;
    background-color: #9d88b300;
}

</style>