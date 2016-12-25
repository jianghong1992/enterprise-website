$(function(){
	// 传感百科某一个标签被点击
	$('.tags input[type="radio"]').click(function(){
		$('.tags span').removeClass('current-tag');
		$(this).parent().addClass('current-tag');
		$('.current-pos').children('i').removeClass('hide');
		$('.current-pos').children('.sub-link').text($(this).val());
	});
});