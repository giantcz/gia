(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BaseComponent"] = factory();
	else
		root["BaseComponent"] = factory();
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
exports.query = query;
exports.queryAll = queryAll;
exports.toggleClass = toggleClass;
exports.removeClass = removeClass;
exports.addClass = addClass;
exports.triggerEvent = triggerEvent;
function query(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    if (typeof selector !== 'string') {
        return selector;
    }

    return context.querySelector(selector);
}

function queryAll(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    if (typeof selector !== 'string') {
        return selector;
    }

    return Array.prototype.slice.call(context.querySelectorAll(selector));
}

function toggleClass(element, className) {
    var condition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (condition === null) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
        }
    } else {
        if (condition) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    }
}

function removeClass(nodes, className) {
    if (Array.isArray(nodes)) {
        nodes.forEach(function (node) {
            return node.classList.remove(className);
        });
    } else {
        nodes.classList.remove(className);
    }

    return nodes;
}

function addClass(nodes, className) {
    if (Array.isArray(nodes)) {
        nodes.forEach(function (node) {
            return node.classList.add(className);
        });
    } else {
        nodes.classList.add(className);
    }

    return nodes;
}

function triggerEvent(element, eventType) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        bubbles: true,
        cancelable: true,
        detail: null
    };

    options.detail = params;
    var event = new CustomEvent(eventType, options);
    element.dispatchEvent(event);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Component without code splitting support
 */

var Component = function () {
    function Component(element, options) {
        _classCallCheck(this, Component);

        this.element = element;
        this.element['__gia_component__'] = this;
        this._ref = {};
        this._options = options || {};
        this._state = {};
    }

    _createClass(Component, [{
        key: '_load',
        value: function _load() {
            this.mount();
            this.prepare();
        }
    }, {
        key: 'mount',
        value: function mount() {
            // this is here only to be rewritten by extend
        }
    }, {
        key: 'prepare',
        value: function prepare() {
            console.warn('Component ' + this._name + ' does not have "prepare" method.');
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            // this is here only to be rewritten by extend
        }
    }, {
        key: 'getRef',
        value: function getRef(ref) {
            var prefixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return '[g-ref="' + (prefixed ? this._name + ':' : '') + ref + '"]';
        }
    }, {
        key: '_getRefElements',
        value: function _getRefElements() {
            var _this = this;

            var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (Object.keys(items).length == 0) {
                var elements = (0, _utils.queryAll)('[g-ref]', this.element);
                elements.forEach(function (element) {
                    var refName = element.getAttribute('g-ref');
                    if (!_this._ref[refName]) {
                        _this._ref[refName] = elements.filter(function (item) {
                            return item.getAttribute('g-ref') === refName;
                        });
                    }
                });
            } else {
                Object.keys(items).forEach(function (key) {
                    if (Array.isArray(items[key])) {
                        var _elements = (0, _utils.queryAll)(_this.getRef(key, true), _this.element);
                        if (!_elements.length) {
                            _elements = (0, _utils.queryAll)(_this.getRef(key), _this.element);
                        }
                        _this._ref[key] = _elements;
                    } else if (!items[key]) {
                        var element = (0, _utils.query)(_this.getRef(key, true), _this.element);
                        if (!element) {
                            element = (0, _utils.query)(_this.getRef(key), _this.element);
                        }
                        _this._ref[key] = element;
                    } else {
                        _this._ref[key] = items[key];
                    }
                });
            }

            return this._ref;
        }
    }, {
        key: 'setState',
        value: function setState(newState) {
            var _this2 = this;

            var stateChanges = {};

            Object.keys(newState).forEach(function (key) {
                if (typeof newState[key] === 'boolean' || typeof newState[key] === 'string' || typeof newState[key] === 'number' || typeof newState[key] === 'undefined') {
                    if (_this2._state[key] !== newState[key]) {
                        stateChanges[key] = newState[key];
                    }
                } else if (newState[key].constructor === Array) {
                    if (_this2._state[key] != null) {
                        stateChanges[key] = [];
                        newState[key].forEach(function (item, index) {
                            //console.log(this.state[key] != null, this.state[key], newState[key])
                            if (_this2._state[key][index] !== newState[key][index]) {
                                stateChanges[key][index] = newState[key][index];
                            }
                        });
                    } else {
                        stateChanges[key] = newState[key];
                    }
                } else if (_typeof(newState[key]) === 'object') {
                    stateChanges[key] = {};
                    Object.keys(newState[key]).forEach(function (subkey) {
                        stateChanges[key][subkey] = newState[key][subkey];
                    });
                }
            });

            // Object.keys(stateChanges).forEach(key => {
            //     if (newState[key].constructor === Array && stateChanges[key].length === 0) {
            //         delete stateChanges[key];
            //     } else if (typeof newState[key] === 'object' && Object.keys(stateChanges[key]).length === 0) {
            //         delete stateChanges[key];
            //     }
            // });

            this._state = newState;
            this.stateChange(stateChanges);
        }
    }, {
        key: 'stateChange',
        value: function stateChange(stateChanges) {
            // this is here only to be rewritten by extend
        }
    }, {
        key: 'ref',
        get: function get() {
            return this._ref;
        },
        set: function set(items) {
            this._ref = this._getRefElements(items);
            return this._ref;
        }
    }, {
        key: 'options',
        get: function get() {
            return this._options;
        },
        set: function set(defaults) {
            var options = {};
            var optionsFromAttribute = this.element.getAttribute('g-options');
            if (optionsFromAttribute) {
                options = JSON.parse(optionsFromAttribute);
            }

            this._options = _extends({}, this._options, defaults, options);
        }
    }, {
        key: 'state',
        get: function get() {
            return this._state;
        },
        set: function set(state) {
            console.warn('You should not change state manually. Use setState instead.');
            this._state = state;
        }
    }]);

    return Component;
}();

exports.default = Component;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _BaseComponent = __webpack_require__(1);

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _BaseComponent2.default; // this is here for webpack to expose BaseComponent as window.BaseComponent

/***/ })
/******/ ]);
});