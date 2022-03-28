import axios from 'axios'     //引入
// import { getToken } from '@/utils/token'
// import { Toast } from 'vant'; 
import { Message } from 'element-ui'
let baseURL = 'http://10.8.0.120:8022/'

//这一步的目的是判断出当前是开发环境还是生成环境，方法不止一种，达到目的就行
// if(process.env.NODE_ENV=="development"){
//   baseURL=''
// }else{
//   baseURL=''
// }
 
let config = {
  baseURL: baseURL,
  timeout: 30000       //设置最大请求时间
}
const _axios = axios.create(config)
 
/* 请求拦截器（请求之前的操作） */
_axios.interceptors.request.use(
  config => {
      //如果有需要在这里开启请求时的loading动画效果
    //   config.headers.Authorization = getToken;  //添加token,需要结合自己的实际情况添加，
    return config;
  },
  err => Promise.reject(err)
);
 
/* 请求之后的操作 */
_axios.interceptors.response.use(
  res => {
    //在这里关闭请求时的loading动画效果
    //这里用于处理返回的结果，比如如果是返回401无权限，可能会是跳回到登录页的操作，结合自己的业务逻辑写
    if (res.data.code === 401 ) {
        Message.error("无权限操作")
    }
	if (res.data.code === 400 ) {
        Message.error("请求网络失败")
	}
	if (res.data.code === 404 ) {
	    Message.error("请求网络失败")
	}
    return res;
  },
  err => {
    if (err) {
      //在这里关闭请求时的loading动画效果
      Message.error("请求网络失败")
    }
    return Promise.reject(err);
  }
);
 
//封装post,get方法
const http = {
  get(url='',params={}){
    return new Promise((resolve, reject) => {
      _axios({
        url,
        params,
        headers:{'Content-Type': 'application/json;charset=UTF-8'},
        method: 'GET'
      }).then(res => {
        resolve(res.data)
        return res
      }).catch(error => {
        reject(error)
      })
    })
  },
  post(url='',params={}){
    return new Promise((resolve, reject) => {
      _axios({
        url,
        data:params,
        headers:{'Content-Type': 'application/json;charset=UTF-8'},
        method: 'POST'
      }).then(res => {
        resolve(res.data)
        return res
      }).catch(error => {
        reject(error)
      })
    })
  }
}


export default http
