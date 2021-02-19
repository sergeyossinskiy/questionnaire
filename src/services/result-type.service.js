import { EnglishLevelsService, Point100Service, LettersService } from './result-types';

export class ResultTypeService {
    typesMap = {
        "point100": Point100Service,
        "english_levels": EnglishLevelsService,
        "letters": LettersService
    };
    
    constructor(_store) {
        this.$store = _store;
    }

    async getTypes() {
        if ( !this.$store.getters.result_types ) {
            await this.$store.dispatch('fetchResultTypes');
        }
        return this.$store.getters.result_types;
    }

    async format(result, count_questions, type_id) {
        if (type_id == undefined) return result;

        let types = await this.getTypes();
        let current_type = types.find(t => t.id == type_id);
        let type_name = current_type ? current_type.name : undefined;
        
        if (type_name == undefined) return result;

        let service = new (this.typesMap[ type_name ]);

        return await service.getResult(result, count_questions);
    }
}  