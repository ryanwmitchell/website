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
		// adaptiveHeight: true,
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
	// Dynamic layers components

	$('.connections div').on("click", function(e) {
		$('.connections div').removeClass('active');
		$(this).addClass('active');

		if($(this).text() == "SDK"){
			$('.connection_output').removeClass('active');
			$('.connection_output.sdks').addClass('active');
			$('.layers #app span').text("Your App" + $('ul.sdks li.active').data('language'));

			$('.layers').addClass('sdk');
			$('.layers').removeClass('api');
			$('.layers').removeClass('database');
			$('.layers').removeClass('none');
		} else if($(this).text() == "API"){
			$('.connection_output').removeClass('active');
			$('.connection_output.api').addClass('active');
			$('.layers #app span').text("Your App");

			$('.layers').removeClass('sdk');
			$('.layers').addClass('api');
			$('.layers').removeClass('database');
			$('.layers').removeClass('none');
		} else if($(this).text() == "Database"){
			$('.connection_output').removeClass('active');
			$('.connection_output.database').addClass('active');
			$('.layers #app span').text("Your App");

			$('.layers').removeClass('sdk');
			$('.layers').removeClass('api');
			$('.layers').addClass('database');
			$('.layers').removeClass('none');
		} else if($(this).text() == "None"){
			$('.connection_output').removeClass('active');
			$('.connection_output.none').addClass('active');

			$('.layers').removeClass('sdk');
			$('.layers').removeClass('api');
			$('.layers').removeClass('database');
			$('.layers').addClass('none');
		}
	});

	$('ul.sdks li').on("click", function(e) {
		event.preventDefault();
		$('.layers #app span').text("Your App" + $(this).data('language'));
		$('.layers #app i').html($(this).data('icon'));
		$('.sdks li').removeClass('active');
		$(this).addClass('active');
	});

	//////////////////////////////////////////////////////////////////////////////
});