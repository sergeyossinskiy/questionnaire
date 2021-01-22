import { AppConfig } from "@/config";

export default {

  install: (app, options) => {
    app.config.globalProperties.$config = AppConfig;
  }

}