import axios from 'axios'

axios.defaults.timeout = 5000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.baseURL = '/'; //配置接口地址

//(添加请求拦截器)
axios.interceptors.request.use((config) => {
	//在发送请求前，比如添加用户id，token等公共的参数//根据实际情况配置
	config.data.userid = '001'
	config.header.token = '001'
	return config;
}, (error) => {
	return Promise.reject(error); //reject抛出错误的值，会出现在回调的catch回调里面
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
	//对响应数据判断，此处的判断也是根据你的后台实际返回值进行判断，我这里只是个实例
	if (res.data.code==1) {
		return Promise.resolve(res);//reject抛出正确的值，会出现在回调的then回调里面
	}else{
		alert(res.msg)  //提示后台返回的错误值
	}
	return res;
}, (error) => {
	return Promise.reject(error);
});

//返回一个Promise(发送post请求)
export function axiosPost(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(response => {
				resolve(response);
			}, err => {
				reject(err);
			})
			.catch((error) => {
				reject(error)
			})
	})
}
// 返回一个Promise(发送get请求)
export function axiosGet(url, param) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: param
			})
			.then(response => {
				resolve(response)
			}, err => {
				reject(err)
			})
			.catch((error) => {
				reject(error)
			})
	})
}
export default {
	axiosPost,
	axiosGet
}
