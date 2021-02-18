export default{
    state: {
        operation: 'listfiles',
        operation_params: {},
        files: null,
        dependences: null,
        edited: {},
        variants: []
    },
    mutations: {
        setOperation(state, data) {
            state.operation = data;
        },
        setOperationParams(state, data) {
            state.operation_params = data;
        },
        setFiles(state, data) {
            state.files = data;
        },
        clearFiles(state) {
            state.files = null;
        },
        setDependences(state, data) {
            state.dependences = data;
        },
        setEdited(state, { worksheet_id, worksheet }) {
            state.edited[worksheet_id] = worksheet;
        },
        setEditVariants(state, data) {
            state.variants = data;
        },
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
            await means.saveWorksheet(data);
        },
        async fetchEditable({dispatch, commit}, worksheet_id) {
            const worksheet = await means.getWorksheet(worksheet_id);
            commit('setEdited', { worksheet_id, worksheet });
        },
        async editWorksheet({dispatch, commit}, data) {
            console.log( await means.editWorksheet(data) );
        },
    },
    getters: {
        operation: state => state.operation,
        operation_params: state => state.operation_params,
        files: state => state.files,
        dependences: state => state.dependences,
        edited: state => state.edited,
        variants: state => state.variants
    }
}