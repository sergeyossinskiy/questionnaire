export default{
    state: {
        stat_section: 'liststatistics',
        stat_questionnaire: undefined,
        results: undefined
    },
    mutations: {
        setStatQuestionnaire(state, { worksheet_data }) {
            state.stat_questionnaire = worksheet_data;
        },
        setResults(state, data) {
            state.results = data;
        }
    },
    actions: {
        async fetchStatQuestionnaire({dispatch, commit}, worksheet_id) {
            const worksheet_data = await means.getWorksheetForStat(worksheet_id);
            commit('setStatQuestionnaire', { worksheet_data });
        },
        async fetchResults({dispatch, commit}, worksheet_id) {
            const result_data = await means.getResultsForWorksheet(worksheet_id);
            commit('setResults', result_data );
        }
    },
    getters: {
        stat_section: state => state.stat_section,
        stat_questionnaire: state => state.stat_questionnaire,
        results: state => state.results
    }
}