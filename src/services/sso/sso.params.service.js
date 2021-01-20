export class SSOParamsService {
    router;
    route;

    constructor(_router) {
        this.router = _router || undefined;

        if (this.router)
            this.route = this.router.currentRoute;
    }

    urldecode(str) {
        return decodeURIComponent((str + '')
            .replace(/%(?![\da-f]{2})/gi, function () {
                return '%25'
            })
        .replace(/\+/g, '%20'))
    }
    
    get(name){
        return this.gets()[name];
    };

    gets() {
        let request = window.location.search;
        let requests = request.substring(1).split("&");
        let result = new Object();

        for (var i = 0; i < requests.length; i++) {
            let parts = requests[i].split("=");
            result[parts[0]] = this.urldecode( parts[1] );
        }

        return result;
    };

    objectToGetParams(params) {
        let str = "";
    
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            let iterator = Object.keys(params).indexOf(key);
            str += (iterator == 0 ? "?" : "&") + key + "=" + params[key];
          }
        }
        
        return str;
    }

    activeRouteCompactToGET(){
        return {
                    "protocol": window.location.protocol, 
                    "address": window.location.hostname,
                    "port": window.location.port,
                    "pathname": decodeURI(window.location.pathname)
                }
    }

    clearGetParameters(){
        window.location.href =  window.location.protocol +
                        "//" + window.location.hostname +
                        (window.location.port ? ":" + window.location.port : '') +
                        decodeURI(window.location.pathname);
    }

    defineParameters() {
        if ( this.route.value.name == 'Login' ){            
            return this.gets();
        }   
        return this.activeRouteCompactToGET();
    }
}    