;(function($){
	/**
	* @Author:Shixian Zheng
	* @Name:scroll
	* @CurrentVersion: v1.0 
	* @Email:qiubis8801@163.com
	* @Date:2012-03-23
	* @How to use: $(selector).scroll();
	*/
	$.fn.scroll = function(options){
		var defaults = ({
			ScrollTime : 3000,  	/*滚动时间间隔 单位:ms*/
			MoveTime : 1000,		/*滚动一个单位所需时间 单位:ms*/
			PicDes : true,			/*默认显示图片描述 type:boolean, false隐藏*/
			IndexBtn : true,		/*默认显示数字索引 type:boolean, false隐藏*/
			CurClass : 'current'	/*数字按钮的当前状态的时候 class 名称 type:string*/
		});
		var ops = $.extend(defaults, options);
		return this.each(function(){
			var box = $(this);
			var index = 0;
			var myTimer;
			var W = $(this).find('ul li').width();
			if(ops.PicDes){
				var _strPicDes = $('ul li',box).eq(0).find('img').attr('alt');
				var _PicDes = $('<p class="des">'+ _strPicDes +'</p>');
				box.append(_PicDes);
			};
			if(ops.IndexBtn){
				var _arr = [];
					_arr.push('<dl>')
					for(i = 1; i <= $('li',box).length; i++){
						_arr.push('<dd>' +  i + '</dd>');
					};
					_arr.push('</dl>');
				var _IndexBtnHtml = $(_arr.join(''));
				box.append(_IndexBtnHtml);
				$('dl dd',box).live('click',function(){
					clearInterval(myTimer);
					$(this).addClass(ops.CurClass).siblings().removeClass(ops.CurClass);
					index = $(this).index()-1;
					if(!$('ul',box).is(':animated')){
						$('ul',box).animate({left: '-' + W * $(this).index()},ops.MoveTime);
					};
					if(ops.PicDes){
						var _strAlt = $('ul li',box).eq($(this).index()).find('img').attr('alt');
						$('.des').text(_strAlt);
					};
				});
				box.mouseenter(function(){
					clearInterval(myTimer);
				}).mouseleave(function(){
					myTimer = setInterval(autoPlay, ops.ScrollTime);
				});
			};
			if(ops.IndexBtn){
				$('dl dd',box).eq(0).addClass(ops.CurClass);
			};
			myTimer = setInterval(autoPlay, ops.ScrollTime);

			function autoPlay(){
				index = index > $('ul li',box).length - 2 ? 0 : ++index;
				if(ops.IndexBtn){
					$('dl dd',box).eq(index).addClass(ops.CurClass).siblings().removeClass(ops.CurClass);
				};
				if(ops.PicDes){
					var _strAlt = $('ul li',box).eq(index).find('img').attr('alt');
					$('.des').text(_strAlt);
				};
				if(!$('ul',box).is(':animated')){
					$('ul',box).animate({left: '-' + W * index},ops.MoveTime);
				};
			};	
		});
	};
})(jQuery)