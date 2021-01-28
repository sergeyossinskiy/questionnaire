export default{
    state: {
        sections: [],
        entries: {},
        requirements: {}
    },
    mutations: {
        setSections(state, data) {
            state.sections = data;
        },
        setWorksheetForSection(state, { section, entries }) {
            state.entries[section] = entries.list;
            state.requirements[section] = entries.requirements;
        }
    },
    actions: {
        async fetchSections({dispatch, commit}) {
            const sections = await means.getSections();
            commit('setSections', sections);
        },
        async fetchWorksheetForSection({dispatch, commit}, section) {
            const entries = await means.getWorksheetsForSection(section);
            commit('setWorksheetForSection', { section, entries });
        }
    },
    getters: {
        sections: state => state.sections,
        entries: state => state.entries,
        requirements: state => state.requirements
    }
}