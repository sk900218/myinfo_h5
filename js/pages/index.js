$(function(){
    $('#fullPage').fullpage({
        sectionsColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
		//进入页面
		afterLoad: function(anchorLink, index) {
			var i = index.index;
			if(i == 0) {
				page1Push();
			} else if(i == 1) {
				page2Push();
			} else if(i == 5) {
				page6Push();
			}
		},
		//离开页面
		onLeave: function(index, nextIndex, direction){
			var i = index.index;
			if(i == 0) {
				page1Pop();
			} else if(i == 1) {
				page2Pop();
			} else if(i == 5) {
				page6Pop();
			}
		}
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
		$("#login").html("注册");
		$(obj).attr("status", "2");
		$("#account").val("");
		$("#password").val("");
		$("#nickname").val("");
	} else {
		//注册状态，切换成登录状态
		$(".page4").find(".nickname").hide();
		$(obj).html("前往注册");
		$("#login").html("登录");
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
function page2Push() {
	page21Charts();
	page22Charts();
	page23Charts();
	page24Charts();
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
			data: [3.5,4,3,3,3,3,3.5,3.5,2.5,4,2.5,3.5]
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
			size: '70%'
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