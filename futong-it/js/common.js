// JavaScript Document
/*banner部分*/
/*图片初始化*/
$(function(){
	$(".banner img").hide();
	$(".banner img:first").show();
	
	/*单击按钮时*/
	var n = 0;
	$(".btn span").click(function(){
		n = $(".btn span").index(this); 
		$(".banner img").hide();
		$(".banner img:eq("+n+")").show();
		
		$(".btn span").removeClass("currentBtn");
		$(this).addClass("currentBtn");	
	});
	
	
	/*自动播放*/
	function run(){
		if(n<$(".banner img").length-1){
			n++;
		}else{
			n=0;
		}
		$(".banner img").hide();
		$(".banner img:eq("+n+")").show();
		
		$(".btn span").removeClass("currentBtn");
		$(".btn span:eq("+n+")").addClass("currentBtn");		
	}
	var timer = setInterval(run,2000);
	$(".btn span").hover(function(){
			clearInterval(timer);
		},function(){
			timer = setInterval(run,2000);
		});

});

	


