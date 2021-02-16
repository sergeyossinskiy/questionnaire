export default{
    state: {
        operation: 'listfiles',
        files: null,
        dependences: null
    },
    mutations: {
        setOperation(state, data) {
            state.operation = data;
        },
        setFiles(state, data) {
            state.files = data;
        },
        setDependences(state, data) {
            state.dependences = data;
        }
    },
    actions: {
        changeOperation({dispatch, commit}, operation) {
            commit('setOperation', operation);
        },
        async fetchFiles({dispatch, commit}) {
            const worksheets = await means.getWorksheets();
            commit('setFiles', worksheets);
        },
        async fetchDependences({dispatch, commit}) {
            const dependences = await means.getWorksheetDependences();
            commit('setDependences', dependences);
        },
        async saveWorksheet({dispatch, commit}, data) {
            console.log( await means.saveWorksheet(data) );
        }
    },
    getters: {
        operation: state => state.operation,
        files: state => state.files,
        dependences: state => state.dependences
    }
}