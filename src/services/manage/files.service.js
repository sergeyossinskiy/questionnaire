import { locales } from '@/config/locale.config';

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

    getQuestionTypes() {
        if ( this.$store.getters.dependences )
            return this.$store.getters.dependences.question_types;

        return null;
    }

    getResultTypes() {
        if ( this.$store.getters.dependences )
            return this.$store.getters.dependences.result_types;

        return null;
    }

    filterQuestionType(q_types, file_type) {
        let _file_type = this.$store.getters.dependences.types.find( x => x.id == file_type);
        let file_type_name = (_file_type !== undefined) ? _file_type.name : undefined;
        if (file_type_name == "test" || file_type_name == undefined) {
            return q_types.filter((res) => {
                        return res.category == 'Closed';
                    })
        }
        return q_types;
    }

    validation($this) {
        let messages = [];
        if ( $this.data['section_id'] == undefined) messages.push($this.$t('worksheet.enter_section'));
        if ( $this.data['type_id'] == undefined) messages.push($this.$t('worksheet.enter_type'));
        if ( $this.data['lang'] == undefined) messages.push($this.$t('worksheet.enter_lang'));
        //title
        if ( $this.data['title'] == undefined) {
            messages.push($this.$t('worksheet.enter_title'));
        }else{
            locales.forEach(l=> {
                if ($this.data.title[l] == undefined) messages.push($this.$t(`worksheet.enter_title_${l}`));
            });
        }
        //description
        if ( $this.data['description'] == undefined) {
            messages.push($this.$t('worksheet.enter_description'));
        }else{
            locales.forEach(l=> {
                if ($this.data.description[l] == undefined) messages.push($this.$t(`worksheet.enter_description_${l}`));
            });
        }
        if ( $this.data.questions.length == 0) messages.push($this.$t('worksheet.enter_questions'));
        
        messages.forEach(m => {
            $this.$toast.add({severity:'warn', summary: m, life: 3000});
        });

        return !messages.length;
    }

    save(data) {
        this.$store.dispatch('saveWorksheet', data);
    }
}  