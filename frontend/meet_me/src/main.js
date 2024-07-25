import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import MeetHeader from './components/MeetHeader.vue';
import AdminHeader from './components/AdminHeader.vue';
const app = createApp(App);

app.component('MeetHeader', MeetHeader);
app.component('AdminHeader', AdminHeader);


// createApp(App).use(router).mount('#app')
app.use(router).mount('#app');