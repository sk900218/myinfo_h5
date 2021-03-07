$(function(){
    $('#fullPage').fullpage({
        sectionsColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
		//进入页面
		afterLoad: function(anchorLink, index) {
			var i = index.index;
			if(i == 0) {
				page1Push();
			} else if(i == 1) {
				page2Push(0);
			} else if(i == 5) {
				page6Push();
			}
		},
		//离开页面
		onLeave: function(index, nextIndex, direction){
			var i = index.index;
			if(i == 0) {
				page1Pop();
			} else if(i == 5) {
				page6Pop();
			}
		},
		//横向滚动
		afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
			var page = anchorLink.index;
			var slide = slideAnchor.index;
			if(page == 1) {
				//第二页
				page2Push(slide);
			} else if(page == 3 && slide != 0) {
				/* 第死页，并且不是登录注册页 */
				//验证登录
				loginValid(function() {
					//验证通过
					if(page == 3 && slide == 1) {
						//列表页,初始化
						queryBookList(1);
					}
				});
			}
		},
    });
	
	bind();
});

//事件绑定
function bind() {
	//注册与登录切换
	$("#loginRegisterSwitch").on("click", function() {
		loginRegisterSwitch(this);
	});
	
	//左右切换
	$(".page-left").on("click", function() {
		$.fn.fullpage.moveSlideLeft();
	});
	$(".page-right").on("click", function() {
		$.fn.fullpage.moveSlideRight();
	});
	
	/* 图书列表 */
	$("#queryBook").on("click", function() {
		queryBookList();
	});
	$("#bookPrev").on("click", function() {
		var page = $("#page").html();
		if(!!page) {
			queryBookList(parseInt(page) - 1);
		}
	});
	$("#bookNext").on("click", function() {
		var page = $("#page").html();
		if(!!page) {
			queryBookList(parseInt(page) + 1);
		}
	});
	
	/* 添加图书 */
	$("#addBook").on("click", function() {
		showAddBook();
	});
	
	/* page5图片集，阻止冒泡 */
	$(".page5").find(".imgs").on("touchmove", function(event) {
		event.stopPropagation();
	});
	
	/* 随机借阅图书 */
	$("#getBtn").on("click", function() {
		applyRandomBorrow();
	});
	/* 随机归还书籍 */
	$("#putBtn").on("click", function() {
		applyRandomReturn();
	});
}

//跳转到其他页
function toPage(index) {
	$.fn.fullpage.moveTo(index);
}

//登录和注册切换
function loginRegisterSwitch(obj) {
	var status = $(obj).attr("status");
	if(status == "1") {
		//登录状态，切换成注册状态
		$(".page4").find(".nickname").show();
		$(obj).html("前往登录");
		$("#login").hide();
		$("#register").show();
		$(obj).attr("status", "2");
		$("#account").val("");
		$("#password").val("");
		$("#nickname").val("");
	} else {
		//注册状态，切换成登录状态
		$(".page4").find(".nickname").hide();
		$(obj).html("前往注册");
		$("#login").show();
		$("#register").hide();
		$(obj).attr("status", "1");
		$("#account").val("admin");
		$("#password").val("123456");
		$("#nickname").val("");
	}
}

//页面1
function page1Push() {
	var spans = $(".page1").find("div").find("span");
	spans.eq(0).fadeIn(consts.FADE_TIME, function() {
		spans.eq(1).fadeIn(consts.FADE_TIME, function() {
			spans.eq(2).fadeIn(consts.FADE_TIME, function() {
				spans.eq(3).fadeIn(consts.FADE_TIME, function() {
					spans.eq(4).fadeIn(consts.FADE_TIME, function() {
						$("#page1Down").fadeIn(consts.FADE_TIME);
					});
				});
			});
		});
	});
}
function page1Pop() {
	$(".page1").find("div").find("span").fadeOut(consts.FADE_TIME);
	$("#page1Down").hide();
}

//页面2
function page2Push(index) {
	if(index == 0) {
		page21Charts();
	} else if(index == 1) {
		page22Charts();
	} else if(index == 2) {
		page23Charts();
	} else if(index == 3) {
		page24Charts();
	}
}
function page2Pop() {
	
}


//页面6
function page6Push() {
	$(".page6").find("div").find("span").fadeIn(consts.FADE_TIME);
}
function page6Pop() {
	$(".page6").find("div").find("span").fadeOut(consts.FADE_TIME);
}

