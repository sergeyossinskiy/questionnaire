import { createStore } from 'vuex';
import app from './app';
import auth from './auth';
import sections from './sections';
import worksheets from './worksheets';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app, auth, sections, worksheets
  }
})
