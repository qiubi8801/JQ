;(function($){
		   
	/**
	* @Author:Shixian Zheng
	* @Name:scrollV(垂直滚动)
	* @CurrentVersion: v1.0 
	* @Email:solvemyquestion@163.com
	* @Date:2013-03-26
	* @How to use: $(selector).scrollV();
	*/
	
	$.fn.scrollV = function(options){
		var defaults = {	
			button : true,			       /*是否显示手动按钮*/
			line : 1,					   /*每次滚动的个数*/
			time : 800,					   /*滚动的时间 单位:毫秒*/
			btnUp : 'btn-up',			   /*触发向上滚动的按钮的class名*/
			btnDown : 'btn-down',		   /*触发向下滚动的按钮的class名*/
			blankTime : 2000,			   /*自动滚动的间隔时间 单位:毫秒*/
			direction : 'Down'			   /*自动滚动的方向 此为可选参数 Up(向上-默认),Down(向下)*/
		};
		
		var ops = $.extend(defaults, options);
		
		return this.each(function(){
			var myTimer;
			var wrap = $(this);
			var Container = $(this).find('div');
			var _box = $('ul',Container);
			var H = _box.find('li').height() * ops.line;
			var _count = _box.find('li').length - ops.line - 1;
								  
			var btnUpHtml = $('<a href="#" class="'+ ops.btnUp +'"></a>');
			var btnDownHtml = $('<a href="#" class="'+ ops.btnDown +'"></a>');
			Container.after(btnDownHtml).before(btnUpHtml);
			
			$('.' + ops.btnUp).live('click',function(e){
				e.preventDefault();	
				clearInterval(myTimer);	
				ops.direction = 'Up';
				scroll(ops.direction);
			});

			$('.' + ops.btnDown).live('click',function(e){
				e.preventDefault();
				clearInterval(myTimer);
				ops.direction = 'Down';
				scroll(ops.direction);
			});

			myTimer = setInterval(function(){
				scroll(ops.direction);
			},ops.blankTime);

			wrap.mouseenter(function(){
				clearInterval(myTimer);
			}).mouseleave(function(){
				myTimer = setInterval(function(){
					scroll(ops.direction);
				},ops.blankTime);
			});

			function scroll(d){
				if(d == 'Up'){
					if(!_box.is(':animated')){
						_box.find('li:gt('+ _count +')').prependTo(_box);
						_box.css('top', - H);
						_box.animate({top : '+=' + H},ops.time);
					};
				}else if(d == 'Down'){
					if(!_box.is(':animated')){
						_box.animate(
							{top:'-' + H},
							ops.time,
							function(){
								_box.find('li:lt('+ ops.line +')').appendTo(_box);
								_box.css('top',0);
							}
						)
					};
				};
			}
		});
	};
})(jQuery)