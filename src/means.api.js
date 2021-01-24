import axios from 'axios';
//import VueAxios from 'vue-axios';

export class MeansApi {
    api = 'http://means.kgu.kz/api/';
    sso_api = 'http://means.kgu.kz/api/sso/services';
    sso_access_token;

    constructor(_axios) {
        this.axios = _axios;
        this.sso_access_token = localStorage.getItem('sso-access-token');
    }

    async university() {
        return (await this.axios.get(this.api + 'management/university_for_partner')).data;
    }

    async logout() {        
        let options = { headers: { 'sso-access-token': this.sso_access_token } };
        console.log( await this.axios.get(this.sso_api + "/logout", options) );
    }
}  

window.means = new MeansApi(axios);