import { AuthService } from "../services";

export class AvailableGuard{

    constructor() {}

    async canEnter(to, from){
        let module_name = to.name.toLowerCase();
        if ( !(await means.checkModuleAvailability(module_name)) ){
            return { name: '404' }; 
        }
        return;
    }
}