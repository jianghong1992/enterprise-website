$(function(){
	// 搜索下拉
	$(".select-box span").mouseover(function(){
		$(this).parent().find('.select-option').removeClass('hide');
	});
	$(".select-box").mouseleave(function(){
			$(".select-option").addClass('hide');
	});
	
	var search_type = $('.select-option a.on').data('type');
	$('#type').val(search_type);
	$(".select-option a").click(function(){
		$(this).parents(".select-box").find("span").text($(this).text());
		$(this).parents(".select-box").find("span").addClass('on');
		$(this).addClass('on').siblings().removeClass('on');
		$(this).parent().addClass('hide');
		$('#type').val($(this).data('type'));
	});

	// tab切换(首页)
	$(".widget-tabs .widget-tab").click(function(){
		var index = $(this).index();
		$(this).parent(".widget-tabs").find(".widget-tab").removeClass("widget-tab-active");
		$(this).addClass("widget-tab-active");
		$(this).parent(".widget-tabs").find(".widget-tab-link").removeClass("widget-tab-link-active");
		$(this).find(".widget-tab-link").addClass("widget-tab-link-active");
		$(this).parents(".widget").find(".widget-list").css("display","none");
		$(this).parents(".widget").find(".widget-list:eq("+index+")").css("display","block");
	});
	
	//tab切换(厂商详情)
	$(".manu-tabs .manu-tab").click(function(){
		var index = $(this).index();
		$(this).parent(".manu-tabs").find(".manu-tab").removeClass("manu-tab-active");
		$(this).addClass("manu-tab-active");
		$(this).parents(".manus").find(".manu-list").css("display","none");
		$(this).parents(".manus").find(".manu-list:eq("+index+")").css("display","block");
	});
	
	//用户空间侧边菜单栏（可折叠）
	//$("#firstpane .menu_body:eq(0)").show();
	$("#firstpane p.menu_head").click(function(){
		$(this).addClass("current").next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
		$(this).siblings().removeClass("current");
	});
	$("#secondpane .menu_body:eq(0)").show();
	$("#secondpane p.menu_head").mouseover(function(){
		$(this).addClass("current").next("div.menu_body").slideDown(500).siblings("div.menu_body").slideUp("slow");
		$(this).siblings().removeClass("current");
	});

	//鼠标悬浮显示大图
	$(".product-img img").each(function(i){
		var p = $(this);
		var strbp = p.attr("bigpic");
		if(strbp){
			var bp = $("<div class='bigpic'></div>").appendTo("body").hide();
			var w = this.width;
			p.mouseover(function(){
				bp.fadeIn();
				var offset = p.offset();
				bp.css("position","absolute").css("top", offset.top).css("left", offset.left+w+5).css("z-index",1000);
				if(bp.html()=="")
					bp.html('<img src="'+p.attr("bigpic")+'" mce_src="'+p.attr("bigpic")+'">');
			}).mouseout(function(){
				bp.fadeOut();
			});
		}
	});
});
