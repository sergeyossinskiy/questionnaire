import { AuthService } from "../services";

export default class AuthGuard{
    auth;
    constructor() { 
        this.auth = new AuthService();
    }

    canEnter(to, from){
        if (to.name !== 'Login' && !this.auth.check()) return { name: 'Login' };        
        return;
    }
}