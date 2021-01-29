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
        setWorksheetForSection(state, { section, lang, entries }) {
            if (state.entries[section] && state.requirements[section]){
                state.entries[section][lang] = entries.list;
                state.requirements[section][lang] = entries.requirements;
            }else{
                state.entries[section] = [];
                state.entries[section][lang] = entries.list;
                state.requirements[section] = [];
                state.requirements[section][lang] = entries.requirements;
            }
        }
    },
    actions: {
        async fetchSections({dispatch, commit}) {
            const sections = await means.getSections();
            commit('setSections', sections);
        },
        async fetchWorksheetForSection({dispatch, commit}, {section, lang}) {
            const entries = await means.getWorksheetsForSection(section, lang);
            commit('setWorksheetForSection', { section, lang, entries });
        }
    },
    getters: {
        sections: state => state.sections,
        entries: state => state.entries,
        requirements: state => state.requirements
    }
}