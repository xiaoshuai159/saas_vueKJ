import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import * as echarts from "echarts"
import App from './App.vue'
import axios from '@/api/axios'
import router from './router/index.js'
import store from './store'
import * as echarts from 'echarts'
// import less from 'less'
// Vue.use(less)
// import {postRequest} from "./utils/api"
// import {putRequest} from "./utils/api"
// import {getRequest} from "./utils/api"
// import {deleteRequest} from "./utils/api"
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
// Vue.prototype.$bus = new Vue()
// axios.defaults.baseURL = 'http://127.0.0.1:5000/'
Vue.prototype.$http = axios
// //插件形式使用请求
// Vue.prototype.postRequest = postRequest;
// Vue.prototype.putRequest = putRequest;
// Vue.prototype.getRequest = getRequest;
// Vue.prototype.deleteRequest = deleteRequest;
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
