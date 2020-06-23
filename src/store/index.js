// store入口管理
import Vue from 'vue';
import Vuex from 'vuex';
import source from './modules/source/mutations';

Vue.use(Vuex);

const state = {};

export default new Vuex.Store({
  // mutations: rootMutation,
  modules: {
    source
  },
  strict: true,
  plugins: []
});
