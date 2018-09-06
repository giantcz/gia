(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gia"] = factory();
	else
		root["gia"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
    if (typeof element === 'string') {
        element = document.getElementById(element);

        if (!element) {
            return null;
        }
    }

    return element['__gia_component__'];
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
        key: "emit",
        value: function emit(event) {
            var _this = this;

            var eventObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            eventObject._name = event;
            if (this.list[event]) {
                console.info(this.list[event].length + " handler" + (this.list[event].length > 1 ? "s" : "") + " called on event '" + event + "'");
                this.list[event].forEach(function (handlerObject) {
                    handlerObject.handler(eventObject);
                    if (handlerObject.once) {
                        _this.off(event, handlerObject.handler);
                    }
                });
            } else {
                console.info("0 handlers called on event '" + event + "'");
            }
        }
    }, {
        key: "on",
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
        key: "once",
        value: function once(event, handler) {
            this.on(event, handler, true);
        }
    }, {
        key: "off",
        value: function off(event, handler) {
            if (event != null) {
                if (handler != null) {
                    if (this.list[event] && this.list[event].filter(function (eventObject) {
                        return eventObject.handler === handler;
                    }).length) {
                        var toRemove = this.list[event].filter(function (eventObject) {
                            return eventObject.handler === handler;
                        })[0];
                        console.log(toRemove);
                        var index = this.list[event].indexOf(toRemove);
                        if (index > -1) {
                            this.list[event].splice(index, 1);
                        }
                    } else {
                        console.warn("Event " + event + " cannot be unsubscribed - does not exist.");
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(1);

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
        key: 'setState',
        value: function setState(newState) {
            var _this = this;

            var stateChanges = {};

            Object.keys(newState).forEach(function (key) {
                if (typeof newState[key] === 'boolean' || typeof newState[key] === 'string' || typeof newState[key] === 'number' || typeof newState[key] === 'undefined') {
                    if (_this._state[key] !== newState[key]) {
                        stateChanges[key] = newState[key];
                    }
                } else if (newState[key].constructor === Array) {
                    if (_this._state[key] != null) {
                        stateChanges[key] = [];
                        newState[key].forEach(function (item, index) {
                            //console.log(this.state[key] != null, this.state[key], newState[key])
                            if (_this._state[key][index] !== newState[key][index]) {
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
            var _this2 = this;

            var allRefs = (0, _utils.queryAll)('[g-ref]', this.element);

            if (Object.keys(items).length === 0) {
                allRefs.forEach(function (element) {
                    var refName = element.getAttribute('g-ref');
                    if (!_this2._ref[refName]) {
                        _this2._ref[refName] = allRefs.filter(function (item) {
                            return item.getAttribute('g-ref') === refName;
                        });
                    }
                });
            } else {
                this._ref = Object.keys(items).map(function (key) {
                    var isArray = Array.isArray(items[key]);

                    // non-empty refs
                    if (items[key] !== null && isArray && items[key].length > 0) {
                        return {
                            name: key,
                            value: items[key]
                        };
                    }

                    var name = key;
                    var prefixedName = _this2._name + ':' + name;

                    var refs = allRefs.filter(function (element) {
                        return element.getAttribute('g-ref') === prefixedName;
                    });

                    if (refs.length === 0) {
                        refs = allRefs.filter(function (element) {
                            return element.getAttribute('g-ref') === name;
                        });
                    }

                    if (!isArray) {
                        refs = refs.length ? refs[0] : null;
                    }

                    return {
                        name: key,
                        value: refs
                    };
                }).reduce(function (acc, ref) {
                    acc[ref.name] = ref.value;
                    return acc;
                }, {});
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = destroyInstance;

var _getComponentFromElement = __webpack_require__(0);

var _getComponentFromElement2 = _interopRequireDefault(_getComponentFromElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * destroys and removes instance from DOM element
 * @param element: DOM element
 */

function destroyInstance(element) {
    var instance = (0, _getComponentFromElement2.default)(element);
    if (instance) {
        var name = instance._name;
        instance.destroy();
        element['__gia_component__'] = null;
        console.info('Removed component "' + name + '".');
    }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = removeComponents;

var _utils = __webpack_require__(1);

var _destroyInstance = __webpack_require__(4);

var _destroyInstance2 = _interopRequireDefault(_destroyInstance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Removes instances of components on element within the context
 * @param context: DOM element
 */

function removeComponents() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.documentElement;

    (0, _utils.queryAll)('[g-component]', context).forEach(function (element) {
        (0, _destroyInstance2.default)(element);
    });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInstance;
/**
 * Creates and returns instance of component
 * @param element: DOM element
 * @param componentName: Component name
 * @param component: Component constructor
 */

function createInstance(element, componentName, component, options) {
  component.prototype._name = componentName;
  var instance = new component(element, options);

  console.info("Created instance of component \"" + componentName + "\".");
  return instance;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadComponents;

var _utils = __webpack_require__(1);

var _getComponentFromElement = __webpack_require__(0);

var _getComponentFromElement2 = _interopRequireDefault(_getComponentFromElement);

var _createInstance = __webpack_require__(6);

var _createInstance2 = _interopRequireDefault(_createInstance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates instances of components without creating duplicates on element within the context
 * @param components: object of components to load
 * @param context: DOM element
 */

function loadComponents() {
    var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;


    if (!components || Object.keys(components).length === 0) {
        console.warn('App has no components');
        return;
    }

    var initialisedComponents = [];

    (0, _utils.queryAll)('[g-component]', context).forEach(function (element) {
        var instance = (0, _getComponentFromElement2.default)(element);

        if (instance) {
            console.warn('Error: instance exists: \n', instance);
            return true; // continue
        }

        var componentName = element.getAttribute('g-component');

        if (typeof components[componentName] === 'function') {
            initialisedComponents.push((0, _createInstance2.default)(element, componentName, components[componentName]));
        } else {
            console.warn('Constructor for component "' + componentName + '" not found.');
        }
    });

    // call load/require/prepare
    initialisedComponents.forEach(function (component) {
        component._load();
    });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _loadComponents = __webpack_require__(7);

var _loadComponents2 = _interopRequireDefault(_loadComponents);

var _removeComponents = __webpack_require__(5);

var _removeComponents2 = _interopRequireDefault(_removeComponents);

var _getComponentFromElement = __webpack_require__(0);

var _getComponentFromElement2 = _interopRequireDefault(_getComponentFromElement);

var _BaseComponent = __webpack_require__(3);

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _eventbus = __webpack_require__(2);

var _eventbus2 = _interopRequireDefault(_eventbus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    loadComponents: _loadComponents2.default,
    createInstance: _loadComponents2.default,
    removeComponents: _removeComponents2.default,
    destroyInstance: _removeComponents2.default,
    Component: _BaseComponent2.default,
    getComponentFromElement: _getComponentFromElement2.default,
    eventbus: _eventbus2.default
};

/***/ })
/******/ ]);
});