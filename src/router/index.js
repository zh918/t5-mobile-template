import Vue from 'vue';
import Router from 'vue-router';

import demo from './map/demo/index';

Vue.use(Router);

let routerArray = [
  // { path: '/', redirect: '/login' },
  demo
];

export default new Router({
  mode: 'hash',
  routes: routerArray,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
