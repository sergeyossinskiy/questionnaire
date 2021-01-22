export class AuthService {
    sso;
  
    constructor(_sso) {
        this.sso = _sso || undefined;
    }
  
    attempt(params) { 
  
      if (params['token'] != undefined){ 
        localStorage.setItem('sso-access-token', params['token'] );

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
  
    openSSOLogout() {
      
      if( this.cookie.check('sso-access-token') ){
        this.sso.logout( 
          this.cookie.get('sso-access-token')
        );
  
        this.cookie.delete('sso-access-token');
        if ( this.router.url != '/home'){
          this.route_service.redirect('home');
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
  