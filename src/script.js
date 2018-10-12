import Plyr from "plyr";
// import "plyr/dist/plyr.css";

var player = new Plyr("#player", {
  controls: ["play-large", "play", "progress", "mute", "airplay", "fullscreen"]
});

/**
 * Google Analytics fires this on outgoing links
 */
// window.trackOutboundLink = function(url) {
//   gtag("event", "click", {
//     event_category: "outbound",
//     event_label: url,
//     transport_type: "beacon",
//     event_callback: function() {
//       window.open(url, "_blank");
//     }
//   });
// };

// function getQueryVariable(variable) {
//   const url = window.location.href;
//   variable = variable.replace(/[\[\]]/g, "\\$&");
//   const regex = new RegExp("[?&]" + variable + "(=([^&#]*)|&|#|$)"),
//     results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return "";
//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

//////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	//////////////////////////////////////////////////////////////////////////////
	// Video Modal

	$('.open-video').on("click", function(e) {
		event.preventDefault();
		$('#video').addClass('active');
		player.play();
	});

	$('.close-video').on("click", function(e) {
		event.preventDefault();
		player.pause();
		$('#video').removeClass('active');
	});

	$(document).keyup(function(e) {
		if (e.key === "Escape") { // `27`
			player.pause();
			$('#video').removeClass('active');
		}
	});

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
	// Responsive Menu

	$('.menu').on("click", function(e) {
		event.preventDefault();
		$('#menu').addClass('active');
	});

	$('#menu .close').on("click", function(e) {
		event.preventDefault();
		$('#menu').removeClass('active');
	});

	//////////////////////////////////////////////////////////////////////////////
	// Roadmap button

	$('#show_roadmap').on("click", function(e) {
		event.preventDefault();
		$('.roadmap .hidden').removeClass('hidden');
		$('#show_roadmap_container').hide();
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
	// Open Chat

	$('.open-chat').on('click', function (event) {
		event.preventDefault();
		Intercom('show');
	});

	//////////////////////////////////////////////////////////////////////////////
	// Instantiate slideshows

	$('.testimonials').slick({
		autoplay: true,
		autoplaySpeed: 8000,
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
		nextArrow: '<i class="material-icons next arrow">arrow_forward</i>',
		responsive: [
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1
				}
			}
		]
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
