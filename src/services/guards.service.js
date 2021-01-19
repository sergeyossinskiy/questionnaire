export class GuardsService {

    static async init(to, from, next) {
        let guards = to.meta.guards;
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
            .catch(err => {});
        }
    }
}