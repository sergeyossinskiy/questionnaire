import translateFilter from "@/filters/translate.filter";

export default {

  install: (app, options) => {
    app.config.globalProperties.$filters = {
      translate: translateFilter
    };
  }

}