//后端能力图
function page21Charts() {
	var chart = Highcharts.chart('page21Container', {
		chart: {
			type: 'bar'
		},
		title: {
			text: '后端能力图表<br/>(左右可滑动)',
			style: {
				'font-size': '1.2rem'
			}
		},
		xAxis: {
			categories: ['Java', 'Mysql', 'Oracle', 'SprintMVC', 'Hibernate/JPA', 'Quartz', 'SpringBoot', 'MyBatis', 'Status2', 'Swagger', 'SpringCloud', 'Redis'],
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			max: 5,
			title: {
				text: '熟练度（了解、可用、熟练、掌握、擅长）',
				align: 'high'
			},
			labels: {
				overflow: 'justify'
			}
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true,
					allowOverlap: true // 允许数据标签重叠
				}
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 100,
			floating: true,
			borderWidth: 1,
			backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
			shadow: false,
			enabled: false
		},
		series: [{
			data: [4,4,3,3,3,3,3.5,3.5,2.5,4,2.5,3.5]
		}]
	});
}
//前端能力图
function page22Charts() {
	var chart = Highcharts.chart('page22Container', {
		chart: {
			type: 'bar'
		},
		title: {
			text: '前端能力图表',
			style: {
				'font-size': '1.2rem'
			}
		},
		xAxis: {
			categories: ['Html5', 'CSS3', 'Jquery','Vue','ElementUI','NodeJS','UniApp'],
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			max: 5,
			title: {
				text: '熟练度（了解、可用、熟练、掌握、擅长）',
				align: 'high'
			},
			labels: {
				overflow: 'justify'
			}
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true,
					allowOverlap: true // 允许数据标签重叠
				}
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 100,
			floating: true,
			borderWidth: 1,
			backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
			shadow: false,
			enabled: false
		},
		series: [{
			data: [4,4,4,3,2.5,2,2]
		}]
	});
}
//其他能力图
function page23Charts() {
	var chart = Highcharts.chart('page23Container', {
		chart: {
			type: 'bar'
		},
		title: {
			text: '其他能力图表',
			style: {
				'font-size': '1.2rem'
			}
		},
		xAxis: {
			categories: ['Photoshop','Visio','Windows','Linux','Git','SVN'],
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			max: 5,
			title: {
				text: '熟练度（了解、可用、熟练、掌握、擅长）',
				align: 'high'
			},
			labels: {
				overflow: 'justify'
			}
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true,
					allowOverlap: true // 允许数据标签重叠
				}
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -40,
			y: 100,
			floating: true,
			borderWidth: 1,
			backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
			shadow: false,
			enabled: false
		},
		series: [{
			data: [3,3,4,3,3.5,3]
		}]
	});
}
//个人自评
function page24Charts() {
	var chart = Highcharts.chart('page24Container', {
		chart: {
			polar: true,
			type: 'line'
		},
		title: {
			text: '自我评价',
			style: {
				'font-size': '1.2rem'
			}
		},
		pane: {
			size: '90%'
		},
		xAxis: {
			categories: ['技术能力', '执行力', '人品', '亲和力',
						 '管理能力', '学习力', '适应能力'],
			tickmarkPlacement: 'on',
			lineWidth: 0
		},
		yAxis: {
			gridLineInterpolation: 'polygon',
			lineWidth: 0,
			min: 0
		},
		tooltip: {
			shared: true,
			pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
		},
		legend: {
			align: 'right',
			verticalAlign: 'top',
			y: 70,
			layout: 'vertical',
			enabled: false
		},
		series: [{
			name: '评分',
			data: [8, 7, 8, 7.5, 6, 7, 7.5],
			pointPlacement: 'on'
		}]
	});
}


