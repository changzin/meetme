<template>
    <div>
      <div class="header-container">
        <div class="header-content">
          <img src="/icon/header/headerIcon.svg" alt="Logo" class="logo" />
          <div class="menu-item" @click="this.$router.push({name: 'member'})">회원 관리</div>
          <div class="menu-item" @click="this.$router.push({name: 'analysis'})">현황 분석</div>
          <div class="menu-item">로그아웃</div>
        </div>
      </div>
      <div class="footer-container">
        <div class="footer-content">
          <!-- 메인 아이콘 -->
          <div
            class="menu-item"
            @mouseenter="hoverIcon('main', true)"
            @mouseleave="hoverIcon('main', false)"
            @click="clickIcon('main')"
          >
            <img
              v-if="activeIcon !== 'main' && !hoveredIcon.main"
              src="/icon/mobile_header/solid-main.svg"
              alt="Main"
              class="footer-icon"
            />
            <img
              v-else
              src="/icon/mobile_header/main.svg"
              alt="Main"
              class="footer-icon"
            />
          </div>
          <!-- 추천 아이콘 -->
          <div
            class="menu-item"
            @mouseenter="hoverIcon('recommend', true)"
            @mouseleave="hoverIcon('recommend', false)"
            @click="clickIcon('recommend')"
          >
            <img
              v-if="activeIcon !== 'recommend' && !hoveredIcon.recommend"
              src="/icon/mobile_header/solid-recommend.svg"
              alt="Recommend"
              class="footer-icon"
            />
            <img
              v-else
              src="/icon/mobile_header/recommend.svg"
              alt="Recommend"
              class="footer-icon"
            />
          </div>
  
          <!-- 알람 아이콘 -->
          <div
            class="menu-item"
            @mouseenter="hoverIcon('heart', true)"
            @mouseleave="hoverIcon('heart', false)"
            @click="clickIcon('heart')"
          >
            <img
              v-if="activeIcon !== 'heart' && !hoveredIcon.heart"
              src="/icon/mobile_header/solid-heart.svg"
              alt="Heart"
              class="footer-icon"
            />
            <img
              v-else
              src="/icon/mobile_header/heart.svg"
              alt="Heart"
              class="footer-icon"
            />
          </div>
  
          <!-- 채팅 아이콘 -->
          <div
            class="menu-item"
            @mouseenter="hoverIcon('chat', true)"
            @mouseleave="hoverIcon('chat', false)"
            @click="clickIcon('chat')"
          >
            <img
              v-if="activeIcon !== 'chat' && !hoveredIcon.chat"
              src="icon/mobile_header/solid-chat.svg"
              alt="Chat"
              class="footer-icon"
            />
            <img
              v-else
              src="icon/mobile_header/chat.svg"
              alt="Chat"
              class="footer-icon"
            />
          </div>
  
          <!-- 마이페이지 아이콘 -->
          <div
            class="menu-item"
            @mouseenter="hoverIcon('user', true)"
            @mouseleave="hoverIcon('user', false)"
            @click="clickIcon('user')"
          >
            <img
              v-if="activeIcon !== 'user' && !hoveredIcon.user"
              src="/icon/mobile_header/solid-user.svg"
              alt="User"
              class="footer-icon"
            />
            <img
              v-else
              src="icon/mobile_header/user.svg"
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
    methods: {
      hoverIcon(icon, isHovered) {
        this.hoveredIcon[icon] = isHovered;
      },
      clickIcon(icon) {
        this.activeIcon = icon;
      },
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
  }
  
  @media (max-width: 1500px) {
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
  