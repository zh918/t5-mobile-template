// 自定义样式及reset
import "./style/reset.scss";
import "./style/common.scss";

import Vue from "vue";
import App from "./App.vue";

import "./common/storage";
import "./common/util";
import router from "./router/index";
import store from "./store/index";
import "./config/env";
import "./common/http";
import './components/pagoda'
import { authRouter } from "./common/auth";

const globalVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

window.globalVue = globalVue;
authRouter(globalVue); 

console.log("环境：", process.env.NODE_ENV);
