(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["loadComponents"] = factory();
	else
		root["loadComponents"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
  return element['__goop_component__'];
}

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadComponents;

var _utils = __webpack_require__(2);

var _getComponentFromElement = __webpack_require__(1);

var _getComponentFromElement2 = _interopRequireDefault(_getComponentFromElement);

var _createInstance = __webpack_require__(0);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _loadComponents = __webpack_require__(3);

var _loadComponents2 = _interopRequireDefault(_loadComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _loadComponents2.default; // this is here for webpack to expose loadComponents as window.loadComponents

/***/ })
/******/ ]);
});