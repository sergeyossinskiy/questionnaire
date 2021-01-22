import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './means.api';
import PrimeVue from 'primevue/config';
import AuthPlugin from './plugins/auth.plugin';
import ConfigPlugin from './plugins/config.plugin';

createApp(App).use(store)
                .use(router)
                .use(AuthPlugin)
                .use(ConfigPlugin)
                .use(PrimeVue)
                .mount('#app');
