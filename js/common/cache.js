/* 缓存管理 */
var cache = {
	consts: {
		user: {
			//用户token的key
			KEY_TOKEN: "X-AUTH-TOKEN",
			//用户信息的key
			KEY_USER_INFO: "SYS_USER_INFO",
		}
	},
	//用户相关
	user: {
		/**
		 * 保存TOKEN
		 * @param token
		 */
		saveToken: function(token) {
			localCache.localStorage.set(cache.consts.user.KEY_TOKEN, token);
		},
		/**
		 * 获取TOKEN
		 */
		getToken: function() {
			return localCache.localStorage.get(cache.consts.user.KEY_TOKEN);
		},
		/**
		 * 保存用户信息
		 * @param userInfo 
		 */
		saveUserInfo: function(userInfo) {
			localCache.localStorage.set(cache.consts.user.KEY_USER_INFO, userInfo);
		},
		/**
		 * 获取用户信息
		 */
		getUserInfo: function() {
			return localCache.localStorage.get(cache.consts.user.KEY_USER_INFO);
		}
	}
}