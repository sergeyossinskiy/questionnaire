import { AuthService } from "../services";

export class AvailableGuard{

    constructor() {}

    async canEnter(to, from){
        let route_name = to.name;
        if (route_name.indexOf(':') != -1) {
            route_name = route_name.replace( route_name.substring(route_name.indexOf(':'),route_name.length),'');
        }
        let module_name = route_name.toLowerCase();
        
        if ( !(await means.checkModuleAvailability(module_name)) ){
            return { name: '404' }; 
        }
        return;
    }
}