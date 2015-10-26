/*
 * @author luoxue
 * @time 20151022
 * @description 橙久首页开发js
 */

(function(window, undefined){
	
	
	function init() {
		var pathname = location.pathname;
		switch(pathname) {
			case '/HomePage/index.html': {getHomeHtml();}break;
			case '/HomePage/joinUs.html': {}break;
			default:{}break;
		}
		getTopbarHtml();
		getFooterHtml();
	}
	
	//事件绑定
	function bindEvent() {
		$('.content-circles').on('click', '.one-circle', function() {
			var index = $(this).index();
			getSlideScreen( index );
			setCircleActive( index );
		});
	}
	
	//为topbar添加点击事件
	function addClickToTop() {
		$('.topbar-right').on('click', 'li', switchPage);
	}
	
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
	
	function setTopbarActive(index) {
		$('.topbar-right li').each(function(i) {
			if(i === index) {
				$(this).addClass('topbar-bg');
			}else {
				$(this).removeClass('topbar-bg');
			}
		})
	}
	
	/*
	 * @description 显示轮播屏幕
	 * @param {Number} index 当前轮播到第几屏幕
	 */
	function getSlideScreen(index) {
		var margin = 100 * index;
		$('.content-screens').animate({marginLeft: '-' + margin + '%'});
	}
	
	/*
	 * @description 激活小圆点
	 * @param {Number} index 小圆点下标。用户点击某个小圆点时，将某个小圆点设置为激活状态，其它小圆点为非激活状态
	 */
	function setCircleActive(index) {
		$('.one-circle').each(function(i){
			if(i === index) {
				$(this).addClass('circle-bg');
			}else {
				$(this).removeClass('circle-bg');
			}
		});
	}
	
	//加载首页content
	function getHomeHtml() {
		$.ajax({
			type: "get",
			url: "/HomePage/_home.html",
			success: function(data) {
				$('#content').html(data);
				bindEvent();
			}
		});
	}
	
	//加载topbar
	function getTopbarHtml() {
		$.ajax({
			type: "get",
			url: "/HomePage/_topbar.html",
			success: function(data) {
				$('#topbar').html(data);
				addClickToTop();
				var pathname = location.pathname;
				switch(pathname) {
					case '/HomePage/index.html': {setTopbarActive(0)}break;
					case '/HomePage/aboutUs.html': {setTopbarActive(2)}break;
					case '/HomePage/joinUs.html': {setTopbarActive(3)}break;
					default:break;
				}
			}
		});
	}
	
	//加载footer
	function getFooterHtml() {
		$.ajax({
			type: "get",
			url: "/HomePage/_footer.html",
			success: function(data) {
				$('#footer').html(data);
			}
		});
	}
	
	init();
})(window)
