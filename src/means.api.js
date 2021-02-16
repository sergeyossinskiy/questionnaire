import axios from 'axios';

export class MeansApi {
    api = 'http://means.kgu.kz/api';
    sso_api = 'http://means.kgu.kz/api/sso/services';
    sso_access_token;
    http_options;

    constructor(_axios) {
        this.axios = _axios;
        // this.sso_access_token = localStorage.getItem('sso-access-token');
        // this.http_options = this.sso_access_token ? { headers: { 'sso-access-token': this.sso_access_token } } : {};
    }

    addTokenToHeaders() {
        this.sso_access_token = localStorage.getItem('sso-access-token');
        this.http_options = this.sso_access_token ? { headers: { 'sso-access-token': this.sso_access_token } } : {};
    }

    activeRouteCompactToGET(){
        return {
                    "protocol": window.location.protocol, 
                    "address": window.location.hostname,
                    "port": window.location.port,
                    "pathname": decodeURI(window.location.pathname)
                }
    }

    async university() {
        return (await this.axios.get(this.api + '/management/university_for_partner')).data;
    }

    async logout() {   
        this.addTokenToHeaders();     
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

    async saveAnswers(answers) {
        this.addTokenToHeaders();
        return this.axios.post(this.api + "/questionnaire/answers/save", answers, this.http_options);
    }

    async checkModuleAvailability(module_name) {
        this.addTokenToHeaders();
        module_name = 'quiz_' + module_name;

        let sso_query = this.activeRouteCompactToGET();

        return (await this.axios.post(this.sso_api + "/check_module", {module_name, ...sso_query}, this.http_options)).data;
    }

    async getWorksheets() {
        this.addTokenToHeaders();     
        return (await this.axios.get(this.api + `/questionnaire/worksheets/all`, this.http_options )).data;
    }

    async getWorksheetDependences() {
        this.addTokenToHeaders();    
        return (await this.axios.get(this.api + `/questionnaire/worksheets/dependences`, this.http_options )).data;
    }

    async saveWorksheet(data) {
        this.addTokenToHeaders();    
        return await this.axios.post(this.api + `/questionnaire/worksheets/add`, data, this.http_options );
    }
}  

window.means = new MeansApi(axios);