import { createStore } from 'vuex';
import app from './app';
import auth from './auth';
import sections from './sections';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app, auth, sections
  }
})
