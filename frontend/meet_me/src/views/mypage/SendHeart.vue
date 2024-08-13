<template>
    <div class="safety_zone">
        <div class="container">
            <div class="title">
                활동 내역
            </div>
            <div class="heart_null" v-if="heartData.length == 0">
                <h4>활동 내역이 없습니다.</h4>
            </div>
            <div class="profile_box" v-for="(heart, i) in heartData" :key="i">
                <img class="mini_profile" :src="heart.image_path ? this.$imageFileFormat(heart.image_path) : 'model3.png'">
                <div class="name_title">
                    <div class="status" v-if="(heart.heart)">
                        {{heart.user_nickname}}에게 좋아요를 보냈습니다.
                    </div>
                    <div class="status" v-if="(heart.matching)">
                        {{heart.user_nickname}}에게 매칭신청을 보냈습니다.
                    </div>
                </div>
                    <button class="trash" @click="deleteHeart(heart.heart, heart.matching)">
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
                await this.$api(`/user/sendmatching`, {access_token : this.$getAccessToken() , user_id2}, "POST");
                await this.getHeart();
            }catch(err){
                alert('매칭신청이 중복 되었습니다.');
            }
        },
        async getHeart(){
            const result = await this.$api(`/user/getheart`, {access_token : this.$getAccessToken()},"POST");
            this.heartData = result.heart;
            console.log('ssssssssssssssssssss',this.heartData)
        },
        async deleteMatching(user_id2){
            try{
                await this.$api(`/user/deletematching`, {access_token : this.$getAccessToken() , user_id2}, "POST");
                await this.getHeart();
            }catch(err){
                alert('매칭취소가 실패 했습니다.')
            }
        },
        async deleteHeart(heart, matching){
            if(heart){
                try{
                    await this.$api(`/user/deleteheart`, {access_token : this.$getAccessToken() , user_id2 : heart}, "POST");
                    await this.getHeart();
                }catch(err){
                    alert('좋아요 삭제 실패');
                }
            }else if(matching){
                try{
                    await this.$api(`/user/deletematching`, {access_token : this.$getAccessToken() , user_id2 : matching}, "POST");
                    await this.getHeart();
                }catch(err){
                    alert('매칭취소가 실패 했습니다.')
                }
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
    justify-content: center;
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
    width: 320px;
}

.status {
    font-weight: 400;
    padding: 0 10px 0 10px;
    word-break: break-all;
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

.heart_null {
    padding-top: 50px;
}

</style>