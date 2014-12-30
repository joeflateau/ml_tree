$(function(){
	$("body").foundation();
	
	$(".mltree-service").click(function(e){
		e.stopPropagation();
		$(".focus").removeClass("focus");
		$(this).addClass("focus");
	})
	$(document).click(function(){
		$(".focus").removeClass("focus");
	})
})