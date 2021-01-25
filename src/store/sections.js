export default{
    state: {
       sections: []
    },
    mutations: {
        setSections(state, data) {
            state.sections = data;
        }
    },
    actions: {
        async fetchSections({dispatch, commit}) {
            const sections = await means.getSections();
            commit('setSections', sections);
        }
    },
    getters: {
        sections: state => state.sections
    }
}