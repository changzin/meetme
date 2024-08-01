<template>
    <div class="safety_zone">
        <div class="container">
            <div class="title">
                보낸 좋아요
            </div>
            <div class="profile_box" v-for="(heart, i) in heartData" :key="i">
                <img class="mini_profile" src="/model.jpg">
                <div class="name_title">
                    <div class="status">
                        {{heart.user_nickname}}에게 좋아요를 보냈습니다.
                    </div>
                </div>
                <div class="button">
                    <div class="matching_button" v-if="(!heart.matching)" @click="sendMatching(heart.user_id)">
                        매칭신청
                    </div>
                    <div class="matching_cencel" v-if="(heart.matching)" @click="deleteMatching(heart.user_id)">
                        매칭취소
                    </div>
                </div>
                    <button class="trash" @click="deleteHeart(heart.user_id)">
                        <img src="/icon/mypage/like/trash.svg">
                    </button>
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
            matching_status: {},
            activeHeart : [],
            heartData : [],
        };
    },
    beforeCreate() {},
    async created() {
        await this.getHeart();
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    methods: {
        async sendMatching(user_id2){
            try{
                await this.$api(`/user/sendmatching`, {user_id: 1, user_id2}, "POST");
                await this.getHeart();
            }catch(err){
                alert('매칭신청이 중복 되었습니다.');
            }
        },
        async getHeart(){
            const result = await this.$api(`/user/getheart`, {user_id: 1},"POST");
            this.heartData = result.heart;
        },
        async deleteMatching(user_id2){
            try{
                await this.$api(`/user/deletematching`, {user_id: 1, user_id2}, "POST");
                await this.getHeart();
            }catch(err){
                alert('매칭취소가 실패 했습니다.')
            }
        },
        async deleteHeart(user_id2){
            try{
                await this.$api(`/user/deleteheart`, {user_id: 1, user_id2}, "POST");
                await this.getHeart();
            }catch(err){
                alert('좋아요 삭제 실패');
            }
        }
    }
}
</script>
<style scoped>

.container {
    min-width: 600px;
    padding: 0 16px 0 16px;
}

.title {
    font-size: 24px;
    font-weight: 700;
    padding: 30px 0 15px 0;
    margin: 0;
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
    padding-bottom: 5px;
    
}

</style>