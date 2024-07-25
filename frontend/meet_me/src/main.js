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

const app = createApp(App);

app.use(store);
app.use(vueCookies);
app.$cookies.config("7d");
app.mixin(mixins);
app.use(GChart, {});

app.component('MeetHeader', MeetHeader);
app.component('AdminHeader', AdminHeader);


// createApp(App).use(router).mount('#app')
app.use(router).mount('#app');