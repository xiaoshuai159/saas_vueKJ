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
import dayjs from 'dayjs'


Vue.prototype.$echarts = echarts
// Vue.prototype.$=jquery

Vue.prototype.$http = axios
Vue.prototype.formatDate = formatDate
Vue.prototype.$times = dayjs
Vue.use(Element)
Vue.use(preventClick)
// Vue.use(store)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


