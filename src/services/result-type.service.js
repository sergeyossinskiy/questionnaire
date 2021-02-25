import { EnglishLevelsService, Point100Service, LettersService, GpaService, TraditionalService } from './result-types';

export class ResultTypeService {
    typesMap = {
        "point100": Point100Service,
        "english_levels": EnglishLevelsService,
        "letters": LettersService,
        "gpa": GpaService,
        "traditional": TraditionalService
    };
    
    constructor($this) {
        this.$store = $this.$store;
        this.$t = $this.$t;
    }

    async getTypes() {
        if ( !this.$store.getters.result_types ) {
            await this.$store.dispatch('fetchResultTypes');
        }
        return this.$store.getters.result_types;
    }

    async format(result, count_questions, type_id) {
        if (type_id == undefined || type_id == null) return result;

        let types = await this.getTypes();
        let current_type = types.find(t => t.id == type_id);
        let type_name = current_type ? current_type.name : undefined;
        
        if (type_name == undefined) return result;

        
        let service = new (this.typesMap[ type_name ])(this.$t);

        return service.getResult(result, count_questions);
    }

    convert(result, count_questions, type_id, types) {
        if (type_id == undefined || type_id == null) return result;

        let current_type = types.find(t => t.id == type_id);
        let type_name = current_type ? current_type.name : undefined;
        
        if (type_name == undefined) return result;

        
        let service = new (this.typesMap[ type_name ])(this.$t);

        return service.getResult(result, count_questions);
    }
}  