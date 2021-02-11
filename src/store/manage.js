export default{
    state: {
        operation: 'listfiles',
        files: null
    },
    mutations: {
        setOperation(state, data) {
            state.operation = data;
        },
        setFiles(state, data) {
            state.files = data;
        }
    },
    actions: {
        changeOperation({dispatch, commit}, operation) {
            commit('setOperation', operation);
        },
        async fetchFiles({dispatch, commit}) {
            const files = await means.getFiles();
            commit('setFiles', files);
        }
    },
    getters: {
        operation: state => state.operation,
        files: state => state.files
    }
}