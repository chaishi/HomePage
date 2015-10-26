/*
 * @author luoxue
 * @time 20151022
 * @description 橙久首页开发js
 */

$(function(){
	var pathname = location.pathname;
	switch(pathname) {
		case '/HomePage/index.html': {
			page_home.getHomeHtml();
			getTopbarHtml(0);
		}break;
		case '/HomePage/aboutUs.html': {
			getTopbarHtml(2);
		}break;
		case '/HomePage/joinUs.html': {
			getTopbarHtml(3);
			page_hiring.init();
		}break;
		default:{}break;
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
			case '公司': {}break;
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
			url: "/HomePage/_topbar.html",
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
			url: "/HomePage/_footer.html",
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
		
	//加载首页content html
	page_home.getHomeHtml = function(){
		$.ajax({
			type: "get",
			url: "/HomePage/_home.html",
			success: function(data) {
				$('#content').html(data);
				bindEvent();
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
	
	page.init = function() {
		bindEvent();
	};
	
	function bindEvent() {
		$('.join-city').on('click', '.one-city', cityChange);
	}
	
	//工作城市切换
	function cityChange() {
		var index = $(this).index();
		setActive(index / 2, '.one-city', 'city-active');
		setActive(index / 2, '.orange-rect', 'visi-show');
	}
	
	
})(page_hiring);
