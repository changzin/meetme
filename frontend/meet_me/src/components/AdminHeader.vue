<template>
  <div>
    <div class="header-container">
      <div class="header-content">
        <img src="/icon/header/headerIcon.svg" alt="Logo" class="logo" />
        <div class="menu-item" @click="this.$router.push({name: 'member'})">회원 관리</div>
        <div class="menu-item" @click="clickIcon('chart'); this.$router.push({name: 'adminanalysis'})">현황 분석</div>
        <div class="menu-item" @click="clickIcon('logout'); logout(); this.$router.push({name: 'loginuser'});">로그아웃</div>
      </div>
    </div>
    <div class="footer-container">
      <div class="footer-content">
        <!-- 마이페이지 아이콘 -->
        <div
          class="menu-item"
          @mouseenter="hoverIcon('user', true)"
          @mouseleave="hoverIcon('user', false)"
          @click="this.$router.push({name: 'member'});"
        >
          <img
            v-if="activeIcon !== 'user' && !hoveredIcon.user"
            src="/icon/mobile_header/solid-user.svg"
            alt="User"
            class="footer-icon"
          />
          <img
            v-else
            src="/icon/mobile_header/user.svg"
            alt="User"
            class="footer-icon"
          />
        </div>

        <!-- 통계 아이콘 -->
        <div
          class="menu-item"
          @click="clickIcon('chart'); this.$router.push({name: 'adminanalysis'});"
        >
          <img
            src="/icon/admin/chart.svg"
            alt="User"
            class="footer-icon"
          />
        </div>

        <!-- 로그아웃 아이콘 -->
        <div
          class="menu-item"
          @click="clickIcon('logout'); this.$router.push({name: 'loginuser'});"
        >
          <img
            src="/icon/chat/out.svg"
            alt="User"
            class="footer-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      activeIcon: null,
      hoveredIcon: {
        main: false,
        recommend: false,
        heart: false,
        chat: false,
        user: false,
      },
    };
  },
  async created(){

  },
  methods: {
    hoverIcon(icon, isHovered) {
      this.hoveredIcon[icon] = isHovered;
    },
    clickIcon(icon) {
      this.activeIcon = icon;
    },
    logout(){
      this.$cookies.remove("meetMeCookie")
      this.$store.commit("user", null);            
      this.$router.push({name: "loginuser"})
    },
    async verifyUser(){
      try{
        const requestBody = {
          access_token: this.$getAccessToken()
        }

        const result = await this.$api("/user/verify", requestBody, "POST");
        
        if(result.status == 200){
          if (result.userCoin.user_type  == 'local')
            console.log("인증성공")
        } 
        else{
          alert("로그인 상태가 아닙니다.");
          this.$router.push({name: "loginuser" });
        }
      }
      catch(err){
        console.error(err);
        alert("예기치 못한 오류가 발생하였습니다.")
      }
    }
  },
};
</script>

<style scoped>
.header-container {
  position: fixed;
  top: 50px;
  left: 30px;
  width: 221px;
  height: auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
}

.header-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.logo {
  margin: 20px auto;
}

.menu-item {
  width: 100%;
  padding: 10px 0;
  text-align: left;
  padding-left: 16px;
  color: #000;
  border-top: 1px solid #e0e0e0;
  cursor: pointer;
}

.menu-item:first-child {
  border-top: none;
}

.footer-container {
  display: none;
  z-index: 999;
}

@media (max-width: 1200px) {
  .header-container {
    display: none; /* 모바일 화면에서는 숨김 */
  }

  .footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 15px;
    left: 10px;
    right: 10px;
    width: 98%;
    height: 46px;
    margin: 0 auto;
    border: 1px solid #dedede;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(30px);
    box-shadow: 0px 4px 20px rgba(81, 81, 81, 0.14);
  }

  .footer-content {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }

  .footer-container .menu-item {
    width: auto;
    padding: 10px;
    text-align: center;
    border-top: none;
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
  }

  .footer-icon {
    width: 24px; /* 적절한 크기로 아이콘 조정 */
    height: 24px;
  }
}
</style>
