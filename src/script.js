$(document).ready(function(){
	//////////////////////////////////////////////////////////////////////////////
	// Nav shrink

	var lastScroll = 0;
	var scrollingDown = false;

	$(document).on('scroll', function(){
		var winTop = $(window).scrollTop();

		if(winTop > 200) {
			$('nav.top').addClass('short');
		} else if(winTop < 80) {
			$('nav.top').removeClass('short');
		}

		scrollingDown = (winTop > lastScroll)? true : false; // winTop > 300 &&
		lastScroll = winTop;

		if(scrollingDown){
			$('nav.top, .subheader').addClass('hide');
		} else {
			$('nav.top, .subheader').removeClass('hide');
		}
	});

	//////////////////////////////////////////////////////////////////////////////
	// Smooth scroll to anchors

	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 500);
	});

	//////////////////////////////////////////////////////////////////////////////
	// Instantiate slideshows

	$('.testimonials').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		adaptiveHeight: true,
		dots: true,
		prevArrow: '<i class="material-icons prev arrow">arrow_back</i>',
		nextArrow: '<i class="material-icons next arrow">arrow_forward</i>'
	});

	$('.extensions').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		centerMode: true,
		centerPadding: '50px',
		slidesToShow: 3,
		prevArrow: '<i class="material-icons prev arrow">arrow_back</i>',
		nextArrow: '<i class="material-icons next arrow">arrow_forward</i>'
	});

	//////////////////////////////////////////////////////////////////////////////
});