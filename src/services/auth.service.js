export class AuthService {
    store;
    sso;
  
    constructor(_store,_sso) {
        this.store = _store || undefined;
        this.sso = _sso || undefined;
    }
  
    attempt(params) { 
  
      if (params['token'] != undefined){ 
        localStorage.setItem('sso-access-token', params['token'] );
        localStorage.setItem('sso-level', params['level'] );
        this.store.dispatch('login');

        this.openDestination( params );
      }    
    }
  
    check() {
        if (localStorage.getItem('sso-access-token') != undefined) return true;
        return false;
    }

    openDestination( params ) {
        let router = this.sso.paramsService.router;
        router.push({ path: params['pathname'] });
    }
  
    logout() {
      
        if ( this.check() ){
            //this.sso.logout( localStorage.getItem('sso-access-token') );

            this.store.dispatch('logout');

            let router = this.sso.paramsService.router;    
            if (router.currentRoute.value.name !== 'Home') {
                router.push({ path: '/home' });
            }
        } 
    }
  
    openSSOLogin() {
      this.sso.redirectToLogin();
    }
  
    openSSORegister() {
      this.sso.redirectToRegister();
    }
}
  