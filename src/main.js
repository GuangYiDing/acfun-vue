import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import api from './axios/index'

import VueWechatTitle from 'vue-wechat-title'
import animated from 'animate.css'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

let Base64 = require('js-base64').Base64;
import Jwtdecode from 'jwt-decode'

Vue.prototype.$Base64 = Base64;
Vue.prototype.$Jwtdecode = Jwtdecode;
Vue.prototype.$api = api;

Vue.use(VueQuillEditor)

Vue.use(ElementUI)

Vue.use(VueWechatTitle)

Vue.use(animated)

// Vue.use(api);

Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
