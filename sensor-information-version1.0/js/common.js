//控制文字字数
function textClap(ele,needLeng){
	 var nowLeng = ele.html().length;
	if(nowLeng > needLeng){
	  var nowWord = ele.html().substr(0,needLeng)+'......';
	  ele.html(nowWord);
	}
}

var Accordion = function(el, multiple) {
	this.el = el || {};
	this.multiple = multiple || false;
	var links = this.el.find('.link');
	links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
}
Accordion.prototype.dropdown = function(e) {
	var $el = e.data.el;
		$this = $(this),
		$next = $this.next();

	$next.slideToggle();
	$this.parent().toggleClass('open');
	$this.parent().find('i').toggleClass('icon-caret-down icon-caret-up');

	if (!e.data.multiple) {
		$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
	};
}	

var accordion = new Accordion($('#accordion'), false);

$('.submenu a').click(function(){
	$('.submenu a').removeClass('sub-active');
	$(this).addClass('sub-active');
});

//popover 详细信息/首页
$('a.popover-detail,a.popover-subtitle').hover(function(){
    $(this).popover('show');
},function(){
    $(this).popover('hide');
});

$(function(){  
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
                bp.css("top", offset.top).css("left", offset.left+w+5);  
                if(bp.html()=="")  
                    bp.html('<img src="'+p.attr("bigpic")+'" mce_src="'+p.attr("bigpic")+'">');  
            }).mouseout(function(){  
                bp.fadeOut();  
            });  
        }  
    });  
});    