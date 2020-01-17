import JsonP from 'jsonp'
import axios from 'axios'
import { Toast } from 'antd-mobile'

export default class Axios {

	//跨域请求第三方api
	static jsonp(options) {
		return new Promise((resolve, reject) => {
			JsonP(options.url, {
				param: 'callback'
			}, function (err, response) {
				if (response.status === 'success') {
					resolve(response);
				} else {
					reject(response.messsage);
				}
			})
		})
	}

	//ajax二次封装，拦截器
	static ajax(options) {
		if (options.data && options.data.isShowLoading !== false) {
			Toast.loading('加载中', 0)
		}
		// let baseApi = 'http://admin.exreact.com';
		return new Promise((resolve, reject) => {
			axios({
				url: options.url,
				method: options.method || 'get',
				// baseURL: baseApi,
				timeout: 5000,
				data: options.data || ''
			}).then((response) => {
				if (options.data && options.data.isShowLoading !== false) {
					Toast.hide()
				}
				if (response.status === 200) {
					let res = response.data;
					resolve(res);
					if (res.code !== 0) {
						Toast.info(res.msg)
					}
				} else {
					reject(response.data);
				}
			})
		});
	}
}