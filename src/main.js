import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import AuthPlugin from './plugins/auth.plugin';

createApp(App).use(store).use(router).use(AuthPlugin).use(PrimeVue).mount('#app');
