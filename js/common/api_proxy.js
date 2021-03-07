//API地址
// var API_URL = 'http://192.168.21.126/';
var API_URL = 'http://192.168.3.25/';
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
		/* 用户端 */
		//登录
		USER_LOGIN: API_URL + 'user/user/login',
		//注册
		USER_REGISTER: API_URL + 'user/user/register',
		//验证登录状态
		USER_LOGIN_VALID: API_URL + 'user/auth/token/valid',
		
		/* 管理端 */
		//图书列表查询
		MANAGER_BOOK_LIST: API_URL + 'manager/book/list',
		//添加图书
		MANAGER_BOOK_ADD: API_URL + 'manager/book',
		//更新图书
		MANAGER_BOOK_UPDATE: API_URL + 'manager/book',
		//查询图书
		MANAGER_BOOK_QUERY: API_URL + 'manager/book',
		//删除图书
		MANAGER_BOOK_DELETE: API_URL + 'manager/book',
		//借阅记录
		MANAGER_BOOK_BORROW_LIST: API_URL + 'manager/book/borrow/list',
		
		/* 应用端 */
		//随机借阅书籍
		APPLY_RANDOM_BORROW: API_URL + 'apply/book/random/borrow',
		//随机归还书籍
		APPLY_RANDOM_RETURN: API_URL + 'apply/book/random/return',
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
		//用户
		user: {
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
		},
		//管理端
		manager: {
			/**
			 * 读取图书列表
			 * @param bookName
			 * @param page
			 * @param rows
			 * @param collback
			 */
			queryBookList: function(bookName, page, rows, collback) {
				var params = {'bookName': bookName, 'page': page, 'rows': rows};
				apiProxy.utils.access(apiProxy.urls.MANAGER_BOOK_LIST, "GET", params, function(data) {
					/* 回调 */
					collback(data);
				});
			},
			/**
			 * 保存图书
			 * @param bookName
			 * @param collback
			 */
			saveBook: function(bookName, collback) {
				var params = {'name': bookName};
				apiProxy.utils.access(apiProxy.urls.MANAGER_BOOK_ADD, "POST", params, function(data) {
					/* 回调 */
					if(!!collback) {
						collback(data);
					}
				});
			},
			/**
			 * 更新图书
			 * @param id
			 * @param bookName
			 * @param collback
			 */
			updateBook: function(id, bookName, collback) {
				var params = {'id': id, 'name': bookName};
				apiProxy.utils.access(apiProxy.urls.MANAGER_BOOK_UPDATE, "PUT", params, function(data) {
					/* 回调 */
					if(!!collback) {
						collback(data);
					}
				});
			},
			/**
			 * 查询图书
			 * @param id
			 * @param collback
			 */
			queryBook: function(id, collback) {
				apiProxy.utils.access(apiProxy.urls.MANAGER_BOOK_QUERY + "/" + id, "GET", null, function(data) {
					/* 回调 */
					if(!!collback) {
						collback(data);
					}
				});
			},
			/**
			 * 删除图书
			 * @param id
			 * @param collback
			 */
			deleteBook: function(id, collback) {
				apiProxy.utils.access(apiProxy.urls.MANAGER_BOOK_DELETE + "/" + id, "DELETE", null, function(data) {
					/* 回调 */
					if(!!collback) {
						collback(data);
					}
				});
			},
			/**
			 * 读取图书借阅列表
			 * @param bookId
			 * @param page
			 * @param rows
			 * @param collback
			 */
			queryBookBorrowList: function(bookId, page, rows, collback) {
				var params = {'bookId': bookId, 'page': page, 'rows': rows};
				apiProxy.utils.access(apiProxy.urls.MANAGER_BOOK_BORROW_LIST, "GET", params, function(data) {
					/* 回调 */
					collback(data);
				});
			},
		},
		//应用端
		apply: {
			/**
			 * 随机借阅书籍
			 * @param num 数量
			 * @param cut 是否有几率截胡
			 * @param collback
			 */
			randomBorrow: function(num, cut, collback) {
				var params = {'num': num, 'cut': cut};
				apiProxy.utils.access(apiProxy.urls.APPLY_RANDOM_BORROW, "POST", params, function(data) {
					/* 回调 */
					if(!!collback) {
						collback(data);
					}
				});
			},
			/**
			 * 随机归还书籍
			 * @param collback
			 */
			randomReturn: function(collback) {
				apiProxy.utils.access(apiProxy.urls.APPLY_RANDOM_RETURN, "POST", null, function(data) {
					/* 回调 */
					if(!!collback) {
						collback(data);
					}
				});
			},
		}
	}
}