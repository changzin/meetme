<template>
    <div class="safety_zone">
        <div class="container">
            <div class="title">
                프로필 수정
            </div>
            <div class="profile_image">
            <div v-for="(img, i) in userData.user_image_paths" :key="i">
                <img class="edit_profile" :src="img">
            </div>
            </div>
            <div class="profile_info">
                <div class="name">
                    {{userData.user_nickname}},{{userData.user_age}}
                </div>
                <div class="live">
                    {{userData.user_add}}
                </div>
                <div class="introduce">
                    {{userData.user_introduction}}
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
            userData: {},
        };
    },
    beforeCreate() {},
    async created() {
        this.getUser();
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    methods: {
        async getUser() {
            try{
                const result = await this.$api(`/user/profileinfo`, {user_id: 1}, "POST");
                this.userData = result.user;
                console.log(this.userData)
            }catch(err){
                console.log(err);
            }
        },
    }
}
</script>
<style scoped>

.container {
    min-width: 600px;
    padding: 0 15px 0 15px;
    justify-content: center;
}

.title {
    font-size: 24px;
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
    object-fit: cover;
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
    padding-bottom: 10px;
}

.introduce {
    border-radius: 10px;
    background-color: #F1EFF6;
    padding: 20px;
    text-align: left;
}

</style>