export default{
    state: {
        worksheets: {},
        requirements: {}
    },
    mutations: {
        setWorksheetForSection(state, { section, worksheets }) {
            state.worksheets[section] = worksheets.list;
            state.requirements[section] = worksheets.requirements;
        }
    },
    actions: {
        async fetchWorksheetForSection({dispatch, commit}, section) {
            const worksheets = await means.getWorksheetsForSection(section);
            commit('setWorksheetForSection', { section, worksheets });
        }
    },
    getters: {
        worksheets: state => state.worksheets,
        requirements: state => state.requirements
    }
}