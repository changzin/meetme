import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import MeetHeader from './components/MeetHeader.vue';
const app = createApp(App);

app.component('MeetHeader', MeetHeader);


// createApp(App).use(router).mount('#app')
app.use(router).mount('#app');