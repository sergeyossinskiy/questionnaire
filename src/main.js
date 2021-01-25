import { createApp } from 'vue';
import { i18n } from './config/locale.config';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';
import AuthPlugin from './plugins/auth.plugin';
import ConfigPlugin from './plugins/config.plugin';
import FiltersPlugin from './plugins/filters.plugin';
import './means.api';

createApp(App).use(store)
                .use(router)
                .use(i18n)
                .use(AuthPlugin)
                .use(ConfigPlugin)
                .use(FiltersPlugin)
                .use(PrimeVue)
                .mount('#app');
