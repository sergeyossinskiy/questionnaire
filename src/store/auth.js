export default{
    state: {
        isAuth: !!localStorage.getItem('sso-access-token')
    },
    mutations: {
        logout(state) {
            state.isAuth = false;
        },
        login(state) {
            state.isAuth = !!localStorage.getItem('sso-access-token');
        }
    },
    actions: {
        async logout({dispatch, commit}) {
            //const partner = await means.university();
            commit('logout');
        },
        login({dispatch, commit}) {
            //const partner = await means.university();
            commit('login');
        }
    },
    getters: {
        isAuth: state => state.isAuth
    }
}