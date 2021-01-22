import axios from 'axios';
//import VueAxios from 'vue-axios';

export class MeansApi {
    api = 'http://means.kgu.kz/api/';

    constructor(_axios) {
        this.axios = _axios;
    }

    async university() {
        return (await this.axios.get(this.api + 'management/university_for_partner')).data;
    }
}  

window.means = new MeansApi(axios);