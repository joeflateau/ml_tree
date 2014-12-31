$(function(){
	var offsetAmount = 190;

	$("body").foundation();
	
	$(".mltree-service").click(function(e){
		e.stopPropagation();
		$("html, body")
			.animate({scrollTop:$(this).offset().top - offsetAmount});
		$(".focus").removeClass("focus");
		$(this).addClass("focus");
	});

	$(document).click(function(){
		$(".focus").removeClass("focus");
	});

	$(window).on('keyup', function(e){
		if (e.which !== 27) return;
		$(".focus").removeClass("focus");
	});

	$("a[href^='#']").click(function(e){
		e.preventDefault();
		$("html, body")
			.animate({scrollTop:$($(this).attr("href")).offset().top - offsetAmount});
	});
});