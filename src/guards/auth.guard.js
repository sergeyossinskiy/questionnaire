import { AuthService } from "../services";
import { SSOParamsService } from "../services";

export class AuthGuard{
    auth;
    sso_query;

    constructor() { 
        this.auth = new AuthService();
        this.ssoParamsService = new SSOParamsService();
        this.sso_query = this.ssoParamsService.activeRouteCompactToGET();
    }

    canEnter(to, from){
        this.sso_query['pathname'] = to.path;
        if (to.name !== 'Login' && !this.auth.check()) return { name: 'Login', query: this.sso_query };        
        return;
    }
}