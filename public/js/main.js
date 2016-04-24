$(document).ready(function() {
	$('.flip-container').on('click', function() {
		$(this).toggleClass('flip');
	})
	$('.flip-container input').on('click', function(e) {
		e.stopPropagation();
	})
})