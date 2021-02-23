export default{
    state: {
        stat_section: 'liststatistics',
        stat_questionnaire: undefined,
    },
    mutations: {
        setStatQuestionnaire(state, { worksheet_data }) {
            state.stat_questionnaire = worksheet_data;
        },
    },
    actions: {
        async fetchStatQuestionnaire({dispatch, commit}, worksheet_id) {
            const worksheet_data = await means.getWorksheetForStat(worksheet_id);
            commit('setStatQuestionnaire', { worksheet_data });
        },
    },
    getters: {
        stat_section: state => state.stat_section,
        stat_questionnaire: state => state.stat_questionnaire,
    }
}