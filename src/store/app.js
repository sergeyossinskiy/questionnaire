import { CookieUtility } from '../utilities/cookie.utility';

export default{
    state: {
        lang: CookieUtility.get('lang') || undefined
    },
    mutations: {
        setLang(state, data) {
            state.lang = data;
        }
    },
    actions: {
        async changeLang({dispatch, commit}, locale) {
            CookieUtility.set('lang', locale);
            commit('setLang', locale);
        }
    },
    getters: {
        lang: state => state.lang
    }
}