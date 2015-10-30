
/* =============================================================================================
 * @description 各种接口变量
 * @author luoxue
 * @time 20151030
 ===============================================================================================*/
var interfaces = {};

(function(interfaces, undefined) {
	//获取顶部相关Html
	interfaces.getTopbarHtml = '_topbar.html';
	
	//获取底部相关html
	interfaces.getFooterHtml = '_footer.html';
	
	//获取主页contetn相关html
	interfaces.getHomeHtml = '_home.html';
	
	//获取职位列表相关数据
	interfaces.getPositionList = 'json/position.json';
	
	//获取职位描述
	interfaces.getPositionDesc = 'json/positionDes.json';
})(interfaces)


/* =============================================================================================
 * @description 根据不同的页面加载不同的内容
 * @author luoxue
 * @time 20151020
 ===============================================================================================*/
$(function(){
	var str = location.pathname;
	var pathname = '/';
	var arr = str.match(/\/\w+.html$/);
	if(arr) {
		pathname = arr[0];
	}
	switch(pathname) {
		case '/index.html': {
			page_home.getHomeHtml();
			getTopbarHtml(0);
		}break;
		case '/aboutUs.html': {
			getTopbarHtml(2);
		}break;
		case '/joinUs.html': {
			getTopbarHtml(3);
			page_hiring.init();
		}break;
		default:{
			page_home.getHomeHtml();
			getTopbarHtml(0);
		}break;
	}
	getFooterHtml();
});


/*=================================================================================================
 * @description 公共js 
 ==================================================================================================*/

(function(window, undefined){
	
	//为topbar添加点击事件
	function addClickToTop() {
		$('.topbar-right').on('click', 'li', switchPage);
	}
	
	//页面切换
	function switchPage() {
		var pageTitle = $(this).html();
		switch(pageTitle) {
			case '首页': {location.href = 'index.html';}break;
			case '公司动态': {}break;
			case '关于我们': {location.href = 'aboutUs.html';}break;
			case '招贤纳士': {location.href = 'joinUs.html';}break;
			default:break;
		}
	}
	
	/*
	 * @description 将列表中的某一项设为激活状态
	 * @param {Number} index 将下标为index的那一项设为激活状态
	 * @param {String} select 列表选择器
	 * @param {String} classi 用来激活列表的class类
	 */
	window.setActive = function(index, select, classi) {
		$(select).each(function(i) {
			if(i === index) {
				$(this).addClass(classi);
			}else {
				$(this).removeClass(classi);
			}
		})
	}
	
	/*
	 * @description 加载topbar
	 * @param {number} index eg: index = 3, 在招贤纳士页面，便将对应的topbar背景色切换
	 */
	window.getTopbarHtml = function(index) {
		$.ajax({
			type: "get",
			url: interfaces.getTopbarHtml,
			success: function(data) {
				$('#topbar').html(data);
				addClickToTop();
				setActive(index, '.topbar-right li', 'topbar-bg');
			}
		});
	}
	
	//加载footer
	window.getFooterHtml = function() {
		$.ajax({
			type: "get",
			url: interfaces.getFooterHtml,
			success: function(data) {
				$('#footer').html(data);
			}
		});
	}
	
})(window);

/* ===========================================================================================
 * @description 首页相关js
 * @author luoxue
 * @time 20151022
 =============================================================================================*/

var page_home = {};

(function(page_home, undefined){
	
	//用于自动轮播的计数器，统计当前已经轮播到哪一屏
	//var index = 0;
	
	//事件绑定
	function bindEvent() {
		$('.content-circles').on('click', '.one-circle', function() {
			var index = $(this).index();
			getSlideScreen( index );
			setActive( index, '.one-circle', 'circle-bg' );
		});
	}
	
	/*
	 * @description 显示轮播屏幕
	 * @param {Number} index 当前轮播到第几屏幕
	 */
	function getSlideScreen(index) {
		var margin = 100 * index;
		$('.content-screens').animate({marginLeft: '-' + margin + '%'});
	}
	
	//自动轮播
	function carouselSlide(index) {
		getSlideScreen(index);
		setTimeout(function() {
			if(index === 2) {
				index = -1;
			}
			carouselSlide(index + 1);
			setActive( index + 1, '.one-circle', 'circle-bg' );
		}, 3000);
	}
		
	//加载首页content html
	page_home.getHomeHtml = function(){
		$.ajax({
			type: "get",
			url: interfaces.getHomeHtml,
			success: function(data) {
				$('#content').html(data);
				bindEvent();
				carouselSlide(0);
			}
		});
	}
	
})(page_home)


/* ==================================================================================================
 * @description 招贤纳士（加入我们） 相关js
 * @author luoxue
 * @time 20151022
 ====================================================================================================*/

var page_hiring = {};

(function(page, undefined){
	
	var positionDesc = {};
	var $posList = $('.pos-list');
	var $positionDesc = $('.position-desc');
	
	page.init = function() {
		bindEvent();
		getPositionDesc();
	};
	
	//事件绑定
	function bindEvent() {
		$('.join-city').on('click', '.one-city', cityChange);
	}
	
	//工作城市切换
	function cityChange() {
		var index = $(this).index();
		setActive(index / 2, '.one-city', 'city-active');
		setActive(index / 2, '.orange-rect', 'visi-show');
		var city = $(this).find('span').html();
		switch(city){
			case "上海": {
				getPositionListByCity();
				$positionDesc.show();
			}break;
			default: {
				$posList.html('<span class="one-position display">该城市暂无职位</span>');
				$positionDesc.hide();
			}break;
		}
	}
	
	//职位切换，描述内容更换
	function positionChange() {
		var index = $(this).index();
		var posDesc = positionDesc[index].description;
		var posRequ = positionDesc[index].requirement;
		var htmlArr = [];
		for(var i = 0, len = posDesc.length; i < len; i++) {
			htmlArr.push('<li>'+posDesc[i]+'</li>');
		}
		document.getElementById('positionDesc').innerHTML = htmlArr.join('');
		
		htmlArr.length = 0;
		for(var j = 0, len = posDesc.length; j < len; j++) {
			htmlArr.push('<li>'+posDesc[j]+'</li>');
		}
		document.getElementById('positionRequirement').innerHTML = htmlArr.join('');
		
		setActive(index, '.one-position', 'active');
	}
	
	//ajax,根据城市名称获取职位列表
	function getPositionListByCity() {
		$.getJSON(
			interfaces.getPositionList,
			function(data) {
				var list = data.position[0].posList;
				var htmlArr = [];
				for(var i = 0, len = list.length; i < len; i++) {
					htmlArr.push('<span class="one-position display">'+list[i]+'</span>');
				}
				$posList.html(htmlArr.join(''));
				setActive(0, '.one-position', 'active');
				$posList.on('click', '.one-position', positionChange);
			}
		);
	}

	//ajax,获取职位描述
	function getPositionDesc() {
		$.getJSON(
			interfaces.getPositionDesc,
			function(data) {
				positionDesc = data.descList;
			}
		);
	}
})(page_hiring);

