export default{
    state: {
        worksheet: {}
    },
    mutations: {
        setWorksheet(state, { worksheet_data }) {
            state.worksheet = worksheet_data;
        }
    },
    actions: {
        async fetchWorksheet({dispatch, commit}, worksheet_id) {
            const worksheet_data = await means.getWorksheet(worksheet_id);
            commit('setWorksheet', { worksheet_data });
        },
        clearWorksheet({dispatch, commit}) {
            const worksheet_data = {};
            commit('setWorksheet', { worksheet_data });
        }
    },
    getters: {
        worksheet: state => state.worksheet
    }
}