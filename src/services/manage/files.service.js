export class FilesService {
    
    constructor(_store) {
        this.$store = _store;
    }

    loadFiles() {
        if ( !this.$store.getters.files ){
            spinner.spin();

            this.$store.dispatch('fetchFiles').then(() => {
                spinner.stop();
            });
        }        
    }
  
    getAll() {   
        return this.$store.getters.files;
    }

    loadDependences() {
        if ( !this.$store.getters.dependences ){
            spinner.spin();

            this.$store.dispatch('fetchDependences').then(() => {
                spinner.stop();
            });
        }        
    }

    getDependences() {
        return this.$store.getters.dependences;
    }

    getTypes() {
        if ( this.$store.getters.dependences )
            return this.$store.getters.dependences.types;

        return null;
    }

    getSections() {
        if ( this.$store.getters.dependences )
            return this.$store.getters.dependences.sections;

        return null;
    }
}  