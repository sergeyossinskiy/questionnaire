export default{
    state: {
        partner: {}
    },
    mutations: {
        setPartner(state, data) {
            state.partner = data;
        }
    },
    actions: {
        async fetchPartner({dispatch, commit}) {
            const partner = await means.university();
            commit('setPartner', partner);
        }
    },
    getters: {
        partner: state => state.partner
    }
}