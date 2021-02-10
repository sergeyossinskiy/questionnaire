import JWT from 'jsonwebtoken';

export default{
    state: {
        token: localStorage.getItem('sso-access-token'),
        level: localStorage.getItem('sso-level'),
        levelData: undefined,
        isAuth: !!localStorage.getItem('sso-access-token')
    },
    mutations: {
        logout(state) {
            localStorage.removeItem('sso-access-token');
            localStorage.removeItem('sso-level');
            state.token = state.level = undefined;
            state.isAuth = !!state.token;
        },
        login(state) {
            state.token = localStorage.getItem('sso-access-token');
            state.level = localStorage.getItem('sso-level');
            state.isAuth = !!state.token;
        },
        readLevel(state){
            if (state.level){
                let position_key = state.level.slice( state.level.lastIndexOf('=')+1 );
                let key = state.level.substr( position_key.slice(0,1), position_key.slice(1,3) );
                let token = state.level.replace(key, "").replace( "="+position_key ,"");
                state.levelData = JWT.verify(token, key);
            }
        }
    },
    actions: {
        async logout({dispatch, commit}) {
            means.logout();
            commit('logout');
        },
        login({dispatch, commit}) {
            commit('login');
            commit('readLevel');
        }
    },
    getters: {
        isAuth: state => state.isAuth,
        token: state => state.token,
        level: state => state.level,
        levelData: state => state.levelData 
    }
}