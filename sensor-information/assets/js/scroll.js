//banner
var $cqh_width = 576; //宽度
var $cqh_height = 300; //高度

var $cqh_speed = 5000;//切换速度

var $cqh_box = $("#cqh-box");
var $cqh_li = $("#cqh-box li");
var $cqh_li_img = $("#cqh-box li img");
var $cqh_num_box = $("#cqh-num");
var $cqh_btn = $("#cqh-num span");
var $cqh_next = $("#cqh-next");
var $cqh = 0;

$cqh_li.hide();
$cqh_li.eq(0).show();

$cqh_box.width($cqh_width);
$cqh_box.height($cqh_height);

$cqh_li.width($cqh_width);
$cqh_li.height($cqh_height);

$cqh_li_img.width($cqh_width);
$cqh_li_img.height($cqh_height);

var $cqh_num = $cqh_li.size();

$cqh_num_box.width($cqh_num*36+3);

var $num_con = '';
for(var i=0;i<$cqh_num;i++){
	$num_con+= '<span><em>'+(i+1)+'</em></span>';
}

$cqh_num_box.html($num_con);

$("#cqh-num span").eq($cqh).addClass("this");

$("#cqh-num span").mouseover(function(){

	var $rnd_num = parseInt(Math.random()*3+1);

	$("#cqh-num span").removeClass("this");
	$(this).addClass("this");
	$cqh_li.eq($cqh).hide(); 
	var $thisnum = parseInt($(this).text());
	$cqh = $thisnum-1;
	$cqh_li.eq($cqh).slideDown(200); 
});

var $autoFun;

if($cqh_num>1){
autoNext();
clearFun($cqh_box);
}


$cqh_next.click(function(){
	if($cqh==$cqh_num-1){

		var $rnd_num = parseInt(Math.random()*3+1);

		$("#cqh-num span").removeClass("this");
		$("#cqh-num span").eq(0).addClass("this");
		$cqh_li.eq($cqh).hide(); 
		
		$cqh_li.eq(0).slideDown(200); 
		$cqh = 0;

	}else{
		var $rnd_num = parseInt(Math.random()*3+1);

		$("#cqh-num span").removeClass("this");
		$("#cqh-num span").eq($cqh+1).addClass("this");
		$cqh_li.eq($cqh).hide(); 
		
		$cqh_li.eq($cqh+1).slideDown(200); 
		
		$cqh = $cqh+1;

	}
	
})


function autoNext(){
        $cqh_next.trigger('click');
        $autoFun = setTimeout(autoNext, $cqh_speed);//此处不可使用setInterval,setInterval是重复执行传入函数,这会引起第二次划入时停止失效
}
function clearAuto(){
        clearTimeout($autoFun);
}
function clearFun(elem){
        elem.hover(function(){
            clearAuto();
        }, function(){
            autoNext();
        });
}



//最新入驻厂家
var Speed_1 = 10; //速度(毫秒)
var Space_1 = 20; //每次移动(px)
var PageWidth_1 = 180 * 5; //翻页宽度
var interval_1 = 5000; //翻页间隔时间
var fill_1 = 0; //整体移位
var MoveLock_1 = false;
var MoveTimeObj_1;
var MoveWay_1="right";
var Comp_1 = 0;
var AutoPlayObj_1=null;
function GetObj(objName){
	if(document.getElementById){
		return eval('document.getElementById("'+objName+'")');
	}else{
		return eval('document.all.'+objName);
	}
}
function AutoPlay_1(){
	clearInterval(AutoPlayObj_1);
	AutoPlayObj_1=setInterval('ISL_GoDown_1();ISL_StopDown_1();',interval_1);
}
function ISL_GoUp_1(){
	if(MoveLock_1) return;
	clearInterval(AutoPlayObj_1);
	MoveLock_1=true;
	MoveWay_1="left";
	MoveTimeObj_1=setInterval('ISL_ScrUp_1();',Speed_1);
}
function ISL_StopUp_1(){
	if(MoveWay_1 == "right"){return};
	clearInterval(MoveTimeObj_1);
	if((GetObj('ISL_Cont_1').scrollLeft-fill_1)%PageWidth_1!=0){
		Comp_1=fill_1-(GetObj('ISL_Cont_1').scrollLeft%PageWidth_1);
		CompScr_1();
	}else{
		MoveLock_1=false;
	}
	AutoPlay_1();
}
function ISL_ScrUp_1(){
	if(GetObj('ISL_Cont_1').scrollLeft<=0){
		GetObj('ISL_Cont_1').scrollLeft=GetObj('ISL_Cont_1').scrollLeft+GetObj('List1_1').offsetWidth;
	}
	GetObj('ISL_Cont_1').scrollLeft-=Space_1;
}
function ISL_GoDown_1(){
	clearInterval(MoveTimeObj_1);
	if(MoveLock_1) return;
	clearInterval(AutoPlayObj_1);
	MoveLock_1=true;
	MoveWay_1="right";
	ISL_ScrDown_1();
	MoveTimeObj_1=setInterval('ISL_ScrDown_1()',Speed_1);
}
function ISL_StopDown_1(){
	if(MoveWay_1 == "left"){return};
	clearInterval(MoveTimeObj_1);
	if(GetObj('ISL_Cont_1').scrollLeft%PageWidth_1-(fill_1>=0?fill_1:fill_1+1)!=0){
		Comp_1=PageWidth_1-GetObj('ISL_Cont_1').scrollLeft%PageWidth_1+fill_1;
		CompScr_1();
	}else{
		MoveLock_1=false;
	}
	AutoPlay_1();
}
function ISL_ScrDown_1(){
	if(GetObj('ISL_Cont_1').scrollLeft>=GetObj('List1_1').scrollWidth){
		GetObj('ISL_Cont_1').scrollLeft=GetObj('ISL_Cont_1').scrollLeft-GetObj('List1_1').scrollWidth;
	}
	GetObj('ISL_Cont_1').scrollLeft+=Space_1;
}
function CompScr_1(){
	if(Comp_1==0){
		MoveLock_1=false;
		return;
	}
	var num,TempSpeed=Speed_1,TempSpace=Space_1;
	if(Math.abs(Comp_1)<PageWidth_1/2){
		TempSpace=Math.round(Math.abs(Comp_1/Space_1));
		if(TempSpace<1){
			TempSpace=1;
		}
	}
	if(Comp_1<0){
		if(Comp_1<-TempSpace){
			Comp_1+=TempSpace;
			num=TempSpace;
		}else{
			num=-Comp_1;
			Comp_1=0;
		}
		GetObj('ISL_Cont_1').scrollLeft-=num;
		setTimeout('CompScr_1()',TempSpeed);
	}else{
		if(Comp_1>TempSpace){
			Comp_1-=TempSpace;
			num=TempSpace;
		}else{
			num=Comp_1;
			Comp_1=0;
		}
		GetObj('ISL_Cont_1').scrollLeft+=num;
		setTimeout('CompScr_1()',TempSpeed);
	}
}
function picrun_ini(){
	GetObj("List2_1").innerHTML=GetObj("List1_1").innerHTML;
	GetObj('ISL_Cont_1').scrollLeft=fill_1>=0?fill_1:GetObj('List1_1').scrollWidth-Math.abs(fill_1);
	GetObj("ISL_Cont_1").onmouseover=function(){
		clearInterval(AutoPlayObj_1);
	}
	GetObj("ISL_Cont_1").onmouseout=function(){
		AutoPlay_1();
	}
	AutoPlay_1();
}