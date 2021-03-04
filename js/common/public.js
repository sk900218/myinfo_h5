/** 公共函数 **/
/**
 * 页面便捷跳转
 * @param url
 */
function to(url) {
	location.href = url;
}

/**
 * json转url连接参数
 * @param json
 */
function jsonToUrl(json) {
	return Object.keys(json).filter(key => !!json[key]).map(function (key) {
		return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
	}).join("&");
}

//获得get传参，使用方法：param = getParam(); param['name']
function getParam() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

/**
 * 判断是否为空
 * @param str
 * @returns {boolean}
 */
function isEmpty(str) {
	if(str === undefined || str === "undefined" || str === "" || str === null) {
		return true;
	}
	return false;
}

/**
 * 删除当前url中指定参数
 * @param names 数组或字符串
 * @returns {string}
 */
function funcUrlDel(names) {
	if(typeof(names)=='string'){
		names = [names];
	}
	var loca = window.location;
	var obj = {}
	var arr = loca.search.substr(1).split("&");
	//获取参数转换为object
	for(var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].split("=");
		obj[arr[i][0]] = arr[i][1];
	};
	//删除指定参数
	for(var i = 0; i < names.length; i++) {
		delete obj[names[i]];
	}
	//重新拼接url
	var url = loca.origin + loca.pathname + "?" + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
	return url;
}

/* 本地缓存操作 */
let localCache = {
	/* cookie */
	cookie: {
		/**
		 * cookie写入缓存
		 * @param key
		 * @param value
		 * @param time 存储毫秒数
		 */
		add: function(key, value, time) {
		    var str = key + "=" + escape(value); //编码
		    if (time > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
		        var date = new Date();
		        var ms = time;
		        date.setTime(date.getTime() + ms);
		        str += "; expires=" + date.toGMTString();
		    }
		    document.cookie = str;
		},
		/**
		 * 读取Cookie
		 * @param key
		 */
		get: function(key) {//获取指定名称的cookie的值
		    var arrStr = document.cookie.split("; ");
		    for (var i = 0; i < arrStr.length; i++) {
		        var temp = arrStr[i].split("=");
		        if (temp[0] == key) return unescape(temp[1]);  //解码
		    }
		    return "";
		}
	},
	/* storage */
	localStorage: {
		get: function (name) {
		    return JSON.parse(localStorage.getItem(name));
		},
		set: function (name, val) {
		    localStorage.setItem(name, JSON.stringify(val));
		},
		add: function (name, addVal) {
		    let oldVal = Storage.get(name);
		    let newVal = oldVal.concat(addVal);
		    storage.set(name, newVal);
		}
	},
	sessionStorage: {
		get: function (name) {
		    return sessionStorage.getItem(name);
		},
		set: function (name, val) {
		    sessionStorage.setItem(name, val);
		}
	},
	user: {
		/**
		 * 获取用户会话id
		 */
		getToken: function() {
			return localCache.sessionStorage.get(CONSTS.HEADER_TOKEN_KEY);
		},
		/**
		 * 保存用户会话Token
		 * @param token
		 */
		setToken: function(token) {
			localCache.sessionStorage.set(CONSTS.HEADER_TOKEN_KEY, token);
		}
	}
}