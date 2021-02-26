import { SSOConfig } from '@/config';

export class SSOService {

    sso_service;
    sso_api;
    paramsService;
    token;

    constructor(_paramsService) {
        this.sso_service = SSOConfig.service;
        this.sso_api = SSOConfig.api;
        this.paramsService = _paramsService || undefined;
    }
    
    redirect(page) {
        let params = this.paramsService.defineParameters();
        let href = this.sso_service + page + this.paramsService.objectToGetParams(params);
        
        window.location.href = href;
    }

    redirectToLogin() {
        this.redirect( "/login");
    }
  
    redirectToRegister() {
        this.redirect( "/register");
    }
}