import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import Global from "./Global";
Vue.use(Global);

import Axios from 'Axios';
Vue.prototype.$axios = Axios;
// request interceptor
Axios.interceptors.request.use(
  config => {
    // 请求前做什么
    return config;
  },
  error => {
    router.push({ path: "/error" });
    return Promise.reject(error)
  }
);
// response interceptor
Axios.interceptors.response.use(
  res => {
    if (res.data.code === "401") {
      // 401 Not Loggin
      Vue.prototype.notifyError(res.data.msg);
    }
  }
)