/* 接口逻辑 start */
//登录
function login() {
	var account = $("#account").val();
	var password = $("#password").val();
	var index = layer.open({type: 2});
	apiProxy.apis.user.login(account, password, function(data) {
		layer.close(index);
		if(apiProxy.utils.isSuccess(data)) {
			//成功
			layer.open({
				content: '欢迎您，' + cache.user.getUserInfo().nickname + '！',
				btn: '确定',
				end: function() {
					$.fn.fullpage.moveSlideRight();
				}
			});
		} else {
			//失败
			layer.open({
				content: data.message,
				btn: '确定'
			});
		}
	});
}
//注册
function register() {
	var account = $("#account").val();
	var password = $("#password").val();
	var nickname = $("#nickname").val();
	var index = layer.open({type: 2});
	apiProxy.apis.user.register(account, password, nickname, function(data) {
		layer.close(index);
		if(apiProxy.utils.isSuccess(data)) {
			//成功
			layer.open({
				content: '注册成功，赶紧去登录吧！',
				btn: '确定',
				end: function() {
					loginRegisterSwitch($("#loginRegisterSwitch"));
					$("#account").val("");
					$("#password").val("");
				}
			});
		} else {
			//失败
			layer.open({
				content: data.message,
				btn: '确定'
			});
		}
	});
}
//验证登录
function loginValid(collback) {
	apiProxy.apis.user.loginValid(function(data) {
		if(!apiProxy.utils.isSuccess(data)) {
			$.fn.fullpage.silentMoveTo(4,0);
			layer.open({
				content: '登录已失效，请重新登录！',
				btn: '确定'
			});
		} else {
			collback();
		}
	});
}

//图书列表查询
var queryBookRows = 10; //默认最大页数
function queryBookList(page) {
	if(!page) {
		//为空设置默认值
		page = $("#page").html();
		if(!!page) {
			page = parseInt(page);
		}
	}
	
	var maxPage = $("#maxPage").html();
	if(!!maxPage) {
		//非初始化
		if(page < 1 || page > parseInt(maxPage)) {
			return;
		}
	}
	
	var index = layer.open({type: 2});
	var bookName = $("#queryBookName").val();
	var row = queryBookRows;
	apiProxy.apis.manager.queryBookList(bookName, page, queryBookRows, function(data) {
		if(apiProxy.utils.isSuccess(data)) {
			//列表填充
			setBookList(data.data);
		} else {
			layer.open({
				content: data.message,
				btn: "确定"
			});
		}
		layer.close(index);
	});
}
//设置图书
function setBookList(data) {
	$(".tr-content").html("");
	for(var i=0; i<data.data.length; i++) {
		var obj = data.data[i];
		var html="";
		html += "<div class=\"tr\">";
		html += "	<div>" + obj.createTime + "<\/div>";
		html += "	<div>" + obj.name + "<\/div>";
		html += "	<div>" + (obj.borrowStatus==1?"已借":"未借") + "<\/div>";
		html += "	<div>";
		html += "		<a href='javascript:;' onclick='showBookBorrow(\""+obj.id+"\")'>记录<\/a>";
		html += "		<a href='javascript:;' onclick='showUpdateBook(\""+obj.id+"\")'>修改<\/a>";
		html += "		<a href='javascript:;' onclick='deleteBook(\""+obj.id+"\", \""+obj.name+"\")'>删除<\/a>";
		html += "	<\/div>";
		html += "<\/div>";
		$(".tr-content").append(html);
	}
	//设置页数
	$("#page").html(data.page);
	$("#maxPage").html(data.maxPage);
}

//添加图书
function showAddBook() {
	layer.open({
		title: [
		  '添加图书',
		  'background-color: #FF4351; color:#fff;'
		],
		content: "<div>录入书名</div><div><input type='text' style='text-align:center;' id='addBookName' class='text' /></div>",
		btn: ['保存', '取消'],
		yes: function() {
			var bookName = $("#addBookName").val();
			var index = layer.open({type: 2});
			apiProxy.apis.manager.saveBook(bookName, function(data) {
				if(apiProxy.utils.isSuccess(data)) {
					layer.open({
						content: "保存成功！",
						btn: "确定",
						end: function() {
							queryBookList();
						}
					});
				} else {
					layer.open({
						content: data.message,
						btn: "确定"
					});
				}
				layer.close(index);
			});
		}
	});
}

//修改图书
function showUpdateBook(id) {
	//查询图书
	var queryIndex = layer.open({type: 2});
	apiProxy.apis.manager.queryBook(id, function(book) {
		layer.close(queryIndex);
		if(apiProxy.utils.isSuccess(book)) {
			layer.open({
				title: [
				  '更新图书',
				  'background-color: #FF4351; color:#fff;'
				],
				content: "<div>录入书名</div><div><input type='text' style='text-align:center;' id='updateBookName' value='"+book.data.name+"' class='text' /></div>",
				btn: ['更新', '取消'],
				yes: function() {
					var bookName = $("#updateBookName").val();
					var index = layer.open({type: 2});
					apiProxy.apis.manager.updateBook(id, bookName, function(data) {
						if(apiProxy.utils.isSuccess(data)) {
							layer.open({
								content: "更新成功！",
								btn: "确定",
								end: function() {
									queryBookList();
								}
							});
						} else {
							layer.open({
								content: data.message,
								btn: "确定"
							});
						}
						layer.close(index);
					});
				}
			});
		} else {
			layer.open({
				content: book.message,
				btn: "确定"
			});
		}
	});
}

