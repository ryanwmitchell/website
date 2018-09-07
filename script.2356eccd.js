// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({53:[function(require,module,exports) {
$(document).ready(function () {
	//////////////////////////////////////////////////////////////////////////////
	// Nav shrink

	var lastScroll = 0;
	var scrollingDown = false;

	$(document).on('scroll', function () {
		var winTop = $(window).scrollTop();

		if (winTop > 200) {
			$('nav.top').addClass('short');
		} else if (winTop < 80) {
			$('nav.top').removeClass('short');
		}

		scrollingDown = winTop > lastScroll ? true : false; // winTop > 300 &&
		lastScroll = winTop;

		if (scrollingDown) {
			$('nav.top, .subheader').addClass('hide');
		} else {
			$('nav.top, .subheader').removeClass('hide');
		}
	});

	//////////////////////////////////////////////////////////////////////////////
	// Responsive Menu

	$('.menu').on("click", function (e) {
		event.preventDefault();
		$('#menu').addClass('active');
	});

	$('#menu .close').on("click", function (e) {
		event.preventDefault();
		$('#menu').removeClass('active');
	});

	//////////////////////////////////////////////////////////////////////////////
	// Roadmap button

	$('#show_roadmap').on("click", function (e) {
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

	$('.connections div').on("click", function (e) {
		$('.connections div').removeClass('active');
		$(this).addClass('active');

		if ($(this).text() == "SDK") {
			$('.connection_output').removeClass('active');
			$('.connection_output.sdks').addClass('active');
			$('.layers #app span').text("Your App" + $('ul.sdks li.active').data('language'));

			$('.layers').addClass('sdk');
			$('.layers').removeClass('api');
			$('.layers').removeClass('database');
			$('.layers').removeClass('none');
		} else if ($(this).text() == "API") {
			$('.connection_output').removeClass('active');
			$('.connection_output.api').addClass('active');
			$('.layers #app span').text("Your App");

			$('.layers').removeClass('sdk');
			$('.layers').addClass('api');
			$('.layers').removeClass('database');
			$('.layers').removeClass('none');
		} else if ($(this).text() == "Database") {
			$('.connection_output').removeClass('active');
			$('.connection_output.database').addClass('active');
			$('.layers #app span').text("Your App");

			$('.layers').removeClass('sdk');
			$('.layers').removeClass('api');
			$('.layers').addClass('database');
			$('.layers').removeClass('none');
		} else if ($(this).text() == "None") {
			$('.connection_output').removeClass('active');
			$('.connection_output.none').addClass('active');

			$('.layers').removeClass('sdk');
			$('.layers').removeClass('api');
			$('.layers').removeClass('database');
			$('.layers').addClass('none');
		}
	});

	$('ul.sdks li').on("click", function (e) {
		event.preventDefault();
		$('.layers #app span').text("Your App" + $(this).data('language'));
		$('.layers #app i').html($(this).data('icon'));
		$('.sdks li').removeClass('active');
		$(this).addClass('active');
	});

	//////////////////////////////////////////////////////////////////////////////
});
},{}]},{},[53], null)
//# sourceMappingURL=/website/script.2356eccd.map