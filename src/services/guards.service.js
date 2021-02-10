import { AuthGuard, NoauthGuard, AvailableGuard } from '../guards';

export class GuardsService {
    guardsMap = {
        "auth": AuthGuard,
        "noauth": NoauthGuard,
        "available": AvailableGuard
    };
    loadedGuards = {};

    async init(to, from, next) {

        if (to.meta.guards) {
            this.metaGuards(to, from, next);
        }
        else{
            if (to.name == 'Worksheet') {
                this.worksheetGuards(to, from, next);
            }
            else{
               next(); 
            }            
        } 
    }

    async metaGuards(to, from, next) {
        let guards = to.meta.guards;

        await this.executeChain(guards, to, from, next);
    }

    async worksheetGuards(to, from, next) {
        let worksheet_id = to.params.id_worksheet;
        if (!this.loadedGuards[ worksheet_id ]) {
            let data = await means.getRequirementsForWorksheet(worksheet_id);
            this.loadedGuards[ worksheet_id ] = data.map((el) => { return el = el.name;});
        }

        let guards = this.loadedGuards[ worksheet_id ];

        this.executeChain(guards, to, from, next);

        if(guards.length == 0) next();
    }

    async executeChain(guards, to, from, next) {
        let _next;

        for (let index = 0; index < guards.length; index++) {
            let guard = new (this.guardsMap[ guards[index] ]);

            if (guard.canEnter(to, from) !== undefined ) {
                _next = guard.canEnter(to, from);
                
                if (_next.then) {
                    _next.then(value => next(value));
                    break;
                }

                next(_next);
                break;
            }
    
            if (index == (guards.length - 1)) next(_next);
        }
    }
}