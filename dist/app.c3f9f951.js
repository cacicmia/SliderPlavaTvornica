// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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
      localRequire.cache = {};

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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\img\\arrow-gray-left.png":[["arrow-gray-left.5acd4d6d.png","img/arrow-gray-left.png"],"img/arrow-gray-left.png"],"./..\\img\\arrow-blue-left.png":[["arrow-blue-left.f87dc327.png","img/arrow-blue-left.png"],"img/arrow-blue-left.png"],"./..\\img\\arrow-blue-right.png":[["arrow-blue-right.8a7e8208.png","img/arrow-blue-right.png"],"img/arrow-blue-right.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"img/slider-image-1.jpg":[function(require,module,exports) {
module.exports = "/slider-image-1.58048eed.jpg";
},{}],"img/slider-image-2.jpg":[function(require,module,exports) {
module.exports = "/slider-image-2.6568049d.jpg";
},{}],"img/slider-image-3.jpg":[function(require,module,exports) {
module.exports = "/slider-image-3.a186e235.jpg";
},{}],"img/slider-image-4.jpg":[function(require,module,exports) {
module.exports = "/slider-image-4.0da40676.jpg";
},{}],"img/slider-image-5.jpg":[function(require,module,exports) {
module.exports = "/slider-image-5.3e013daf.jpg";
},{}],"img/slider-image-6.jpg":[function(require,module,exports) {
module.exports = "/slider-image-6.1b414d4a.jpg";
},{}],"img/slider-image-7.jpg":[function(require,module,exports) {
module.exports = "/slider-image-7.fb062824.jpg";
},{}],"img/slider-image-8.jpg":[function(require,module,exports) {
module.exports = "/slider-image-8.bf24fa46.jpg";
},{}],"img/slider-image-9.jpg":[function(require,module,exports) {
module.exports = "/slider-image-9.fb1ab98e.jpg";
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

require("../css/styles.scss");

var _sliderImage = _interopRequireDefault(require("../img/slider-image-1.jpg"));

var _sliderImage2 = _interopRequireDefault(require("../img/slider-image-2.jpg"));

var _sliderImage3 = _interopRequireDefault(require("../img/slider-image-3.jpg"));

var _sliderImage4 = _interopRequireDefault(require("../img/slider-image-4.jpg"));

var _sliderImage5 = _interopRequireDefault(require("../img/slider-image-5.jpg"));

var _sliderImage6 = _interopRequireDefault(require("../img/slider-image-6.jpg"));

var _sliderImage7 = _interopRequireDefault(require("../img/slider-image-7.jpg"));

var _sliderImage8 = _interopRequireDefault(require("../img/slider-image-8.jpg"));

var _sliderImage9 = _interopRequireDefault(require("../img/slider-image-9.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slider = {
  slider1: [_sliderImage.default, _sliderImage2.default, _sliderImage3.default, _sliderImage4.default, _sliderImage5.default],
  slider2: [_sliderImage6.default, _sliderImage7.default, _sliderImage8.default, _sliderImage9.default],
  init: function init() {
    this.reachDOM();
    /* render sliders on screen */

    this.renderSlider(this.slider1, this.slideEl1);
    this.renderSlider(this.slider2, this.slideEl2);
    /* Add event and keybord listeners for right control */

    this.ff.click(this.moveBoth.bind(this, true));
    $(window).keyup(this.recogniseKey.bind(this));
  },
  reachDOM: function reachDOM() {
    /* get DOM elements */
    this.slideEl1 = $('.sl1');
    this.slideEl2 = $('.sl2');
    this.ff = $('.right');
    this.rew = $('.left');
    this.inactive = $('.inactive');
    this.activeAnimation = false;
  },

  /**
   * @description render slider containing images held in array
   * @param {array} array
   * @param {number} num number of the slider
   *  */
  renderSlider: function renderSlider(array, DOM) {
    var image = "";
    array.forEach(function (elem) {
      image += "<img src=\"".concat(elem, "\" alt=\"img\" class=\"flexEl slideEl\">");
    });
    var imageDOM = $.parseHTML(image);
    DOM.css('right', '0px');
    DOM.append(imageDOM);
  },
  moveBoth: function moveBoth(n) {
    if (this.activeAnimation) {
      return;
    } else {
      /* activate left controls on screen */
      if (this.inactive.hasClass('inactive')) {
        this.inactive.addClass('active');
        this.inactive.removeClass('inactive');
        this.rew.click(this.moveBoth.bind(this, false));
      }
      /* animate both sliders */


      this.animate(this.slideEl1, n);
      this.animate(this.slideEl2, n);
    }
  },

  /** 
   * @description animate slide 
   * @param DOM jQuery element containing slide images
   * @param n move direction 
   */
  animate: function animate(DOM, n) {
    var slide = DOM.children();
    var movingImg, step, moveDirection, moveBack, action;
    n ? (movingImg = slide.first(), step = movingImg.outerWidth(), moveDirection = "-=".concat(step), moveBack = "+=".concat(step), action = 'appendTo') : (movingImg = slide.last(), step = movingImg.outerWidth(), moveDirection = "+=".concat(step), moveBack = "-=".concat(step), action = 'prependTo');
    this.activeAnimation = true;
    movingImg.animate({
      opacity: '0'
    }, {
      queue: false,
      complete: function complete() {
        var store = $(this).detach();
        store.animate({
          opacity: '1'
        }, {
          complete: function complete() {
            return slider.activeAnimation = false;
          }
        });
        store["".concat(action)](DOM);
      }
    });
    slide.animate({
      right: moveDirection
    }, {
      queue: false,
      complete: function complete() {
        $(this).css('right', moveBack);
      }
    });
  },

  /**  
   * @description recognise keyboard input
   */
  recogniseKey: function recogniseKey(e) {
    switch (e.which) {
      case 39:
        {
          this.moveBoth(true);
          break;
        }

      case 37:
        {
          if (!this.inactive.hasClass('inactive')) {
            this.moveBoth(false);
            break;
          } else {
            break;
          }
        }

      default:
        break;
    }
  }
};
$.ready(slider.init());
},{"../css/styles.scss":"css/styles.scss","../img/slider-image-1.jpg":"img/slider-image-1.jpg","../img/slider-image-2.jpg":"img/slider-image-2.jpg","../img/slider-image-3.jpg":"img/slider-image-3.jpg","../img/slider-image-4.jpg":"img/slider-image-4.jpg","../img/slider-image-5.jpg":"img/slider-image-5.jpg","../img/slider-image-6.jpg":"img/slider-image-6.jpg","../img/slider-image-7.jpg":"img/slider-image-7.jpg","../img/slider-image-8.jpg":"img/slider-image-8.jpg","../img/slider-image-9.jpg":"img/slider-image-9.jpg"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51704" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
        parents.push(k);
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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map