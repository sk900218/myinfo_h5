//API地址
var API_URL = 'http://192.168.21.126/';
/* API代理 */
var apiProxy = {
	//常量集
	consts: {
		codes: {
			SUCCESS: 200, //成功
			AUTH_ERROR: 300, //鉴权失败
		}
	},
	//地址集
	urls: {
		//登录
		USER_LOGIN: API_URL + 'user/user/login',
		//注册
		USER_REGISTER: API_URL + 'user/user/register',
		//验证登录状态
		USER_LOGIN_VALID: API_URL + 'user/auth/token/valid',
	},
	//工具集
	utils: {
		/**
		 * 判断是否成功
		 * @param data
		 */
		isSuccess: function(data) {
			return data.code == apiProxy.consts.codes.SUCCESS;
		},
		/**
		 * 请求访问
		 * @param url 地址
		 * @param method 方法
		 * @param params 参数
		 * @param collback 回调
		 */
		access: function(url, method, params, collback) {
			var token = cache.user.getToken();
			$.ajax({
				headers: {
					'X-AUTH-TOKEN': token
				},
				type: method,
				url: url,
				data: params,
				dataType: "json",
				success: function(data) {
					if(!!collback) {
						collback(data);
					}
				},
				error: function(xhr,textStatus,errorThrown) {
			   　　if (xhr.status == 401) {
			   　　　　 collback(xhr.responseJSON);
				 　}
			　　}
			});
		}
	},
	//接口集
	apis: {
		/**
		 * 登录
		 * @param account 账号
		 * @param password 密码
		 */
		login: function(account, password, collback) {
			var params = {'account': account, 'password': password};
			apiProxy.utils.access(apiProxy.urls.USER_LOGIN, "POST", params, function(data) {
				if(apiProxy.utils.isSuccess(data)) {
					//token
					var token = data.data.token;
					//用户信息
					var userInfo = data.data.sysUser;
					
					/* 存储 */
					cache.user.saveToken(token);
					cache.user.saveUserInfo(userInfo);
				}
				/* 回调 */
				if(!!collback) {
					collback(data);
				}
			});
		},
		/**
		 * 注册
		 * @param account 账号
		 * @param password 密码
		 * @param nickname 昵称
		 */
		register: function(account, password, nickname, collback) {
			var params = {'account': account, 'password': password, 'nickname': nickname};
			apiProxy.utils.access(apiProxy.urls.USER_REGISTER, "POST", params, function(data) {
				/* 回调 */
				if(!!collback) {
					collback(data);
				}
			});
		},
		/**
		 * 验证登录状态
		 */
		loginValid: function(collback) {
			apiProxy.utils.access(apiProxy.urls.USER_LOGIN_VALID, "POST", null, function(data) {
				/* 回调 */
				if(!!collback) {
					collback(data);
				}
			});
		},
	}
}