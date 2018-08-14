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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getComponentFromElement;
/**
 * Return instance from element
 * @param element: DOM element
 * @returns component instance
 */

function getComponentFromElement(element) {
  return element['__base_component__'];
}

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(1);

var _getComponentFromElement = __webpack_require__(0);

var _getComponentFromElement2 = _interopRequireDefault(_getComponentFromElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Component without code splitting support
 */

var Component = function () {
    function Component(element, options) {
        _classCallCheck(this, Component);

        this.element = element;
        this.element['__base_component__'] = this;
        this._ref = {};
        this.ref = {};
        this._options = options || {};
        this._state = {};
    }

    _createClass(Component, [{
        key: '_load',
        value: function _load() {
            this.componentDidMount();
            this.prepare();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
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

            if (items == null) {
                items = {};

                (0, _utils.queryAll)('[g-ref]', this.element).forEach(function (item) {
                    var name = item.getAttribute('g-ref');
                    var multiple = false;

                    if (items[name] != null) {
                        return true;
                    }

                    if (name.includes('[]')) {
                        multiple = true;
                        name = name.replace('[]', '');
                    }

                    if (name.split(':').length > 1) {
                        if (name.split(':')[0] == _this._name) {
                            if (multiple) {
                                items[name.split(':')[1]] = [];
                            } else {
                                items[name.split(':')[1]] = null;
                            }
                        }
                    } else {
                        if (multiple) {
                            items[name] = [];
                        } else {
                            items[name] = null;
                        }
                    }
                });
            }

            Object.keys(items).forEach(function (key) {
                if (Array.isArray(items[key])) {
                    var elements = (0, _utils.queryAll)(_this.getRef(key + '[]', true), _this.element);
                    if (elements.length === 0) {
                        elements = (0, _utils.queryAll)(_this.getRef(key.slice(0, -1), true), _this.element);
                        if (elements.length === 0) {
                            elements = (0, _utils.queryAll)(_this.getRef(key + '[]'), _this.element);
                            if (elements.length === 0) {
                                elements = (0, _utils.queryAll)(_this.getRef(key.slice(0, -1)), _this.element);
                            }
                        }
                    }
                    _this._ref[key] = elements;
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

            Object.keys(stateChanges).forEach(function (key) {
                if (newState[key].constructor === Array && stateChanges[key].length == 0) {
                    delete stateChanges[key];
                } else if (_typeof(newState[key]) === 'object' && Object.keys(stateChanges[key]).length == 0) {
                    delete stateChanges[key];
                }
            });

            this.stateChange(stateChanges);
            this._state = newState;
        }
    }, {
        key: 'stateChange',
        value: function stateChange(stateChanges) {
            // this is here only to be rewritten by extend
        }
    }, {
        key: 'delegate',
        value: function delegate(eventName, refName, handler) {
            this.element.addEventListener(eventName, function (event) {
                if (event.target.getAttribute('g-ref') === refName) {
                    handler(event);
                }
            });
        }
    }, {
        key: 'ref',
        get: function get() {
            return this._ref;
        },
        set: function set(items) {
            if (Object.keys(items).length == 0) {
                this._ref = this._getRefElements();
            } else {
                this._ref = {};
                this._ref = this._getRefElements(items);
            }

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _BaseComponent = __webpack_require__(2);

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _BaseComponent2.default; // this is here for webpack to expose BaseComponent as window.BaseComponent

/***/ })
/******/ ]);
});