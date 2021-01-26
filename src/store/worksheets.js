export default{
    state: {
        worksheets: {}
    },
    mutations: {
        setWorksheetForSection(state, { section, worksheets }) {
            state.worksheets[section] = worksheets;
        }
    },
    actions: {
        async fetchWorksheetForSection({dispatch, commit}, section) {
            const worksheets = await means.getWorksheetsForSection(section);
            commit('setWorksheetForSection', { section, worksheets });
        }
    },
    getters: {
        worksheets: state => state.worksheets
    }
}