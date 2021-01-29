import axios from 'axios';
//import VueAxios from 'vue-axios';

export class MeansApi {
    api = 'http://means.kgu.kz/api';
    sso_api = 'http://means.kgu.kz/api/sso/services';
    sso_access_token;
    http_options;

    constructor(_axios) {
        this.axios = _axios;
        this.sso_access_token = localStorage.getItem('sso-access-token');
        this.http_options = { headers: { 'sso-access-token': this.sso_access_token } };
    }

    async university() {
        return (await this.axios.get(this.api + '/management/university_for_partner')).data;
    }

    async logout() {        
        await this.axios.get(this.sso_api + "/logout", this.http_options);
    }

    async getSections() {        
        return (await this.axios.get(this.api + "/questionnaire/sections")).data;
    }

    async getWorksheetsForSection(section, lang) {        
        return (await this.axios.get(this.api + `/questionnaire/worksheets/${section}/${lang}` )).data;
    }

    async getRequirementsForWorksheet(worksheet_id) {        
        return (await this.axios.get(this.api + `/questionnaire/requirements/${worksheet_id}` )).data;
    }

    async getWorksheet(worksheet_id) {        
        return (await this.axios.get(this.api + `/questionnaire/worksheet/${worksheet_id}` )).data;
    }
}  

window.means = new MeansApi(axios);