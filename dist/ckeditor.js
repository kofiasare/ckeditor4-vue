/*!
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CKEditor"] = factory();
	else
		root["CKEditor"] = factory();
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/load-script/index.js":
/*!*******************************************!*\
  !*** ./node_modules/load-script/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = function load (src, opts, cb) {
  var head = document.head || document.getElementsByTagName('head')[0]
  var script = document.createElement('script')

  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = opts || {}
  cb = cb || function() {}

  script.type = opts.type || 'text/javascript'
  script.charset = opts.charset || 'utf8';
  script.async = 'async' in opts ? !!opts.async : true
  script.src = src

  if (opts.attrs) {
    setAttributes(script, opts.attrs)
  }

  if (opts.text) {
    script.text = '' + opts.text
  }

  var onend = 'onload' in script ? stdOnEnd : ieOnEnd
  onend(script, cb)

  // some good legacy browsers (firefox) fail the 'in' detection above
  // so as a fallback we always set onload
  // old IE will ignore this and new IE will set onload
  if (!script.onload) {
    stdOnEnd(script, cb);
  }

  head.appendChild(script)
}

function setAttributes(script, attrs) {
  for (var attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}

function stdOnEnd (script, cb) {
  script.onload = function () {
    this.onerror = this.onload = null
    cb(null, script)
  }
  script.onerror = function () {
    // this.onload = null here is necessary
    // because even IE9 works not like others
    this.onerror = this.onload = null
    cb(new Error('Failed to load ' + this.src), script)
  }
}

function ieOnEnd (script, cb) {
  script.onreadystatechange = function () {
    if (this.readyState != 'complete' && this.readyState != 'loaded') return
    this.onreadystatechange = null
    cb(null, script) // there is no way to catch loading errors in IE8
  }
}


/***/ }),

/***/ "./src/ckeditor.js":
/*!*************************!*\
  !*** ./src/ckeditor.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_geteditornamespace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/geteditornamespace.js */ "./src/utils/geteditornamespace.js");
/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global CKEDITOR */

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ckeditor',

  render(createElement) {
    return createElement('div', {}, [createElement(this.tagName)]);
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'classic',
      validator: type => type in {
        classic: 1,
        inline: 1
      }
    },
    editorUrl: {
      type: String,
      default: 'https://cdn.ckeditor.com/4.12.1/standard/ckeditor.js'
    },
    config: {
      type: Object,
      default: () => {}
    },
    tagName: {
      type: String,
      default: 'textarea'
    },
    readOnly: {
      type: Boolean,
      default: null // Use the null for default value, so `config.readOnly` can take precedence.

    }
  },

  mounted() {
    Object(_utils_geteditornamespace_js__WEBPACK_IMPORTED_MODULE_0__["getEditorNamespace"])(this.editorUrl).then(() => {
      if (this.$_destroyed) {
        return;
      }

      const config = { ...this.config
      }; // Overwrite config only if `component.readOnly` is set.

      if (this.readOnly !== null) {
        config.readOnly = this.readOnly;
      }

      const method = this.type === 'inline' ? 'inline' : 'replace';
      const element = this.$el.firstElementChild;
      const editor = this.instance = CKEDITOR[method](element, config);
      editor.on('instanceReady', () => {
        const undo = editor.undoManager;
        const data = this.value;
        undo && undo.lock();
        editor.setData(data, {
          callback: () => {
            this.$_setUpEditorEvents();
            const newData = editor.getData(); // Locking undoManager prevents 'change' event.
            // Trigger it manually to update bound data.

            if (data !== newData) {
              this.$once('input', () => {
                this.$emit('ready', editor);
              });
              this.$emit('input', newData);
            } else {
              this.$emit('ready', editor);
            }

            undo && undo.unlock();
          }
        });
      });
    });
  },

  beforeDestroy() {
    if (this.instance) {
      this.instance.destroy();
    }

    this.$_destroyed = true;
  },

  watch: {
    value(val) {
      if (this.instance.getData() !== val) {
        this.instance.setData(val);
      }
    },

    readOnly(val) {
      this.instance.setReadOnly(val);
    }

  },
  methods: {
    $_setUpEditorEvents() {
      const editor = this.instance;
      editor.on('change', evt => {
        const data = editor.getData(); // Editor#change event might be fired without actual data change.

        if (this.value !== data) {
          // The compatibility with the v-model and general Vue.js concept of input–like components.
          this.$emit('input', data, evt, editor);
        }
      });
      editor.on('focus', evt => {
        this.$emit('focus', evt, editor);
      });
      editor.on('blur', evt => {
        this.$emit('blur', evt, editor);
      });
    }

  }
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ckeditor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ckeditor.js */ "./src/ckeditor.js");
/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

const CKEditor = {
  /**
   * Installs the plugin, registering the `<ckeditor>` component.
   *
   * @param {Vue} Vue The Vue object.
   */
  install(Vue) {
    Vue.component('ckeditor', _ckeditor_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
  },

  component: _ckeditor_js__WEBPACK_IMPORTED_MODULE_0__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (CKEditor);

/***/ }),

/***/ "./src/utils/geteditornamespace.js":
/*!*****************************************!*\
  !*** ./src/utils/geteditornamespace.js ***!
  \*****************************************/
/*! exports provided: getEditorNamespace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEditorNamespace", function() { return getEditorNamespace; });
/* harmony import */ var load_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! load-script */ "./node_modules/load-script/index.js");
/* harmony import */ var load_script__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(load_script__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global window CKEDITOR */

let promise;
function getEditorNamespace(editorURL) {
  if ('CKEDITOR' in window) {
    return Promise.resolve(CKEDITOR);
  }

  if (editorURL.length < 1) {
    throw new TypeError('CKEditor URL must be a non-empty string.');
  }

  if (!promise) {
    promise = getEditorNamespace.scriptLoader(editorURL);
    promise.then(() => {
      promise = undefined;
    });
  }

  return promise;
}

getEditorNamespace.scriptLoader = editorURL => new Promise((scriptResolve, scriptReject) => {
  load_script__WEBPACK_IMPORTED_MODULE_0___default()(editorURL, err => {
    if (err) {
      scriptReject(err);
    } else if (!window.CKEDITOR) {
      scriptReject(new Error('Script loaded from editorUrl doesn\'t provide CKEDITOR namespace.'));
    } else {
      scriptResolve(CKEDITOR);
    }
  });
});

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=ckeditor.js.map