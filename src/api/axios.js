import axios from 'axios'
import https from 'https'
import router from '@/router' // 引入路由对象实例
const instance = axios.create({
  headers: { 'Content-Type': 'application/json' },
  //忽略证书
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
  // timeout:10000
})
const  that=this
instance.interceptors.response.use(function (response) {
  // 响应数据  返回得到的响应数据  第一层data是axios默认包data, 第二个data是接口返回里面的包的data
  try {
    return response
    
  } catch (error) {
    return response
  }
}, async function (error) {
  // 错误的时候 token容易失效  处理token失效的问题
  // 如何判断失效
  // error  => config (当前请求 的配置) request(请求) response(响应)
  if (error.response && error.response.status === 403) {
    // 将path换成fullPath, 目的是丢失我们的参数
    alert('连接超时，请重新登录')
    router.push('/')
   
  }
  if (error.response && error.response.status === 404) {
    // 将path换成fullPath, 目的是丢失我们的参数
    alert('404')
    

    router.push('/')
  }
  // if (error.response && error.response.status === 500) {
  //   // 将path换成fullPath, 目的是丢失我们的参数
  //   router.push('/notPage')
  // }
  return Promise.reject(error)
})
export default instance
