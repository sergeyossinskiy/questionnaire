export class GuardsService {
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

        this.executeChain(guards, to, from, next);
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

    executeChain(guards, to, from, next) {
        let _next;

        for (let index = 0; index < guards.length; index++) {
            let item = guards[index];
            import('../guards/' + item + '.guard.js')
            .then(module => {                
                let guard = new module.default();
                if (guard.canEnter(to, from) !== undefined ) {
                    _next = guard.canEnter(to, from);
                }

                if (index == (guards.length - 1)) next(_next);
            })
            .catch(err => { console.log(err) });
        }
    }
}