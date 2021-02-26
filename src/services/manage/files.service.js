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

    loadFilesWithTrashed() {
        if ( !this.$store.getters.files ){
            spinner.spin();

            this.$store.dispatch('fetchFilesWithTrashed').then(() => {
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

    getRequirements() {
        if ( this.$store.getters.dependences )
            return this.$store.getters.dependences.requirements;

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
        let data = this.$store.getters.edited[$this.worksheet_id];
        
        if (!data) data = $this.data;

        if ( data['section_id'] == undefined) messages.push($this.$t('worksheet.enter_section'));
        if ( data['type_id'] == undefined) messages.push($this.$t('worksheet.enter_type'));
        if ( data['lang'] == undefined) messages.push($this.$t('worksheet.enter_lang'));
        //title
        if ( data['title'] == undefined) {
            messages.push($this.$t('worksheet.enter_title'));
        }else{
            let title;
            if (typeof data.title == 'string') title = JSON.parse(data.title);
            else title = data.title;
                
            locales.forEach(l=> {
                if (title[l] == undefined) messages.push($this.$t(`worksheet.enter_title_${l}`));
            });
        }
        //description
        if ( data['description'] == undefined) {
            messages.push($this.$t('worksheet.enter_description'));
        }else{
            let description;
            if (typeof data.description == 'string') description = JSON.parse(data.description);
            else description = data.description;

            locales.forEach(l=> {
                if (description[l] == undefined) messages.push($this.$t(`worksheet.enter_description_${l}`));
            });
        }
        if ( $this.data.questions.length == 0) messages.push($this.$t('worksheet.enter_questions'));
        
        messages.forEach(m => {
            $this.$toast.add({severity:'warn', summary: m, life: 3000});
        });

        return !messages.length;
    }

    save($this) {
        try {
            spinner.spin();
            this.$store.dispatch('saveWorksheet', $this.data).then(() => {
                this.$store.commit('clearFiles');
                $this.toList();
                spinner.stop();
            });
        } catch (error) {
            spinner.stop();
            $this.$toast.add({severity:'error', summary: error, life: 3000});
        }        
    }

    loadWorksheet(worksheet_id) {
        if ( !this.$store.getters.edited[worksheet_id] ){
            spinner.spin();

            this.$store.dispatch('fetchEditable', worksheet_id).then(() => {
                spinner.stop();
            });
        }        
    }

    edit($this) {
        try {
            spinner.spin();
            this.$store.dispatch('editWorksheet', $this.data).then(() => {
                this.$store.commit('clearFiles');
                $this.toList();
                spinner.stop();
            });
        } catch (error) {
            spinner.stop();
            $this.$toast.add({severity:'error', summary: error, life: 3000});
        }        
    }

    delete($this) {
        try {
            spinner.spin();
            this.$store.dispatch('deleteWorksheet', $this.data).then((response) => {
                this.$store.commit('clearFiles');
                $this.toList();
                spinner.stop();
            });
        } catch (error) {
            spinner.stop();
            $this.$toast.add({severity:'error', summary: error, life: 3000});
        }        
    }
}  