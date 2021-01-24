import { createI18n } from 'vue-i18n';
import vocabulary from '@/locales';

export const locales = Object.keys(vocabulary);

export const i18n = createI18n({
    locale: 'ru',
    fallbackLocale: 'ru',
    messages: vocabulary,
    inheritLocale: false,
});