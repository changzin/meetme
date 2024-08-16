<template>
    <div class="safety_zone">
        <div class="container" v-if="alarmData">
            <div class="title">
                알림
            </div>
            <div class="heart_null" v-if="alarmData.length == 0">
                <h4>받은 알림이 없습니다.</h4>
            </div>
            <div class="profile_box" v-for="(alarm, i) in alarmData" :key="i">
                <img class="mini_profile" :src="alarm.user_image_path ? this.$imageFileFormat(alarm.user_image_path) : 'model3.png'">
                <div class="name_title">
                    <div class="status" v-if="alarm.alarm_type === 'heart'">
                        {{alarm.user_nickname}}님이 좋아요을 보냈습니다.
                    </div>
                    <div class="status" v-if="(alarm.alarm_type === 'matching')&&(alarm.matching_success === 'F')">
                        {{alarm.user_nickname}}님이 매칭신청을 보냈습니다.
                    </div>
                    <div class="status" v-if="(alarm.alarm_type === 'matching')&&(alarm.matching_success === 'T')">
                        {{alarm.user_nickname}}님과 매칭이 성사되었습니다.
                    </div>
                    <div class="status" v-if="(alarm.alarm_type === 'matching_success')&&(alarm.matching_success === 'T')">
                        {{alarm.user_nickname}}님이 매칭을 수락하였습니다.
                    </div>
                </div>
                <div class="button">
                    <div class="matching_button" v-if="(alarm.alarm_type === 'heart')" @click="sendMatching(alarm.send_user_id)">
                        매칭신청
                    </div>
                    <div class="matching_cencel" v-if="(alarm.alarm_type === 'matching')&&(alarm.matching_success === 'F')" @click="acceptMatching(alarm.send_user_id)">
                        매칭수락
                    </div>
                    <div class="matching_complete" v-if="(alarm.alarm_type === 'matching')&&(alarm.matching_success === 'T')">
                        매칭완료
                    </div>
                    <!-- <div class="matching_cencel" v-if="(alarm.matching)" @click="deleteMatching(alarm.user_id)">
                        매칭취소
                    </div> -->
                </div>
                    <button class="trash" @click="deleteAlarm(alarm.alarm_id)">
                        <img src="/icon/mypage/like/trash.svg">
                    </button>
            </div>
        </div>
        <MeetHeader :activeIcon="'heart'" />
    </div>
</template>
<script>
export default {	
    data() {
        return {
            heartData : [],
            alarmData : {}, // 
            userCoin: 0
        };
    },
    beforeCreate() {},
    async created() {
        await this.getAlarm();
        await this.getCoin();
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
                const userConfirmed = confirm("300코인으로 매칭 신청하시겠습니까?");
                // 확인을 눌렀을 경우
                if (!userConfirmed) {
                    return;
                }
                if (this.userCoin < 300){
                    alert("보유 코인이 모자랍니다")
                    this.$router.push({name: 'mypagestore'});
                    return;
                }
                const result = await this.$api(`/user/sendmatching`, {access_token : this.$getAccessToken() , user_id2, useCoin: 300}, "POST");
                if(result.status == 400){
                    alert('매칭신청을 이미 보냈습니다.');
                }else {
                    alert('매칭신청을 보냈습니다.');
                }
                await this.getAlarm();
                await this.getCoin();
            }catch(err){
                console.log(err)
            }
        },
        async acceptMatching(user_id2){
            try{
                await this.$api(`/user/acceptmatching`, {access_token: this.$getAccessToken(), user_id2}, "POST");
                await this.getAlarm();
            }catch(err){
                console.log(err);
            }
        },
        async deleteAlarm(user_id2){
            try{
                await this.$api(`/user/deletealarm`, {access_token : this.$getAccessToken() , user_id2}, "POST");
                await this.getAlarm();
            }catch(err){
                alert('알림삭제가 실패 했습니다.')
            }
        },
        async getAlarm(){
            try{
                const result = await this.$api(`/user/getalarm`, {access_token: this.$getAccessToken()}, "POST");
                this.alarmData = result.alarm;
                console.log('getAlarm', this.alarmData)

            }catch(err){
                console.log(err)
            }
        },
        async getCoin(){
            try{
                const result = await this.$api('/user/coin', {access_token: this.$getAccessToken()}, "POST");
                if (result.status == 200){
                    this.userCoin = result.userCoin;    
                }
                else{
                    alert("유저의 코인 정보를 불러올 수 없습니다.");
                }
            }
            catch(err){
                alert("유저의 코인 정보를 불러올 수 없습니다.");
                console.log(err);
            }
        },
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
    width: 320px;
    text-align: start;
    display: flex;
    align-items: center;
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

.matching_complete {
    border-radius: 10px;
    margin: 0 15px 0 15px;
    padding: 10px 18px;
    background-image: var(--gradient);
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