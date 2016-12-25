// JavaScript Document
/*banner部分*/
/*图片初始化*/
$(".banner img").hide();
$(".banner img:first").show();
/*单击按钮时*/
var n = 0;
$(".ctrl a").mouseover(function(){
	n = $(".ctrl a").index(this); 
	$(".banner img").hide();
	$(".banner img:eq("+n+")").show();
	
	$(".ctrl a").removeClass("current_btn");
	$(this).addClass("current_btn");	
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
	
	$(".ctrl a").removeClass("current_btn");
	$(".ctrl a:eq("+n+")").addClass("current_btn");		
}
var timer = setInterval(run,2000);
$(".ctrl a").hover(function(){
	clearInterval(timer);
},function(){
	timer = setInterval(run,2000);
});
/*婚礼主题*/
/*初始化*/
    $(".theme_box").width(230*$(".theme_box .theme_con").length);
	/*行走*/
	var step = 0;
	function run1(){	
		if(step<$(".theme_box img").length-4){
			step++;
		}else{
			/*当走到最后一张时，归位，直接跳到第二章显示，因为第一张与最后一张相同*/
			$(".theme_box").css({marginLeft:0});
			step=1;
		}
		
		$(".theme_box").animate({marginLeft:-230*step},1000);
	}
	
	var timer1 = setInterval(run1,2000);
	$(".theme_box").hover(function(){
			clearInterval(timer1);
		},function(){
			timer1 = setInterval(run1,2000);
	});
/*下拉菜单*/	
$(".title_all_container").toggle(function(){
		$(this).next("div").slideDown(1000);
	},function(){
		$(this).next("div").slideUp(1000);
		})
$(".title_all_span").hide();
$(".title_all_container").hover(function(){
	$(this).children("span").show();
	},function(){
	$(".title_all_span").hide();
	});