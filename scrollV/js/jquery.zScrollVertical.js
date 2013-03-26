;(function($){
		   
	/**
	* @Author:Shixian Zheng
	* @Name:zScrollVertical(垂直滚动)
	* @CurrentVersion: v1.0 
	* @Email:solvemyquestion@163.com
	* @Date:2011-12-21
	* @How to use: $(selector).zScrollVertical();
	*/
	
	$.fn.zScrollVertical = function(options){
		var defaults = {	
			type : 'Auto',			   /*滚动的方式:Manual(手动),Auto(自动)*/
			line : 1,					   /*每次滚动的个数*/
			time : 800,					   /*滚动的时间 单位:毫秒*/
			btnUp : 'btn-up',			   /*触发向上滚动的按钮的class名*/
			btnDown : 'btn-down',		   /*触发向下滚动的按钮的class名*/
			blankTime : 3000,			   /*自动滚动的间隔时间 单位:毫秒*/
			direction : 'Down'			   /*自动滚动的方向 此为可选参数 Up(向上-默认),Down(向下)*/
		};
		
		var ops = $.extend(defaults, options);
		
		return this.each(function(){
			var ShowContainer = $(this).find('div');
			var myTimer;
			var H = ShowContainer.find('li').height() * ops.line;
			var _box = $('ul',ShowContainer);
			var _count = _box.find('li').length - ops.line - 1;
								  
			if(ops.type == 'Manual'){
				//手动
				var btnUpHtml = $('<a href="#" class="'+ ops.btnUp +'"></a>');
				var btnDownHtml = $('<a href="#" class="'+ ops.btnDown +'"></a>');
				ShowContainer.after(btnDownHtml)
							 .before(btnUpHtml);
				
				
				//图向下滚动函数
				$('.' + ops.btnUp).bind('click',function(e){
					e.preventDefault();		
					if(!_box.is(':animated')){
						_box.find('li:gt('+ _count +')').prependTo(_box);
						_box.css('top', - H);
						_box.animate({top : '+=' + H},ops.time);
					};
				});
				//图向上滚动函数
				$('.' + ops.btnDown).bind('click',function(e){
					e.preventDefault();
					if(!_box.is(':animated')){
						_box.animate(
							{top:'-' + H},
							ops.time,
							function(){
								_box.find('li:lt('+ ops.line +')').appendTo(_box);
								_box.css('top',0);
							}
						);
					};
				});
			}else if(ops.type == 'Auto'){
				//自动
				if(ops.direction == 'Up'){
					//向上滚动
					var ScrollUp = function(){
						if(!_box.is(':animated')){
							_box.animate(
								{top : '-' + H},
								ops.time,
								function(){
									_box.find('li:lt('+ ops.line +')').appendTo(_box);
									_box.css('top',0);
								}
							);
						};
						myTimer = setTimeout(ScrollUp,ops.blankTime);
					};
					$('li',_box).hover(function(){
						clearTimeout(myTimer);
					},function(){
						ScrollUp();
					});
					myTimer = setTimeout(ScrollUp,ops.blankTime);
					
				}else if(ops.direction == 'Down'){
					//向下滚动
					var ScrollDown = function(){
						if(!_box.is(':animated')){
							_box.find('li:gt('+ _count +')').prependTo(_box);
							_box.css('top',- H);
							_box.animate({top : '+=' + H},ops.time);
						};
						myTimer = setTimeout(ScrollDown,ops.blankTime);
					};
					$('li',_box).hover(function(){
						clearTimeout(myTimer);
					},function(){
						ScrollDown();
					});
					myTimer = setTimeout(ScrollDown,ops.blankTime);
				};
			};
		});
	};
})(jQuery)