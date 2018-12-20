import axios from 'axios';
import qs from 'qs';
axios.defaults.timeout = 5000;
axios.defaults.baseURL='';
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	config.data = JSON.stringify(config.data);
	config.headers = {
		'Content-Type':'application/x-www-form-urlencoded'
    }
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
	// 对响应数据做点什么
	if(response.data.errCode==2){
		console.log('response.data.errCode=',response.data.errCode);
	}
	return response;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});
const https = {
	//异步请求
	axiosAsync: function (url, type, param, callback) {
		axios({
			method:type,
			url:url,
			data: param
		}).then(function(response){
			if(response.status==200){
				callback(response.data);
			}
			//console.log(response.data);
		}).catch(function(error){
			console.log(error)
		})
	},
	get:function(url, param, callback){
		https.axiosAsync(url, "get", param, callback);
	},
	post:function(url, param, callback){
		https.axiosAsync(url, "post", param, callback);
	},
	delete:function(url, param, callback){
		https.axiosAsync(url, "delete", param, callback);
	},
	put:function(url, param, callback){
		https.axiosAsync(url, "put", param, callback);
	},
	patch:function(url, param, callback){
		https.axiosAsync(url, "patch", param, callback);
	},
}
export default https;
