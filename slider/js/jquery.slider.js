;(function($){

	/**
	* @Author:Shixian Zheng
	* @Name:slider
	* @CurrentVersion: v1.1 
	* @Email:solvemyquestion@163.com
	* @Date:2011-12-20
	* @Hostory: v1.0 原始版本
	*			v1.1 支持jQ的链式操作
	* @How to use: $('selector').slider();
	*/

	$.fn.slider = function(options){

		var defaults = {
			ChangeTime : 3000,		/*图片轮换时间 type:单位毫秒*/
			FadeinTime : 500,		/*图片淡入时间 type:单位毫秒*/
			PicDes : true,			/*是否显示图片描述 true显示, false不显示 type:boolean*/
			IndexBtn : true,		/*是否显示数字索引 true显示, false隐藏 type:字符串*/
			CurClass : 'current'	/*数字按钮的当前状态的时候 class 名称 type:字符串*/
		};

		var ops = $.extend(defaults, options);
		
		return this.each(function(){
			var box = $(this);
			var _index = 0;
			var _myTimer;
			if(ops.PicDes){
				var strFirstPic = $('ul li',box).eq(0).find('img').attr('alt');
				var picDesHtml = $('<div class="des">' + strFirstPic + '</div>');
				box.append(picDesHtml);
			};
			if(ops.IndexBtn){
				var arr = [];
					arr.push('<dl>')
					for(i = 1; i <= $('li',this).length; i++){
						arr.push('<dd>' +  i + '</dd>');
					};
					arr.push('</dl>');
				var _IndexBtnHtml = $(arr.join(''));
				$(this).append(_IndexBtnHtml);

				$('dl dd',box).hover(function(){
					$(this).addClass(ops.CurClass).siblings().removeClass(ops.CurClass);
					$('ul li',box).eq($(this).index()).fadeIn().siblings().hide();
					if(ops.PicDes){
						var strAlt = $('ul li',box).eq($(this).index()).find('img').attr('alt');
						$('.des').text(strAlt);
					};
					clearTimeout(_myTimer);
				},function(){
					_index = $(this).index();
					autoPlay();
				});
				$('ul li',box).bind('mouseenter',function(){
					clearTimeout(_myTimer);
				});
			};

			function autoPlay(){
				$('dl dd',box).eq(_index).addClass(ops.CurClass).siblings().removeClass(ops.CurClass);
				$('ul li',box).eq(_index).fadeIn(ops.FadeinTime).siblings().hide();		
				if(ops.PicDes){
					var strAlt = $('ul li',box).eq(_index).find('img').attr('alt');
					$('.des').text(strAlt);
				};
				_index = _index >= $('ul li',box).length - 1 ? 0 : ++_index;
				_myTimer = setTimeout(autoPlay,ops.ChangeTime);
			};

			autoPlay();
		});
	};
})(jQuery); 