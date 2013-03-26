;(function($){
		   
	/**
	* @Author:Shixian Zheng
	* @Name:scrollH(垂直滚动)
	* @CurrentVersion: v1.0 
	* @Email:qiubi8801@163.com
	* @Date:2011-12-25
	* @How to use: $(selector).scrollH();
	*/
	
	$.fn.scrollH = function(options){
		var defaults = {			
			button : false,			       /*是否显示手动按钮*/
			line : 1,					   /*每次滚动的个数*/
			time : 800,					   /*滚动的时间 单位:毫秒*/
			btnLeft : 'btn-left',		   /*触发向上滚动的按钮的class名*/
			btnRight : 'btn-right',		   /*触发向下滚动的按钮的class名*/
			blankTime : 3000,			   /*滚动的间隔时间 单位:毫秒*/
			direction : 'Righ'			   /*滚动的方向 此为可选参数 Left(向左-默认),Righ(向右)*/
		};
		
		var ops = $.extend(defaults, options);
		
		return this.each(function(){
			var myTimer;
			var wrap = $(this);
			var box = $('ul',wrap);
			var W = box.find('li').width() * ops.line;			
			var _count = box.find('li').length - ops.line - 1;

			if(ops.button){
				var btnLeftHtml = $('<a href="#" class="'+ ops.btnLeft +'"></a>');
				var btnRightHtml = $('<a href="#" class="'+ ops.btnRight +'"></a>');
				wrap.find('div').after(btnRightHtml).before(btnLeftHtml);
				
				$('.' + ops.btnLeft,wrap).live('click',function(e){
					e.preventDefault();
					clearInterval(myTimer);
					ops.direction = 'Left';
					scroll(ops.direction);			
				});

				$('.' + ops.btnRight,wrap).live('click',function(e){
					e.preventDefault();
					clearInterval(myTimer);
					ops.direction = 'Right';
					scroll(ops.direction);
				});
			};

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
				if(d == 'Left'){
					if(!box.is(':animated')){
						box.animate(
						{left: '-' + W},
						ops.time,
						function(){
							box.find('li:lt('+ ops.line +')').appendTo(box);
							box.css('left',0);
						});
					};
				}else if(d == 'Right'){
					if(!box.is(':animated')){
						box.find('li:gt('+ _count +')').prependTo(box);
						box.css('left',- W);
						box.animate({left : '+=' + W},ops.time);
					};
				};	
			};
		});
	};
})(jQuery)