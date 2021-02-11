import { createStore } from 'vuex';
import app from './app';
import auth from './auth';
import sections from './sections';
import worksheets from './worksheets';
import manage from './manage';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app, auth, sections, worksheets, manage
  }
})
