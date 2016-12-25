// JavaScript Document
/*导航部分*/

/*banner部分*/
var n = 0;
/*图片初始化*/
$(".banner img").hide();
$(".banner img:first").show();
/*点击鼠标切换图片*/
$(".btn a").mouseover(function(){
	n = $(".btn a").index(this);
	
	$(".banner img").hide();
	$(".banner img:eq("+n+")").show();
	
	$(".btn a").removeClass("current_btn");
	$(this).addClass("current_btn");
});
/*自动播放*/
function changeN(){
	if(n<$(".banner img").length-1){
		n++;
	}else{
		n=0;
	}
	$(".banner img").hide();
	$(".banner img:eq("+n+")").show();
	
	$(".btn a").removeClass("current_btn");
	$(".btn a:eq("+n+")").addClass("current_btn");	
}
var timer = setInterval(changeN,2000);
$(".btn a").hover(function(){
	clearInterval(timer);
},function(){
	timer = setInterval(changeN,2000);
});