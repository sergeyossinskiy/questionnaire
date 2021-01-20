import { AuthService } from "@/services";
import { SSOService } from '@/services';
import { SSOParamsService } from '../services';

export default {

  install: (app, options) => {
    let properties = app.config.globalProperties;
    app.config.globalProperties.$auth = new AuthService(
      new SSOService(
        new SSOParamsService( properties.$router )
      )
    );
  }

}