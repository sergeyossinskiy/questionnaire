import { AuthService } from "../services";

export class NoauthGuard{
    auth;

    constructor() { 
        this.auth = new AuthService();
    }

    canEnter(to, from){
        if (this.auth.check()) return { name: 'Home' };        
        return;
    }
}