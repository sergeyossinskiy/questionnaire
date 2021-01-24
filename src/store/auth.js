export default{
    state: {
        token: localStorage.getItem('sso-access-token'),
        isAuth: !!localStorage.getItem('sso-access-token')
    },
    mutations: {
        logout(state) {
            localStorage.removeItem('sso-access-token');
            state.token = undefined;
            state.isAuth = !!state.token;
        },
        login(state) {
            state.token = localStorage.getItem('sso-access-token');
            state.isAuth = !!state.token;
        }
    },
    actions: {
        async logout({dispatch, commit}) {
            means.logout();
            commit('logout');
        },
        login({dispatch, commit}) {
            commit('login');
        }
    },
    getters: {
        isAuth: state => state.isAuth,
        token: state => state.token
    }
}