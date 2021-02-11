export class FilesService {
    
    constructor(_store) {
        this.$store = _store;
        this.$store.dispatch('fetchFiles');
    }
  
    getAll() {   
        return this.$store.getters.files;
    }
}  