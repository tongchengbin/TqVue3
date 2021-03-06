import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import '@/styles/iconfont.css'
import App from './App'
import router from './router'
import store from './store'
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import  'font-awesome/css/font-awesome.min.css'

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
});

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

//在main.js内
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
