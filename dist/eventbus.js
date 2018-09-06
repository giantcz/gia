(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["eventbus"] = factory();
	else
		root["eventbus"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Config for setting and changing global settings
 */

var Config = function () {
    function Config() {
        _classCallCheck(this, Config);

        this._options = {
            log: true
        };
    }

    _createClass(Config, [{
        key: "set",
        value: function set(name, value) {
            this._options[name] = value;
        }
    }, {
        key: "get",
        value: function get(name) {
            return this._options[name];
        }
    }]);

    return Config;
}();

exports.default = new Config();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Event bus for storing and executing handlers on emitted events
 */

var EventBus = function () {
    function EventBus() {
        _classCallCheck(this, EventBus);

        this.list = {};
    }

    _createClass(EventBus, [{
        key: 'emit',
        value: function emit(event) {
            var _this = this;

            var eventObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            eventObject._name = event;
            if (this.list[event]) {
                if (_config2.default.get('log')) {
                    console.info(this.list[event].length + ' handler' + (this.list[event].length > 1 ? "s" : "") + ' called on event \'' + event + '\'');
                }
                this.list[event].forEach(function (handlerObject) {
                    handlerObject.handler(eventObject);
                    if (handlerObject.once) {
                        _this.off(event, handlerObject.handler);
                    }
                });
            } else {
                if (_config2.default.get('log')) {
                    console.info('0 handlers called on event \'' + event + '\'');
                }
            }
        }
    }, {
        key: 'on',
        value: function on(event, handler) {
            var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (this.list[event]) {
                this.list[event].push({ once: once, handler: handler });
            } else {
                this.list[event] = [];
                this.list[event].push({ once: once, handler: handler });
            }
        }
    }, {
        key: 'once',
        value: function once(event, handler) {
            this.on(event, handler, true);
        }
    }, {
        key: 'off',
        value: function off(event, handler) {
            if (event != null) {
                if (handler != null) {
                    if (this.list[event] && this.list[event].filter(function (eventObject) {
                        return eventObject.handler === handler;
                    }).length) {
                        var toRemove = this.list[event].filter(function (eventObject) {
                            return eventObject.handler === handler;
                        })[0];
                        var index = this.list[event].indexOf(toRemove);
                        if (index > -1) {
                            this.list[event].splice(index, 1);
                        }
                    } else {
                        console.warn('Event ' + event + ' cannot be unsubscribed - does not exist.');
                    }
                } else {
                    this.list[event] = [];
                }
            } else {
                this.list = {};
            }
        }
    }]);

    return EventBus;
}();

exports.default = new EventBus();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _eventbus = __webpack_require__(1);

var _eventbus2 = _interopRequireDefault(_eventbus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _eventbus2.default; // this is here for webpack to expose eventbus as window.eventbus

/***/ })
/******/ ]);
});