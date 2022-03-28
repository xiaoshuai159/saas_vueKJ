import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from '@/api/axios'
import Element from 'element-ui'
import 'jquery'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/styles/index.css'
import preventClick from './utils/controlClickState'
import formatDate from './utils/formatDate'
import * as echarts from 'echarts'
import dayjss from 'dayjs'
import './lib/lib-flexible'
import apiFun from "@/api/api.js";
Vue.prototype.$apiFun = apiFun;//请求接口api

Vue.prototype.$echarts = echarts
// Vue.prototype.$=jquery

Vue.prototype.$http = axios
Vue.prototype.formatDate = formatDate
Vue.prototype.dayjstime = dayjss
Vue.use(Element)
Vue.use(preventClick)
// Vue.use(store)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


