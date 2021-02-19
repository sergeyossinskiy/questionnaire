export default{
    state: {
        worksheet: {},
        result_types: localStorage.getItem('result_types')
    },
    mutations: {
        setWorksheet(state, { worksheet_data }) {
            state.worksheet = worksheet_data;
        },
        setResultTypes(state, data) {
            localStorage.setItem('result_types', JSON.stringify(data) );
            state.result_types = data;
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
        },
        saveAnswers({dispatch, commit}, answers) {
            return means.saveAnswers(answers);
        },
        async fetchResultTypes({dispatch, commit}){
            const result_types = await means.getResultTypes();
            commit('setResultTypes', result_types);
        }
    },
    getters: {
        worksheet: state => state.worksheet,
        result_types: (state) => {
            return typeof state.result_types == 'string' ? JSON.parse(state.result_types) : state.result_types;
        }
    }
}