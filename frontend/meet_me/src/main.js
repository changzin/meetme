import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 라이브러리 + 믹스인
import store from './util/store'
import mixins from './util/mixins'
import vueCookies from 'vue-cookies'
import GChart from 'vue-google-charts'

// Components
import MeetHeader from './components/MeetHeader.vue';
import AdminHeader from './components/AdminHeader.vue';
import ChatModal from './views/chat/ChatModal.vue'
import MemberReportModal from './components/MemberReportModal.vue'
import MemberPayModal from './components/MemberPayModal.vue'
import MemberDetailModal from './components/MemberDetailModal.vue'

import ImageModal from './components/ImageModal.vue'
import ProfileImageModal from './components/ProfileImageModal.vue'

import AlertModal from './components/AlertModal.vue'

// 소켓

import { initializeSocket, getSocket } from './utils/socket'; 


// 소켓 초기화
initializeSocket();




const app = createApp(App);

app.use(store);
app.use(vueCookies);
app.$cookies.config("7d");
app.mixin(mixins);
app.use(GChart, {});

app.component('MeetHeader', MeetHeader);
app.component('AdminHeader', AdminHeader);
app.component('MemberReportModal', MemberReportModal);
app.component('MemberPayModal', MemberPayModal);
app.component('MemberDetailModal', MemberDetailModal);

app.component('ImageModal', ImageModal);
app.component('ProfileImageModal', ProfileImageModal);

app.component('AlertModal', AlertModal);


app.component('ChatModal', ChatModal);
// 소켓을 글로벌 프로퍼티로 등록
app.config.globalProperties.$socket = getSocket();

// createApp(App).use(router).mount('#app')
app.use(router).mount('#app');
window.Kakao.init(process.env.VUE_APP_KAKAO_APP_KEY);





