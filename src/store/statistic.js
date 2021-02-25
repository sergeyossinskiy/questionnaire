export default{
    state: {
        stat_section: 'liststatistics',
        stat_questionnaire: undefined,
        results: undefined,
        results_types: undefined
    },
    mutations: {
        setStatQuestionnaire(state, { worksheet_data }) {
            state.stat_questionnaire = worksheet_data;
        },
        setResults(state, data) {
            state.results = data.results;
            state.result_types = data.types;
            state.total_results = data.totalResults;
        }
    },
    actions: {
        async fetchStatQuestionnaire({dispatch, commit}, worksheet_id) {
            const worksheet_data = await means.getWorksheetForStat(worksheet_id);
            commit('setStatQuestionnaire', { worksheet_data });
        },
        async fetchResults({dispatch, commit}, {worksheet_id, params}) {
            const result_data = await means.getResultsForWorksheet(worksheet_id, params);
            commit('setResults', result_data );
        },
        clearResults({dispatch, commit}) {
            commit('setResults', [] );
        }
    },
    getters: {
        stat_section: state => state.stat_section,
        stat_questionnaire: state => state.stat_questionnaire,
        results: state => state.results,
        results_types: state => state.result_types,
        total_results: state => state.total_results
    }
}