//删除图书
function deleteBook(id, name) {
	layer.open({
		content: '确定要删除['+name+']吗？',
		btn: ["确定", "取消"],
		yes: function() {
			var index = layer.open({type: 2});
			apiProxy.apis.manager.deleteBook(id, function(data) {
				if(apiProxy.utils.isSuccess(data)) {
					layer.open({
						content: "删除成功！",
						btn: "确定",
						end: function() {
							queryBookList();
						}
					});
				} else {
					layer.open({
						content: data.message,
						btn: "确定"
					});
				}
				layer.close(index);
			});
		}
	});
}

//打开借阅记录
function showBookBorrow(bookId) {
	var page = 1;
	var rows = 1000; //默认加载最大条数
	var index = layer.open({type: 2});
	apiProxy.apis.manager.queryBookBorrowList(bookId, page, rows, function(data) {
		if(apiProxy.utils.isSuccess(data)) {
			//展示
			var style = "display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 15rem; overflow-y: auto;";
			var html = "<div id='borrowList' style='"+style+"'>";
			if(data.data.data.length == 0) {
				var tempStyle = "width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;";
				html += "<div style='"+tempStyle+"'>暂时无人借阅</div>";
			} else {
				for(var i=0; i<data.data.data.length; i++) {
					var obj = data.data.data[i];
					var tempStyle = "display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; border-bottom: 1px dashed #CCCCCC; margin-bottom: 0.4rem;";
					html += "<div style='"+tempStyle+"'>";
					html += "<div>借阅人：" + obj.userName + "</div>"; //借阅人
					html += "<div>借阅时间：" + obj.createTime + "</div>"; //创建时间
					html += "<div>归还时间：" + (!!obj.returnTime?obj.returnTime:"暂未归还") + "</div>"; //归还时间
					html += "</div>"
				}
			}
			html += "</div>"
			layer.open({
				title: [
				  '借阅列表',
				  'background-color: #FF4351; color:#fff;'
				],
				content: html,
				btn: ["确定"],
			});
			//阻止冒泡
			$("#borrowList").off("touchmove").on("touchmove", function(event) {
				event.stopPropagation();
			});
		} else {
			layer.open({
				content: data.message,
				btn: "确定"
			});
		}
		layer.close(index);
	});
}


//随机借阅书籍
function applyRandomBorrow() {
	//截胡
	var cut = 0;
	if($("#getJh").prop("checked")) {
		cut = 1;
	}
	//数量
	var num = $("#getNum").val();
	if(isNaN(num)) {
		layer.open({
			content: '请输入数字',
			btn: '确定',
			end: function() {
				$("#getNum").focus();
			}
		});
		return;
	}
	num = parseInt(num);
	//调用接口
	$("#getMsg").html("");
	var index = layer.open({type: 2});
	apiProxy.apis.apply.randomBorrow(num, cut, function(data) {
		if(apiProxy.utils.isSuccess(data)) {
			data = data.data;
			var msg = "你成功借阅了<br/>[";
			var arr = new Array();
			for(var i=0; i<data.length; i++) {
				arr.push(data[i].name);
			}
			msg += arr.join("、");
			msg += "]";			$("#getMsg").css("color", "green").html(msg);
		} else {			$("#getMsg").css("color", "red").html(data.message);
		}
		layer.close(index);
	});
}
//随机归还书籍
function applyRandomReturn() {
	//调用接口
	$("#putMsg").html("");
	var index = layer.open({type: 2});
	apiProxy.apis.apply.randomReturn(function(data) {
		if(apiProxy.utils.isSuccess(data)) {
			data = data.data;
			var msg = "你成功归还了[" + data.name + "]";
			$("#putMsg").css("color", "green").html(msg);
		} else {			$("#putMsg").css("color", "red").html(data.message);
		}
		layer.close(index);
	});
}
/* 接口逻辑 end */