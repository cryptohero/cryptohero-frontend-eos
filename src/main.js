// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vueConfig from 'vue-config';
import VueLazyload from 'vue-lazyload';
import AsyncComputed from 'vue-async-computed';
import VueResource from 'vue-resource';
import Element from "element-ui";
import * as config from '@/config';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import store from './store';
import router from './router';
import i18n from './i18n';


Vue.config.productionTip = false;

Vue.use(VueLazyload);
Vue.use(Element);
Vue.use(AsyncComputed);
Vue.use(vueConfig, config);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  components: { App },
  template: '<App/>',
});
