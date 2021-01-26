import translateFilter from "@/filters/translate.filter";
import dateFilter from "@/filters/date.filter";

export default {

  install: (app, options) => {
    app.config.globalProperties.$filters = {
      translate: translateFilter,
      date: dateFilter
    };
  }

}