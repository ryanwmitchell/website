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
})({56:[function(require,module,exports) {
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
		responsive: [{
			breakpoint: 600,
			settings: {
				slidesToShow: 1
			}
		}]
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
},{}],465:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '60423' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[465,56], null)
//# sourceMappingURL=/script.79b2e05f.map