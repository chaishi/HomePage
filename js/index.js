/*
 * @author luoxue
 * @time 20151022
 * @description 橙久首页开发js
 */

(function(window, undefined){
	
	var $contentScreens = $('.content-screens');
	var $contentCircles = $('.content-circles');
	
	//事件绑定
	function bindEvent() {
		$contentCircles.on('click', '.one-circle', function() {
			var index = $(this).index();
			getSlideScreen( index );
			setCircleActive( index );
		});
	}
	
	/*
	 * @description 显示轮播屏幕
	 * @param {Number} index 当前轮播到第几屏幕
	 */
	function getSlideScreen(index) {
		var margin = 100 * index;
		$contentScreens.animate({marginLeft: '-' + margin + '%'});
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
	
	bindEvent();
})(window)
