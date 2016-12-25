// JavaScript Document
/*banner部分*/
/*图片初始化*/
$(".banner img").hide();
$(".banner img:first").show();
/*单击按钮时*/
var n = 0;
$(".ctrl a").click(function(){
	n = $(".ctrl a").index(this); 
	$(".banner img").hide();
	$(".banner img:eq("+n+")").show();
	
	$(".ctrl a").removeClass("current_btn");
	$(this).addClass("current_btn");	
});
/*单击右边按钮，显示下一页*/
$(".right_btn").click(function(){
	if(n<$(".banner img").length-1){
		n++;
	}else{
		n=0;
	}
	$(".banner img").hide();
	$(".banner img:eq("+n+")").show();
	
	$(".ctrl a").removeClass("current_btn");
	$(".ctrl a:eq("+n+")").addClass("current_btn");	
});
/*单击左按钮，显示上一页*/
$(".left_btn").click(function(){
	if(n>0){
		n--;
	}else{
		n=$(".banner img").length-1;
	}
	$(".banner img").hide();
	$(".banner img:eq("+n+")").show();
	
	$(".ctrl a").removeClass("current_btn");
	$(".ctrl a:eq("+n+")").addClass("current_btn");	
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
$(".left_btn,.right_btn,.ctrl a").hover(function(){
	clearInterval(timer);
},function(){
	timer = setInterval(run,2000);
});