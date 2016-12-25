// JavaScript Document
$(function(){
	$('.intro').hover(function(){
		$('.nav-intro').removeClass('hide');
		$('.sub-nav-con').removeClass('hide');
	},function(){
		$('.nav-intro').addClass('hide');
		$('.sub-nav-con').addClass('hide');
	});

	$('.prod').hover(function(){
		$('.nav-product').removeClass('hide');
		$('.sub-nav-con').removeClass('hide');
	},function(){
		$('.nav-product').addClass('hide');
		$('.sub-nav-con').addClass('hide');
	});

	$('.content-left li').click(function(){
		var index = $(this).index();
		$('.content-left li').removeClass('current-item');
		$('.content-left li:eq('+index+')').addClass('current-item');
	});
});
