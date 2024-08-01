<template>
    <div class="safety_zone">
        <div class="container">
            <div class="title">
                자주 묻는 질문
            </div>
            <div class="Qna_title">
                <div class="Qna">Q&A</div>
            <div class="sub_title">
                MeetMe 서비스를 이용하시면서 많이 물어보시는 질문입니다.
            </div>
            </div>
            <div>
                <div class="Qna_box" v-for="(qna, i) in index" :key="i">
                    <div class="qna_content" v-if="this.qna[i]" style="font-size: 18px; font-weight: 600;">
                        {{ 'Q : ' + this.qna[i]}}
                        <button class="down_img" v-if="this.qna[i]" @click="toggleAnswer(i)">
                            <img src="/icon/mypage/qna/down.svg" v-if="activeQna[i]">
                            <img src="/icon/mypage/qna/up.svg" v-if="!activeQna[i]">
                        </button>
                    </div>
                    <transition name="slide-fade">
                        <div class="qna_answer" v-if="activeQna[i]" style="font-size : 16px; font-weight: 500;" >
                            <pre class="answer">
                            <a>
                {{this.answer[i]}}
                            </a>
                            </pre>
                        </div>
                    </transition>
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
            qna : [
                '회원 가입이 되지 않아요',
                '미성년자 서비스를 이용할 수 없나요?',
                '탈퇴는 어떻게 하나요?',
                '연결 해제가 된 상대방과 다시 만날 수 있나요?',
                `좋아요, 관심 목록에서 삭제된 회원이 추천될 수 있나요?`


            ],
            answer : [
                `회원가입이 진행되지 않는 경우는 등록된 연락처 또는 소셜 로그인
                (네이버, 카카오, 구글)로 이미 가입된 계정이 존재하기 때문입니다.
                
                더욱 정확한 확인을 위해 번거로우시겠지만, 아래에 방법을 통해
                가입 여부를 다시 한번 확인하고 문의해 주세요.`,

                `밋미는 건전한 커뮤니티 환경과 서비스를 제공하기 위해 노력하고
                있으며 서비스 이용 약관에 따라 미성년자는 이용이 제한 됩니다.
                 
                제6조 이용 신청의 승낙과 제한 3항: 한국 나이 기준 만 19세 미만의
                미성년자, 법률혼 및 사실혼 상태이거나 이에 준하는 경우 즉시 [신고]
                를 통해 알려주세요`,

                `회원 탈퇴는 마이페이지 -> 회원 탈퇴 -> 계정 삭제를 통해 가능합니다.
                 
                탈퇴 신청 후 반복적인 탈퇴 및 재가입 방지하기 위해 탈퇴 대기 상태
                (5일, 120시간)로 변경되고, 대기 상태 동안 회원님의 정보는 어디에도
                노출되지 않습니다.`,

                `상대방과 단순 채팅 나가기(연결 해제)가 되셨다면 낮은 확률로
                다시 마주칠 수 있습니다.`,

                `좋아요, 관심 목록에서 삭제된 상대 회원은 일정 시간 경과 시
                회원님의 선호 설정에 따라 다시 추천될 수 있습니다.
                
                아래의 경우에는 프로필 추천이 이루어지지 않습니다.
                
                    - 상대 회원이 차단한 경우
                    - 이용 정지 또는 탈퇴한 경우`

            ],
            index: 10,
            activeQna: [],
            matching_status: 0,
            showAnswer: false,
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
        toggleAnswer(index){
            this.activeQna[index] = !this.activeQna[index]
            // if(this.activeQna === index){
            //     this.activeQna = null;
            // } else {
            //     this.activeQna = index;
            // }
        }
    }
}
</script>
<style scoped>

.container {
    min-width: 600px;
    padding: 0 16px 0 16px;
    
}

.mypage_container {
    padding-top: 80px;
}

.Qna_title {
    margin: 20px;
}

.Qna{
    display: flex;
    font-size: 22px;
    font-weight: 600;
}
.sub_title {
    display: flex;
    font-size: 14px;
    color: gray;

}

.Qna_box {
    display: block;
}

.down_img {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    margin-left: auto;
    border: #ffffff00;
    background-color: #ffffff00;
}

.qna_content {
    display: flex;
    padding: 20px;
}

.qna_answer {
    border-top: 1px solid #979595fd;
    border-bottom: 1px solid #979595fd;
    display: flex;
    padding: 20px;
    justify-content: start;
    text-align: left;
}

.answer {
    display: flex;
}

.slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
}


</style>