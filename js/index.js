$(function(){
	var $leftBtn=$(".nav-left-btn>a");
	var $rightBtn=$(".nav-right-btn>a");
	var $leftCon=$("[first=first]");
	var $rightCon=$("[last=last]");
	var a=0,b=0;
	//导航左下拉
	$leftBtn.click(function(){
		$leftCon.slideToggle(500);
		if(a==0){
			$leftBtn.html("&#xe61b;");
			a=1;
		}else{
			$leftBtn.html("&#xe623;");
			a=0;
		}
	})
	//导航右下拉
	$rightBtn.click(function(){
		$rightCon.slideToggle(500);
		if(b==0){
			$rightBtn.html("&#xe6a8;");
			b=1;
		}else{
			$rightBtn.html("&#xe613;");
			b=0;
		}
	})

	//屏幕放大如果下拉没收回自动收回
	$(window).resize(function(){
		if(document.documentElement.clientWidth>860){
			if(a==1){
				$leftCon.slideUp(500);
				$leftBtn.html("&#xe623;");
				a=0;
			}
		}
		if(document.documentElement.clientWidth>1100){
			if(b==1){
				$rightCon.slideUp(500);
				$rightBtn.html("&#xe613;");
				b=0;
			}
		}
	})


	//拖拽换页
	var isT="ontouchstart" in window;
	if(isT){
		var mousedown="touchstart";
		var mousemove="touchmove";
		var mouseup="touchend";
	}else{
		var mousedown="mousedown";
		var mousemove="mousemove";
		var mouseup="mouseup";
	}
	var $container=$(".container-fluid");
	var $leng=$(".row",$container);
	var $content=$(".content1",$container);
	$container.css("transition","transform 1s");
	var cH=$content.height();
	var move=0;
	var i=0;
	$leng.eq(0).addClass("active");
	$container.on(mousedown,function(e){
		var ev=e||window.event;
		if(ev.preventDefault){
			ev.preventDefault();
		}else{
			ev.returnValue=false;
		}
		var dy=ev.clientY;
		var dt=ev.timeStamp;
		var len;
		function moves(e){
			var ev=e||window.event;
			var my=ev.clientY;
			len=my-dy;
		}
		$(document).on(mousemove,moves)
		function ups(e){
			var ev=e||window.event;
			var ut=ev.timeStamp;
			if((ut-dt)<500&&Math.abs(len)>30){
				if(len>0){
					i--;
					if(i<0){i=0}
					if(i>$leng.length-1){i=$leng.length-1}
					$leng.removeClass("active").eq(i).addClass("active");
					$container.css("transform","translate3d(0,"+(-i*cH)+"px,0)");
				}else{
					i++;
					if(i<0){i=0}
					if(i>$leng.length-1){i=$leng.length-1}
					$leng.removeClass("active").eq(i).addClass("active");
					$container.css("transform","translate3d(0,"+(-i*cH)+"px,0)");
				}
			}
			$(document).off(mousemove,moves);
			$(document).off(mouseup,ups);
		}
		$(document).on(mouseup,ups)
	})

	function mouseWheel(obj,downcallback,upcallback){
		obj=obj||document;
		if(obj.addEventListener){
			obj.addEventListener("mousewheel",scrollFn,false);
			addEventListener("DOMMouseScroll",scrollFn,false)
		}else if(obj.attachEvent){
			obj.attachEvent("onmousewheel",scrollFn)
		}

		function scrollFn(e){
			var ev=e||window.event;
			var val=ev.wheelDelta||ev.detail;
		if(val==120||val==-3){//up
			upcallback&&upcallback();
		}else if(val==-120||val==3){
			downcallback&&downcallback();
		}
		if(ev.preventDefault){
			ev.preventDefault();
		}else{
			ev.returnValue=false;
		}
	}
}
 	var flag=true;
	mouseWheel($container[0],function(){
		if(!flag){return;}
		flag=false;
		i++;
		if(i<0){i=0}
		if(i>$leng.length-1){i=$leng.length-1}
		$container.css("transform","translate3d(0,"+(-i*cH)+"px,0)");
	    setTimeout(function(){flag=true;$leng.removeClass("active").eq(i).addClass("active");},500)
	},function(){
		if(!flag){return;}
		flag=false;
		i--;
		if(i<0){i=0}
		if(i>$leng.length-1){i=$leng.length-1}
		$container.css("transform","translate3d(0,"+(-i*cH)+"px,0)");
	    setTimeout(function(){flag=true;$leng.removeClass("active").eq(i).addClass("active");},500)
	})


})