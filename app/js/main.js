$(document).ready(function(){

	// side bar menu

	$('.button').click(function(e) {
		e.preventDefault();
		$('.menu_toggle').css('right', '0');
	});
	$('.close_menu').click(function(e) {
		e.preventDefault();
		$('.menu_toggle').css('right', '-250px');
	});

	// slow scroll

	$('a').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $(this).attr('href') ).offset().top
	    }, 1000);
	    return false;
	});

	// show-hide to_top button

	var fixed = false;
	$(document).scroll(function() {
	    if ($(this).scrollTop() > 250) {
	        if (!fixed) {
	            fixed = true;
	            $('#to_top').show("slow", function() {
	                $('#to_top').css({
	                    position: 'fixed',
	                    display: 'block'
	                });
	            });
	        }
	    } else {
	        if (fixed) {
	            fixed = false;
	            $('#to_top').hide("slow", function() {
	                $('#to_top').css({
	                    display: 'none'
	                });
	            });
	        }
	    }
	});

});