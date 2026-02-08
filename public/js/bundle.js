"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/axios/dist/browser/axios.cjs
  var require_axios = __commonJS({
    "node_modules/axios/dist/browser/axios.cjs"(exports, module) {
      "use strict";
      function bind(fn, thisArg) {
        return function wrap() {
          return fn.apply(thisArg, arguments);
        };
      }
      var { toString } = Object.prototype;
      var { getPrototypeOf } = Object;
      var { iterator, toStringTag } = Symbol;
      var kindOf = /* @__PURE__ */ ((cache) => (thing) => {
        const str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
      })(/* @__PURE__ */ Object.create(null));
      var kindOfTest = (type) => {
        type = type.toLowerCase();
        return (thing) => kindOf(thing) === type;
      };
      var typeOfTest = (type) => (thing) => typeof thing === type;
      var { isArray } = Array;
      var isUndefined = typeOfTest("undefined");
      function isBuffer(val) {
        return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
      }
      var isArrayBuffer = kindOfTest("ArrayBuffer");
      function isArrayBufferView(val) {
        let result;
        if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
          result = ArrayBuffer.isView(val);
        } else {
          result = val && val.buffer && isArrayBuffer(val.buffer);
        }
        return result;
      }
      var isString = typeOfTest("string");
      var isFunction$1 = typeOfTest("function");
      var isNumber = typeOfTest("number");
      var isObject = (thing) => thing !== null && typeof thing === "object";
      var isBoolean = (thing) => thing === true || thing === false;
      var isPlainObject = (val) => {
        if (kindOf(val) !== "object") {
          return false;
        }
        const prototype2 = getPrototypeOf(val);
        return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
      };
      var isEmptyObject = (val) => {
        if (!isObject(val) || isBuffer(val)) {
          return false;
        }
        try {
          return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
        } catch (e) {
          return false;
        }
      };
      var isDate = kindOfTest("Date");
      var isFile = kindOfTest("File");
      var isBlob = kindOfTest("Blob");
      var isFileList = kindOfTest("FileList");
      var isStream = (val) => isObject(val) && isFunction$1(val.pipe);
      var isFormData = (thing) => {
        let kind;
        return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction$1(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
        kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]"));
      };
      var isURLSearchParams = kindOfTest("URLSearchParams");
      var [isReadableStream, isRequest, isResponse, isHeaders] = [
        "ReadableStream",
        "Request",
        "Response",
        "Headers"
      ].map(kindOfTest);
      var trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
      function forEach(obj, fn, { allOwnKeys = false } = {}) {
        if (obj === null || typeof obj === "undefined") {
          return;
        }
        let i;
        let l;
        if (typeof obj !== "object") {
          obj = [obj];
        }
        if (isArray(obj)) {
          for (i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
          }
        } else {
          if (isBuffer(obj)) {
            return;
          }
          const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
          const len = keys.length;
          let key;
          for (i = 0; i < len; i++) {
            key = keys[i];
            fn.call(null, obj[key], key, obj);
          }
        }
      }
      function findKey(obj, key) {
        if (isBuffer(obj)) {
          return null;
        }
        key = key.toLowerCase();
        const keys = Object.keys(obj);
        let i = keys.length;
        let _key;
        while (i-- > 0) {
          _key = keys[i];
          if (key === _key.toLowerCase()) {
            return _key;
          }
        }
        return null;
      }
      var _global = (() => {
        if (typeof globalThis !== "undefined") return globalThis;
        return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
      })();
      var isContextDefined = (context) => !isUndefined(context) && context !== _global;
      function merge() {
        const { caseless, skipUndefined } = isContextDefined(this) && this || {};
        const result = {};
        const assignValue = (val, key) => {
          if (key === "__proto__" || key === "constructor" || key === "prototype") {
            return;
          }
          const targetKey = caseless && findKey(result, key) || key;
          if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
            result[targetKey] = merge(result[targetKey], val);
          } else if (isPlainObject(val)) {
            result[targetKey] = merge({}, val);
          } else if (isArray(val)) {
            result[targetKey] = val.slice();
          } else if (!skipUndefined || !isUndefined(val)) {
            result[targetKey] = val;
          }
        };
        for (let i = 0, l = arguments.length; i < l; i++) {
          arguments[i] && forEach(arguments[i], assignValue);
        }
        return result;
      }
      var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
        forEach(
          b,
          (val, key) => {
            if (thisArg && isFunction$1(val)) {
              Object.defineProperty(a, key, {
                value: bind(val, thisArg),
                writable: true,
                enumerable: true,
                configurable: true
              });
            } else {
              Object.defineProperty(a, key, {
                value: val,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          },
          { allOwnKeys }
        );
        return a;
      };
      var stripBOM = (content) => {
        if (content.charCodeAt(0) === 65279) {
          content = content.slice(1);
        }
        return content;
      };
      var inherits = (constructor, superConstructor, props, descriptors) => {
        constructor.prototype = Object.create(
          superConstructor.prototype,
          descriptors
        );
        Object.defineProperty(constructor.prototype, "constructor", {
          value: constructor,
          writable: true,
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(constructor, "super", {
          value: superConstructor.prototype
        });
        props && Object.assign(constructor.prototype, props);
      };
      var toFlatObject = (sourceObj, destObj, filter, propFilter) => {
        let props;
        let i;
        let prop;
        const merged = {};
        destObj = destObj || {};
        if (sourceObj == null) return destObj;
        do {
          props = Object.getOwnPropertyNames(sourceObj);
          i = props.length;
          while (i-- > 0) {
            prop = props[i];
            if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
              destObj[prop] = sourceObj[prop];
              merged[prop] = true;
            }
          }
          sourceObj = filter !== false && getPrototypeOf(sourceObj);
        } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
        return destObj;
      };
      var endsWith = (str, searchString, position) => {
        str = String(str);
        if (position === void 0 || position > str.length) {
          position = str.length;
        }
        position -= searchString.length;
        const lastIndex = str.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
      };
      var toArray = (thing) => {
        if (!thing) return null;
        if (isArray(thing)) return thing;
        let i = thing.length;
        if (!isNumber(i)) return null;
        const arr = new Array(i);
        while (i-- > 0) {
          arr[i] = thing[i];
        }
        return arr;
      };
      var isTypedArray = /* @__PURE__ */ ((TypedArray) => {
        return (thing) => {
          return TypedArray && thing instanceof TypedArray;
        };
      })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
      var forEachEntry = (obj, fn) => {
        const generator = obj && obj[iterator];
        const _iterator = generator.call(obj);
        let result;
        while ((result = _iterator.next()) && !result.done) {
          const pair = result.value;
          fn.call(obj, pair[0], pair[1]);
        }
      };
      var matchAll = (regExp, str) => {
        let matches;
        const arr = [];
        while ((matches = regExp.exec(str)) !== null) {
          arr.push(matches);
        }
        return arr;
      };
      var isHTMLForm = kindOfTest("HTMLFormElement");
      var toCamelCase = (str) => {
        return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
          return p1.toUpperCase() + p2;
        });
      };
      var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
      var isRegExp = kindOfTest("RegExp");
      var reduceDescriptors = (obj, reducer) => {
        const descriptors = Object.getOwnPropertyDescriptors(obj);
        const reducedDescriptors = {};
        forEach(descriptors, (descriptor, name) => {
          let ret;
          if ((ret = reducer(descriptor, name, obj)) !== false) {
            reducedDescriptors[name] = ret || descriptor;
          }
        });
        Object.defineProperties(obj, reducedDescriptors);
      };
      var freezeMethods = (obj) => {
        reduceDescriptors(obj, (descriptor, name) => {
          if (isFunction$1(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
            return false;
          }
          const value = obj[name];
          if (!isFunction$1(value)) return;
          descriptor.enumerable = false;
          if ("writable" in descriptor) {
            descriptor.writable = false;
            return;
          }
          if (!descriptor.set) {
            descriptor.set = () => {
              throw Error("Can not rewrite read-only method '" + name + "'");
            };
          }
        });
      };
      var toObjectSet = (arrayOrString, delimiter) => {
        const obj = {};
        const define = (arr) => {
          arr.forEach((value) => {
            obj[value] = true;
          });
        };
        isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
        return obj;
      };
      var noop = () => {
      };
      var toFiniteNumber = (value, defaultValue) => {
        return value != null && Number.isFinite(value = +value) ? value : defaultValue;
      };
      function isSpecCompliantForm(thing) {
        return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
      }
      var toJSONObject = (obj) => {
        const stack = new Array(10);
        const visit = (source, i) => {
          if (isObject(source)) {
            if (stack.indexOf(source) >= 0) {
              return;
            }
            if (isBuffer(source)) {
              return source;
            }
            if (!("toJSON" in source)) {
              stack[i] = source;
              const target = isArray(source) ? [] : {};
              forEach(source, (value, key) => {
                const reducedValue = visit(value, i + 1);
                !isUndefined(reducedValue) && (target[key] = reducedValue);
              });
              stack[i] = void 0;
              return target;
            }
          }
          return source;
        };
        return visit(obj, 0);
      };
      var isAsyncFn = kindOfTest("AsyncFunction");
      var isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
      var _setImmediate = ((setImmediateSupported, postMessageSupported) => {
        if (setImmediateSupported) {
          return setImmediate;
        }
        return postMessageSupported ? ((token, callbacks) => {
          _global.addEventListener(
            "message",
            ({ source, data }) => {
              if (source === _global && data === token) {
                callbacks.length && callbacks.shift()();
              }
            },
            false
          );
          return (cb) => {
            callbacks.push(cb);
            _global.postMessage(token, "*");
          };
        })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
      })(typeof setImmediate === "function", isFunction$1(_global.postMessage));
      var asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
      var isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
      var utils$1 = {
        isArray,
        isArrayBuffer,
        isBuffer,
        isFormData,
        isArrayBufferView,
        isString,
        isNumber,
        isBoolean,
        isObject,
        isPlainObject,
        isEmptyObject,
        isReadableStream,
        isRequest,
        isResponse,
        isHeaders,
        isUndefined,
        isDate,
        isFile,
        isBlob,
        isRegExp,
        isFunction: isFunction$1,
        isStream,
        isURLSearchParams,
        isTypedArray,
        isFileList,
        forEach,
        merge,
        extend,
        trim,
        stripBOM,
        inherits,
        toFlatObject,
        kindOf,
        kindOfTest,
        endsWith,
        toArray,
        forEachEntry,
        matchAll,
        isHTMLForm,
        hasOwnProperty,
        hasOwnProp: hasOwnProperty,
        // an alias to avoid ESLint no-prototype-builtins detection
        reduceDescriptors,
        freezeMethods,
        toObjectSet,
        toCamelCase,
        noop,
        toFiniteNumber,
        findKey,
        global: _global,
        isContextDefined,
        isSpecCompliantForm,
        toJSONObject,
        isAsyncFn,
        isThenable,
        setImmediate: _setImmediate,
        asap,
        isIterable
      };
      var AxiosError = class _AxiosError extends Error {
        static from(error, code, config, request, response, customProps) {
          const axiosError = new _AxiosError(error.message, code || error.code, config, request, response);
          axiosError.cause = error;
          axiosError.name = error.name;
          customProps && Object.assign(axiosError, customProps);
          return axiosError;
        }
        /**
         * Create an Error with the specified message, config, error code, request and response.
         *
         * @param {string} message The error message.
         * @param {string} [code] The error code (for example, 'ECONNABORTED').
         * @param {Object} [config] The config.
         * @param {Object} [request] The request.
         * @param {Object} [response] The response.
         *
         * @returns {Error} The created error.
         */
        constructor(message, code, config, request, response) {
          super(message);
          this.name = "AxiosError";
          this.isAxiosError = true;
          code && (this.code = code);
          config && (this.config = config);
          request && (this.request = request);
          if (response) {
            this.response = response;
            this.status = response.status;
          }
        }
        toJSON() {
          return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            // Axios
            config: utils$1.toJSONObject(this.config),
            code: this.code,
            status: this.status
          };
        }
      };
      AxiosError.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
      AxiosError.ERR_BAD_OPTION = "ERR_BAD_OPTION";
      AxiosError.ECONNABORTED = "ECONNABORTED";
      AxiosError.ETIMEDOUT = "ETIMEDOUT";
      AxiosError.ERR_NETWORK = "ERR_NETWORK";
      AxiosError.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
      AxiosError.ERR_DEPRECATED = "ERR_DEPRECATED";
      AxiosError.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
      AxiosError.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
      AxiosError.ERR_CANCELED = "ERR_CANCELED";
      AxiosError.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
      AxiosError.ERR_INVALID_URL = "ERR_INVALID_URL";
      var AxiosError$1 = AxiosError;
      var httpAdapter = null;
      function isVisitable(thing) {
        return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
      }
      function removeBrackets(key) {
        return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
      }
      function renderKey(path, key, dots) {
        if (!path) return key;
        return path.concat(key).map(function each(token, i) {
          token = removeBrackets(token);
          return !dots && i ? "[" + token + "]" : token;
        }).join(dots ? "." : "");
      }
      function isFlatArray(arr) {
        return utils$1.isArray(arr) && !arr.some(isVisitable);
      }
      var predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
        return /^is[A-Z]/.test(prop);
      });
      function toFormData(obj, formData, options) {
        if (!utils$1.isObject(obj)) {
          throw new TypeError("target must be an object");
        }
        formData = formData || new FormData();
        options = utils$1.toFlatObject(options, {
          metaTokens: true,
          dots: false,
          indexes: false
        }, false, function defined(option, source) {
          return !utils$1.isUndefined(source[option]);
        });
        const metaTokens = options.metaTokens;
        const visitor = options.visitor || defaultVisitor;
        const dots = options.dots;
        const indexes = options.indexes;
        const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
        const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
        if (!utils$1.isFunction(visitor)) {
          throw new TypeError("visitor must be a function");
        }
        function convertValue(value) {
          if (value === null) return "";
          if (utils$1.isDate(value)) {
            return value.toISOString();
          }
          if (utils$1.isBoolean(value)) {
            return value.toString();
          }
          if (!useBlob && utils$1.isBlob(value)) {
            throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
          }
          if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
            return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
          }
          return value;
        }
        function defaultVisitor(value, key, path) {
          let arr = value;
          if (value && !path && typeof value === "object") {
            if (utils$1.endsWith(key, "{}")) {
              key = metaTokens ? key : key.slice(0, -2);
              value = JSON.stringify(value);
            } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
              key = removeBrackets(key);
              arr.forEach(function each(el, index) {
                !(utils$1.isUndefined(el) || el === null) && formData.append(
                  // eslint-disable-next-line no-nested-ternary
                  indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
                  convertValue(el)
                );
              });
              return false;
            }
          }
          if (isVisitable(value)) {
            return true;
          }
          formData.append(renderKey(path, key, dots), convertValue(value));
          return false;
        }
        const stack = [];
        const exposedHelpers = Object.assign(predicates, {
          defaultVisitor,
          convertValue,
          isVisitable
        });
        function build(value, path) {
          if (utils$1.isUndefined(value)) return;
          if (stack.indexOf(value) !== -1) {
            throw Error("Circular reference detected in " + path.join("."));
          }
          stack.push(value);
          utils$1.forEach(value, function each(el, key) {
            const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
              formData,
              el,
              utils$1.isString(key) ? key.trim() : key,
              path,
              exposedHelpers
            );
            if (result === true) {
              build(el, path ? path.concat(key) : [key]);
            }
          });
          stack.pop();
        }
        if (!utils$1.isObject(obj)) {
          throw new TypeError("data must be an object");
        }
        build(obj);
        return formData;
      }
      function encode$1(str) {
        const charMap = {
          "!": "%21",
          "'": "%27",
          "(": "%28",
          ")": "%29",
          "~": "%7E",
          "%20": "+",
          "%00": "\0"
        };
        return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
          return charMap[match];
        });
      }
      function AxiosURLSearchParams(params, options) {
        this._pairs = [];
        params && toFormData(params, this, options);
      }
      var prototype = AxiosURLSearchParams.prototype;
      prototype.append = function append(name, value) {
        this._pairs.push([name, value]);
      };
      prototype.toString = function toString2(encoder) {
        const _encode = encoder ? function(value) {
          return encoder.call(this, value, encode$1);
        } : encode$1;
        return this._pairs.map(function each(pair) {
          return _encode(pair[0]) + "=" + _encode(pair[1]);
        }, "").join("&");
      };
      function encode(val) {
        return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
      }
      function buildURL(url, params, options) {
        if (!params) {
          return url;
        }
        const _encode = options && options.encode || encode;
        const _options = utils$1.isFunction(options) ? {
          serialize: options
        } : options;
        const serializeFn = _options && _options.serialize;
        let serializedParams;
        if (serializeFn) {
          serializedParams = serializeFn(params, _options);
        } else {
          serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, _options).toString(_encode);
        }
        if (serializedParams) {
          const hashmarkIndex = url.indexOf("#");
          if (hashmarkIndex !== -1) {
            url = url.slice(0, hashmarkIndex);
          }
          url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
        }
        return url;
      }
      var InterceptorManager = class {
        constructor() {
          this.handlers = [];
        }
        /**
         * Add a new interceptor to the stack
         *
         * @param {Function} fulfilled The function to handle `then` for a `Promise`
         * @param {Function} rejected The function to handle `reject` for a `Promise`
         * @param {Object} options The options for the interceptor, synchronous and runWhen
         *
         * @return {Number} An ID used to remove interceptor later
         */
        use(fulfilled, rejected, options) {
          this.handlers.push({
            fulfilled,
            rejected,
            synchronous: options ? options.synchronous : false,
            runWhen: options ? options.runWhen : null
          });
          return this.handlers.length - 1;
        }
        /**
         * Remove an interceptor from the stack
         *
         * @param {Number} id The ID that was returned by `use`
         *
         * @returns {void}
         */
        eject(id) {
          if (this.handlers[id]) {
            this.handlers[id] = null;
          }
        }
        /**
         * Clear all interceptors from the stack
         *
         * @returns {void}
         */
        clear() {
          if (this.handlers) {
            this.handlers = [];
          }
        }
        /**
         * Iterate over all the registered interceptors
         *
         * This method is particularly useful for skipping over any
         * interceptors that may have become `null` calling `eject`.
         *
         * @param {Function} fn The function to call for each interceptor
         *
         * @returns {void}
         */
        forEach(fn) {
          utils$1.forEach(this.handlers, function forEachHandler(h) {
            if (h !== null) {
              fn(h);
            }
          });
        }
      };
      var InterceptorManager$1 = InterceptorManager;
      var transitionalDefaults = {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false,
        legacyInterceptorReqResOrdering: true
      };
      var URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
      var FormData$1 = typeof FormData !== "undefined" ? FormData : null;
      var Blob$1 = typeof Blob !== "undefined" ? Blob : null;
      var platform$1 = {
        isBrowser: true,
        classes: {
          URLSearchParams: URLSearchParams$1,
          FormData: FormData$1,
          Blob: Blob$1
        },
        protocols: ["http", "https", "file", "blob", "url", "data"]
      };
      var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
      var _navigator = typeof navigator === "object" && navigator || void 0;
      var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
      var hasStandardBrowserWebWorkerEnv = (() => {
        return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
        self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
      })();
      var origin = hasBrowserEnv && window.location.href || "http://localhost";
      var utils = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        hasBrowserEnv,
        hasStandardBrowserWebWorkerEnv,
        hasStandardBrowserEnv,
        navigator: _navigator,
        origin
      });
      var platform = {
        ...utils,
        ...platform$1
      };
      function toURLEncodedForm(data, options) {
        return toFormData(data, new platform.classes.URLSearchParams(), {
          visitor: function(value, key, path, helpers) {
            if (platform.isNode && utils$1.isBuffer(value)) {
              this.append(key, value.toString("base64"));
              return false;
            }
            return helpers.defaultVisitor.apply(this, arguments);
          },
          ...options
        });
      }
      function parsePropPath(name) {
        return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
          return match[0] === "[]" ? "" : match[1] || match[0];
        });
      }
      function arrayToObject(arr) {
        const obj = {};
        const keys = Object.keys(arr);
        let i;
        const len = keys.length;
        let key;
        for (i = 0; i < len; i++) {
          key = keys[i];
          obj[key] = arr[key];
        }
        return obj;
      }
      function formDataToJSON(formData) {
        function buildPath(path, value, target, index) {
          let name = path[index++];
          if (name === "__proto__") return true;
          const isNumericKey = Number.isFinite(+name);
          const isLast = index >= path.length;
          name = !name && utils$1.isArray(target) ? target.length : name;
          if (isLast) {
            if (utils$1.hasOwnProp(target, name)) {
              target[name] = [target[name], value];
            } else {
              target[name] = value;
            }
            return !isNumericKey;
          }
          if (!target[name] || !utils$1.isObject(target[name])) {
            target[name] = [];
          }
          const result = buildPath(path, value, target[name], index);
          if (result && utils$1.isArray(target[name])) {
            target[name] = arrayToObject(target[name]);
          }
          return !isNumericKey;
        }
        if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
          const obj = {};
          utils$1.forEachEntry(formData, (name, value) => {
            buildPath(parsePropPath(name), value, obj, 0);
          });
          return obj;
        }
        return null;
      }
      function stringifySafely(rawValue, parser, encoder) {
        if (utils$1.isString(rawValue)) {
          try {
            (parser || JSON.parse)(rawValue);
            return utils$1.trim(rawValue);
          } catch (e) {
            if (e.name !== "SyntaxError") {
              throw e;
            }
          }
        }
        return (encoder || JSON.stringify)(rawValue);
      }
      var defaults = {
        transitional: transitionalDefaults,
        adapter: ["xhr", "http", "fetch"],
        transformRequest: [function transformRequest(data, headers) {
          const contentType = headers.getContentType() || "";
          const hasJSONContentType = contentType.indexOf("application/json") > -1;
          const isObjectPayload = utils$1.isObject(data);
          if (isObjectPayload && utils$1.isHTMLForm(data)) {
            data = new FormData(data);
          }
          const isFormData2 = utils$1.isFormData(data);
          if (isFormData2) {
            return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
          }
          if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
            return data;
          }
          if (utils$1.isArrayBufferView(data)) {
            return data.buffer;
          }
          if (utils$1.isURLSearchParams(data)) {
            headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
            return data.toString();
          }
          let isFileList2;
          if (isObjectPayload) {
            if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
              return toURLEncodedForm(data, this.formSerializer).toString();
            }
            if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
              const _FormData = this.env && this.env.FormData;
              return toFormData(
                isFileList2 ? { "files[]": data } : data,
                _FormData && new _FormData(),
                this.formSerializer
              );
            }
          }
          if (isObjectPayload || hasJSONContentType) {
            headers.setContentType("application/json", false);
            return stringifySafely(data);
          }
          return data;
        }],
        transformResponse: [function transformResponse(data) {
          const transitional = this.transitional || defaults.transitional;
          const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
          const JSONRequested = this.responseType === "json";
          if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
            return data;
          }
          if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
            const silentJSONParsing = transitional && transitional.silentJSONParsing;
            const strictJSONParsing = !silentJSONParsing && JSONRequested;
            try {
              return JSON.parse(data, this.parseReviver);
            } catch (e) {
              if (strictJSONParsing) {
                if (e.name === "SyntaxError") {
                  throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
                }
                throw e;
              }
            }
          }
          return data;
        }],
        /**
         * A timeout in milliseconds to abort a request. If set to 0 (default) a
         * timeout is not created.
         */
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
          FormData: platform.classes.FormData,
          Blob: platform.classes.Blob
        },
        validateStatus: function validateStatus(status) {
          return status >= 200 && status < 300;
        },
        headers: {
          common: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": void 0
          }
        }
      };
      utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
        defaults.headers[method] = {};
      });
      var defaults$1 = defaults;
      var ignoreDuplicateOf = utils$1.toObjectSet([
        "age",
        "authorization",
        "content-length",
        "content-type",
        "etag",
        "expires",
        "from",
        "host",
        "if-modified-since",
        "if-unmodified-since",
        "last-modified",
        "location",
        "max-forwards",
        "proxy-authorization",
        "referer",
        "retry-after",
        "user-agent"
      ]);
      var parseHeaders = (rawHeaders) => {
        const parsed = {};
        let key;
        let val;
        let i;
        rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
          i = line.indexOf(":");
          key = line.substring(0, i).trim().toLowerCase();
          val = line.substring(i + 1).trim();
          if (!key || parsed[key] && ignoreDuplicateOf[key]) {
            return;
          }
          if (key === "set-cookie") {
            if (parsed[key]) {
              parsed[key].push(val);
            } else {
              parsed[key] = [val];
            }
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        });
        return parsed;
      };
      var $internals = /* @__PURE__ */ Symbol("internals");
      function normalizeHeader(header) {
        return header && String(header).trim().toLowerCase();
      }
      function normalizeValue(value) {
        if (value === false || value == null) {
          return value;
        }
        return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
      }
      function parseTokens(str) {
        const tokens = /* @__PURE__ */ Object.create(null);
        const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
        let match;
        while (match = tokensRE.exec(str)) {
          tokens[match[1]] = match[2];
        }
        return tokens;
      }
      var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
      function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
        if (utils$1.isFunction(filter)) {
          return filter.call(this, value, header);
        }
        if (isHeaderNameFilter) {
          value = header;
        }
        if (!utils$1.isString(value)) return;
        if (utils$1.isString(filter)) {
          return value.indexOf(filter) !== -1;
        }
        if (utils$1.isRegExp(filter)) {
          return filter.test(value);
        }
      }
      function formatHeader(header) {
        return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
          return char.toUpperCase() + str;
        });
      }
      function buildAccessors(obj, header) {
        const accessorName = utils$1.toCamelCase(" " + header);
        ["get", "set", "has"].forEach((methodName) => {
          Object.defineProperty(obj, methodName + accessorName, {
            value: function(arg1, arg2, arg3) {
              return this[methodName].call(this, header, arg1, arg2, arg3);
            },
            configurable: true
          });
        });
      }
      var AxiosHeaders = class {
        constructor(headers) {
          headers && this.set(headers);
        }
        set(header, valueOrRewrite, rewrite) {
          const self2 = this;
          function setHeader(_value, _header, _rewrite) {
            const lHeader = normalizeHeader(_header);
            if (!lHeader) {
              throw new Error("header name must be a non-empty string");
            }
            const key = utils$1.findKey(self2, lHeader);
            if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
              self2[key || _header] = normalizeValue(_value);
            }
          }
          const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
          if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
            setHeaders(header, valueOrRewrite);
          } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
            setHeaders(parseHeaders(header), valueOrRewrite);
          } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
            let obj = {}, dest, key;
            for (const entry of header) {
              if (!utils$1.isArray(entry)) {
                throw TypeError("Object iterator must return a key-value pair");
              }
              obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
            }
            setHeaders(obj, valueOrRewrite);
          } else {
            header != null && setHeader(valueOrRewrite, header, rewrite);
          }
          return this;
        }
        get(header, parser) {
          header = normalizeHeader(header);
          if (header) {
            const key = utils$1.findKey(this, header);
            if (key) {
              const value = this[key];
              if (!parser) {
                return value;
              }
              if (parser === true) {
                return parseTokens(value);
              }
              if (utils$1.isFunction(parser)) {
                return parser.call(this, value, key);
              }
              if (utils$1.isRegExp(parser)) {
                return parser.exec(value);
              }
              throw new TypeError("parser must be boolean|regexp|function");
            }
          }
        }
        has(header, matcher) {
          header = normalizeHeader(header);
          if (header) {
            const key = utils$1.findKey(this, header);
            return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
          }
          return false;
        }
        delete(header, matcher) {
          const self2 = this;
          let deleted = false;
          function deleteHeader(_header) {
            _header = normalizeHeader(_header);
            if (_header) {
              const key = utils$1.findKey(self2, _header);
              if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
                delete self2[key];
                deleted = true;
              }
            }
          }
          if (utils$1.isArray(header)) {
            header.forEach(deleteHeader);
          } else {
            deleteHeader(header);
          }
          return deleted;
        }
        clear(matcher) {
          const keys = Object.keys(this);
          let i = keys.length;
          let deleted = false;
          while (i--) {
            const key = keys[i];
            if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
              delete this[key];
              deleted = true;
            }
          }
          return deleted;
        }
        normalize(format) {
          const self2 = this;
          const headers = {};
          utils$1.forEach(this, (value, header) => {
            const key = utils$1.findKey(headers, header);
            if (key) {
              self2[key] = normalizeValue(value);
              delete self2[header];
              return;
            }
            const normalized = format ? formatHeader(header) : String(header).trim();
            if (normalized !== header) {
              delete self2[header];
            }
            self2[normalized] = normalizeValue(value);
            headers[normalized] = true;
          });
          return this;
        }
        concat(...targets) {
          return this.constructor.concat(this, ...targets);
        }
        toJSON(asStrings) {
          const obj = /* @__PURE__ */ Object.create(null);
          utils$1.forEach(this, (value, header) => {
            value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
          });
          return obj;
        }
        [Symbol.iterator]() {
          return Object.entries(this.toJSON())[Symbol.iterator]();
        }
        toString() {
          return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
        }
        getSetCookie() {
          return this.get("set-cookie") || [];
        }
        get [Symbol.toStringTag]() {
          return "AxiosHeaders";
        }
        static from(thing) {
          return thing instanceof this ? thing : new this(thing);
        }
        static concat(first, ...targets) {
          const computed = new this(first);
          targets.forEach((target) => computed.set(target));
          return computed;
        }
        static accessor(header) {
          const internals = this[$internals] = this[$internals] = {
            accessors: {}
          };
          const accessors = internals.accessors;
          const prototype2 = this.prototype;
          function defineAccessor(_header) {
            const lHeader = normalizeHeader(_header);
            if (!accessors[lHeader]) {
              buildAccessors(prototype2, _header);
              accessors[lHeader] = true;
            }
          }
          utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
          return this;
        }
      };
      AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
      utils$1.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
        let mapped = key[0].toUpperCase() + key.slice(1);
        return {
          get: () => value,
          set(headerValue) {
            this[mapped] = headerValue;
          }
        };
      });
      utils$1.freezeMethods(AxiosHeaders);
      var AxiosHeaders$1 = AxiosHeaders;
      function transformData(fns, response) {
        const config = this || defaults$1;
        const context = response || config;
        const headers = AxiosHeaders$1.from(context.headers);
        let data = context.data;
        utils$1.forEach(fns, function transform(fn) {
          data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
        });
        headers.normalize();
        return data;
      }
      function isCancel(value) {
        return !!(value && value.__CANCEL__);
      }
      var CanceledError = class extends AxiosError$1 {
        /**
         * A `CanceledError` is an object that is thrown when an operation is canceled.
         *
         * @param {string=} message The message.
         * @param {Object=} config The config.
         * @param {Object=} request The request.
         *
         * @returns {CanceledError} The created error.
         */
        constructor(message, config, request) {
          super(message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
          this.name = "CanceledError";
          this.__CANCEL__ = true;
        }
      };
      var CanceledError$1 = CanceledError;
      function settle(resolve, reject, response) {
        const validateStatus = response.config.validateStatus;
        if (!response.status || !validateStatus || validateStatus(response.status)) {
          resolve(response);
        } else {
          reject(new AxiosError$1(
            "Request failed with status code " + response.status,
            [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
            response.config,
            response.request,
            response
          ));
        }
      }
      function parseProtocol(url) {
        const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
        return match && match[1] || "";
      }
      function speedometer(samplesCount, min) {
        samplesCount = samplesCount || 10;
        const bytes = new Array(samplesCount);
        const timestamps = new Array(samplesCount);
        let head = 0;
        let tail = 0;
        let firstSampleTS;
        min = min !== void 0 ? min : 1e3;
        return function push(chunkLength) {
          const now = Date.now();
          const startedAt = timestamps[tail];
          if (!firstSampleTS) {
            firstSampleTS = now;
          }
          bytes[head] = chunkLength;
          timestamps[head] = now;
          let i = tail;
          let bytesCount = 0;
          while (i !== head) {
            bytesCount += bytes[i++];
            i = i % samplesCount;
          }
          head = (head + 1) % samplesCount;
          if (head === tail) {
            tail = (tail + 1) % samplesCount;
          }
          if (now - firstSampleTS < min) {
            return;
          }
          const passed = startedAt && now - startedAt;
          return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
        };
      }
      function throttle(fn, freq) {
        let timestamp = 0;
        let threshold = 1e3 / freq;
        let lastArgs;
        let timer;
        const invoke = (args, now = Date.now()) => {
          timestamp = now;
          lastArgs = null;
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          fn(...args);
        };
        const throttled = (...args) => {
          const now = Date.now();
          const passed = now - timestamp;
          if (passed >= threshold) {
            invoke(args, now);
          } else {
            lastArgs = args;
            if (!timer) {
              timer = setTimeout(() => {
                timer = null;
                invoke(lastArgs);
              }, threshold - passed);
            }
          }
        };
        const flush = () => lastArgs && invoke(lastArgs);
        return [throttled, flush];
      }
      var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
        let bytesNotified = 0;
        const _speedometer = speedometer(50, 250);
        return throttle((e) => {
          const loaded = e.loaded;
          const total = e.lengthComputable ? e.total : void 0;
          const progressBytes = loaded - bytesNotified;
          const rate = _speedometer(progressBytes);
          const inRange = loaded <= total;
          bytesNotified = loaded;
          const data = {
            loaded,
            total,
            progress: total ? loaded / total : void 0,
            bytes: progressBytes,
            rate: rate ? rate : void 0,
            estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
            event: e,
            lengthComputable: total != null,
            [isDownloadStream ? "download" : "upload"]: true
          };
          listener(data);
        }, freq);
      };
      var progressEventDecorator = (total, throttled) => {
        const lengthComputable = total != null;
        return [(loaded) => throttled[0]({
          lengthComputable,
          total,
          loaded
        }), throttled[1]];
      };
      var asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
      var isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
        url = new URL(url, platform.origin);
        return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
      })(
        new URL(platform.origin),
        platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
      ) : () => true;
      var cookies = platform.hasStandardBrowserEnv ? (
        // Standard browser envs support document.cookie
        {
          write(name, value, expires, path, domain, secure, sameSite) {
            if (typeof document === "undefined") return;
            const cookie = [`${name}=${encodeURIComponent(value)}`];
            if (utils$1.isNumber(expires)) {
              cookie.push(`expires=${new Date(expires).toUTCString()}`);
            }
            if (utils$1.isString(path)) {
              cookie.push(`path=${path}`);
            }
            if (utils$1.isString(domain)) {
              cookie.push(`domain=${domain}`);
            }
            if (secure === true) {
              cookie.push("secure");
            }
            if (utils$1.isString(sameSite)) {
              cookie.push(`SameSite=${sameSite}`);
            }
            document.cookie = cookie.join("; ");
          },
          read(name) {
            if (typeof document === "undefined") return null;
            const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
            return match ? decodeURIComponent(match[1]) : null;
          },
          remove(name) {
            this.write(name, "", Date.now() - 864e5, "/");
          }
        }
      ) : (
        // Non-standard browser env (web workers, react-native) lack needed support.
        {
          write() {
          },
          read() {
            return null;
          },
          remove() {
          }
        }
      );
      function isAbsoluteURL(url) {
        if (typeof url !== "string") {
          return false;
        }
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
      }
      function combineURLs(baseURL, relativeURL) {
        return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
      }
      function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
        let isRelativeUrl = !isAbsoluteURL(requestedURL);
        if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
          return combineURLs(baseURL, requestedURL);
        }
        return requestedURL;
      }
      var headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
      function mergeConfig(config1, config2) {
        config2 = config2 || {};
        const config = {};
        function getMergedValue(target, source, prop, caseless) {
          if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
            return utils$1.merge.call({ caseless }, target, source);
          } else if (utils$1.isPlainObject(source)) {
            return utils$1.merge({}, source);
          } else if (utils$1.isArray(source)) {
            return source.slice();
          }
          return source;
        }
        function mergeDeepProperties(a, b, prop, caseless) {
          if (!utils$1.isUndefined(b)) {
            return getMergedValue(a, b, prop, caseless);
          } else if (!utils$1.isUndefined(a)) {
            return getMergedValue(void 0, a, prop, caseless);
          }
        }
        function valueFromConfig2(a, b) {
          if (!utils$1.isUndefined(b)) {
            return getMergedValue(void 0, b);
          }
        }
        function defaultToConfig2(a, b) {
          if (!utils$1.isUndefined(b)) {
            return getMergedValue(void 0, b);
          } else if (!utils$1.isUndefined(a)) {
            return getMergedValue(void 0, a);
          }
        }
        function mergeDirectKeys(a, b, prop) {
          if (prop in config2) {
            return getMergedValue(a, b);
          } else if (prop in config1) {
            return getMergedValue(void 0, a);
          }
        }
        const mergeMap = {
          url: valueFromConfig2,
          method: valueFromConfig2,
          data: valueFromConfig2,
          baseURL: defaultToConfig2,
          transformRequest: defaultToConfig2,
          transformResponse: defaultToConfig2,
          paramsSerializer: defaultToConfig2,
          timeout: defaultToConfig2,
          timeoutMessage: defaultToConfig2,
          withCredentials: defaultToConfig2,
          withXSRFToken: defaultToConfig2,
          adapter: defaultToConfig2,
          responseType: defaultToConfig2,
          xsrfCookieName: defaultToConfig2,
          xsrfHeaderName: defaultToConfig2,
          onUploadProgress: defaultToConfig2,
          onDownloadProgress: defaultToConfig2,
          decompress: defaultToConfig2,
          maxContentLength: defaultToConfig2,
          maxBodyLength: defaultToConfig2,
          beforeRedirect: defaultToConfig2,
          transport: defaultToConfig2,
          httpAgent: defaultToConfig2,
          httpsAgent: defaultToConfig2,
          cancelToken: defaultToConfig2,
          socketPath: defaultToConfig2,
          responseEncoding: defaultToConfig2,
          validateStatus: mergeDirectKeys,
          headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
        };
        utils$1.forEach(
          Object.keys({ ...config1, ...config2 }),
          function computeConfigValue(prop) {
            if (prop === "__proto__" || prop === "constructor" || prop === "prototype")
              return;
            const merge2 = utils$1.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
            const configValue = merge2(config1[prop], config2[prop], prop);
            utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
          }
        );
        return config;
      }
      var resolveConfig = (config) => {
        const newConfig = mergeConfig({}, config);
        let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
        newConfig.headers = headers = AxiosHeaders$1.from(headers);
        newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
        if (auth) {
          headers.set(
            "Authorization",
            "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
          );
        }
        if (utils$1.isFormData(data)) {
          if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
            headers.setContentType(void 0);
          } else if (utils$1.isFunction(data.getHeaders)) {
            const formHeaders = data.getHeaders();
            const allowedHeaders = ["content-type", "content-length"];
            Object.entries(formHeaders).forEach(([key, val]) => {
              if (allowedHeaders.includes(key.toLowerCase())) {
                headers.set(key, val);
              }
            });
          }
        }
        if (platform.hasStandardBrowserEnv) {
          withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
          if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
            const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
            if (xsrfValue) {
              headers.set(xsrfHeaderName, xsrfValue);
            }
          }
        }
        return newConfig;
      };
      var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
      var xhrAdapter = isXHRAdapterSupported && function(config) {
        return new Promise(function dispatchXhrRequest(resolve, reject) {
          const _config = resolveConfig(config);
          let requestData = _config.data;
          const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
          let { responseType, onUploadProgress, onDownloadProgress } = _config;
          let onCanceled;
          let uploadThrottled, downloadThrottled;
          let flushUpload, flushDownload;
          function done() {
            flushUpload && flushUpload();
            flushDownload && flushDownload();
            _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
            _config.signal && _config.signal.removeEventListener("abort", onCanceled);
          }
          let request = new XMLHttpRequest();
          request.open(_config.method.toUpperCase(), _config.url, true);
          request.timeout = _config.timeout;
          function onloadend() {
            if (!request) {
              return;
            }
            const responseHeaders = AxiosHeaders$1.from(
              "getAllResponseHeaders" in request && request.getAllResponseHeaders()
            );
            const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
            const response = {
              data: responseData,
              status: request.status,
              statusText: request.statusText,
              headers: responseHeaders,
              config,
              request
            };
            settle(function _resolve(value) {
              resolve(value);
              done();
            }, function _reject(err) {
              reject(err);
              done();
            }, response);
            request = null;
          }
          if ("onloadend" in request) {
            request.onloadend = onloadend;
          } else {
            request.onreadystatechange = function handleLoad() {
              if (!request || request.readyState !== 4) {
                return;
              }
              if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
                return;
              }
              setTimeout(onloadend);
            };
          }
          request.onabort = function handleAbort() {
            if (!request) {
              return;
            }
            reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
            request = null;
          };
          request.onerror = function handleError(event) {
            const msg = event && event.message ? event.message : "Network Error";
            const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
            err.event = event || null;
            reject(err);
            request = null;
          };
          request.ontimeout = function handleTimeout() {
            let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
            const transitional = _config.transitional || transitionalDefaults;
            if (_config.timeoutErrorMessage) {
              timeoutErrorMessage = _config.timeoutErrorMessage;
            }
            reject(new AxiosError$1(
              timeoutErrorMessage,
              transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
              config,
              request
            ));
            request = null;
          };
          requestData === void 0 && requestHeaders.setContentType(null);
          if ("setRequestHeader" in request) {
            utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
              request.setRequestHeader(key, val);
            });
          }
          if (!utils$1.isUndefined(_config.withCredentials)) {
            request.withCredentials = !!_config.withCredentials;
          }
          if (responseType && responseType !== "json") {
            request.responseType = _config.responseType;
          }
          if (onDownloadProgress) {
            [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
            request.addEventListener("progress", downloadThrottled);
          }
          if (onUploadProgress && request.upload) {
            [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
            request.upload.addEventListener("progress", uploadThrottled);
            request.upload.addEventListener("loadend", flushUpload);
          }
          if (_config.cancelToken || _config.signal) {
            onCanceled = (cancel) => {
              if (!request) {
                return;
              }
              reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
              request.abort();
              request = null;
            };
            _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
            if (_config.signal) {
              _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
            }
          }
          const protocol = parseProtocol(_config.url);
          if (protocol && platform.protocols.indexOf(protocol) === -1) {
            reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
            return;
          }
          request.send(requestData || null);
        });
      };
      var composeSignals = (signals, timeout) => {
        const { length } = signals = signals ? signals.filter(Boolean) : [];
        if (timeout || length) {
          let controller = new AbortController();
          let aborted;
          const onabort = function(reason) {
            if (!aborted) {
              aborted = true;
              unsubscribe();
              const err = reason instanceof Error ? reason : this.reason;
              controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
            }
          };
          let timer = timeout && setTimeout(() => {
            timer = null;
            onabort(new AxiosError$1(`timeout of ${timeout}ms exceeded`, AxiosError$1.ETIMEDOUT));
          }, timeout);
          const unsubscribe = () => {
            if (signals) {
              timer && clearTimeout(timer);
              timer = null;
              signals.forEach((signal2) => {
                signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
              });
              signals = null;
            }
          };
          signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
          const { signal } = controller;
          signal.unsubscribe = () => utils$1.asap(unsubscribe);
          return signal;
        }
      };
      var composeSignals$1 = composeSignals;
      var streamChunk = function* (chunk, chunkSize) {
        let len = chunk.byteLength;
        if (!chunkSize || len < chunkSize) {
          yield chunk;
          return;
        }
        let pos = 0;
        let end;
        while (pos < len) {
          end = pos + chunkSize;
          yield chunk.slice(pos, end);
          pos = end;
        }
      };
      var readBytes = async function* (iterable, chunkSize) {
        for await (const chunk of readStream(iterable)) {
          yield* streamChunk(chunk, chunkSize);
        }
      };
      var readStream = async function* (stream) {
        if (stream[Symbol.asyncIterator]) {
          yield* stream;
          return;
        }
        const reader = stream.getReader();
        try {
          for (; ; ) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            yield value;
          }
        } finally {
          await reader.cancel();
        }
      };
      var trackStream = (stream, chunkSize, onProgress, onFinish) => {
        const iterator2 = readBytes(stream, chunkSize);
        let bytes = 0;
        let done;
        let _onFinish = (e) => {
          if (!done) {
            done = true;
            onFinish && onFinish(e);
          }
        };
        return new ReadableStream({
          async pull(controller) {
            try {
              const { done: done2, value } = await iterator2.next();
              if (done2) {
                _onFinish();
                controller.close();
                return;
              }
              let len = value.byteLength;
              if (onProgress) {
                let loadedBytes = bytes += len;
                onProgress(loadedBytes);
              }
              controller.enqueue(new Uint8Array(value));
            } catch (err) {
              _onFinish(err);
              throw err;
            }
          },
          cancel(reason) {
            _onFinish(reason);
            return iterator2.return();
          }
        }, {
          highWaterMark: 2
        });
      };
      var DEFAULT_CHUNK_SIZE = 64 * 1024;
      var { isFunction } = utils$1;
      var globalFetchAPI = (({ Request, Response }) => ({
        Request,
        Response
      }))(utils$1.global);
      var {
        ReadableStream: ReadableStream$1,
        TextEncoder: TextEncoder2
      } = utils$1.global;
      var test = (fn, ...args) => {
        try {
          return !!fn(...args);
        } catch (e) {
          return false;
        }
      };
      var factory = (env) => {
        env = utils$1.merge.call({
          skipUndefined: true
        }, globalFetchAPI, env);
        const { fetch: envFetch, Request, Response } = env;
        const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
        const isRequestSupported = isFunction(Request);
        const isResponseSupported = isFunction(Response);
        if (!isFetchSupported) {
          return false;
        }
        const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream$1);
        const encodeText = isFetchSupported && (typeof TextEncoder2 === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder2()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
        const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
          let duplexAccessed = false;
          const hasContentType = new Request(platform.origin, {
            body: new ReadableStream$1(),
            method: "POST",
            get duplex() {
              duplexAccessed = true;
              return "half";
            }
          }).headers.has("Content-Type");
          return duplexAccessed && !hasContentType;
        });
        const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
        const resolvers = {
          stream: supportsResponseStream && ((res) => res.body)
        };
        isFetchSupported && (() => {
          ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
            !resolvers[type] && (resolvers[type] = (res, config) => {
              let method = res && res[type];
              if (method) {
                return method.call(res);
              }
              throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
            });
          });
        })();
        const getBodyLength = async (body) => {
          if (body == null) {
            return 0;
          }
          if (utils$1.isBlob(body)) {
            return body.size;
          }
          if (utils$1.isSpecCompliantForm(body)) {
            const _request = new Request(platform.origin, {
              method: "POST",
              body
            });
            return (await _request.arrayBuffer()).byteLength;
          }
          if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
            return body.byteLength;
          }
          if (utils$1.isURLSearchParams(body)) {
            body = body + "";
          }
          if (utils$1.isString(body)) {
            return (await encodeText(body)).byteLength;
          }
        };
        const resolveBodyLength = async (headers, body) => {
          const length = utils$1.toFiniteNumber(headers.getContentLength());
          return length == null ? getBodyLength(body) : length;
        };
        return async (config) => {
          let {
            url,
            method,
            data,
            signal,
            cancelToken,
            timeout,
            onDownloadProgress,
            onUploadProgress,
            responseType,
            headers,
            withCredentials = "same-origin",
            fetchOptions
          } = resolveConfig(config);
          let _fetch = envFetch || fetch;
          responseType = responseType ? (responseType + "").toLowerCase() : "text";
          let composedSignal = composeSignals$1([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
          let request = null;
          const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
            composedSignal.unsubscribe();
          });
          let requestContentLength;
          try {
            if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
              let _request = new Request(url, {
                method: "POST",
                body: data,
                duplex: "half"
              });
              let contentTypeHeader;
              if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
                headers.setContentType(contentTypeHeader);
              }
              if (_request.body) {
                const [onProgress, flush] = progressEventDecorator(
                  requestContentLength,
                  progressEventReducer(asyncDecorator(onUploadProgress))
                );
                data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
              }
            }
            if (!utils$1.isString(withCredentials)) {
              withCredentials = withCredentials ? "include" : "omit";
            }
            const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
            const resolvedOptions = {
              ...fetchOptions,
              signal: composedSignal,
              method: method.toUpperCase(),
              headers: headers.normalize().toJSON(),
              body: data,
              duplex: "half",
              credentials: isCredentialsSupported ? withCredentials : void 0
            };
            request = isRequestSupported && new Request(url, resolvedOptions);
            let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
            const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
            if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
              const options = {};
              ["status", "statusText", "headers"].forEach((prop) => {
                options[prop] = response[prop];
              });
              const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
              const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
                responseContentLength,
                progressEventReducer(asyncDecorator(onDownloadProgress), true)
              ) || [];
              response = new Response(
                trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
                  flush && flush();
                  unsubscribe && unsubscribe();
                }),
                options
              );
            }
            responseType = responseType || "text";
            let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
            !isStreamResponse && unsubscribe && unsubscribe();
            return await new Promise((resolve, reject) => {
              settle(resolve, reject, {
                data: responseData,
                headers: AxiosHeaders$1.from(response.headers),
                status: response.status,
                statusText: response.statusText,
                config,
                request
              });
            });
          } catch (err) {
            unsubscribe && unsubscribe();
            if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
              throw Object.assign(
                new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request, err && err.response),
                {
                  cause: err.cause || err
                }
              );
            }
            throw AxiosError$1.from(err, err && err.code, config, request, err && err.response);
          }
        };
      };
      var seedCache = /* @__PURE__ */ new Map();
      var getFetch = (config) => {
        let env = config && config.env || {};
        const { fetch: fetch2, Request, Response } = env;
        const seeds = [
          Request,
          Response,
          fetch2
        ];
        let len = seeds.length, i = len, seed, target, map = seedCache;
        while (i--) {
          seed = seeds[i];
          target = map.get(seed);
          target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
          map = target;
        }
        return target;
      };
      getFetch();
      var knownAdapters = {
        http: httpAdapter,
        xhr: xhrAdapter,
        fetch: {
          get: getFetch
        }
      };
      utils$1.forEach(knownAdapters, (fn, value) => {
        if (fn) {
          try {
            Object.defineProperty(fn, "name", { value });
          } catch (e) {
          }
          Object.defineProperty(fn, "adapterName", { value });
        }
      });
      var renderReason = (reason) => `- ${reason}`;
      var isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
      function getAdapter(adapters2, config) {
        adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
        const { length } = adapters2;
        let nameOrAdapter;
        let adapter;
        const rejectedReasons = {};
        for (let i = 0; i < length; i++) {
          nameOrAdapter = adapters2[i];
          let id;
          adapter = nameOrAdapter;
          if (!isResolvedHandle(nameOrAdapter)) {
            adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
            if (adapter === void 0) {
              throw new AxiosError$1(`Unknown adapter '${id}'`);
            }
          }
          if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
            break;
          }
          rejectedReasons[id || "#" + i] = adapter;
        }
        if (!adapter) {
          const reasons = Object.entries(rejectedReasons).map(
            ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
          );
          let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
          throw new AxiosError$1(
            `There is no suitable adapter to dispatch the request ` + s,
            "ERR_NOT_SUPPORT"
          );
        }
        return adapter;
      }
      var adapters = {
        /**
         * Resolve an adapter from a list of adapter names or functions.
         * @type {Function}
         */
        getAdapter,
        /**
         * Exposes all known adapters
         * @type {Object<string, Function|Object>}
         */
        adapters: knownAdapters
      };
      function throwIfCancellationRequested(config) {
        if (config.cancelToken) {
          config.cancelToken.throwIfRequested();
        }
        if (config.signal && config.signal.aborted) {
          throw new CanceledError$1(null, config);
        }
      }
      function dispatchRequest(config) {
        throwIfCancellationRequested(config);
        config.headers = AxiosHeaders$1.from(config.headers);
        config.data = transformData.call(
          config,
          config.transformRequest
        );
        if (["post", "put", "patch"].indexOf(config.method) !== -1) {
          config.headers.setContentType("application/x-www-form-urlencoded", false);
        }
        const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter, config);
        return adapter(config).then(function onAdapterResolution(response) {
          throwIfCancellationRequested(config);
          response.data = transformData.call(
            config,
            config.transformResponse,
            response
          );
          response.headers = AxiosHeaders$1.from(response.headers);
          return response;
        }, function onAdapterRejection(reason) {
          if (!isCancel(reason)) {
            throwIfCancellationRequested(config);
            if (reason && reason.response) {
              reason.response.data = transformData.call(
                config,
                config.transformResponse,
                reason.response
              );
              reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
            }
          }
          return Promise.reject(reason);
        });
      }
      var VERSION = "1.13.5";
      var validators$1 = {};
      ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
        validators$1[type] = function validator2(thing) {
          return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
        };
      });
      var deprecatedWarnings = {};
      validators$1.transitional = function transitional(validator2, version, message) {
        function formatMessage(opt, desc) {
          return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
        }
        return (value, opt, opts) => {
          if (validator2 === false) {
            throw new AxiosError$1(
              formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
              AxiosError$1.ERR_DEPRECATED
            );
          }
          if (version && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            console.warn(
              formatMessage(
                opt,
                " has been deprecated since v" + version + " and will be removed in the near future"
              )
            );
          }
          return validator2 ? validator2(value, opt, opts) : true;
        };
      };
      validators$1.spelling = function spelling(correctSpelling) {
        return (value, opt) => {
          console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
          return true;
        };
      };
      function assertOptions(options, schema, allowUnknown) {
        if (typeof options !== "object") {
          throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
        }
        const keys = Object.keys(options);
        let i = keys.length;
        while (i-- > 0) {
          const opt = keys[i];
          const validator2 = schema[opt];
          if (validator2) {
            const value = options[opt];
            const result = value === void 0 || validator2(value, opt, options);
            if (result !== true) {
              throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
            }
            continue;
          }
          if (allowUnknown !== true) {
            throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
          }
        }
      }
      var validator = {
        assertOptions,
        validators: validators$1
      };
      var validators = validator.validators;
      var Axios = class {
        constructor(instanceConfig) {
          this.defaults = instanceConfig || {};
          this.interceptors = {
            request: new InterceptorManager$1(),
            response: new InterceptorManager$1()
          };
        }
        /**
         * Dispatch a request
         *
         * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
         * @param {?Object} config
         *
         * @returns {Promise} The Promise to be fulfilled
         */
        async request(configOrUrl, config) {
          try {
            return await this._request(configOrUrl, config);
          } catch (err) {
            if (err instanceof Error) {
              let dummy = {};
              Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
              const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
              try {
                if (!err.stack) {
                  err.stack = stack;
                } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
                  err.stack += "\n" + stack;
                }
              } catch (e) {
              }
            }
            throw err;
          }
        }
        _request(configOrUrl, config) {
          if (typeof configOrUrl === "string") {
            config = config || {};
            config.url = configOrUrl;
          } else {
            config = configOrUrl || {};
          }
          config = mergeConfig(this.defaults, config);
          const { transitional, paramsSerializer, headers } = config;
          if (transitional !== void 0) {
            validator.assertOptions(transitional, {
              silentJSONParsing: validators.transitional(validators.boolean),
              forcedJSONParsing: validators.transitional(validators.boolean),
              clarifyTimeoutError: validators.transitional(validators.boolean),
              legacyInterceptorReqResOrdering: validators.transitional(validators.boolean)
            }, false);
          }
          if (paramsSerializer != null) {
            if (utils$1.isFunction(paramsSerializer)) {
              config.paramsSerializer = {
                serialize: paramsSerializer
              };
            } else {
              validator.assertOptions(paramsSerializer, {
                encode: validators.function,
                serialize: validators.function
              }, true);
            }
          }
          if (config.allowAbsoluteUrls !== void 0) ;
          else if (this.defaults.allowAbsoluteUrls !== void 0) {
            config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
          } else {
            config.allowAbsoluteUrls = true;
          }
          validator.assertOptions(config, {
            baseUrl: validators.spelling("baseURL"),
            withXsrfToken: validators.spelling("withXSRFToken")
          }, true);
          config.method = (config.method || this.defaults.method || "get").toLowerCase();
          let contextHeaders = headers && utils$1.merge(
            headers.common,
            headers[config.method]
          );
          headers && utils$1.forEach(
            ["delete", "get", "head", "post", "put", "patch", "common"],
            (method) => {
              delete headers[method];
            }
          );
          config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
          const requestInterceptorChain = [];
          let synchronousRequestInterceptors = true;
          this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
            if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
              return;
            }
            synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
            const transitional2 = config.transitional || transitionalDefaults;
            const legacyInterceptorReqResOrdering = transitional2 && transitional2.legacyInterceptorReqResOrdering;
            if (legacyInterceptorReqResOrdering) {
              requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
            } else {
              requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
            }
          });
          const responseInterceptorChain = [];
          this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
            responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
          });
          let promise;
          let i = 0;
          let len;
          if (!synchronousRequestInterceptors) {
            const chain = [dispatchRequest.bind(this), void 0];
            chain.unshift(...requestInterceptorChain);
            chain.push(...responseInterceptorChain);
            len = chain.length;
            promise = Promise.resolve(config);
            while (i < len) {
              promise = promise.then(chain[i++], chain[i++]);
            }
            return promise;
          }
          len = requestInterceptorChain.length;
          let newConfig = config;
          while (i < len) {
            const onFulfilled = requestInterceptorChain[i++];
            const onRejected = requestInterceptorChain[i++];
            try {
              newConfig = onFulfilled(newConfig);
            } catch (error) {
              onRejected.call(this, error);
              break;
            }
          }
          try {
            promise = dispatchRequest.call(this, newConfig);
          } catch (error) {
            return Promise.reject(error);
          }
          i = 0;
          len = responseInterceptorChain.length;
          while (i < len) {
            promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
          }
          return promise;
        }
        getUri(config) {
          config = mergeConfig(this.defaults, config);
          const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
          return buildURL(fullPath, config.params, config.paramsSerializer);
        }
      };
      utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
        Axios.prototype[method] = function(url, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            url,
            data: (config || {}).data
          }));
        };
      });
      utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
        function generateHTTPMethod(isForm) {
          return function httpMethod(url, data, config) {
            return this.request(mergeConfig(config || {}, {
              method,
              headers: isForm ? {
                "Content-Type": "multipart/form-data"
              } : {},
              url,
              data
            }));
          };
        }
        Axios.prototype[method] = generateHTTPMethod();
        Axios.prototype[method + "Form"] = generateHTTPMethod(true);
      });
      var Axios$1 = Axios;
      var CancelToken = class _CancelToken {
        constructor(executor) {
          if (typeof executor !== "function") {
            throw new TypeError("executor must be a function.");
          }
          let resolvePromise;
          this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
          });
          const token = this;
          this.promise.then((cancel) => {
            if (!token._listeners) return;
            let i = token._listeners.length;
            while (i-- > 0) {
              token._listeners[i](cancel);
            }
            token._listeners = null;
          });
          this.promise.then = (onfulfilled) => {
            let _resolve;
            const promise = new Promise((resolve) => {
              token.subscribe(resolve);
              _resolve = resolve;
            }).then(onfulfilled);
            promise.cancel = function reject() {
              token.unsubscribe(_resolve);
            };
            return promise;
          };
          executor(function cancel(message, config, request) {
            if (token.reason) {
              return;
            }
            token.reason = new CanceledError$1(message, config, request);
            resolvePromise(token.reason);
          });
        }
        /**
         * Throws a `CanceledError` if cancellation has been requested.
         */
        throwIfRequested() {
          if (this.reason) {
            throw this.reason;
          }
        }
        /**
         * Subscribe to the cancel signal
         */
        subscribe(listener) {
          if (this.reason) {
            listener(this.reason);
            return;
          }
          if (this._listeners) {
            this._listeners.push(listener);
          } else {
            this._listeners = [listener];
          }
        }
        /**
         * Unsubscribe from the cancel signal
         */
        unsubscribe(listener) {
          if (!this._listeners) {
            return;
          }
          const index = this._listeners.indexOf(listener);
          if (index !== -1) {
            this._listeners.splice(index, 1);
          }
        }
        toAbortSignal() {
          const controller = new AbortController();
          const abort = (err) => {
            controller.abort(err);
          };
          this.subscribe(abort);
          controller.signal.unsubscribe = () => this.unsubscribe(abort);
          return controller.signal;
        }
        /**
         * Returns an object that contains a new `CancelToken` and a function that, when called,
         * cancels the `CancelToken`.
         */
        static source() {
          let cancel;
          const token = new _CancelToken(function executor(c) {
            cancel = c;
          });
          return {
            token,
            cancel
          };
        }
      };
      var CancelToken$1 = CancelToken;
      function spread(callback) {
        return function wrap(arr) {
          return callback.apply(null, arr);
        };
      }
      function isAxiosError(payload) {
        return utils$1.isObject(payload) && payload.isAxiosError === true;
      }
      var HttpStatusCode = {
        Continue: 100,
        SwitchingProtocols: 101,
        Processing: 102,
        EarlyHints: 103,
        Ok: 200,
        Created: 201,
        Accepted: 202,
        NonAuthoritativeInformation: 203,
        NoContent: 204,
        ResetContent: 205,
        PartialContent: 206,
        MultiStatus: 207,
        AlreadyReported: 208,
        ImUsed: 226,
        MultipleChoices: 300,
        MovedPermanently: 301,
        Found: 302,
        SeeOther: 303,
        NotModified: 304,
        UseProxy: 305,
        Unused: 306,
        TemporaryRedirect: 307,
        PermanentRedirect: 308,
        BadRequest: 400,
        Unauthorized: 401,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406,
        ProxyAuthenticationRequired: 407,
        RequestTimeout: 408,
        Conflict: 409,
        Gone: 410,
        LengthRequired: 411,
        PreconditionFailed: 412,
        PayloadTooLarge: 413,
        UriTooLong: 414,
        UnsupportedMediaType: 415,
        RangeNotSatisfiable: 416,
        ExpectationFailed: 417,
        ImATeapot: 418,
        MisdirectedRequest: 421,
        UnprocessableEntity: 422,
        Locked: 423,
        FailedDependency: 424,
        TooEarly: 425,
        UpgradeRequired: 426,
        PreconditionRequired: 428,
        TooManyRequests: 429,
        RequestHeaderFieldsTooLarge: 431,
        UnavailableForLegalReasons: 451,
        InternalServerError: 500,
        NotImplemented: 501,
        BadGateway: 502,
        ServiceUnavailable: 503,
        GatewayTimeout: 504,
        HttpVersionNotSupported: 505,
        VariantAlsoNegotiates: 506,
        InsufficientStorage: 507,
        LoopDetected: 508,
        NotExtended: 510,
        NetworkAuthenticationRequired: 511,
        WebServerIsDown: 521,
        ConnectionTimedOut: 522,
        OriginIsUnreachable: 523,
        TimeoutOccurred: 524,
        SslHandshakeFailed: 525,
        InvalidSslCertificate: 526
      };
      Object.entries(HttpStatusCode).forEach(([key, value]) => {
        HttpStatusCode[value] = key;
      });
      var HttpStatusCode$1 = HttpStatusCode;
      function createInstance(defaultConfig) {
        const context = new Axios$1(defaultConfig);
        const instance = bind(Axios$1.prototype.request, context);
        utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
        utils$1.extend(instance, context, null, { allOwnKeys: true });
        instance.create = function create(instanceConfig) {
          return createInstance(mergeConfig(defaultConfig, instanceConfig));
        };
        return instance;
      }
      var axios2 = createInstance(defaults$1);
      axios2.Axios = Axios$1;
      axios2.CanceledError = CanceledError$1;
      axios2.CancelToken = CancelToken$1;
      axios2.isCancel = isCancel;
      axios2.VERSION = VERSION;
      axios2.toFormData = toFormData;
      axios2.AxiosError = AxiosError$1;
      axios2.Cancel = axios2.CanceledError;
      axios2.all = function all(promises) {
        return Promise.all(promises);
      };
      axios2.spread = spread;
      axios2.isAxiosError = isAxiosError;
      axios2.mergeConfig = mergeConfig;
      axios2.AxiosHeaders = AxiosHeaders$1;
      axios2.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
      axios2.getAdapter = adapters.getAdapter;
      axios2.HttpStatusCode = HttpStatusCode$1;
      axios2.default = axios2;
      module.exports = axios2;
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/networks.cjs
  var require_networks = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/networks.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.testnet = exports.regtest = exports.bitcoin = void 0;
      exports.bitcoin = {
        /**
         * The message prefix used for signing Bitcoin messages.
         */
        messagePrefix: "Bitcoin Signed Message:\n",
        /**
         * The Bech32 prefix used for Bitcoin addresses.
         */
        bech32: "bc",
        /**
         * The BIP32 key prefixes for Bitcoin.
         */
        bip32: {
          /**
           * The public key prefix for BIP32 extended public keys.
           */
          public: 76067358,
          /**
           * The private key prefix for BIP32 extended private keys.
           */
          private: 76066276
        },
        /**
         * The prefix for Bitcoin public key hashes.
         */
        pubKeyHash: 0,
        /**
         * The prefix for Bitcoin script hashes.
         */
        scriptHash: 5,
        /**
         * The prefix for Bitcoin Wallet Import Format (WIF) private keys.
         */
        wif: 128
      };
      exports.regtest = {
        messagePrefix: "Bitcoin Signed Message:\n",
        bech32: "bcrt",
        bip32: {
          public: 70617039,
          private: 70615956
        },
        pubKeyHash: 111,
        scriptHash: 196,
        wif: 239
      };
      exports.testnet = {
        messagePrefix: "Bitcoin Signed Message:\n",
        bech32: "tb",
        bip32: {
          public: 70617039,
          private: 70615956
        },
        pubKeyHash: 111,
        scriptHash: 196,
        wif: 239
      };
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/bip66.cjs
  var require_bip66 = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/bip66.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.check = check;
      exports.decode = decode;
      exports.encode = encode;
      function check(buffer) {
        if (buffer.length < 8) return false;
        if (buffer.length > 72) return false;
        if (buffer[0] !== 48) return false;
        if (buffer[1] !== buffer.length - 2) return false;
        if (buffer[2] !== 2) return false;
        const lenR = buffer[3];
        if (lenR === 0) return false;
        if (5 + lenR >= buffer.length) return false;
        if (buffer[4 + lenR] !== 2) return false;
        const lenS = buffer[5 + lenR];
        if (lenS === 0) return false;
        if (6 + lenR + lenS !== buffer.length) return false;
        if (buffer[4] & 128) return false;
        if (lenR > 1 && buffer[4] === 0 && !(buffer[5] & 128)) return false;
        if (buffer[lenR + 6] & 128) return false;
        if (lenS > 1 && buffer[lenR + 6] === 0 && !(buffer[lenR + 7] & 128))
          return false;
        return true;
      }
      function decode(buffer) {
        if (buffer.length < 8) throw new Error("DER sequence length is too short");
        if (buffer.length > 72) throw new Error("DER sequence length is too long");
        if (buffer[0] !== 48) throw new Error("Expected DER sequence");
        if (buffer[1] !== buffer.length - 2)
          throw new Error("DER sequence length is invalid");
        if (buffer[2] !== 2) throw new Error("Expected DER integer");
        const lenR = buffer[3];
        if (lenR === 0) throw new Error("R length is zero");
        if (5 + lenR >= buffer.length) throw new Error("R length is too long");
        if (buffer[4 + lenR] !== 2) throw new Error("Expected DER integer (2)");
        const lenS = buffer[5 + lenR];
        if (lenS === 0) throw new Error("S length is zero");
        if (6 + lenR + lenS !== buffer.length) throw new Error("S length is invalid");
        if (buffer[4] & 128) throw new Error("R value is negative");
        if (lenR > 1 && buffer[4] === 0 && !(buffer[5] & 128))
          throw new Error("R value excessively padded");
        if (buffer[lenR + 6] & 128) throw new Error("S value is negative");
        if (lenS > 1 && buffer[lenR + 6] === 0 && !(buffer[lenR + 7] & 128))
          throw new Error("S value excessively padded");
        return {
          r: buffer.slice(4, 4 + lenR),
          s: buffer.slice(6 + lenR)
        };
      }
      function encode(r, s) {
        const lenR = r.length;
        const lenS = s.length;
        if (lenR === 0) throw new Error("R length is zero");
        if (lenS === 0) throw new Error("S length is zero");
        if (lenR > 33) throw new Error("R length is too long");
        if (lenS > 33) throw new Error("S length is too long");
        if (r[0] & 128) throw new Error("R value is negative");
        if (s[0] & 128) throw new Error("S value is negative");
        if (lenR > 1 && r[0] === 0 && !(r[1] & 128))
          throw new Error("R value excessively padded");
        if (lenS > 1 && s[0] === 0 && !(s[1] & 128))
          throw new Error("S value excessively padded");
        const signature = new Uint8Array(6 + lenR + lenS);
        signature[0] = 48;
        signature[1] = signature.length - 2;
        signature[2] = 2;
        signature[3] = r.length;
        signature.set(r, 4);
        signature[4 + lenR] = 2;
        signature[5 + lenR] = s.length;
        signature.set(s, 6 + lenR);
        return signature;
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/ops.cjs
  var require_ops = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/ops.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OPS = void 0;
      var OPS;
      (function(OPS2) {
        OPS2[OPS2["OP_FALSE"] = 0] = "OP_FALSE";
        OPS2[OPS2["OP_0"] = 0] = "OP_0";
        OPS2[OPS2["OP_PUSHDATA1"] = 76] = "OP_PUSHDATA1";
        OPS2[OPS2["OP_PUSHDATA2"] = 77] = "OP_PUSHDATA2";
        OPS2[OPS2["OP_PUSHDATA4"] = 78] = "OP_PUSHDATA4";
        OPS2[OPS2["OP_1NEGATE"] = 79] = "OP_1NEGATE";
        OPS2[OPS2["OP_RESERVED"] = 80] = "OP_RESERVED";
        OPS2[OPS2["OP_TRUE"] = 81] = "OP_TRUE";
        OPS2[OPS2["OP_1"] = 81] = "OP_1";
        OPS2[OPS2["OP_2"] = 82] = "OP_2";
        OPS2[OPS2["OP_3"] = 83] = "OP_3";
        OPS2[OPS2["OP_4"] = 84] = "OP_4";
        OPS2[OPS2["OP_5"] = 85] = "OP_5";
        OPS2[OPS2["OP_6"] = 86] = "OP_6";
        OPS2[OPS2["OP_7"] = 87] = "OP_7";
        OPS2[OPS2["OP_8"] = 88] = "OP_8";
        OPS2[OPS2["OP_9"] = 89] = "OP_9";
        OPS2[OPS2["OP_10"] = 90] = "OP_10";
        OPS2[OPS2["OP_11"] = 91] = "OP_11";
        OPS2[OPS2["OP_12"] = 92] = "OP_12";
        OPS2[OPS2["OP_13"] = 93] = "OP_13";
        OPS2[OPS2["OP_14"] = 94] = "OP_14";
        OPS2[OPS2["OP_15"] = 95] = "OP_15";
        OPS2[OPS2["OP_16"] = 96] = "OP_16";
        OPS2[OPS2["OP_NOP"] = 97] = "OP_NOP";
        OPS2[OPS2["OP_VER"] = 98] = "OP_VER";
        OPS2[OPS2["OP_IF"] = 99] = "OP_IF";
        OPS2[OPS2["OP_NOTIF"] = 100] = "OP_NOTIF";
        OPS2[OPS2["OP_VERIF"] = 101] = "OP_VERIF";
        OPS2[OPS2["OP_VERNOTIF"] = 102] = "OP_VERNOTIF";
        OPS2[OPS2["OP_ELSE"] = 103] = "OP_ELSE";
        OPS2[OPS2["OP_ENDIF"] = 104] = "OP_ENDIF";
        OPS2[OPS2["OP_VERIFY"] = 105] = "OP_VERIFY";
        OPS2[OPS2["OP_RETURN"] = 106] = "OP_RETURN";
        OPS2[OPS2["OP_TOALTSTACK"] = 107] = "OP_TOALTSTACK";
        OPS2[OPS2["OP_FROMALTSTACK"] = 108] = "OP_FROMALTSTACK";
        OPS2[OPS2["OP_2DROP"] = 109] = "OP_2DROP";
        OPS2[OPS2["OP_2DUP"] = 110] = "OP_2DUP";
        OPS2[OPS2["OP_3DUP"] = 111] = "OP_3DUP";
        OPS2[OPS2["OP_2OVER"] = 112] = "OP_2OVER";
        OPS2[OPS2["OP_2ROT"] = 113] = "OP_2ROT";
        OPS2[OPS2["OP_2SWAP"] = 114] = "OP_2SWAP";
        OPS2[OPS2["OP_IFDUP"] = 115] = "OP_IFDUP";
        OPS2[OPS2["OP_DEPTH"] = 116] = "OP_DEPTH";
        OPS2[OPS2["OP_DROP"] = 117] = "OP_DROP";
        OPS2[OPS2["OP_DUP"] = 118] = "OP_DUP";
        OPS2[OPS2["OP_NIP"] = 119] = "OP_NIP";
        OPS2[OPS2["OP_OVER"] = 120] = "OP_OVER";
        OPS2[OPS2["OP_PICK"] = 121] = "OP_PICK";
        OPS2[OPS2["OP_ROLL"] = 122] = "OP_ROLL";
        OPS2[OPS2["OP_ROT"] = 123] = "OP_ROT";
        OPS2[OPS2["OP_SWAP"] = 124] = "OP_SWAP";
        OPS2[OPS2["OP_TUCK"] = 125] = "OP_TUCK";
        OPS2[OPS2["OP_CAT"] = 126] = "OP_CAT";
        OPS2[OPS2["OP_SUBSTR"] = 127] = "OP_SUBSTR";
        OPS2[OPS2["OP_LEFT"] = 128] = "OP_LEFT";
        OPS2[OPS2["OP_RIGHT"] = 129] = "OP_RIGHT";
        OPS2[OPS2["OP_SIZE"] = 130] = "OP_SIZE";
        OPS2[OPS2["OP_INVERT"] = 131] = "OP_INVERT";
        OPS2[OPS2["OP_AND"] = 132] = "OP_AND";
        OPS2[OPS2["OP_OR"] = 133] = "OP_OR";
        OPS2[OPS2["OP_XOR"] = 134] = "OP_XOR";
        OPS2[OPS2["OP_EQUAL"] = 135] = "OP_EQUAL";
        OPS2[OPS2["OP_EQUALVERIFY"] = 136] = "OP_EQUALVERIFY";
        OPS2[OPS2["OP_RESERVED1"] = 137] = "OP_RESERVED1";
        OPS2[OPS2["OP_RESERVED2"] = 138] = "OP_RESERVED2";
        OPS2[OPS2["OP_1ADD"] = 139] = "OP_1ADD";
        OPS2[OPS2["OP_1SUB"] = 140] = "OP_1SUB";
        OPS2[OPS2["OP_2MUL"] = 141] = "OP_2MUL";
        OPS2[OPS2["OP_2DIV"] = 142] = "OP_2DIV";
        OPS2[OPS2["OP_NEGATE"] = 143] = "OP_NEGATE";
        OPS2[OPS2["OP_ABS"] = 144] = "OP_ABS";
        OPS2[OPS2["OP_NOT"] = 145] = "OP_NOT";
        OPS2[OPS2["OP_0NOTEQUAL"] = 146] = "OP_0NOTEQUAL";
        OPS2[OPS2["OP_ADD"] = 147] = "OP_ADD";
        OPS2[OPS2["OP_SUB"] = 148] = "OP_SUB";
        OPS2[OPS2["OP_MUL"] = 149] = "OP_MUL";
        OPS2[OPS2["OP_DIV"] = 150] = "OP_DIV";
        OPS2[OPS2["OP_MOD"] = 151] = "OP_MOD";
        OPS2[OPS2["OP_LSHIFT"] = 152] = "OP_LSHIFT";
        OPS2[OPS2["OP_RSHIFT"] = 153] = "OP_RSHIFT";
        OPS2[OPS2["OP_BOOLAND"] = 154] = "OP_BOOLAND";
        OPS2[OPS2["OP_BOOLOR"] = 155] = "OP_BOOLOR";
        OPS2[OPS2["OP_NUMEQUAL"] = 156] = "OP_NUMEQUAL";
        OPS2[OPS2["OP_NUMEQUALVERIFY"] = 157] = "OP_NUMEQUALVERIFY";
        OPS2[OPS2["OP_NUMNOTEQUAL"] = 158] = "OP_NUMNOTEQUAL";
        OPS2[OPS2["OP_LESSTHAN"] = 159] = "OP_LESSTHAN";
        OPS2[OPS2["OP_GREATERTHAN"] = 160] = "OP_GREATERTHAN";
        OPS2[OPS2["OP_LESSTHANOREQUAL"] = 161] = "OP_LESSTHANOREQUAL";
        OPS2[OPS2["OP_GREATERTHANOREQUAL"] = 162] = "OP_GREATERTHANOREQUAL";
        OPS2[OPS2["OP_MIN"] = 163] = "OP_MIN";
        OPS2[OPS2["OP_MAX"] = 164] = "OP_MAX";
        OPS2[OPS2["OP_WITHIN"] = 165] = "OP_WITHIN";
        OPS2[OPS2["OP_RIPEMD160"] = 166] = "OP_RIPEMD160";
        OPS2[OPS2["OP_SHA1"] = 167] = "OP_SHA1";
        OPS2[OPS2["OP_SHA256"] = 168] = "OP_SHA256";
        OPS2[OPS2["OP_HASH160"] = 169] = "OP_HASH160";
        OPS2[OPS2["OP_HASH256"] = 170] = "OP_HASH256";
        OPS2[OPS2["OP_CODESEPARATOR"] = 171] = "OP_CODESEPARATOR";
        OPS2[OPS2["OP_CHECKSIG"] = 172] = "OP_CHECKSIG";
        OPS2[OPS2["OP_CHECKSIGVERIFY"] = 173] = "OP_CHECKSIGVERIFY";
        OPS2[OPS2["OP_CHECKMULTISIG"] = 174] = "OP_CHECKMULTISIG";
        OPS2[OPS2["OP_CHECKMULTISIGVERIFY"] = 175] = "OP_CHECKMULTISIGVERIFY";
        OPS2[OPS2["OP_NOP1"] = 176] = "OP_NOP1";
        OPS2[OPS2["OP_CHECKLOCKTIMEVERIFY"] = 177] = "OP_CHECKLOCKTIMEVERIFY";
        OPS2[OPS2["OP_NOP2"] = 177] = "OP_NOP2";
        OPS2[OPS2["OP_CHECKSEQUENCEVERIFY"] = 178] = "OP_CHECKSEQUENCEVERIFY";
        OPS2[OPS2["OP_NOP3"] = 178] = "OP_NOP3";
        OPS2[OPS2["OP_NOP4"] = 179] = "OP_NOP4";
        OPS2[OPS2["OP_NOP5"] = 180] = "OP_NOP5";
        OPS2[OPS2["OP_NOP6"] = 181] = "OP_NOP6";
        OPS2[OPS2["OP_NOP7"] = 182] = "OP_NOP7";
        OPS2[OPS2["OP_NOP8"] = 183] = "OP_NOP8";
        OPS2[OPS2["OP_NOP9"] = 184] = "OP_NOP9";
        OPS2[OPS2["OP_NOP10"] = 185] = "OP_NOP10";
        OPS2[OPS2["OP_CHECKSIGADD"] = 186] = "OP_CHECKSIGADD";
        OPS2[OPS2["OP_PUBKEYHASH"] = 253] = "OP_PUBKEYHASH";
        OPS2[OPS2["OP_PUBKEY"] = 254] = "OP_PUBKEY";
        OPS2[OPS2["OP_INVALIDOPCODE"] = 255] = "OP_INVALIDOPCODE";
      })(OPS || (exports.OPS = OPS = {}));
    }
  });

  // node_modules/bitcoinjs-lib/node_modules/uint8array-tools/src/mjs/browser.js
  var browser_exports = {};
  __export(browser_exports, {
    compare: () => compare,
    concat: () => concat,
    fromBase64: () => fromBase64,
    fromHex: () => fromHex,
    fromUtf8: () => fromUtf8,
    readInt16: () => readInt16,
    readInt32: () => readInt32,
    readInt64: () => readInt64,
    readInt8: () => readInt8,
    readUInt16: () => readUInt16,
    readUInt32: () => readUInt32,
    readUInt64: () => readUInt64,
    readUInt8: () => readUInt8,
    toBase64: () => toBase64,
    toHex: () => toHex,
    toUtf8: () => toUtf8,
    writeInt16: () => writeInt16,
    writeInt32: () => writeInt32,
    writeInt64: () => writeInt64,
    writeInt8: () => writeInt8,
    writeUInt16: () => writeUInt16,
    writeUInt32: () => writeUInt32,
    writeUInt64: () => writeUInt64,
    writeUInt8: () => writeUInt8
  });
  function toUtf8(bytes) {
    return DECODER.decode(bytes);
  }
  function fromUtf8(s) {
    return ENCODER.encode(s);
  }
  function concat(arrays) {
    const totalLength = arrays.reduce((a, b) => a + b.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const array of arrays) {
      result.set(array, offset);
      offset += array.length;
    }
    return result;
  }
  function toHex(bytes) {
    const b = bytes || new Uint8Array();
    return b.length > 512 ? _toHexLengthPerf(b) : _toHexIterPerf(b);
  }
  function _toHexIterPerf(bytes) {
    let s = "";
    for (let i = 0; i < bytes.length; ++i) {
      s += HEX_STRINGS[HEX_CODEPOINTS[HEX_CODES[bytes[i] >> 4]]];
      s += HEX_STRINGS[HEX_CODEPOINTS[HEX_CODES[bytes[i] & 15]]];
    }
    return s;
  }
  function _toHexLengthPerf(bytes) {
    const hexBytes = new Uint8Array(bytes.length * 2);
    for (let i = 0; i < bytes.length; ++i) {
      hexBytes[i * 2] = HEX_CODES[bytes[i] >> 4];
      hexBytes[i * 2 + 1] = HEX_CODES[bytes[i] & 15];
    }
    return DECODER.decode(hexBytes);
  }
  function fromHex(hexString) {
    const hexBytes = ENCODER.encode(hexString || "");
    const resultBytes = new Uint8Array(Math.floor(hexBytes.length / 2));
    let i;
    for (i = 0; i < resultBytes.length; i++) {
      const a = HEX_CODEPOINTS[hexBytes[i * 2]];
      const b = HEX_CODEPOINTS[hexBytes[i * 2 + 1]];
      if (a === void 0 || b === void 0) {
        break;
      }
      resultBytes[i] = a << 4 | b;
    }
    return i === resultBytes.length ? resultBytes : resultBytes.slice(0, i);
  }
  function toBase64(bytes) {
    return btoa(String.fromCharCode(...bytes));
  }
  function fromBase64(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
  function compare(v1, v2) {
    const minLength = Math.min(v1.length, v2.length);
    for (let i = 0; i < minLength; ++i) {
      if (v1[i] !== v2[i]) {
        return v1[i] < v2[i] ? -1 : 1;
      }
    }
    return v1.length === v2.length ? 0 : v1.length > v2.length ? 1 : -1;
  }
  function writeUInt8(buffer, offset, value) {
    if (offset + 1 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    if (value > 255) {
      throw new Error(`The value of "value" is out of range. It must be >= 0 and <= ${255}. Received ${value}`);
    }
    buffer[offset] = value;
    return offset + 1;
  }
  function writeUInt16(buffer, offset, value, littleEndian) {
    if (offset + 2 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (value > 65535) {
      throw new Error(`The value of "value" is out of range. It must be >= 0 and <= ${65535}. Received ${value}`);
    }
    if (littleEndian === "LE") {
      buffer[offset] = value & 255;
      buffer[offset + 1] = value >> 8 & 255;
    } else {
      buffer[offset] = value >> 8 & 255;
      buffer[offset + 1] = value & 255;
    }
    return offset + 2;
  }
  function writeUInt32(buffer, offset, value, littleEndian) {
    if (offset + 4 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (value > 4294967295) {
      throw new Error(`The value of "value" is out of range. It must be >= 0 and <= ${4294967295}. Received ${value}`);
    }
    if (littleEndian === "LE") {
      buffer[offset] = value & 255;
      buffer[offset + 1] = value >> 8 & 255;
      buffer[offset + 2] = value >> 16 & 255;
      buffer[offset + 3] = value >> 24 & 255;
    } else {
      buffer[offset] = value >> 24 & 255;
      buffer[offset + 1] = value >> 16 & 255;
      buffer[offset + 2] = value >> 8 & 255;
      buffer[offset + 3] = value & 255;
    }
    return offset + 4;
  }
  function writeUInt64(buffer, offset, value, littleEndian) {
    if (offset + 8 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (value > 0xffffffffffffffffn) {
      throw new Error(`The value of "value" is out of range. It must be >= 0 and <= ${0xffffffffffffffffn}. Received ${value}`);
    }
    if (littleEndian === "LE") {
      buffer[offset] = Number(value & 0xffn);
      buffer[offset + 1] = Number(value >> 8n & 0xffn);
      buffer[offset + 2] = Number(value >> 16n & 0xffn);
      buffer[offset + 3] = Number(value >> 24n & 0xffn);
      buffer[offset + 4] = Number(value >> 32n & 0xffn);
      buffer[offset + 5] = Number(value >> 40n & 0xffn);
      buffer[offset + 6] = Number(value >> 48n & 0xffn);
      buffer[offset + 7] = Number(value >> 56n & 0xffn);
    } else {
      buffer[offset] = Number(value >> 56n & 0xffn);
      buffer[offset + 1] = Number(value >> 48n & 0xffn);
      buffer[offset + 2] = Number(value >> 40n & 0xffn);
      buffer[offset + 3] = Number(value >> 32n & 0xffn);
      buffer[offset + 4] = Number(value >> 24n & 0xffn);
      buffer[offset + 5] = Number(value >> 16n & 0xffn);
      buffer[offset + 6] = Number(value >> 8n & 0xffn);
      buffer[offset + 7] = Number(value & 0xffn);
    }
    return offset + 8;
  }
  function readUInt8(buffer, offset) {
    if (offset + 1 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    return buffer[offset];
  }
  function readUInt16(buffer, offset, littleEndian) {
    if (offset + 2 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      let num = 0;
      num = (num << 8) + buffer[offset + 1];
      num = (num << 8) + buffer[offset];
      return num;
    } else {
      let num = 0;
      num = (num << 8) + buffer[offset];
      num = (num << 8) + buffer[offset + 1];
      return num;
    }
  }
  function readUInt32(buffer, offset, littleEndian) {
    if (offset + 4 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      let num = 0;
      num = (num << 8) + buffer[offset + 3] >>> 0;
      num = (num << 8) + buffer[offset + 2] >>> 0;
      num = (num << 8) + buffer[offset + 1] >>> 0;
      num = (num << 8) + buffer[offset] >>> 0;
      return num;
    } else {
      let num = 0;
      num = (num << 8) + buffer[offset] >>> 0;
      num = (num << 8) + buffer[offset + 1] >>> 0;
      num = (num << 8) + buffer[offset + 2] >>> 0;
      num = (num << 8) + buffer[offset + 3] >>> 0;
      return num;
    }
  }
  function readUInt64(buffer, offset, littleEndian) {
    if (offset + 8 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      let num = 0n;
      num = (num << 8n) + BigInt(buffer[offset + 7]);
      num = (num << 8n) + BigInt(buffer[offset + 6]);
      num = (num << 8n) + BigInt(buffer[offset + 5]);
      num = (num << 8n) + BigInt(buffer[offset + 4]);
      num = (num << 8n) + BigInt(buffer[offset + 3]);
      num = (num << 8n) + BigInt(buffer[offset + 2]);
      num = (num << 8n) + BigInt(buffer[offset + 1]);
      num = (num << 8n) + BigInt(buffer[offset]);
      return num;
    } else {
      let num = 0n;
      num = (num << 8n) + BigInt(buffer[offset]);
      num = (num << 8n) + BigInt(buffer[offset + 1]);
      num = (num << 8n) + BigInt(buffer[offset + 2]);
      num = (num << 8n) + BigInt(buffer[offset + 3]);
      num = (num << 8n) + BigInt(buffer[offset + 4]);
      num = (num << 8n) + BigInt(buffer[offset + 5]);
      num = (num << 8n) + BigInt(buffer[offset + 6]);
      num = (num << 8n) + BigInt(buffer[offset + 7]);
      return num;
    }
  }
  function writeInt8(buffer, offset, value) {
    if (offset + 1 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    if (value > 127 || value < -128) {
      throw new Error(`The value of "value" is out of range. It must be >= ${-128} and <= ${127}. Received ${value}`);
    }
    buffer[offset] = value;
    return offset + 1;
  }
  function writeInt16(buffer, offset, value, littleEndian) {
    if (offset + 2 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    if (value > 32767 || value < -32768) {
      throw new Error(`The value of "value" is out of range. It must be >= ${-32768} and <= ${32767}. Received ${value}`);
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      buffer[offset] = value & 255;
      buffer[offset + 1] = value >> 8 & 255;
    } else {
      buffer[offset] = value >> 8 & 255;
      buffer[offset + 1] = value & 255;
    }
    return offset + 2;
  }
  function writeInt32(buffer, offset, value, littleEndian) {
    if (offset + 4 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    if (value > 2147483647 || value < -2147483648) {
      throw new Error(`The value of "value" is out of range. It must be >= ${-2147483648} and <= ${2147483647}. Received ${value}`);
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      buffer[offset] = value & 255;
      buffer[offset + 1] = value >> 8 & 255;
      buffer[offset + 2] = value >> 16 & 255;
      buffer[offset + 3] = value >> 24 & 255;
    } else {
      buffer[offset] = value >> 24 & 255;
      buffer[offset + 1] = value >> 16 & 255;
      buffer[offset + 2] = value >> 8 & 255;
      buffer[offset + 3] = value & 255;
    }
    return offset + 4;
  }
  function writeInt64(buffer, offset, value, littleEndian) {
    if (offset + 8 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    if (value > 0x7fffffffffffffffn || value < -0x8000000000000000n) {
      throw new Error(`The value of "value" is out of range. It must be >= ${-0x8000000000000000n} and <= ${0x7fffffffffffffffn}. Received ${value}`);
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      buffer[offset] = Number(value & 0xffn);
      buffer[offset + 1] = Number(value >> 8n & 0xffn);
      buffer[offset + 2] = Number(value >> 16n & 0xffn);
      buffer[offset + 3] = Number(value >> 24n & 0xffn);
      buffer[offset + 4] = Number(value >> 32n & 0xffn);
      buffer[offset + 5] = Number(value >> 40n & 0xffn);
      buffer[offset + 6] = Number(value >> 48n & 0xffn);
      buffer[offset + 7] = Number(value >> 56n & 0xffn);
    } else {
      buffer[offset] = Number(value >> 56n & 0xffn);
      buffer[offset + 1] = Number(value >> 48n & 0xffn);
      buffer[offset + 2] = Number(value >> 40n & 0xffn);
      buffer[offset + 3] = Number(value >> 32n & 0xffn);
      buffer[offset + 4] = Number(value >> 24n & 0xffn);
      buffer[offset + 5] = Number(value >> 16n & 0xffn);
      buffer[offset + 6] = Number(value >> 8n & 0xffn);
      buffer[offset + 7] = Number(value & 0xffn);
    }
    return offset + 8;
  }
  function readInt8(buffer, offset) {
    if (offset + 1 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    const val = buffer[offset];
    if (val <= 127) {
      return val;
    } else {
      return val - 256;
    }
  }
  function readInt16(buffer, offset, littleEndian) {
    if (offset + 2 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      const val = buffer[offset] + (buffer[offset + 1] << 8);
      return buffer[offset + 1] <= 127 ? val : val - 65536;
    } else {
      const val = (buffer[offset] << 8) + buffer[offset + 1];
      return buffer[offset] <= 127 ? val : val - 65536;
    }
  }
  function readInt32(buffer, offset, littleEndian) {
    if (offset + 4 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      const val = buffer[offset] + (buffer[offset + 1] << 8) + (buffer[offset + 2] << 16) + (buffer[offset + 3] << 24 >>> 0);
      return buffer[offset + 3] <= 127 ? val : val - 4294967296;
    } else {
      const val = (buffer[offset] << 24 >>> 0) + (buffer[offset + 1] << 16) + (buffer[offset + 2] << 8) + buffer[offset + 3];
      return buffer[offset] <= 127 ? val : val - 4294967296;
    }
  }
  function readInt64(buffer, offset, littleEndian) {
    if (offset + 8 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    let num = 0n;
    if (littleEndian === "LE") {
      num = (num << 8n) + BigInt(buffer[offset + 7]);
      num = (num << 8n) + BigInt(buffer[offset + 6]);
      num = (num << 8n) + BigInt(buffer[offset + 5]);
      num = (num << 8n) + BigInt(buffer[offset + 4]);
      num = (num << 8n) + BigInt(buffer[offset + 3]);
      num = (num << 8n) + BigInt(buffer[offset + 2]);
      num = (num << 8n) + BigInt(buffer[offset + 1]);
      num = (num << 8n) + BigInt(buffer[offset]);
      return buffer[offset + 7] <= 127 ? num : num - 0x10000000000000000n;
    } else {
      let num2 = 0n;
      num2 = (num2 << 8n) + BigInt(buffer[offset]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 1]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 2]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 3]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 4]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 5]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 6]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 7]);
      return buffer[offset] <= 127 ? num2 : num2 - 0x10000000000000000n;
    }
  }
  var HEX_STRINGS, HEX_CODES, HEX_CODEPOINTS, ENCODER, DECODER;
  var init_browser = __esm({
    "node_modules/bitcoinjs-lib/node_modules/uint8array-tools/src/mjs/browser.js"() {
      HEX_STRINGS = "0123456789abcdefABCDEF";
      HEX_CODES = HEX_STRINGS.split("").map((c) => c.codePointAt(0));
      HEX_CODEPOINTS = Array(256).fill(true).map((_, i) => {
        const s = String.fromCodePoint(i);
        const index = HEX_STRINGS.indexOf(s);
        return index < 0 ? void 0 : index < 16 ? index : index - 6;
      });
      ENCODER = new TextEncoder();
      DECODER = new TextDecoder();
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/push_data.cjs
  var require_push_data = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/push_data.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.encodingLength = encodingLength;
      exports.encode = encode;
      exports.decode = decode;
      var ops_js_1 = require_ops();
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      function encodingLength(i) {
        return i < ops_js_1.OPS.OP_PUSHDATA1 ? 1 : i <= 255 ? 2 : i <= 65535 ? 3 : 5;
      }
      function encode(buffer, num, offset) {
        const size = encodingLength(num);
        if (size === 1) {
          tools.writeUInt8(buffer, offset, num);
        } else if (size === 2) {
          tools.writeUInt8(buffer, offset, ops_js_1.OPS.OP_PUSHDATA1);
          tools.writeUInt8(buffer, offset + 1, num);
        } else if (size === 3) {
          tools.writeUInt8(buffer, offset, ops_js_1.OPS.OP_PUSHDATA2);
          tools.writeUInt16(buffer, offset + 1, num, "LE");
        } else {
          tools.writeUInt8(buffer, offset, ops_js_1.OPS.OP_PUSHDATA4);
          tools.writeUInt32(buffer, offset + 1, num, "LE");
        }
        return size;
      }
      function decode(buffer, offset) {
        const opcode = tools.readUInt8(buffer, offset);
        let num;
        let size;
        if (opcode < ops_js_1.OPS.OP_PUSHDATA1) {
          num = opcode;
          size = 1;
        } else if (opcode === ops_js_1.OPS.OP_PUSHDATA1) {
          if (offset + 2 > buffer.length) return null;
          num = tools.readUInt8(buffer, offset + 1);
          size = 2;
        } else if (opcode === ops_js_1.OPS.OP_PUSHDATA2) {
          if (offset + 3 > buffer.length) return null;
          num = tools.readUInt16(buffer, offset + 1, "LE");
          size = 3;
        } else {
          if (offset + 5 > buffer.length) return null;
          if (opcode !== ops_js_1.OPS.OP_PUSHDATA4)
            throw new Error("Unexpected opcode");
          num = tools.readUInt32(buffer, offset + 1, "LE");
          size = 5;
        }
        return {
          opcode,
          number: num,
          size
        };
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/script_number.cjs
  var require_script_number = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/script_number.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.decode = decode;
      exports.encode = encode;
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      function decode(buffer, maxLength, minimal) {
        maxLength = maxLength || 4;
        minimal = minimal === void 0 ? true : minimal;
        const length = buffer.length;
        if (length === 0) return 0;
        if (length > maxLength) throw new TypeError("Script number overflow");
        if (minimal) {
          if ((buffer[length - 1] & 127) === 0) {
            if (length <= 1 || (buffer[length - 2] & 128) === 0)
              throw new Error("Non-minimally encoded script number");
          }
        }
        if (length === 5) {
          const a = tools.readUInt32(buffer, 0, "LE");
          const b = tools.readUInt8(buffer, 4);
          if (b & 128) return -((b & ~128) * 4294967296 + a);
          return b * 4294967296 + a;
        }
        let result = 0;
        for (let i = 0; i < length; ++i) {
          result |= buffer[i] << 8 * i;
        }
        if (buffer[length - 1] & 128)
          return -(result & ~(128 << 8 * (length - 1)));
        return result;
      }
      function scriptNumSize(i) {
        return i > 2147483647 ? 5 : i > 8388607 ? 4 : i > 32767 ? 3 : i > 127 ? 2 : i > 0 ? 1 : 0;
      }
      function encode(_number) {
        let value = Math.abs(_number);
        const size = scriptNumSize(value);
        const buffer = new Uint8Array(size);
        const negative = _number < 0;
        for (let i = 0; i < size; ++i) {
          tools.writeUInt8(buffer, i, value & 255);
          value >>= 8;
        }
        if (buffer[size - 1] & 128) {
          tools.writeUInt8(buffer, size - 1, negative ? 128 : 0);
        } else if (negative) {
          buffer[size - 1] |= 128;
        }
        return buffer;
      }
    }
  });

  // node_modules/bitcoinjs-lib/node_modules/valibot/dist/index.cjs
  var require_dist = __commonJS({
    "node_modules/bitcoinjs-lib/node_modules/valibot/dist/index.cjs"(exports) {
      var store$4;
      function setGlobalConfig(config$1) {
        store$4 = {
          ...store$4,
          ...config$1
        };
      }
      // @__NO_SIDE_EFFECTS__
      function getGlobalConfig(config$1) {
        return {
          lang: config$1?.lang ?? store$4?.lang,
          message: config$1?.message,
          abortEarly: config$1?.abortEarly ?? store$4?.abortEarly,
          abortPipeEarly: config$1?.abortPipeEarly ?? store$4?.abortPipeEarly
        };
      }
      function deleteGlobalConfig() {
        store$4 = void 0;
      }
      var store$3;
      function setGlobalMessage(message$1, lang) {
        if (!store$3) store$3 = /* @__PURE__ */ new Map();
        store$3.set(lang, message$1);
      }
      // @__NO_SIDE_EFFECTS__
      function getGlobalMessage(lang) {
        return store$3?.get(lang);
      }
      function deleteGlobalMessage(lang) {
        store$3?.delete(lang);
      }
      var store$2;
      function setSchemaMessage(message$1, lang) {
        if (!store$2) store$2 = /* @__PURE__ */ new Map();
        store$2.set(lang, message$1);
      }
      // @__NO_SIDE_EFFECTS__
      function getSchemaMessage(lang) {
        return store$2?.get(lang);
      }
      function deleteSchemaMessage(lang) {
        store$2?.delete(lang);
      }
      var store$1;
      function setSpecificMessage(reference, message$1, lang) {
        if (!store$1) store$1 = /* @__PURE__ */ new Map();
        if (!store$1.get(reference)) store$1.set(reference, /* @__PURE__ */ new Map());
        store$1.get(reference).set(lang, message$1);
      }
      // @__NO_SIDE_EFFECTS__
      function getSpecificMessage(reference, lang) {
        return store$1?.get(reference)?.get(lang);
      }
      function deleteSpecificMessage(reference, lang) {
        store$1?.get(reference)?.delete(lang);
      }
      // @__NO_SIDE_EFFECTS__
      function _stringify(input) {
        const type = typeof input;
        if (type === "string") return `"${input}"`;
        if (type === "number" || type === "bigint" || type === "boolean") return `${input}`;
        if (type === "object" || type === "function") return (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null";
        return type;
      }
      function _addIssue(context, label, dataset, config$1, other) {
        const input = other && "input" in other ? other.input : dataset.value;
        const expected = other?.expected ?? context.expects ?? null;
        const received = other?.received ?? /* @__PURE__ */ _stringify(input);
        const issue = {
          kind: context.kind,
          type: context.type,
          input,
          expected,
          received,
          message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
          requirement: context.requirement,
          path: other?.path,
          issues: other?.issues,
          lang: config$1.lang,
          abortEarly: config$1.abortEarly,
          abortPipeEarly: config$1.abortPipeEarly
        };
        const isSchema = context.kind === "schema";
        const message$1 = other?.message ?? context.message ?? /* @__PURE__ */ getSpecificMessage(context.reference, issue.lang) ?? (isSchema ? /* @__PURE__ */ getSchemaMessage(issue.lang) : null) ?? config$1.message ?? /* @__PURE__ */ getGlobalMessage(issue.lang);
        if (message$1 !== void 0) issue.message = typeof message$1 === "function" ? message$1(issue) : message$1;
        if (isSchema) dataset.typed = false;
        if (dataset.issues) dataset.issues.push(issue);
        else dataset.issues = [issue];
      }
      var textEncoder;
      // @__NO_SIDE_EFFECTS__
      function _getByteCount(input) {
        if (!textEncoder) textEncoder = new TextEncoder();
        return textEncoder.encode(input).length;
      }
      var segmenter;
      // @__NO_SIDE_EFFECTS__
      function _getGraphemeCount(input) {
        if (!segmenter) segmenter = new Intl.Segmenter();
        const segments = segmenter.segment(input);
        let count = 0;
        for (const _ of segments) count++;
        return count;
      }
      // @__NO_SIDE_EFFECTS__
      function _getLastMetadata(schema, type) {
        if ("pipe" in schema) {
          const nestedSchemas = [];
          for (let index = schema.pipe.length - 1; index >= 0; index--) {
            const item = schema.pipe[index];
            if (item.kind === "schema" && "pipe" in item) nestedSchemas.push(item);
            else if (item.kind === "metadata" && item.type === type) return item[type];
          }
          for (const nestedSchema of nestedSchemas) {
            const result = /* @__PURE__ */ _getLastMetadata(nestedSchema, type);
            if (result !== void 0) return result;
          }
        }
      }
      // @__NO_SIDE_EFFECTS__
      function _getStandardProps(context) {
        return {
          version: 1,
          vendor: "valibot",
          validate(value$1) {
            return context["~run"]({ value: value$1 }, /* @__PURE__ */ getGlobalConfig());
          }
        };
      }
      var store;
      // @__NO_SIDE_EFFECTS__
      function _getWordCount(locales, input) {
        if (!store) store = /* @__PURE__ */ new Map();
        if (!store.get(locales)) store.set(locales, new Intl.Segmenter(locales, { granularity: "word" }));
        const segments = store.get(locales).segment(input);
        let count = 0;
        for (const segment of segments) if (segment.isWordLike) count++;
        return count;
      }
      var NON_DIGIT_REGEX = /\D/gu;
      // @__NO_SIDE_EFFECTS__
      function _isLuhnAlgo(input) {
        const number$1 = input.replace(NON_DIGIT_REGEX, "");
        let length$1 = number$1.length;
        let bit = 1;
        let sum = 0;
        while (length$1) {
          const value$1 = +number$1[--length$1];
          bit ^= 1;
          sum += bit ? [
            0,
            2,
            4,
            6,
            8,
            1,
            3,
            5,
            7,
            9
          ][value$1] : value$1;
        }
        return sum % 10 === 0;
      }
      // @__NO_SIDE_EFFECTS__
      function _isValidObjectKey(object$1, key) {
        return Object.hasOwn(object$1, key) && key !== "__proto__" && key !== "prototype" && key !== "constructor";
      }
      // @__NO_SIDE_EFFECTS__
      function _joinExpects(values$1, separator) {
        const list = [...new Set(values$1)];
        if (list.length > 1) return `(${list.join(` ${separator} `)})`;
        return list[0] ?? "never";
      }
      // @__NO_SIDE_EFFECTS__
      function entriesFromList(list, schema) {
        const entries$1 = {};
        for (const key of list) entries$1[key] = schema;
        return entries$1;
      }
      // @__NO_SIDE_EFFECTS__
      function entriesFromObjects(schemas) {
        const entries$1 = {};
        for (const schema of schemas) Object.assign(entries$1, schema.entries);
        return entries$1;
      }
      // @__NO_SIDE_EFFECTS__
      function getDotPath(issue) {
        if (issue.path) {
          let key = "";
          for (const item of issue.path) if (typeof item.key === "string" || typeof item.key === "number") if (key) key += `.${item.key}`;
          else key += item.key;
          else return null;
          return key;
        }
        return null;
      }
      // @__NO_SIDE_EFFECTS__
      function isOfKind(kind, object$1) {
        return object$1.kind === kind;
      }
      // @__NO_SIDE_EFFECTS__
      function isOfType(type, object$1) {
        return object$1.type === type;
      }
      // @__NO_SIDE_EFFECTS__
      function isValiError(error) {
        return error instanceof ValiError;
      }
      var ValiError = class extends Error {
        /**
        * Creates a Valibot error with useful information.
        *
        * @param issues The error issues.
        */
        constructor(issues) {
          super(issues[0].message);
          this.name = "ValiError";
          this.issues = issues;
        }
      };
      // @__NO_SIDE_EFFECTS__
      function args(schema) {
        return {
          kind: "transformation",
          type: "args",
          reference: args,
          async: false,
          schema,
          "~run"(dataset, config$1) {
            const func = dataset.value;
            dataset.value = (...args_) => {
              const argsDataset = this.schema["~run"]({ value: args_ }, config$1);
              if (argsDataset.issues) throw new ValiError(argsDataset.issues);
              return func(...argsDataset.value);
            };
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function argsAsync(schema) {
        return {
          kind: "transformation",
          type: "args",
          reference: argsAsync,
          async: false,
          schema,
          "~run"(dataset, config$1) {
            const func = dataset.value;
            dataset.value = async (...args$1) => {
              const argsDataset = await schema["~run"]({ value: args$1 }, config$1);
              if (argsDataset.issues) throw new ValiError(argsDataset.issues);
              return func(...argsDataset.value);
            };
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function awaitAsync() {
        return {
          kind: "transformation",
          type: "await",
          reference: awaitAsync,
          async: true,
          async "~run"(dataset) {
            dataset.value = await dataset.value;
            return dataset;
          }
        };
      }
      var BASE64_REGEX = /^(?:[\da-z+/]{4})*(?:[\da-z+/]{2}==|[\da-z+/]{3}=)?$/iu;
      var BIC_REGEX = /^[A-Z]{6}(?!00)[\dA-Z]{2}(?:[\dA-Z]{3})?$/u;
      var CUID2_REGEX = /^[a-z][\da-z]*$/u;
      var DECIMAL_REGEX = /^[+-]?(?:\d*\.)?\d+$/u;
      var DIGITS_REGEX = /^\d+$/u;
      var EMAIL_REGEX = /^[\w+-]+(?:\.[\w+-]+)*@[\da-z]+(?:[.-][\da-z]+)*\.[a-z]{2,}$/iu;
      var EMOJI_REGEX = /^(?:[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|(?![\p{Emoji_Modifier_Base}\u{1F1E6}-\u{1F1FF}])\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|(?![\p{Emoji_Modifier_Base}\u{1F1E6}-\u{1F1FF}])\p{Emoji_Presentation}))*)+$/u;
      var HEXADECIMAL_REGEX = /^(?:0[hx])?[\da-fA-F]+$/u;
      var HEX_COLOR_REGEX = /^#(?:[\da-fA-F]{3,4}|[\da-fA-F]{6}|[\da-fA-F]{8})$/u;
      var IMEI_REGEX = /^\d{15}$|^\d{2}-\d{6}-\d{6}-\d$/u;
      var IPV4_REGEX = /^(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])(?:\.(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])){3}$/u;
      var IPV6_REGEX = /^(?:(?:[\da-f]{1,4}:){7}[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,7}:|(?:[\da-f]{1,4}:){1,6}:[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,5}(?::[\da-f]{1,4}){1,2}|(?:[\da-f]{1,4}:){1,4}(?::[\da-f]{1,4}){1,3}|(?:[\da-f]{1,4}:){1,3}(?::[\da-f]{1,4}){1,4}|(?:[\da-f]{1,4}:){1,2}(?::[\da-f]{1,4}){1,5}|[\da-f]{1,4}:(?::[\da-f]{1,4}){1,6}|:(?:(?::[\da-f]{1,4}){1,7}|:)|fe80:(?::[\da-f]{0,4}){0,4}%[\da-z]+|::(?:f{4}(?::0{1,4})?:)?(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)|(?:[\da-f]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d))$/iu;
      var IP_REGEX = /^(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])(?:\.(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])){3}$|^(?:(?:[\da-f]{1,4}:){7}[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,7}:|(?:[\da-f]{1,4}:){1,6}:[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,5}(?::[\da-f]{1,4}){1,2}|(?:[\da-f]{1,4}:){1,4}(?::[\da-f]{1,4}){1,3}|(?:[\da-f]{1,4}:){1,3}(?::[\da-f]{1,4}){1,4}|(?:[\da-f]{1,4}:){1,2}(?::[\da-f]{1,4}){1,5}|[\da-f]{1,4}:(?::[\da-f]{1,4}){1,6}|:(?:(?::[\da-f]{1,4}){1,7}|:)|fe80:(?::[\da-f]{0,4}){0,4}%[\da-z]+|::(?:f{4}(?::0{1,4})?:)?(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)|(?:[\da-f]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d))$/iu;
      var ISO_DATE_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])$/u;
      var ISO_DATE_TIME_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])[T ](?:0\d|1\d|2[0-3]):[0-5]\d$/u;
      var ISO_TIME_REGEX = /^(?:0\d|1\d|2[0-3]):[0-5]\d$/u;
      var ISO_TIME_SECOND_REGEX = /^(?:0\d|1\d|2[0-3])(?::[0-5]\d){2}$/u;
      var ISO_TIMESTAMP_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])[T ](?:0\d|1\d|2[0-3])(?::[0-5]\d){2}(?:\.\d{1,9})?(?:Z|[+-](?:0\d|1\d|2[0-3])(?::?[0-5]\d)?)$/u;
      var ISO_WEEK_REGEX = /^\d{4}-W(?:0[1-9]|[1-4]\d|5[0-3])$/u;
      var MAC48_REGEX = /^(?:[\da-f]{2}:){5}[\da-f]{2}$|^(?:[\da-f]{2}-){5}[\da-f]{2}$|^(?:[\da-f]{4}\.){2}[\da-f]{4}$/iu;
      var MAC64_REGEX = /^(?:[\da-f]{2}:){7}[\da-f]{2}$|^(?:[\da-f]{2}-){7}[\da-f]{2}$|^(?:[\da-f]{4}\.){3}[\da-f]{4}$|^(?:[\da-f]{4}:){3}[\da-f]{4}$/iu;
      var MAC_REGEX = /^(?:[\da-f]{2}:){5}[\da-f]{2}$|^(?:[\da-f]{2}-){5}[\da-f]{2}$|^(?:[\da-f]{4}\.){2}[\da-f]{4}$|^(?:[\da-f]{2}:){7}[\da-f]{2}$|^(?:[\da-f]{2}-){7}[\da-f]{2}$|^(?:[\da-f]{4}\.){3}[\da-f]{4}$|^(?:[\da-f]{4}:){3}[\da-f]{4}$/iu;
      var NANO_ID_REGEX = /^[\w-]+$/u;
      var OCTAL_REGEX = /^(?:0o)?[0-7]+$/u;
      var RFC_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      var SLUG_REGEX = /^[\da-z]+(?:[-_][\da-z]+)*$/u;
      var ULID_REGEX = /^[\da-hjkmnp-tv-zA-HJKMNP-TV-Z]{26}$/u;
      var UUID_REGEX = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/iu;
      // @__NO_SIDE_EFFECTS__
      function base64(message$1) {
        return {
          kind: "validation",
          type: "base64",
          reference: base64,
          async: false,
          expects: null,
          requirement: BASE64_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "Base64", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function bic(message$1) {
        return {
          kind: "validation",
          type: "bic",
          reference: bic,
          async: false,
          expects: null,
          requirement: BIC_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "BIC", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function brand(name) {
        return {
          kind: "transformation",
          type: "brand",
          reference: brand,
          async: false,
          name,
          "~run"(dataset) {
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function bytes(requirement, message$1) {
        return {
          kind: "validation",
          type: "bytes",
          reference: bytes,
          async: false,
          expects: `${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) {
              const length$1 = /* @__PURE__ */ _getByteCount(dataset.value);
              if (length$1 !== this.requirement) _addIssue(this, "bytes", dataset, config$1, { received: `${length$1}` });
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function check(requirement, message$1) {
        return {
          kind: "validation",
          type: "check",
          reference: check,
          async: false,
          expects: null,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function checkAsync(requirement, message$1) {
        return {
          kind: "validation",
          type: "check",
          reference: checkAsync,
          async: true,
          expects: null,
          requirement,
          message: message$1,
          async "~run"(dataset, config$1) {
            if (dataset.typed && !await this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function checkItems(requirement, message$1) {
        return {
          kind: "validation",
          type: "check_items",
          reference: checkItems,
          async: false,
          expects: null,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) for (let index = 0; index < dataset.value.length; index++) {
              const item = dataset.value[index];
              if (!this.requirement(item, index, dataset.value)) _addIssue(this, "item", dataset, config$1, {
                input: item,
                path: [{
                  type: "array",
                  origin: "value",
                  input: dataset.value,
                  key: index,
                  value: item
                }]
              });
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function checkItemsAsync(requirement, message$1) {
        return {
          kind: "validation",
          type: "check_items",
          reference: checkItemsAsync,
          async: true,
          expects: null,
          requirement,
          message: message$1,
          async "~run"(dataset, config$1) {
            if (dataset.typed) {
              const requirementResults = await Promise.all(dataset.value.map(this.requirement));
              for (let index = 0; index < dataset.value.length; index++) if (!requirementResults[index]) {
                const item = dataset.value[index];
                _addIssue(this, "item", dataset, config$1, {
                  input: item,
                  path: [{
                    type: "array",
                    origin: "value",
                    input: dataset.value,
                    key: index,
                    value: item
                  }]
                });
              }
            }
            return dataset;
          }
        };
      }
      var CREDIT_CARD_REGEX = /^(?:\d{14,19}|\d{4}(?: \d{3,6}){2,4}|\d{4}(?:-\d{3,6}){2,4})$/u;
      var SANITIZE_REGEX = /[- ]/gu;
      var PROVIDER_REGEX_LIST = [
        /^3[47]\d{13}$/u,
        /^3(?:0[0-5]|[68]\d)\d{11,13}$/u,
        /^6(?:011|5\d{2})\d{12,15}$/u,
        /^(?:2131|1800|35\d{3})\d{11}$/u,
        /^5[1-5]\d{2}|(?:222\d|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/u,
        /^(?:6[27]\d{14,17}|81\d{14,17})$/u,
        /^4\d{12}(?:\d{3,6})?$/u
      ];
      // @__NO_SIDE_EFFECTS__
      function creditCard(message$1) {
        return {
          kind: "validation",
          type: "credit_card",
          reference: creditCard,
          async: false,
          expects: null,
          requirement(input) {
            let sanitized;
            return CREDIT_CARD_REGEX.test(input) && (sanitized = input.replace(SANITIZE_REGEX, "")) && PROVIDER_REGEX_LIST.some((regex$1) => regex$1.test(sanitized)) && /* @__PURE__ */ _isLuhnAlgo(sanitized);
          },
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "credit card", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function cuid2(message$1) {
        return {
          kind: "validation",
          type: "cuid2",
          reference: cuid2,
          async: false,
          expects: null,
          requirement: CUID2_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "Cuid2", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function decimal(message$1) {
        return {
          kind: "validation",
          type: "decimal",
          reference: decimal,
          async: false,
          expects: null,
          requirement: DECIMAL_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "decimal", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function description(description_) {
        return {
          kind: "metadata",
          type: "description",
          reference: description,
          description: description_
        };
      }
      // @__NO_SIDE_EFFECTS__
      function digits(message$1) {
        return {
          kind: "validation",
          type: "digits",
          reference: digits,
          async: false,
          expects: null,
          requirement: DIGITS_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "digits", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function email(message$1) {
        return {
          kind: "validation",
          type: "email",
          reference: email,
          expects: null,
          async: false,
          requirement: EMAIL_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "email", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function emoji(message$1) {
        return {
          kind: "validation",
          type: "emoji",
          reference: emoji,
          async: false,
          expects: null,
          requirement: EMOJI_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "emoji", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function empty(message$1) {
        return {
          kind: "validation",
          type: "empty",
          reference: empty,
          async: false,
          expects: "0",
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && dataset.value.length > 0) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function endsWith(requirement, message$1) {
        return {
          kind: "validation",
          type: "ends_with",
          reference: endsWith,
          async: false,
          expects: `"${requirement}"`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !dataset.value.endsWith(this.requirement)) _addIssue(this, "end", dataset, config$1, { received: `"${dataset.value.slice(-this.requirement.length)}"` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function entries(requirement, message$1) {
        return {
          kind: "validation",
          type: "entries",
          reference: entries,
          async: false,
          expects: `${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (!dataset.typed) return dataset;
            const count = Object.keys(dataset.value).length;
            if (dataset.typed && count !== this.requirement) _addIssue(this, "entries", dataset, config$1, { received: `${count}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function everyItem(requirement, message$1) {
        return {
          kind: "validation",
          type: "every_item",
          reference: everyItem,
          async: false,
          expects: null,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !dataset.value.every(this.requirement)) _addIssue(this, "item", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function examples(examples_) {
        return {
          kind: "metadata",
          type: "examples",
          reference: examples,
          examples: examples_
        };
      }
      // @__NO_SIDE_EFFECTS__
      function excludes(requirement, message$1) {
        const received = /* @__PURE__ */ _stringify(requirement);
        return {
          kind: "validation",
          type: "excludes",
          reference: excludes,
          async: false,
          expects: `!${received}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && dataset.value.includes(this.requirement)) _addIssue(this, "content", dataset, config$1, { received });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function filterItems(operation) {
        return {
          kind: "transformation",
          type: "filter_items",
          reference: filterItems,
          async: false,
          operation,
          "~run"(dataset) {
            dataset.value = dataset.value.filter(this.operation);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function findItem(operation) {
        return {
          kind: "transformation",
          type: "find_item",
          reference: findItem,
          async: false,
          operation,
          "~run"(dataset) {
            dataset.value = dataset.value.find(this.operation);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function finite(message$1) {
        return {
          kind: "validation",
          type: "finite",
          reference: finite,
          async: false,
          expects: null,
          requirement: Number.isFinite,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "finite", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function flavor(name) {
        return {
          kind: "transformation",
          type: "flavor",
          reference: flavor,
          async: false,
          name,
          "~run"(dataset) {
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function graphemes(requirement, message$1) {
        return {
          kind: "validation",
          type: "graphemes",
          reference: graphemes,
          async: false,
          expects: `${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) {
              const count = /* @__PURE__ */ _getGraphemeCount(dataset.value);
              if (count !== this.requirement) _addIssue(this, "graphemes", dataset, config$1, { received: `${count}` });
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function gtValue(requirement, message$1) {
        return {
          kind: "validation",
          type: "gt_value",
          reference: gtValue,
          async: false,
          expects: `>${requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement)}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !(dataset.value > this.requirement)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
            return dataset;
          }
        };
      }
      var HASH_LENGTHS = {
        md4: 32,
        md5: 32,
        sha1: 40,
        sha256: 64,
        sha384: 96,
        sha512: 128,
        ripemd128: 32,
        ripemd160: 40,
        tiger128: 32,
        tiger160: 40,
        tiger192: 48,
        crc32: 8,
        crc32b: 8,
        adler32: 8
      };
      // @__NO_SIDE_EFFECTS__
      function hash(types, message$1) {
        return {
          kind: "validation",
          type: "hash",
          reference: hash,
          expects: null,
          async: false,
          requirement: RegExp(types.map((type) => `^[a-f0-9]{${HASH_LENGTHS[type]}}$`).join("|"), "iu"),
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "hash", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function hexadecimal(message$1) {
        return {
          kind: "validation",
          type: "hexadecimal",
          reference: hexadecimal,
          async: false,
          expects: null,
          requirement: HEXADECIMAL_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "hexadecimal", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function hexColor(message$1) {
        return {
          kind: "validation",
          type: "hex_color",
          reference: hexColor,
          async: false,
          expects: null,
          requirement: HEX_COLOR_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "hex color", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function imei(message$1) {
        return {
          kind: "validation",
          type: "imei",
          reference: imei,
          async: false,
          expects: null,
          requirement(input) {
            return IMEI_REGEX.test(input) && /* @__PURE__ */ _isLuhnAlgo(input);
          },
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "IMEI", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function includes(requirement, message$1) {
        const expects = /* @__PURE__ */ _stringify(requirement);
        return {
          kind: "validation",
          type: "includes",
          reference: includes,
          async: false,
          expects,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !dataset.value.includes(this.requirement)) _addIssue(this, "content", dataset, config$1, { received: `!${expects}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function integer(message$1) {
        return {
          kind: "validation",
          type: "integer",
          reference: integer,
          async: false,
          expects: null,
          requirement: Number.isInteger,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "integer", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function ip(message$1) {
        return {
          kind: "validation",
          type: "ip",
          reference: ip,
          async: false,
          expects: null,
          requirement: IP_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "IP", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function ipv4(message$1) {
        return {
          kind: "validation",
          type: "ipv4",
          reference: ipv4,
          async: false,
          expects: null,
          requirement: IPV4_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "IPv4", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function ipv6(message$1) {
        return {
          kind: "validation",
          type: "ipv6",
          reference: ipv6,
          async: false,
          expects: null,
          requirement: IPV6_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "IPv6", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function isoDate(message$1) {
        return {
          kind: "validation",
          type: "iso_date",
          reference: isoDate,
          async: false,
          expects: null,
          requirement: ISO_DATE_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "date", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function isoDateTime(message$1) {
        return {
          kind: "validation",
          type: "iso_date_time",
          reference: isoDateTime,
          async: false,
          expects: null,
          requirement: ISO_DATE_TIME_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "date-time", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function isoTime(message$1) {
        return {
          kind: "validation",
          type: "iso_time",
          reference: isoTime,
          async: false,
          expects: null,
          requirement: ISO_TIME_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "time", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function isoTimeSecond(message$1) {
        return {
          kind: "validation",
          type: "iso_time_second",
          reference: isoTimeSecond,
          async: false,
          expects: null,
          requirement: ISO_TIME_SECOND_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "time-second", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function isoTimestamp(message$1) {
        return {
          kind: "validation",
          type: "iso_timestamp",
          reference: isoTimestamp,
          async: false,
          expects: null,
          requirement: ISO_TIMESTAMP_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "timestamp", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function isoWeek(message$1) {
        return {
          kind: "validation",
          type: "iso_week",
          reference: isoWeek,
          async: false,
          expects: null,
          requirement: ISO_WEEK_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "week", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function length(requirement, message$1) {
        return {
          kind: "validation",
          type: "length",
          reference: length,
          async: false,
          expects: `${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && dataset.value.length !== this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function ltValue(requirement, message$1) {
        return {
          kind: "validation",
          type: "lt_value",
          reference: ltValue,
          async: false,
          expects: `<${requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement)}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !(dataset.value < this.requirement)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function mac(message$1) {
        return {
          kind: "validation",
          type: "mac",
          reference: mac,
          async: false,
          expects: null,
          requirement: MAC_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "MAC", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function mac48(message$1) {
        return {
          kind: "validation",
          type: "mac48",
          reference: mac48,
          async: false,
          expects: null,
          requirement: MAC48_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "48-bit MAC", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function mac64(message$1) {
        return {
          kind: "validation",
          type: "mac64",
          reference: mac64,
          async: false,
          expects: null,
          requirement: MAC64_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "64-bit MAC", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function mapItems(operation) {
        return {
          kind: "transformation",
          type: "map_items",
          reference: mapItems,
          async: false,
          operation,
          "~run"(dataset) {
            dataset.value = dataset.value.map(this.operation);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function maxBytes(requirement, message$1) {
        return {
          kind: "validation",
          type: "max_bytes",
          reference: maxBytes,
          async: false,
          expects: `<=${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) {
              const length$1 = /* @__PURE__ */ _getByteCount(dataset.value);
              if (length$1 > this.requirement) _addIssue(this, "bytes", dataset, config$1, { received: `${length$1}` });
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function maxEntries(requirement, message$1) {
        return {
          kind: "validation",
          type: "max_entries",
          reference: maxEntries,
          async: false,
          expects: `<=${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (!dataset.typed) return dataset;
            const count = Object.keys(dataset.value).length;
            if (dataset.typed && count > this.requirement) _addIssue(this, "entries", dataset, config$1, { received: `${count}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function maxGraphemes(requirement, message$1) {
        return {
          kind: "validation",
          type: "max_graphemes",
          reference: maxGraphemes,
          async: false,
          expects: `<=${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) {
              const count = /* @__PURE__ */ _getGraphemeCount(dataset.value);
              if (count > this.requirement) _addIssue(this, "graphemes", dataset, config$1, { received: `${count}` });
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function maxLength(requirement, message$1) {
        return {
          kind: "validation",
          type: "max_length",
          reference: maxLength,
          async: false,
          expects: `<=${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && dataset.value.length > this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function maxSize(requirement, message$1) {
        return {
          kind: "validation",
          type: "max_size",
          reference: maxSize,
          async: false,
          expects: `<=${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && dataset.value.size > this.requirement) _addIssue(this, "size", dataset, config$1, { received: `${dataset.value.size}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function maxValue(requirement, message$1) {
        return {
          kind: "validation",
          type: "max_value",
          reference: maxValue,
          async: false,
          expects: `<=${requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement)}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !(dataset.value <= this.requirement)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function maxWords(locales, requirement, message$1) {
        return {
          kind: "validation",
          type: "max_words",
          reference: maxWords,
          async: false,
          expects: `<=${requirement}`,
          locales,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) {
              const count = /* @__PURE__ */ _getWordCount(this.locales, dataset.value);
              if (count > this.requirement) _addIssue(this, "words", dataset, config$1, { received: `${count}` });
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function metadata(metadata_) {
        return {
          kind: "metadata",
          type: "metadata",
          reference: metadata,
          metadata: metadata_
        };
      }
      // @__NO_SIDE_EFFECTS__
      function mimeType(requirement, message$1) {
        return {
          kind: "validation",
          type: "mime_type",
          reference: mimeType,
          async: false,
          expects: /* @__PURE__ */ _joinExpects(requirement.map((option) => `"${option}"`), "|"),
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.includes(dataset.value.type)) _addIssue(this, "MIME type", dataset, config$1, { received: `"${dataset.value.type}"` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function minBytes(requirement, message$1) {
        return {
          kind: "validation",
          type: "min_bytes",
          reference: minBytes,
          async: false,
          expects: `>=${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) {
              const length$1 = /* @__PURE__ */ _getByteCount(dataset.value);
              if (length$1 < this.requirement) _addIssue(this, "bytes", dataset, config$1, { received: `${length$1}` });
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function minEntries(requirement, message$1) {
        return {
          kind: "validation",
          type: "min_entries",
          reference: minEntries,
          async: false,
          expects: `>=${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (!dataset.typed) return dataset;
            const count = Object.keys(dataset.value).length;
            if (dataset.typed && count < this.requirement) _addIssue(this, "entries", dataset, config$1, { received: `${count}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function minGraphemes(requirement, message$1) {
        return {
          kind: "validation",
          type: "min_graphemes",
          reference: minGraphemes,
          async: false,
          expects: `>=${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) {
              const count = /* @__PURE__ */ _getGraphemeCount(dataset.value);
              if (count < this.requirement) _addIssue(this, "graphemes", dataset, config$1, { received: `${count}` });
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function minLength(requirement, message$1) {
        return {
          kind: "validation",
          type: "min_length",
          reference: minLength,
          async: false,
          expects: `>=${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && dataset.value.length < this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function minSize(requirement, message$1) {
        return {
          kind: "validation",
          type: "min_size",
          reference: minSize,
          async: false,
          expects: `>=${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && dataset.value.size < this.requirement) _addIssue(this, "size", dataset, config$1, { received: `${dataset.value.size}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function minValue(requirement, message$1) {
        return {
          kind: "validation",
          type: "min_value",
          reference: minValue,
          async: false,
          expects: `>=${requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement)}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !(dataset.value >= this.requirement)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function minWords(locales, requirement, message$1) {
        return {
          kind: "validation",
          type: "min_words",
          reference: minWords,
          async: false,
          expects: `>=${requirement}`,
          locales,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) {
              const count = /* @__PURE__ */ _getWordCount(this.locales, dataset.value);
              if (count < this.requirement) _addIssue(this, "words", dataset, config$1, { received: `${count}` });
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function multipleOf(requirement, message$1) {
        return {
          kind: "validation",
          type: "multiple_of",
          reference: multipleOf,
          async: false,
          expects: `%${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && dataset.value % this.requirement != 0) _addIssue(this, "multiple", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nanoid(message$1) {
        return {
          kind: "validation",
          type: "nanoid",
          reference: nanoid,
          async: false,
          expects: null,
          requirement: NANO_ID_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "Nano ID", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nonEmpty(message$1) {
        return {
          kind: "validation",
          type: "non_empty",
          reference: nonEmpty,
          async: false,
          expects: "!0",
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && dataset.value.length === 0) _addIssue(this, "length", dataset, config$1, { received: "0" });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function normalize(form) {
        return {
          kind: "transformation",
          type: "normalize",
          reference: normalize,
          async: false,
          form,
          "~run"(dataset) {
            dataset.value = dataset.value.normalize(this.form);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function notBytes(requirement, message$1) {
        return {
          kind: "validation",
          type: "not_bytes",
          reference: notBytes,
          async: false,
          expects: `!${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) {
              const length$1 = /* @__PURE__ */ _getByteCount(dataset.value);
              if (length$1 === this.requirement) _addIssue(this, "bytes", dataset, config$1, { received: `${length$1}` });
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function notEntries(requirement, message$1) {
        return {
          kind: "validation",
          type: "not_entries",
          reference: notEntries,
          async: false,
          expects: `!${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (!dataset.typed) return dataset;
            const count = Object.keys(dataset.value).length;
            if (dataset.typed && count === this.requirement) _addIssue(this, "entries", dataset, config$1, { received: `${count}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function notGraphemes(requirement, message$1) {
        return {
          kind: "validation",
          type: "not_graphemes",
          reference: notGraphemes,
          async: false,
          expects: `!${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) {
              const count = /* @__PURE__ */ _getGraphemeCount(dataset.value);
              if (count === this.requirement) _addIssue(this, "graphemes", dataset, config$1, { received: `${count}` });
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function notLength(requirement, message$1) {
        return {
          kind: "validation",
          type: "not_length",
          reference: notLength,
          async: false,
          expects: `!${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && dataset.value.length === this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function notSize(requirement, message$1) {
        return {
          kind: "validation",
          type: "not_size",
          reference: notSize,
          async: false,
          expects: `!${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && dataset.value.size === this.requirement) _addIssue(this, "size", dataset, config$1, { received: `${dataset.value.size}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function notValue(requirement, message$1) {
        return {
          kind: "validation",
          type: "not_value",
          reference: notValue,
          async: false,
          expects: requirement instanceof Date ? `!${requirement.toJSON()}` : `!${/* @__PURE__ */ _stringify(requirement)}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && this.requirement <= dataset.value && this.requirement >= dataset.value) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function notValues(requirement, message$1) {
        return {
          kind: "validation",
          type: "not_values",
          reference: notValues,
          async: false,
          expects: `!${/* @__PURE__ */ _joinExpects(requirement.map((value$1) => value$1 instanceof Date ? value$1.toJSON() : /* @__PURE__ */ _stringify(value$1)), "|")}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && this.requirement.some((value$1) => value$1 <= dataset.value && value$1 >= dataset.value)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function notWords(locales, requirement, message$1) {
        return {
          kind: "validation",
          type: "not_words",
          reference: notWords,
          async: false,
          expects: `!${requirement}`,
          locales,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) {
              const count = /* @__PURE__ */ _getWordCount(this.locales, dataset.value);
              if (count === this.requirement) _addIssue(this, "words", dataset, config$1, { received: `${count}` });
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function octal(message$1) {
        return {
          kind: "validation",
          type: "octal",
          reference: octal,
          async: false,
          expects: null,
          requirement: OCTAL_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "octal", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function parseJson(config$1, message$1) {
        return {
          kind: "transformation",
          type: "parse_json",
          reference: parseJson,
          config: config$1,
          message: message$1,
          async: false,
          "~run"(dataset, config$2) {
            try {
              dataset.value = JSON.parse(dataset.value, this.config?.reviver);
            } catch (error) {
              if (error instanceof Error) {
                _addIssue(this, "JSON", dataset, config$2, { received: `"${error.message}"` });
                dataset.typed = false;
              } else throw error;
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function _isPartiallyTyped(dataset, paths) {
        if (dataset.issues) for (const path of paths) for (const issue of dataset.issues) {
          let typed = false;
          const bound = Math.min(path.length, issue.path?.length ?? 0);
          for (let index = 0; index < bound; index++) if (path[index] !== issue.path[index].key && (path[index] !== "$" || issue.path[index].type !== "array")) {
            typed = true;
            break;
          }
          if (!typed) return false;
        }
        return true;
      }
      // @__NO_SIDE_EFFECTS__
      function partialCheck(paths, requirement, message$1) {
        return {
          kind: "validation",
          type: "partial_check",
          reference: partialCheck,
          async: false,
          expects: null,
          paths,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if ((dataset.typed || /* @__PURE__ */ _isPartiallyTyped(dataset, paths)) && !this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function partialCheckAsync(paths, requirement, message$1) {
        return {
          kind: "validation",
          type: "partial_check",
          reference: partialCheckAsync,
          async: true,
          expects: null,
          paths,
          requirement,
          message: message$1,
          async "~run"(dataset, config$1) {
            if ((dataset.typed || /* @__PURE__ */ _isPartiallyTyped(dataset, paths)) && !await this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function rawCheck(action) {
        return {
          kind: "validation",
          type: "raw_check",
          reference: rawCheck,
          async: false,
          expects: null,
          "~run"(dataset, config$1) {
            action({
              dataset,
              config: config$1,
              addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info)
            });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function rawCheckAsync(action) {
        return {
          kind: "validation",
          type: "raw_check",
          reference: rawCheckAsync,
          async: true,
          expects: null,
          async "~run"(dataset, config$1) {
            await action({
              dataset,
              config: config$1,
              addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info)
            });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function rawTransform(action) {
        return {
          kind: "transformation",
          type: "raw_transform",
          reference: rawTransform,
          async: false,
          "~run"(dataset, config$1) {
            const output = action({
              dataset,
              config: config$1,
              addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info),
              NEVER: null
            });
            if (dataset.issues) dataset.typed = false;
            else dataset.value = output;
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function rawTransformAsync(action) {
        return {
          kind: "transformation",
          type: "raw_transform",
          reference: rawTransformAsync,
          async: true,
          async "~run"(dataset, config$1) {
            const output = await action({
              dataset,
              config: config$1,
              addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info),
              NEVER: null
            });
            if (dataset.issues) dataset.typed = false;
            else dataset.value = output;
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function readonly() {
        return {
          kind: "transformation",
          type: "readonly",
          reference: readonly,
          async: false,
          "~run"(dataset) {
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function reduceItems(operation, initial) {
        return {
          kind: "transformation",
          type: "reduce_items",
          reference: reduceItems,
          async: false,
          operation,
          initial,
          "~run"(dataset) {
            dataset.value = dataset.value.reduce(this.operation, this.initial);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function regex(requirement, message$1) {
        return {
          kind: "validation",
          type: "regex",
          reference: regex,
          async: false,
          expects: `${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "format", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function returns(schema) {
        return {
          kind: "transformation",
          type: "returns",
          reference: returns,
          async: false,
          schema,
          "~run"(dataset, config$1) {
            const func = dataset.value;
            dataset.value = (...args_) => {
              const returnsDataset = this.schema["~run"]({ value: func(...args_) }, config$1);
              if (returnsDataset.issues) throw new ValiError(returnsDataset.issues);
              return returnsDataset.value;
            };
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function returnsAsync(schema) {
        return {
          kind: "transformation",
          type: "returns",
          reference: returnsAsync,
          async: false,
          schema,
          "~run"(dataset, config$1) {
            const func = dataset.value;
            dataset.value = async (...args_) => {
              const returnsDataset = await this.schema["~run"]({ value: await func(...args_) }, config$1);
              if (returnsDataset.issues) throw new ValiError(returnsDataset.issues);
              return returnsDataset.value;
            };
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function rfcEmail(message$1) {
        return {
          kind: "validation",
          type: "rfc_email",
          reference: rfcEmail,
          expects: null,
          async: false,
          requirement: RFC_EMAIL_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "email", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function safeInteger(message$1) {
        return {
          kind: "validation",
          type: "safe_integer",
          reference: safeInteger,
          async: false,
          expects: null,
          requirement: Number.isSafeInteger,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "safe integer", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function size(requirement, message$1) {
        return {
          kind: "validation",
          type: "size",
          reference: size,
          async: false,
          expects: `${requirement}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && dataset.value.size !== this.requirement) _addIssue(this, "size", dataset, config$1, { received: `${dataset.value.size}` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function slug(message$1) {
        return {
          kind: "validation",
          type: "slug",
          reference: slug,
          async: false,
          expects: null,
          requirement: SLUG_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "slug", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function someItem(requirement, message$1) {
        return {
          kind: "validation",
          type: "some_item",
          reference: someItem,
          async: false,
          expects: null,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !dataset.value.some(this.requirement)) _addIssue(this, "item", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function sortItems(operation) {
        return {
          kind: "transformation",
          type: "sort_items",
          reference: sortItems,
          async: false,
          operation,
          "~run"(dataset) {
            dataset.value = dataset.value.sort(this.operation);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function startsWith(requirement, message$1) {
        return {
          kind: "validation",
          type: "starts_with",
          reference: startsWith,
          async: false,
          expects: `"${requirement}"`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !dataset.value.startsWith(this.requirement)) _addIssue(this, "start", dataset, config$1, { received: `"${dataset.value.slice(0, this.requirement.length)}"` });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function stringifyJson(config$1, message$1) {
        return {
          kind: "transformation",
          type: "stringify_json",
          reference: stringifyJson,
          message: message$1,
          config: config$1,
          async: false,
          "~run"(dataset, config$2) {
            try {
              const output = JSON.stringify(dataset.value, this.config?.replacer, this.config?.space);
              if (output === void 0) {
                _addIssue(this, "JSON", dataset, config$2);
                dataset.typed = false;
              }
              dataset.value = output;
            } catch (error) {
              if (error instanceof Error) {
                _addIssue(this, "JSON", dataset, config$2, { received: `"${error.message}"` });
                dataset.typed = false;
              } else throw error;
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function title(title_) {
        return {
          kind: "metadata",
          type: "title",
          reference: title,
          title: title_
        };
      }
      // @__NO_SIDE_EFFECTS__
      function toBigint(message$1) {
        return {
          kind: "transformation",
          type: "to_bigint",
          reference: toBigint,
          async: false,
          message: message$1,
          "~run"(dataset, config$1) {
            try {
              dataset.value = BigInt(dataset.value);
            } catch {
              _addIssue(this, "bigint", dataset, config$1);
              dataset.typed = false;
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function toBoolean() {
        return {
          kind: "transformation",
          type: "to_boolean",
          reference: toBoolean,
          async: false,
          "~run"(dataset) {
            dataset.value = Boolean(dataset.value);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function toDate(message$1) {
        return {
          kind: "transformation",
          type: "to_date",
          reference: toDate,
          async: false,
          message: message$1,
          "~run"(dataset, config$1) {
            try {
              dataset.value = new Date(dataset.value);
              if (isNaN(dataset.value)) {
                _addIssue(this, "date", dataset, config$1, { received: '"Invalid Date"' });
                dataset.typed = false;
              }
            } catch {
              _addIssue(this, "date", dataset, config$1);
              dataset.typed = false;
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function toLowerCase() {
        return {
          kind: "transformation",
          type: "to_lower_case",
          reference: toLowerCase,
          async: false,
          "~run"(dataset) {
            dataset.value = dataset.value.toLowerCase();
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function toMaxValue(requirement) {
        return {
          kind: "transformation",
          type: "to_max_value",
          reference: toMaxValue,
          async: false,
          requirement,
          "~run"(dataset) {
            dataset.value = dataset.value > this.requirement ? this.requirement : dataset.value;
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function toMinValue(requirement) {
        return {
          kind: "transformation",
          type: "to_min_value",
          reference: toMinValue,
          async: false,
          requirement,
          "~run"(dataset) {
            dataset.value = dataset.value < this.requirement ? this.requirement : dataset.value;
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function toNumber(message$1) {
        return {
          kind: "transformation",
          type: "to_number",
          reference: toNumber,
          async: false,
          message: message$1,
          "~run"(dataset, config$1) {
            try {
              dataset.value = Number(dataset.value);
              if (isNaN(dataset.value)) {
                _addIssue(this, "number", dataset, config$1);
                dataset.typed = false;
              }
            } catch {
              _addIssue(this, "number", dataset, config$1);
              dataset.typed = false;
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function toString(message$1) {
        return {
          kind: "transformation",
          type: "to_string",
          reference: toString,
          async: false,
          message: message$1,
          "~run"(dataset, config$1) {
            try {
              dataset.value = String(dataset.value);
            } catch {
              _addIssue(this, "string", dataset, config$1);
              dataset.typed = false;
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function toUpperCase() {
        return {
          kind: "transformation",
          type: "to_upper_case",
          reference: toUpperCase,
          async: false,
          "~run"(dataset) {
            dataset.value = dataset.value.toUpperCase();
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function transform(operation) {
        return {
          kind: "transformation",
          type: "transform",
          reference: transform,
          async: false,
          operation,
          "~run"(dataset) {
            dataset.value = this.operation(dataset.value);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function transformAsync(operation) {
        return {
          kind: "transformation",
          type: "transform",
          reference: transformAsync,
          async: true,
          operation,
          async "~run"(dataset) {
            dataset.value = await this.operation(dataset.value);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function trim() {
        return {
          kind: "transformation",
          type: "trim",
          reference: trim,
          async: false,
          "~run"(dataset) {
            dataset.value = dataset.value.trim();
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function trimEnd() {
        return {
          kind: "transformation",
          type: "trim_end",
          reference: trimEnd,
          async: false,
          "~run"(dataset) {
            dataset.value = dataset.value.trimEnd();
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function trimStart() {
        return {
          kind: "transformation",
          type: "trim_start",
          reference: trimStart,
          async: false,
          "~run"(dataset) {
            dataset.value = dataset.value.trimStart();
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function ulid(message$1) {
        return {
          kind: "validation",
          type: "ulid",
          reference: ulid,
          async: false,
          expects: null,
          requirement: ULID_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "ULID", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function url(message$1) {
        return {
          kind: "validation",
          type: "url",
          reference: url,
          async: false,
          expects: null,
          requirement(input) {
            try {
              new URL(input);
              return true;
            } catch {
              return false;
            }
          },
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "URL", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function uuid(message$1) {
        return {
          kind: "validation",
          type: "uuid",
          reference: uuid,
          async: false,
          expects: null,
          requirement: UUID_REGEX,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "UUID", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function value(requirement, message$1) {
        return {
          kind: "validation",
          type: "value",
          reference: value,
          async: false,
          expects: requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement),
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !(this.requirement <= dataset.value && this.requirement >= dataset.value)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function values(requirement, message$1) {
        return {
          kind: "validation",
          type: "values",
          reference: values,
          async: false,
          expects: `${/* @__PURE__ */ _joinExpects(requirement.map((value$1) => value$1 instanceof Date ? value$1.toJSON() : /* @__PURE__ */ _stringify(value$1)), "|")}`,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed && !this.requirement.some((value$1) => value$1 <= dataset.value && value$1 >= dataset.value)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function words(locales, requirement, message$1) {
        return {
          kind: "validation",
          type: "words",
          reference: words,
          async: false,
          expects: `${requirement}`,
          locales,
          requirement,
          message: message$1,
          "~run"(dataset, config$1) {
            if (dataset.typed) {
              const count = /* @__PURE__ */ _getWordCount(this.locales, dataset.value);
              if (count !== this.requirement) _addIssue(this, "words", dataset, config$1, { received: `${count}` });
            }
            return dataset;
          }
        };
      }
      function assert(schema, input) {
        const issues = schema["~run"]({ value: input }, { abortEarly: true }).issues;
        if (issues) throw new ValiError(issues);
      }
      // @__NO_SIDE_EFFECTS__
      function config(schema, config$1) {
        return {
          ...schema,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config_) {
            return schema["~run"](dataset, {
              ...config_,
              ...config$1
            });
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function getFallback(schema, dataset, config$1) {
        return typeof schema.fallback === "function" ? schema.fallback(dataset, config$1) : schema.fallback;
      }
      // @__NO_SIDE_EFFECTS__
      function fallback(schema, fallback$1) {
        return {
          ...schema,
          fallback: fallback$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const outputDataset = schema["~run"](dataset, config$1);
            return outputDataset.issues ? {
              typed: true,
              value: /* @__PURE__ */ getFallback(this, outputDataset, config$1)
            } : outputDataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function fallbackAsync(schema, fallback$1) {
        return {
          ...schema,
          fallback: fallback$1,
          async: true,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const outputDataset = await schema["~run"](dataset, config$1);
            return outputDataset.issues ? {
              typed: true,
              value: await /* @__PURE__ */ getFallback(this, outputDataset, config$1)
            } : outputDataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function flatten(issues) {
        const flatErrors = {};
        for (const issue of issues) if (issue.path) {
          const dotPath = /* @__PURE__ */ getDotPath(issue);
          if (dotPath) {
            if (!flatErrors.nested) flatErrors.nested = {};
            if (flatErrors.nested[dotPath]) flatErrors.nested[dotPath].push(issue.message);
            else flatErrors.nested[dotPath] = [issue.message];
          } else if (flatErrors.other) flatErrors.other.push(issue.message);
          else flatErrors.other = [issue.message];
        } else if (flatErrors.root) flatErrors.root.push(issue.message);
        else flatErrors.root = [issue.message];
        return flatErrors;
      }
      // @__NO_SIDE_EFFECTS__
      function forward(action, path) {
        return {
          ...action,
          "~run"(dataset, config$1) {
            const prevIssues = dataset.issues && [...dataset.issues];
            dataset = action["~run"](dataset, config$1);
            if (dataset.issues) {
              for (const issue of dataset.issues) if (!prevIssues?.includes(issue)) {
                let pathInput = dataset.value;
                for (const key of path) {
                  const pathValue = pathInput[key];
                  const pathItem = {
                    type: "unknown",
                    origin: "value",
                    input: pathInput,
                    key,
                    value: pathValue
                  };
                  if (issue.path) issue.path.push(pathItem);
                  else issue.path = [pathItem];
                  if (!pathValue) break;
                  pathInput = pathValue;
                }
              }
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function forwardAsync(action, path) {
        return {
          ...action,
          async: true,
          async "~run"(dataset, config$1) {
            const prevIssues = dataset.issues && [...dataset.issues];
            dataset = await action["~run"](dataset, config$1);
            if (dataset.issues) {
              for (const issue of dataset.issues) if (!prevIssues?.includes(issue)) {
                let pathInput = dataset.value;
                for (const key of path) {
                  const pathValue = pathInput[key];
                  const pathItem = {
                    type: "unknown",
                    origin: "value",
                    input: pathInput,
                    key,
                    value: pathValue
                  };
                  if (issue.path) issue.path.push(pathItem);
                  else issue.path = [pathItem];
                  if (!pathValue) break;
                  pathInput = pathValue;
                }
              }
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function getDefault(schema, dataset, config$1) {
        return typeof schema.default === "function" ? schema.default(dataset, config$1) : schema.default;
      }
      // @__NO_SIDE_EFFECTS__
      function getDefaults(schema) {
        if ("entries" in schema) {
          const object$1 = {};
          for (const key in schema.entries) object$1[key] = /* @__PURE__ */ getDefaults(schema.entries[key]);
          return object$1;
        }
        if ("items" in schema) return schema.items.map(getDefaults);
        return /* @__PURE__ */ getDefault(schema);
      }
      // @__NO_SIDE_EFFECTS__
      async function getDefaultsAsync(schema) {
        if ("entries" in schema) return Object.fromEntries(await Promise.all(Object.entries(schema.entries).map(async ([key, value$1]) => [key, await /* @__PURE__ */ getDefaultsAsync(value$1)])));
        if ("items" in schema) return Promise.all(schema.items.map(getDefaultsAsync));
        return /* @__PURE__ */ getDefault(schema);
      }
      // @__NO_SIDE_EFFECTS__
      function getDescription(schema) {
        return /* @__PURE__ */ _getLastMetadata(schema, "description");
      }
      // @__NO_SIDE_EFFECTS__
      function getExamples(schema) {
        const examples$1 = [];
        function depthFirstCollect(schema$1) {
          if ("pipe" in schema$1) {
            for (const item of schema$1.pipe) if (item.kind === "schema" && "pipe" in item) depthFirstCollect(item);
            else if (item.kind === "metadata" && item.type === "examples") examples$1.push(...item.examples);
          }
        }
        depthFirstCollect(schema);
        return examples$1;
      }
      // @__NO_SIDE_EFFECTS__
      function getFallbacks(schema) {
        if ("entries" in schema) {
          const object$1 = {};
          for (const key in schema.entries) object$1[key] = /* @__PURE__ */ getFallbacks(schema.entries[key]);
          return object$1;
        }
        if ("items" in schema) return schema.items.map(getFallbacks);
        return /* @__PURE__ */ getFallback(schema);
      }
      // @__NO_SIDE_EFFECTS__
      async function getFallbacksAsync(schema) {
        if ("entries" in schema) return Object.fromEntries(await Promise.all(Object.entries(schema.entries).map(async ([key, value$1]) => [key, await /* @__PURE__ */ getFallbacksAsync(value$1)])));
        if ("items" in schema) return Promise.all(schema.items.map(getFallbacksAsync));
        return /* @__PURE__ */ getFallback(schema);
      }
      // @__NO_SIDE_EFFECTS__
      function getMetadata(schema) {
        const result = {};
        function depthFirstMerge(schema$1) {
          if ("pipe" in schema$1) {
            for (const item of schema$1.pipe) if (item.kind === "schema" && "pipe" in item) depthFirstMerge(item);
            else if (item.kind === "metadata" && item.type === "metadata") Object.assign(result, item.metadata);
          }
        }
        depthFirstMerge(schema);
        return result;
      }
      // @__NO_SIDE_EFFECTS__
      function getTitle(schema) {
        return /* @__PURE__ */ _getLastMetadata(schema, "title");
      }
      // @__NO_SIDE_EFFECTS__
      function is(schema, input) {
        return !schema["~run"]({ value: input }, { abortEarly: true }).issues;
      }
      // @__NO_SIDE_EFFECTS__
      function any() {
        return {
          kind: "schema",
          type: "any",
          reference: any,
          expects: "any",
          async: false,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset) {
            dataset.typed = true;
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function array(item, message$1) {
        return {
          kind: "schema",
          type: "array",
          reference: array,
          expects: "Array",
          async: false,
          item,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (Array.isArray(input)) {
              dataset.typed = true;
              dataset.value = [];
              for (let key = 0; key < input.length; key++) {
                const value$1 = input[key];
                const itemDataset = this.item["~run"]({ value: value$1 }, config$1);
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = itemDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) dataset.typed = false;
                dataset.value.push(itemDataset.value);
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function arrayAsync(item, message$1) {
        return {
          kind: "schema",
          type: "array",
          reference: arrayAsync,
          expects: "Array",
          async: true,
          item,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (Array.isArray(input)) {
              dataset.typed = true;
              dataset.value = [];
              const itemDatasets = await Promise.all(input.map((value$1) => this.item["~run"]({ value: value$1 }, config$1)));
              for (let key = 0; key < itemDatasets.length; key++) {
                const itemDataset = itemDatasets[key];
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: input[key]
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = itemDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) dataset.typed = false;
                dataset.value.push(itemDataset.value);
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function bigint(message$1) {
        return {
          kind: "schema",
          type: "bigint",
          reference: bigint,
          expects: "bigint",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (typeof dataset.value === "bigint") dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function blob(message$1) {
        return {
          kind: "schema",
          type: "blob",
          reference: blob,
          expects: "Blob",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value instanceof Blob) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function boolean(message$1) {
        return {
          kind: "schema",
          type: "boolean",
          reference: boolean,
          expects: "boolean",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (typeof dataset.value === "boolean") dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function custom(check$1, message$1) {
        return {
          kind: "schema",
          type: "custom",
          reference: custom,
          expects: "unknown",
          async: false,
          check: check$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (this.check(dataset.value)) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function customAsync(check$1, message$1) {
        return {
          kind: "schema",
          type: "custom",
          reference: customAsync,
          expects: "unknown",
          async: true,
          check: check$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            if (await this.check(dataset.value)) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function date(message$1) {
        return {
          kind: "schema",
          type: "date",
          reference: date,
          expects: "Date",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value instanceof Date) if (!isNaN(dataset.value)) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1, { received: '"Invalid Date"' });
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function enum_(enum__, message$1) {
        const options = [];
        for (const key in enum__) if (`${+key}` !== key || typeof enum__[key] !== "string" || !Object.is(enum__[enum__[key]], +key)) options.push(enum__[key]);
        return {
          kind: "schema",
          type: "enum",
          reference: enum_,
          expects: /* @__PURE__ */ _joinExpects(options.map(_stringify), "|"),
          async: false,
          enum: enum__,
          options,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (this.options.includes(dataset.value)) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function exactOptional(wrapped, default_) {
        return {
          kind: "schema",
          type: "exact_optional",
          reference: exactOptional,
          expects: wrapped.expects,
          async: false,
          wrapped,
          default: default_,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            return this.wrapped["~run"](dataset, config$1);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function exactOptionalAsync(wrapped, default_) {
        return {
          kind: "schema",
          type: "exact_optional",
          reference: exactOptionalAsync,
          expects: wrapped.expects,
          async: true,
          wrapped,
          default: default_,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            return this.wrapped["~run"](dataset, config$1);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function file(message$1) {
        return {
          kind: "schema",
          type: "file",
          reference: file,
          expects: "File",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value instanceof File) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function function_(message$1) {
        return {
          kind: "schema",
          type: "function",
          reference: function_,
          expects: "Function",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (typeof dataset.value === "function") dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function instance(class_, message$1) {
        return {
          kind: "schema",
          type: "instance",
          reference: instance,
          expects: class_.name,
          async: false,
          class: class_,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value instanceof this.class) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function _merge(value1, value2) {
        if (typeof value1 === typeof value2) {
          if (value1 === value2 || value1 instanceof Date && value2 instanceof Date && +value1 === +value2) return { value: value1 };
          if (value1 && value2 && value1.constructor === Object && value2.constructor === Object) {
            for (const key in value2) if (key in value1) {
              const dataset = /* @__PURE__ */ _merge(value1[key], value2[key]);
              if (dataset.issue) return dataset;
              value1[key] = dataset.value;
            } else value1[key] = value2[key];
            return { value: value1 };
          }
          if (Array.isArray(value1) && Array.isArray(value2)) {
            if (value1.length === value2.length) {
              for (let index = 0; index < value1.length; index++) {
                const dataset = /* @__PURE__ */ _merge(value1[index], value2[index]);
                if (dataset.issue) return dataset;
                value1[index] = dataset.value;
              }
              return { value: value1 };
            }
          }
        }
        return { issue: true };
      }
      // @__NO_SIDE_EFFECTS__
      function intersect(options, message$1) {
        return {
          kind: "schema",
          type: "intersect",
          reference: intersect,
          expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "&"),
          async: false,
          options,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (this.options.length) {
              const input = dataset.value;
              let outputs;
              dataset.typed = true;
              for (const schema of this.options) {
                const optionDataset = schema["~run"]({ value: input }, config$1);
                if (optionDataset.issues) {
                  if (dataset.issues) dataset.issues.push(...optionDataset.issues);
                  else dataset.issues = optionDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!optionDataset.typed) dataset.typed = false;
                if (dataset.typed) if (outputs) outputs.push(optionDataset.value);
                else outputs = [optionDataset.value];
              }
              if (dataset.typed) {
                dataset.value = outputs[0];
                for (let index = 1; index < outputs.length; index++) {
                  const mergeDataset = /* @__PURE__ */ _merge(dataset.value, outputs[index]);
                  if (mergeDataset.issue) {
                    _addIssue(this, "type", dataset, config$1, { received: "unknown" });
                    break;
                  }
                  dataset.value = mergeDataset.value;
                }
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function intersectAsync(options, message$1) {
        return {
          kind: "schema",
          type: "intersect",
          reference: intersectAsync,
          expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "&"),
          async: true,
          options,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            if (this.options.length) {
              const input = dataset.value;
              let outputs;
              dataset.typed = true;
              const optionDatasets = await Promise.all(this.options.map((schema) => schema["~run"]({ value: input }, config$1)));
              for (const optionDataset of optionDatasets) {
                if (optionDataset.issues) {
                  if (dataset.issues) dataset.issues.push(...optionDataset.issues);
                  else dataset.issues = optionDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!optionDataset.typed) dataset.typed = false;
                if (dataset.typed) if (outputs) outputs.push(optionDataset.value);
                else outputs = [optionDataset.value];
              }
              if (dataset.typed) {
                dataset.value = outputs[0];
                for (let index = 1; index < outputs.length; index++) {
                  const mergeDataset = /* @__PURE__ */ _merge(dataset.value, outputs[index]);
                  if (mergeDataset.issue) {
                    _addIssue(this, "type", dataset, config$1, { received: "unknown" });
                    break;
                  }
                  dataset.value = mergeDataset.value;
                }
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function lazy(getter) {
        return {
          kind: "schema",
          type: "lazy",
          reference: lazy,
          expects: "unknown",
          async: false,
          getter,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            return this.getter(dataset.value)["~run"](dataset, config$1);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function lazyAsync(getter) {
        return {
          kind: "schema",
          type: "lazy",
          reference: lazyAsync,
          expects: "unknown",
          async: true,
          getter,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            return (await this.getter(dataset.value))["~run"](dataset, config$1);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function literal(literal_, message$1) {
        return {
          kind: "schema",
          type: "literal",
          reference: literal,
          expects: /* @__PURE__ */ _stringify(literal_),
          async: false,
          literal: literal_,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value === this.literal) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function looseObject(entries$1, message$1) {
        return {
          kind: "schema",
          type: "loose_object",
          reference: looseObject,
          expects: "Object",
          async: false,
          entries: entries$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input && typeof input === "object") {
              dataset.typed = true;
              dataset.value = {};
              for (const key in this.entries) {
                const valueSchema = this.entries[key];
                if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                  const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
                  const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
                  if (valueDataset.issues) {
                    const pathItem = {
                      type: "object",
                      origin: "value",
                      input,
                      key,
                      value: value$1
                    };
                    for (const issue of valueDataset.issues) {
                      if (issue.path) issue.path.unshift(pathItem);
                      else issue.path = [pathItem];
                      dataset.issues?.push(issue);
                    }
                    if (!dataset.issues) dataset.issues = valueDataset.issues;
                    if (config$1.abortEarly) {
                      dataset.typed = false;
                      break;
                    }
                  }
                  if (!valueDataset.typed) dataset.typed = false;
                  dataset.value[key] = valueDataset.value;
                } else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
                else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
                  _addIssue(this, "key", dataset, config$1, {
                    input: void 0,
                    expected: `"${key}"`,
                    path: [{
                      type: "object",
                      origin: "key",
                      input,
                      key,
                      value: input[key]
                    }]
                  });
                  if (config$1.abortEarly) break;
                }
              }
              if (!dataset.issues || !config$1.abortEarly) {
                for (const key in input) if (/* @__PURE__ */ _isValidObjectKey(input, key) && !(key in this.entries)) dataset.value[key] = input[key];
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function looseObjectAsync(entries$1, message$1) {
        return {
          kind: "schema",
          type: "loose_object",
          reference: looseObjectAsync,
          expects: "Object",
          async: true,
          entries: entries$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input && typeof input === "object") {
              dataset.typed = true;
              dataset.value = {};
              const valueDatasets = await Promise.all(Object.entries(this.entries).map(async ([key, valueSchema]) => {
                if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                  const value$1 = key in input ? input[key] : await /* @__PURE__ */ getDefault(valueSchema);
                  return [
                    key,
                    value$1,
                    valueSchema,
                    await valueSchema["~run"]({ value: value$1 }, config$1)
                  ];
                }
                return [
                  key,
                  input[key],
                  valueSchema,
                  null
                ];
              }));
              for (const [key, value$1, valueSchema, valueDataset] of valueDatasets) if (valueDataset) {
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) dataset.typed = false;
                dataset.value[key] = valueDataset.value;
              } else if (valueSchema.fallback !== void 0) dataset.value[key] = await /* @__PURE__ */ getFallback(valueSchema);
              else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
                _addIssue(this, "key", dataset, config$1, {
                  input: void 0,
                  expected: `"${key}"`,
                  path: [{
                    type: "object",
                    origin: "key",
                    input,
                    key,
                    value: value$1
                  }]
                });
                if (config$1.abortEarly) break;
              }
              if (!dataset.issues || !config$1.abortEarly) {
                for (const key in input) if (/* @__PURE__ */ _isValidObjectKey(input, key) && !(key in this.entries)) dataset.value[key] = input[key];
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function looseTuple(items, message$1) {
        return {
          kind: "schema",
          type: "loose_tuple",
          reference: looseTuple,
          expects: "Array",
          async: false,
          items,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (Array.isArray(input)) {
              dataset.typed = true;
              dataset.value = [];
              for (let key = 0; key < this.items.length; key++) {
                const value$1 = input[key];
                const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = itemDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) dataset.typed = false;
                dataset.value.push(itemDataset.value);
              }
              if (!dataset.issues || !config$1.abortEarly) for (let key = this.items.length; key < input.length; key++) dataset.value.push(input[key]);
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function looseTupleAsync(items, message$1) {
        return {
          kind: "schema",
          type: "loose_tuple",
          reference: looseTupleAsync,
          expects: "Array",
          async: true,
          items,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (Array.isArray(input)) {
              dataset.typed = true;
              dataset.value = [];
              const itemDatasets = await Promise.all(this.items.map(async (item, key) => {
                const value$1 = input[key];
                return [
                  key,
                  value$1,
                  await item["~run"]({ value: value$1 }, config$1)
                ];
              }));
              for (const [key, value$1, itemDataset] of itemDatasets) {
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = itemDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) dataset.typed = false;
                dataset.value.push(itemDataset.value);
              }
              if (!dataset.issues || !config$1.abortEarly) for (let key = this.items.length; key < input.length; key++) dataset.value.push(input[key]);
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function map(key, value$1, message$1) {
        return {
          kind: "schema",
          type: "map",
          reference: map,
          expects: "Map",
          async: false,
          key,
          value: value$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input instanceof Map) {
              dataset.typed = true;
              dataset.value = /* @__PURE__ */ new Map();
              for (const [inputKey, inputValue] of input) {
                const keyDataset = this.key["~run"]({ value: inputKey }, config$1);
                if (keyDataset.issues) {
                  const pathItem = {
                    type: "map",
                    origin: "key",
                    input,
                    key: inputKey,
                    value: inputValue
                  };
                  for (const issue of keyDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = keyDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                const valueDataset = this.value["~run"]({ value: inputValue }, config$1);
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "map",
                    origin: "value",
                    input,
                    key: inputKey,
                    value: inputValue
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
                dataset.value.set(keyDataset.value, valueDataset.value);
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function mapAsync(key, value$1, message$1) {
        return {
          kind: "schema",
          type: "map",
          reference: mapAsync,
          expects: "Map",
          async: true,
          key,
          value: value$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input instanceof Map) {
              dataset.typed = true;
              dataset.value = /* @__PURE__ */ new Map();
              const datasets = await Promise.all([...input].map(([inputKey, inputValue]) => Promise.all([
                inputKey,
                inputValue,
                this.key["~run"]({ value: inputKey }, config$1),
                this.value["~run"]({ value: inputValue }, config$1)
              ])));
              for (const [inputKey, inputValue, keyDataset, valueDataset] of datasets) {
                if (keyDataset.issues) {
                  const pathItem = {
                    type: "map",
                    origin: "key",
                    input,
                    key: inputKey,
                    value: inputValue
                  };
                  for (const issue of keyDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = keyDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "map",
                    origin: "value",
                    input,
                    key: inputKey,
                    value: inputValue
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
                dataset.value.set(keyDataset.value, valueDataset.value);
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nan(message$1) {
        return {
          kind: "schema",
          type: "nan",
          reference: nan,
          expects: "NaN",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (Number.isNaN(dataset.value)) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function never(message$1) {
        return {
          kind: "schema",
          type: "never",
          reference: never,
          expects: "never",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nonNullable(wrapped, message$1) {
        return {
          kind: "schema",
          type: "non_nullable",
          reference: nonNullable,
          expects: "!null",
          async: false,
          wrapped,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value !== null) dataset = this.wrapped["~run"](dataset, config$1);
            if (dataset.value === null) _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nonNullableAsync(wrapped, message$1) {
        return {
          kind: "schema",
          type: "non_nullable",
          reference: nonNullableAsync,
          expects: "!null",
          async: true,
          wrapped,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            if (dataset.value !== null) dataset = await this.wrapped["~run"](dataset, config$1);
            if (dataset.value === null) _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nonNullish(wrapped, message$1) {
        return {
          kind: "schema",
          type: "non_nullish",
          reference: nonNullish,
          expects: "(!null & !undefined)",
          async: false,
          wrapped,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (!(dataset.value === null || dataset.value === void 0)) dataset = this.wrapped["~run"](dataset, config$1);
            if (dataset.value === null || dataset.value === void 0) _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nonNullishAsync(wrapped, message$1) {
        return {
          kind: "schema",
          type: "non_nullish",
          reference: nonNullishAsync,
          expects: "(!null & !undefined)",
          async: true,
          wrapped,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            if (!(dataset.value === null || dataset.value === void 0)) dataset = await this.wrapped["~run"](dataset, config$1);
            if (dataset.value === null || dataset.value === void 0) _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nonOptional(wrapped, message$1) {
        return {
          kind: "schema",
          type: "non_optional",
          reference: nonOptional,
          expects: "!undefined",
          async: false,
          wrapped,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value !== void 0) dataset = this.wrapped["~run"](dataset, config$1);
            if (dataset.value === void 0) _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nonOptionalAsync(wrapped, message$1) {
        return {
          kind: "schema",
          type: "non_optional",
          reference: nonOptionalAsync,
          expects: "!undefined",
          async: true,
          wrapped,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            if (dataset.value !== void 0) dataset = await this.wrapped["~run"](dataset, config$1);
            if (dataset.value === void 0) _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function null_(message$1) {
        return {
          kind: "schema",
          type: "null",
          reference: null_,
          expects: "null",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value === null) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nullable(wrapped, default_) {
        return {
          kind: "schema",
          type: "nullable",
          reference: nullable,
          expects: `(${wrapped.expects} | null)`,
          async: false,
          wrapped,
          default: default_,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value === null) {
              if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
              if (dataset.value === null) {
                dataset.typed = true;
                return dataset;
              }
            }
            return this.wrapped["~run"](dataset, config$1);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nullableAsync(wrapped, default_) {
        return {
          kind: "schema",
          type: "nullable",
          reference: nullableAsync,
          expects: `(${wrapped.expects} | null)`,
          async: true,
          wrapped,
          default: default_,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            if (dataset.value === null) {
              if (this.default !== void 0) dataset.value = await /* @__PURE__ */ getDefault(this, dataset, config$1);
              if (dataset.value === null) {
                dataset.typed = true;
                return dataset;
              }
            }
            return this.wrapped["~run"](dataset, config$1);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nullish(wrapped, default_) {
        return {
          kind: "schema",
          type: "nullish",
          reference: nullish,
          expects: `(${wrapped.expects} | null | undefined)`,
          async: false,
          wrapped,
          default: default_,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value === null || dataset.value === void 0) {
              if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
              if (dataset.value === null || dataset.value === void 0) {
                dataset.typed = true;
                return dataset;
              }
            }
            return this.wrapped["~run"](dataset, config$1);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function nullishAsync(wrapped, default_) {
        return {
          kind: "schema",
          type: "nullish",
          reference: nullishAsync,
          expects: `(${wrapped.expects} | null | undefined)`,
          async: true,
          wrapped,
          default: default_,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            if (dataset.value === null || dataset.value === void 0) {
              if (this.default !== void 0) dataset.value = await /* @__PURE__ */ getDefault(this, dataset, config$1);
              if (dataset.value === null || dataset.value === void 0) {
                dataset.typed = true;
                return dataset;
              }
            }
            return this.wrapped["~run"](dataset, config$1);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function number(message$1) {
        return {
          kind: "schema",
          type: "number",
          reference: number,
          expects: "number",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (typeof dataset.value === "number" && !isNaN(dataset.value)) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function object(entries$1, message$1) {
        return {
          kind: "schema",
          type: "object",
          reference: object,
          expects: "Object",
          async: false,
          entries: entries$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input && typeof input === "object") {
              dataset.typed = true;
              dataset.value = {};
              for (const key in this.entries) {
                const valueSchema = this.entries[key];
                if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                  const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
                  const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
                  if (valueDataset.issues) {
                    const pathItem = {
                      type: "object",
                      origin: "value",
                      input,
                      key,
                      value: value$1
                    };
                    for (const issue of valueDataset.issues) {
                      if (issue.path) issue.path.unshift(pathItem);
                      else issue.path = [pathItem];
                      dataset.issues?.push(issue);
                    }
                    if (!dataset.issues) dataset.issues = valueDataset.issues;
                    if (config$1.abortEarly) {
                      dataset.typed = false;
                      break;
                    }
                  }
                  if (!valueDataset.typed) dataset.typed = false;
                  dataset.value[key] = valueDataset.value;
                } else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
                else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
                  _addIssue(this, "key", dataset, config$1, {
                    input: void 0,
                    expected: `"${key}"`,
                    path: [{
                      type: "object",
                      origin: "key",
                      input,
                      key,
                      value: input[key]
                    }]
                  });
                  if (config$1.abortEarly) break;
                }
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function objectAsync(entries$1, message$1) {
        return {
          kind: "schema",
          type: "object",
          reference: objectAsync,
          expects: "Object",
          async: true,
          entries: entries$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input && typeof input === "object") {
              dataset.typed = true;
              dataset.value = {};
              const valueDatasets = await Promise.all(Object.entries(this.entries).map(async ([key, valueSchema]) => {
                if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                  const value$1 = key in input ? input[key] : await /* @__PURE__ */ getDefault(valueSchema);
                  return [
                    key,
                    value$1,
                    valueSchema,
                    await valueSchema["~run"]({ value: value$1 }, config$1)
                  ];
                }
                return [
                  key,
                  input[key],
                  valueSchema,
                  null
                ];
              }));
              for (const [key, value$1, valueSchema, valueDataset] of valueDatasets) if (valueDataset) {
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) dataset.typed = false;
                dataset.value[key] = valueDataset.value;
              } else if (valueSchema.fallback !== void 0) dataset.value[key] = await /* @__PURE__ */ getFallback(valueSchema);
              else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
                _addIssue(this, "key", dataset, config$1, {
                  input: void 0,
                  expected: `"${key}"`,
                  path: [{
                    type: "object",
                    origin: "key",
                    input,
                    key,
                    value: value$1
                  }]
                });
                if (config$1.abortEarly) break;
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function objectWithRest(entries$1, rest, message$1) {
        return {
          kind: "schema",
          type: "object_with_rest",
          reference: objectWithRest,
          expects: "Object",
          async: false,
          entries: entries$1,
          rest,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input && typeof input === "object") {
              dataset.typed = true;
              dataset.value = {};
              for (const key in this.entries) {
                const valueSchema = this.entries[key];
                if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                  const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
                  const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
                  if (valueDataset.issues) {
                    const pathItem = {
                      type: "object",
                      origin: "value",
                      input,
                      key,
                      value: value$1
                    };
                    for (const issue of valueDataset.issues) {
                      if (issue.path) issue.path.unshift(pathItem);
                      else issue.path = [pathItem];
                      dataset.issues?.push(issue);
                    }
                    if (!dataset.issues) dataset.issues = valueDataset.issues;
                    if (config$1.abortEarly) {
                      dataset.typed = false;
                      break;
                    }
                  }
                  if (!valueDataset.typed) dataset.typed = false;
                  dataset.value[key] = valueDataset.value;
                } else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
                else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
                  _addIssue(this, "key", dataset, config$1, {
                    input: void 0,
                    expected: `"${key}"`,
                    path: [{
                      type: "object",
                      origin: "key",
                      input,
                      key,
                      value: input[key]
                    }]
                  });
                  if (config$1.abortEarly) break;
                }
              }
              if (!dataset.issues || !config$1.abortEarly) {
                for (const key in input) if (/* @__PURE__ */ _isValidObjectKey(input, key) && !(key in this.entries)) {
                  const valueDataset = this.rest["~run"]({ value: input[key] }, config$1);
                  if (valueDataset.issues) {
                    const pathItem = {
                      type: "object",
                      origin: "value",
                      input,
                      key,
                      value: input[key]
                    };
                    for (const issue of valueDataset.issues) {
                      if (issue.path) issue.path.unshift(pathItem);
                      else issue.path = [pathItem];
                      dataset.issues?.push(issue);
                    }
                    if (!dataset.issues) dataset.issues = valueDataset.issues;
                    if (config$1.abortEarly) {
                      dataset.typed = false;
                      break;
                    }
                  }
                  if (!valueDataset.typed) dataset.typed = false;
                  dataset.value[key] = valueDataset.value;
                }
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function objectWithRestAsync(entries$1, rest, message$1) {
        return {
          kind: "schema",
          type: "object_with_rest",
          reference: objectWithRestAsync,
          expects: "Object",
          async: true,
          entries: entries$1,
          rest,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input && typeof input === "object") {
              dataset.typed = true;
              dataset.value = {};
              const [normalDatasets, restDatasets] = await Promise.all([Promise.all(Object.entries(this.entries).map(async ([key, valueSchema]) => {
                if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                  const value$1 = key in input ? input[key] : await /* @__PURE__ */ getDefault(valueSchema);
                  return [
                    key,
                    value$1,
                    valueSchema,
                    await valueSchema["~run"]({ value: value$1 }, config$1)
                  ];
                }
                return [
                  key,
                  input[key],
                  valueSchema,
                  null
                ];
              })), Promise.all(Object.entries(input).filter(([key]) => /* @__PURE__ */ _isValidObjectKey(input, key) && !(key in this.entries)).map(async ([key, value$1]) => [
                key,
                value$1,
                await this.rest["~run"]({ value: value$1 }, config$1)
              ]))]);
              for (const [key, value$1, valueSchema, valueDataset] of normalDatasets) if (valueDataset) {
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) dataset.typed = false;
                dataset.value[key] = valueDataset.value;
              } else if (valueSchema.fallback !== void 0) dataset.value[key] = await /* @__PURE__ */ getFallback(valueSchema);
              else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
                _addIssue(this, "key", dataset, config$1, {
                  input: void 0,
                  expected: `"${key}"`,
                  path: [{
                    type: "object",
                    origin: "key",
                    input,
                    key,
                    value: value$1
                  }]
                });
                if (config$1.abortEarly) break;
              }
              if (!dataset.issues || !config$1.abortEarly) for (const [key, value$1, valueDataset] of restDatasets) {
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) dataset.typed = false;
                dataset.value[key] = valueDataset.value;
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function optional(wrapped, default_) {
        return {
          kind: "schema",
          type: "optional",
          reference: optional,
          expects: `(${wrapped.expects} | undefined)`,
          async: false,
          wrapped,
          default: default_,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value === void 0) {
              if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
              if (dataset.value === void 0) {
                dataset.typed = true;
                return dataset;
              }
            }
            return this.wrapped["~run"](dataset, config$1);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function optionalAsync(wrapped, default_) {
        return {
          kind: "schema",
          type: "optional",
          reference: optionalAsync,
          expects: `(${wrapped.expects} | undefined)`,
          async: true,
          wrapped,
          default: default_,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            if (dataset.value === void 0) {
              if (this.default !== void 0) dataset.value = await /* @__PURE__ */ getDefault(this, dataset, config$1);
              if (dataset.value === void 0) {
                dataset.typed = true;
                return dataset;
              }
            }
            return this.wrapped["~run"](dataset, config$1);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function picklist(options, message$1) {
        return {
          kind: "schema",
          type: "picklist",
          reference: picklist,
          expects: /* @__PURE__ */ _joinExpects(options.map(_stringify), "|"),
          async: false,
          options,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (this.options.includes(dataset.value)) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function promise(message$1) {
        return {
          kind: "schema",
          type: "promise",
          reference: promise,
          expects: "Promise",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value instanceof Promise) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function record(key, value$1, message$1) {
        return {
          kind: "schema",
          type: "record",
          reference: record,
          expects: "Object",
          async: false,
          key,
          value: value$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input && typeof input === "object") {
              dataset.typed = true;
              dataset.value = {};
              for (const entryKey in input) if (/* @__PURE__ */ _isValidObjectKey(input, entryKey)) {
                const entryValue = input[entryKey];
                const keyDataset = this.key["~run"]({ value: entryKey }, config$1);
                if (keyDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "key",
                    input,
                    key: entryKey,
                    value: entryValue
                  };
                  for (const issue of keyDataset.issues) {
                    issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = keyDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                const valueDataset = this.value["~run"]({ value: entryValue }, config$1);
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key: entryKey,
                    value: entryValue
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
                if (keyDataset.typed) dataset.value[keyDataset.value] = valueDataset.value;
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function recordAsync(key, value$1, message$1) {
        return {
          kind: "schema",
          type: "record",
          reference: recordAsync,
          expects: "Object",
          async: true,
          key,
          value: value$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input && typeof input === "object") {
              dataset.typed = true;
              dataset.value = {};
              const datasets = await Promise.all(Object.entries(input).filter(([key$1]) => /* @__PURE__ */ _isValidObjectKey(input, key$1)).map(([entryKey, entryValue]) => Promise.all([
                entryKey,
                entryValue,
                this.key["~run"]({ value: entryKey }, config$1),
                this.value["~run"]({ value: entryValue }, config$1)
              ])));
              for (const [entryKey, entryValue, keyDataset, valueDataset] of datasets) {
                if (keyDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "key",
                    input,
                    key: entryKey,
                    value: entryValue
                  };
                  for (const issue of keyDataset.issues) {
                    issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = keyDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key: entryKey,
                    value: entryValue
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
                if (keyDataset.typed) dataset.value[keyDataset.value] = valueDataset.value;
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function set(value$1, message$1) {
        return {
          kind: "schema",
          type: "set",
          reference: set,
          expects: "Set",
          async: false,
          value: value$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input instanceof Set) {
              dataset.typed = true;
              dataset.value = /* @__PURE__ */ new Set();
              for (const inputValue of input) {
                const valueDataset = this.value["~run"]({ value: inputValue }, config$1);
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "set",
                    origin: "value",
                    input,
                    key: null,
                    value: inputValue
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) dataset.typed = false;
                dataset.value.add(valueDataset.value);
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function setAsync(value$1, message$1) {
        return {
          kind: "schema",
          type: "set",
          reference: setAsync,
          expects: "Set",
          async: true,
          value: value$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input instanceof Set) {
              dataset.typed = true;
              dataset.value = /* @__PURE__ */ new Set();
              const valueDatasets = await Promise.all([...input].map(async (inputValue) => [inputValue, await this.value["~run"]({ value: inputValue }, config$1)]));
              for (const [inputValue, valueDataset] of valueDatasets) {
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "set",
                    origin: "value",
                    input,
                    key: null,
                    value: inputValue
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) dataset.typed = false;
                dataset.value.add(valueDataset.value);
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function strictObject(entries$1, message$1) {
        return {
          kind: "schema",
          type: "strict_object",
          reference: strictObject,
          expects: "Object",
          async: false,
          entries: entries$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input && typeof input === "object") {
              dataset.typed = true;
              dataset.value = {};
              for (const key in this.entries) {
                const valueSchema = this.entries[key];
                if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                  const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
                  const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
                  if (valueDataset.issues) {
                    const pathItem = {
                      type: "object",
                      origin: "value",
                      input,
                      key,
                      value: value$1
                    };
                    for (const issue of valueDataset.issues) {
                      if (issue.path) issue.path.unshift(pathItem);
                      else issue.path = [pathItem];
                      dataset.issues?.push(issue);
                    }
                    if (!dataset.issues) dataset.issues = valueDataset.issues;
                    if (config$1.abortEarly) {
                      dataset.typed = false;
                      break;
                    }
                  }
                  if (!valueDataset.typed) dataset.typed = false;
                  dataset.value[key] = valueDataset.value;
                } else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
                else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
                  _addIssue(this, "key", dataset, config$1, {
                    input: void 0,
                    expected: `"${key}"`,
                    path: [{
                      type: "object",
                      origin: "key",
                      input,
                      key,
                      value: input[key]
                    }]
                  });
                  if (config$1.abortEarly) break;
                }
              }
              if (!dataset.issues || !config$1.abortEarly) {
                for (const key in input) if (!(key in this.entries)) {
                  _addIssue(this, "key", dataset, config$1, {
                    input: key,
                    expected: "never",
                    path: [{
                      type: "object",
                      origin: "key",
                      input,
                      key,
                      value: input[key]
                    }]
                  });
                  break;
                }
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function strictObjectAsync(entries$1, message$1) {
        return {
          kind: "schema",
          type: "strict_object",
          reference: strictObjectAsync,
          expects: "Object",
          async: true,
          entries: entries$1,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input && typeof input === "object") {
              dataset.typed = true;
              dataset.value = {};
              const valueDatasets = await Promise.all(Object.entries(this.entries).map(async ([key, valueSchema]) => {
                if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                  const value$1 = key in input ? input[key] : await /* @__PURE__ */ getDefault(valueSchema);
                  return [
                    key,
                    value$1,
                    valueSchema,
                    await valueSchema["~run"]({ value: value$1 }, config$1)
                  ];
                }
                return [
                  key,
                  input[key],
                  valueSchema,
                  null
                ];
              }));
              for (const [key, value$1, valueSchema, valueDataset] of valueDatasets) if (valueDataset) {
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) dataset.typed = false;
                dataset.value[key] = valueDataset.value;
              } else if (valueSchema.fallback !== void 0) dataset.value[key] = await /* @__PURE__ */ getFallback(valueSchema);
              else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
                _addIssue(this, "key", dataset, config$1, {
                  input: void 0,
                  expected: `"${key}"`,
                  path: [{
                    type: "object",
                    origin: "key",
                    input,
                    key,
                    value: value$1
                  }]
                });
                if (config$1.abortEarly) break;
              }
              if (!dataset.issues || !config$1.abortEarly) {
                for (const key in input) if (!(key in this.entries)) {
                  _addIssue(this, "key", dataset, config$1, {
                    input: key,
                    expected: "never",
                    path: [{
                      type: "object",
                      origin: "key",
                      input,
                      key,
                      value: input[key]
                    }]
                  });
                  break;
                }
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function strictTuple(items, message$1) {
        return {
          kind: "schema",
          type: "strict_tuple",
          reference: strictTuple,
          expects: "Array",
          async: false,
          items,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (Array.isArray(input)) {
              dataset.typed = true;
              dataset.value = [];
              for (let key = 0; key < this.items.length; key++) {
                const value$1 = input[key];
                const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = itemDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) dataset.typed = false;
                dataset.value.push(itemDataset.value);
              }
              if (!(dataset.issues && config$1.abortEarly) && this.items.length < input.length) _addIssue(this, "type", dataset, config$1, {
                input: input[this.items.length],
                expected: "never",
                path: [{
                  type: "array",
                  origin: "value",
                  input,
                  key: this.items.length,
                  value: input[this.items.length]
                }]
              });
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function strictTupleAsync(items, message$1) {
        return {
          kind: "schema",
          type: "strict_tuple",
          reference: strictTupleAsync,
          expects: "Array",
          async: true,
          items,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (Array.isArray(input)) {
              dataset.typed = true;
              dataset.value = [];
              const itemDatasets = await Promise.all(this.items.map(async (item, key) => {
                const value$1 = input[key];
                return [
                  key,
                  value$1,
                  await item["~run"]({ value: value$1 }, config$1)
                ];
              }));
              for (const [key, value$1, itemDataset] of itemDatasets) {
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = itemDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) dataset.typed = false;
                dataset.value.push(itemDataset.value);
              }
              if (!(dataset.issues && config$1.abortEarly) && this.items.length < input.length) _addIssue(this, "type", dataset, config$1, {
                input: input[this.items.length],
                expected: "never",
                path: [{
                  type: "array",
                  origin: "value",
                  input,
                  key: this.items.length,
                  value: input[this.items.length]
                }]
              });
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function string(message$1) {
        return {
          kind: "schema",
          type: "string",
          reference: string,
          expects: "string",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (typeof dataset.value === "string") dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function symbol(message$1) {
        return {
          kind: "schema",
          type: "symbol",
          reference: symbol,
          expects: "symbol",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (typeof dataset.value === "symbol") dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function tuple(items, message$1) {
        return {
          kind: "schema",
          type: "tuple",
          reference: tuple,
          expects: "Array",
          async: false,
          items,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (Array.isArray(input)) {
              dataset.typed = true;
              dataset.value = [];
              for (let key = 0; key < this.items.length; key++) {
                const value$1 = input[key];
                const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = itemDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) dataset.typed = false;
                dataset.value.push(itemDataset.value);
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function tupleAsync(items, message$1) {
        return {
          kind: "schema",
          type: "tuple",
          reference: tupleAsync,
          expects: "Array",
          async: true,
          items,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (Array.isArray(input)) {
              dataset.typed = true;
              dataset.value = [];
              const itemDatasets = await Promise.all(this.items.map(async (item, key) => {
                const value$1 = input[key];
                return [
                  key,
                  value$1,
                  await item["~run"]({ value: value$1 }, config$1)
                ];
              }));
              for (const [key, value$1, itemDataset] of itemDatasets) {
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = itemDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) dataset.typed = false;
                dataset.value.push(itemDataset.value);
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function tupleWithRest(items, rest, message$1) {
        return {
          kind: "schema",
          type: "tuple_with_rest",
          reference: tupleWithRest,
          expects: "Array",
          async: false,
          items,
          rest,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (Array.isArray(input)) {
              dataset.typed = true;
              dataset.value = [];
              for (let key = 0; key < this.items.length; key++) {
                const value$1 = input[key];
                const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = itemDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) dataset.typed = false;
                dataset.value.push(itemDataset.value);
              }
              if (!dataset.issues || !config$1.abortEarly) for (let key = this.items.length; key < input.length; key++) {
                const value$1 = input[key];
                const itemDataset = this.rest["~run"]({ value: value$1 }, config$1);
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = itemDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) dataset.typed = false;
                dataset.value.push(itemDataset.value);
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function tupleWithRestAsync(items, rest, message$1) {
        return {
          kind: "schema",
          type: "tuple_with_rest",
          reference: tupleWithRestAsync,
          expects: "Array",
          async: true,
          items,
          rest,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (Array.isArray(input)) {
              dataset.typed = true;
              dataset.value = [];
              const [normalDatasets, restDatasets] = await Promise.all([Promise.all(this.items.map(async (item, key) => {
                const value$1 = input[key];
                return [
                  key,
                  value$1,
                  await item["~run"]({ value: value$1 }, config$1)
                ];
              })), Promise.all(input.slice(this.items.length).map(async (value$1, key) => {
                return [
                  key + this.items.length,
                  value$1,
                  await this.rest["~run"]({ value: value$1 }, config$1)
                ];
              }))]);
              for (const [key, value$1, itemDataset] of normalDatasets) {
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = itemDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) dataset.typed = false;
                dataset.value.push(itemDataset.value);
              }
              if (!dataset.issues || !config$1.abortEarly) for (const [key, value$1, itemDataset] of restDatasets) {
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = itemDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) dataset.typed = false;
                dataset.value.push(itemDataset.value);
              }
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function undefined_(message$1) {
        return {
          kind: "schema",
          type: "undefined",
          reference: undefined_,
          expects: "undefined",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value === void 0) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function undefinedable(wrapped, default_) {
        return {
          kind: "schema",
          type: "undefinedable",
          reference: undefinedable,
          expects: `(${wrapped.expects} | undefined)`,
          async: false,
          wrapped,
          default: default_,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value === void 0) {
              if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
              if (dataset.value === void 0) {
                dataset.typed = true;
                return dataset;
              }
            }
            return this.wrapped["~run"](dataset, config$1);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function undefinedableAsync(wrapped, default_) {
        return {
          kind: "schema",
          type: "undefinedable",
          reference: undefinedableAsync,
          expects: `(${wrapped.expects} | undefined)`,
          async: true,
          wrapped,
          default: default_,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            if (dataset.value === void 0) {
              if (this.default !== void 0) dataset.value = await /* @__PURE__ */ getDefault(this, dataset, config$1);
              if (dataset.value === void 0) {
                dataset.typed = true;
                return dataset;
              }
            }
            return this.wrapped["~run"](dataset, config$1);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function _subIssues(datasets) {
        let issues;
        if (datasets) for (const dataset of datasets) if (issues) issues.push(...dataset.issues);
        else issues = dataset.issues;
        return issues;
      }
      // @__NO_SIDE_EFFECTS__
      function union(options, message$1) {
        return {
          kind: "schema",
          type: "union",
          reference: union,
          expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "|"),
          async: false,
          options,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            let validDataset;
            let typedDatasets;
            let untypedDatasets;
            for (const schema of this.options) {
              const optionDataset = schema["~run"]({ value: dataset.value }, config$1);
              if (optionDataset.typed) if (optionDataset.issues) if (typedDatasets) typedDatasets.push(optionDataset);
              else typedDatasets = [optionDataset];
              else {
                validDataset = optionDataset;
                break;
              }
              else if (untypedDatasets) untypedDatasets.push(optionDataset);
              else untypedDatasets = [optionDataset];
            }
            if (validDataset) return validDataset;
            if (typedDatasets) {
              if (typedDatasets.length === 1) return typedDatasets[0];
              _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(typedDatasets) });
              dataset.typed = true;
            } else if (untypedDatasets?.length === 1) return untypedDatasets[0];
            else _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(untypedDatasets) });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function unionAsync(options, message$1) {
        return {
          kind: "schema",
          type: "union",
          reference: unionAsync,
          expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "|"),
          async: true,
          options,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            let validDataset;
            let typedDatasets;
            let untypedDatasets;
            for (const schema of this.options) {
              const optionDataset = await schema["~run"]({ value: dataset.value }, config$1);
              if (optionDataset.typed) if (optionDataset.issues) if (typedDatasets) typedDatasets.push(optionDataset);
              else typedDatasets = [optionDataset];
              else {
                validDataset = optionDataset;
                break;
              }
              else if (untypedDatasets) untypedDatasets.push(optionDataset);
              else untypedDatasets = [optionDataset];
            }
            if (validDataset) return validDataset;
            if (typedDatasets) {
              if (typedDatasets.length === 1) return typedDatasets[0];
              _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(typedDatasets) });
              dataset.typed = true;
            } else if (untypedDatasets?.length === 1) return untypedDatasets[0];
            else _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(untypedDatasets) });
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function unknown() {
        return {
          kind: "schema",
          type: "unknown",
          reference: unknown,
          expects: "unknown",
          async: false,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset) {
            dataset.typed = true;
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function variant(key, options, message$1) {
        return {
          kind: "schema",
          type: "variant",
          reference: variant,
          expects: "Object",
          async: false,
          key,
          options,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input && typeof input === "object") {
              let outputDataset;
              let maxDiscriminatorPriority = 0;
              let invalidDiscriminatorKey = this.key;
              let expectedDiscriminators = [];
              const parseOptions = (variant$1, allKeys) => {
                for (const schema of variant$1.options) {
                  if (schema.type === "variant") parseOptions(schema, new Set(allKeys).add(schema.key));
                  else {
                    let keysAreValid = true;
                    let currentPriority = 0;
                    for (const currentKey of allKeys) {
                      const discriminatorSchema = schema.entries[currentKey];
                      if (currentKey in input ? discriminatorSchema["~run"]({
                        typed: false,
                        value: input[currentKey]
                      }, { abortEarly: true }).issues : discriminatorSchema.type !== "exact_optional" && discriminatorSchema.type !== "optional" && discriminatorSchema.type !== "nullish") {
                        keysAreValid = false;
                        if (invalidDiscriminatorKey !== currentKey && (maxDiscriminatorPriority < currentPriority || maxDiscriminatorPriority === currentPriority && currentKey in input && !(invalidDiscriminatorKey in input))) {
                          maxDiscriminatorPriority = currentPriority;
                          invalidDiscriminatorKey = currentKey;
                          expectedDiscriminators = [];
                        }
                        if (invalidDiscriminatorKey === currentKey) expectedDiscriminators.push(schema.entries[currentKey].expects);
                        break;
                      }
                      currentPriority++;
                    }
                    if (keysAreValid) {
                      const optionDataset = schema["~run"]({ value: input }, config$1);
                      if (!outputDataset || !outputDataset.typed && optionDataset.typed) outputDataset = optionDataset;
                    }
                  }
                  if (outputDataset && !outputDataset.issues) break;
                }
              };
              parseOptions(this, /* @__PURE__ */ new Set([this.key]));
              if (outputDataset) return outputDataset;
              _addIssue(this, "type", dataset, config$1, {
                input: input[invalidDiscriminatorKey],
                expected: /* @__PURE__ */ _joinExpects(expectedDiscriminators, "|"),
                path: [{
                  type: "object",
                  origin: "value",
                  input,
                  key: invalidDiscriminatorKey,
                  value: input[invalidDiscriminatorKey]
                }]
              });
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function variantAsync(key, options, message$1) {
        return {
          kind: "schema",
          type: "variant",
          reference: variantAsync,
          expects: "Object",
          async: true,
          key,
          options,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            const input = dataset.value;
            if (input && typeof input === "object") {
              let outputDataset;
              let maxDiscriminatorPriority = 0;
              let invalidDiscriminatorKey = this.key;
              let expectedDiscriminators = [];
              const parseOptions = async (variant$1, allKeys) => {
                for (const schema of variant$1.options) {
                  if (schema.type === "variant") await parseOptions(schema, new Set(allKeys).add(schema.key));
                  else {
                    let keysAreValid = true;
                    let currentPriority = 0;
                    for (const currentKey of allKeys) {
                      const discriminatorSchema = schema.entries[currentKey];
                      if (currentKey in input ? (await discriminatorSchema["~run"]({
                        typed: false,
                        value: input[currentKey]
                      }, { abortEarly: true })).issues : discriminatorSchema.type !== "exact_optional" && discriminatorSchema.type !== "optional" && discriminatorSchema.type !== "nullish") {
                        keysAreValid = false;
                        if (invalidDiscriminatorKey !== currentKey && (maxDiscriminatorPriority < currentPriority || maxDiscriminatorPriority === currentPriority && currentKey in input && !(invalidDiscriminatorKey in input))) {
                          maxDiscriminatorPriority = currentPriority;
                          invalidDiscriminatorKey = currentKey;
                          expectedDiscriminators = [];
                        }
                        if (invalidDiscriminatorKey === currentKey) expectedDiscriminators.push(schema.entries[currentKey].expects);
                        break;
                      }
                      currentPriority++;
                    }
                    if (keysAreValid) {
                      const optionDataset = await schema["~run"]({ value: input }, config$1);
                      if (!outputDataset || !outputDataset.typed && optionDataset.typed) outputDataset = optionDataset;
                    }
                  }
                  if (outputDataset && !outputDataset.issues) break;
                }
              };
              await parseOptions(this, /* @__PURE__ */ new Set([this.key]));
              if (outputDataset) return outputDataset;
              _addIssue(this, "type", dataset, config$1, {
                input: input[invalidDiscriminatorKey],
                expected: /* @__PURE__ */ _joinExpects(expectedDiscriminators, "|"),
                path: [{
                  type: "object",
                  origin: "value",
                  input,
                  key: invalidDiscriminatorKey,
                  value: input[invalidDiscriminatorKey]
                }]
              });
            } else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function void_(message$1) {
        return {
          kind: "schema",
          type: "void",
          reference: void_,
          expects: "void",
          async: false,
          message: message$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            if (dataset.value === void 0) dataset.typed = true;
            else _addIssue(this, "type", dataset, config$1);
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function keyof(schema, message$1) {
        return /* @__PURE__ */ picklist(Object.keys(schema.entries), message$1);
      }
      // @__NO_SIDE_EFFECTS__
      function message(schema, message_) {
        return {
          ...schema,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            return schema["~run"](dataset, {
              ...config$1,
              message: message_
            });
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function omit(schema, keys) {
        const entries$1 = { ...schema.entries };
        for (const key of keys) delete entries$1[key];
        return {
          ...schema,
          entries: entries$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          }
        };
      }
      function parse(schema, input, config$1) {
        const dataset = schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
        if (dataset.issues) throw new ValiError(dataset.issues);
        return dataset.value;
      }
      async function parseAsync(schema, input, config$1) {
        const dataset = await schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
        if (dataset.issues) throw new ValiError(dataset.issues);
        return dataset.value;
      }
      // @__NO_SIDE_EFFECTS__
      function parser(schema, config$1) {
        const func = (input) => parse(schema, input, config$1);
        func.schema = schema;
        func.config = config$1;
        return func;
      }
      // @__NO_SIDE_EFFECTS__
      function parserAsync(schema, config$1) {
        const func = (input) => parseAsync(schema, input, config$1);
        func.schema = schema;
        func.config = config$1;
        return func;
      }
      // @__NO_SIDE_EFFECTS__
      function partial(schema, keys) {
        const entries$1 = {};
        for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ optional(schema.entries[key]) : schema.entries[key];
        return {
          ...schema,
          entries: entries$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function partialAsync(schema, keys) {
        const entries$1 = {};
        for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ optionalAsync(schema.entries[key]) : schema.entries[key];
        return {
          ...schema,
          entries: entries$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function pick(schema, keys) {
        const entries$1 = {};
        for (const key of keys) entries$1[key] = schema.entries[key];
        return {
          ...schema,
          entries: entries$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function pipe(...pipe$1) {
        return {
          ...pipe$1[0],
          pipe: pipe$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          "~run"(dataset, config$1) {
            for (const item of pipe$1) if (item.kind !== "metadata") {
              if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
                dataset.typed = false;
                break;
              }
              if (!dataset.issues || !config$1.abortEarly && !config$1.abortPipeEarly) dataset = item["~run"](dataset, config$1);
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function pipeAsync(...pipe$1) {
        return {
          ...pipe$1[0],
          pipe: pipe$1,
          async: true,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          },
          async "~run"(dataset, config$1) {
            for (const item of pipe$1) if (item.kind !== "metadata") {
              if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
                dataset.typed = false;
                break;
              }
              if (!dataset.issues || !config$1.abortEarly && !config$1.abortPipeEarly) dataset = await item["~run"](dataset, config$1);
            }
            return dataset;
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function required(schema, arg2, arg3) {
        const keys = Array.isArray(arg2) ? arg2 : void 0;
        const message$1 = Array.isArray(arg2) ? arg3 : arg2;
        const entries$1 = {};
        for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ nonOptional(schema.entries[key], message$1) : schema.entries[key];
        return {
          ...schema,
          entries: entries$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function requiredAsync(schema, arg2, arg3) {
        const keys = Array.isArray(arg2) ? arg2 : void 0;
        const message$1 = Array.isArray(arg2) ? arg3 : arg2;
        const entries$1 = {};
        for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ nonOptionalAsync(schema.entries[key], message$1) : schema.entries[key];
        return {
          ...schema,
          entries: entries$1,
          get "~standard"() {
            return /* @__PURE__ */ _getStandardProps(this);
          }
        };
      }
      // @__NO_SIDE_EFFECTS__
      function safeParse(schema, input, config$1) {
        const dataset = schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
        return {
          typed: dataset.typed,
          success: !dataset.issues,
          output: dataset.value,
          issues: dataset.issues
        };
      }
      // @__NO_SIDE_EFFECTS__
      async function safeParseAsync(schema, input, config$1) {
        const dataset = await schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
        return {
          typed: dataset.typed,
          success: !dataset.issues,
          output: dataset.value,
          issues: dataset.issues
        };
      }
      // @__NO_SIDE_EFFECTS__
      function safeParser(schema, config$1) {
        const func = (input) => /* @__PURE__ */ safeParse(schema, input, config$1);
        func.schema = schema;
        func.config = config$1;
        return func;
      }
      // @__NO_SIDE_EFFECTS__
      function safeParserAsync(schema, config$1) {
        const func = (input) => /* @__PURE__ */ safeParseAsync(schema, input, config$1);
        func.schema = schema;
        func.config = config$1;
        return func;
      }
      // @__NO_SIDE_EFFECTS__
      function summarize(issues) {
        let summary = "";
        for (const issue of issues) {
          if (summary) summary += "\n";
          summary += `\xD7 ${issue.message}`;
          const dotPath = /* @__PURE__ */ getDotPath(issue);
          if (dotPath) summary += `
  \u2192 at ${dotPath}`;
        }
        return summary;
      }
      // @__NO_SIDE_EFFECTS__
      function unwrap(schema) {
        return schema.wrapped;
      }
      exports.BASE64_REGEX = BASE64_REGEX;
      exports.BIC_REGEX = BIC_REGEX;
      exports.CUID2_REGEX = CUID2_REGEX;
      exports.DECIMAL_REGEX = DECIMAL_REGEX;
      exports.DIGITS_REGEX = DIGITS_REGEX;
      exports.EMAIL_REGEX = EMAIL_REGEX;
      exports.EMOJI_REGEX = EMOJI_REGEX;
      exports.HEXADECIMAL_REGEX = HEXADECIMAL_REGEX;
      exports.HEX_COLOR_REGEX = HEX_COLOR_REGEX;
      exports.IMEI_REGEX = IMEI_REGEX;
      exports.IPV4_REGEX = IPV4_REGEX;
      exports.IPV6_REGEX = IPV6_REGEX;
      exports.IP_REGEX = IP_REGEX;
      exports.ISO_DATE_REGEX = ISO_DATE_REGEX;
      exports.ISO_DATE_TIME_REGEX = ISO_DATE_TIME_REGEX;
      exports.ISO_TIMESTAMP_REGEX = ISO_TIMESTAMP_REGEX;
      exports.ISO_TIME_REGEX = ISO_TIME_REGEX;
      exports.ISO_TIME_SECOND_REGEX = ISO_TIME_SECOND_REGEX;
      exports.ISO_WEEK_REGEX = ISO_WEEK_REGEX;
      exports.MAC48_REGEX = MAC48_REGEX;
      exports.MAC64_REGEX = MAC64_REGEX;
      exports.MAC_REGEX = MAC_REGEX;
      exports.NANO_ID_REGEX = NANO_ID_REGEX;
      exports.OCTAL_REGEX = OCTAL_REGEX;
      exports.RFC_EMAIL_REGEX = RFC_EMAIL_REGEX;
      exports.SLUG_REGEX = SLUG_REGEX;
      exports.ULID_REGEX = ULID_REGEX;
      exports.UUID_REGEX = UUID_REGEX;
      exports.ValiError = ValiError;
      exports._addIssue = _addIssue;
      exports._getByteCount = _getByteCount;
      exports._getGraphemeCount = _getGraphemeCount;
      exports._getLastMetadata = _getLastMetadata;
      exports._getStandardProps = _getStandardProps;
      exports._getWordCount = _getWordCount;
      exports._isLuhnAlgo = _isLuhnAlgo;
      exports._isValidObjectKey = _isValidObjectKey;
      exports._joinExpects = _joinExpects;
      exports._stringify = _stringify;
      exports.any = any;
      exports.args = args;
      exports.argsAsync = argsAsync;
      exports.array = array;
      exports.arrayAsync = arrayAsync;
      exports.assert = assert;
      exports.awaitAsync = awaitAsync;
      exports.base64 = base64;
      exports.bic = bic;
      exports.bigint = bigint;
      exports.blob = blob;
      exports.boolean = boolean;
      exports.brand = brand;
      exports.bytes = bytes;
      exports.check = check;
      exports.checkAsync = checkAsync;
      exports.checkItems = checkItems;
      exports.checkItemsAsync = checkItemsAsync;
      exports.config = config;
      exports.creditCard = creditCard;
      exports.cuid2 = cuid2;
      exports.custom = custom;
      exports.customAsync = customAsync;
      exports.date = date;
      exports.decimal = decimal;
      exports.deleteGlobalConfig = deleteGlobalConfig;
      exports.deleteGlobalMessage = deleteGlobalMessage;
      exports.deleteSchemaMessage = deleteSchemaMessage;
      exports.deleteSpecificMessage = deleteSpecificMessage;
      exports.description = description;
      exports.digits = digits;
      exports.email = email;
      exports.emoji = emoji;
      exports.empty = empty;
      exports.endsWith = endsWith;
      exports.entries = entries;
      exports.entriesFromList = entriesFromList;
      exports.entriesFromObjects = entriesFromObjects;
      exports.enum = enum_;
      exports.enum_ = enum_;
      exports.everyItem = everyItem;
      exports.exactOptional = exactOptional;
      exports.exactOptionalAsync = exactOptionalAsync;
      exports.examples = examples;
      exports.excludes = excludes;
      exports.fallback = fallback;
      exports.fallbackAsync = fallbackAsync;
      exports.file = file;
      exports.filterItems = filterItems;
      exports.findItem = findItem;
      exports.finite = finite;
      exports.flatten = flatten;
      exports.flavor = flavor;
      exports.forward = forward;
      exports.forwardAsync = forwardAsync;
      exports.function = function_;
      exports.function_ = function_;
      exports.getDefault = getDefault;
      exports.getDefaults = getDefaults;
      exports.getDefaultsAsync = getDefaultsAsync;
      exports.getDescription = getDescription;
      exports.getDotPath = getDotPath;
      exports.getExamples = getExamples;
      exports.getFallback = getFallback;
      exports.getFallbacks = getFallbacks;
      exports.getFallbacksAsync = getFallbacksAsync;
      exports.getGlobalConfig = getGlobalConfig;
      exports.getGlobalMessage = getGlobalMessage;
      exports.getMetadata = getMetadata;
      exports.getSchemaMessage = getSchemaMessage;
      exports.getSpecificMessage = getSpecificMessage;
      exports.getTitle = getTitle;
      exports.graphemes = graphemes;
      exports.gtValue = gtValue;
      exports.hash = hash;
      exports.hexColor = hexColor;
      exports.hexadecimal = hexadecimal;
      exports.imei = imei;
      exports.includes = includes;
      exports.instance = instance;
      exports.integer = integer;
      exports.intersect = intersect;
      exports.intersectAsync = intersectAsync;
      exports.ip = ip;
      exports.ipv4 = ipv4;
      exports.ipv6 = ipv6;
      exports.is = is;
      exports.isOfKind = isOfKind;
      exports.isOfType = isOfType;
      exports.isValiError = isValiError;
      exports.isoDate = isoDate;
      exports.isoDateTime = isoDateTime;
      exports.isoTime = isoTime;
      exports.isoTimeSecond = isoTimeSecond;
      exports.isoTimestamp = isoTimestamp;
      exports.isoWeek = isoWeek;
      exports.keyof = keyof;
      exports.lazy = lazy;
      exports.lazyAsync = lazyAsync;
      exports.length = length;
      exports.literal = literal;
      exports.looseObject = looseObject;
      exports.looseObjectAsync = looseObjectAsync;
      exports.looseTuple = looseTuple;
      exports.looseTupleAsync = looseTupleAsync;
      exports.ltValue = ltValue;
      exports.mac = mac;
      exports.mac48 = mac48;
      exports.mac64 = mac64;
      exports.map = map;
      exports.mapAsync = mapAsync;
      exports.mapItems = mapItems;
      exports.maxBytes = maxBytes;
      exports.maxEntries = maxEntries;
      exports.maxGraphemes = maxGraphemes;
      exports.maxLength = maxLength;
      exports.maxSize = maxSize;
      exports.maxValue = maxValue;
      exports.maxWords = maxWords;
      exports.message = message;
      exports.metadata = metadata;
      exports.mimeType = mimeType;
      exports.minBytes = minBytes;
      exports.minEntries = minEntries;
      exports.minGraphemes = minGraphemes;
      exports.minLength = minLength;
      exports.minSize = minSize;
      exports.minValue = minValue;
      exports.minWords = minWords;
      exports.multipleOf = multipleOf;
      exports.nan = nan;
      exports.nanoid = nanoid;
      exports.never = never;
      exports.nonEmpty = nonEmpty;
      exports.nonNullable = nonNullable;
      exports.nonNullableAsync = nonNullableAsync;
      exports.nonNullish = nonNullish;
      exports.nonNullishAsync = nonNullishAsync;
      exports.nonOptional = nonOptional;
      exports.nonOptionalAsync = nonOptionalAsync;
      exports.normalize = normalize;
      exports.notBytes = notBytes;
      exports.notEntries = notEntries;
      exports.notGraphemes = notGraphemes;
      exports.notLength = notLength;
      exports.notSize = notSize;
      exports.notValue = notValue;
      exports.notValues = notValues;
      exports.notWords = notWords;
      exports.null = null_;
      exports.null_ = null_;
      exports.nullable = nullable;
      exports.nullableAsync = nullableAsync;
      exports.nullish = nullish;
      exports.nullishAsync = nullishAsync;
      exports.number = number;
      exports.object = object;
      exports.objectAsync = objectAsync;
      exports.objectWithRest = objectWithRest;
      exports.objectWithRestAsync = objectWithRestAsync;
      exports.octal = octal;
      exports.omit = omit;
      exports.optional = optional;
      exports.optionalAsync = optionalAsync;
      exports.parse = parse;
      exports.parseAsync = parseAsync;
      exports.parseJson = parseJson;
      exports.parser = parser;
      exports.parserAsync = parserAsync;
      exports.partial = partial;
      exports.partialAsync = partialAsync;
      exports.partialCheck = partialCheck;
      exports.partialCheckAsync = partialCheckAsync;
      exports.pick = pick;
      exports.picklist = picklist;
      exports.pipe = pipe;
      exports.pipeAsync = pipeAsync;
      exports.promise = promise;
      exports.rawCheck = rawCheck;
      exports.rawCheckAsync = rawCheckAsync;
      exports.rawTransform = rawTransform;
      exports.rawTransformAsync = rawTransformAsync;
      exports.readonly = readonly;
      exports.record = record;
      exports.recordAsync = recordAsync;
      exports.reduceItems = reduceItems;
      exports.regex = regex;
      exports.required = required;
      exports.requiredAsync = requiredAsync;
      exports.returns = returns;
      exports.returnsAsync = returnsAsync;
      exports.rfcEmail = rfcEmail;
      exports.safeInteger = safeInteger;
      exports.safeParse = safeParse;
      exports.safeParseAsync = safeParseAsync;
      exports.safeParser = safeParser;
      exports.safeParserAsync = safeParserAsync;
      exports.set = set;
      exports.setAsync = setAsync;
      exports.setGlobalConfig = setGlobalConfig;
      exports.setGlobalMessage = setGlobalMessage;
      exports.setSchemaMessage = setSchemaMessage;
      exports.setSpecificMessage = setSpecificMessage;
      exports.size = size;
      exports.slug = slug;
      exports.someItem = someItem;
      exports.sortItems = sortItems;
      exports.startsWith = startsWith;
      exports.strictObject = strictObject;
      exports.strictObjectAsync = strictObjectAsync;
      exports.strictTuple = strictTuple;
      exports.strictTupleAsync = strictTupleAsync;
      exports.string = string;
      exports.stringifyJson = stringifyJson;
      exports.summarize = summarize;
      exports.symbol = symbol;
      exports.title = title;
      exports.toBigint = toBigint;
      exports.toBoolean = toBoolean;
      exports.toDate = toDate;
      exports.toLowerCase = toLowerCase;
      exports.toMaxValue = toMaxValue;
      exports.toMinValue = toMinValue;
      exports.toNumber = toNumber;
      exports.toString = toString;
      exports.toUpperCase = toUpperCase;
      exports.transform = transform;
      exports.transformAsync = transformAsync;
      exports.trim = trim;
      exports.trimEnd = trimEnd;
      exports.trimStart = trimStart;
      exports.tuple = tuple;
      exports.tupleAsync = tupleAsync;
      exports.tupleWithRest = tupleWithRest;
      exports.tupleWithRestAsync = tupleWithRestAsync;
      exports.ulid = ulid;
      exports.undefined = undefined_;
      exports.undefined_ = undefined_;
      exports.undefinedable = undefinedable;
      exports.undefinedableAsync = undefinedableAsync;
      exports.union = union;
      exports.unionAsync = unionAsync;
      exports.unknown = unknown;
      exports.unwrap = unwrap;
      exports.url = url;
      exports.uuid = uuid;
      exports.value = value;
      exports.values = values;
      exports.variant = variant;
      exports.variantAsync = variantAsync;
      exports.void = void_;
      exports.void_ = void_;
      exports.words = words;
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/types.cjs
  var require_types = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/types.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NullablePartial = exports.SatoshiSchema = exports.UInt32Schema = exports.UInt8Schema = exports.HexSchema = exports.BufferSchema = exports.Hash256bitSchema = exports.Hash160bitSchema = exports.Buffer256bitSchema = exports.TAPLEAF_VERSION_MASK = exports.NBufferSchemaFactory = void 0;
      exports.stacksEqual = stacksEqual;
      exports.isPoint = isPoint;
      exports.isTapleaf = isTapleaf;
      exports.isTaptree = isTaptree;
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var v = __importStar(require_dist());
      var ZERO32 = new Uint8Array(32);
      var EC_P = tools.fromHex(
        "fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
      );
      var NBufferSchemaFactory = (size) => v.pipe(v.instance(Uint8Array), v.length(size));
      exports.NBufferSchemaFactory = NBufferSchemaFactory;
      function stacksEqual(a, b) {
        if (a.length !== b.length) return false;
        return a.every((x, i) => {
          return tools.compare(x, b[i]) === 0;
        });
      }
      function isPoint(p) {
        if (!(p instanceof Uint8Array)) return false;
        if (p.length < 33) return false;
        const t = p[0];
        const x = p.slice(1, 33);
        if (tools.compare(ZERO32, x) === 0) return false;
        if (tools.compare(x, EC_P) >= 0) return false;
        if ((t === 2 || t === 3) && p.length === 33) {
          return true;
        }
        const y = p.slice(33);
        if (tools.compare(ZERO32, y) === 0) return false;
        if (tools.compare(y, EC_P) >= 0) return false;
        if (t === 4 && p.length === 65) return true;
        return false;
      }
      exports.TAPLEAF_VERSION_MASK = 254;
      function isTapleaf(o) {
        if (!o || !("output" in o)) return false;
        if (!(o.output instanceof Uint8Array)) return false;
        if (o.version !== void 0)
          return (o.version & exports.TAPLEAF_VERSION_MASK) === o.version;
        return true;
      }
      function isTaptree(scriptTree) {
        if (!Array.isArray(scriptTree)) return isTapleaf(scriptTree);
        if (scriptTree.length !== 2) return false;
        return scriptTree.every((t) => isTaptree(t));
      }
      exports.Buffer256bitSchema = (0, exports.NBufferSchemaFactory)(32);
      exports.Hash160bitSchema = (0, exports.NBufferSchemaFactory)(20);
      exports.Hash256bitSchema = (0, exports.NBufferSchemaFactory)(32);
      exports.BufferSchema = v.instance(Uint8Array);
      exports.HexSchema = v.pipe(v.string(), v.regex(/^([0-9a-f]{2})+$/i));
      exports.UInt8Schema = v.pipe(
        v.number(),
        v.integer(),
        v.minValue(0),
        v.maxValue(255)
      );
      exports.UInt32Schema = v.pipe(
        v.number(),
        v.integer(),
        v.minValue(0),
        v.maxValue(4294967295)
      );
      exports.SatoshiSchema = v.pipe(
        v.bigint(),
        v.minValue(0n),
        v.maxValue(0x7fffffffffffffffn)
      );
      var NullablePartial = (a) => v.object(
        Object.entries(a).reduce(
          (acc, next) => ({ ...acc, [next[0]]: v.nullish(next[1]) }),
          {}
        )
      );
      exports.NullablePartial = NullablePartial;
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/script_signature.cjs
  var require_script_signature = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/script_signature.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.decode = decode;
      exports.encode = encode;
      var bip66 = __importStar(require_bip66());
      var script_js_1 = require_script();
      var v = __importStar(require_dist());
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var types_js_1 = require_types();
      var ZERO = new Uint8Array(1);
      function toDER(x) {
        let i = 0;
        while (x[i] === 0) ++i;
        if (i === x.length) return ZERO;
        x = x.slice(i);
        if (x[0] & 128) return tools.concat([ZERO, x]);
        return x;
      }
      function fromDER(x) {
        if (x[0] === 0) x = x.slice(1);
        const buffer = new Uint8Array(32);
        const bstart = Math.max(0, 32 - x.length);
        buffer.set(x, bstart);
        return buffer;
      }
      function decode(buffer) {
        const hashType = tools.readUInt8(buffer, buffer.length - 1);
        if (!(0, script_js_1.isDefinedHashType)(hashType)) {
          throw new Error("Invalid hashType " + hashType);
        }
        const decoded = bip66.decode(buffer.subarray(0, -1));
        const r = fromDER(decoded.r);
        const s = fromDER(decoded.s);
        const signature = tools.concat([r, s]);
        return { signature, hashType };
      }
      function encode(signature, hashType) {
        v.parse(
          v.object({
            signature: (0, types_js_1.NBufferSchemaFactory)(64),
            hashType: types_js_1.UInt8Schema
          }),
          { signature, hashType }
        );
        if (!(0, script_js_1.isDefinedHashType)(hashType)) {
          throw new Error("Invalid hashType " + hashType);
        }
        const hashTypeBuffer = new Uint8Array(1);
        tools.writeUInt8(hashTypeBuffer, 0, hashType);
        const r = toDER(signature.slice(0, 32));
        const s = toDER(signature.slice(32, 64));
        return tools.concat([bip66.encode(r, s), hashTypeBuffer]);
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/script.cjs
  var require_script = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/script.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.signature = exports.number = exports.OPS = void 0;
      exports.isPushOnly = isPushOnly;
      exports.countNonPushOnlyOPs = countNonPushOnlyOPs;
      exports.compile = compile;
      exports.decompile = decompile;
      exports.toASM = toASM;
      exports.fromASM = fromASM;
      exports.toStack = toStack;
      exports.isCanonicalPubKey = isCanonicalPubKey;
      exports.isDefinedHashType = isDefinedHashType;
      exports.isCanonicalScriptSignature = isCanonicalScriptSignature;
      var bip66 = __importStar(require_bip66());
      var ops_js_1 = require_ops();
      Object.defineProperty(exports, "OPS", {
        enumerable: true,
        get: function() {
          return ops_js_1.OPS;
        }
      });
      var pushdata = __importStar(require_push_data());
      var scriptNumber = __importStar(require_script_number());
      var scriptSignature = __importStar(require_script_signature());
      var types = __importStar(require_types());
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var v = __importStar(require_dist());
      var OP_INT_BASE = ops_js_1.OPS.OP_RESERVED;
      var StackSchema = v.array(v.union([v.instance(Uint8Array), v.number()]));
      function isOPInt(value) {
        return v.is(v.number(), value) && (value === ops_js_1.OPS.OP_0 || value >= ops_js_1.OPS.OP_1 && value <= ops_js_1.OPS.OP_16 || value === ops_js_1.OPS.OP_1NEGATE);
      }
      function isPushOnlyChunk(value) {
        return v.is(types.BufferSchema, value) || isOPInt(value);
      }
      function isPushOnly(value) {
        return v.is(v.pipe(v.any(), v.everyItem(isPushOnlyChunk)), value);
      }
      function countNonPushOnlyOPs(value) {
        return value.length - value.filter(isPushOnlyChunk).length;
      }
      function asMinimalOP(buffer) {
        if (buffer.length === 0) return ops_js_1.OPS.OP_0;
        if (buffer.length !== 1) return;
        if (buffer[0] >= 1 && buffer[0] <= 16) return OP_INT_BASE + buffer[0];
        if (buffer[0] === 129) return ops_js_1.OPS.OP_1NEGATE;
      }
      function chunksIsBuffer(buf) {
        return buf instanceof Uint8Array;
      }
      function chunksIsArray(buf) {
        return v.is(StackSchema, buf);
      }
      function singleChunkIsBuffer(buf) {
        return buf instanceof Uint8Array;
      }
      function compile(chunks) {
        if (chunksIsBuffer(chunks)) return chunks;
        v.parse(StackSchema, chunks);
        const bufferSize = chunks.reduce((accum, chunk) => {
          if (singleChunkIsBuffer(chunk)) {
            if (chunk.length === 1 && asMinimalOP(chunk) !== void 0) {
              return accum + 1;
            }
            return accum + pushdata.encodingLength(chunk.length) + chunk.length;
          }
          return accum + 1;
        }, 0);
        const buffer = new Uint8Array(bufferSize);
        let offset = 0;
        chunks.forEach((chunk) => {
          if (singleChunkIsBuffer(chunk)) {
            const opcode = asMinimalOP(chunk);
            if (opcode !== void 0) {
              tools.writeUInt8(buffer, offset, opcode);
              offset += 1;
              return;
            }
            offset += pushdata.encode(buffer, chunk.length, offset);
            buffer.set(chunk, offset);
            offset += chunk.length;
          } else {
            tools.writeUInt8(buffer, offset, chunk);
            offset += 1;
          }
        });
        if (offset !== buffer.length) throw new Error("Could not decode chunks");
        return buffer;
      }
      function decompile(buffer) {
        if (chunksIsArray(buffer)) return buffer;
        v.parse(types.BufferSchema, buffer);
        const chunks = [];
        let i = 0;
        while (i < buffer.length) {
          const opcode = buffer[i];
          if (opcode > ops_js_1.OPS.OP_0 && opcode <= ops_js_1.OPS.OP_PUSHDATA4) {
            const d = pushdata.decode(buffer, i);
            if (d === null) return null;
            i += d.size;
            if (i + d.number > buffer.length) return null;
            const data = buffer.slice(i, i + d.number);
            i += d.number;
            const op = asMinimalOP(data);
            if (op !== void 0) {
              chunks.push(op);
            } else {
              chunks.push(data);
            }
          } else {
            chunks.push(opcode);
            i += 1;
          }
        }
        return chunks;
      }
      function toASM(chunks) {
        if (chunksIsBuffer(chunks)) {
          chunks = decompile(chunks);
        }
        if (!chunks) {
          throw new Error("Could not convert invalid chunks to ASM");
        }
        return chunks.map((chunk) => {
          if (singleChunkIsBuffer(chunk)) {
            const op = asMinimalOP(chunk);
            if (op === void 0) return tools.toHex(chunk);
            chunk = op;
          }
          return ops_js_1.OPS[chunk];
        }).join(" ");
      }
      function fromASM(asm) {
        v.parse(v.string(), asm);
        return compile(
          asm.split(" ").map((chunk) => {
            if (isNaN(Number(chunk)) && chunk in ops_js_1.OPS) {
              return ops_js_1.OPS[chunk];
            }
            v.parse(types.HexSchema, chunk);
            return tools.fromHex(chunk);
          })
        );
      }
      function toStack(chunks) {
        chunks = decompile(chunks);
        v.parse(v.custom(isPushOnly), chunks);
        return chunks.map((op) => {
          if (singleChunkIsBuffer(op)) return op;
          if (op === ops_js_1.OPS.OP_0) return new Uint8Array(0);
          return scriptNumber.encode(op - OP_INT_BASE);
        });
      }
      function isCanonicalPubKey(buffer) {
        return types.isPoint(buffer);
      }
      function isDefinedHashType(hashType) {
        const hashTypeMod = hashType & ~128;
        return hashTypeMod > 0 && hashTypeMod < 4;
      }
      function isCanonicalScriptSignature(buffer) {
        if (!(buffer instanceof Uint8Array)) return false;
        if (!isDefinedHashType(buffer[buffer.length - 1])) return false;
        return bip66.check(buffer.slice(0, -1));
      }
      exports.number = scriptNumber;
      exports.signature = scriptSignature;
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/payments/lazy.cjs
  var require_lazy = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/payments/lazy.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.prop = prop;
      exports.value = value;
      function prop(object, name, f) {
        Object.defineProperty(object, name, {
          configurable: true,
          enumerable: true,
          get() {
            const _value = f.call(this);
            this[name] = _value;
            return _value;
          },
          set(_value) {
            Object.defineProperty(this, name, {
              configurable: true,
              enumerable: true,
              value: _value,
              writable: true
            });
          }
        });
      }
      function value(f) {
        let _value;
        return () => {
          if (_value !== void 0) return _value;
          _value = f();
          return _value;
        };
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/payments/embed.cjs
  var require_embed = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/payments/embed.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.p2data = p2data;
      var networks_js_1 = require_networks();
      var bscript = __importStar(require_script());
      var types_js_1 = require_types();
      var lazy = __importStar(require_lazy());
      var v = __importStar(require_dist());
      var OPS = bscript.OPS;
      function p2data(a, opts) {
        if (!a.data && !a.output) throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        v.parse(
          v.partial(
            v.object({
              network: v.object({}),
              output: types_js_1.BufferSchema,
              data: v.array(types_js_1.BufferSchema)
            })
          ),
          a
        );
        const network = a.network || networks_js_1.bitcoin;
        const o = { name: "embed", network };
        lazy.prop(o, "output", () => {
          if (!a.data) return;
          return bscript.compile([OPS.OP_RETURN].concat(a.data));
        });
        lazy.prop(o, "data", () => {
          if (!a.output) return;
          return bscript.decompile(a.output).slice(1);
        });
        if (opts.validate) {
          if (a.output) {
            const chunks = bscript.decompile(a.output);
            if (chunks[0] !== OPS.OP_RETURN) throw new TypeError("Output is invalid");
            if (!chunks.slice(1).every((chunk) => v.is(types_js_1.BufferSchema, chunk)))
              throw new TypeError("Output is invalid");
            if (a.data && !(0, types_js_1.stacksEqual)(a.data, o.data))
              throw new TypeError("Data mismatch");
          }
        }
        return Object.assign(o, a);
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/payments/p2ms.cjs
  var require_p2ms = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/payments/p2ms.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.p2ms = p2ms;
      var networks_js_1 = require_networks();
      var bscript = __importStar(require_script());
      var scriptNumber = __importStar(require_script_number());
      var types_js_1 = require_types();
      var lazy = __importStar(require_lazy());
      var v = __importStar(require_dist());
      var OPS = bscript.OPS;
      var OP_INT_BASE = OPS.OP_RESERVED;
      function encodeSmallOrScriptNum(n) {
        return n <= 16 ? OP_INT_BASE + n : scriptNumber.encode(n);
      }
      function decodeSmallOrScriptNum(chunk) {
        if (typeof chunk === "number") {
          const val = chunk - OP_INT_BASE;
          if (val < 1 || val > 16)
            throw new TypeError(`Invalid opcode: expected OP_1\u2013OP_16, got ${chunk}`);
          return val;
        } else return scriptNumber.decode(chunk);
      }
      function isSmallOrScriptNum(chunk) {
        if (typeof chunk === "number")
          return chunk - OP_INT_BASE >= 1 && chunk - OP_INT_BASE <= 16;
        else return Number.isInteger(scriptNumber.decode(chunk));
      }
      function p2ms(a, opts) {
        if (!a.input && !a.output && !(a.pubkeys && a.m !== void 0) && !a.signatures)
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        function isAcceptableSignature(x) {
          return bscript.isCanonicalScriptSignature(x) || (opts.allowIncomplete && x === OPS.OP_0) !== void 0;
        }
        v.parse(
          v.partial(
            v.object({
              network: v.object({}),
              m: v.number(),
              n: v.number(),
              output: types_js_1.BufferSchema,
              pubkeys: v.array(
                v.custom(types_js_1.isPoint),
                "Received invalid pubkey"
              ),
              signatures: v.array(
                v.custom(isAcceptableSignature),
                "Expected signature to be of type isAcceptableSignature"
              ),
              input: types_js_1.BufferSchema
            })
          ),
          a
        );
        const network = a.network || networks_js_1.bitcoin;
        const o = { network };
        let chunks = [];
        let decoded = false;
        function decode(output) {
          if (decoded) return;
          decoded = true;
          chunks = bscript.decompile(output);
          if (chunks.length < 3) throw new TypeError("Output is invalid");
          o.m = decodeSmallOrScriptNum(chunks[0]);
          o.n = decodeSmallOrScriptNum(chunks[chunks.length - 2]);
          o.pubkeys = chunks.slice(1, -2);
        }
        lazy.prop(o, "output", () => {
          if (!a.m) return;
          if (!o.n) return;
          if (!a.pubkeys) return;
          return bscript.compile(
            [].concat(
              encodeSmallOrScriptNum(a.m),
              a.pubkeys,
              encodeSmallOrScriptNum(o.n),
              OPS.OP_CHECKMULTISIG
            )
          );
        });
        lazy.prop(o, "m", () => {
          if (!o.output) return;
          decode(o.output);
          return o.m;
        });
        lazy.prop(o, "n", () => {
          if (!o.pubkeys) return;
          return o.pubkeys.length;
        });
        lazy.prop(o, "pubkeys", () => {
          if (!a.output) return;
          decode(a.output);
          return o.pubkeys;
        });
        lazy.prop(o, "signatures", () => {
          if (!a.input) return;
          return bscript.decompile(a.input).slice(1);
        });
        lazy.prop(o, "input", () => {
          if (!a.signatures) return;
          return bscript.compile([OPS.OP_0].concat(a.signatures));
        });
        lazy.prop(o, "witness", () => {
          if (!o.input) return;
          return [];
        });
        lazy.prop(o, "name", () => {
          if (!o.m || !o.n) return;
          return `p2ms(${o.m} of ${o.n})`;
        });
        if (opts.validate) {
          if (a.output) {
            decode(a.output);
            if (!isSmallOrScriptNum(chunks[0]))
              throw new TypeError("Output is invalid");
            if (!isSmallOrScriptNum(chunks[chunks.length - 2]))
              throw new TypeError("Output is invalid");
            if (chunks[chunks.length - 1] !== OPS.OP_CHECKMULTISIG)
              throw new TypeError("Output is invalid");
            if (o.m <= 0 || o.n > 20 || o.m > o.n || o.n !== chunks.length - 3)
              throw new TypeError("Output is invalid");
            if (!o.pubkeys.every((x) => (0, types_js_1.isPoint)(x)))
              throw new TypeError("Output is invalid");
            if (a.m !== void 0 && a.m !== o.m) throw new TypeError("m mismatch");
            if (a.n !== void 0 && a.n !== o.n) throw new TypeError("n mismatch");
            if (a.pubkeys && !(0, types_js_1.stacksEqual)(a.pubkeys, o.pubkeys))
              throw new TypeError("Pubkeys mismatch");
          }
          if (a.pubkeys) {
            if (a.n !== void 0 && a.n !== a.pubkeys.length)
              throw new TypeError("Pubkey count mismatch");
            o.n = a.pubkeys.length;
            if (o.n < o.m) throw new TypeError("Pubkey count cannot be less than m");
          }
          if (a.signatures) {
            if (a.signatures.length < o.m)
              throw new TypeError("Not enough signatures provided");
            if (a.signatures.length > o.m)
              throw new TypeError("Too many signatures provided");
          }
          if (a.input) {
            if (a.input[0] !== OPS.OP_0) throw new TypeError("Input is invalid");
            if (o.signatures.length === 0 || !o.signatures.every(isAcceptableSignature))
              throw new TypeError("Input has invalid signature(s)");
            if (a.signatures && !(0, types_js_1.stacksEqual)(a.signatures, o.signatures))
              throw new TypeError("Signature mismatch");
            if (a.m !== void 0 && a.m !== a.signatures.length)
              throw new TypeError("Signature count mismatch");
          }
        }
        return Object.assign(o, a);
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/payments/p2pk.cjs
  var require_p2pk = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/payments/p2pk.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.p2pk = p2pk;
      var networks_js_1 = require_networks();
      var bscript = __importStar(require_script());
      var types_js_1 = require_types();
      var lazy = __importStar(require_lazy());
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var v = __importStar(require_dist());
      var OPS = bscript.OPS;
      function p2pk(a, opts) {
        if (!a.input && !a.output && !a.pubkey && !a.input && !a.signature)
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        v.parse(
          v.partial(
            v.object({
              network: v.object({}),
              output: types_js_1.BufferSchema,
              pubkey: v.custom(types_js_1.isPoint, "invalid pubkey"),
              signature: v.custom(
                bscript.isCanonicalScriptSignature,
                "Expected signature to be of type isCanonicalScriptSignature"
              ),
              input: types_js_1.BufferSchema
            })
          ),
          a
        );
        const _chunks = lazy.value(() => {
          return bscript.decompile(a.input);
        });
        const network = a.network || networks_js_1.bitcoin;
        const o = { name: "p2pk", network };
        lazy.prop(o, "output", () => {
          if (!a.pubkey) return;
          return bscript.compile([a.pubkey, OPS.OP_CHECKSIG]);
        });
        lazy.prop(o, "pubkey", () => {
          if (!a.output) return;
          return a.output.slice(1, -1);
        });
        lazy.prop(o, "signature", () => {
          if (!a.input) return;
          return _chunks()[0];
        });
        lazy.prop(o, "input", () => {
          if (!a.signature) return;
          return bscript.compile([a.signature]);
        });
        lazy.prop(o, "witness", () => {
          if (!o.input) return;
          return [];
        });
        if (opts.validate) {
          if (a.output) {
            if (a.output[a.output.length - 1] !== OPS.OP_CHECKSIG)
              throw new TypeError("Output is invalid");
            if (!(0, types_js_1.isPoint)(o.pubkey))
              throw new TypeError("Output pubkey is invalid");
            if (a.pubkey && tools.compare(a.pubkey, o.pubkey) !== 0)
              throw new TypeError("Pubkey mismatch");
          }
          if (a.signature) {
            if (a.input && tools.compare(a.input, o.input) !== 0)
              throw new TypeError("Signature mismatch");
          }
          if (a.input) {
            if (_chunks().length !== 1) throw new TypeError("Input is invalid");
            if (!bscript.isCanonicalScriptSignature(o.signature))
              throw new TypeError("Input has invalid signature");
          }
        }
        return Object.assign(o, a);
      }
    }
  });

  // node_modules/@noble/hashes/crypto.js
  var require_crypto = __commonJS({
    "node_modules/@noble/hashes/crypto.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.crypto = void 0;
      exports.crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
    }
  });

  // node_modules/@noble/hashes/utils.js
  var require_utils = __commonJS({
    "node_modules/@noble/hashes/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.Hash = exports.nextTick = exports.swap32IfBE = exports.byteSwapIfBE = exports.swap8IfBE = exports.isLE = void 0;
      exports.isBytes = isBytes;
      exports.anumber = anumber;
      exports.abytes = abytes;
      exports.ahash = ahash;
      exports.aexists = aexists;
      exports.aoutput = aoutput;
      exports.u8 = u8;
      exports.u32 = u32;
      exports.clean = clean;
      exports.createView = createView;
      exports.rotr = rotr;
      exports.rotl = rotl;
      exports.byteSwap = byteSwap;
      exports.byteSwap32 = byteSwap32;
      exports.bytesToHex = bytesToHex;
      exports.hexToBytes = hexToBytes;
      exports.asyncLoop = asyncLoop;
      exports.utf8ToBytes = utf8ToBytes;
      exports.bytesToUtf8 = bytesToUtf8;
      exports.toBytes = toBytes;
      exports.kdfInputToBytes = kdfInputToBytes;
      exports.concatBytes = concatBytes;
      exports.checkOpts = checkOpts;
      exports.createHasher = createHasher;
      exports.createOptHasher = createOptHasher;
      exports.createXOFer = createXOFer;
      exports.randomBytes = randomBytes;
      var crypto_1 = require_crypto();
      function isBytes(a) {
        return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
      }
      function anumber(n) {
        if (!Number.isSafeInteger(n) || n < 0)
          throw new Error("positive integer expected, got " + n);
      }
      function abytes(b, ...lengths) {
        if (!isBytes(b))
          throw new Error("Uint8Array expected");
        if (lengths.length > 0 && !lengths.includes(b.length))
          throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
      }
      function ahash(h) {
        if (typeof h !== "function" || typeof h.create !== "function")
          throw new Error("Hash should be wrapped by utils.createHasher");
        anumber(h.outputLen);
        anumber(h.blockLen);
      }
      function aexists(instance, checkFinished = true) {
        if (instance.destroyed)
          throw new Error("Hash instance has been destroyed");
        if (checkFinished && instance.finished)
          throw new Error("Hash#digest() has already been called");
      }
      function aoutput(out, instance) {
        abytes(out);
        const min = instance.outputLen;
        if (out.length < min) {
          throw new Error("digestInto() expects output buffer of length at least " + min);
        }
      }
      function u8(arr) {
        return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      function u32(arr) {
        return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
      }
      function clean(...arrays) {
        for (let i = 0; i < arrays.length; i++) {
          arrays[i].fill(0);
        }
      }
      function createView(arr) {
        return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      function rotr(word, shift) {
        return word << 32 - shift | word >>> shift;
      }
      function rotl(word, shift) {
        return word << shift | word >>> 32 - shift >>> 0;
      }
      exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
      function byteSwap(word) {
        return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
      }
      exports.swap8IfBE = exports.isLE ? (n) => n : (n) => byteSwap(n);
      exports.byteSwapIfBE = exports.swap8IfBE;
      function byteSwap32(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = byteSwap(arr[i]);
        }
        return arr;
      }
      exports.swap32IfBE = exports.isLE ? (u) => u : byteSwap32;
      var hasHexBuiltin = /* @__PURE__ */ (() => (
        // @ts-ignore
        typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
      ))();
      var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
      function bytesToHex(bytes) {
        abytes(bytes);
        if (hasHexBuiltin)
          return bytes.toHex();
        let hex = "";
        for (let i = 0; i < bytes.length; i++) {
          hex += hexes[bytes[i]];
        }
        return hex;
      }
      var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
      function asciiToBase16(ch) {
        if (ch >= asciis._0 && ch <= asciis._9)
          return ch - asciis._0;
        if (ch >= asciis.A && ch <= asciis.F)
          return ch - (asciis.A - 10);
        if (ch >= asciis.a && ch <= asciis.f)
          return ch - (asciis.a - 10);
        return;
      }
      function hexToBytes(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        if (hasHexBuiltin)
          return Uint8Array.fromHex(hex);
        const hl = hex.length;
        const al = hl / 2;
        if (hl % 2)
          throw new Error("hex string expected, got unpadded hex of length " + hl);
        const array = new Uint8Array(al);
        for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
          const n1 = asciiToBase16(hex.charCodeAt(hi));
          const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
          if (n1 === void 0 || n2 === void 0) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
          }
          array[ai] = n1 * 16 + n2;
        }
        return array;
      }
      var nextTick = async () => {
      };
      exports.nextTick = nextTick;
      async function asyncLoop(iters, tick, cb) {
        let ts = Date.now();
        for (let i = 0; i < iters; i++) {
          cb(i);
          const diff = Date.now() - ts;
          if (diff >= 0 && diff < tick)
            continue;
          await (0, exports.nextTick)();
          ts += diff;
        }
      }
      function utf8ToBytes(str) {
        if (typeof str !== "string")
          throw new Error("string expected");
        return new Uint8Array(new TextEncoder().encode(str));
      }
      function bytesToUtf8(bytes) {
        return new TextDecoder().decode(bytes);
      }
      function toBytes(data) {
        if (typeof data === "string")
          data = utf8ToBytes(data);
        abytes(data);
        return data;
      }
      function kdfInputToBytes(data) {
        if (typeof data === "string")
          data = utf8ToBytes(data);
        abytes(data);
        return data;
      }
      function concatBytes(...arrays) {
        let sum = 0;
        for (let i = 0; i < arrays.length; i++) {
          const a = arrays[i];
          abytes(a);
          sum += a.length;
        }
        const res = new Uint8Array(sum);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const a = arrays[i];
          res.set(a, pad);
          pad += a.length;
        }
        return res;
      }
      function checkOpts(defaults, opts) {
        if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
          throw new Error("options should be object or undefined");
        const merged = Object.assign(defaults, opts);
        return merged;
      }
      var Hash = class {
      };
      exports.Hash = Hash;
      function createHasher(hashCons) {
        const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
        const tmp = hashCons();
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = () => hashCons();
        return hashC;
      }
      function createOptHasher(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      function createXOFer(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      exports.wrapConstructor = createHasher;
      exports.wrapConstructorWithOpts = createOptHasher;
      exports.wrapXOFConstructorWithOpts = createXOFer;
      function randomBytes(bytesLength = 32) {
        if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
          return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
        }
        if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
          return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
        }
        throw new Error("crypto.getRandomValues must be defined");
      }
    }
  });

  // node_modules/@noble/hashes/_md.js
  var require_md = __commonJS({
    "node_modules/@noble/hashes/_md.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SHA512_IV = exports.SHA384_IV = exports.SHA224_IV = exports.SHA256_IV = exports.HashMD = void 0;
      exports.setBigUint64 = setBigUint64;
      exports.Chi = Chi;
      exports.Maj = Maj;
      var utils_ts_1 = require_utils();
      function setBigUint64(view, byteOffset, value, isLE) {
        if (typeof view.setBigUint64 === "function")
          return view.setBigUint64(byteOffset, value, isLE);
        const _32n = BigInt(32);
        const _u32_max = BigInt(4294967295);
        const wh = Number(value >> _32n & _u32_max);
        const wl = Number(value & _u32_max);
        const h = isLE ? 4 : 0;
        const l = isLE ? 0 : 4;
        view.setUint32(byteOffset + h, wh, isLE);
        view.setUint32(byteOffset + l, wl, isLE);
      }
      function Chi(a, b, c) {
        return a & b ^ ~a & c;
      }
      function Maj(a, b, c) {
        return a & b ^ a & c ^ b & c;
      }
      var HashMD = class extends utils_ts_1.Hash {
        constructor(blockLen, outputLen, padOffset, isLE) {
          super();
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE;
          this.buffer = new Uint8Array(blockLen);
          this.view = (0, utils_ts_1.createView)(this.buffer);
        }
        update(data) {
          (0, utils_ts_1.aexists)(this);
          data = (0, utils_ts_1.toBytes)(data);
          (0, utils_ts_1.abytes)(data);
          const { view, buffer, blockLen } = this;
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              const dataView = (0, utils_ts_1.createView)(data);
              for (; blockLen <= len - pos; pos += blockLen)
                this.process(dataView, pos);
              continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        }
        digestInto(out) {
          (0, utils_ts_1.aexists)(this);
          (0, utils_ts_1.aoutput)(out, this);
          this.finished = true;
          const { buffer, view, blockLen, isLE } = this;
          let { pos } = this;
          buffer[pos++] = 128;
          (0, utils_ts_1.clean)(this.buffer.subarray(pos));
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
          setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
          this.process(view, 0);
          const oview = (0, utils_ts_1.createView)(out);
          const len = this.outputLen;
          if (len % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
          const outLen = len / 4;
          const state = this.get();
          if (outLen > state.length)
            throw new Error("_sha2: outputLen bigger than state");
          for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE);
        }
        digest() {
          const { buffer, outputLen } = this;
          this.digestInto(buffer);
          const res = buffer.slice(0, outputLen);
          this.destroy();
          return res;
        }
        _cloneInto(to) {
          to || (to = new this.constructor());
          to.set(...this.get());
          const { blockLen, buffer, length, finished, destroyed, pos } = this;
          to.destroyed = destroyed;
          to.finished = finished;
          to.length = length;
          to.pos = pos;
          if (length % blockLen)
            to.buffer.set(buffer);
          return to;
        }
        clone() {
          return this._cloneInto();
        }
      };
      exports.HashMD = HashMD;
      exports.SHA256_IV = Uint32Array.from([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]);
      exports.SHA224_IV = Uint32Array.from([
        3238371032,
        914150663,
        812702999,
        4144912697,
        4290775857,
        1750603025,
        1694076839,
        3204075428
      ]);
      exports.SHA384_IV = Uint32Array.from([
        3418070365,
        3238371032,
        1654270250,
        914150663,
        2438529370,
        812702999,
        355462360,
        4144912697,
        1731405415,
        4290775857,
        2394180231,
        1750603025,
        3675008525,
        1694076839,
        1203062813,
        3204075428
      ]);
      exports.SHA512_IV = Uint32Array.from([
        1779033703,
        4089235720,
        3144134277,
        2227873595,
        1013904242,
        4271175723,
        2773480762,
        1595750129,
        1359893119,
        2917565137,
        2600822924,
        725511199,
        528734635,
        4215389547,
        1541459225,
        327033209
      ]);
    }
  });

  // node_modules/@noble/hashes/legacy.js
  var require_legacy = __commonJS({
    "node_modules/@noble/hashes/legacy.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ripemd160 = exports.RIPEMD160 = exports.md5 = exports.MD5 = exports.sha1 = exports.SHA1 = void 0;
      var _md_ts_1 = require_md();
      var utils_ts_1 = require_utils();
      var SHA1_IV = /* @__PURE__ */ Uint32Array.from([
        1732584193,
        4023233417,
        2562383102,
        271733878,
        3285377520
      ]);
      var SHA1_W = /* @__PURE__ */ new Uint32Array(80);
      var SHA1 = class extends _md_ts_1.HashMD {
        constructor() {
          super(64, 20, 8, false);
          this.A = SHA1_IV[0] | 0;
          this.B = SHA1_IV[1] | 0;
          this.C = SHA1_IV[2] | 0;
          this.D = SHA1_IV[3] | 0;
          this.E = SHA1_IV[4] | 0;
        }
        get() {
          const { A, B, C, D, E } = this;
          return [A, B, C, D, E];
        }
        set(A, B, C, D, E) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            SHA1_W[i] = view.getUint32(offset, false);
          for (let i = 16; i < 80; i++)
            SHA1_W[i] = (0, utils_ts_1.rotl)(SHA1_W[i - 3] ^ SHA1_W[i - 8] ^ SHA1_W[i - 14] ^ SHA1_W[i - 16], 1);
          let { A, B, C, D, E } = this;
          for (let i = 0; i < 80; i++) {
            let F, K2;
            if (i < 20) {
              F = (0, _md_ts_1.Chi)(B, C, D);
              K2 = 1518500249;
            } else if (i < 40) {
              F = B ^ C ^ D;
              K2 = 1859775393;
            } else if (i < 60) {
              F = (0, _md_ts_1.Maj)(B, C, D);
              K2 = 2400959708;
            } else {
              F = B ^ C ^ D;
              K2 = 3395469782;
            }
            const T = (0, utils_ts_1.rotl)(A, 5) + F + E + K2 + SHA1_W[i] | 0;
            E = D;
            D = C;
            C = (0, utils_ts_1.rotl)(B, 30);
            B = A;
            A = T;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          this.set(A, B, C, D, E);
        }
        roundClean() {
          (0, utils_ts_1.clean)(SHA1_W);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0);
          (0, utils_ts_1.clean)(this.buffer);
        }
      };
      exports.SHA1 = SHA1;
      exports.sha1 = (0, utils_ts_1.createHasher)(() => new SHA1());
      var p32 = /* @__PURE__ */ Math.pow(2, 32);
      var K = /* @__PURE__ */ Array.from({ length: 64 }, (_, i) => Math.floor(p32 * Math.abs(Math.sin(i + 1))));
      var MD5_IV = /* @__PURE__ */ SHA1_IV.slice(0, 4);
      var MD5_W = /* @__PURE__ */ new Uint32Array(16);
      var MD5 = class extends _md_ts_1.HashMD {
        constructor() {
          super(64, 16, 8, true);
          this.A = MD5_IV[0] | 0;
          this.B = MD5_IV[1] | 0;
          this.C = MD5_IV[2] | 0;
          this.D = MD5_IV[3] | 0;
        }
        get() {
          const { A, B, C, D } = this;
          return [A, B, C, D];
        }
        set(A, B, C, D) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            MD5_W[i] = view.getUint32(offset, true);
          let { A, B, C, D } = this;
          for (let i = 0; i < 64; i++) {
            let F, g, s;
            if (i < 16) {
              F = (0, _md_ts_1.Chi)(B, C, D);
              g = i;
              s = [7, 12, 17, 22];
            } else if (i < 32) {
              F = (0, _md_ts_1.Chi)(D, B, C);
              g = (5 * i + 1) % 16;
              s = [5, 9, 14, 20];
            } else if (i < 48) {
              F = B ^ C ^ D;
              g = (3 * i + 5) % 16;
              s = [4, 11, 16, 23];
            } else {
              F = C ^ (B | ~D);
              g = 7 * i % 16;
              s = [6, 10, 15, 21];
            }
            F = F + A + K[i] + MD5_W[g];
            A = D;
            D = C;
            C = B;
            B = B + (0, utils_ts_1.rotl)(F, s[i % 4]);
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          this.set(A, B, C, D);
        }
        roundClean() {
          (0, utils_ts_1.clean)(MD5_W);
        }
        destroy() {
          this.set(0, 0, 0, 0);
          (0, utils_ts_1.clean)(this.buffer);
        }
      };
      exports.MD5 = MD5;
      exports.md5 = (0, utils_ts_1.createHasher)(() => new MD5());
      var Rho160 = /* @__PURE__ */ Uint8Array.from([
        7,
        4,
        13,
        1,
        10,
        6,
        15,
        3,
        12,
        0,
        9,
        5,
        2,
        14,
        11,
        8
      ]);
      var Id160 = /* @__PURE__ */ (() => Uint8Array.from(new Array(16).fill(0).map((_, i) => i)))();
      var Pi160 = /* @__PURE__ */ (() => Id160.map((i) => (9 * i + 5) % 16))();
      var idxLR = /* @__PURE__ */ (() => {
        const L = [Id160];
        const R = [Pi160];
        const res = [L, R];
        for (let i = 0; i < 4; i++)
          for (let j of res)
            j.push(j[i].map((k) => Rho160[k]));
        return res;
      })();
      var idxL = /* @__PURE__ */ (() => idxLR[0])();
      var idxR = /* @__PURE__ */ (() => idxLR[1])();
      var shifts160 = /* @__PURE__ */ [
        [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
        [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
        [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
        [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
        [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
      ].map((i) => Uint8Array.from(i));
      var shiftsL160 = /* @__PURE__ */ idxL.map((idx, i) => idx.map((j) => shifts160[i][j]));
      var shiftsR160 = /* @__PURE__ */ idxR.map((idx, i) => idx.map((j) => shifts160[i][j]));
      var Kl160 = /* @__PURE__ */ Uint32Array.from([
        0,
        1518500249,
        1859775393,
        2400959708,
        2840853838
      ]);
      var Kr160 = /* @__PURE__ */ Uint32Array.from([
        1352829926,
        1548603684,
        1836072691,
        2053994217,
        0
      ]);
      function ripemd_f(group, x, y, z) {
        if (group === 0)
          return x ^ y ^ z;
        if (group === 1)
          return x & y | ~x & z;
        if (group === 2)
          return (x | ~y) ^ z;
        if (group === 3)
          return x & z | y & ~z;
        return x ^ (y | ~z);
      }
      var BUF_160 = /* @__PURE__ */ new Uint32Array(16);
      var RIPEMD160 = class extends _md_ts_1.HashMD {
        constructor() {
          super(64, 20, 8, true);
          this.h0 = 1732584193 | 0;
          this.h1 = 4023233417 | 0;
          this.h2 = 2562383102 | 0;
          this.h3 = 271733878 | 0;
          this.h4 = 3285377520 | 0;
        }
        get() {
          const { h0, h1, h2, h3, h4 } = this;
          return [h0, h1, h2, h3, h4];
        }
        set(h0, h1, h2, h3, h4) {
          this.h0 = h0 | 0;
          this.h1 = h1 | 0;
          this.h2 = h2 | 0;
          this.h3 = h3 | 0;
          this.h4 = h4 | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            BUF_160[i] = view.getUint32(offset, true);
          let al = this.h0 | 0, ar = al, bl = this.h1 | 0, br = bl, cl = this.h2 | 0, cr = cl, dl = this.h3 | 0, dr = dl, el = this.h4 | 0, er = el;
          for (let group = 0; group < 5; group++) {
            const rGroup = 4 - group;
            const hbl = Kl160[group], hbr = Kr160[group];
            const rl = idxL[group], rr = idxR[group];
            const sl = shiftsL160[group], sr = shiftsR160[group];
            for (let i = 0; i < 16; i++) {
              const tl = (0, utils_ts_1.rotl)(al + ripemd_f(group, bl, cl, dl) + BUF_160[rl[i]] + hbl, sl[i]) + el | 0;
              al = el, el = dl, dl = (0, utils_ts_1.rotl)(cl, 10) | 0, cl = bl, bl = tl;
            }
            for (let i = 0; i < 16; i++) {
              const tr = (0, utils_ts_1.rotl)(ar + ripemd_f(rGroup, br, cr, dr) + BUF_160[rr[i]] + hbr, sr[i]) + er | 0;
              ar = er, er = dr, dr = (0, utils_ts_1.rotl)(cr, 10) | 0, cr = br, br = tr;
            }
          }
          this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
        }
        roundClean() {
          (0, utils_ts_1.clean)(BUF_160);
        }
        destroy() {
          this.destroyed = true;
          (0, utils_ts_1.clean)(this.buffer);
          this.set(0, 0, 0, 0, 0);
        }
      };
      exports.RIPEMD160 = RIPEMD160;
      exports.ripemd160 = (0, utils_ts_1.createHasher)(() => new RIPEMD160());
    }
  });

  // node_modules/@noble/hashes/ripemd160.js
  var require_ripemd160 = __commonJS({
    "node_modules/@noble/hashes/ripemd160.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ripemd160 = exports.RIPEMD160 = void 0;
      var legacy_ts_1 = require_legacy();
      exports.RIPEMD160 = legacy_ts_1.RIPEMD160;
      exports.ripemd160 = legacy_ts_1.ripemd160;
    }
  });

  // node_modules/@noble/hashes/_u64.js
  var require_u64 = __commonJS({
    "node_modules/@noble/hashes/_u64.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.toBig = exports.shrSL = exports.shrSH = exports.rotrSL = exports.rotrSH = exports.rotrBL = exports.rotrBH = exports.rotr32L = exports.rotr32H = exports.rotlSL = exports.rotlSH = exports.rotlBL = exports.rotlBH = exports.add5L = exports.add5H = exports.add4L = exports.add4H = exports.add3L = exports.add3H = void 0;
      exports.add = add;
      exports.fromBig = fromBig;
      exports.split = split;
      var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
      var _32n = /* @__PURE__ */ BigInt(32);
      function fromBig(n, le = false) {
        if (le)
          return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
        return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
      }
      function split(lst, le = false) {
        const len = lst.length;
        let Ah = new Uint32Array(len);
        let Al = new Uint32Array(len);
        for (let i = 0; i < len; i++) {
          const { h, l } = fromBig(lst[i], le);
          [Ah[i], Al[i]] = [h, l];
        }
        return [Ah, Al];
      }
      var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
      exports.toBig = toBig;
      var shrSH = (h, _l, s) => h >>> s;
      exports.shrSH = shrSH;
      var shrSL = (h, l, s) => h << 32 - s | l >>> s;
      exports.shrSL = shrSL;
      var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
      exports.rotrSH = rotrSH;
      var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
      exports.rotrSL = rotrSL;
      var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
      exports.rotrBH = rotrBH;
      var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
      exports.rotrBL = rotrBL;
      var rotr32H = (_h, l) => l;
      exports.rotr32H = rotr32H;
      var rotr32L = (h, _l) => h;
      exports.rotr32L = rotr32L;
      var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
      exports.rotlSH = rotlSH;
      var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
      exports.rotlSL = rotlSL;
      var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
      exports.rotlBH = rotlBH;
      var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
      exports.rotlBL = rotlBL;
      function add(Ah, Al, Bh, Bl) {
        const l = (Al >>> 0) + (Bl >>> 0);
        return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
      }
      var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
      exports.add3L = add3L;
      var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
      exports.add3H = add3H;
      var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
      exports.add4L = add4L;
      var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
      exports.add4H = add4H;
      var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
      exports.add5L = add5L;
      var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
      exports.add5H = add5H;
      var u64 = {
        fromBig,
        split,
        toBig,
        shrSH,
        shrSL,
        rotrSH,
        rotrSL,
        rotrBH,
        rotrBL,
        rotr32H,
        rotr32L,
        rotlSH,
        rotlSL,
        rotlBH,
        rotlBL,
        add,
        add3L,
        add3H,
        add4L,
        add4H,
        add5H,
        add5L
      };
      exports.default = u64;
    }
  });

  // node_modules/@noble/hashes/sha2.js
  var require_sha2 = __commonJS({
    "node_modules/@noble/hashes/sha2.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha512_224 = exports.sha512_256 = exports.sha384 = exports.sha512 = exports.sha224 = exports.sha256 = exports.SHA512_256 = exports.SHA512_224 = exports.SHA384 = exports.SHA512 = exports.SHA224 = exports.SHA256 = void 0;
      var _md_ts_1 = require_md();
      var u64 = require_u64();
      var utils_ts_1 = require_utils();
      var SHA256_K = /* @__PURE__ */ Uint32Array.from([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
      var SHA256 = class extends _md_ts_1.HashMD {
        constructor(outputLen = 32) {
          super(64, outputLen, 8, false);
          this.A = _md_ts_1.SHA256_IV[0] | 0;
          this.B = _md_ts_1.SHA256_IV[1] | 0;
          this.C = _md_ts_1.SHA256_IV[2] | 0;
          this.D = _md_ts_1.SHA256_IV[3] | 0;
          this.E = _md_ts_1.SHA256_IV[4] | 0;
          this.F = _md_ts_1.SHA256_IV[5] | 0;
          this.G = _md_ts_1.SHA256_IV[6] | 0;
          this.H = _md_ts_1.SHA256_IV[7] | 0;
        }
        get() {
          const { A, B, C, D, E, F, G, H } = this;
          return [A, B, C, D, E, F, G, H];
        }
        // prettier-ignore
        set(A, B, C, D, E, F, G, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
          for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
          }
          let { A, B, C, D, E, F, G, H } = this;
          for (let i = 0; i < 64; i++) {
            const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
            const T1 = H + sigma1 + (0, _md_ts_1.Chi)(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
            const T2 = sigma0 + (0, _md_ts_1.Maj)(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G, H);
        }
        roundClean() {
          (0, utils_ts_1.clean)(SHA256_W);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          (0, utils_ts_1.clean)(this.buffer);
        }
      };
      exports.SHA256 = SHA256;
      var SHA224 = class extends SHA256 {
        constructor() {
          super(28);
          this.A = _md_ts_1.SHA224_IV[0] | 0;
          this.B = _md_ts_1.SHA224_IV[1] | 0;
          this.C = _md_ts_1.SHA224_IV[2] | 0;
          this.D = _md_ts_1.SHA224_IV[3] | 0;
          this.E = _md_ts_1.SHA224_IV[4] | 0;
          this.F = _md_ts_1.SHA224_IV[5] | 0;
          this.G = _md_ts_1.SHA224_IV[6] | 0;
          this.H = _md_ts_1.SHA224_IV[7] | 0;
        }
      };
      exports.SHA224 = SHA224;
      var K512 = /* @__PURE__ */ (() => u64.split([
        "0x428a2f98d728ae22",
        "0x7137449123ef65cd",
        "0xb5c0fbcfec4d3b2f",
        "0xe9b5dba58189dbbc",
        "0x3956c25bf348b538",
        "0x59f111f1b605d019",
        "0x923f82a4af194f9b",
        "0xab1c5ed5da6d8118",
        "0xd807aa98a3030242",
        "0x12835b0145706fbe",
        "0x243185be4ee4b28c",
        "0x550c7dc3d5ffb4e2",
        "0x72be5d74f27b896f",
        "0x80deb1fe3b1696b1",
        "0x9bdc06a725c71235",
        "0xc19bf174cf692694",
        "0xe49b69c19ef14ad2",
        "0xefbe4786384f25e3",
        "0x0fc19dc68b8cd5b5",
        "0x240ca1cc77ac9c65",
        "0x2de92c6f592b0275",
        "0x4a7484aa6ea6e483",
        "0x5cb0a9dcbd41fbd4",
        "0x76f988da831153b5",
        "0x983e5152ee66dfab",
        "0xa831c66d2db43210",
        "0xb00327c898fb213f",
        "0xbf597fc7beef0ee4",
        "0xc6e00bf33da88fc2",
        "0xd5a79147930aa725",
        "0x06ca6351e003826f",
        "0x142929670a0e6e70",
        "0x27b70a8546d22ffc",
        "0x2e1b21385c26c926",
        "0x4d2c6dfc5ac42aed",
        "0x53380d139d95b3df",
        "0x650a73548baf63de",
        "0x766a0abb3c77b2a8",
        "0x81c2c92e47edaee6",
        "0x92722c851482353b",
        "0xa2bfe8a14cf10364",
        "0xa81a664bbc423001",
        "0xc24b8b70d0f89791",
        "0xc76c51a30654be30",
        "0xd192e819d6ef5218",
        "0xd69906245565a910",
        "0xf40e35855771202a",
        "0x106aa07032bbd1b8",
        "0x19a4c116b8d2d0c8",
        "0x1e376c085141ab53",
        "0x2748774cdf8eeb99",
        "0x34b0bcb5e19b48a8",
        "0x391c0cb3c5c95a63",
        "0x4ed8aa4ae3418acb",
        "0x5b9cca4f7763e373",
        "0x682e6ff3d6b2b8a3",
        "0x748f82ee5defb2fc",
        "0x78a5636f43172f60",
        "0x84c87814a1f0ab72",
        "0x8cc702081a6439ec",
        "0x90befffa23631e28",
        "0xa4506cebde82bde9",
        "0xbef9a3f7b2c67915",
        "0xc67178f2e372532b",
        "0xca273eceea26619c",
        "0xd186b8c721c0c207",
        "0xeada7dd6cde0eb1e",
        "0xf57d4f7fee6ed178",
        "0x06f067aa72176fba",
        "0x0a637dc5a2c898a6",
        "0x113f9804bef90dae",
        "0x1b710b35131c471b",
        "0x28db77f523047d84",
        "0x32caab7b40c72493",
        "0x3c9ebe0a15c9bebc",
        "0x431d67c49c100d4c",
        "0x4cc5d4becb3e42b6",
        "0x597f299cfc657e2a",
        "0x5fcb6fab3ad6faec",
        "0x6c44198c4a475817"
      ].map((n) => BigInt(n))))();
      var SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
      var SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
      var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
      var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
      var SHA512 = class extends _md_ts_1.HashMD {
        constructor(outputLen = 64) {
          super(128, outputLen, 16, false);
          this.Ah = _md_ts_1.SHA512_IV[0] | 0;
          this.Al = _md_ts_1.SHA512_IV[1] | 0;
          this.Bh = _md_ts_1.SHA512_IV[2] | 0;
          this.Bl = _md_ts_1.SHA512_IV[3] | 0;
          this.Ch = _md_ts_1.SHA512_IV[4] | 0;
          this.Cl = _md_ts_1.SHA512_IV[5] | 0;
          this.Dh = _md_ts_1.SHA512_IV[6] | 0;
          this.Dl = _md_ts_1.SHA512_IV[7] | 0;
          this.Eh = _md_ts_1.SHA512_IV[8] | 0;
          this.El = _md_ts_1.SHA512_IV[9] | 0;
          this.Fh = _md_ts_1.SHA512_IV[10] | 0;
          this.Fl = _md_ts_1.SHA512_IV[11] | 0;
          this.Gh = _md_ts_1.SHA512_IV[12] | 0;
          this.Gl = _md_ts_1.SHA512_IV[13] | 0;
          this.Hh = _md_ts_1.SHA512_IV[14] | 0;
          this.Hl = _md_ts_1.SHA512_IV[15] | 0;
        }
        // prettier-ignore
        get() {
          const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
          return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
        }
        // prettier-ignore
        set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
          this.Ah = Ah | 0;
          this.Al = Al | 0;
          this.Bh = Bh | 0;
          this.Bl = Bl | 0;
          this.Ch = Ch | 0;
          this.Cl = Cl | 0;
          this.Dh = Dh | 0;
          this.Dl = Dl | 0;
          this.Eh = Eh | 0;
          this.El = El | 0;
          this.Fh = Fh | 0;
          this.Fl = Fl | 0;
          this.Gh = Gh | 0;
          this.Gl = Gl | 0;
          this.Hh = Hh | 0;
          this.Hl = Hl | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) {
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32(offset += 4);
          }
          for (let i = 16; i < 80; i++) {
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;
            const s0h = u64.rotrSH(W15h, W15l, 1) ^ u64.rotrSH(W15h, W15l, 8) ^ u64.shrSH(W15h, W15l, 7);
            const s0l = u64.rotrSL(W15h, W15l, 1) ^ u64.rotrSL(W15h, W15l, 8) ^ u64.shrSL(W15h, W15l, 7);
            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;
            const s1h = u64.rotrSH(W2h, W2l, 19) ^ u64.rotrBH(W2h, W2l, 61) ^ u64.shrSH(W2h, W2l, 6);
            const s1l = u64.rotrSL(W2h, W2l, 19) ^ u64.rotrBL(W2h, W2l, 61) ^ u64.shrSL(W2h, W2l, 6);
            const SUMl = u64.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
            const SUMh = u64.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
          }
          let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
          for (let i = 0; i < 80; i++) {
            const sigma1h = u64.rotrSH(Eh, El, 14) ^ u64.rotrSH(Eh, El, 18) ^ u64.rotrBH(Eh, El, 41);
            const sigma1l = u64.rotrSL(Eh, El, 14) ^ u64.rotrSL(Eh, El, 18) ^ u64.rotrBL(Eh, El, 41);
            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;
            const T1ll = u64.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
            const T1h = u64.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
            const T1l = T1ll | 0;
            const sigma0h = u64.rotrSH(Ah, Al, 28) ^ u64.rotrBH(Ah, Al, 34) ^ u64.rotrBH(Ah, Al, 39);
            const sigma0l = u64.rotrSL(Ah, Al, 28) ^ u64.rotrBL(Ah, Al, 34) ^ u64.rotrBL(Ah, Al, 39);
            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({ h: Eh, l: El } = u64.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = u64.add3L(T1l, sigma0l, MAJl);
            Ah = u64.add3H(All, T1h, sigma0h, MAJh);
            Al = All | 0;
          }
          ({ h: Ah, l: Al } = u64.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
          ({ h: Bh, l: Bl } = u64.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
          ({ h: Ch, l: Cl } = u64.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
          ({ h: Dh, l: Dl } = u64.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
          ({ h: Eh, l: El } = u64.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
          ({ h: Fh, l: Fl } = u64.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
          ({ h: Gh, l: Gl } = u64.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
          ({ h: Hh, l: Hl } = u64.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
          this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
        }
        roundClean() {
          (0, utils_ts_1.clean)(SHA512_W_H, SHA512_W_L);
        }
        destroy() {
          (0, utils_ts_1.clean)(this.buffer);
          this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
      };
      exports.SHA512 = SHA512;
      var SHA384 = class extends SHA512 {
        constructor() {
          super(48);
          this.Ah = _md_ts_1.SHA384_IV[0] | 0;
          this.Al = _md_ts_1.SHA384_IV[1] | 0;
          this.Bh = _md_ts_1.SHA384_IV[2] | 0;
          this.Bl = _md_ts_1.SHA384_IV[3] | 0;
          this.Ch = _md_ts_1.SHA384_IV[4] | 0;
          this.Cl = _md_ts_1.SHA384_IV[5] | 0;
          this.Dh = _md_ts_1.SHA384_IV[6] | 0;
          this.Dl = _md_ts_1.SHA384_IV[7] | 0;
          this.Eh = _md_ts_1.SHA384_IV[8] | 0;
          this.El = _md_ts_1.SHA384_IV[9] | 0;
          this.Fh = _md_ts_1.SHA384_IV[10] | 0;
          this.Fl = _md_ts_1.SHA384_IV[11] | 0;
          this.Gh = _md_ts_1.SHA384_IV[12] | 0;
          this.Gl = _md_ts_1.SHA384_IV[13] | 0;
          this.Hh = _md_ts_1.SHA384_IV[14] | 0;
          this.Hl = _md_ts_1.SHA384_IV[15] | 0;
        }
      };
      exports.SHA384 = SHA384;
      var T224_IV = /* @__PURE__ */ Uint32Array.from([
        2352822216,
        424955298,
        1944164710,
        2312950998,
        502970286,
        855612546,
        1738396948,
        1479516111,
        258812777,
        2077511080,
        2011393907,
        79989058,
        1067287976,
        1780299464,
        286451373,
        2446758561
      ]);
      var T256_IV = /* @__PURE__ */ Uint32Array.from([
        573645204,
        4230739756,
        2673172387,
        3360449730,
        596883563,
        1867755857,
        2520282905,
        1497426621,
        2519219938,
        2827943907,
        3193839141,
        1401305490,
        721525244,
        746961066,
        246885852,
        2177182882
      ]);
      var SHA512_224 = class extends SHA512 {
        constructor() {
          super(28);
          this.Ah = T224_IV[0] | 0;
          this.Al = T224_IV[1] | 0;
          this.Bh = T224_IV[2] | 0;
          this.Bl = T224_IV[3] | 0;
          this.Ch = T224_IV[4] | 0;
          this.Cl = T224_IV[5] | 0;
          this.Dh = T224_IV[6] | 0;
          this.Dl = T224_IV[7] | 0;
          this.Eh = T224_IV[8] | 0;
          this.El = T224_IV[9] | 0;
          this.Fh = T224_IV[10] | 0;
          this.Fl = T224_IV[11] | 0;
          this.Gh = T224_IV[12] | 0;
          this.Gl = T224_IV[13] | 0;
          this.Hh = T224_IV[14] | 0;
          this.Hl = T224_IV[15] | 0;
        }
      };
      exports.SHA512_224 = SHA512_224;
      var SHA512_256 = class extends SHA512 {
        constructor() {
          super(32);
          this.Ah = T256_IV[0] | 0;
          this.Al = T256_IV[1] | 0;
          this.Bh = T256_IV[2] | 0;
          this.Bl = T256_IV[3] | 0;
          this.Ch = T256_IV[4] | 0;
          this.Cl = T256_IV[5] | 0;
          this.Dh = T256_IV[6] | 0;
          this.Dl = T256_IV[7] | 0;
          this.Eh = T256_IV[8] | 0;
          this.El = T256_IV[9] | 0;
          this.Fh = T256_IV[10] | 0;
          this.Fl = T256_IV[11] | 0;
          this.Gh = T256_IV[12] | 0;
          this.Gl = T256_IV[13] | 0;
          this.Hh = T256_IV[14] | 0;
          this.Hl = T256_IV[15] | 0;
        }
      };
      exports.SHA512_256 = SHA512_256;
      exports.sha256 = (0, utils_ts_1.createHasher)(() => new SHA256());
      exports.sha224 = (0, utils_ts_1.createHasher)(() => new SHA224());
      exports.sha512 = (0, utils_ts_1.createHasher)(() => new SHA512());
      exports.sha384 = (0, utils_ts_1.createHasher)(() => new SHA384());
      exports.sha512_256 = (0, utils_ts_1.createHasher)(() => new SHA512_256());
      exports.sha512_224 = (0, utils_ts_1.createHasher)(() => new SHA512_224());
    }
  });

  // node_modules/@noble/hashes/sha256.js
  var require_sha256 = __commonJS({
    "node_modules/@noble/hashes/sha256.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha224 = exports.SHA224 = exports.sha256 = exports.SHA256 = void 0;
      var sha2_ts_1 = require_sha2();
      exports.SHA256 = sha2_ts_1.SHA256;
      exports.sha256 = sha2_ts_1.sha256;
      exports.SHA224 = sha2_ts_1.SHA224;
      exports.sha224 = sha2_ts_1.sha224;
    }
  });

  // node_modules/@noble/hashes/sha1.js
  var require_sha1 = __commonJS({
    "node_modules/@noble/hashes/sha1.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha1 = exports.SHA1 = void 0;
      var legacy_ts_1 = require_legacy();
      exports.SHA1 = legacy_ts_1.SHA1;
      exports.sha1 = legacy_ts_1.sha1;
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/crypto.cjs
  var require_crypto2 = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/crypto.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TAGGED_HASH_PREFIXES = exports.TAGS = exports.sha1 = exports.sha256 = exports.ripemd160 = void 0;
      exports.hash160 = hash160;
      exports.hash256 = hash256;
      exports.taggedHash = taggedHash;
      var ripemd160_1 = require_ripemd160();
      Object.defineProperty(exports, "ripemd160", {
        enumerable: true,
        get: function() {
          return ripemd160_1.ripemd160;
        }
      });
      var sha256_1 = require_sha256();
      Object.defineProperty(exports, "sha256", {
        enumerable: true,
        get: function() {
          return sha256_1.sha256;
        }
      });
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var sha1_1 = require_sha1();
      Object.defineProperty(exports, "sha1", {
        enumerable: true,
        get: function() {
          return sha1_1.sha1;
        }
      });
      function hash160(buffer) {
        return (0, ripemd160_1.ripemd160)((0, sha256_1.sha256)(buffer));
      }
      function hash256(buffer) {
        return (0, sha256_1.sha256)((0, sha256_1.sha256)(buffer));
      }
      exports.TAGS = [
        "BIP0340/challenge",
        "BIP0340/aux",
        "BIP0340/nonce",
        "TapLeaf",
        "TapBranch",
        "TapSighash",
        "TapTweak",
        "KeyAgg list",
        "KeyAgg coefficient"
      ];
      exports.TAGGED_HASH_PREFIXES = {
        "BIP0340/challenge": Uint8Array.from([
          123,
          181,
          45,
          122,
          159,
          239,
          88,
          50,
          62,
          177,
          191,
          122,
          64,
          125,
          179,
          130,
          210,
          243,
          242,
          216,
          27,
          177,
          34,
          79,
          73,
          254,
          81,
          143,
          109,
          72,
          211,
          124,
          123,
          181,
          45,
          122,
          159,
          239,
          88,
          50,
          62,
          177,
          191,
          122,
          64,
          125,
          179,
          130,
          210,
          243,
          242,
          216,
          27,
          177,
          34,
          79,
          73,
          254,
          81,
          143,
          109,
          72,
          211,
          124
        ]),
        "BIP0340/aux": Uint8Array.from([
          241,
          239,
          78,
          94,
          192,
          99,
          202,
          218,
          109,
          148,
          202,
          250,
          157,
          152,
          126,
          160,
          105,
          38,
          88,
          57,
          236,
          193,
          31,
          151,
          45,
          119,
          165,
          46,
          216,
          193,
          204,
          144,
          241,
          239,
          78,
          94,
          192,
          99,
          202,
          218,
          109,
          148,
          202,
          250,
          157,
          152,
          126,
          160,
          105,
          38,
          88,
          57,
          236,
          193,
          31,
          151,
          45,
          119,
          165,
          46,
          216,
          193,
          204,
          144
        ]),
        "BIP0340/nonce": Uint8Array.from([
          7,
          73,
          119,
          52,
          167,
          155,
          203,
          53,
          91,
          155,
          140,
          125,
          3,
          79,
          18,
          28,
          244,
          52,
          215,
          62,
          247,
          45,
          218,
          25,
          135,
          0,
          97,
          251,
          82,
          191,
          235,
          47,
          7,
          73,
          119,
          52,
          167,
          155,
          203,
          53,
          91,
          155,
          140,
          125,
          3,
          79,
          18,
          28,
          244,
          52,
          215,
          62,
          247,
          45,
          218,
          25,
          135,
          0,
          97,
          251,
          82,
          191,
          235,
          47
        ]),
        TapLeaf: Uint8Array.from([
          174,
          234,
          143,
          220,
          66,
          8,
          152,
          49,
          5,
          115,
          75,
          88,
          8,
          29,
          30,
          38,
          56,
          211,
          95,
          28,
          181,
          64,
          8,
          212,
          211,
          87,
          202,
          3,
          190,
          120,
          233,
          238,
          174,
          234,
          143,
          220,
          66,
          8,
          152,
          49,
          5,
          115,
          75,
          88,
          8,
          29,
          30,
          38,
          56,
          211,
          95,
          28,
          181,
          64,
          8,
          212,
          211,
          87,
          202,
          3,
          190,
          120,
          233,
          238
        ]),
        TapBranch: Uint8Array.from([
          25,
          65,
          161,
          242,
          229,
          110,
          185,
          95,
          162,
          169,
          241,
          148,
          190,
          92,
          1,
          247,
          33,
          111,
          51,
          237,
          130,
          176,
          145,
          70,
          52,
          144,
          208,
          91,
          245,
          22,
          160,
          21,
          25,
          65,
          161,
          242,
          229,
          110,
          185,
          95,
          162,
          169,
          241,
          148,
          190,
          92,
          1,
          247,
          33,
          111,
          51,
          237,
          130,
          176,
          145,
          70,
          52,
          144,
          208,
          91,
          245,
          22,
          160,
          21
        ]),
        TapSighash: Uint8Array.from([
          244,
          10,
          72,
          223,
          75,
          42,
          112,
          200,
          180,
          146,
          75,
          242,
          101,
          70,
          97,
          237,
          61,
          149,
          253,
          102,
          163,
          19,
          235,
          135,
          35,
          117,
          151,
          198,
          40,
          228,
          160,
          49,
          244,
          10,
          72,
          223,
          75,
          42,
          112,
          200,
          180,
          146,
          75,
          242,
          101,
          70,
          97,
          237,
          61,
          149,
          253,
          102,
          163,
          19,
          235,
          135,
          35,
          117,
          151,
          198,
          40,
          228,
          160,
          49
        ]),
        TapTweak: Uint8Array.from([
          232,
          15,
          225,
          99,
          156,
          156,
          160,
          80,
          227,
          175,
          27,
          57,
          193,
          67,
          198,
          62,
          66,
          156,
          188,
          235,
          21,
          217,
          64,
          251,
          181,
          197,
          161,
          244,
          175,
          87,
          197,
          233,
          232,
          15,
          225,
          99,
          156,
          156,
          160,
          80,
          227,
          175,
          27,
          57,
          193,
          67,
          198,
          62,
          66,
          156,
          188,
          235,
          21,
          217,
          64,
          251,
          181,
          197,
          161,
          244,
          175,
          87,
          197,
          233
        ]),
        "KeyAgg list": Uint8Array.from([
          72,
          28,
          151,
          28,
          60,
          11,
          70,
          215,
          240,
          178,
          117,
          174,
          89,
          141,
          78,
          44,
          126,
          215,
          49,
          156,
          89,
          74,
          92,
          110,
          199,
          158,
          160,
          212,
          153,
          2,
          148,
          240,
          72,
          28,
          151,
          28,
          60,
          11,
          70,
          215,
          240,
          178,
          117,
          174,
          89,
          141,
          78,
          44,
          126,
          215,
          49,
          156,
          89,
          74,
          92,
          110,
          199,
          158,
          160,
          212,
          153,
          2,
          148,
          240
        ]),
        "KeyAgg coefficient": Uint8Array.from([
          191,
          201,
          4,
          3,
          77,
          28,
          136,
          232,
          200,
          14,
          34,
          229,
          61,
          36,
          86,
          109,
          100,
          130,
          78,
          214,
          66,
          114,
          129,
          192,
          145,
          0,
          249,
          77,
          205,
          82,
          201,
          129,
          191,
          201,
          4,
          3,
          77,
          28,
          136,
          232,
          200,
          14,
          34,
          229,
          61,
          36,
          86,
          109,
          100,
          130,
          78,
          214,
          66,
          114,
          129,
          192,
          145,
          0,
          249,
          77,
          205,
          82,
          201,
          129
        ])
      };
      function taggedHash(prefix, data) {
        return (0, sha256_1.sha256)(
          tools.concat([exports.TAGGED_HASH_PREFIXES[prefix], data])
        );
      }
    }
  });

  // node_modules/base-x/src/cjs/index.cjs
  var require_cjs = __commonJS({
    "node_modules/base-x/src/cjs/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function base(ALPHABET) {
        if (ALPHABET.length >= 255) {
          throw new TypeError("Alphabet too long");
        }
        const BASE_MAP = new Uint8Array(256);
        for (let j = 0; j < BASE_MAP.length; j++) {
          BASE_MAP[j] = 255;
        }
        for (let i = 0; i < ALPHABET.length; i++) {
          const x = ALPHABET.charAt(i);
          const xc = x.charCodeAt(0);
          if (BASE_MAP[xc] !== 255) {
            throw new TypeError(x + " is ambiguous");
          }
          BASE_MAP[xc] = i;
        }
        const BASE = ALPHABET.length;
        const LEADER = ALPHABET.charAt(0);
        const FACTOR = Math.log(BASE) / Math.log(256);
        const iFACTOR = Math.log(256) / Math.log(BASE);
        function encode(source) {
          if (source instanceof Uint8Array) {
          } else if (ArrayBuffer.isView(source)) {
            source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
          } else if (Array.isArray(source)) {
            source = Uint8Array.from(source);
          }
          if (!(source instanceof Uint8Array)) {
            throw new TypeError("Expected Uint8Array");
          }
          if (source.length === 0) {
            return "";
          }
          let zeroes = 0;
          let length = 0;
          let pbegin = 0;
          const pend = source.length;
          while (pbegin !== pend && source[pbegin] === 0) {
            pbegin++;
            zeroes++;
          }
          const size = (pend - pbegin) * iFACTOR + 1 >>> 0;
          const b58 = new Uint8Array(size);
          while (pbegin !== pend) {
            let carry = source[pbegin];
            let i = 0;
            for (let it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++) {
              carry += 256 * b58[it1] >>> 0;
              b58[it1] = carry % BASE >>> 0;
              carry = carry / BASE >>> 0;
            }
            if (carry !== 0) {
              throw new Error("Non-zero carry");
            }
            length = i;
            pbegin++;
          }
          let it2 = size - length;
          while (it2 !== size && b58[it2] === 0) {
            it2++;
          }
          let str = LEADER.repeat(zeroes);
          for (; it2 < size; ++it2) {
            str += ALPHABET.charAt(b58[it2]);
          }
          return str;
        }
        function decodeUnsafe(source) {
          if (typeof source !== "string") {
            throw new TypeError("Expected String");
          }
          if (source.length === 0) {
            return new Uint8Array();
          }
          let psz = 0;
          let zeroes = 0;
          let length = 0;
          while (source[psz] === LEADER) {
            zeroes++;
            psz++;
          }
          const size = (source.length - psz) * FACTOR + 1 >>> 0;
          const b256 = new Uint8Array(size);
          while (psz < source.length) {
            const charCode = source.charCodeAt(psz);
            if (charCode > 255) {
              return;
            }
            let carry = BASE_MAP[charCode];
            if (carry === 255) {
              return;
            }
            let i = 0;
            for (let it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++) {
              carry += BASE * b256[it3] >>> 0;
              b256[it3] = carry % 256 >>> 0;
              carry = carry / 256 >>> 0;
            }
            if (carry !== 0) {
              throw new Error("Non-zero carry");
            }
            length = i;
            psz++;
          }
          let it4 = size - length;
          while (it4 !== size && b256[it4] === 0) {
            it4++;
          }
          const vch = new Uint8Array(zeroes + (size - it4));
          let j = zeroes;
          while (it4 !== size) {
            vch[j++] = b256[it4++];
          }
          return vch;
        }
        function decode(string) {
          const buffer = decodeUnsafe(string);
          if (buffer) {
            return buffer;
          }
          throw new Error("Non-base" + BASE + " character");
        }
        return {
          encode,
          decodeUnsafe,
          decode
        };
      }
      exports.default = base;
    }
  });

  // node_modules/bs58/src/cjs/index.cjs
  var require_cjs2 = __commonJS({
    "node_modules/bs58/src/cjs/index.cjs"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var base_x_1 = __importDefault(require_cjs());
      var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
      exports.default = (0, base_x_1.default)(ALPHABET);
    }
  });

  // node_modules/bs58check/src/cjs/base.cjs
  var require_base = __commonJS({
    "node_modules/bs58check/src/cjs/base.cjs"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.default = default_1;
      var bs58_1 = __importDefault(require_cjs2());
      function default_1(checksumFn) {
        function encode(payload) {
          var payloadU8 = Uint8Array.from(payload);
          var checksum = checksumFn(payloadU8);
          var length = payloadU8.length + 4;
          var both = new Uint8Array(length);
          both.set(payloadU8, 0);
          both.set(checksum.subarray(0, 4), payloadU8.length);
          return bs58_1.default.encode(both);
        }
        function decodeRaw(buffer) {
          var payload = buffer.slice(0, -4);
          var checksum = buffer.slice(-4);
          var newChecksum = checksumFn(payload);
          if (checksum[0] ^ newChecksum[0] | checksum[1] ^ newChecksum[1] | checksum[2] ^ newChecksum[2] | checksum[3] ^ newChecksum[3])
            return;
          return payload;
        }
        function decodeUnsafe(str) {
          var buffer = bs58_1.default.decodeUnsafe(str);
          if (buffer == null)
            return;
          return decodeRaw(buffer);
        }
        function decode(str) {
          var buffer = bs58_1.default.decode(str);
          var payload = decodeRaw(buffer);
          if (payload == null)
            throw new Error("Invalid checksum");
          return payload;
        }
        return {
          encode,
          decode,
          decodeUnsafe
        };
      }
    }
  });

  // node_modules/bs58check/src/cjs/index.cjs
  var require_cjs3 = __commonJS({
    "node_modules/bs58check/src/cjs/index.cjs"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var sha256_1 = require_sha256();
      var base_js_1 = __importDefault(require_base());
      function sha256x2(buffer) {
        return (0, sha256_1.sha256)((0, sha256_1.sha256)(buffer));
      }
      exports.default = (0, base_js_1.default)(sha256x2);
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/payments/p2pkh.cjs
  var require_p2pkh = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/payments/p2pkh.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.p2pkh = p2pkh;
      var bcrypto = __importStar(require_crypto2());
      var networks_js_1 = require_networks();
      var bscript = __importStar(require_script());
      var types_js_1 = require_types();
      var lazy = __importStar(require_lazy());
      var bs58check_1 = __importDefault(require_cjs3());
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var v = __importStar(require_dist());
      var OPS = bscript.OPS;
      function p2pkh(a, opts) {
        if (!a.address && !a.hash && !a.output && !a.pubkey && !a.input)
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        v.parse(
          v.partial(
            v.object({
              network: v.object({}),
              address: v.string(),
              hash: types_js_1.Hash160bitSchema,
              output: (0, types_js_1.NBufferSchemaFactory)(25),
              pubkey: v.custom(types_js_1.isPoint),
              signature: v.custom(bscript.isCanonicalScriptSignature),
              input: types_js_1.BufferSchema
            })
          ),
          a
        );
        const _address = lazy.value(() => {
          const payload = bs58check_1.default.decode(a.address);
          const version = tools.readUInt8(payload, 0);
          const hash = payload.slice(1);
          return { version, hash };
        });
        const _chunks = lazy.value(() => {
          return bscript.decompile(a.input);
        });
        const network = a.network || networks_js_1.bitcoin;
        const o = { name: "p2pkh", network };
        lazy.prop(o, "address", () => {
          if (!o.hash) return;
          const payload = new Uint8Array(21);
          tools.writeUInt8(payload, 0, network.pubKeyHash);
          payload.set(o.hash, 1);
          return bs58check_1.default.encode(payload);
        });
        lazy.prop(o, "hash", () => {
          if (a.output) return a.output.slice(3, 23);
          if (a.address) return _address().hash;
          if (a.pubkey || o.pubkey) return bcrypto.hash160(a.pubkey || o.pubkey);
        });
        lazy.prop(o, "output", () => {
          if (!o.hash) return;
          return bscript.compile([
            OPS.OP_DUP,
            OPS.OP_HASH160,
            o.hash,
            OPS.OP_EQUALVERIFY,
            OPS.OP_CHECKSIG
          ]);
        });
        lazy.prop(o, "pubkey", () => {
          if (!a.input) return;
          return _chunks()[1];
        });
        lazy.prop(o, "signature", () => {
          if (!a.input) return;
          return _chunks()[0];
        });
        lazy.prop(o, "input", () => {
          if (!a.pubkey) return;
          if (!a.signature) return;
          return bscript.compile([a.signature, a.pubkey]);
        });
        lazy.prop(o, "witness", () => {
          if (!o.input) return;
          return [];
        });
        if (opts.validate) {
          let hash = Uint8Array.from([]);
          if (a.address) {
            if (_address().version !== network.pubKeyHash)
              throw new TypeError("Invalid version or Network mismatch");
            if (_address().hash.length !== 20) throw new TypeError("Invalid address");
            hash = _address().hash;
          }
          if (a.hash) {
            if (hash.length > 0 && tools.compare(hash, a.hash) !== 0)
              throw new TypeError("Hash mismatch");
            else hash = a.hash;
          }
          if (a.output) {
            if (a.output.length !== 25 || a.output[0] !== OPS.OP_DUP || a.output[1] !== OPS.OP_HASH160 || a.output[2] !== 20 || a.output[23] !== OPS.OP_EQUALVERIFY || a.output[24] !== OPS.OP_CHECKSIG)
              throw new TypeError("Output is invalid");
            const hash2 = a.output.slice(3, 23);
            if (hash.length > 0 && tools.compare(hash, hash2) !== 0)
              throw new TypeError("Hash mismatch");
            else hash = hash2;
          }
          if (a.pubkey) {
            const pkh = bcrypto.hash160(a.pubkey);
            if (hash.length > 0 && tools.compare(hash, pkh) !== 0)
              throw new TypeError("Hash mismatch");
            else hash = pkh;
          }
          if (a.input) {
            const chunks = _chunks();
            if (chunks.length !== 2) throw new TypeError("Input is invalid");
            if (!bscript.isCanonicalScriptSignature(chunks[0]))
              throw new TypeError("Input has invalid signature");
            if (!(0, types_js_1.isPoint)(chunks[1]))
              throw new TypeError("Input has invalid pubkey");
            if (a.signature && tools.compare(a.signature, chunks[0]) !== 0)
              throw new TypeError("Signature mismatch");
            if (a.pubkey && tools.compare(a.pubkey, chunks[1]) !== 0)
              throw new TypeError("Pubkey mismatch");
            const pkh = bcrypto.hash160(chunks[1]);
            if (hash.length > 0 && tools.compare(hash, pkh) !== 0)
              throw new TypeError("Hash mismatch");
          }
        }
        return Object.assign(o, a);
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/payments/p2sh.cjs
  var require_p2sh = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/payments/p2sh.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.p2sh = p2sh;
      var bcrypto = __importStar(require_crypto2());
      var networks_js_1 = require_networks();
      var bscript = __importStar(require_script());
      var types_js_1 = require_types();
      var lazy = __importStar(require_lazy());
      var bs58check_1 = __importDefault(require_cjs3());
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var v = __importStar(require_dist());
      var OPS = bscript.OPS;
      function p2sh(a, opts) {
        if (!a.address && !a.hash && !a.output && !a.redeem && !a.input)
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        v.parse(
          v.partial(
            v.object({
              network: v.object({}),
              address: v.string(),
              hash: (0, types_js_1.NBufferSchemaFactory)(20),
              output: (0, types_js_1.NBufferSchemaFactory)(23),
              redeem: v.partial(
                v.object({
                  network: v.object({}),
                  output: types_js_1.BufferSchema,
                  input: types_js_1.BufferSchema,
                  witness: v.array(types_js_1.BufferSchema)
                })
              ),
              input: types_js_1.BufferSchema,
              witness: v.array(types_js_1.BufferSchema)
            })
          ),
          a
        );
        let network = a.network;
        if (!network) {
          network = a.redeem && a.redeem.network || networks_js_1.bitcoin;
        }
        const o = { network };
        const _address = lazy.value(() => {
          const payload = bs58check_1.default.decode(a.address);
          const version = tools.readUInt8(payload, 0);
          const hash = payload.slice(1);
          return { version, hash };
        });
        const _chunks = lazy.value(() => {
          return bscript.decompile(a.input);
        });
        const _redeem = lazy.value(() => {
          const chunks = _chunks();
          const lastChunk = chunks[chunks.length - 1];
          return {
            network,
            output: lastChunk === OPS.OP_FALSE ? Uint8Array.from([]) : lastChunk,
            input: bscript.compile(chunks.slice(0, -1)),
            witness: a.witness || []
          };
        });
        lazy.prop(o, "address", () => {
          if (!o.hash) return;
          const payload = new Uint8Array(21);
          tools.writeUInt8(payload, 0, o.network.scriptHash);
          payload.set(o.hash, 1);
          return bs58check_1.default.encode(payload);
        });
        lazy.prop(o, "hash", () => {
          if (a.output) return a.output.slice(2, 22);
          if (a.address) return _address().hash;
          if (o.redeem && o.redeem.output) return bcrypto.hash160(o.redeem.output);
        });
        lazy.prop(o, "output", () => {
          if (!o.hash) return;
          return bscript.compile([OPS.OP_HASH160, o.hash, OPS.OP_EQUAL]);
        });
        lazy.prop(o, "redeem", () => {
          if (!a.input) return;
          return _redeem();
        });
        lazy.prop(o, "input", () => {
          if (!a.redeem || !a.redeem.input || !a.redeem.output) return;
          return bscript.compile(
            [].concat(bscript.decompile(a.redeem.input), a.redeem.output)
          );
        });
        lazy.prop(o, "witness", () => {
          if (o.redeem && o.redeem.witness) return o.redeem.witness;
          if (o.input) return [];
        });
        lazy.prop(o, "name", () => {
          const nameParts = ["p2sh"];
          if (o.redeem !== void 0 && o.redeem.name !== void 0)
            nameParts.push(o.redeem.name);
          return nameParts.join("-");
        });
        if (opts.validate) {
          let hash = Uint8Array.from([]);
          if (a.address) {
            if (_address().version !== network.scriptHash)
              throw new TypeError("Invalid version or Network mismatch");
            if (_address().hash.length !== 20) throw new TypeError("Invalid address");
            hash = _address().hash;
          }
          if (a.hash) {
            if (hash.length > 0 && tools.compare(hash, a.hash) !== 0)
              throw new TypeError("Hash mismatch");
            else hash = a.hash;
          }
          if (a.output) {
            if (a.output.length !== 23 || a.output[0] !== OPS.OP_HASH160 || a.output[1] !== 20 || a.output[22] !== OPS.OP_EQUAL)
              throw new TypeError("Output is invalid");
            const hash2 = a.output.slice(2, 22);
            if (hash.length > 0 && tools.compare(hash, hash2) !== 0)
              throw new TypeError("Hash mismatch");
            else hash = hash2;
          }
          const checkRedeem = (redeem) => {
            if (redeem.output) {
              const decompile = bscript.decompile(redeem.output);
              if (!decompile || decompile.length < 1)
                throw new TypeError("Redeem.output too short");
              if (redeem.output.byteLength > 520)
                throw new TypeError(
                  "Redeem.output unspendable if larger than 520 bytes"
                );
              if (bscript.countNonPushOnlyOPs(decompile) > 201)
                throw new TypeError(
                  "Redeem.output unspendable with more than 201 non-push ops"
                );
              const hash2 = bcrypto.hash160(redeem.output);
              if (hash.length > 0 && tools.compare(hash, hash2) !== 0)
                throw new TypeError("Hash mismatch");
              else hash = hash2;
            }
            if (redeem.input) {
              const hasInput = redeem.input.length > 0;
              const hasWitness = redeem.witness && redeem.witness.length > 0;
              if (!hasInput && !hasWitness) throw new TypeError("Empty input");
              if (hasInput && hasWitness)
                throw new TypeError("Input and witness provided");
              if (hasInput) {
                const richunks = bscript.decompile(redeem.input);
                if (!bscript.isPushOnly(richunks))
                  throw new TypeError("Non push-only scriptSig");
              }
            }
          };
          if (a.input) {
            const chunks = _chunks();
            if (!chunks || chunks.length < 1) throw new TypeError("Input too short");
            if (!(_redeem().output instanceof Uint8Array))
              throw new TypeError("Input is invalid");
            checkRedeem(_redeem());
          }
          if (a.redeem) {
            if (a.redeem.network && a.redeem.network !== network)
              throw new TypeError("Network mismatch");
            if (a.input) {
              const redeem = _redeem();
              if (a.redeem.output && tools.compare(a.redeem.output, redeem.output) !== 0)
                throw new TypeError("Redeem.output mismatch");
              if (a.redeem.input && tools.compare(a.redeem.input, redeem.input) !== 0)
                throw new TypeError("Redeem.input mismatch");
            }
            checkRedeem(a.redeem);
          }
          if (a.witness) {
            if (a.redeem && a.redeem.witness && !(0, types_js_1.stacksEqual)(a.redeem.witness, a.witness))
              throw new TypeError("Witness and redeem.witness mismatch");
          }
        }
        return Object.assign(o, a);
      }
    }
  });

  // node_modules/bech32/dist/index.js
  var require_dist2 = __commonJS({
    "node_modules/bech32/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bech32m = exports.bech32 = void 0;
      var ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
      var ALPHABET_MAP = {};
      for (let z = 0; z < ALPHABET.length; z++) {
        const x = ALPHABET.charAt(z);
        ALPHABET_MAP[x] = z;
      }
      function polymodStep(pre) {
        const b = pre >> 25;
        return (pre & 33554431) << 5 ^ -(b >> 0 & 1) & 996825010 ^ -(b >> 1 & 1) & 642813549 ^ -(b >> 2 & 1) & 513874426 ^ -(b >> 3 & 1) & 1027748829 ^ -(b >> 4 & 1) & 705979059;
      }
      function prefixChk(prefix) {
        let chk = 1;
        for (let i = 0; i < prefix.length; ++i) {
          const c = prefix.charCodeAt(i);
          if (c < 33 || c > 126)
            return "Invalid prefix (" + prefix + ")";
          chk = polymodStep(chk) ^ c >> 5;
        }
        chk = polymodStep(chk);
        for (let i = 0; i < prefix.length; ++i) {
          const v = prefix.charCodeAt(i);
          chk = polymodStep(chk) ^ v & 31;
        }
        return chk;
      }
      function convert(data, inBits, outBits, pad) {
        let value = 0;
        let bits = 0;
        const maxV = (1 << outBits) - 1;
        const result = [];
        for (let i = 0; i < data.length; ++i) {
          value = value << inBits | data[i];
          bits += inBits;
          while (bits >= outBits) {
            bits -= outBits;
            result.push(value >> bits & maxV);
          }
        }
        if (pad) {
          if (bits > 0) {
            result.push(value << outBits - bits & maxV);
          }
        } else {
          if (bits >= inBits)
            return "Excess padding";
          if (value << outBits - bits & maxV)
            return "Non-zero padding";
        }
        return result;
      }
      function toWords(bytes) {
        return convert(bytes, 8, 5, true);
      }
      function fromWordsUnsafe(words) {
        const res = convert(words, 5, 8, false);
        if (Array.isArray(res))
          return res;
      }
      function fromWords(words) {
        const res = convert(words, 5, 8, false);
        if (Array.isArray(res))
          return res;
        throw new Error(res);
      }
      function getLibraryFromEncoding(encoding) {
        let ENCODING_CONST;
        if (encoding === "bech32") {
          ENCODING_CONST = 1;
        } else {
          ENCODING_CONST = 734539939;
        }
        function encode(prefix, words, LIMIT) {
          LIMIT = LIMIT || 90;
          if (prefix.length + 7 + words.length > LIMIT)
            throw new TypeError("Exceeds length limit");
          prefix = prefix.toLowerCase();
          let chk = prefixChk(prefix);
          if (typeof chk === "string")
            throw new Error(chk);
          let result = prefix + "1";
          for (let i = 0; i < words.length; ++i) {
            const x = words[i];
            if (x >> 5 !== 0)
              throw new Error("Non 5-bit word");
            chk = polymodStep(chk) ^ x;
            result += ALPHABET.charAt(x);
          }
          for (let i = 0; i < 6; ++i) {
            chk = polymodStep(chk);
          }
          chk ^= ENCODING_CONST;
          for (let i = 0; i < 6; ++i) {
            const v = chk >> (5 - i) * 5 & 31;
            result += ALPHABET.charAt(v);
          }
          return result;
        }
        function __decode(str, LIMIT) {
          LIMIT = LIMIT || 90;
          if (str.length < 8)
            return str + " too short";
          if (str.length > LIMIT)
            return "Exceeds length limit";
          const lowered = str.toLowerCase();
          const uppered = str.toUpperCase();
          if (str !== lowered && str !== uppered)
            return "Mixed-case string " + str;
          str = lowered;
          const split = str.lastIndexOf("1");
          if (split === -1)
            return "No separator character for " + str;
          if (split === 0)
            return "Missing prefix for " + str;
          const prefix = str.slice(0, split);
          const wordChars = str.slice(split + 1);
          if (wordChars.length < 6)
            return "Data too short";
          let chk = prefixChk(prefix);
          if (typeof chk === "string")
            return chk;
          const words = [];
          for (let i = 0; i < wordChars.length; ++i) {
            const c = wordChars.charAt(i);
            const v = ALPHABET_MAP[c];
            if (v === void 0)
              return "Unknown character " + c;
            chk = polymodStep(chk) ^ v;
            if (i + 6 >= wordChars.length)
              continue;
            words.push(v);
          }
          if (chk !== ENCODING_CONST)
            return "Invalid checksum for " + str;
          return { prefix, words };
        }
        function decodeUnsafe(str, LIMIT) {
          const res = __decode(str, LIMIT);
          if (typeof res === "object")
            return res;
        }
        function decode(str, LIMIT) {
          const res = __decode(str, LIMIT);
          if (typeof res === "object")
            return res;
          throw new Error(res);
        }
        return {
          decodeUnsafe,
          decode,
          encode,
          toWords,
          fromWordsUnsafe,
          fromWords
        };
      }
      exports.bech32 = getLibraryFromEncoding("bech32");
      exports.bech32m = getLibraryFromEncoding("bech32m");
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/payments/p2wpkh.cjs
  var require_p2wpkh = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/payments/p2wpkh.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.p2wpkh = p2wpkh;
      var bcrypto = __importStar(require_crypto2());
      var networks_js_1 = require_networks();
      var bscript = __importStar(require_script());
      var types_js_1 = require_types();
      var lazy = __importStar(require_lazy());
      var bech32_1 = require_dist2();
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var v = __importStar(require_dist());
      var OPS = bscript.OPS;
      var EMPTY_BUFFER = new Uint8Array(0);
      function p2wpkh(a, opts) {
        if (!a.address && !a.hash && !a.output && !a.pubkey && !a.witness)
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        v.parse(
          v.partial(
            v.object({
              address: v.string(),
              hash: (0, types_js_1.NBufferSchemaFactory)(20),
              input: (0, types_js_1.NBufferSchemaFactory)(0),
              network: v.object({}),
              output: (0, types_js_1.NBufferSchemaFactory)(22),
              pubkey: v.custom(types_js_1.isPoint, "Not a valid pubkey"),
              signature: v.custom(bscript.isCanonicalScriptSignature),
              witness: v.array(types_js_1.BufferSchema)
            })
          ),
          a
        );
        const _address = lazy.value(() => {
          const result = bech32_1.bech32.decode(a.address);
          const version = result.words.shift();
          const data = bech32_1.bech32.fromWords(result.words);
          return {
            version,
            prefix: result.prefix,
            data: Uint8Array.from(data)
          };
        });
        const network = a.network || networks_js_1.bitcoin;
        const o = { name: "p2wpkh", network };
        lazy.prop(o, "address", () => {
          if (!o.hash) return;
          const words = bech32_1.bech32.toWords(o.hash);
          words.unshift(0);
          return bech32_1.bech32.encode(network.bech32, words);
        });
        lazy.prop(o, "hash", () => {
          if (a.output) return a.output.slice(2, 22);
          if (a.address) return _address().data;
          if (a.pubkey || o.pubkey) return bcrypto.hash160(a.pubkey || o.pubkey);
        });
        lazy.prop(o, "output", () => {
          if (!o.hash) return;
          return bscript.compile([OPS.OP_0, o.hash]);
        });
        lazy.prop(o, "pubkey", () => {
          if (a.pubkey) return a.pubkey;
          if (!a.witness) return;
          return a.witness[1];
        });
        lazy.prop(o, "signature", () => {
          if (!a.witness) return;
          return a.witness[0];
        });
        lazy.prop(o, "input", () => {
          if (!o.witness) return;
          return EMPTY_BUFFER;
        });
        lazy.prop(o, "witness", () => {
          if (!a.pubkey) return;
          if (!a.signature) return;
          return [a.signature, a.pubkey];
        });
        if (opts.validate) {
          let hash = Uint8Array.from([]);
          if (a.address) {
            if (network && network.bech32 !== _address().prefix)
              throw new TypeError("Invalid prefix or Network mismatch");
            if (_address().version !== 0)
              throw new TypeError("Invalid address version");
            if (_address().data.length !== 20)
              throw new TypeError("Invalid address data");
            hash = _address().data;
          }
          if (a.hash) {
            if (hash.length > 0 && tools.compare(hash, a.hash) !== 0)
              throw new TypeError("Hash mismatch");
            else hash = a.hash;
          }
          if (a.output) {
            if (a.output.length !== 22 || a.output[0] !== OPS.OP_0 || a.output[1] !== 20)
              throw new TypeError("Output is invalid");
            if (hash.length > 0 && tools.compare(hash, a.output.slice(2)) !== 0)
              throw new TypeError("Hash mismatch");
            else hash = a.output.slice(2);
          }
          if (a.pubkey) {
            const pkh = bcrypto.hash160(a.pubkey);
            if (hash.length > 0 && tools.compare(hash, pkh) !== 0)
              throw new TypeError("Hash mismatch");
            else hash = pkh;
            if (!(0, types_js_1.isPoint)(a.pubkey) || a.pubkey.length !== 33)
              throw new TypeError("Invalid pubkey for p2wpkh");
          }
          if (a.witness) {
            if (a.witness.length !== 2) throw new TypeError("Witness is invalid");
            if (!bscript.isCanonicalScriptSignature(a.witness[0]))
              throw new TypeError("Witness has invalid signature");
            if (!(0, types_js_1.isPoint)(a.witness[1]) || a.witness[1].length !== 33)
              throw new TypeError("Witness has invalid pubkey");
            if (a.signature && tools.compare(a.signature, a.witness[0]) !== 0)
              throw new TypeError("Signature mismatch");
            if (a.pubkey && tools.compare(a.pubkey, a.witness[1]) !== 0)
              throw new TypeError("Pubkey mismatch");
            const pkh = bcrypto.hash160(a.witness[1]);
            if (hash.length > 0 && tools.compare(hash, pkh) !== 0)
              throw new TypeError("Hash mismatch");
          }
        }
        return Object.assign(o, a);
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/payments/p2wsh.cjs
  var require_p2wsh = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/payments/p2wsh.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.p2wsh = p2wsh;
      var sha256_1 = require_sha256();
      var networks_js_1 = require_networks();
      var bscript = __importStar(require_script());
      var types_js_1 = require_types();
      var lazy = __importStar(require_lazy());
      var bech32_1 = require_dist2();
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var v = __importStar(require_dist());
      var OPS = bscript.OPS;
      var EMPTY_BUFFER = new Uint8Array(0);
      function chunkHasUncompressedPubkey(chunk) {
        if (chunk instanceof Uint8Array && chunk.length === 65 && chunk[0] === 4 && (0, types_js_1.isPoint)(chunk)) {
          return true;
        } else {
          return false;
        }
      }
      function p2wsh(a, opts) {
        if (!a.address && !a.hash && !a.output && !a.redeem && !a.witness)
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        v.parse(
          (0, types_js_1.NullablePartial)({
            network: v.object({}),
            address: v.string(),
            hash: types_js_1.Buffer256bitSchema,
            output: (0, types_js_1.NBufferSchemaFactory)(34),
            redeem: (0, types_js_1.NullablePartial)({
              input: types_js_1.BufferSchema,
              network: v.object({}),
              output: types_js_1.BufferSchema,
              witness: v.array(types_js_1.BufferSchema)
            }),
            input: (0, types_js_1.NBufferSchemaFactory)(0),
            witness: v.array(types_js_1.BufferSchema)
          }),
          a
        );
        const _address = lazy.value(() => {
          const result = bech32_1.bech32.decode(a.address);
          const version = result.words.shift();
          const data = bech32_1.bech32.fromWords(result.words);
          return {
            version,
            prefix: result.prefix,
            data: Uint8Array.from(data)
          };
        });
        const _rchunks = lazy.value(() => {
          return bscript.decompile(a.redeem.input);
        });
        let network = a.network;
        if (!network) {
          network = a.redeem && a.redeem.network || networks_js_1.bitcoin;
        }
        const o = { network };
        lazy.prop(o, "address", () => {
          if (!o.hash) return;
          const words = bech32_1.bech32.toWords(o.hash);
          words.unshift(0);
          return bech32_1.bech32.encode(network.bech32, words);
        });
        lazy.prop(o, "hash", () => {
          if (a.output) return a.output.slice(2);
          if (a.address) return _address().data;
          if (o.redeem && o.redeem.output)
            return (0, sha256_1.sha256)(o.redeem.output);
        });
        lazy.prop(o, "output", () => {
          if (!o.hash) return;
          return bscript.compile([OPS.OP_0, o.hash]);
        });
        lazy.prop(o, "redeem", () => {
          if (!a.witness) return;
          return {
            output: a.witness[a.witness.length - 1],
            input: EMPTY_BUFFER,
            witness: a.witness.slice(0, -1)
          };
        });
        lazy.prop(o, "input", () => {
          if (!o.witness) return;
          return EMPTY_BUFFER;
        });
        lazy.prop(o, "witness", () => {
          if (a.redeem && a.redeem.input && a.redeem.input.length > 0 && a.redeem.output && a.redeem.output.length > 0) {
            const stack = bscript.toStack(_rchunks());
            o.redeem = Object.assign({ witness: stack }, a.redeem);
            o.redeem.input = EMPTY_BUFFER;
            return [].concat(stack, a.redeem.output);
          }
          if (!a.redeem) return;
          if (!a.redeem.output) return;
          if (!a.redeem.witness) return;
          return [].concat(a.redeem.witness, a.redeem.output);
        });
        lazy.prop(o, "name", () => {
          const nameParts = ["p2wsh"];
          if (o.redeem !== void 0 && o.redeem.name !== void 0)
            nameParts.push(o.redeem.name);
          return nameParts.join("-");
        });
        if (opts.validate) {
          let hash = Uint8Array.from([]);
          if (a.address) {
            if (_address().prefix !== network.bech32)
              throw new TypeError("Invalid prefix or Network mismatch");
            if (_address().version !== 0)
              throw new TypeError("Invalid address version");
            if (_address().data.length !== 32)
              throw new TypeError("Invalid address data");
            hash = _address().data;
          }
          if (a.hash) {
            if (hash.length > 0 && tools.compare(hash, a.hash) !== 0)
              throw new TypeError("Hash mismatch");
            else hash = a.hash;
          }
          if (a.output) {
            if (a.output.length !== 34 || a.output[0] !== OPS.OP_0 || a.output[1] !== 32)
              throw new TypeError("Output is invalid");
            const hash2 = a.output.slice(2);
            if (hash.length > 0 && tools.compare(hash, hash2) !== 0)
              throw new TypeError("Hash mismatch");
            else hash = hash2;
          }
          if (a.redeem) {
            if (a.redeem.network && a.redeem.network !== network)
              throw new TypeError("Network mismatch");
            if (a.redeem.input && a.redeem.input.length > 0 && a.redeem.witness && a.redeem.witness.length > 0)
              throw new TypeError("Ambiguous witness source");
            if (a.redeem.output) {
              const decompile = bscript.decompile(a.redeem.output);
              if (!decompile || decompile.length < 1)
                throw new TypeError("Redeem.output is invalid");
              if (a.redeem.output.byteLength > 3600)
                throw new TypeError(
                  "Redeem.output unspendable if larger than 3600 bytes"
                );
              if (bscript.countNonPushOnlyOPs(decompile) > 201)
                throw new TypeError(
                  "Redeem.output unspendable with more than 201 non-push ops"
                );
              const hash2 = (0, sha256_1.sha256)(a.redeem.output);
              if (hash.length > 0 && tools.compare(hash, hash2) !== 0)
                throw new TypeError("Hash mismatch");
              else hash = hash2;
            }
            if (a.redeem.input && !bscript.isPushOnly(_rchunks()))
              throw new TypeError("Non push-only scriptSig");
            if (a.witness && a.redeem.witness && !(0, types_js_1.stacksEqual)(a.witness, a.redeem.witness))
              throw new TypeError("Witness and redeem.witness mismatch");
            if (a.redeem.input && _rchunks().some(chunkHasUncompressedPubkey) || a.redeem.output && (bscript.decompile(a.redeem.output) || []).some(
              chunkHasUncompressedPubkey
            )) {
              throw new TypeError(
                "redeem.input or redeem.output contains uncompressed pubkey"
              );
            }
          }
          if (a.witness && a.witness.length > 0) {
            const wScript = a.witness[a.witness.length - 1];
            if (a.redeem && a.redeem.output && tools.compare(a.redeem.output, wScript) !== 0)
              throw new TypeError("Witness and redeem.output mismatch");
            if (a.witness.some(chunkHasUncompressedPubkey) || (bscript.decompile(wScript) || []).some(chunkHasUncompressedPubkey))
              throw new TypeError("Witness contains uncompressed pubkey");
          }
        }
        return Object.assign(o, a);
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/ecc_lib.cjs
  var require_ecc_lib = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/ecc_lib.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.initEccLib = initEccLib;
      exports.getEccLib = getEccLib;
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var _ECCLIB_CACHE = {};
      function initEccLib(eccLib, opts) {
        if (!eccLib) {
          _ECCLIB_CACHE.eccLib = eccLib;
        } else if (eccLib !== _ECCLIB_CACHE.eccLib) {
          if (!opts?.DANGER_DO_NOT_VERIFY_ECCLIB)
            verifyEcc(eccLib);
          _ECCLIB_CACHE.eccLib = eccLib;
        }
      }
      function getEccLib() {
        if (!_ECCLIB_CACHE.eccLib)
          throw new Error(
            "No ECC Library provided. You must call initEccLib() with a valid TinySecp256k1Interface instance"
          );
        return _ECCLIB_CACHE.eccLib;
      }
      var h = (hex) => tools.fromHex(hex);
      function verifyEcc(ecc) {
        assert(typeof ecc.isXOnlyPoint === "function");
        assert(
          ecc.isXOnlyPoint(
            h("79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798")
          )
        );
        assert(
          ecc.isXOnlyPoint(
            h("fffffffffffffffffffffffffffffffffffffffffffffffffffffffeeffffc2e")
          )
        );
        assert(
          ecc.isXOnlyPoint(
            h("f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9")
          )
        );
        assert(
          ecc.isXOnlyPoint(
            h("0000000000000000000000000000000000000000000000000000000000000001")
          )
        );
        assert(
          !ecc.isXOnlyPoint(
            h("0000000000000000000000000000000000000000000000000000000000000000")
          )
        );
        assert(
          !ecc.isXOnlyPoint(
            h("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f")
          )
        );
        assert(typeof ecc.xOnlyPointAddTweak === "function");
        tweakAddVectors.forEach((t) => {
          const r = ecc.xOnlyPointAddTweak(h(t.pubkey), h(t.tweak));
          if (t.result === null) {
            assert(r === null);
          } else {
            assert(r !== null);
            assert(r.parity === t.parity);
            assert(tools.compare(r.xOnlyPubkey, h(t.result)) === 0);
          }
        });
      }
      function assert(bool) {
        if (!bool) throw new Error("ecc library invalid");
      }
      var tweakAddVectors = [
        {
          pubkey: "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
          tweak: "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140",
          parity: -1,
          result: null
        },
        {
          pubkey: "1617d38ed8d8657da4d4761e8057bc396ea9e4b9d29776d4be096016dbd2509b",
          tweak: "a8397a935f0dfceba6ba9618f6451ef4d80637abf4e6af2669fbc9de6a8fd2ac",
          parity: 1,
          result: "e478f99dab91052ab39a33ea35fd5e6e4933f4d28023cd597c9a1f6760346adf"
        },
        {
          pubkey: "2c0b7cf95324a07d05398b240174dc0c2be444d96b159aa6c7f7b1e668680991",
          tweak: "823c3cd2142744b075a87eade7e1b8678ba308d566226a0056ca2b7a76f86b47",
          parity: 0,
          result: "9534f8dc8c6deda2dc007655981c78b49c5d96c778fbf363462a11ec9dfd948c"
        }
      ];
    }
  });

  // node_modules/uint8array-tools/src/mjs/browser.js
  var browser_exports2 = {};
  __export(browser_exports2, {
    compare: () => compare2,
    concat: () => concat2,
    fromBase64: () => fromBase642,
    fromHex: () => fromHex2,
    fromUtf8: () => fromUtf82,
    readUInt16: () => readUInt162,
    readUInt32: () => readUInt322,
    readUInt64: () => readUInt642,
    readUInt8: () => readUInt82,
    toBase64: () => toBase642,
    toHex: () => toHex2,
    toUtf8: () => toUtf82,
    writeUInt16: () => writeUInt162,
    writeUInt32: () => writeUInt322,
    writeUInt64: () => writeUInt642,
    writeUInt8: () => writeUInt82
  });
  function toUtf82(bytes) {
    return DECODER2.decode(bytes);
  }
  function fromUtf82(s) {
    return ENCODER2.encode(s);
  }
  function concat2(arrays) {
    const totalLength = arrays.reduce((a, b) => a + b.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const array of arrays) {
      result.set(array, offset);
      offset += array.length;
    }
    return result;
  }
  function toHex2(bytes) {
    const b = bytes || new Uint8Array();
    return b.length > 512 ? _toHexLengthPerf2(b) : _toHexIterPerf2(b);
  }
  function _toHexIterPerf2(bytes) {
    let s = "";
    for (let i = 0; i < bytes.length; ++i) {
      s += HEX_STRINGS2[HEX_CODEPOINTS2[HEX_CODES2[bytes[i] >> 4]]];
      s += HEX_STRINGS2[HEX_CODEPOINTS2[HEX_CODES2[bytes[i] & 15]]];
    }
    return s;
  }
  function _toHexLengthPerf2(bytes) {
    const hexBytes = new Uint8Array(bytes.length * 2);
    for (let i = 0; i < bytes.length; ++i) {
      hexBytes[i * 2] = HEX_CODES2[bytes[i] >> 4];
      hexBytes[i * 2 + 1] = HEX_CODES2[bytes[i] & 15];
    }
    return DECODER2.decode(hexBytes);
  }
  function fromHex2(hexString) {
    const hexBytes = ENCODER2.encode(hexString || "");
    const resultBytes = new Uint8Array(Math.floor(hexBytes.length / 2));
    let i;
    for (i = 0; i < resultBytes.length; i++) {
      const a = HEX_CODEPOINTS2[hexBytes[i * 2]];
      const b = HEX_CODEPOINTS2[hexBytes[i * 2 + 1]];
      if (a === void 0 || b === void 0) {
        break;
      }
      resultBytes[i] = a << 4 | b;
    }
    return i === resultBytes.length ? resultBytes : resultBytes.slice(0, i);
  }
  function toBase642(bytes) {
    return btoa(String.fromCharCode(...bytes));
  }
  function fromBase642(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
  function compare2(v1, v2) {
    const minLength = Math.min(v1.length, v2.length);
    for (let i = 0; i < minLength; ++i) {
      if (v1[i] !== v2[i]) {
        return v1[i] < v2[i] ? -1 : 1;
      }
    }
    return v1.length === v2.length ? 0 : v1.length > v2.length ? 1 : -1;
  }
  function writeUInt82(buffer, offset, value) {
    if (offset + 1 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    if (value > 255) {
      throw new Error(`The value of "value" is out of range. It must be >= 0 and <= ${255}. Received ${value}`);
    }
    buffer[offset] = value;
  }
  function writeUInt162(buffer, offset, value, littleEndian) {
    if (offset + 2 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (value > 65535) {
      throw new Error(`The value of "value" is out of range. It must be >= 0 and <= ${65535}. Received ${value}`);
    }
    if (littleEndian === "LE") {
      buffer[offset] = value & 255;
      buffer[offset + 1] = value >> 8 & 255;
    } else {
      buffer[offset] = value >> 8 & 255;
      buffer[offset + 1] = value & 255;
    }
  }
  function writeUInt322(buffer, offset, value, littleEndian) {
    if (offset + 4 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (value > 4294967295) {
      throw new Error(`The value of "value" is out of range. It must be >= 0 and <= ${4294967295}. Received ${value}`);
    }
    if (littleEndian === "LE") {
      buffer[offset] = value & 255;
      buffer[offset + 1] = value >> 8 & 255;
      buffer[offset + 2] = value >> 16 & 255;
      buffer[offset + 3] = value >> 24 & 255;
    } else {
      buffer[offset] = value >> 24 & 255;
      buffer[offset + 1] = value >> 16 & 255;
      buffer[offset + 2] = value >> 8 & 255;
      buffer[offset + 3] = value & 255;
    }
  }
  function writeUInt642(buffer, offset, value, littleEndian) {
    if (offset + 8 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (value > 0xffffffffffffffffn) {
      throw new Error(`The value of "value" is out of range. It must be >= 0 and <= ${0xffffffffffffffffn}. Received ${value}`);
    }
    if (littleEndian === "LE") {
      buffer[offset] = Number(value & 0xffn);
      buffer[offset + 1] = Number(value >> 8n & 0xffn);
      buffer[offset + 2] = Number(value >> 16n & 0xffn);
      buffer[offset + 3] = Number(value >> 24n & 0xffn);
      buffer[offset + 4] = Number(value >> 32n & 0xffn);
      buffer[offset + 5] = Number(value >> 40n & 0xffn);
      buffer[offset + 6] = Number(value >> 48n & 0xffn);
      buffer[offset + 7] = Number(value >> 56n & 0xffn);
    } else {
      buffer[offset] = Number(value >> 56n & 0xffn);
      buffer[offset + 1] = Number(value >> 48n & 0xffn);
      buffer[offset + 2] = Number(value >> 40n & 0xffn);
      buffer[offset + 3] = Number(value >> 32n & 0xffn);
      buffer[offset + 4] = Number(value >> 24n & 0xffn);
      buffer[offset + 5] = Number(value >> 16n & 0xffn);
      buffer[offset + 6] = Number(value >> 8n & 0xffn);
      buffer[offset + 7] = Number(value & 0xffn);
    }
  }
  function readUInt82(buffer, offset) {
    if (offset + 1 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    return buffer[offset];
  }
  function readUInt162(buffer, offset, littleEndian) {
    if (offset + 2 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      let num = 0;
      num = (num << 8) + buffer[offset + 1];
      num = (num << 8) + buffer[offset];
      return num;
    } else {
      let num = 0;
      num = (num << 8) + buffer[offset];
      num = (num << 8) + buffer[offset + 1];
      return num;
    }
  }
  function readUInt322(buffer, offset, littleEndian) {
    if (offset + 4 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      let num = 0;
      num = (num << 8) + buffer[offset + 3] >>> 0;
      num = (num << 8) + buffer[offset + 2] >>> 0;
      num = (num << 8) + buffer[offset + 1] >>> 0;
      num = (num << 8) + buffer[offset] >>> 0;
      return num;
    } else {
      let num = 0;
      num = (num << 8) + buffer[offset] >>> 0;
      num = (num << 8) + buffer[offset + 1] >>> 0;
      num = (num << 8) + buffer[offset + 2] >>> 0;
      num = (num << 8) + buffer[offset + 3] >>> 0;
      return num;
    }
  }
  function readUInt642(buffer, offset, littleEndian) {
    if (offset + 8 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      let num = 0n;
      num = (num << 8n) + BigInt(buffer[offset + 7]);
      num = (num << 8n) + BigInt(buffer[offset + 6]);
      num = (num << 8n) + BigInt(buffer[offset + 5]);
      num = (num << 8n) + BigInt(buffer[offset + 4]);
      num = (num << 8n) + BigInt(buffer[offset + 3]);
      num = (num << 8n) + BigInt(buffer[offset + 2]);
      num = (num << 8n) + BigInt(buffer[offset + 1]);
      num = (num << 8n) + BigInt(buffer[offset]);
      return num;
    } else {
      let num = 0n;
      num = (num << 8n) + BigInt(buffer[offset]);
      num = (num << 8n) + BigInt(buffer[offset + 1]);
      num = (num << 8n) + BigInt(buffer[offset + 2]);
      num = (num << 8n) + BigInt(buffer[offset + 3]);
      num = (num << 8n) + BigInt(buffer[offset + 4]);
      num = (num << 8n) + BigInt(buffer[offset + 5]);
      num = (num << 8n) + BigInt(buffer[offset + 6]);
      num = (num << 8n) + BigInt(buffer[offset + 7]);
      return num;
    }
  }
  var HEX_STRINGS2, HEX_CODES2, HEX_CODEPOINTS2, ENCODER2, DECODER2;
  var init_browser2 = __esm({
    "node_modules/uint8array-tools/src/mjs/browser.js"() {
      HEX_STRINGS2 = "0123456789abcdefABCDEF";
      HEX_CODES2 = HEX_STRINGS2.split("").map((c) => c.codePointAt(0));
      HEX_CODEPOINTS2 = Array(256).fill(true).map((_, i) => {
        const s = String.fromCodePoint(i);
        const index = HEX_STRINGS2.indexOf(s);
        return index < 0 ? void 0 : index < 16 ? index : index - 6;
      });
      ENCODER2 = new TextEncoder();
      DECODER2 = new TextDecoder();
    }
  });

  // node_modules/varuint-bitcoin/src/cjs/index.cjs
  var require_cjs4 = __commonJS({
    "node_modules/varuint-bitcoin/src/cjs/index.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.encode = encode;
      exports.decode = decode;
      exports.encodingLength = encodingLength;
      var tools = __importStar((init_browser2(), __toCommonJS(browser_exports2)));
      var checkUInt64 = (n) => {
        if (n < 0 || n > 0xffffffffffffffffn) {
          throw new RangeError("value out of range");
        }
      };
      function checkUInt53(n) {
        if (n < 0 || n > Number.MAX_SAFE_INTEGER || n % 1 !== 0)
          throw new RangeError("value out of range");
      }
      function checkUint53OrUint64(n) {
        if (typeof n === "number")
          checkUInt53(n);
        else
          checkUInt64(n);
      }
      function encode(n, buffer, offset) {
        checkUint53OrUint64(n);
        if (offset === void 0)
          offset = 0;
        if (buffer === void 0) {
          buffer = new Uint8Array(encodingLength(n));
        }
        let bytes = 0;
        if (n < 253) {
          buffer.set([Number(n)], offset);
          bytes = 1;
        } else if (n <= 65535) {
          buffer.set([253], offset);
          tools.writeUInt16(buffer, offset + 1, Number(n), "LE");
          bytes = 3;
        } else if (n <= 4294967295) {
          buffer.set([254], offset);
          tools.writeUInt32(buffer, offset + 1, Number(n), "LE");
          bytes = 5;
        } else {
          buffer.set([255], offset);
          tools.writeUInt64(buffer, offset + 1, BigInt(n), "LE");
          bytes = 9;
        }
        return { buffer, bytes };
      }
      function decode(buffer, offset) {
        if (offset === void 0)
          offset = 0;
        const first = buffer.at(offset);
        if (first === void 0)
          throw new Error("buffer too small");
        if (first < 253) {
          return { numberValue: first, bigintValue: BigInt(first), bytes: 1 };
        } else if (first === 253) {
          const val = tools.readUInt16(buffer, offset + 1, "LE");
          return {
            numberValue: val,
            bigintValue: BigInt(val),
            bytes: 3
          };
        } else if (first === 254) {
          const val = tools.readUInt32(buffer, offset + 1, "LE");
          return {
            numberValue: val,
            bigintValue: BigInt(val),
            bytes: 5
          };
        } else {
          const number = tools.readUInt64(buffer, offset + 1, "LE");
          return { numberValue: number <= Number.MAX_SAFE_INTEGER ? Number(number) : null, bigintValue: number, bytes: 9 };
        }
      }
      function encodingLength(n) {
        checkUint53OrUint64(n);
        return n < 253 ? 1 : n <= 65535 ? 3 : n <= 4294967295 ? 5 : 9;
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/bufferutils.cjs
  var require_bufferutils = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/bufferutils.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BufferReader = exports.BufferWriter = exports.varuint = void 0;
      exports.reverseBuffer = reverseBuffer;
      exports.cloneBuffer = cloneBuffer;
      var types = __importStar(require_types());
      var varuint = __importStar(require_cjs4());
      exports.varuint = varuint;
      var v = __importStar(require_dist());
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var MAX_JS_NUMBER = 9007199254740991;
      function verifuint(value, max) {
        if (typeof value !== "number" && typeof value !== "bigint")
          throw new Error("cannot write a non-number as a number");
        if (value < 0 && value < BigInt(0))
          throw new Error("specified a negative value for writing an unsigned value");
        if (value > max && value > BigInt(max))
          throw new Error("RangeError: value out of range");
        if (Math.floor(Number(value)) !== Number(value))
          throw new Error("value has a fractional component");
      }
      function reverseBuffer(buffer) {
        if (buffer.length < 1) return buffer;
        let j = buffer.length - 1;
        let tmp = 0;
        for (let i = 0; i < buffer.length / 2; i++) {
          tmp = buffer[i];
          buffer[i] = buffer[j];
          buffer[j] = tmp;
          j--;
        }
        return buffer;
      }
      function cloneBuffer(buffer) {
        const clone = new Uint8Array(buffer.length);
        clone.set(buffer);
        return clone;
      }
      var BufferWriter = class _BufferWriter {
        buffer;
        offset;
        static withCapacity(size) {
          return new _BufferWriter(new Uint8Array(size));
        }
        constructor(buffer, offset = 0) {
          this.buffer = buffer;
          this.offset = offset;
          v.parse(v.tuple([types.BufferSchema, types.UInt32Schema]), [
            buffer,
            offset
          ]);
        }
        writeUInt8(i) {
          this.offset = tools.writeUInt8(this.buffer, this.offset, i);
        }
        writeInt32(i) {
          this.offset = tools.writeInt32(this.buffer, this.offset, i, "LE");
        }
        writeInt64(i) {
          this.offset = tools.writeInt64(this.buffer, this.offset, BigInt(i), "LE");
        }
        writeUInt32(i) {
          this.offset = tools.writeUInt32(this.buffer, this.offset, i, "LE");
        }
        writeUInt64(i) {
          this.offset = tools.writeUInt64(this.buffer, this.offset, BigInt(i), "LE");
        }
        writeVarInt(i) {
          const { bytes } = varuint.encode(i, this.buffer, this.offset);
          this.offset += bytes;
        }
        writeSlice(slice) {
          if (this.buffer.length < this.offset + slice.length) {
            throw new Error("Cannot write slice out of bounds");
          }
          this.buffer.set(slice, this.offset);
          this.offset += slice.length;
        }
        writeVarSlice(slice) {
          this.writeVarInt(slice.length);
          this.writeSlice(slice);
        }
        writeVector(vector) {
          this.writeVarInt(vector.length);
          vector.forEach((buf) => this.writeVarSlice(buf));
        }
        end() {
          if (this.buffer.length === this.offset) {
            return this.buffer;
          }
          throw new Error(`buffer size ${this.buffer.length}, offset ${this.offset}`);
        }
      };
      exports.BufferWriter = BufferWriter;
      var BufferReader = class {
        buffer;
        offset;
        constructor(buffer, offset = 0) {
          this.buffer = buffer;
          this.offset = offset;
          v.parse(v.tuple([types.BufferSchema, types.UInt32Schema]), [
            buffer,
            offset
          ]);
        }
        readUInt8() {
          const result = tools.readUInt8(this.buffer, this.offset);
          this.offset++;
          return result;
        }
        readInt32() {
          const result = tools.readInt32(this.buffer, this.offset, "LE");
          this.offset += 4;
          return result;
        }
        readUInt32() {
          const result = tools.readUInt32(this.buffer, this.offset, "LE");
          this.offset += 4;
          return result;
        }
        readInt64() {
          const result = tools.readInt64(this.buffer, this.offset, "LE");
          this.offset += 8;
          return result;
        }
        readVarInt() {
          const { bigintValue, bytes } = varuint.decode(this.buffer, this.offset);
          this.offset += bytes;
          return bigintValue;
        }
        readSlice(n) {
          verifuint(n, MAX_JS_NUMBER);
          const num = Number(n);
          if (this.buffer.length < this.offset + num) {
            throw new Error("Cannot read slice out of bounds");
          }
          const result = this.buffer.slice(this.offset, this.offset + num);
          this.offset += num;
          return result;
        }
        readVarSlice() {
          return this.readSlice(this.readVarInt());
        }
        readVector() {
          const count = this.readVarInt();
          const vector = [];
          for (let i = 0; i < count; i++) vector.push(this.readVarSlice());
          return vector;
        }
      };
      exports.BufferReader = BufferReader;
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/payments/bip341.cjs
  var require_bip341 = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/payments/bip341.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MAX_TAPTREE_DEPTH = exports.LEAF_VERSION_TAPSCRIPT = void 0;
      exports.rootHashFromPath = rootHashFromPath;
      exports.toHashTree = toHashTree;
      exports.findScriptPath = findScriptPath;
      exports.tapleafHash = tapleafHash;
      exports.tapTweakHash = tapTweakHash;
      exports.tweakKey = tweakKey;
      var ecc_lib_js_1 = require_ecc_lib();
      var bcrypto = __importStar(require_crypto2());
      var bufferutils_js_1 = require_bufferutils();
      var types_js_1 = require_types();
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      exports.LEAF_VERSION_TAPSCRIPT = 192;
      exports.MAX_TAPTREE_DEPTH = 128;
      var isHashBranch = (ht) => "left" in ht && "right" in ht;
      function rootHashFromPath(controlBlock, leafHash) {
        if (controlBlock.length < 33)
          throw new TypeError(
            `The control-block length is too small. Got ${controlBlock.length}, expected min 33.`
          );
        const m = (controlBlock.length - 33) / 32;
        let kj = leafHash;
        for (let j = 0; j < m; j++) {
          const ej = controlBlock.slice(33 + 32 * j, 65 + 32 * j);
          if (tools.compare(kj, ej) < 0) {
            kj = tapBranchHash(kj, ej);
          } else {
            kj = tapBranchHash(ej, kj);
          }
        }
        return kj;
      }
      function toHashTree(scriptTree) {
        if ((0, types_js_1.isTapleaf)(scriptTree))
          return { hash: tapleafHash(scriptTree) };
        const hashes = [toHashTree(scriptTree[0]), toHashTree(scriptTree[1])];
        hashes.sort((a, b) => tools.compare(a.hash, b.hash));
        const [left, right] = hashes;
        return {
          hash: tapBranchHash(left.hash, right.hash),
          left,
          right
        };
      }
      function findScriptPath(node, hash) {
        if (isHashBranch(node)) {
          const leftPath = findScriptPath(node.left, hash);
          if (leftPath !== void 0) return [...leftPath, node.right.hash];
          const rightPath = findScriptPath(node.right, hash);
          if (rightPath !== void 0) return [...rightPath, node.left.hash];
        } else if (tools.compare(node.hash, hash) === 0) {
          return [];
        }
        return void 0;
      }
      function tapleafHash(leaf) {
        const version = leaf.version || exports.LEAF_VERSION_TAPSCRIPT;
        return bcrypto.taggedHash(
          "TapLeaf",
          tools.concat([Uint8Array.from([version]), serializeScript(leaf.output)])
        );
      }
      function tapTweakHash(pubKey, h) {
        return bcrypto.taggedHash(
          "TapTweak",
          tools.concat(h ? [pubKey, h] : [pubKey])
        );
      }
      function tweakKey(pubKey, h) {
        if (!(pubKey instanceof Uint8Array)) return null;
        if (pubKey.length !== 32) return null;
        if (h && h.length !== 32) return null;
        const tweakHash = tapTweakHash(pubKey, h);
        const res = (0, ecc_lib_js_1.getEccLib)().xOnlyPointAddTweak(
          pubKey,
          tweakHash
        );
        if (!res || res.xOnlyPubkey === null) return null;
        return {
          parity: res.parity,
          x: Uint8Array.from(res.xOnlyPubkey)
        };
      }
      function tapBranchHash(a, b) {
        return bcrypto.taggedHash("TapBranch", tools.concat([a, b]));
      }
      function serializeScript(s) {
        const varintLen = bufferutils_js_1.varuint.encodingLength(s.length);
        const buffer = new Uint8Array(varintLen);
        bufferutils_js_1.varuint.encode(s.length, buffer);
        return tools.concat([buffer, s]);
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/payments/p2tr.cjs
  var require_p2tr = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/payments/p2tr.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.p2tr = p2tr;
      var networks_js_1 = require_networks();
      var bscript = __importStar(require_script());
      var types_js_1 = require_types();
      var ecc_lib_js_1 = require_ecc_lib();
      var bip341_js_1 = require_bip341();
      var lazy = __importStar(require_lazy());
      var bech32_1 = require_dist2();
      var address_js_1 = require_address();
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var v = __importStar(require_dist());
      var OPS = bscript.OPS;
      var TAPROOT_WITNESS_VERSION = 1;
      var ANNEX_PREFIX = 80;
      function p2tr(a, opts) {
        if (!a.address && !a.output && !a.pubkey && !a.internalPubkey && !(a.witness && a.witness.length > 1))
          throw new TypeError("Not enough data");
        opts = Object.assign({ validate: true }, opts || {});
        v.parse(
          v.partial(
            v.object({
              address: v.string(),
              input: (0, types_js_1.NBufferSchemaFactory)(0),
              network: v.object({}),
              output: (0, types_js_1.NBufferSchemaFactory)(34),
              internalPubkey: (0, types_js_1.NBufferSchemaFactory)(32),
              hash: (0, types_js_1.NBufferSchemaFactory)(32),
              // merkle root hash, the tweak
              pubkey: (0, types_js_1.NBufferSchemaFactory)(32),
              // tweaked with `hash` from `internalPubkey`
              signature: v.union([
                (0, types_js_1.NBufferSchemaFactory)(64),
                (0, types_js_1.NBufferSchemaFactory)(65)
              ]),
              witness: v.array(types_js_1.BufferSchema),
              scriptTree: v.custom(
                types_js_1.isTaptree,
                "Taptree is not of type isTaptree"
              ),
              redeem: v.partial(
                v.object({
                  output: types_js_1.BufferSchema,
                  // tapleaf script
                  redeemVersion: v.number(),
                  // tapleaf version
                  witness: v.array(types_js_1.BufferSchema)
                })
              ),
              redeemVersion: v.number()
            })
          ),
          a
        );
        const _address = lazy.value(() => {
          return (0, address_js_1.fromBech32)(a.address);
        });
        const _witness = lazy.value(() => {
          if (!a.witness || !a.witness.length) return;
          if (a.witness.length >= 2 && a.witness[a.witness.length - 1][0] === ANNEX_PREFIX) {
            return a.witness.slice(0, -1);
          }
          return a.witness.slice();
        });
        const _hashTree = lazy.value(() => {
          if (a.scriptTree) return (0, bip341_js_1.toHashTree)(a.scriptTree);
          if (a.hash) return { hash: a.hash };
          return;
        });
        const network = a.network || networks_js_1.bitcoin;
        const o = { name: "p2tr", network };
        lazy.prop(o, "address", () => {
          if (!o.pubkey) return;
          const words = bech32_1.bech32m.toWords(o.pubkey);
          words.unshift(TAPROOT_WITNESS_VERSION);
          return bech32_1.bech32m.encode(network.bech32, words);
        });
        lazy.prop(o, "hash", () => {
          const hashTree = _hashTree();
          if (hashTree) return hashTree.hash;
          const w = _witness();
          if (w && w.length > 1) {
            const controlBlock = w[w.length - 1];
            const leafVersion = controlBlock[0] & types_js_1.TAPLEAF_VERSION_MASK;
            const script = w[w.length - 2];
            const leafHash = (0, bip341_js_1.tapleafHash)({
              output: script,
              version: leafVersion
            });
            return (0, bip341_js_1.rootHashFromPath)(controlBlock, leafHash);
          }
          return null;
        });
        lazy.prop(o, "output", () => {
          if (!o.pubkey) return;
          return bscript.compile([OPS.OP_1, o.pubkey]);
        });
        lazy.prop(o, "redeemVersion", () => {
          if (a.redeemVersion) return a.redeemVersion;
          if (a.redeem && a.redeem.redeemVersion !== void 0 && a.redeem.redeemVersion !== null) {
            return a.redeem.redeemVersion;
          }
          return bip341_js_1.LEAF_VERSION_TAPSCRIPT;
        });
        lazy.prop(o, "redeem", () => {
          const witness = _witness();
          if (!witness || witness.length < 2) return;
          return {
            output: witness[witness.length - 2],
            witness: witness.slice(0, -2),
            redeemVersion: witness[witness.length - 1][0] & types_js_1.TAPLEAF_VERSION_MASK
          };
        });
        lazy.prop(o, "pubkey", () => {
          if (a.pubkey) return a.pubkey;
          if (a.output) return a.output.slice(2);
          if (a.address) return _address().data;
          if (o.internalPubkey) {
            const tweakedKey = (0, bip341_js_1.tweakKey)(o.internalPubkey, o.hash);
            if (tweakedKey) return tweakedKey.x;
          }
        });
        lazy.prop(o, "internalPubkey", () => {
          if (a.internalPubkey) return a.internalPubkey;
          const witness = _witness();
          if (witness && witness.length > 1)
            return witness[witness.length - 1].slice(1, 33);
        });
        lazy.prop(o, "signature", () => {
          if (a.signature) return a.signature;
          const witness = _witness();
          if (!witness || witness.length !== 1) return;
          return witness[0];
        });
        lazy.prop(o, "witness", () => {
          if (a.witness) return a.witness;
          const hashTree = _hashTree();
          if (hashTree && a.redeem && a.redeem.output && a.internalPubkey) {
            const leafHash = (0, bip341_js_1.tapleafHash)({
              output: a.redeem.output,
              version: o.redeemVersion
            });
            const path = (0, bip341_js_1.findScriptPath)(hashTree, leafHash);
            if (!path) return;
            const outputKey = (0, bip341_js_1.tweakKey)(
              a.internalPubkey,
              hashTree.hash
            );
            if (!outputKey) return;
            const controlBock = tools.concat(
              [
                Uint8Array.from([o.redeemVersion | outputKey.parity]),
                a.internalPubkey
              ].concat(path)
            );
            return [a.redeem.output, controlBock];
          }
          if (a.signature) return [a.signature];
        });
        if (opts.validate) {
          let pubkey = Uint8Array.from([]);
          if (a.address) {
            if (network && network.bech32 !== _address().prefix)
              throw new TypeError("Invalid prefix or Network mismatch");
            if (_address().version !== TAPROOT_WITNESS_VERSION)
              throw new TypeError("Invalid address version");
            if (_address().data.length !== 32)
              throw new TypeError("Invalid address data");
            pubkey = _address().data;
          }
          if (a.pubkey) {
            if (pubkey.length > 0 && tools.compare(pubkey, a.pubkey) !== 0)
              throw new TypeError("Pubkey mismatch");
            else pubkey = a.pubkey;
          }
          if (a.output) {
            if (a.output.length !== 34 || a.output[0] !== OPS.OP_1 || a.output[1] !== 32)
              throw new TypeError("Output is invalid");
            if (pubkey.length > 0 && tools.compare(pubkey, a.output.slice(2)) !== 0)
              throw new TypeError("Pubkey mismatch");
            else pubkey = a.output.slice(2);
          }
          if (a.internalPubkey) {
            const tweakedKey = (0, bip341_js_1.tweakKey)(a.internalPubkey, o.hash);
            if (pubkey.length > 0 && tools.compare(pubkey, tweakedKey.x) !== 0)
              throw new TypeError("Pubkey mismatch");
            else pubkey = tweakedKey.x;
          }
          if (pubkey && pubkey.length) {
            if (!(0, ecc_lib_js_1.getEccLib)().isXOnlyPoint(pubkey))
              throw new TypeError("Invalid pubkey for p2tr");
          }
          const hashTree = _hashTree();
          if (a.hash && hashTree) {
            if (tools.compare(a.hash, hashTree.hash) !== 0)
              throw new TypeError("Hash mismatch");
          }
          if (a.redeem && a.redeem.output && hashTree) {
            const leafHash = (0, bip341_js_1.tapleafHash)({
              output: a.redeem.output,
              version: o.redeemVersion
            });
            if (!(0, bip341_js_1.findScriptPath)(hashTree, leafHash))
              throw new TypeError("Redeem script not in tree");
          }
          const witness = _witness();
          if (a.redeem && o.redeem) {
            if (a.redeem.redeemVersion) {
              if (a.redeem.redeemVersion !== o.redeem.redeemVersion)
                throw new TypeError("Redeem.redeemVersion and witness mismatch");
            }
            if (a.redeem.output) {
              if (bscript.decompile(a.redeem.output).length === 0)
                throw new TypeError("Redeem.output is invalid");
              if (o.redeem.output && tools.compare(a.redeem.output, o.redeem.output) !== 0)
                throw new TypeError("Redeem.output and witness mismatch");
            }
            if (a.redeem.witness) {
              if (o.redeem.witness && !(0, types_js_1.stacksEqual)(a.redeem.witness, o.redeem.witness))
                throw new TypeError("Redeem.witness and witness mismatch");
            }
          }
          if (witness && witness.length) {
            if (witness.length === 1) {
              if (a.signature && tools.compare(a.signature, witness[0]) !== 0)
                throw new TypeError("Signature mismatch");
            } else {
              const controlBlock = witness[witness.length - 1];
              if (controlBlock.length < 33)
                throw new TypeError(
                  `The control-block length is too small. Got ${controlBlock.length}, expected min 33.`
                );
              if ((controlBlock.length - 33) % 32 !== 0)
                throw new TypeError(
                  `The control-block length of ${controlBlock.length} is incorrect!`
                );
              const m = (controlBlock.length - 33) / 32;
              if (m > 128)
                throw new TypeError(
                  `The script path is too long. Got ${m}, expected max 128.`
                );
              const internalPubkey = controlBlock.slice(1, 33);
              if (a.internalPubkey && tools.compare(a.internalPubkey, internalPubkey) !== 0)
                throw new TypeError("Internal pubkey mismatch");
              if (!(0, ecc_lib_js_1.getEccLib)().isXOnlyPoint(internalPubkey))
                throw new TypeError("Invalid internalPubkey for p2tr witness");
              const leafVersion = controlBlock[0] & types_js_1.TAPLEAF_VERSION_MASK;
              const script = witness[witness.length - 2];
              const leafHash = (0, bip341_js_1.tapleafHash)({
                output: script,
                version: leafVersion
              });
              const hash = (0, bip341_js_1.rootHashFromPath)(controlBlock, leafHash);
              const outputKey = (0, bip341_js_1.tweakKey)(internalPubkey, hash);
              if (!outputKey)
                throw new TypeError("Invalid outputKey for p2tr witness");
              if (pubkey.length && tools.compare(pubkey, outputKey.x) !== 0)
                throw new TypeError("Pubkey mismatch for p2tr witness");
              if (outputKey.parity !== (controlBlock[0] & 1))
                throw new Error("Incorrect parity");
            }
          }
        }
        return Object.assign(o, a);
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/payments/index.cjs
  var require_payments = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/payments/index.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.p2tr = exports.p2wsh = exports.p2wpkh = exports.p2sh = exports.p2pkh = exports.p2pk = exports.p2ms = exports.embed = void 0;
      var embed_js_1 = require_embed();
      Object.defineProperty(exports, "embed", {
        enumerable: true,
        get: function() {
          return embed_js_1.p2data;
        }
      });
      var p2ms_js_1 = require_p2ms();
      Object.defineProperty(exports, "p2ms", {
        enumerable: true,
        get: function() {
          return p2ms_js_1.p2ms;
        }
      });
      var p2pk_js_1 = require_p2pk();
      Object.defineProperty(exports, "p2pk", {
        enumerable: true,
        get: function() {
          return p2pk_js_1.p2pk;
        }
      });
      var p2pkh_js_1 = require_p2pkh();
      Object.defineProperty(exports, "p2pkh", {
        enumerable: true,
        get: function() {
          return p2pkh_js_1.p2pkh;
        }
      });
      var p2sh_js_1 = require_p2sh();
      Object.defineProperty(exports, "p2sh", {
        enumerable: true,
        get: function() {
          return p2sh_js_1.p2sh;
        }
      });
      var p2wpkh_js_1 = require_p2wpkh();
      Object.defineProperty(exports, "p2wpkh", {
        enumerable: true,
        get: function() {
          return p2wpkh_js_1.p2wpkh;
        }
      });
      var p2wsh_js_1 = require_p2wsh();
      Object.defineProperty(exports, "p2wsh", {
        enumerable: true,
        get: function() {
          return p2wsh_js_1.p2wsh;
        }
      });
      var p2tr_js_1 = require_p2tr();
      Object.defineProperty(exports, "p2tr", {
        enumerable: true,
        get: function() {
          return p2tr_js_1.p2tr;
        }
      });
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/address.cjs
  var require_address = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/address.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fromBase58Check = fromBase58Check;
      exports.fromBech32 = fromBech32;
      exports.toBase58Check = toBase58Check;
      exports.toBech32 = toBech32;
      exports.fromOutputScript = fromOutputScript;
      exports.toOutputScript = toOutputScript;
      var networks = __importStar(require_networks());
      var payments = __importStar(require_payments());
      var bscript = __importStar(require_script());
      var types_js_1 = require_types();
      var bech32_1 = require_dist2();
      var bs58check_1 = __importDefault(require_cjs3());
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var v = __importStar(require_dist());
      var FUTURE_SEGWIT_MAX_SIZE = 40;
      var FUTURE_SEGWIT_MIN_SIZE = 2;
      var FUTURE_SEGWIT_MAX_VERSION = 16;
      var FUTURE_SEGWIT_MIN_VERSION = 2;
      var FUTURE_SEGWIT_VERSION_DIFF = 80;
      var FUTURE_SEGWIT_VERSION_WARNING = "WARNING: Sending to a future segwit version address can lead to loss of funds. End users MUST be warned carefully in the GUI and asked if they wish to proceed with caution. Wallets should verify the segwit version from the output of fromBech32, then decide when it is safe to use which version of segwit.";
      var WARNING_STATES = [false, false];
      function _toFutureSegwitAddress(output, network) {
        const data = output.slice(2);
        if (data.length < FUTURE_SEGWIT_MIN_SIZE || data.length > FUTURE_SEGWIT_MAX_SIZE)
          throw new TypeError("Invalid program length for segwit address");
        const version = output[0] - FUTURE_SEGWIT_VERSION_DIFF;
        if (version < FUTURE_SEGWIT_MIN_VERSION || version > FUTURE_SEGWIT_MAX_VERSION)
          throw new TypeError("Invalid version for segwit address");
        if (output[1] !== data.length)
          throw new TypeError("Invalid script for segwit address");
        if (WARNING_STATES[0] === false) {
          console.warn(FUTURE_SEGWIT_VERSION_WARNING);
          WARNING_STATES[0] = true;
        }
        return toBech32(data, version, network.bech32);
      }
      function fromBase58Check(address) {
        const payload = bs58check_1.default.decode(address);
        if (payload.length < 21) throw new TypeError(address + " is too short");
        if (payload.length > 21) throw new TypeError(address + " is too long");
        const version = tools.readUInt8(payload, 0);
        const hash = payload.slice(1);
        return { version, hash };
      }
      function fromBech32(address) {
        let result;
        let version;
        try {
          result = bech32_1.bech32.decode(address);
        } catch (e) {
        }
        if (result) {
          version = result.words[0];
          if (version !== 0) throw new TypeError(address + " uses wrong encoding");
        } else {
          result = bech32_1.bech32m.decode(address);
          version = result.words[0];
          if (version === 0) throw new TypeError(address + " uses wrong encoding");
        }
        const data = bech32_1.bech32.fromWords(result.words.slice(1));
        return {
          version,
          prefix: result.prefix,
          data: Uint8Array.from(data)
        };
      }
      function toBase58Check(hash, version) {
        v.parse(v.tuple([types_js_1.Hash160bitSchema, types_js_1.UInt8Schema]), [
          hash,
          version
        ]);
        const payload = new Uint8Array(21);
        tools.writeUInt8(payload, 0, version);
        payload.set(hash, 1);
        return bs58check_1.default.encode(payload);
      }
      function toBech32(data, version, prefix) {
        const words = bech32_1.bech32.toWords(data);
        words.unshift(version);
        return version === 0 ? bech32_1.bech32.encode(prefix, words) : bech32_1.bech32m.encode(prefix, words);
      }
      function fromOutputScript(output, network) {
        network = network || networks.bitcoin;
        try {
          return payments.p2pkh({ output, network }).address;
        } catch (e) {
        }
        try {
          return payments.p2sh({ output, network }).address;
        } catch (e) {
        }
        try {
          return payments.p2wpkh({ output, network }).address;
        } catch (e) {
        }
        try {
          return payments.p2wsh({ output, network }).address;
        } catch (e) {
        }
        try {
          return payments.p2tr({ output, network }).address;
        } catch (e) {
        }
        try {
          return _toFutureSegwitAddress(output, network);
        } catch (e) {
        }
        throw new Error(bscript.toASM(output) + " has no matching Address");
      }
      function toOutputScript(address, network) {
        network = network || networks.bitcoin;
        let decodeBase58;
        let decodeBech32;
        try {
          decodeBase58 = fromBase58Check(address);
        } catch (e) {
        }
        if (decodeBase58) {
          if (decodeBase58.version === network.pubKeyHash)
            return payments.p2pkh({ hash: decodeBase58.hash }).output;
          if (decodeBase58.version === network.scriptHash)
            return payments.p2sh({ hash: decodeBase58.hash }).output;
        } else {
          try {
            decodeBech32 = fromBech32(address);
          } catch (e) {
          }
          if (decodeBech32) {
            if (decodeBech32.prefix !== network.bech32)
              throw new Error(address + " has an invalid prefix");
            if (decodeBech32.version === 0) {
              if (decodeBech32.data.length === 20)
                return payments.p2wpkh({ hash: decodeBech32.data }).output;
              if (decodeBech32.data.length === 32)
                return payments.p2wsh({ hash: decodeBech32.data }).output;
            } else if (decodeBech32.version === 1) {
              if (decodeBech32.data.length === 32)
                return payments.p2tr({ pubkey: decodeBech32.data }).output;
            } else if (decodeBech32.version >= FUTURE_SEGWIT_MIN_VERSION && decodeBech32.version <= FUTURE_SEGWIT_MAX_VERSION && decodeBech32.data.length >= FUTURE_SEGWIT_MIN_SIZE && decodeBech32.data.length <= FUTURE_SEGWIT_MAX_SIZE) {
              if (WARNING_STATES[1] === false) {
                console.warn(FUTURE_SEGWIT_VERSION_WARNING);
                WARNING_STATES[1] = true;
              }
              return bscript.compile([
                decodeBech32.version + FUTURE_SEGWIT_VERSION_DIFF,
                decodeBech32.data
              ]);
            }
          }
        }
        throw new Error(address + " has no matching Script");
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/merkle.cjs
  var require_merkle = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/merkle.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fastMerkleRoot = fastMerkleRoot;
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      function fastMerkleRoot(values, digestFn) {
        if (!Array.isArray(values)) throw TypeError("Expected values Array");
        if (typeof digestFn !== "function")
          throw TypeError("Expected digest Function");
        let length = values.length;
        const results = values.concat();
        while (length > 1) {
          let j = 0;
          for (let i = 0; i < length; i += 2, ++j) {
            const left = results[i];
            const right = i + 1 === length ? left : results[i + 1];
            const data = tools.concat([left, right]);
            results[j] = digestFn(data);
          }
          length = j;
        }
        return results[0];
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/transaction.cjs
  var require_transaction = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/transaction.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Transaction = void 0;
      var bufferutils_js_1 = require_bufferutils();
      var bcrypto = __importStar(require_crypto2());
      var sha256_1 = require_sha256();
      var bscript = __importStar(require_script());
      var script_js_1 = require_script();
      var types = __importStar(require_types());
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var v = __importStar(require_dist());
      function varSliceSize(someScript) {
        const length = someScript.length;
        return bufferutils_js_1.varuint.encodingLength(length) + length;
      }
      function vectorSize(someVector) {
        const length = someVector.length;
        return bufferutils_js_1.varuint.encodingLength(length) + someVector.reduce((sum, witness) => {
          return sum + varSliceSize(witness);
        }, 0);
      }
      var EMPTY_BUFFER = new Uint8Array(0);
      var EMPTY_WITNESS = [];
      var ZERO = tools.fromHex(
        "0000000000000000000000000000000000000000000000000000000000000000"
      );
      var ONE = tools.fromHex(
        "0000000000000000000000000000000000000000000000000000000000000001"
      );
      var VALUE_UINT64_MAX = tools.fromHex("ffffffffffffffff");
      var BLANK_OUTPUT = {
        script: EMPTY_BUFFER,
        valueBuffer: VALUE_UINT64_MAX
      };
      function isOutput(out) {
        return out.value !== void 0;
      }
      var Transaction = class _Transaction {
        static DEFAULT_SEQUENCE = 4294967295;
        static SIGHASH_DEFAULT = 0;
        static SIGHASH_ALL = 1;
        static SIGHASH_NONE = 2;
        static SIGHASH_SINGLE = 3;
        static SIGHASH_ANYONECANPAY = 128;
        static SIGHASH_OUTPUT_MASK = 3;
        static SIGHASH_INPUT_MASK = 128;
        static ADVANCED_TRANSACTION_MARKER = 0;
        static ADVANCED_TRANSACTION_FLAG = 1;
        static fromBuffer(buffer, _NO_STRICT) {
          const bufferReader = new bufferutils_js_1.BufferReader(buffer);
          const tx = new _Transaction();
          tx.version = bufferReader.readUInt32();
          const marker = bufferReader.readUInt8();
          const flag = bufferReader.readUInt8();
          let hasWitnesses = false;
          if (marker === _Transaction.ADVANCED_TRANSACTION_MARKER && flag === _Transaction.ADVANCED_TRANSACTION_FLAG) {
            hasWitnesses = true;
          } else {
            bufferReader.offset -= 2;
          }
          const vinLen = bufferReader.readVarInt();
          for (let i = 0; i < vinLen; ++i) {
            tx.ins.push({
              hash: bufferReader.readSlice(32),
              index: bufferReader.readUInt32(),
              script: bufferReader.readVarSlice(),
              sequence: bufferReader.readUInt32(),
              witness: EMPTY_WITNESS
            });
          }
          const voutLen = bufferReader.readVarInt();
          for (let i = 0; i < voutLen; ++i) {
            tx.outs.push({
              value: bufferReader.readInt64(),
              script: bufferReader.readVarSlice()
            });
          }
          if (hasWitnesses) {
            for (let i = 0; i < vinLen; ++i) {
              tx.ins[i].witness = bufferReader.readVector();
            }
            if (!tx.hasWitnesses())
              throw new Error("Transaction has superfluous witness data");
          }
          tx.locktime = bufferReader.readUInt32();
          if (_NO_STRICT) return tx;
          if (bufferReader.offset !== buffer.length)
            throw new Error("Transaction has unexpected data");
          return tx;
        }
        static fromHex(hex) {
          return _Transaction.fromBuffer(tools.fromHex(hex), false);
        }
        static isCoinbaseHash(buffer) {
          v.parse(types.Hash256bitSchema, buffer);
          for (let i = 0; i < 32; ++i) {
            if (buffer[i] !== 0) return false;
          }
          return true;
        }
        version = 1;
        locktime = 0;
        ins = [];
        outs = [];
        isCoinbase() {
          return this.ins.length === 1 && _Transaction.isCoinbaseHash(this.ins[0].hash);
        }
        addInput(hash, index, sequence, scriptSig) {
          v.parse(
            v.tuple([
              types.Hash256bitSchema,
              types.UInt32Schema,
              v.nullable(v.optional(types.UInt32Schema)),
              v.nullable(v.optional(types.BufferSchema))
            ]),
            [hash, index, sequence, scriptSig]
          );
          if (sequence === void 0 || sequence === null) {
            sequence = _Transaction.DEFAULT_SEQUENCE;
          }
          return this.ins.push({
            hash,
            index,
            script: scriptSig || EMPTY_BUFFER,
            sequence,
            witness: EMPTY_WITNESS
          }) - 1;
        }
        addOutput(scriptPubKey, value) {
          v.parse(v.tuple([types.BufferSchema, types.SatoshiSchema]), [
            scriptPubKey,
            value
          ]);
          return this.outs.push({
            script: scriptPubKey,
            value
          }) - 1;
        }
        hasWitnesses() {
          return this.ins.some((x) => {
            return x.witness.length !== 0;
          });
        }
        stripWitnesses() {
          this.ins.forEach((input) => {
            input.witness = EMPTY_WITNESS;
          });
        }
        weight() {
          const base = this.byteLength(false);
          const total = this.byteLength(true);
          return base * 3 + total;
        }
        virtualSize() {
          return Math.ceil(this.weight() / 4);
        }
        byteLength(_ALLOW_WITNESS = true) {
          const hasWitnesses = _ALLOW_WITNESS && this.hasWitnesses();
          return (hasWitnesses ? 10 : 8) + bufferutils_js_1.varuint.encodingLength(this.ins.length) + bufferutils_js_1.varuint.encodingLength(this.outs.length) + this.ins.reduce((sum, input) => {
            return sum + 40 + varSliceSize(input.script);
          }, 0) + this.outs.reduce((sum, output) => {
            return sum + 8 + varSliceSize(output.script);
          }, 0) + (hasWitnesses ? this.ins.reduce((sum, input) => {
            return sum + vectorSize(input.witness);
          }, 0) : 0);
        }
        clone() {
          const newTx = new _Transaction();
          newTx.version = this.version;
          newTx.locktime = this.locktime;
          newTx.ins = this.ins.map((txIn) => {
            return {
              hash: txIn.hash,
              index: txIn.index,
              script: txIn.script,
              sequence: txIn.sequence,
              witness: txIn.witness
            };
          });
          newTx.outs = this.outs.map((txOut) => {
            return {
              script: txOut.script,
              value: txOut.value
            };
          });
          return newTx;
        }
        /**
         * Hash transaction for signing a specific input.
         *
         * Bitcoin uses a different hash for each signed transaction input.
         * This method copies the transaction, makes the necessary changes based on the
         * hashType, and then hashes the result.
         * This hash can then be used to sign the provided transaction input.
         */
        hashForSignature(inIndex, prevOutScript, hashType) {
          v.parse(v.tuple([types.UInt32Schema, types.BufferSchema, v.number()]), [
            inIndex,
            prevOutScript,
            hashType
          ]);
          if (inIndex >= this.ins.length) return ONE;
          const ourScript = bscript.compile(
            bscript.decompile(prevOutScript).filter((x) => {
              return x !== script_js_1.OPS.OP_CODESEPARATOR;
            })
          );
          const txTmp = this.clone();
          if ((hashType & 31) === _Transaction.SIGHASH_NONE) {
            txTmp.outs = [];
            txTmp.ins.forEach((input, i) => {
              if (i === inIndex) return;
              input.sequence = 0;
            });
          } else if ((hashType & 31) === _Transaction.SIGHASH_SINGLE) {
            if (inIndex >= this.outs.length) return ONE;
            txTmp.outs.length = inIndex + 1;
            for (let i = 0; i < inIndex; i++) {
              txTmp.outs[i] = BLANK_OUTPUT;
            }
            txTmp.ins.forEach((input, y) => {
              if (y === inIndex) return;
              input.sequence = 0;
            });
          }
          if (hashType & _Transaction.SIGHASH_ANYONECANPAY) {
            txTmp.ins = [txTmp.ins[inIndex]];
            txTmp.ins[0].script = ourScript;
          } else {
            txTmp.ins.forEach((input) => {
              input.script = EMPTY_BUFFER;
            });
            txTmp.ins[inIndex].script = ourScript;
          }
          const buffer = new Uint8Array(txTmp.byteLength(false) + 4);
          tools.writeInt32(buffer, buffer.length - 4, hashType, "LE");
          txTmp.__toBuffer(buffer, 0, false);
          return bcrypto.hash256(buffer);
        }
        hashForWitnessV1(inIndex, prevOutScripts, values, hashType, leafHash, annex) {
          v.parse(
            v.tuple([
              types.UInt32Schema,
              v.array(types.BufferSchema),
              v.array(types.SatoshiSchema),
              types.UInt32Schema
            ]),
            [inIndex, prevOutScripts, values, hashType]
          );
          if (values.length !== this.ins.length || prevOutScripts.length !== this.ins.length) {
            throw new Error("Must supply prevout script and value for all inputs");
          }
          const outputType = hashType === _Transaction.SIGHASH_DEFAULT ? _Transaction.SIGHASH_ALL : hashType & _Transaction.SIGHASH_OUTPUT_MASK;
          const inputType = hashType & _Transaction.SIGHASH_INPUT_MASK;
          const isAnyoneCanPay = inputType === _Transaction.SIGHASH_ANYONECANPAY;
          const isNone = outputType === _Transaction.SIGHASH_NONE;
          const isSingle = outputType === _Transaction.SIGHASH_SINGLE;
          let hashPrevouts = EMPTY_BUFFER;
          let hashAmounts = EMPTY_BUFFER;
          let hashScriptPubKeys = EMPTY_BUFFER;
          let hashSequences = EMPTY_BUFFER;
          let hashOutputs = EMPTY_BUFFER;
          if (!isAnyoneCanPay) {
            let bufferWriter = bufferutils_js_1.BufferWriter.withCapacity(
              36 * this.ins.length
            );
            this.ins.forEach((txIn) => {
              bufferWriter.writeSlice(txIn.hash);
              bufferWriter.writeUInt32(txIn.index);
            });
            hashPrevouts = (0, sha256_1.sha256)(bufferWriter.end());
            bufferWriter = bufferutils_js_1.BufferWriter.withCapacity(
              8 * this.ins.length
            );
            values.forEach((value) => bufferWriter.writeInt64(value));
            hashAmounts = (0, sha256_1.sha256)(bufferWriter.end());
            bufferWriter = bufferutils_js_1.BufferWriter.withCapacity(
              prevOutScripts.map(varSliceSize).reduce((a, b) => a + b)
            );
            prevOutScripts.forEach(
              (prevOutScript) => bufferWriter.writeVarSlice(prevOutScript)
            );
            hashScriptPubKeys = (0, sha256_1.sha256)(bufferWriter.end());
            bufferWriter = bufferutils_js_1.BufferWriter.withCapacity(
              4 * this.ins.length
            );
            this.ins.forEach((txIn) => bufferWriter.writeUInt32(txIn.sequence));
            hashSequences = (0, sha256_1.sha256)(bufferWriter.end());
          }
          if (!(isNone || isSingle)) {
            if (!this.outs.length)
              throw new Error("Add outputs to the transaction before signing.");
            const txOutsSize = this.outs.map((output) => 8 + varSliceSize(output.script)).reduce((a, b) => a + b);
            const bufferWriter = bufferutils_js_1.BufferWriter.withCapacity(txOutsSize);
            this.outs.forEach((out) => {
              bufferWriter.writeInt64(out.value);
              bufferWriter.writeVarSlice(out.script);
            });
            hashOutputs = (0, sha256_1.sha256)(bufferWriter.end());
          } else if (isSingle && inIndex < this.outs.length) {
            const output = this.outs[inIndex];
            const bufferWriter = bufferutils_js_1.BufferWriter.withCapacity(
              8 + varSliceSize(output.script)
            );
            bufferWriter.writeInt64(output.value);
            bufferWriter.writeVarSlice(output.script);
            hashOutputs = (0, sha256_1.sha256)(bufferWriter.end());
          }
          const spendType = (leafHash ? 2 : 0) + (annex ? 1 : 0);
          const sigMsgSize = 174 - (isAnyoneCanPay ? 49 : 0) - (isNone ? 32 : 0) + (annex ? 32 : 0) + (leafHash ? 37 : 0);
          const sigMsgWriter = bufferutils_js_1.BufferWriter.withCapacity(sigMsgSize);
          sigMsgWriter.writeUInt8(hashType);
          sigMsgWriter.writeUInt32(this.version);
          sigMsgWriter.writeUInt32(this.locktime);
          sigMsgWriter.writeSlice(hashPrevouts);
          sigMsgWriter.writeSlice(hashAmounts);
          sigMsgWriter.writeSlice(hashScriptPubKeys);
          sigMsgWriter.writeSlice(hashSequences);
          if (!(isNone || isSingle)) {
            sigMsgWriter.writeSlice(hashOutputs);
          }
          sigMsgWriter.writeUInt8(spendType);
          if (isAnyoneCanPay) {
            const input = this.ins[inIndex];
            sigMsgWriter.writeSlice(input.hash);
            sigMsgWriter.writeUInt32(input.index);
            sigMsgWriter.writeInt64(values[inIndex]);
            sigMsgWriter.writeVarSlice(prevOutScripts[inIndex]);
            sigMsgWriter.writeUInt32(input.sequence);
          } else {
            sigMsgWriter.writeUInt32(inIndex);
          }
          if (annex) {
            const bufferWriter = bufferutils_js_1.BufferWriter.withCapacity(
              varSliceSize(annex)
            );
            bufferWriter.writeVarSlice(annex);
            sigMsgWriter.writeSlice((0, sha256_1.sha256)(bufferWriter.end()));
          }
          if (isSingle) {
            sigMsgWriter.writeSlice(hashOutputs);
          }
          if (leafHash) {
            sigMsgWriter.writeSlice(leafHash);
            sigMsgWriter.writeUInt8(0);
            sigMsgWriter.writeUInt32(4294967295);
          }
          return bcrypto.taggedHash(
            "TapSighash",
            tools.concat([Uint8Array.from([0]), sigMsgWriter.end()])
          );
        }
        hashForWitnessV0(inIndex, prevOutScript, value, hashType) {
          v.parse(
            v.tuple([
              types.UInt32Schema,
              types.BufferSchema,
              types.SatoshiSchema,
              types.UInt32Schema
            ]),
            [inIndex, prevOutScript, value, hashType]
          );
          let tbuffer = Uint8Array.from([]);
          let bufferWriter;
          let hashOutputs = ZERO;
          let hashPrevouts = ZERO;
          let hashSequence = ZERO;
          if (!(hashType & _Transaction.SIGHASH_ANYONECANPAY)) {
            tbuffer = new Uint8Array(36 * this.ins.length);
            bufferWriter = new bufferutils_js_1.BufferWriter(tbuffer, 0);
            this.ins.forEach((txIn) => {
              bufferWriter.writeSlice(txIn.hash);
              bufferWriter.writeUInt32(txIn.index);
            });
            hashPrevouts = bcrypto.hash256(tbuffer);
          }
          if (!(hashType & _Transaction.SIGHASH_ANYONECANPAY) && (hashType & 31) !== _Transaction.SIGHASH_SINGLE && (hashType & 31) !== _Transaction.SIGHASH_NONE) {
            tbuffer = new Uint8Array(4 * this.ins.length);
            bufferWriter = new bufferutils_js_1.BufferWriter(tbuffer, 0);
            this.ins.forEach((txIn) => {
              bufferWriter.writeUInt32(txIn.sequence);
            });
            hashSequence = bcrypto.hash256(tbuffer);
          }
          if ((hashType & 31) !== _Transaction.SIGHASH_SINGLE && (hashType & 31) !== _Transaction.SIGHASH_NONE) {
            const txOutsSize = this.outs.reduce((sum, output) => {
              return sum + 8 + varSliceSize(output.script);
            }, 0);
            tbuffer = new Uint8Array(txOutsSize);
            bufferWriter = new bufferutils_js_1.BufferWriter(tbuffer, 0);
            this.outs.forEach((out) => {
              bufferWriter.writeInt64(out.value);
              bufferWriter.writeVarSlice(out.script);
            });
            hashOutputs = bcrypto.hash256(tbuffer);
          } else if ((hashType & 31) === _Transaction.SIGHASH_SINGLE && inIndex < this.outs.length) {
            const output = this.outs[inIndex];
            tbuffer = new Uint8Array(8 + varSliceSize(output.script));
            bufferWriter = new bufferutils_js_1.BufferWriter(tbuffer, 0);
            bufferWriter.writeInt64(output.value);
            bufferWriter.writeVarSlice(output.script);
            hashOutputs = bcrypto.hash256(tbuffer);
          }
          tbuffer = new Uint8Array(156 + varSliceSize(prevOutScript));
          bufferWriter = new bufferutils_js_1.BufferWriter(tbuffer, 0);
          const input = this.ins[inIndex];
          bufferWriter.writeUInt32(this.version);
          bufferWriter.writeSlice(hashPrevouts);
          bufferWriter.writeSlice(hashSequence);
          bufferWriter.writeSlice(input.hash);
          bufferWriter.writeUInt32(input.index);
          bufferWriter.writeVarSlice(prevOutScript);
          bufferWriter.writeInt64(value);
          bufferWriter.writeUInt32(input.sequence);
          bufferWriter.writeSlice(hashOutputs);
          bufferWriter.writeUInt32(this.locktime);
          bufferWriter.writeUInt32(hashType);
          return bcrypto.hash256(tbuffer);
        }
        getHash(forWitness) {
          if (forWitness && this.isCoinbase()) return new Uint8Array(32);
          return bcrypto.hash256(this.__toBuffer(void 0, void 0, forWitness));
        }
        getId() {
          return tools.toHex(
            (0, bufferutils_js_1.reverseBuffer)(this.getHash(false))
          );
        }
        toBuffer(buffer, initialOffset) {
          return this.__toBuffer(buffer, initialOffset, true);
        }
        toHex() {
          return tools.toHex(this.toBuffer(void 0, void 0));
        }
        setInputScript(index, scriptSig) {
          v.parse(v.tuple([v.number(), types.BufferSchema]), [index, scriptSig]);
          this.ins[index].script = scriptSig;
        }
        setWitness(index, witness) {
          v.parse(v.tuple([v.number(), v.array(types.BufferSchema)]), [
            index,
            witness
          ]);
          this.ins[index].witness = witness;
        }
        __toBuffer(buffer, initialOffset, _ALLOW_WITNESS = false) {
          if (!buffer) buffer = new Uint8Array(this.byteLength(_ALLOW_WITNESS));
          const bufferWriter = new bufferutils_js_1.BufferWriter(
            buffer,
            initialOffset || 0
          );
          bufferWriter.writeUInt32(this.version);
          const hasWitnesses = _ALLOW_WITNESS && this.hasWitnesses();
          if (hasWitnesses) {
            bufferWriter.writeUInt8(_Transaction.ADVANCED_TRANSACTION_MARKER);
            bufferWriter.writeUInt8(_Transaction.ADVANCED_TRANSACTION_FLAG);
          }
          bufferWriter.writeVarInt(this.ins.length);
          this.ins.forEach((txIn) => {
            bufferWriter.writeSlice(txIn.hash);
            bufferWriter.writeUInt32(txIn.index);
            bufferWriter.writeVarSlice(txIn.script);
            bufferWriter.writeUInt32(txIn.sequence);
          });
          bufferWriter.writeVarInt(this.outs.length);
          this.outs.forEach((txOut) => {
            if (isOutput(txOut)) {
              bufferWriter.writeInt64(txOut.value);
            } else {
              bufferWriter.writeSlice(txOut.valueBuffer);
            }
            bufferWriter.writeVarSlice(txOut.script);
          });
          if (hasWitnesses) {
            this.ins.forEach((input) => {
              bufferWriter.writeVector(input.witness);
            });
          }
          bufferWriter.writeUInt32(this.locktime);
          if (initialOffset !== void 0)
            return buffer.slice(initialOffset, bufferWriter.offset);
          return buffer;
        }
      };
      exports.Transaction = Transaction;
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/block.cjs
  var require_block = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/block.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v2) {
        Object.defineProperty(o, "default", { enumerable: true, value: v2 });
      } : function(o, v2) {
        o["default"] = v2;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Block = void 0;
      var bufferutils_js_1 = require_bufferutils();
      var bcrypto = __importStar(require_crypto2());
      var merkle_js_1 = require_merkle();
      var transaction_js_1 = require_transaction();
      var v = __importStar(require_dist());
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var errorMerkleNoTxes = new TypeError(
        "Cannot compute merkle root for zero transactions"
      );
      var errorWitnessNotSegwit = new TypeError(
        "Cannot compute witness commit for non-segwit block"
      );
      var Block = class _Block {
        static fromBuffer(buffer) {
          if (buffer.length < 80) throw new Error("Buffer too small (< 80 bytes)");
          const bufferReader = new bufferutils_js_1.BufferReader(buffer);
          const block = new _Block();
          block.version = bufferReader.readInt32();
          block.prevHash = bufferReader.readSlice(32);
          block.merkleRoot = bufferReader.readSlice(32);
          block.timestamp = bufferReader.readUInt32();
          block.bits = bufferReader.readUInt32();
          block.nonce = bufferReader.readUInt32();
          if (buffer.length === 80) return block;
          const readTransaction = () => {
            const tx = transaction_js_1.Transaction.fromBuffer(
              bufferReader.buffer.slice(bufferReader.offset),
              true
            );
            bufferReader.offset += tx.byteLength();
            return tx;
          };
          const nTransactions = bufferReader.readVarInt();
          block.transactions = [];
          for (let i = 0; i < nTransactions; ++i) {
            const tx = readTransaction();
            block.transactions.push(tx);
          }
          const witnessCommit = block.getWitnessCommit();
          if (witnessCommit) block.witnessCommit = witnessCommit;
          return block;
        }
        static fromHex(hex) {
          return _Block.fromBuffer(tools.fromHex(hex));
        }
        static calculateTarget(bits) {
          const exponent = ((bits & 4278190080) >> 24) - 3;
          const mantissa = bits & 8388607;
          const target = new Uint8Array(32);
          target[29 - exponent] = mantissa >> 16 & 255;
          target[30 - exponent] = mantissa >> 8 & 255;
          target[31 - exponent] = mantissa & 255;
          return target;
        }
        static calculateMerkleRoot(transactions, forWitness) {
          v.parse(v.array(v.object({ getHash: v.function() })), transactions);
          if (transactions.length === 0) throw errorMerkleNoTxes;
          if (forWitness && !txesHaveWitnessCommit(transactions))
            throw errorWitnessNotSegwit;
          const hashes = transactions.map(
            (transaction) => transaction.getHash(forWitness)
          );
          const rootHash = (0, merkle_js_1.fastMerkleRoot)(hashes, bcrypto.hash256);
          return forWitness ? bcrypto.hash256(
            tools.concat([rootHash, transactions[0].ins[0].witness[0]])
          ) : rootHash;
        }
        version = 1;
        prevHash = void 0;
        merkleRoot = void 0;
        timestamp = 0;
        witnessCommit = void 0;
        bits = 0;
        nonce = 0;
        transactions = void 0;
        getWitnessCommit() {
          if (!txesHaveWitnessCommit(this.transactions)) return null;
          const witnessCommits = this.transactions[0].outs.filter(
            (out) => tools.compare(
              out.script.slice(0, 6),
              Uint8Array.from([106, 36, 170, 33, 169, 237])
            ) === 0
          ).map((out) => out.script.slice(6, 38));
          if (witnessCommits.length === 0) return null;
          const result = witnessCommits[witnessCommits.length - 1];
          if (!(result instanceof Uint8Array && result.length === 32)) return null;
          return result;
        }
        hasWitnessCommit() {
          if (this.witnessCommit instanceof Uint8Array && this.witnessCommit.length === 32)
            return true;
          if (this.getWitnessCommit() !== null) return true;
          return false;
        }
        hasWitness() {
          return anyTxHasWitness(this.transactions);
        }
        weight() {
          const base = this.byteLength(false, false);
          const total = this.byteLength(false, true);
          return base * 3 + total;
        }
        byteLength(headersOnly, allowWitness = true) {
          if (headersOnly || !this.transactions) return 80;
          return 80 + bufferutils_js_1.varuint.encodingLength(this.transactions.length) + this.transactions.reduce((a, x) => a + x.byteLength(allowWitness), 0);
        }
        getHash() {
          return bcrypto.hash256(this.toBuffer(true));
        }
        getId() {
          return tools.toHex((0, bufferutils_js_1.reverseBuffer)(this.getHash()));
        }
        getUTCDate() {
          const date = /* @__PURE__ */ new Date(0);
          date.setUTCSeconds(this.timestamp);
          return date;
        }
        // TODO: buffer, offset compatibility
        toBuffer(headersOnly) {
          const buffer = new Uint8Array(this.byteLength(headersOnly));
          const bufferWriter = new bufferutils_js_1.BufferWriter(buffer);
          bufferWriter.writeInt32(this.version);
          bufferWriter.writeSlice(this.prevHash);
          bufferWriter.writeSlice(this.merkleRoot);
          bufferWriter.writeUInt32(this.timestamp);
          bufferWriter.writeUInt32(this.bits);
          bufferWriter.writeUInt32(this.nonce);
          if (headersOnly || !this.transactions) return buffer;
          const { bytes } = bufferutils_js_1.varuint.encode(
            this.transactions.length,
            buffer,
            bufferWriter.offset
          );
          bufferWriter.offset += bytes;
          this.transactions.forEach((tx) => {
            const txSize = tx.byteLength();
            tx.toBuffer(buffer, bufferWriter.offset);
            bufferWriter.offset += txSize;
          });
          return buffer;
        }
        toHex(headersOnly) {
          return tools.toHex(this.toBuffer(headersOnly));
        }
        checkTxRoots() {
          const hasWitnessCommit = this.hasWitnessCommit();
          if (!hasWitnessCommit && this.hasWitness()) return false;
          return this.__checkMerkleRoot() && (hasWitnessCommit ? this.__checkWitnessCommit() : true);
        }
        checkProofOfWork() {
          const hash = (0, bufferutils_js_1.reverseBuffer)(this.getHash());
          const target = _Block.calculateTarget(this.bits);
          return tools.compare(hash, target) <= 0;
        }
        __checkMerkleRoot() {
          if (!this.transactions) throw errorMerkleNoTxes;
          const actualMerkleRoot = _Block.calculateMerkleRoot(this.transactions);
          return tools.compare(this.merkleRoot, actualMerkleRoot) === 0;
        }
        __checkWitnessCommit() {
          if (!this.transactions) throw errorMerkleNoTxes;
          if (!this.hasWitnessCommit()) throw errorWitnessNotSegwit;
          const actualWitnessCommit = _Block.calculateMerkleRoot(
            this.transactions,
            true
          );
          return tools.compare(this.witnessCommit, actualWitnessCommit) === 0;
        }
      };
      exports.Block = Block;
      function txesHaveWitnessCommit(transactions) {
        return transactions instanceof Array && transactions[0] && transactions[0].ins && transactions[0].ins instanceof Array && transactions[0].ins[0] && transactions[0].ins[0].witness && transactions[0].ins[0].witness instanceof Array && transactions[0].ins[0].witness.length > 0;
      }
      function anyTxHasWitness(transactions) {
        return transactions instanceof Array && transactions.some(
          (tx) => typeof tx === "object" && tx.ins instanceof Array && tx.ins.some(
            (input) => typeof input === "object" && input.witness instanceof Array && input.witness.length > 0
          )
        );
      }
    }
  });

  // node_modules/bip174/src/cjs/lib/typeFields.cjs
  var require_typeFields = __commonJS({
    "node_modules/bip174/src/cjs/lib/typeFields.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var GlobalTypes;
      (function(GlobalTypes2) {
        GlobalTypes2[GlobalTypes2["UNSIGNED_TX"] = 0] = "UNSIGNED_TX";
        GlobalTypes2[GlobalTypes2["GLOBAL_XPUB"] = 1] = "GLOBAL_XPUB";
      })(GlobalTypes = exports.GlobalTypes || (exports.GlobalTypes = {}));
      exports.GLOBAL_TYPE_NAMES = ["unsignedTx", "globalXpub"];
      var InputTypes;
      (function(InputTypes2) {
        InputTypes2[InputTypes2["NON_WITNESS_UTXO"] = 0] = "NON_WITNESS_UTXO";
        InputTypes2[InputTypes2["WITNESS_UTXO"] = 1] = "WITNESS_UTXO";
        InputTypes2[InputTypes2["PARTIAL_SIG"] = 2] = "PARTIAL_SIG";
        InputTypes2[InputTypes2["SIGHASH_TYPE"] = 3] = "SIGHASH_TYPE";
        InputTypes2[InputTypes2["REDEEM_SCRIPT"] = 4] = "REDEEM_SCRIPT";
        InputTypes2[InputTypes2["WITNESS_SCRIPT"] = 5] = "WITNESS_SCRIPT";
        InputTypes2[InputTypes2["BIP32_DERIVATION"] = 6] = "BIP32_DERIVATION";
        InputTypes2[InputTypes2["FINAL_SCRIPTSIG"] = 7] = "FINAL_SCRIPTSIG";
        InputTypes2[InputTypes2["FINAL_SCRIPTWITNESS"] = 8] = "FINAL_SCRIPTWITNESS";
        InputTypes2[InputTypes2["POR_COMMITMENT"] = 9] = "POR_COMMITMENT";
        InputTypes2[InputTypes2["TAP_KEY_SIG"] = 19] = "TAP_KEY_SIG";
        InputTypes2[InputTypes2["TAP_SCRIPT_SIG"] = 20] = "TAP_SCRIPT_SIG";
        InputTypes2[InputTypes2["TAP_LEAF_SCRIPT"] = 21] = "TAP_LEAF_SCRIPT";
        InputTypes2[InputTypes2["TAP_BIP32_DERIVATION"] = 22] = "TAP_BIP32_DERIVATION";
        InputTypes2[InputTypes2["TAP_INTERNAL_KEY"] = 23] = "TAP_INTERNAL_KEY";
        InputTypes2[InputTypes2["TAP_MERKLE_ROOT"] = 24] = "TAP_MERKLE_ROOT";
      })(InputTypes = exports.InputTypes || (exports.InputTypes = {}));
      exports.INPUT_TYPE_NAMES = [
        "nonWitnessUtxo",
        "witnessUtxo",
        "partialSig",
        "sighashType",
        "redeemScript",
        "witnessScript",
        "bip32Derivation",
        "finalScriptSig",
        "finalScriptWitness",
        "porCommitment",
        "tapKeySig",
        "tapScriptSig",
        "tapLeafScript",
        "tapBip32Derivation",
        "tapInternalKey",
        "tapMerkleRoot"
      ];
      var OutputTypes;
      (function(OutputTypes2) {
        OutputTypes2[OutputTypes2["REDEEM_SCRIPT"] = 0] = "REDEEM_SCRIPT";
        OutputTypes2[OutputTypes2["WITNESS_SCRIPT"] = 1] = "WITNESS_SCRIPT";
        OutputTypes2[OutputTypes2["BIP32_DERIVATION"] = 2] = "BIP32_DERIVATION";
        OutputTypes2[OutputTypes2["TAP_INTERNAL_KEY"] = 5] = "TAP_INTERNAL_KEY";
        OutputTypes2[OutputTypes2["TAP_TREE"] = 6] = "TAP_TREE";
        OutputTypes2[OutputTypes2["TAP_BIP32_DERIVATION"] = 7] = "TAP_BIP32_DERIVATION";
      })(OutputTypes = exports.OutputTypes || (exports.OutputTypes = {}));
      exports.OUTPUT_TYPE_NAMES = [
        "redeemScript",
        "witnessScript",
        "bip32Derivation",
        "tapInternalKey",
        "tapTree",
        "tapBip32Derivation"
      ];
    }
  });

  // node_modules/bip174/node_modules/uint8array-tools/src/mjs/browser.js
  var browser_exports3 = {};
  __export(browser_exports3, {
    compare: () => compare3,
    concat: () => concat3,
    fromBase64: () => fromBase643,
    fromHex: () => fromHex3,
    fromUtf8: () => fromUtf83,
    readInt16: () => readInt162,
    readInt32: () => readInt322,
    readInt64: () => readInt642,
    readInt8: () => readInt82,
    readUInt16: () => readUInt163,
    readUInt32: () => readUInt323,
    readUInt64: () => readUInt643,
    readUInt8: () => readUInt83,
    toBase64: () => toBase643,
    toHex: () => toHex3,
    toUtf8: () => toUtf83,
    writeInt16: () => writeInt162,
    writeInt32: () => writeInt322,
    writeInt64: () => writeInt642,
    writeInt8: () => writeInt82,
    writeUInt16: () => writeUInt163,
    writeUInt32: () => writeUInt323,
    writeUInt64: () => writeUInt643,
    writeUInt8: () => writeUInt83
  });
  function toUtf83(bytes) {
    return DECODER3.decode(bytes);
  }
  function fromUtf83(s) {
    return ENCODER3.encode(s);
  }
  function concat3(arrays) {
    const totalLength = arrays.reduce((a, b) => a + b.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const array of arrays) {
      result.set(array, offset);
      offset += array.length;
    }
    return result;
  }
  function toHex3(bytes) {
    const b = bytes || new Uint8Array();
    return b.length > 512 ? _toHexLengthPerf3(b) : _toHexIterPerf3(b);
  }
  function _toHexIterPerf3(bytes) {
    let s = "";
    for (let i = 0; i < bytes.length; ++i) {
      s += HEX_STRINGS3[HEX_CODEPOINTS3[HEX_CODES3[bytes[i] >> 4]]];
      s += HEX_STRINGS3[HEX_CODEPOINTS3[HEX_CODES3[bytes[i] & 15]]];
    }
    return s;
  }
  function _toHexLengthPerf3(bytes) {
    const hexBytes = new Uint8Array(bytes.length * 2);
    for (let i = 0; i < bytes.length; ++i) {
      hexBytes[i * 2] = HEX_CODES3[bytes[i] >> 4];
      hexBytes[i * 2 + 1] = HEX_CODES3[bytes[i] & 15];
    }
    return DECODER3.decode(hexBytes);
  }
  function fromHex3(hexString) {
    const hexBytes = ENCODER3.encode(hexString || "");
    const resultBytes = new Uint8Array(Math.floor(hexBytes.length / 2));
    let i;
    for (i = 0; i < resultBytes.length; i++) {
      const a = HEX_CODEPOINTS3[hexBytes[i * 2]];
      const b = HEX_CODEPOINTS3[hexBytes[i * 2 + 1]];
      if (a === void 0 || b === void 0) {
        break;
      }
      resultBytes[i] = a << 4 | b;
    }
    return i === resultBytes.length ? resultBytes : resultBytes.slice(0, i);
  }
  function toBase643(bytes) {
    return btoa(String.fromCharCode(...bytes));
  }
  function fromBase643(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
  function compare3(v1, v2) {
    const minLength = Math.min(v1.length, v2.length);
    for (let i = 0; i < minLength; ++i) {
      if (v1[i] !== v2[i]) {
        return v1[i] < v2[i] ? -1 : 1;
      }
    }
    return v1.length === v2.length ? 0 : v1.length > v2.length ? 1 : -1;
  }
  function writeUInt83(buffer, offset, value) {
    if (offset + 1 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    if (value > 255) {
      throw new Error(`The value of "value" is out of range. It must be >= 0 and <= ${255}. Received ${value}`);
    }
    buffer[offset] = value;
    return offset + 1;
  }
  function writeUInt163(buffer, offset, value, littleEndian) {
    if (offset + 2 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (value > 65535) {
      throw new Error(`The value of "value" is out of range. It must be >= 0 and <= ${65535}. Received ${value}`);
    }
    if (littleEndian === "LE") {
      buffer[offset] = value & 255;
      buffer[offset + 1] = value >> 8 & 255;
    } else {
      buffer[offset] = value >> 8 & 255;
      buffer[offset + 1] = value & 255;
    }
    return offset + 2;
  }
  function writeUInt323(buffer, offset, value, littleEndian) {
    if (offset + 4 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (value > 4294967295) {
      throw new Error(`The value of "value" is out of range. It must be >= 0 and <= ${4294967295}. Received ${value}`);
    }
    if (littleEndian === "LE") {
      buffer[offset] = value & 255;
      buffer[offset + 1] = value >> 8 & 255;
      buffer[offset + 2] = value >> 16 & 255;
      buffer[offset + 3] = value >> 24 & 255;
    } else {
      buffer[offset] = value >> 24 & 255;
      buffer[offset + 1] = value >> 16 & 255;
      buffer[offset + 2] = value >> 8 & 255;
      buffer[offset + 3] = value & 255;
    }
    return offset + 4;
  }
  function writeUInt643(buffer, offset, value, littleEndian) {
    if (offset + 8 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (value > 0xffffffffffffffffn) {
      throw new Error(`The value of "value" is out of range. It must be >= 0 and <= ${0xffffffffffffffffn}. Received ${value}`);
    }
    if (littleEndian === "LE") {
      buffer[offset] = Number(value & 0xffn);
      buffer[offset + 1] = Number(value >> 8n & 0xffn);
      buffer[offset + 2] = Number(value >> 16n & 0xffn);
      buffer[offset + 3] = Number(value >> 24n & 0xffn);
      buffer[offset + 4] = Number(value >> 32n & 0xffn);
      buffer[offset + 5] = Number(value >> 40n & 0xffn);
      buffer[offset + 6] = Number(value >> 48n & 0xffn);
      buffer[offset + 7] = Number(value >> 56n & 0xffn);
    } else {
      buffer[offset] = Number(value >> 56n & 0xffn);
      buffer[offset + 1] = Number(value >> 48n & 0xffn);
      buffer[offset + 2] = Number(value >> 40n & 0xffn);
      buffer[offset + 3] = Number(value >> 32n & 0xffn);
      buffer[offset + 4] = Number(value >> 24n & 0xffn);
      buffer[offset + 5] = Number(value >> 16n & 0xffn);
      buffer[offset + 6] = Number(value >> 8n & 0xffn);
      buffer[offset + 7] = Number(value & 0xffn);
    }
    return offset + 8;
  }
  function readUInt83(buffer, offset) {
    if (offset + 1 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    return buffer[offset];
  }
  function readUInt163(buffer, offset, littleEndian) {
    if (offset + 2 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      let num = 0;
      num = (num << 8) + buffer[offset + 1];
      num = (num << 8) + buffer[offset];
      return num;
    } else {
      let num = 0;
      num = (num << 8) + buffer[offset];
      num = (num << 8) + buffer[offset + 1];
      return num;
    }
  }
  function readUInt323(buffer, offset, littleEndian) {
    if (offset + 4 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      let num = 0;
      num = (num << 8) + buffer[offset + 3] >>> 0;
      num = (num << 8) + buffer[offset + 2] >>> 0;
      num = (num << 8) + buffer[offset + 1] >>> 0;
      num = (num << 8) + buffer[offset] >>> 0;
      return num;
    } else {
      let num = 0;
      num = (num << 8) + buffer[offset] >>> 0;
      num = (num << 8) + buffer[offset + 1] >>> 0;
      num = (num << 8) + buffer[offset + 2] >>> 0;
      num = (num << 8) + buffer[offset + 3] >>> 0;
      return num;
    }
  }
  function readUInt643(buffer, offset, littleEndian) {
    if (offset + 8 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      let num = 0n;
      num = (num << 8n) + BigInt(buffer[offset + 7]);
      num = (num << 8n) + BigInt(buffer[offset + 6]);
      num = (num << 8n) + BigInt(buffer[offset + 5]);
      num = (num << 8n) + BigInt(buffer[offset + 4]);
      num = (num << 8n) + BigInt(buffer[offset + 3]);
      num = (num << 8n) + BigInt(buffer[offset + 2]);
      num = (num << 8n) + BigInt(buffer[offset + 1]);
      num = (num << 8n) + BigInt(buffer[offset]);
      return num;
    } else {
      let num = 0n;
      num = (num << 8n) + BigInt(buffer[offset]);
      num = (num << 8n) + BigInt(buffer[offset + 1]);
      num = (num << 8n) + BigInt(buffer[offset + 2]);
      num = (num << 8n) + BigInt(buffer[offset + 3]);
      num = (num << 8n) + BigInt(buffer[offset + 4]);
      num = (num << 8n) + BigInt(buffer[offset + 5]);
      num = (num << 8n) + BigInt(buffer[offset + 6]);
      num = (num << 8n) + BigInt(buffer[offset + 7]);
      return num;
    }
  }
  function writeInt82(buffer, offset, value) {
    if (offset + 1 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    if (value > 127 || value < -128) {
      throw new Error(`The value of "value" is out of range. It must be >= ${-128} and <= ${127}. Received ${value}`);
    }
    buffer[offset] = value;
    return offset + 1;
  }
  function writeInt162(buffer, offset, value, littleEndian) {
    if (offset + 2 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    if (value > 32767 || value < -32768) {
      throw new Error(`The value of "value" is out of range. It must be >= ${-32768} and <= ${32767}. Received ${value}`);
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      buffer[offset] = value & 255;
      buffer[offset + 1] = value >> 8 & 255;
    } else {
      buffer[offset] = value >> 8 & 255;
      buffer[offset + 1] = value & 255;
    }
    return offset + 2;
  }
  function writeInt322(buffer, offset, value, littleEndian) {
    if (offset + 4 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    if (value > 2147483647 || value < -2147483648) {
      throw new Error(`The value of "value" is out of range. It must be >= ${-2147483648} and <= ${2147483647}. Received ${value}`);
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      buffer[offset] = value & 255;
      buffer[offset + 1] = value >> 8 & 255;
      buffer[offset + 2] = value >> 16 & 255;
      buffer[offset + 3] = value >> 24 & 255;
    } else {
      buffer[offset] = value >> 24 & 255;
      buffer[offset + 1] = value >> 16 & 255;
      buffer[offset + 2] = value >> 8 & 255;
      buffer[offset + 3] = value & 255;
    }
    return offset + 4;
  }
  function writeInt642(buffer, offset, value, littleEndian) {
    if (offset + 8 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    if (value > 0x7fffffffffffffffn || value < -0x8000000000000000n) {
      throw new Error(`The value of "value" is out of range. It must be >= ${-0x8000000000000000n} and <= ${0x7fffffffffffffffn}. Received ${value}`);
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      buffer[offset] = Number(value & 0xffn);
      buffer[offset + 1] = Number(value >> 8n & 0xffn);
      buffer[offset + 2] = Number(value >> 16n & 0xffn);
      buffer[offset + 3] = Number(value >> 24n & 0xffn);
      buffer[offset + 4] = Number(value >> 32n & 0xffn);
      buffer[offset + 5] = Number(value >> 40n & 0xffn);
      buffer[offset + 6] = Number(value >> 48n & 0xffn);
      buffer[offset + 7] = Number(value >> 56n & 0xffn);
    } else {
      buffer[offset] = Number(value >> 56n & 0xffn);
      buffer[offset + 1] = Number(value >> 48n & 0xffn);
      buffer[offset + 2] = Number(value >> 40n & 0xffn);
      buffer[offset + 3] = Number(value >> 32n & 0xffn);
      buffer[offset + 4] = Number(value >> 24n & 0xffn);
      buffer[offset + 5] = Number(value >> 16n & 0xffn);
      buffer[offset + 6] = Number(value >> 8n & 0xffn);
      buffer[offset + 7] = Number(value & 0xffn);
    }
    return offset + 8;
  }
  function readInt82(buffer, offset) {
    if (offset + 1 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    const val = buffer[offset];
    if (val <= 127) {
      return val;
    } else {
      return val - 256;
    }
  }
  function readInt162(buffer, offset, littleEndian) {
    if (offset + 2 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      const val = buffer[offset] + (buffer[offset + 1] << 8);
      return buffer[offset + 1] <= 127 ? val : val - 65536;
    } else {
      const val = (buffer[offset] << 8) + buffer[offset + 1];
      return buffer[offset] <= 127 ? val : val - 65536;
    }
  }
  function readInt322(buffer, offset, littleEndian) {
    if (offset + 4 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    if (littleEndian === "LE") {
      const val = buffer[offset] + (buffer[offset + 1] << 8) + (buffer[offset + 2] << 16) + (buffer[offset + 3] << 24 >>> 0);
      return buffer[offset + 3] <= 127 ? val : val - 4294967296;
    } else {
      const val = (buffer[offset] << 24 >>> 0) + (buffer[offset + 1] << 16) + (buffer[offset + 2] << 8) + buffer[offset + 3];
      return buffer[offset] <= 127 ? val : val - 4294967296;
    }
  }
  function readInt642(buffer, offset, littleEndian) {
    if (offset + 8 > buffer.length) {
      throw new Error("Offset is outside the bounds of Uint8Array");
    }
    littleEndian = littleEndian.toUpperCase();
    let num = 0n;
    if (littleEndian === "LE") {
      num = (num << 8n) + BigInt(buffer[offset + 7]);
      num = (num << 8n) + BigInt(buffer[offset + 6]);
      num = (num << 8n) + BigInt(buffer[offset + 5]);
      num = (num << 8n) + BigInt(buffer[offset + 4]);
      num = (num << 8n) + BigInt(buffer[offset + 3]);
      num = (num << 8n) + BigInt(buffer[offset + 2]);
      num = (num << 8n) + BigInt(buffer[offset + 1]);
      num = (num << 8n) + BigInt(buffer[offset]);
      return buffer[offset + 7] <= 127 ? num : num - 0x10000000000000000n;
    } else {
      let num2 = 0n;
      num2 = (num2 << 8n) + BigInt(buffer[offset]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 1]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 2]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 3]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 4]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 5]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 6]);
      num2 = (num2 << 8n) + BigInt(buffer[offset + 7]);
      return buffer[offset] <= 127 ? num2 : num2 - 0x10000000000000000n;
    }
  }
  var HEX_STRINGS3, HEX_CODES3, HEX_CODEPOINTS3, ENCODER3, DECODER3;
  var init_browser3 = __esm({
    "node_modules/bip174/node_modules/uint8array-tools/src/mjs/browser.js"() {
      HEX_STRINGS3 = "0123456789abcdefABCDEF";
      HEX_CODES3 = HEX_STRINGS3.split("").map((c) => c.codePointAt(0));
      HEX_CODEPOINTS3 = Array(256).fill(true).map((_, i) => {
        const s = String.fromCodePoint(i);
        const index = HEX_STRINGS3.indexOf(s);
        return index < 0 ? void 0 : index < 16 ? index : index - 6;
      });
      ENCODER3 = new TextEncoder();
      DECODER3 = new TextDecoder();
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/global/globalXpub.cjs
  var require_globalXpub = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/global/globalXpub.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      var range = (n) => [...Array(n).keys()];
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.GlobalTypes.GLOBAL_XPUB) {
          throw new Error(
            "Decode Error: could not decode globalXpub with key 0x" + tools.toHex(keyVal.key)
          );
        }
        if (keyVal.key.length !== 79 || ![2, 3].includes(keyVal.key[46])) {
          throw new Error(
            "Decode Error: globalXpub has invalid extended pubkey in key 0x" + tools.toHex(keyVal.key)
          );
        }
        if (keyVal.value.length / 4 % 1 !== 0) {
          throw new Error(
            "Decode Error: Global GLOBAL_XPUB value length should be multiple of 4"
          );
        }
        const extendedPubkey = keyVal.key.slice(1);
        const data = {
          masterFingerprint: keyVal.value.slice(0, 4),
          extendedPubkey,
          path: "m"
        };
        for (const i of range(keyVal.value.length / 4 - 1)) {
          const val = tools.readUInt32(keyVal.value, i * 4 + 4, "LE");
          const isHard = !!(val & 2147483648);
          const idx = val & 2147483647;
          data.path += "/" + idx.toString(10) + (isHard ? "'" : "");
        }
        return data;
      }
      exports.decode = decode;
      function encode(data) {
        const head = new Uint8Array([typeFields_js_1.GlobalTypes.GLOBAL_XPUB]);
        const key = tools.concat([head, data.extendedPubkey]);
        const splitPath = data.path.split("/");
        const value = new Uint8Array(splitPath.length * 4);
        value.set(data.masterFingerprint, 0);
        let offset = 4;
        splitPath.slice(1).forEach((level) => {
          const isHard = level.slice(-1) === "'";
          let num = 2147483647 & parseInt(isHard ? level.slice(0, -1) : level, 10);
          if (isHard) num += 2147483648;
          tools.writeUInt32(value, offset, num, "LE");
          offset += 4;
        });
        return {
          key,
          value
        };
      }
      exports.encode = encode;
      exports.expected = "{ masterFingerprint: Uint8Array; extendedPubkey: Uint8Array; path: string; }";
      function check(data) {
        const epk = data.extendedPubkey;
        const mfp = data.masterFingerprint;
        const p = data.path;
        return epk instanceof Uint8Array && epk.length === 78 && [2, 3].indexOf(epk[45]) > -1 && mfp instanceof Uint8Array && mfp.length === 4 && typeof p === "string" && !!p.match(/^m(\/\d+'?)*$/);
      }
      exports.check = check;
      function canAddToArray(array, item, dupeSet) {
        const dupeString = tools.toHex(item.extendedPubkey);
        if (dupeSet.has(dupeString)) return false;
        dupeSet.add(dupeString);
        return array.filter((v) => tools.compare(v.extendedPubkey, item.extendedPubkey)).length === 0;
      }
      exports.canAddToArray = canAddToArray;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/global/unsignedTx.cjs
  var require_unsignedTx = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/global/unsignedTx.cjs"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      function encode(data) {
        return {
          key: new Uint8Array([typeFields_js_1.GlobalTypes.UNSIGNED_TX]),
          value: data.toBuffer()
        };
      }
      exports.encode = encode;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/input/finalScriptSig.cjs
  var require_finalScriptSig = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/input/finalScriptSig.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.InputTypes.FINAL_SCRIPTSIG) {
          throw new Error(
            "Decode Error: could not decode finalScriptSig with key 0x" + tools.toHex(keyVal.key)
          );
        }
        return keyVal.value;
      }
      exports.decode = decode;
      function encode(data) {
        const key = new Uint8Array([typeFields_js_1.InputTypes.FINAL_SCRIPTSIG]);
        return {
          key,
          value: data
        };
      }
      exports.encode = encode;
      exports.expected = "Uint8Array";
      function check(data) {
        return data instanceof Uint8Array;
      }
      exports.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.finalScriptSig === void 0;
      }
      exports.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/input/finalScriptWitness.cjs
  var require_finalScriptWitness = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/input/finalScriptWitness.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.InputTypes.FINAL_SCRIPTWITNESS) {
          throw new Error(
            "Decode Error: could not decode finalScriptWitness with key 0x" + tools.toHex(keyVal.key)
          );
        }
        return keyVal.value;
      }
      exports.decode = decode;
      function encode(data) {
        const key = new Uint8Array([typeFields_js_1.InputTypes.FINAL_SCRIPTWITNESS]);
        return {
          key,
          value: data
        };
      }
      exports.encode = encode;
      exports.expected = "Uint8Array";
      function check(data) {
        return data instanceof Uint8Array;
      }
      exports.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.finalScriptWitness === void 0;
      }
      exports.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/input/nonWitnessUtxo.cjs
  var require_nonWitnessUtxo = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/input/nonWitnessUtxo.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.InputTypes.NON_WITNESS_UTXO) {
          throw new Error(
            "Decode Error: could not decode nonWitnessUtxo with key 0x" + tools.toHex(keyVal.key)
          );
        }
        return keyVal.value;
      }
      exports.decode = decode;
      function encode(data) {
        return {
          key: new Uint8Array([typeFields_js_1.InputTypes.NON_WITNESS_UTXO]),
          value: data
        };
      }
      exports.encode = encode;
      exports.expected = "Uint8Array";
      function check(data) {
        return data instanceof Uint8Array;
      }
      exports.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.nonWitnessUtxo === void 0;
      }
      exports.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/input/partialSig.cjs
  var require_partialSig = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/input/partialSig.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.InputTypes.PARTIAL_SIG) {
          throw new Error(
            "Decode Error: could not decode partialSig with key 0x" + tools.toHex(keyVal.key)
          );
        }
        if (!(keyVal.key.length === 34 || keyVal.key.length === 66) || ![2, 3, 4].includes(keyVal.key[1])) {
          throw new Error(
            "Decode Error: partialSig has invalid pubkey in key 0x" + tools.toHex(keyVal.key)
          );
        }
        const pubkey = keyVal.key.slice(1);
        return {
          pubkey,
          signature: keyVal.value
        };
      }
      exports.decode = decode;
      function encode(pSig) {
        const head = new Uint8Array([typeFields_js_1.InputTypes.PARTIAL_SIG]);
        return {
          key: tools.concat([head, pSig.pubkey]),
          value: pSig.signature
        };
      }
      exports.encode = encode;
      exports.expected = "{ pubkey: Uint8Array; signature: Uint8Array; }";
      function check(data) {
        return data.pubkey instanceof Uint8Array && data.signature instanceof Uint8Array && [33, 65].includes(data.pubkey.length) && [2, 3, 4].includes(data.pubkey[0]) && isDerSigWithSighash(data.signature);
      }
      exports.check = check;
      function isDerSigWithSighash(buf) {
        if (!(buf instanceof Uint8Array) || buf.length < 9) return false;
        if (buf[0] !== 48) return false;
        if (buf.length !== buf[1] + 3) return false;
        if (buf[2] !== 2) return false;
        const rLen = buf[3];
        if (rLen > 33 || rLen < 1) return false;
        if (buf[3 + rLen + 1] !== 2) return false;
        const sLen = buf[3 + rLen + 2];
        if (sLen > 33 || sLen < 1) return false;
        if (buf.length !== 3 + rLen + 2 + sLen + 2) return false;
        return true;
      }
      function canAddToArray(array, item, dupeSet) {
        const dupeString = tools.toHex(item.pubkey);
        if (dupeSet.has(dupeString)) return false;
        dupeSet.add(dupeString);
        return array.filter((v) => tools.compare(v.pubkey, item.pubkey) === 0).length === 0;
      }
      exports.canAddToArray = canAddToArray;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/input/porCommitment.cjs
  var require_porCommitment = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/input/porCommitment.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.InputTypes.POR_COMMITMENT) {
          throw new Error(
            "Decode Error: could not decode porCommitment with key 0x" + tools.toHex(keyVal.key)
          );
        }
        return tools.toUtf8(keyVal.value);
      }
      exports.decode = decode;
      function encode(data) {
        const key = new Uint8Array([typeFields_js_1.InputTypes.POR_COMMITMENT]);
        return {
          key,
          value: tools.fromUtf8(data)
        };
      }
      exports.encode = encode;
      exports.expected = "string";
      function check(data) {
        return typeof data === "string";
      }
      exports.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.porCommitment === void 0;
      }
      exports.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/input/sighashType.cjs
  var require_sighashType = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/input/sighashType.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.InputTypes.SIGHASH_TYPE) {
          throw new Error(
            "Decode Error: could not decode sighashType with key 0x" + tools.toHex(keyVal.key)
          );
        }
        return Number(tools.readUInt32(keyVal.value, 0, "LE"));
      }
      exports.decode = decode;
      function encode(data) {
        const key = Uint8Array.from([typeFields_js_1.InputTypes.SIGHASH_TYPE]);
        const value = new Uint8Array(4);
        tools.writeUInt32(value, 0, data, "LE");
        return {
          key,
          value
        };
      }
      exports.encode = encode;
      exports.expected = "number";
      function check(data) {
        return typeof data === "number";
      }
      exports.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.sighashType === void 0;
      }
      exports.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/input/tapKeySig.cjs
  var require_tapKeySig = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/input/tapKeySig.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.InputTypes.TAP_KEY_SIG || keyVal.key.length !== 1) {
          throw new Error(
            "Decode Error: could not decode tapKeySig with key 0x" + tools.toHex(keyVal.key)
          );
        }
        if (!check(keyVal.value)) {
          throw new Error(
            "Decode Error: tapKeySig not a valid 64-65-byte BIP340 signature"
          );
        }
        return keyVal.value;
      }
      exports.decode = decode;
      function encode(value) {
        const key = Uint8Array.from([typeFields_js_1.InputTypes.TAP_KEY_SIG]);
        return { key, value };
      }
      exports.encode = encode;
      exports.expected = "Uint8Array";
      function check(data) {
        return data instanceof Uint8Array && (data.length === 64 || data.length === 65);
      }
      exports.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.tapKeySig === void 0;
      }
      exports.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/input/tapLeafScript.cjs
  var require_tapLeafScript = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/input/tapLeafScript.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.InputTypes.TAP_LEAF_SCRIPT) {
          throw new Error(
            "Decode Error: could not decode tapLeafScript with key 0x" + tools.toHex(keyVal.key)
          );
        }
        if ((keyVal.key.length - 2) % 32 !== 0) {
          throw new Error(
            "Decode Error: tapLeafScript has invalid control block in key 0x" + tools.toHex(keyVal.key)
          );
        }
        const leafVersion = keyVal.value[keyVal.value.length - 1];
        if ((keyVal.key[1] & 254) !== leafVersion) {
          throw new Error(
            "Decode Error: tapLeafScript bad leaf version in key 0x" + tools.toHex(keyVal.key)
          );
        }
        const script = keyVal.value.slice(0, -1);
        const controlBlock = keyVal.key.slice(1);
        return { controlBlock, script, leafVersion };
      }
      exports.decode = decode;
      function encode(tScript) {
        const head = Uint8Array.from([typeFields_js_1.InputTypes.TAP_LEAF_SCRIPT]);
        const verBuf = Uint8Array.from([tScript.leafVersion]);
        return {
          key: tools.concat([head, tScript.controlBlock]),
          value: tools.concat([tScript.script, verBuf])
        };
      }
      exports.encode = encode;
      exports.expected = "{ controlBlock: Uint8Array; leafVersion: number, script: Uint8Array; }";
      function check(data) {
        return data.controlBlock instanceof Uint8Array && (data.controlBlock.length - 1) % 32 === 0 && (data.controlBlock[0] & 254) === data.leafVersion && data.script instanceof Uint8Array;
      }
      exports.check = check;
      function canAddToArray(array, item, dupeSet) {
        const dupeString = tools.toHex(item.controlBlock);
        if (dupeSet.has(dupeString)) return false;
        dupeSet.add(dupeString);
        return array.filter((v) => tools.compare(v.controlBlock, item.controlBlock) === 0).length === 0;
      }
      exports.canAddToArray = canAddToArray;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/input/tapMerkleRoot.cjs
  var require_tapMerkleRoot = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/input/tapMerkleRoot.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.InputTypes.TAP_MERKLE_ROOT || keyVal.key.length !== 1) {
          throw new Error(
            "Decode Error: could not decode tapMerkleRoot with key 0x" + tools.toHex(keyVal.key)
          );
        }
        if (!check(keyVal.value)) {
          throw new Error("Decode Error: tapMerkleRoot not a 32-byte hash");
        }
        return keyVal.value;
      }
      exports.decode = decode;
      function encode(value) {
        const key = Uint8Array.from([typeFields_js_1.InputTypes.TAP_MERKLE_ROOT]);
        return { key, value };
      }
      exports.encode = encode;
      exports.expected = "Uint8Array";
      function check(data) {
        return data instanceof Uint8Array && data.length === 32;
      }
      exports.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.tapMerkleRoot === void 0;
      }
      exports.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/input/tapScriptSig.cjs
  var require_tapScriptSig = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/input/tapScriptSig.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.InputTypes.TAP_SCRIPT_SIG) {
          throw new Error(
            "Decode Error: could not decode tapScriptSig with key 0x" + tools.toHex(keyVal.key)
          );
        }
        if (keyVal.key.length !== 65) {
          throw new Error(
            "Decode Error: tapScriptSig has invalid key 0x" + tools.toHex(keyVal.key)
          );
        }
        if (keyVal.value.length !== 64 && keyVal.value.length !== 65) {
          throw new Error(
            "Decode Error: tapScriptSig has invalid signature in key 0x" + tools.toHex(keyVal.key)
          );
        }
        const pubkey = keyVal.key.slice(1, 33);
        const leafHash = keyVal.key.slice(33);
        return {
          pubkey,
          leafHash,
          signature: keyVal.value
        };
      }
      exports.decode = decode;
      function encode(tSig) {
        const head = Uint8Array.from([typeFields_js_1.InputTypes.TAP_SCRIPT_SIG]);
        return {
          key: tools.concat([head, tSig.pubkey, tSig.leafHash]),
          value: tSig.signature
        };
      }
      exports.encode = encode;
      exports.expected = "{ pubkey: Uint8Array; leafHash: Uint8Array; signature: Uint8Array; }";
      function check(data) {
        return data.pubkey instanceof Uint8Array && data.leafHash instanceof Uint8Array && data.signature instanceof Uint8Array && data.pubkey.length === 32 && data.leafHash.length === 32 && (data.signature.length === 64 || data.signature.length === 65);
      }
      exports.check = check;
      function canAddToArray(array, item, dupeSet) {
        const dupeString = tools.toHex(item.pubkey) + tools.toHex(item.leafHash);
        if (dupeSet.has(dupeString)) return false;
        dupeSet.add(dupeString);
        return array.filter(
          (v) => tools.compare(v.pubkey, item.pubkey) === 0 && tools.compare(v.leafHash, item.leafHash) === 0
        ).length === 0;
      }
      exports.canAddToArray = canAddToArray;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/input/witnessUtxo.cjs
  var require_witnessUtxo = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/input/witnessUtxo.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      var varuint = __importStar(require_cjs4());
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.InputTypes.WITNESS_UTXO) {
          throw new Error(
            "Decode Error: could not decode witnessUtxo with key 0x" + tools.toHex(keyVal.key)
          );
        }
        const value = tools.readInt64(keyVal.value, 0, "LE");
        let _offset = 8;
        const { numberValue: scriptLen, bytes } = varuint.decode(
          keyVal.value,
          _offset
        );
        _offset += bytes;
        const script = keyVal.value.slice(_offset);
        if (script.length !== scriptLen) {
          throw new Error("Decode Error: WITNESS_UTXO script is not proper length");
        }
        return {
          script,
          value
        };
      }
      exports.decode = decode;
      function encode(data) {
        const { script, value } = data;
        const varuintlen = varuint.encodingLength(script.length);
        const result = new Uint8Array(8 + varuintlen + script.length);
        tools.writeInt64(result, 0, BigInt(value), "LE");
        varuint.encode(script.length, result, 8);
        result.set(script, 8 + varuintlen);
        return {
          key: Uint8Array.from([typeFields_js_1.InputTypes.WITNESS_UTXO]),
          value: result
        };
      }
      exports.encode = encode;
      exports.expected = "{ script: Uint8Array; value: bigint; }";
      function check(data) {
        return data.script instanceof Uint8Array && typeof data.value === "bigint";
      }
      exports.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.witnessUtxo === void 0;
      }
      exports.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/output/tapTree.cjs
  var require_tapTree = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/output/tapTree.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var varuint = __importStar(require_cjs4());
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function decode(keyVal) {
        if (keyVal.key[0] !== typeFields_js_1.OutputTypes.TAP_TREE || keyVal.key.length !== 1) {
          throw new Error(
            "Decode Error: could not decode tapTree with key 0x" + tools.toHex(keyVal.key)
          );
        }
        let _offset = 0;
        const data = [];
        while (_offset < keyVal.value.length) {
          const depth = keyVal.value[_offset++];
          const leafVersion = keyVal.value[_offset++];
          const { numberValue: scriptLen, bytes } = varuint.decode(
            keyVal.value,
            _offset
          );
          _offset += bytes;
          data.push({
            depth,
            leafVersion,
            script: keyVal.value.slice(_offset, _offset + scriptLen)
          });
          _offset += scriptLen;
        }
        return { leaves: data };
      }
      exports.decode = decode;
      function encode(tree) {
        const key = Uint8Array.from([typeFields_js_1.OutputTypes.TAP_TREE]);
        const bufs = [].concat(
          ...tree.leaves.map((tapLeaf) => [
            Uint8Array.of(tapLeaf.depth, tapLeaf.leafVersion),
            varuint.encode(BigInt(tapLeaf.script.length)).buffer,
            tapLeaf.script
          ])
        );
        return {
          key,
          value: tools.concat(bufs)
        };
      }
      exports.encode = encode;
      exports.expected = "{ leaves: [{ depth: number; leafVersion: number, script: Uint8Array; }] }";
      function check(data) {
        return Array.isArray(data.leaves) && data.leaves.every(
          (tapLeaf) => tapLeaf.depth >= 0 && tapLeaf.depth <= 128 && (tapLeaf.leafVersion & 254) === tapLeaf.leafVersion && tapLeaf.script instanceof Uint8Array
        );
      }
      exports.check = check;
      function canAdd(currentData, newData) {
        return !!currentData && !!newData && currentData.tapTree === void 0;
      }
      exports.canAdd = canAdd;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/shared/bip32Derivation.cjs
  var require_bip32Derivation = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/shared/bip32Derivation.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      var range = (n) => [...Array(n).keys()];
      var isValidDERKey = (pubkey) => pubkey.length === 33 && [2, 3].includes(pubkey[0]) || pubkey.length === 65 && 4 === pubkey[0];
      function makeConverter(TYPE_BYTE, isValidPubkey = isValidDERKey) {
        function decode(keyVal) {
          if (keyVal.key[0] !== TYPE_BYTE) {
            throw new Error(
              "Decode Error: could not decode bip32Derivation with key 0x" + tools.toHex(keyVal.key)
            );
          }
          const pubkey = keyVal.key.slice(1);
          if (!isValidPubkey(pubkey)) {
            throw new Error(
              "Decode Error: bip32Derivation has invalid pubkey in key 0x" + tools.toHex(keyVal.key)
            );
          }
          if (keyVal.value.length / 4 % 1 !== 0) {
            throw new Error(
              "Decode Error: Input BIP32_DERIVATION value length should be multiple of 4"
            );
          }
          const data = {
            masterFingerprint: keyVal.value.slice(0, 4),
            pubkey,
            path: "m"
          };
          for (const i of range(keyVal.value.length / 4 - 1)) {
            const val = tools.readUInt32(keyVal.value, i * 4 + 4, "LE");
            const isHard = !!(val & 2147483648);
            const idx = val & 2147483647;
            data.path += "/" + idx.toString(10) + (isHard ? "'" : "");
          }
          return data;
        }
        function encode(data) {
          const head = Uint8Array.from([TYPE_BYTE]);
          const key = tools.concat([head, data.pubkey]);
          const splitPath = data.path.split("/");
          const value = new Uint8Array(splitPath.length * 4);
          value.set(data.masterFingerprint, 0);
          let offset = 4;
          splitPath.slice(1).forEach((level) => {
            const isHard = level.slice(-1) === "'";
            let num = 2147483647 & parseInt(isHard ? level.slice(0, -1) : level, 10);
            if (isHard) num += 2147483648;
            tools.writeUInt32(value, offset, num, "LE");
            offset += 4;
          });
          return {
            key,
            value
          };
        }
        const expected = "{ masterFingerprint: Uint8Array; pubkey: Uint8Array; path: string; }";
        function check(data) {
          return data.pubkey instanceof Uint8Array && data.masterFingerprint instanceof Uint8Array && typeof data.path === "string" && isValidPubkey(data.pubkey) && data.masterFingerprint.length === 4;
        }
        function canAddToArray(array, item, dupeSet) {
          const dupeString = tools.toHex(item.pubkey);
          if (dupeSet.has(dupeString)) return false;
          dupeSet.add(dupeString);
          return array.filter((v) => tools.compare(v.pubkey, item.pubkey) === 0).length === 0;
        }
        return {
          decode,
          encode,
          check,
          expected,
          canAddToArray
        };
      }
      exports.makeConverter = makeConverter;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/shared/checkPubkey.cjs
  var require_checkPubkey = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/shared/checkPubkey.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function makeChecker(pubkeyTypes) {
        return checkPubkey;
        function checkPubkey(keyVal) {
          let pubkey;
          if (pubkeyTypes.includes(keyVal.key[0])) {
            pubkey = keyVal.key.slice(1);
            if (!(pubkey.length === 33 || pubkey.length === 65) || ![2, 3, 4].includes(pubkey[0])) {
              throw new Error(
                "Format Error: invalid pubkey in key 0x" + tools.toHex(keyVal.key)
              );
            }
          }
          return pubkey;
        }
      }
      exports.makeChecker = makeChecker;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/shared/redeemScript.cjs
  var require_redeemScript = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/shared/redeemScript.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function makeConverter(TYPE_BYTE) {
        function decode(keyVal) {
          if (keyVal.key[0] !== TYPE_BYTE) {
            throw new Error(
              "Decode Error: could not decode redeemScript with key 0x" + tools.toHex(keyVal.key)
            );
          }
          return keyVal.value;
        }
        function encode(data) {
          const key = Uint8Array.from([TYPE_BYTE]);
          return {
            key,
            value: data
          };
        }
        const expected = "Uint8Array";
        function check(data) {
          return data instanceof Uint8Array;
        }
        function canAdd(currentData, newData) {
          return !!currentData && !!newData && currentData.redeemScript === void 0;
        }
        return {
          decode,
          encode,
          check,
          expected,
          canAdd
        };
      }
      exports.makeConverter = makeConverter;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/shared/tapBip32Derivation.cjs
  var require_tapBip32Derivation = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/shared/tapBip32Derivation.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var varuint = __importStar(require_cjs4());
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      var bip32Derivation = __importStar(require_bip32Derivation());
      var isValidBIP340Key = (pubkey) => pubkey.length === 32;
      function makeConverter(TYPE_BYTE) {
        const parent = bip32Derivation.makeConverter(TYPE_BYTE, isValidBIP340Key);
        function decode(keyVal) {
          const { numberValue: nHashes, bytes: nHashesLen } = varuint.decode(
            keyVal.value
          );
          const base = parent.decode({
            key: keyVal.key,
            value: keyVal.value.slice(nHashesLen + Number(nHashes) * 32)
          });
          const leafHashes = new Array(Number(nHashes));
          for (let i = 0, _offset = nHashesLen; i < nHashes; i++, _offset += 32) {
            leafHashes[i] = keyVal.value.slice(_offset, _offset + 32);
          }
          return { ...base, leafHashes };
        }
        function encode(data) {
          const base = parent.encode(data);
          const nHashesLen = varuint.encodingLength(data.leafHashes.length);
          const nHashesBuf = new Uint8Array(nHashesLen);
          varuint.encode(data.leafHashes.length, nHashesBuf);
          const value = tools.concat([nHashesBuf, ...data.leafHashes, base.value]);
          return { ...base, value };
        }
        const expected = "{ masterFingerprint: Uint8Array; pubkey: Uint8Array; path: string; leafHashes: Uint8Array[]; }";
        function check(data) {
          return Array.isArray(data.leafHashes) && data.leafHashes.every(
            (leafHash) => leafHash instanceof Uint8Array && leafHash.length === 32
          ) && parent.check(data);
        }
        return {
          decode,
          encode,
          check,
          expected,
          canAddToArray: parent.canAddToArray
        };
      }
      exports.makeConverter = makeConverter;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/shared/tapInternalKey.cjs
  var require_tapInternalKey = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/shared/tapInternalKey.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function makeConverter(TYPE_BYTE) {
        function decode(keyVal) {
          if (keyVal.key[0] !== TYPE_BYTE || keyVal.key.length !== 1) {
            throw new Error(
              "Decode Error: could not decode tapInternalKey with key 0x" + tools.toHex(keyVal.key)
            );
          }
          if (keyVal.value.length !== 32) {
            throw new Error(
              "Decode Error: tapInternalKey not a 32-byte x-only pubkey"
            );
          }
          return keyVal.value;
        }
        function encode(value) {
          const key = Uint8Array.from([TYPE_BYTE]);
          return { key, value };
        }
        const expected = "Uint8Array";
        function check(data) {
          return data instanceof Uint8Array && data.length === 32;
        }
        function canAdd(currentData, newData) {
          return !!currentData && !!newData && currentData.tapInternalKey === void 0;
        }
        return {
          decode,
          encode,
          check,
          expected,
          canAdd
        };
      }
      exports.makeConverter = makeConverter;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/shared/witnessScript.cjs
  var require_witnessScript = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/shared/witnessScript.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function makeConverter(TYPE_BYTE) {
        function decode(keyVal) {
          if (keyVal.key[0] !== TYPE_BYTE) {
            throw new Error(
              "Decode Error: could not decode witnessScript with key 0x" + tools.toHex(keyVal.key)
            );
          }
          return keyVal.value;
        }
        function encode(data) {
          const key = Uint8Array.from([TYPE_BYTE]);
          return {
            key,
            value: data
          };
        }
        const expected = "Uint8Array";
        function check(data) {
          return data instanceof Uint8Array;
        }
        function canAdd(currentData, newData) {
          return !!currentData && !!newData && currentData.witnessScript === void 0;
        }
        return {
          decode,
          encode,
          check,
          expected,
          canAdd
        };
      }
      exports.makeConverter = makeConverter;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/index.cjs
  var require_converter = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/index.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var typeFields_js_1 = require_typeFields();
      var globalXpub = __importStar(require_globalXpub());
      var unsignedTx = __importStar(require_unsignedTx());
      var finalScriptSig = __importStar(require_finalScriptSig());
      var finalScriptWitness = __importStar(
        require_finalScriptWitness()
      );
      var nonWitnessUtxo = __importStar(require_nonWitnessUtxo());
      var partialSig = __importStar(require_partialSig());
      var porCommitment = __importStar(require_porCommitment());
      var sighashType = __importStar(require_sighashType());
      var tapKeySig = __importStar(require_tapKeySig());
      var tapLeafScript = __importStar(require_tapLeafScript());
      var tapMerkleRoot = __importStar(require_tapMerkleRoot());
      var tapScriptSig = __importStar(require_tapScriptSig());
      var witnessUtxo = __importStar(require_witnessUtxo());
      var tapTree = __importStar(require_tapTree());
      var bip32Derivation = __importStar(require_bip32Derivation());
      var checkPubkey = __importStar(require_checkPubkey());
      var redeemScript = __importStar(require_redeemScript());
      var tapBip32Derivation = __importStar(
        require_tapBip32Derivation()
      );
      var tapInternalKey = __importStar(require_tapInternalKey());
      var witnessScript = __importStar(require_witnessScript());
      var globals = {
        unsignedTx,
        globalXpub,
        // pass an Array of key bytes that require pubkey beside the key
        checkPubkey: checkPubkey.makeChecker([])
      };
      exports.globals = globals;
      var inputs = {
        nonWitnessUtxo,
        partialSig,
        sighashType,
        finalScriptSig,
        finalScriptWitness,
        porCommitment,
        witnessUtxo,
        bip32Derivation: bip32Derivation.makeConverter(
          typeFields_js_1.InputTypes.BIP32_DERIVATION
        ),
        redeemScript: redeemScript.makeConverter(
          typeFields_js_1.InputTypes.REDEEM_SCRIPT
        ),
        witnessScript: witnessScript.makeConverter(
          typeFields_js_1.InputTypes.WITNESS_SCRIPT
        ),
        checkPubkey: checkPubkey.makeChecker([
          typeFields_js_1.InputTypes.PARTIAL_SIG,
          typeFields_js_1.InputTypes.BIP32_DERIVATION
        ]),
        tapKeySig,
        tapScriptSig,
        tapLeafScript,
        tapBip32Derivation: tapBip32Derivation.makeConverter(
          typeFields_js_1.InputTypes.TAP_BIP32_DERIVATION
        ),
        tapInternalKey: tapInternalKey.makeConverter(
          typeFields_js_1.InputTypes.TAP_INTERNAL_KEY
        ),
        tapMerkleRoot
      };
      exports.inputs = inputs;
      var outputs = {
        bip32Derivation: bip32Derivation.makeConverter(
          typeFields_js_1.OutputTypes.BIP32_DERIVATION
        ),
        redeemScript: redeemScript.makeConverter(
          typeFields_js_1.OutputTypes.REDEEM_SCRIPT
        ),
        witnessScript: witnessScript.makeConverter(
          typeFields_js_1.OutputTypes.WITNESS_SCRIPT
        ),
        checkPubkey: checkPubkey.makeChecker([
          typeFields_js_1.OutputTypes.BIP32_DERIVATION
        ]),
        tapBip32Derivation: tapBip32Derivation.makeConverter(
          typeFields_js_1.OutputTypes.TAP_BIP32_DERIVATION
        ),
        tapTree,
        tapInternalKey: tapInternalKey.makeConverter(
          typeFields_js_1.OutputTypes.TAP_INTERNAL_KEY
        )
      };
      exports.outputs = outputs;
    }
  });

  // node_modules/bip174/src/cjs/lib/converter/tools.cjs
  var require_tools = __commonJS({
    "node_modules/bip174/src/cjs/lib/converter/tools.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var varuint = __importStar(require_cjs4());
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      exports.range = (n) => [...Array(n).keys()];
      function reverseBuffer(buffer) {
        if (buffer.length < 1) return buffer;
        let j = buffer.length - 1;
        let tmp = 0;
        for (let i = 0; i < buffer.length / 2; i++) {
          tmp = buffer[i];
          buffer[i] = buffer[j];
          buffer[j] = tmp;
          j--;
        }
        return buffer;
      }
      exports.reverseBuffer = reverseBuffer;
      function keyValsToBuffer(keyVals) {
        const buffers = keyVals.map(keyValToBuffer);
        buffers.push(Uint8Array.from([0]));
        return tools.concat(buffers);
      }
      exports.keyValsToBuffer = keyValsToBuffer;
      function keyValToBuffer(keyVal) {
        const keyLen = keyVal.key.length;
        const valLen = keyVal.value.length;
        const keyVarIntLen = varuint.encodingLength(keyLen);
        const valVarIntLen = varuint.encodingLength(valLen);
        const buffer = new Uint8Array(keyVarIntLen + keyLen + valVarIntLen + valLen);
        varuint.encode(keyLen, buffer, 0);
        buffer.set(keyVal.key, keyVarIntLen);
        varuint.encode(valLen, buffer, keyVarIntLen + keyLen);
        buffer.set(keyVal.value, keyVarIntLen + keyLen + valVarIntLen);
        return buffer;
      }
      exports.keyValToBuffer = keyValToBuffer;
    }
  });

  // node_modules/bip174/src/cjs/lib/parser/fromBuffer.cjs
  var require_fromBuffer = __commonJS({
    "node_modules/bip174/src/cjs/lib/parser/fromBuffer.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var convert = __importStar(require_converter());
      var tools_js_1 = require_tools();
      var varuint = __importStar(require_cjs4());
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      var typeFields_js_1 = require_typeFields();
      function psbtFromBuffer(buffer, txGetter) {
        let offset = 0;
        function varSlice() {
          const { numberValue: keyLen, bytes } = varuint.decode(buffer, offset);
          offset += bytes;
          const key = buffer.slice(offset, offset + Number(keyLen));
          offset += Number(keyLen);
          return key;
        }
        function readUInt32BE() {
          const num = tools.readUInt32(buffer, offset, "BE");
          offset += 4;
          return num;
        }
        function readUInt84() {
          const num = tools.readUInt8(buffer, offset);
          offset += 1;
          return num;
        }
        function getKeyValue() {
          const key = varSlice();
          const value = varSlice();
          return {
            key,
            value
          };
        }
        function checkEndOfKeyValPairs() {
          if (offset >= buffer.length) {
            throw new Error("Format Error: Unexpected End of PSBT");
          }
          const isEnd = tools.readUInt8(buffer, offset) === 0;
          if (isEnd) {
            offset++;
          }
          return isEnd;
        }
        if (readUInt32BE() !== 1886610036) {
          throw new Error("Format Error: Invalid Magic Number");
        }
        if (readUInt84() !== 255) {
          throw new Error(
            "Format Error: Magic Number must be followed by 0xff separator"
          );
        }
        const globalMapKeyVals = [];
        const globalKeyIndex = {};
        while (!checkEndOfKeyValPairs()) {
          const keyVal = getKeyValue();
          const hexKey = tools.toHex(keyVal.key);
          if (globalKeyIndex[hexKey]) {
            throw new Error(
              "Format Error: Keys must be unique for global keymap: key " + hexKey
            );
          }
          globalKeyIndex[hexKey] = 1;
          globalMapKeyVals.push(keyVal);
        }
        const unsignedTxMaps = globalMapKeyVals.filter(
          (keyVal) => keyVal.key[0] === typeFields_js_1.GlobalTypes.UNSIGNED_TX
        );
        if (unsignedTxMaps.length !== 1) {
          throw new Error("Format Error: Only one UNSIGNED_TX allowed");
        }
        const unsignedTx = txGetter(unsignedTxMaps[0].value);
        const { inputCount, outputCount } = unsignedTx.getInputOutputCounts();
        const inputKeyVals = [];
        const outputKeyVals = [];
        for (const index of tools_js_1.range(inputCount)) {
          const inputKeyIndex = {};
          const input = [];
          while (!checkEndOfKeyValPairs()) {
            const keyVal = getKeyValue();
            const hexKey = tools.toHex(keyVal.key);
            if (inputKeyIndex[hexKey]) {
              throw new Error(
                "Format Error: Keys must be unique for each input: input index " + index + " key " + hexKey
              );
            }
            inputKeyIndex[hexKey] = 1;
            input.push(keyVal);
          }
          inputKeyVals.push(input);
        }
        for (const index of tools_js_1.range(outputCount)) {
          const outputKeyIndex = {};
          const output = [];
          while (!checkEndOfKeyValPairs()) {
            const keyVal = getKeyValue();
            const hexKey = tools.toHex(keyVal.key);
            if (outputKeyIndex[hexKey]) {
              throw new Error(
                "Format Error: Keys must be unique for each output: output index " + index + " key " + hexKey
              );
            }
            outputKeyIndex[hexKey] = 1;
            output.push(keyVal);
          }
          outputKeyVals.push(output);
        }
        return psbtFromKeyVals(unsignedTx, {
          globalMapKeyVals,
          inputKeyVals,
          outputKeyVals
        });
      }
      exports.psbtFromBuffer = psbtFromBuffer;
      function checkKeyBuffer(type, keyBuf, keyNum) {
        if (tools.compare(keyBuf, Uint8Array.from([keyNum]))) {
          throw new Error(
            // `Format Error: Invalid ${type} key: ${keyBuf.toString('hex')}`,
            `Format Error: Invalid ${type} key: ${tools.toHex(keyBuf)}`
          );
        }
      }
      exports.checkKeyBuffer = checkKeyBuffer;
      function psbtFromKeyVals(unsignedTx, { globalMapKeyVals, inputKeyVals, outputKeyVals }) {
        const globalMap = {
          unsignedTx
        };
        let txCount = 0;
        for (const keyVal of globalMapKeyVals) {
          switch (keyVal.key[0]) {
            case typeFields_js_1.GlobalTypes.UNSIGNED_TX:
              checkKeyBuffer(
                "global",
                keyVal.key,
                typeFields_js_1.GlobalTypes.UNSIGNED_TX
              );
              if (txCount > 0) {
                throw new Error("Format Error: GlobalMap has multiple UNSIGNED_TX");
              }
              txCount++;
              break;
            case typeFields_js_1.GlobalTypes.GLOBAL_XPUB:
              if (globalMap.globalXpub === void 0) {
                globalMap.globalXpub = [];
              }
              globalMap.globalXpub.push(convert.globals.globalXpub.decode(keyVal));
              break;
            default:
              if (!globalMap.unknownKeyVals) globalMap.unknownKeyVals = [];
              globalMap.unknownKeyVals.push(keyVal);
          }
        }
        const inputCount = inputKeyVals.length;
        const outputCount = outputKeyVals.length;
        const inputs = [];
        const outputs = [];
        for (const index of tools_js_1.range(inputCount)) {
          const input = {};
          for (const keyVal of inputKeyVals[index]) {
            convert.inputs.checkPubkey(keyVal);
            switch (keyVal.key[0]) {
              case typeFields_js_1.InputTypes.NON_WITNESS_UTXO:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_js_1.InputTypes.NON_WITNESS_UTXO
                );
                if (input.nonWitnessUtxo !== void 0) {
                  throw new Error(
                    "Format Error: Input has multiple NON_WITNESS_UTXO"
                  );
                }
                input.nonWitnessUtxo = convert.inputs.nonWitnessUtxo.decode(keyVal);
                break;
              case typeFields_js_1.InputTypes.WITNESS_UTXO:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_js_1.InputTypes.WITNESS_UTXO
                );
                if (input.witnessUtxo !== void 0) {
                  throw new Error("Format Error: Input has multiple WITNESS_UTXO");
                }
                input.witnessUtxo = convert.inputs.witnessUtxo.decode(keyVal);
                break;
              case typeFields_js_1.InputTypes.PARTIAL_SIG:
                if (input.partialSig === void 0) {
                  input.partialSig = [];
                }
                input.partialSig.push(convert.inputs.partialSig.decode(keyVal));
                break;
              case typeFields_js_1.InputTypes.SIGHASH_TYPE:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_js_1.InputTypes.SIGHASH_TYPE
                );
                if (input.sighashType !== void 0) {
                  throw new Error("Format Error: Input has multiple SIGHASH_TYPE");
                }
                input.sighashType = convert.inputs.sighashType.decode(keyVal);
                break;
              case typeFields_js_1.InputTypes.REDEEM_SCRIPT:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_js_1.InputTypes.REDEEM_SCRIPT
                );
                if (input.redeemScript !== void 0) {
                  throw new Error("Format Error: Input has multiple REDEEM_SCRIPT");
                }
                input.redeemScript = convert.inputs.redeemScript.decode(keyVal);
                break;
              case typeFields_js_1.InputTypes.WITNESS_SCRIPT:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_js_1.InputTypes.WITNESS_SCRIPT
                );
                if (input.witnessScript !== void 0) {
                  throw new Error("Format Error: Input has multiple WITNESS_SCRIPT");
                }
                input.witnessScript = convert.inputs.witnessScript.decode(keyVal);
                break;
              case typeFields_js_1.InputTypes.BIP32_DERIVATION:
                if (input.bip32Derivation === void 0) {
                  input.bip32Derivation = [];
                }
                input.bip32Derivation.push(
                  convert.inputs.bip32Derivation.decode(keyVal)
                );
                break;
              case typeFields_js_1.InputTypes.FINAL_SCRIPTSIG:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_js_1.InputTypes.FINAL_SCRIPTSIG
                );
                input.finalScriptSig = convert.inputs.finalScriptSig.decode(keyVal);
                break;
              case typeFields_js_1.InputTypes.FINAL_SCRIPTWITNESS:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_js_1.InputTypes.FINAL_SCRIPTWITNESS
                );
                input.finalScriptWitness = convert.inputs.finalScriptWitness.decode(
                  keyVal
                );
                break;
              case typeFields_js_1.InputTypes.POR_COMMITMENT:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_js_1.InputTypes.POR_COMMITMENT
                );
                input.porCommitment = convert.inputs.porCommitment.decode(keyVal);
                break;
              case typeFields_js_1.InputTypes.TAP_KEY_SIG:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_js_1.InputTypes.TAP_KEY_SIG
                );
                input.tapKeySig = convert.inputs.tapKeySig.decode(keyVal);
                break;
              case typeFields_js_1.InputTypes.TAP_SCRIPT_SIG:
                if (input.tapScriptSig === void 0) {
                  input.tapScriptSig = [];
                }
                input.tapScriptSig.push(convert.inputs.tapScriptSig.decode(keyVal));
                break;
              case typeFields_js_1.InputTypes.TAP_LEAF_SCRIPT:
                if (input.tapLeafScript === void 0) {
                  input.tapLeafScript = [];
                }
                input.tapLeafScript.push(convert.inputs.tapLeafScript.decode(keyVal));
                break;
              case typeFields_js_1.InputTypes.TAP_BIP32_DERIVATION:
                if (input.tapBip32Derivation === void 0) {
                  input.tapBip32Derivation = [];
                }
                input.tapBip32Derivation.push(
                  convert.inputs.tapBip32Derivation.decode(keyVal)
                );
                break;
              case typeFields_js_1.InputTypes.TAP_INTERNAL_KEY:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_js_1.InputTypes.TAP_INTERNAL_KEY
                );
                input.tapInternalKey = convert.inputs.tapInternalKey.decode(keyVal);
                break;
              case typeFields_js_1.InputTypes.TAP_MERKLE_ROOT:
                checkKeyBuffer(
                  "input",
                  keyVal.key,
                  typeFields_js_1.InputTypes.TAP_MERKLE_ROOT
                );
                input.tapMerkleRoot = convert.inputs.tapMerkleRoot.decode(keyVal);
                break;
              default:
                if (!input.unknownKeyVals) input.unknownKeyVals = [];
                input.unknownKeyVals.push(keyVal);
            }
          }
          inputs.push(input);
        }
        for (const index of tools_js_1.range(outputCount)) {
          const output = {};
          for (const keyVal of outputKeyVals[index]) {
            convert.outputs.checkPubkey(keyVal);
            switch (keyVal.key[0]) {
              case typeFields_js_1.OutputTypes.REDEEM_SCRIPT:
                checkKeyBuffer(
                  "output",
                  keyVal.key,
                  typeFields_js_1.OutputTypes.REDEEM_SCRIPT
                );
                if (output.redeemScript !== void 0) {
                  throw new Error("Format Error: Output has multiple REDEEM_SCRIPT");
                }
                output.redeemScript = convert.outputs.redeemScript.decode(keyVal);
                break;
              case typeFields_js_1.OutputTypes.WITNESS_SCRIPT:
                checkKeyBuffer(
                  "output",
                  keyVal.key,
                  typeFields_js_1.OutputTypes.WITNESS_SCRIPT
                );
                if (output.witnessScript !== void 0) {
                  throw new Error("Format Error: Output has multiple WITNESS_SCRIPT");
                }
                output.witnessScript = convert.outputs.witnessScript.decode(keyVal);
                break;
              case typeFields_js_1.OutputTypes.BIP32_DERIVATION:
                if (output.bip32Derivation === void 0) {
                  output.bip32Derivation = [];
                }
                output.bip32Derivation.push(
                  convert.outputs.bip32Derivation.decode(keyVal)
                );
                break;
              case typeFields_js_1.OutputTypes.TAP_INTERNAL_KEY:
                checkKeyBuffer(
                  "output",
                  keyVal.key,
                  typeFields_js_1.OutputTypes.TAP_INTERNAL_KEY
                );
                output.tapInternalKey = convert.outputs.tapInternalKey.decode(keyVal);
                break;
              case typeFields_js_1.OutputTypes.TAP_TREE:
                checkKeyBuffer(
                  "output",
                  keyVal.key,
                  typeFields_js_1.OutputTypes.TAP_TREE
                );
                output.tapTree = convert.outputs.tapTree.decode(keyVal);
                break;
              case typeFields_js_1.OutputTypes.TAP_BIP32_DERIVATION:
                if (output.tapBip32Derivation === void 0) {
                  output.tapBip32Derivation = [];
                }
                output.tapBip32Derivation.push(
                  convert.outputs.tapBip32Derivation.decode(keyVal)
                );
                break;
              default:
                if (!output.unknownKeyVals) output.unknownKeyVals = [];
                output.unknownKeyVals.push(keyVal);
            }
          }
          outputs.push(output);
        }
        return { globalMap, inputs, outputs };
      }
      exports.psbtFromKeyVals = psbtFromKeyVals;
    }
  });

  // node_modules/bip174/src/cjs/lib/parser/toBuffer.cjs
  var require_toBuffer = __commonJS({
    "node_modules/bip174/src/cjs/lib/parser/toBuffer.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var convert = __importStar(require_converter());
      var tools_js_1 = require_tools();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function psbtToBuffer({ globalMap, inputs, outputs }) {
        const { globalKeyVals, inputKeyVals, outputKeyVals } = psbtToKeyVals({
          globalMap,
          inputs,
          outputs
        });
        const globalBuffer = tools_js_1.keyValsToBuffer(globalKeyVals);
        const keyValsOrEmptyToBuffer = (keyVals) => keyVals.length === 0 ? [Uint8Array.from([0])] : keyVals.map(tools_js_1.keyValsToBuffer);
        const inputBuffers = keyValsOrEmptyToBuffer(inputKeyVals);
        const outputBuffers = keyValsOrEmptyToBuffer(outputKeyVals);
        const header = new Uint8Array(5);
        header.set([112, 115, 98, 116, 255], 0);
        return tools.concat(
          [header, globalBuffer].concat(inputBuffers, outputBuffers)
        );
      }
      exports.psbtToBuffer = psbtToBuffer;
      var sortKeyVals = (a, b) => {
        return tools.compare(a.key, b.key);
      };
      function keyValsFromMap(keyValMap, converterFactory) {
        const keyHexSet = /* @__PURE__ */ new Set();
        const keyVals = Object.entries(keyValMap).reduce((result, [key, value]) => {
          if (key === "unknownKeyVals") return result;
          const converter = converterFactory[key];
          if (converter === void 0) return result;
          const encodedKeyVals = (Array.isArray(value) ? value : [value]).map(
            converter.encode
          );
          const keyHexes = encodedKeyVals.map((kv) => tools.toHex(kv.key));
          keyHexes.forEach((hex) => {
            if (keyHexSet.has(hex))
              throw new Error("Serialize Error: Duplicate key: " + hex);
            keyHexSet.add(hex);
          });
          return result.concat(encodedKeyVals);
        }, []);
        const otherKeyVals = keyValMap.unknownKeyVals ? keyValMap.unknownKeyVals.filter((keyVal) => {
          return !keyHexSet.has(tools.toHex(keyVal.key));
        }) : [];
        return keyVals.concat(otherKeyVals).sort(sortKeyVals);
      }
      function psbtToKeyVals({ globalMap, inputs, outputs }) {
        return {
          globalKeyVals: keyValsFromMap(globalMap, convert.globals),
          inputKeyVals: inputs.map((i) => keyValsFromMap(i, convert.inputs)),
          outputKeyVals: outputs.map((o) => keyValsFromMap(o, convert.outputs))
        };
      }
      exports.psbtToKeyVals = psbtToKeyVals;
    }
  });

  // node_modules/bip174/src/cjs/lib/parser/index.cjs
  var require_parser = __commonJS({
    "node_modules/bip174/src/cjs/lib/parser/index.cjs"(exports) {
      "use strict";
      function __export2(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
      }
      Object.defineProperty(exports, "__esModule", { value: true });
      __export2(require_fromBuffer());
      __export2(require_toBuffer());
    }
  });

  // node_modules/bip174/src/cjs/lib/combiner/index.cjs
  var require_combiner = __commonJS({
    "node_modules/bip174/src/cjs/lib/combiner/index.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var index_js_1 = require_parser();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function combine(psbts) {
        const self2 = psbts[0];
        const selfKeyVals = index_js_1.psbtToKeyVals(self2);
        const others = psbts.slice(1);
        if (others.length === 0) throw new Error("Combine: Nothing to combine");
        const selfTx = getTx(self2);
        if (selfTx === void 0) {
          throw new Error("Combine: Self missing transaction");
        }
        const selfGlobalSet = getKeySet(selfKeyVals.globalKeyVals);
        const selfInputSets = selfKeyVals.inputKeyVals.map(getKeySet);
        const selfOutputSets = selfKeyVals.outputKeyVals.map(getKeySet);
        for (const other of others) {
          const otherTx = getTx(other);
          if (otherTx === void 0 || tools.compare(otherTx.toBuffer(), selfTx.toBuffer()) !== 0) {
            throw new Error(
              "Combine: One of the Psbts does not have the same transaction."
            );
          }
          const otherKeyVals = index_js_1.psbtToKeyVals(other);
          const otherGlobalSet = getKeySet(otherKeyVals.globalKeyVals);
          otherGlobalSet.forEach(
            keyPusher(
              selfGlobalSet,
              selfKeyVals.globalKeyVals,
              otherKeyVals.globalKeyVals
            )
          );
          const otherInputSets = otherKeyVals.inputKeyVals.map(getKeySet);
          otherInputSets.forEach(
            (inputSet, idx) => inputSet.forEach(
              keyPusher(
                selfInputSets[idx],
                selfKeyVals.inputKeyVals[idx],
                otherKeyVals.inputKeyVals[idx]
              )
            )
          );
          const otherOutputSets = otherKeyVals.outputKeyVals.map(getKeySet);
          otherOutputSets.forEach(
            (outputSet, idx) => outputSet.forEach(
              keyPusher(
                selfOutputSets[idx],
                selfKeyVals.outputKeyVals[idx],
                otherKeyVals.outputKeyVals[idx]
              )
            )
          );
        }
        return index_js_1.psbtFromKeyVals(selfTx, {
          globalMapKeyVals: selfKeyVals.globalKeyVals,
          inputKeyVals: selfKeyVals.inputKeyVals,
          outputKeyVals: selfKeyVals.outputKeyVals
        });
      }
      exports.combine = combine;
      function keyPusher(selfSet, selfKeyVals, otherKeyVals) {
        return (key) => {
          if (selfSet.has(key)) return;
          const newKv = otherKeyVals.filter((kv) => tools.toHex(kv.key) === key)[0];
          selfKeyVals.push(newKv);
          selfSet.add(key);
        };
      }
      function getTx(psbt) {
        return psbt.globalMap.unsignedTx;
      }
      function getKeySet(keyVals) {
        const set = /* @__PURE__ */ new Set();
        keyVals.forEach((keyVal) => {
          const hex = tools.toHex(keyVal.key);
          if (set.has(hex))
            throw new Error("Combine: KeyValue Map keys should be unique");
          set.add(hex);
        });
        return set;
      }
    }
  });

  // node_modules/bip174/src/cjs/lib/utils.cjs
  var require_utils2 = __commonJS({
    "node_modules/bip174/src/cjs/lib/utils.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var converter = __importStar(require_converter());
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      function checkForInput(inputs, inputIndex) {
        const input = inputs[inputIndex];
        if (input === void 0) throw new Error(`No input #${inputIndex}`);
        return input;
      }
      exports.checkForInput = checkForInput;
      function checkForOutput(outputs, outputIndex) {
        const output = outputs[outputIndex];
        if (output === void 0) throw new Error(`No output #${outputIndex}`);
        return output;
      }
      exports.checkForOutput = checkForOutput;
      function checkHasKey(checkKeyVal, keyVals, enumLength) {
        if (checkKeyVal.key[0] < enumLength) {
          throw new Error(
            `Use the method for your specific key instead of addUnknownKeyVal*`
          );
        }
        if (keyVals && keyVals.filter((kv) => tools.compare(kv.key, checkKeyVal.key) === 0).length !== 0) {
          throw new Error(`Duplicate Key: ${tools.toHex(checkKeyVal.key)}`);
        }
      }
      exports.checkHasKey = checkHasKey;
      function getEnumLength(myenum) {
        let count = 0;
        Object.keys(myenum).forEach((val) => {
          if (Number(isNaN(Number(val)))) {
            count++;
          }
        });
        return count;
      }
      exports.getEnumLength = getEnumLength;
      function inputCheckUncleanFinalized(inputIndex, input) {
        let result = false;
        if (input.nonWitnessUtxo || input.witnessUtxo) {
          const needScriptSig = !!input.redeemScript;
          const needWitnessScript = !!input.witnessScript;
          const scriptSigOK = !needScriptSig || !!input.finalScriptSig;
          const witnessScriptOK = !needWitnessScript || !!input.finalScriptWitness;
          const hasOneFinal = !!input.finalScriptSig || !!input.finalScriptWitness;
          result = scriptSigOK && witnessScriptOK && hasOneFinal;
        }
        if (result === false) {
          throw new Error(
            `Input #${inputIndex} has too much or too little data to clean`
          );
        }
      }
      exports.inputCheckUncleanFinalized = inputCheckUncleanFinalized;
      function throwForUpdateMaker(typeName, name, expected, data) {
        throw new Error(
          `Data for ${typeName} key ${name} is incorrect: Expected ${expected} and got ${JSON.stringify(data)}`
        );
      }
      function updateMaker(typeName) {
        return (updateData, mainData) => {
          for (const name of Object.keys(updateData)) {
            const data = updateData[name];
            const { canAdd, canAddToArray, check, expected } = (
              // @ts-ignore
              converter[typeName + "s"][name] || {}
            );
            const isArray = !!canAddToArray;
            if (check) {
              if (isArray) {
                if (!Array.isArray(data) || // @ts-ignore
                mainData[name] && !Array.isArray(mainData[name])) {
                  throw new Error(`Key type ${name} must be an array`);
                }
                if (!data.every(check)) {
                  throwForUpdateMaker(typeName, name, expected, data);
                }
                const arr = mainData[name] || [];
                const dupeCheckSet = /* @__PURE__ */ new Set();
                if (!data.every((v) => canAddToArray(arr, v, dupeCheckSet))) {
                  throw new Error("Can not add duplicate data to array");
                }
                mainData[name] = arr.concat(data);
              } else {
                if (!check(data)) {
                  throwForUpdateMaker(typeName, name, expected, data);
                }
                if (!canAdd(mainData, data)) {
                  throw new Error(`Can not add duplicate data to ${typeName}`);
                }
                mainData[name] = data;
              }
            }
          }
        };
      }
      exports.updateGlobal = updateMaker("global");
      exports.updateInput = updateMaker("input");
      exports.updateOutput = updateMaker("output");
      function addInputAttributes(inputs, data) {
        const index = inputs.length - 1;
        const input = checkForInput(inputs, index);
        exports.updateInput(data, input);
      }
      exports.addInputAttributes = addInputAttributes;
      function addOutputAttributes(outputs, data) {
        const index = outputs.length - 1;
        const output = checkForOutput(outputs, index);
        exports.updateOutput(data, output);
      }
      exports.addOutputAttributes = addOutputAttributes;
      function defaultVersionSetter(version, txBuf) {
        if (!(txBuf instanceof Uint8Array) || txBuf.length < 4) {
          throw new Error("Set Version: Invalid Transaction");
        }
        tools.writeUInt32(txBuf, 0, version, "LE");
        return txBuf;
      }
      exports.defaultVersionSetter = defaultVersionSetter;
      function defaultLocktimeSetter(locktime, txBuf) {
        if (!(txBuf instanceof Uint8Array) || txBuf.length < 4) {
          throw new Error("Set Locktime: Invalid Transaction");
        }
        tools.writeUInt32(txBuf, txBuf.length - 4, locktime, "LE");
        return txBuf;
      }
      exports.defaultLocktimeSetter = defaultLocktimeSetter;
    }
  });

  // node_modules/bip174/src/cjs/lib/psbt.cjs
  var require_psbt = __commonJS({
    "node_modules/bip174/src/cjs/lib/psbt.cjs"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var index_js_1 = require_combiner();
      var index_js_2 = require_parser();
      var typeFields_js_1 = require_typeFields();
      var utils_js_1 = require_utils2();
      var tools = __importStar((init_browser3(), __toCommonJS(browser_exports3)));
      var Psbt = class {
        constructor(tx) {
          this.inputs = [];
          this.outputs = [];
          this.globalMap = {
            unsignedTx: tx
          };
        }
        static fromBase64(data, txFromBuffer) {
          const buffer = tools.fromBase64(data);
          return this.fromBuffer(buffer, txFromBuffer);
        }
        static fromHex(data, txFromBuffer) {
          const buffer = tools.fromHex(data);
          return this.fromBuffer(buffer, txFromBuffer);
        }
        static fromBuffer(buffer, txFromBuffer) {
          const results = index_js_2.psbtFromBuffer(buffer, txFromBuffer);
          const psbt = new this(results.globalMap.unsignedTx);
          Object.assign(psbt, results);
          return psbt;
        }
        toBase64() {
          const buffer = this.toBuffer();
          return tools.toBase64(buffer);
        }
        toHex() {
          const buffer = this.toBuffer();
          return tools.toHex(buffer);
        }
        toBuffer() {
          return index_js_2.psbtToBuffer(this);
        }
        updateGlobal(updateData) {
          utils_js_1.updateGlobal(updateData, this.globalMap);
          return this;
        }
        updateInput(inputIndex, updateData) {
          const input = utils_js_1.checkForInput(this.inputs, inputIndex);
          utils_js_1.updateInput(updateData, input);
          return this;
        }
        updateOutput(outputIndex, updateData) {
          const output = utils_js_1.checkForOutput(this.outputs, outputIndex);
          utils_js_1.updateOutput(updateData, output);
          return this;
        }
        addUnknownKeyValToGlobal(keyVal) {
          utils_js_1.checkHasKey(
            keyVal,
            this.globalMap.unknownKeyVals,
            utils_js_1.getEnumLength(typeFields_js_1.GlobalTypes)
          );
          if (!this.globalMap.unknownKeyVals) this.globalMap.unknownKeyVals = [];
          this.globalMap.unknownKeyVals.push(keyVal);
          return this;
        }
        addUnknownKeyValToInput(inputIndex, keyVal) {
          const input = utils_js_1.checkForInput(this.inputs, inputIndex);
          utils_js_1.checkHasKey(
            keyVal,
            input.unknownKeyVals,
            utils_js_1.getEnumLength(typeFields_js_1.InputTypes)
          );
          if (!input.unknownKeyVals) input.unknownKeyVals = [];
          input.unknownKeyVals.push(keyVal);
          return this;
        }
        addUnknownKeyValToOutput(outputIndex, keyVal) {
          const output = utils_js_1.checkForOutput(this.outputs, outputIndex);
          utils_js_1.checkHasKey(
            keyVal,
            output.unknownKeyVals,
            utils_js_1.getEnumLength(typeFields_js_1.OutputTypes)
          );
          if (!output.unknownKeyVals) output.unknownKeyVals = [];
          output.unknownKeyVals.push(keyVal);
          return this;
        }
        addInput(inputData) {
          this.globalMap.unsignedTx.addInput(inputData);
          this.inputs.push({
            unknownKeyVals: []
          });
          const addKeyVals = inputData.unknownKeyVals || [];
          const inputIndex = this.inputs.length - 1;
          if (!Array.isArray(addKeyVals)) {
            throw new Error("unknownKeyVals must be an Array");
          }
          addKeyVals.forEach(
            (keyVal) => this.addUnknownKeyValToInput(inputIndex, keyVal)
          );
          utils_js_1.addInputAttributes(this.inputs, inputData);
          return this;
        }
        addOutput(outputData) {
          this.globalMap.unsignedTx.addOutput(outputData);
          this.outputs.push({
            unknownKeyVals: []
          });
          const addKeyVals = outputData.unknownKeyVals || [];
          const outputIndex = this.outputs.length - 1;
          if (!Array.isArray(addKeyVals)) {
            throw new Error("unknownKeyVals must be an Array");
          }
          addKeyVals.forEach(
            (keyVal) => this.addUnknownKeyValToOutput(outputIndex, keyVal)
          );
          utils_js_1.addOutputAttributes(this.outputs, outputData);
          return this;
        }
        clearFinalizedInput(inputIndex) {
          const input = utils_js_1.checkForInput(this.inputs, inputIndex);
          utils_js_1.inputCheckUncleanFinalized(inputIndex, input);
          for (const key of Object.keys(input)) {
            if (![
              "witnessUtxo",
              "nonWitnessUtxo",
              "finalScriptSig",
              "finalScriptWitness",
              "unknownKeyVals"
            ].includes(key)) {
              delete input[key];
            }
          }
          return this;
        }
        combine(...those) {
          const result = index_js_1.combine([this].concat(those));
          Object.assign(this, result);
          return this;
        }
        getTransaction() {
          return this.globalMap.unsignedTx.toBuffer();
        }
      };
      exports.Psbt = Psbt;
      var utils_js_2 = require_utils2();
      exports.checkForInput = utils_js_2.checkForInput;
      exports.checkForOutput = utils_js_2.checkForOutput;
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/psbt/psbtutils.cjs
  var require_psbtutils = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/psbt/psbtutils.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isP2TR = exports.isP2SHScript = exports.isP2WSHScript = exports.isP2WPKH = exports.isP2PKH = exports.isP2PK = exports.isP2MS = void 0;
      exports.witnessStackToScriptWitness = witnessStackToScriptWitness;
      exports.pubkeyPositionInScript = pubkeyPositionInScript;
      exports.pubkeyInScript = pubkeyInScript;
      exports.checkInputForSig = checkInputForSig;
      exports.signatureBlocksAction = signatureBlocksAction;
      var varuint = __importStar(require_cjs4());
      var bscript = __importStar(require_script());
      var transaction_js_1 = require_transaction();
      var crypto_js_1 = require_crypto2();
      var payments = __importStar(require_payments());
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      function isPaymentFactory(payment) {
        return (script) => {
          try {
            payment({ output: script });
            return true;
          } catch (err) {
            return false;
          }
        };
      }
      exports.isP2MS = isPaymentFactory(payments.p2ms);
      exports.isP2PK = isPaymentFactory(payments.p2pk);
      exports.isP2PKH = isPaymentFactory(payments.p2pkh);
      exports.isP2WPKH = isPaymentFactory(payments.p2wpkh);
      exports.isP2WSHScript = isPaymentFactory(payments.p2wsh);
      exports.isP2SHScript = isPaymentFactory(payments.p2sh);
      exports.isP2TR = isPaymentFactory(payments.p2tr);
      function witnessStackToScriptWitness(witness) {
        let buffer = new Uint8Array(0);
        function writeSlice(slice) {
          buffer = tools.concat([buffer, slice]);
        }
        function writeVarInt(i) {
          const currentLen = buffer.length;
          const varintLen = varuint.encodingLength(i);
          buffer = tools.concat([buffer, new Uint8Array(varintLen)]);
          varuint.encode(i, buffer, currentLen);
        }
        function writeVarSlice(slice) {
          writeVarInt(slice.length);
          writeSlice(slice);
        }
        function writeVector(vector) {
          writeVarInt(vector.length);
          vector.forEach(writeVarSlice);
        }
        writeVector(witness);
        return buffer;
      }
      function pubkeyPositionInScript(pubkey, script) {
        const pubkeyHash = (0, crypto_js_1.hash160)(pubkey);
        const pubkeyXOnly = pubkey.slice(1, 33);
        const decompiled = bscript.decompile(script);
        if (decompiled === null) throw new Error("Unknown script error");
        return decompiled.findIndex((element) => {
          if (typeof element === "number") return false;
          return tools.compare(pubkey, element) === 0 || tools.compare(pubkeyHash, element) === 0 || tools.compare(pubkeyXOnly, element) === 0;
        });
      }
      function pubkeyInScript(pubkey, script) {
        return pubkeyPositionInScript(pubkey, script) !== -1;
      }
      function checkInputForSig(input, action) {
        const pSigs = extractPartialSigs(input);
        return pSigs.some(
          (pSig) => signatureBlocksAction(pSig, bscript.signature.decode, action)
        );
      }
      function signatureBlocksAction(signature, signatureDecodeFn, action) {
        const { hashType } = signatureDecodeFn(signature);
        const whitelist = [];
        const isAnyoneCanPay = hashType & transaction_js_1.Transaction.SIGHASH_ANYONECANPAY;
        if (isAnyoneCanPay) whitelist.push("addInput");
        const hashMod = hashType & 31;
        switch (hashMod) {
          case transaction_js_1.Transaction.SIGHASH_ALL:
            break;
          case transaction_js_1.Transaction.SIGHASH_SINGLE:
          case transaction_js_1.Transaction.SIGHASH_NONE:
            whitelist.push("addOutput");
            whitelist.push("setInputSequence");
            break;
        }
        if (whitelist.indexOf(action) === -1) {
          return true;
        }
        return false;
      }
      function extractPartialSigs(input) {
        let pSigs = [];
        if ((input.partialSig || []).length === 0) {
          if (!input.finalScriptSig && !input.finalScriptWitness) return [];
          pSigs = getPsigsFromInputFinalScripts(input);
        } else {
          pSigs = input.partialSig;
        }
        return pSigs.map((p) => p.signature);
      }
      function getPsigsFromInputFinalScripts(input) {
        const scriptItems = !input.finalScriptSig ? [] : bscript.decompile(input.finalScriptSig) || [];
        const witnessItems = !input.finalScriptWitness ? [] : bscript.decompile(input.finalScriptWitness) || [];
        return scriptItems.concat(witnessItems).filter((item) => {
          return item instanceof Uint8Array && bscript.isCanonicalScriptSignature(item);
        }).map((sig) => ({ signature: sig }));
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/psbt/bip371.cjs
  var require_bip371 = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/psbt/bip371.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.toXOnly = void 0;
      exports.tapScriptFinalizer = tapScriptFinalizer;
      exports.serializeTaprootSignature = serializeTaprootSignature;
      exports.isTaprootInput = isTaprootInput;
      exports.isTaprootOutput = isTaprootOutput;
      exports.checkTaprootInputFields = checkTaprootInputFields;
      exports.checkTaprootOutputFields = checkTaprootOutputFields;
      exports.tweakInternalPubKey = tweakInternalPubKey;
      exports.tapTreeToList = tapTreeToList;
      exports.tapTreeFromList = tapTreeFromList;
      exports.checkTaprootInputForSigs = checkTaprootInputForSigs;
      var types_js_1 = require_types();
      var transaction_js_1 = require_transaction();
      var psbtutils_js_1 = require_psbtutils();
      var bip341_js_1 = require_bip341();
      var index_js_1 = require_payments();
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var psbtutils_js_2 = require_psbtutils();
      var toXOnly = (pubKey) => pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);
      exports.toXOnly = toXOnly;
      function tapScriptFinalizer(inputIndex, input, tapLeafHashToFinalize) {
        const tapLeaf = findTapLeafToFinalize(
          input,
          inputIndex,
          tapLeafHashToFinalize
        );
        try {
          const sigs = sortSignatures(input, tapLeaf);
          const witness = sigs.concat(tapLeaf.script).concat(tapLeaf.controlBlock);
          return {
            finalScriptWitness: (0, psbtutils_js_1.witnessStackToScriptWitness)(
              witness
            )
          };
        } catch (err) {
          throw new Error(`Can not finalize taproot input #${inputIndex}: ${err}`);
        }
      }
      function serializeTaprootSignature(sig, sighashType) {
        const sighashTypeByte = sighashType ? Uint8Array.from([sighashType]) : Uint8Array.from([]);
        return tools.concat([sig, sighashTypeByte]);
      }
      function isTaprootInput(input) {
        return input && !!(input.tapInternalKey || input.tapMerkleRoot || input.tapLeafScript && input.tapLeafScript.length || input.tapBip32Derivation && input.tapBip32Derivation.length || input.witnessUtxo && (0, psbtutils_js_1.isP2TR)(input.witnessUtxo.script));
      }
      function isTaprootOutput(output, script) {
        return output && !!(output.tapInternalKey || output.tapTree || output.tapBip32Derivation && output.tapBip32Derivation.length || script && (0, psbtutils_js_1.isP2TR)(script));
      }
      function checkTaprootInputFields(inputData, newInputData, action) {
        checkMixedTaprootAndNonTaprootInputFields(inputData, newInputData, action);
        checkIfTapLeafInTree(inputData, newInputData, action);
      }
      function checkTaprootOutputFields(outputData, newOutputData, action) {
        checkMixedTaprootAndNonTaprootOutputFields(outputData, newOutputData, action);
        checkTaprootScriptPubkey(outputData, newOutputData);
      }
      function checkTaprootScriptPubkey(outputData, newOutputData) {
        if (!newOutputData.tapTree && !newOutputData.tapInternalKey) return;
        const tapInternalKey = newOutputData.tapInternalKey || outputData.tapInternalKey;
        const tapTree = newOutputData.tapTree || outputData.tapTree;
        if (tapInternalKey) {
          const { script: scriptPubkey } = outputData;
          const script = getTaprootScripPubkey(tapInternalKey, tapTree);
          if (scriptPubkey && tools.compare(script, scriptPubkey) !== 0)
            throw new Error("Error adding output. Script or address mismatch.");
        }
      }
      function getTaprootScripPubkey(tapInternalKey, tapTree) {
        const scriptTree = tapTree && tapTreeFromList(tapTree.leaves);
        const { output } = (0, index_js_1.p2tr)({
          internalPubkey: tapInternalKey,
          scriptTree
        });
        return output;
      }
      function tweakInternalPubKey(inputIndex, input) {
        const tapInternalKey = input.tapInternalKey;
        const outputKey = tapInternalKey && (0, bip341_js_1.tweakKey)(tapInternalKey, input.tapMerkleRoot);
        if (!outputKey)
          throw new Error(
            `Cannot tweak tap internal key for input #${inputIndex}. Public key: ${// tapInternalKey && tapInternalKey.toString('hex')
            tapInternalKey && tools.toHex(tapInternalKey)}`
          );
        return outputKey.x;
      }
      function tapTreeToList(tree) {
        if (!(0, types_js_1.isTaptree)(tree))
          throw new Error(
            "Cannot convert taptree to tapleaf list. Expecting a tapree structure."
          );
        return _tapTreeToList(tree);
      }
      function tapTreeFromList(leaves = []) {
        if (leaves.length === 1 && leaves[0].depth === 0)
          return {
            output: leaves[0].script,
            version: leaves[0].leafVersion
          };
        return instertLeavesInTree(leaves);
      }
      function checkTaprootInputForSigs(input, action) {
        const sigs = extractTaprootSigs(input);
        return sigs.some(
          (sig) => (0, psbtutils_js_2.signatureBlocksAction)(
            sig,
            decodeSchnorrSignature,
            action
          )
        );
      }
      function decodeSchnorrSignature(signature) {
        return {
          signature: signature.slice(0, 64),
          hashType: signature.slice(64)[0] || transaction_js_1.Transaction.SIGHASH_DEFAULT
        };
      }
      function extractTaprootSigs(input) {
        const sigs = [];
        if (input.tapKeySig) sigs.push(input.tapKeySig);
        if (input.tapScriptSig)
          sigs.push(...input.tapScriptSig.map((s) => s.signature));
        if (!sigs.length) {
          const finalTapKeySig = getTapKeySigFromWitness(input.finalScriptWitness);
          if (finalTapKeySig) sigs.push(finalTapKeySig);
        }
        return sigs;
      }
      function getTapKeySigFromWitness(finalScriptWitness) {
        if (!finalScriptWitness) return;
        const witness = finalScriptWitness.slice(2);
        if (witness.length === 64 || witness.length === 65) return witness;
      }
      function _tapTreeToList(tree, leaves = [], depth = 0) {
        if (depth > bip341_js_1.MAX_TAPTREE_DEPTH)
          throw new Error("Max taptree depth exceeded.");
        if (!tree) return [];
        if ((0, types_js_1.isTapleaf)(tree)) {
          leaves.push({
            depth,
            leafVersion: tree.version || bip341_js_1.LEAF_VERSION_TAPSCRIPT,
            script: tree.output
          });
          return leaves;
        }
        if (tree[0]) _tapTreeToList(tree[0], leaves, depth + 1);
        if (tree[1]) _tapTreeToList(tree[1], leaves, depth + 1);
        return leaves;
      }
      function instertLeavesInTree(leaves) {
        let tree;
        for (const leaf of leaves) {
          tree = instertLeafInTree(leaf, tree);
          if (!tree) throw new Error(`No room left to insert tapleaf in tree`);
        }
        return tree;
      }
      function instertLeafInTree(leaf, tree, depth = 0) {
        if (depth > bip341_js_1.MAX_TAPTREE_DEPTH)
          throw new Error("Max taptree depth exceeded.");
        if (leaf.depth === depth) {
          if (!tree)
            return {
              output: leaf.script,
              version: leaf.leafVersion
            };
          return;
        }
        if ((0, types_js_1.isTapleaf)(tree)) return;
        const leftSide = instertLeafInTree(leaf, tree && tree[0], depth + 1);
        if (leftSide) return [leftSide, tree && tree[1]];
        const rightSide = instertLeafInTree(leaf, tree && tree[1], depth + 1);
        if (rightSide) return [tree && tree[0], rightSide];
      }
      function checkMixedTaprootAndNonTaprootInputFields(inputData, newInputData, action) {
        const isBadTaprootUpdate = isTaprootInput(inputData) && hasNonTaprootFields(newInputData);
        const isBadNonTaprootUpdate = hasNonTaprootFields(inputData) && isTaprootInput(newInputData);
        const hasMixedFields = inputData === newInputData && isTaprootInput(newInputData) && hasNonTaprootFields(newInputData);
        if (isBadTaprootUpdate || isBadNonTaprootUpdate || hasMixedFields)
          throw new Error(
            `Invalid arguments for Psbt.${action}. Cannot use both taproot and non-taproot fields.`
          );
      }
      function checkMixedTaprootAndNonTaprootOutputFields(inputData, newInputData, action) {
        const isBadTaprootUpdate = isTaprootOutput(inputData) && hasNonTaprootFields(newInputData);
        const isBadNonTaprootUpdate = hasNonTaprootFields(inputData) && isTaprootOutput(newInputData);
        const hasMixedFields = inputData === newInputData && isTaprootOutput(newInputData) && hasNonTaprootFields(newInputData);
        if (isBadTaprootUpdate || isBadNonTaprootUpdate || hasMixedFields)
          throw new Error(
            `Invalid arguments for Psbt.${action}. Cannot use both taproot and non-taproot fields.`
          );
      }
      function checkIfTapLeafInTree(inputData, newInputData, action) {
        if (newInputData.tapMerkleRoot) {
          const newLeafsInTree = (newInputData.tapLeafScript || []).every(
            (l) => isTapLeafInTree(l, newInputData.tapMerkleRoot)
          );
          const oldLeafsInTree = (inputData.tapLeafScript || []).every(
            (l) => isTapLeafInTree(l, newInputData.tapMerkleRoot)
          );
          if (!newLeafsInTree || !oldLeafsInTree)
            throw new Error(
              `Invalid arguments for Psbt.${action}. Tapleaf not part of taptree.`
            );
        } else if (inputData.tapMerkleRoot) {
          const newLeafsInTree = (newInputData.tapLeafScript || []).every(
            (l) => isTapLeafInTree(l, inputData.tapMerkleRoot)
          );
          if (!newLeafsInTree)
            throw new Error(
              `Invalid arguments for Psbt.${action}. Tapleaf not part of taptree.`
            );
        }
      }
      function isTapLeafInTree(tapLeaf, merkleRoot) {
        if (!merkleRoot) return true;
        const leafHash = (0, bip341_js_1.tapleafHash)({
          output: tapLeaf.script,
          version: tapLeaf.leafVersion
        });
        const rootHash = (0, bip341_js_1.rootHashFromPath)(
          tapLeaf.controlBlock,
          leafHash
        );
        return tools.compare(rootHash, merkleRoot) === 0;
      }
      function sortSignatures(input, tapLeaf) {
        const leafHash = (0, bip341_js_1.tapleafHash)({
          output: tapLeaf.script,
          version: tapLeaf.leafVersion
        });
        return (input.tapScriptSig || []).filter((tss) => tools.compare(tss.leafHash, leafHash) === 0).map((tss) => addPubkeyPositionInScript(tapLeaf.script, tss)).sort((t1, t2) => t2.positionInScript - t1.positionInScript).map((t) => t.signature);
      }
      function addPubkeyPositionInScript(script, tss) {
        return Object.assign(
          {
            positionInScript: (0, psbtutils_js_1.pubkeyPositionInScript)(
              tss.pubkey,
              script
            )
          },
          tss
        );
      }
      function findTapLeafToFinalize(input, inputIndex, leafHashToFinalize) {
        if (!input.tapScriptSig || !input.tapScriptSig.length)
          throw new Error(
            `Can not finalize taproot input #${inputIndex}. No tapleaf script signature provided.`
          );
        const tapLeaf = (input.tapLeafScript || []).sort((a, b) => a.controlBlock.length - b.controlBlock.length).find(
          (leaf) => canFinalizeLeaf(leaf, input.tapScriptSig, leafHashToFinalize)
        );
        if (!tapLeaf)
          throw new Error(
            `Can not finalize taproot input #${inputIndex}. Signature for tapleaf script not found.`
          );
        return tapLeaf;
      }
      function canFinalizeLeaf(leaf, tapScriptSig, hash) {
        const leafHash = (0, bip341_js_1.tapleafHash)({
          output: leaf.script,
          version: leaf.leafVersion
        });
        const whiteListedHash = !hash || tools.compare(leafHash, hash) === 0;
        return whiteListedHash && tapScriptSig.find((tss) => tools.compare(tss.leafHash, leafHash) === 0) !== void 0;
      }
      function hasNonTaprootFields(io) {
        return io && !!(io.redeemScript || io.witnessScript || io.bip32Derivation && io.bip32Derivation.length);
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/psbt.cjs
  var require_psbt2 = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/psbt.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Psbt = exports.toXOnly = void 0;
      var bip174_1 = require_psbt();
      var varuint = __importStar(require_cjs4());
      var bip174_2 = require_psbt();
      var address_js_1 = require_address();
      var bufferutils_js_1 = require_bufferutils();
      var networks_js_1 = require_networks();
      var payments = __importStar(require_payments());
      var bip341_js_1 = require_bip341();
      var bscript = __importStar(require_script());
      var transaction_js_1 = require_transaction();
      var bip371_js_1 = require_bip371();
      Object.defineProperty(exports, "toXOnly", {
        enumerable: true,
        get: function() {
          return bip371_js_1.toXOnly;
        }
      });
      var psbtutils_js_1 = require_psbtutils();
      var tools = __importStar((init_browser(), __toCommonJS(browser_exports)));
      var DEFAULT_OPTS = {
        /**
         * A bitcoinjs Network object. This is only used if you pass an `address`
         * parameter to addOutput. Otherwise it is not needed and can be left default.
         */
        network: networks_js_1.bitcoin,
        /**
         * When extractTransaction is called, the fee rate is checked.
         * THIS IS NOT TO BE RELIED ON.
         * It is only here as a last ditch effort to prevent sending a 500 BTC fee etc.
         */
        maximumFeeRate: 5e3
        // satoshi per byte
      };
      var Psbt = class _Psbt {
        data;
        static fromBase64(data, opts = {}) {
          const buffer = tools.fromBase64(data);
          return this.fromBuffer(buffer, opts);
        }
        static fromHex(data, opts = {}) {
          const buffer = tools.fromHex(data);
          return this.fromBuffer(buffer, opts);
        }
        static fromBuffer(buffer, opts = {}) {
          const psbtBase = bip174_1.Psbt.fromBuffer(buffer, transactionFromBuffer);
          const psbt = new _Psbt(opts, psbtBase);
          checkTxForDupeIns(psbt.__CACHE.__TX, psbt.__CACHE);
          return psbt;
        }
        __CACHE;
        opts;
        constructor(opts = {}, data = new bip174_1.Psbt(new PsbtTransaction())) {
          this.data = data;
          this.opts = Object.assign({}, DEFAULT_OPTS, opts);
          this.__CACHE = {
            __NON_WITNESS_UTXO_TX_CACHE: [],
            __NON_WITNESS_UTXO_BUF_CACHE: [],
            __TX_IN_CACHE: {},
            __TX: this.data.globalMap.unsignedTx.tx,
            // Psbt's predecessor (TransactionBuilder - now removed) behavior
            // was to not confirm input values  before signing.
            // Even though we highly encourage people to get
            // the full parent transaction to verify values, the ability to
            // sign non-segwit inputs without the full transaction was often
            // requested. So the only way to activate is to use @ts-ignore.
            // We will disable exporting the Psbt when unsafe sign is active.
            // because it is not BIP174 compliant.
            __UNSAFE_SIGN_NONSEGWIT: false
          };
          if (this.data.inputs.length === 0) this.setVersion(2);
          const dpew = (obj, attr, enumerable, writable) => Object.defineProperty(obj, attr, {
            enumerable,
            writable
          });
          dpew(this, "__CACHE", false, true);
          dpew(this, "opts", false, true);
        }
        get inputCount() {
          return this.data.inputs.length;
        }
        get version() {
          return this.__CACHE.__TX.version;
        }
        set version(version) {
          this.setVersion(version);
        }
        get locktime() {
          return this.__CACHE.__TX.locktime;
        }
        set locktime(locktime) {
          this.setLocktime(locktime);
        }
        get txInputs() {
          return this.__CACHE.__TX.ins.map((input) => ({
            hash: (0, bufferutils_js_1.cloneBuffer)(input.hash),
            index: input.index,
            sequence: input.sequence
          }));
        }
        get txOutputs() {
          return this.__CACHE.__TX.outs.map((output) => {
            let address;
            try {
              address = (0, address_js_1.fromOutputScript)(
                output.script,
                this.opts.network
              );
            } catch (_) {
            }
            return {
              script: (0, bufferutils_js_1.cloneBuffer)(output.script),
              value: output.value,
              address
            };
          });
        }
        combine(...those) {
          this.data.combine(...those.map((o) => o.data));
          return this;
        }
        clone() {
          const res = _Psbt.fromBuffer(this.data.toBuffer());
          res.opts = JSON.parse(JSON.stringify(this.opts));
          return res;
        }
        setMaximumFeeRate(satoshiPerByte) {
          check32Bit(satoshiPerByte);
          this.opts.maximumFeeRate = satoshiPerByte;
        }
        setVersion(version) {
          check32Bit(version);
          checkInputsForPartialSig(this.data.inputs, "setVersion");
          const c = this.__CACHE;
          c.__TX.version = version;
          c.__EXTRACTED_TX = void 0;
          return this;
        }
        setLocktime(locktime) {
          check32Bit(locktime);
          checkInputsForPartialSig(this.data.inputs, "setLocktime");
          const c = this.__CACHE;
          c.__TX.locktime = locktime;
          c.__EXTRACTED_TX = void 0;
          return this;
        }
        setInputSequence(inputIndex, sequence) {
          check32Bit(sequence);
          checkInputsForPartialSig(this.data.inputs, "setInputSequence");
          const c = this.__CACHE;
          if (c.__TX.ins.length <= inputIndex) {
            throw new Error("Input index too high");
          }
          c.__TX.ins[inputIndex].sequence = sequence;
          c.__EXTRACTED_TX = void 0;
          return this;
        }
        addInputs(inputDatas) {
          inputDatas.forEach((inputData) => this.addInput(inputData));
          return this;
        }
        addInput(inputData) {
          if (arguments.length > 1 || !inputData || inputData.hash === void 0 || inputData.index === void 0) {
            throw new Error(
              `Invalid arguments for Psbt.addInput. Requires single object with at least [hash] and [index]`
            );
          }
          (0, bip371_js_1.checkTaprootInputFields)(inputData, inputData, "addInput");
          checkInputsForPartialSig(this.data.inputs, "addInput");
          if (inputData.witnessScript) checkInvalidP2WSH(inputData.witnessScript);
          const c = this.__CACHE;
          this.data.addInput(inputData);
          const txIn = c.__TX.ins[c.__TX.ins.length - 1];
          checkTxInputCache(c, txIn);
          const inputIndex = this.data.inputs.length - 1;
          const input = this.data.inputs[inputIndex];
          if (input.nonWitnessUtxo) {
            addNonWitnessTxCache(this.__CACHE, input, inputIndex);
          }
          c.__FEE = void 0;
          c.__FEE_RATE = void 0;
          c.__EXTRACTED_TX = void 0;
          return this;
        }
        addOutputs(outputDatas) {
          outputDatas.forEach((outputData) => this.addOutput(outputData));
          return this;
        }
        addOutput(outputData) {
          if (arguments.length > 1 || !outputData || outputData.value === void 0 || outputData.address === void 0 && outputData.script === void 0) {
            throw new Error(
              `Invalid arguments for Psbt.addOutput. Requires single object with at least [script or address] and [value]`
            );
          }
          checkInputsForPartialSig(this.data.inputs, "addOutput");
          const { address } = outputData;
          if (typeof address === "string") {
            const { network } = this.opts;
            const script = (0, address_js_1.toOutputScript)(address, network);
            outputData = Object.assign({}, outputData, { script });
          }
          (0, bip371_js_1.checkTaprootOutputFields)(
            outputData,
            outputData,
            "addOutput"
          );
          const c = this.__CACHE;
          this.data.addOutput(outputData);
          c.__FEE = void 0;
          c.__FEE_RATE = void 0;
          c.__EXTRACTED_TX = void 0;
          return this;
        }
        extractTransaction(disableFeeCheck) {
          if (!this.data.inputs.every(isFinalized)) throw new Error("Not finalized");
          const c = this.__CACHE;
          if (!disableFeeCheck) {
            checkFees(this, c, this.opts);
          }
          if (c.__EXTRACTED_TX) return c.__EXTRACTED_TX;
          const tx = c.__TX.clone();
          inputFinalizeGetAmts(this.data.inputs, tx, c, true);
          return tx;
        }
        getFeeRate() {
          return getTxCacheValue(
            "__FEE_RATE",
            "fee rate",
            this.data.inputs,
            this.__CACHE
          );
        }
        getFee() {
          return getTxCacheValue("__FEE", "fee", this.data.inputs, this.__CACHE);
        }
        finalizeAllInputs() {
          (0, bip174_2.checkForInput)(this.data.inputs, 0);
          range(this.data.inputs.length).forEach((idx) => this.finalizeInput(idx));
          return this;
        }
        finalizeInput(inputIndex, finalScriptsFunc) {
          const input = (0, bip174_2.checkForInput)(this.data.inputs, inputIndex);
          if ((0, bip371_js_1.isTaprootInput)(input))
            return this._finalizeTaprootInput(
              inputIndex,
              input,
              void 0,
              finalScriptsFunc
            );
          return this._finalizeInput(inputIndex, input, finalScriptsFunc);
        }
        finalizeTaprootInput(inputIndex, tapLeafHashToFinalize, finalScriptsFunc = bip371_js_1.tapScriptFinalizer) {
          const input = (0, bip174_2.checkForInput)(this.data.inputs, inputIndex);
          if ((0, bip371_js_1.isTaprootInput)(input))
            return this._finalizeTaprootInput(
              inputIndex,
              input,
              tapLeafHashToFinalize,
              finalScriptsFunc
            );
          throw new Error(`Cannot finalize input #${inputIndex}. Not Taproot.`);
        }
        _finalizeInput(inputIndex, input, finalScriptsFunc = getFinalScripts) {
          const { script, isP2SH, isP2WSH, isSegwit } = getScriptFromInput(
            inputIndex,
            input,
            this.__CACHE
          );
          if (!script) throw new Error(`No script found for input #${inputIndex}`);
          checkPartialSigSighashes(input);
          const { finalScriptSig, finalScriptWitness } = finalScriptsFunc(
            inputIndex,
            input,
            script,
            isSegwit,
            isP2SH,
            isP2WSH
          );
          if (finalScriptSig) this.data.updateInput(inputIndex, { finalScriptSig });
          if (finalScriptWitness)
            this.data.updateInput(inputIndex, { finalScriptWitness });
          if (!finalScriptSig && !finalScriptWitness)
            throw new Error(`Unknown error finalizing input #${inputIndex}`);
          this.data.clearFinalizedInput(inputIndex);
          return this;
        }
        _finalizeTaprootInput(inputIndex, input, tapLeafHashToFinalize, finalScriptsFunc = bip371_js_1.tapScriptFinalizer) {
          if (!input.witnessUtxo)
            throw new Error(
              `Cannot finalize input #${inputIndex}. Missing withness utxo.`
            );
          if (input.tapKeySig) {
            const payment = payments.p2tr({
              output: input.witnessUtxo.script,
              signature: input.tapKeySig
            });
            const finalScriptWitness = (0, psbtutils_js_1.witnessStackToScriptWitness)(payment.witness);
            this.data.updateInput(inputIndex, { finalScriptWitness });
          } else {
            const { finalScriptWitness } = finalScriptsFunc(
              inputIndex,
              input,
              tapLeafHashToFinalize
            );
            this.data.updateInput(inputIndex, { finalScriptWitness });
          }
          this.data.clearFinalizedInput(inputIndex);
          return this;
        }
        getInputType(inputIndex) {
          const input = (0, bip174_2.checkForInput)(this.data.inputs, inputIndex);
          const script = getScriptFromUtxo(inputIndex, input, this.__CACHE);
          const result = getMeaningfulScript(
            script,
            inputIndex,
            "input",
            input.redeemScript || redeemFromFinalScriptSig(input.finalScriptSig),
            input.witnessScript || redeemFromFinalWitnessScript(input.finalScriptWitness)
          );
          const type = result.type === "raw" ? "" : result.type + "-";
          const mainType = classifyScript(result.meaningfulScript);
          return type + mainType;
        }
        inputHasPubkey(inputIndex, pubkey) {
          const input = (0, bip174_2.checkForInput)(this.data.inputs, inputIndex);
          return pubkeyInInput(pubkey, input, inputIndex, this.__CACHE);
        }
        inputHasHDKey(inputIndex, root) {
          const input = (0, bip174_2.checkForInput)(this.data.inputs, inputIndex);
          const derivationIsMine = bip32DerivationIsMine(root);
          return !!input.bip32Derivation && input.bip32Derivation.some(derivationIsMine);
        }
        outputHasPubkey(outputIndex, pubkey) {
          const output = (0, bip174_2.checkForOutput)(this.data.outputs, outputIndex);
          return pubkeyInOutput(pubkey, output, outputIndex, this.__CACHE);
        }
        outputHasHDKey(outputIndex, root) {
          const output = (0, bip174_2.checkForOutput)(this.data.outputs, outputIndex);
          const derivationIsMine = bip32DerivationIsMine(root);
          return !!output.bip32Derivation && output.bip32Derivation.some(derivationIsMine);
        }
        validateSignaturesOfAllInputs(validator) {
          (0, bip174_2.checkForInput)(this.data.inputs, 0);
          const results = range(this.data.inputs.length).map(
            (idx) => this.validateSignaturesOfInput(idx, validator)
          );
          return results.reduce((final, res) => res === true && final, true);
        }
        validateSignaturesOfInput(inputIndex, validator, pubkey) {
          const input = this.data.inputs[inputIndex];
          if ((0, bip371_js_1.isTaprootInput)(input))
            return this.validateSignaturesOfTaprootInput(
              inputIndex,
              validator,
              pubkey
            );
          return this._validateSignaturesOfInput(inputIndex, validator, pubkey);
        }
        _validateSignaturesOfInput(inputIndex, validator, pubkey) {
          const input = this.data.inputs[inputIndex];
          const partialSig = (input || {}).partialSig;
          if (!input || !partialSig || partialSig.length < 1)
            throw new Error("No signatures to validate");
          if (typeof validator !== "function")
            throw new Error("Need validator function to validate signatures");
          const mySigs = pubkey ? partialSig.filter((sig) => tools.compare(sig.pubkey, pubkey) === 0) : partialSig;
          if (mySigs.length < 1) throw new Error("No signatures for this pubkey");
          const results = [];
          let hashCache;
          let scriptCache;
          let sighashCache;
          for (const pSig of mySigs) {
            const sig = bscript.signature.decode(pSig.signature);
            const { hash, script } = sighashCache !== sig.hashType ? getHashForSig(
              inputIndex,
              Object.assign({}, input, { sighashType: sig.hashType }),
              this.__CACHE,
              true
            ) : { hash: hashCache, script: scriptCache };
            sighashCache = sig.hashType;
            hashCache = hash;
            scriptCache = script;
            checkScriptForPubkey(pSig.pubkey, script, "verify");
            results.push(validator(pSig.pubkey, hash, sig.signature));
          }
          return results.every((res) => res === true);
        }
        validateSignaturesOfTaprootInput(inputIndex, validator, pubkey) {
          const input = this.data.inputs[inputIndex];
          const tapKeySig = (input || {}).tapKeySig;
          const tapScriptSig = (input || {}).tapScriptSig;
          if (!input && !tapKeySig && !(tapScriptSig && !tapScriptSig.length))
            throw new Error("No signatures to validate");
          if (typeof validator !== "function")
            throw new Error("Need validator function to validate signatures");
          pubkey = pubkey && (0, bip371_js_1.toXOnly)(pubkey);
          const allHashses = pubkey ? getTaprootHashesForSigValidation(
            inputIndex,
            input,
            this.data.inputs,
            pubkey,
            this.__CACHE
          ) : getAllTaprootHashesForSigValidation(
            inputIndex,
            input,
            this.data.inputs,
            this.__CACHE
          );
          if (!allHashses.length) throw new Error("No signatures for this pubkey");
          const tapKeyHash = allHashses.find((h) => !h.leafHash);
          let validationResultCount = 0;
          if (tapKeySig && tapKeyHash) {
            const isValidTapkeySig = validator(
              tapKeyHash.pubkey,
              tapKeyHash.hash,
              trimTaprootSig(tapKeySig)
            );
            if (!isValidTapkeySig) return false;
            validationResultCount++;
          }
          if (tapScriptSig) {
            for (const tapSig of tapScriptSig) {
              const tapSigHash = allHashses.find(
                (h) => tools.compare(h.pubkey, tapSig.pubkey) === 0
              );
              if (tapSigHash) {
                const isValidTapScriptSig = validator(
                  tapSig.pubkey,
                  tapSigHash.hash,
                  trimTaprootSig(tapSig.signature)
                );
                if (!isValidTapScriptSig) return false;
                validationResultCount++;
              }
            }
          }
          return validationResultCount > 0;
        }
        signAllInputsHD(hdKeyPair, sighashTypes = [transaction_js_1.Transaction.SIGHASH_ALL]) {
          if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
            throw new Error("Need HDSigner to sign input");
          }
          const results = [];
          for (const i of range(this.data.inputs.length)) {
            try {
              this.signInputHD(i, hdKeyPair, sighashTypes);
              results.push(true);
            } catch (err) {
              results.push(false);
            }
          }
          if (results.every((v) => v === false)) {
            throw new Error("No inputs were signed");
          }
          return this;
        }
        signAllInputsHDAsync(hdKeyPair, sighashTypes = [transaction_js_1.Transaction.SIGHASH_ALL]) {
          return new Promise((resolve, reject) => {
            if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
              return reject(new Error("Need HDSigner to sign input"));
            }
            const results = [];
            const promises = [];
            for (const i of range(this.data.inputs.length)) {
              promises.push(
                this.signInputHDAsync(i, hdKeyPair, sighashTypes).then(
                  () => {
                    results.push(true);
                  },
                  () => {
                    results.push(false);
                  }
                )
              );
            }
            return Promise.all(promises).then(() => {
              if (results.every((v) => v === false)) {
                return reject(new Error("No inputs were signed"));
              }
              resolve();
            });
          });
        }
        signInputHD(inputIndex, hdKeyPair, sighashTypes = [transaction_js_1.Transaction.SIGHASH_ALL]) {
          if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
            throw new Error("Need HDSigner to sign input");
          }
          const signers = getSignersFromHD(inputIndex, this.data.inputs, hdKeyPair);
          signers.forEach((signer) => this.signInput(inputIndex, signer, sighashTypes));
          return this;
        }
        signInputHDAsync(inputIndex, hdKeyPair, sighashTypes = [transaction_js_1.Transaction.SIGHASH_ALL]) {
          return new Promise((resolve, reject) => {
            if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
              return reject(new Error("Need HDSigner to sign input"));
            }
            const signers = getSignersFromHD(inputIndex, this.data.inputs, hdKeyPair);
            const promises = signers.map(
              (signer) => this.signInputAsync(inputIndex, signer, sighashTypes)
            );
            return Promise.all(promises).then(() => {
              resolve();
            }).catch(reject);
          });
        }
        signAllInputs(keyPair, sighashTypes) {
          if (!keyPair || !keyPair.publicKey)
            throw new Error("Need Signer to sign input");
          const results = [];
          for (const i of range(this.data.inputs.length)) {
            try {
              this.signInput(i, keyPair, sighashTypes);
              results.push(true);
            } catch (err) {
              results.push(false);
            }
          }
          if (results.every((v) => v === false)) {
            throw new Error("No inputs were signed");
          }
          return this;
        }
        signAllInputsAsync(keyPair, sighashTypes) {
          return new Promise((resolve, reject) => {
            if (!keyPair || !keyPair.publicKey)
              return reject(new Error("Need Signer to sign input"));
            const results = [];
            const promises = [];
            for (const [i] of this.data.inputs.entries()) {
              promises.push(
                this.signInputAsync(i, keyPair, sighashTypes).then(
                  () => {
                    results.push(true);
                  },
                  () => {
                    results.push(false);
                  }
                )
              );
            }
            return Promise.all(promises).then(() => {
              if (results.every((v) => v === false)) {
                return reject(new Error("No inputs were signed"));
              }
              resolve();
            });
          });
        }
        signInput(inputIndex, keyPair, sighashTypes) {
          if (!keyPair || !keyPair.publicKey)
            throw new Error("Need Signer to sign input");
          const input = (0, bip174_2.checkForInput)(this.data.inputs, inputIndex);
          if ((0, bip371_js_1.isTaprootInput)(input)) {
            return this._signTaprootInput(
              inputIndex,
              input,
              keyPair,
              void 0,
              sighashTypes
            );
          }
          return this._signInput(inputIndex, keyPair, sighashTypes);
        }
        signTaprootInput(inputIndex, keyPair, tapLeafHashToSign, sighashTypes) {
          if (!keyPair || !keyPair.publicKey)
            throw new Error("Need Signer to sign input");
          const input = (0, bip174_2.checkForInput)(this.data.inputs, inputIndex);
          if ((0, bip371_js_1.isTaprootInput)(input))
            return this._signTaprootInput(
              inputIndex,
              input,
              keyPair,
              tapLeafHashToSign,
              sighashTypes
            );
          throw new Error(`Input #${inputIndex} is not of type Taproot.`);
        }
        _signInput(inputIndex, keyPair, sighashTypes = [transaction_js_1.Transaction.SIGHASH_ALL]) {
          const { hash, sighashType } = getHashAndSighashType(
            this.data.inputs,
            inputIndex,
            keyPair.publicKey,
            this.__CACHE,
            sighashTypes
          );
          const partialSig = [
            {
              pubkey: keyPair.publicKey,
              signature: bscript.signature.encode(keyPair.sign(hash), sighashType)
            }
          ];
          this.data.updateInput(inputIndex, { partialSig });
          return this;
        }
        _signTaprootInput(inputIndex, input, keyPair, tapLeafHashToSign, allowedSighashTypes = [transaction_js_1.Transaction.SIGHASH_DEFAULT]) {
          const hashesForSig = this.checkTaprootHashesForSig(
            inputIndex,
            input,
            keyPair,
            tapLeafHashToSign,
            allowedSighashTypes
          );
          const tapKeySig = hashesForSig.filter((h) => !h.leafHash).map(
            (h) => (0, bip371_js_1.serializeTaprootSignature)(
              keyPair.signSchnorr(h.hash),
              input.sighashType
            )
          )[0];
          const tapScriptSig = hashesForSig.filter((h) => !!h.leafHash).map((h) => ({
            pubkey: (0, bip371_js_1.toXOnly)(keyPair.publicKey),
            signature: (0, bip371_js_1.serializeTaprootSignature)(
              keyPair.signSchnorr(h.hash),
              input.sighashType
            ),
            leafHash: h.leafHash
          }));
          if (tapKeySig) {
            this.data.updateInput(inputIndex, { tapKeySig });
          }
          if (tapScriptSig.length) {
            this.data.updateInput(inputIndex, { tapScriptSig });
          }
          return this;
        }
        signInputAsync(inputIndex, keyPair, sighashTypes) {
          return Promise.resolve().then(() => {
            if (!keyPair || !keyPair.publicKey)
              throw new Error("Need Signer to sign input");
            const input = (0, bip174_2.checkForInput)(this.data.inputs, inputIndex);
            if ((0, bip371_js_1.isTaprootInput)(input))
              return this._signTaprootInputAsync(
                inputIndex,
                input,
                keyPair,
                void 0,
                sighashTypes
              );
            return this._signInputAsync(inputIndex, keyPair, sighashTypes);
          });
        }
        signTaprootInputAsync(inputIndex, keyPair, tapLeafHash, sighashTypes) {
          return Promise.resolve().then(() => {
            if (!keyPair || !keyPair.publicKey)
              throw new Error("Need Signer to sign input");
            const input = (0, bip174_2.checkForInput)(this.data.inputs, inputIndex);
            if ((0, bip371_js_1.isTaprootInput)(input))
              return this._signTaprootInputAsync(
                inputIndex,
                input,
                keyPair,
                tapLeafHash,
                sighashTypes
              );
            throw new Error(`Input #${inputIndex} is not of type Taproot.`);
          });
        }
        _signInputAsync(inputIndex, keyPair, sighashTypes = [transaction_js_1.Transaction.SIGHASH_ALL]) {
          const { hash, sighashType } = getHashAndSighashType(
            this.data.inputs,
            inputIndex,
            keyPair.publicKey,
            this.__CACHE,
            sighashTypes
          );
          return Promise.resolve(keyPair.sign(hash)).then((signature) => {
            const partialSig = [
              {
                pubkey: keyPair.publicKey,
                signature: bscript.signature.encode(signature, sighashType)
              }
            ];
            this.data.updateInput(inputIndex, { partialSig });
          });
        }
        async _signTaprootInputAsync(inputIndex, input, keyPair, tapLeafHash, sighashTypes = [transaction_js_1.Transaction.SIGHASH_DEFAULT]) {
          const hashesForSig = this.checkTaprootHashesForSig(
            inputIndex,
            input,
            keyPair,
            tapLeafHash,
            sighashTypes
          );
          const signaturePromises = [];
          const tapKeyHash = hashesForSig.filter((h) => !h.leafHash)[0];
          if (tapKeyHash) {
            const tapKeySigPromise = Promise.resolve(
              keyPair.signSchnorr(tapKeyHash.hash)
            ).then((sig) => {
              return {
                tapKeySig: (0, bip371_js_1.serializeTaprootSignature)(
                  sig,
                  input.sighashType
                )
              };
            });
            signaturePromises.push(tapKeySigPromise);
          }
          const tapScriptHashes = hashesForSig.filter((h) => !!h.leafHash);
          if (tapScriptHashes.length) {
            const tapScriptSigPromises = tapScriptHashes.map((tsh) => {
              return Promise.resolve(keyPair.signSchnorr(tsh.hash)).then(
                (signature) => {
                  const tapScriptSig = [
                    {
                      pubkey: (0, bip371_js_1.toXOnly)(keyPair.publicKey),
                      signature: (0, bip371_js_1.serializeTaprootSignature)(
                        signature,
                        input.sighashType
                      ),
                      leafHash: tsh.leafHash
                    }
                  ];
                  return { tapScriptSig };
                }
              );
            });
            signaturePromises.push(...tapScriptSigPromises);
          }
          return Promise.all(signaturePromises).then((results) => {
            results.forEach((v) => this.data.updateInput(inputIndex, v));
          });
        }
        checkTaprootHashesForSig(inputIndex, input, keyPair, tapLeafHashToSign, allowedSighashTypes) {
          if (typeof keyPair.signSchnorr !== "function")
            throw new Error(
              `Need Schnorr Signer to sign taproot input #${inputIndex}.`
            );
          const hashesForSig = getTaprootHashesForSigning(
            inputIndex,
            input,
            this.data.inputs,
            keyPair.publicKey,
            this.__CACHE,
            tapLeafHashToSign,
            allowedSighashTypes
          );
          if (!hashesForSig || !hashesForSig.length)
            throw new Error(
              `Can not sign for input #${inputIndex} with the key ${tools.toHex(keyPair.publicKey)}`
            );
          return hashesForSig;
        }
        toBuffer() {
          checkCache(this.__CACHE);
          return this.data.toBuffer();
        }
        toHex() {
          checkCache(this.__CACHE);
          return this.data.toHex();
        }
        toBase64() {
          checkCache(this.__CACHE);
          return this.data.toBase64();
        }
        updateGlobal(updateData) {
          this.data.updateGlobal(updateData);
          return this;
        }
        updateInput(inputIndex, updateData) {
          if (updateData.witnessScript) checkInvalidP2WSH(updateData.witnessScript);
          (0, bip371_js_1.checkTaprootInputFields)(
            this.data.inputs[inputIndex],
            updateData,
            "updateInput"
          );
          this.data.updateInput(inputIndex, updateData);
          if (updateData.nonWitnessUtxo) {
            addNonWitnessTxCache(
              this.__CACHE,
              this.data.inputs[inputIndex],
              inputIndex
            );
          }
          return this;
        }
        updateOutput(outputIndex, updateData) {
          const outputData = this.data.outputs[outputIndex];
          (0, bip371_js_1.checkTaprootOutputFields)(
            outputData,
            updateData,
            "updateOutput"
          );
          this.data.updateOutput(outputIndex, updateData);
          return this;
        }
        addUnknownKeyValToGlobal(keyVal) {
          this.data.addUnknownKeyValToGlobal(keyVal);
          return this;
        }
        addUnknownKeyValToInput(inputIndex, keyVal) {
          this.data.addUnknownKeyValToInput(inputIndex, keyVal);
          return this;
        }
        addUnknownKeyValToOutput(outputIndex, keyVal) {
          this.data.addUnknownKeyValToOutput(outputIndex, keyVal);
          return this;
        }
        clearFinalizedInput(inputIndex) {
          this.data.clearFinalizedInput(inputIndex);
          return this;
        }
      };
      exports.Psbt = Psbt;
      var transactionFromBuffer = (buffer) => new PsbtTransaction(buffer);
      var PsbtTransaction = class {
        tx;
        constructor(buffer = Uint8Array.from([2, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {
          this.tx = transaction_js_1.Transaction.fromBuffer(buffer);
          checkTxEmpty(this.tx);
          Object.defineProperty(this, "tx", {
            enumerable: false,
            writable: true
          });
        }
        getInputOutputCounts() {
          return {
            inputCount: this.tx.ins.length,
            outputCount: this.tx.outs.length
          };
        }
        addInput(input) {
          if (input.hash === void 0 || input.index === void 0 || !(input.hash instanceof Uint8Array) && typeof input.hash !== "string" || typeof input.index !== "number") {
            throw new Error("Error adding input.");
          }
          const hash = typeof input.hash === "string" ? (0, bufferutils_js_1.reverseBuffer)(tools.fromHex(input.hash)) : input.hash;
          this.tx.addInput(hash, input.index, input.sequence);
        }
        addOutput(output) {
          if (output.script === void 0 || output.value === void 0 || !(output.script instanceof Uint8Array) || typeof output.value !== "bigint") {
            throw new Error("Error adding output.");
          }
          this.tx.addOutput(output.script, output.value);
        }
        toBuffer() {
          return this.tx.toBuffer();
        }
      };
      function canFinalize(input, script, scriptType) {
        switch (scriptType) {
          case "pubkey":
          case "pubkeyhash":
          case "witnesspubkeyhash":
            return hasSigs(1, input.partialSig);
          case "multisig":
            const p2ms = payments.p2ms({ output: script });
            return hasSigs(p2ms.m, input.partialSig, p2ms.pubkeys);
          default:
            return false;
        }
      }
      function checkCache(cache) {
        if (cache.__UNSAFE_SIGN_NONSEGWIT !== false) {
          throw new Error("Not BIP174 compliant, can not export");
        }
      }
      function hasSigs(neededSigs, partialSig, pubkeys) {
        if (!partialSig) return false;
        let sigs;
        if (pubkeys) {
          sigs = pubkeys.map((pkey) => {
            const pubkey = compressPubkey(pkey);
            return partialSig.find(
              (pSig) => tools.compare(pSig.pubkey, pubkey) === 0
            );
          }).filter((v) => !!v);
        } else {
          sigs = partialSig;
        }
        if (sigs.length > neededSigs) throw new Error("Too many signatures");
        return sigs.length === neededSigs;
      }
      function isFinalized(input) {
        return !!input.finalScriptSig || !!input.finalScriptWitness;
      }
      function bip32DerivationIsMine(root) {
        return (d) => {
          if (tools.compare(root.fingerprint, d.masterFingerprint)) return false;
          if (tools.compare(root.derivePath(d.path).publicKey, d.pubkey))
            return false;
          return true;
        };
      }
      function check32Bit(num) {
        if (typeof num !== "number" || num !== Math.floor(num) || num > 4294967295 || num < 0) {
          throw new Error("Invalid 32 bit integer");
        }
      }
      function checkFees(psbt, cache, opts) {
        const feeRate = cache.__FEE_RATE || psbt.getFeeRate();
        const vsize = cache.__EXTRACTED_TX.virtualSize();
        const satoshis = feeRate * vsize;
        if (feeRate >= opts.maximumFeeRate) {
          throw new Error(
            `Warning: You are paying around ${(satoshis / 1e8).toFixed(8)} in fees, which is ${feeRate} satoshi per byte for a transaction with a VSize of ${vsize} bytes (segwit counted as 0.25 byte per byte). Use setMaximumFeeRate method to raise your threshold, or pass true to the first arg of extractTransaction.`
          );
        }
      }
      function checkInputsForPartialSig(inputs, action) {
        inputs.forEach((input) => {
          const throws = (0, bip371_js_1.isTaprootInput)(input) ? (0, bip371_js_1.checkTaprootInputForSigs)(input, action) : (0, psbtutils_js_1.checkInputForSig)(input, action);
          if (throws)
            throw new Error("Can not modify transaction, signatures exist.");
        });
      }
      function checkPartialSigSighashes(input) {
        if (!input.sighashType || !input.partialSig) return;
        const { partialSig, sighashType } = input;
        partialSig.forEach((pSig) => {
          const { hashType } = bscript.signature.decode(pSig.signature);
          if (sighashType !== hashType) {
            throw new Error("Signature sighash does not match input sighash type");
          }
        });
      }
      function checkScriptForPubkey(pubkey, script, action) {
        if (!(0, psbtutils_js_1.pubkeyInScript)(pubkey, script)) {
          throw new Error(
            `Can not ${action} for this input with the key ${tools.toHex(pubkey)}`
          );
        }
      }
      function checkTxEmpty(tx) {
        const isEmpty = tx.ins.every(
          (input) => input.script && input.script.length === 0 && input.witness && input.witness.length === 0
        );
        if (!isEmpty) {
          throw new Error("Format Error: Transaction ScriptSigs are not empty");
        }
      }
      function checkTxForDupeIns(tx, cache) {
        tx.ins.forEach((input) => {
          checkTxInputCache(cache, input);
        });
      }
      function checkTxInputCache(cache, input) {
        const key = tools.toHex(
          (0, bufferutils_js_1.reverseBuffer)(Uint8Array.from(input.hash))
        ) + ":" + input.index;
        if (cache.__TX_IN_CACHE[key]) throw new Error("Duplicate input detected.");
        cache.__TX_IN_CACHE[key] = 1;
      }
      function scriptCheckerFactory(payment, paymentScriptName) {
        return (inputIndex, scriptPubKey, redeemScript, ioType) => {
          const redeemScriptOutput = payment({
            redeem: { output: redeemScript }
          }).output;
          if (tools.compare(scriptPubKey, redeemScriptOutput)) {
            throw new Error(
              `${paymentScriptName} for ${ioType} #${inputIndex} doesn't match the scriptPubKey in the prevout`
            );
          }
        };
      }
      var checkRedeemScript = scriptCheckerFactory(payments.p2sh, "Redeem script");
      var checkWitnessScript = scriptCheckerFactory(
        payments.p2wsh,
        "Witness script"
      );
      function getTxCacheValue(key, name, inputs, c) {
        if (!inputs.every(isFinalized))
          throw new Error(`PSBT must be finalized to calculate ${name}`);
        if (key === "__FEE_RATE" && c.__FEE_RATE) return c.__FEE_RATE;
        if (key === "__FEE" && c.__FEE) return c.__FEE;
        let tx;
        let mustFinalize = true;
        if (c.__EXTRACTED_TX) {
          tx = c.__EXTRACTED_TX;
          mustFinalize = false;
        } else {
          tx = c.__TX.clone();
        }
        inputFinalizeGetAmts(inputs, tx, c, mustFinalize);
        if (key === "__FEE_RATE") return c.__FEE_RATE;
        else if (key === "__FEE") return c.__FEE;
      }
      function getFinalScripts(inputIndex, input, script, isSegwit, isP2SH, isP2WSH) {
        const scriptType = classifyScript(script);
        if (!canFinalize(input, script, scriptType))
          throw new Error(`Can not finalize input #${inputIndex}`);
        return prepareFinalScripts(
          script,
          scriptType,
          input.partialSig,
          isSegwit,
          isP2SH,
          isP2WSH
        );
      }
      function prepareFinalScripts(script, scriptType, partialSig, isSegwit, isP2SH, isP2WSH) {
        let finalScriptSig;
        let finalScriptWitness;
        const payment = getPayment(script, scriptType, partialSig);
        const p2wsh = !isP2WSH ? null : payments.p2wsh({ redeem: payment });
        const p2sh = !isP2SH ? null : payments.p2sh({ redeem: p2wsh || payment });
        if (isSegwit) {
          if (p2wsh) {
            finalScriptWitness = (0, psbtutils_js_1.witnessStackToScriptWitness)(
              p2wsh.witness
            );
          } else {
            finalScriptWitness = (0, psbtutils_js_1.witnessStackToScriptWitness)(
              payment.witness
            );
          }
          if (p2sh) {
            finalScriptSig = p2sh.input;
          }
        } else {
          if (p2sh) {
            finalScriptSig = p2sh.input;
          } else {
            finalScriptSig = payment.input;
          }
        }
        return {
          finalScriptSig,
          finalScriptWitness
        };
      }
      function getHashAndSighashType(inputs, inputIndex, pubkey, cache, sighashTypes) {
        const input = (0, bip174_2.checkForInput)(inputs, inputIndex);
        const { hash, sighashType, script } = getHashForSig(
          inputIndex,
          input,
          cache,
          false,
          sighashTypes
        );
        checkScriptForPubkey(pubkey, script, "sign");
        return {
          hash,
          sighashType
        };
      }
      function getHashForSig(inputIndex, input, cache, forValidate, sighashTypes) {
        const unsignedTx = cache.__TX;
        const sighashType = input.sighashType || transaction_js_1.Transaction.SIGHASH_ALL;
        checkSighashTypeAllowed(sighashType, sighashTypes);
        let hash;
        let prevout;
        if (input.nonWitnessUtxo) {
          const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
            cache,
            input,
            inputIndex
          );
          const prevoutHash = unsignedTx.ins[inputIndex].hash;
          const utxoHash = nonWitnessUtxoTx.getHash();
          if (tools.compare(prevoutHash, utxoHash) !== 0) {
            throw new Error(
              `Non-witness UTXO hash for input #${inputIndex} doesn't match the hash specified in the prevout`
            );
          }
          const prevoutIndex = unsignedTx.ins[inputIndex].index;
          prevout = nonWitnessUtxoTx.outs[prevoutIndex];
        } else if (input.witnessUtxo) {
          prevout = input.witnessUtxo;
        } else {
          throw new Error("Need a Utxo input item for signing");
        }
        const { meaningfulScript, type } = getMeaningfulScript(
          prevout.script,
          inputIndex,
          "input",
          input.redeemScript,
          input.witnessScript
        );
        if (["p2sh-p2wsh", "p2wsh"].indexOf(type) >= 0) {
          hash = unsignedTx.hashForWitnessV0(
            inputIndex,
            meaningfulScript,
            prevout.value,
            sighashType
          );
        } else if ((0, psbtutils_js_1.isP2WPKH)(meaningfulScript)) {
          const signingScript = payments.p2pkh({
            hash: meaningfulScript.slice(2)
          }).output;
          hash = unsignedTx.hashForWitnessV0(
            inputIndex,
            signingScript,
            prevout.value,
            sighashType
          );
        } else {
          if (input.nonWitnessUtxo === void 0 && cache.__UNSAFE_SIGN_NONSEGWIT === false)
            throw new Error(
              `Input #${inputIndex} has witnessUtxo but non-segwit script: ${tools.toHex(meaningfulScript)}`
            );
          if (!forValidate && cache.__UNSAFE_SIGN_NONSEGWIT !== false)
            console.warn(
              "Warning: Signing non-segwit inputs without the full parent transaction means there is a chance that a miner could feed you incorrect information to trick you into paying large fees. This behavior is the same as Psbt's predecessor (TransactionBuilder - now removed) when signing non-segwit scripts. You are not able to export this Psbt with toBuffer|toBase64|toHex since it is not BIP174 compliant.\n*********************\nPROCEED WITH CAUTION!\n*********************"
            );
          hash = unsignedTx.hashForSignature(
            inputIndex,
            meaningfulScript,
            sighashType
          );
        }
        return {
          script: meaningfulScript,
          sighashType,
          hash
        };
      }
      function getAllTaprootHashesForSigValidation(inputIndex, input, inputs, cache) {
        const allPublicKeys = [];
        if (input.tapInternalKey) {
          const key = getPrevoutTaprootKey(inputIndex, input, cache);
          if (key) {
            allPublicKeys.push(key);
          }
        }
        if (input.tapScriptSig) {
          const tapScriptPubkeys = input.tapScriptSig.map((tss) => tss.pubkey);
          allPublicKeys.push(...tapScriptPubkeys);
        }
        const allHashes = allPublicKeys.map(
          (publicKey) => getTaprootHashesForSigValidation(
            inputIndex,
            input,
            inputs,
            publicKey,
            cache
          )
        );
        return allHashes.flat();
      }
      function getPrevoutTaprootKey(inputIndex, input, cache) {
        const { script } = getScriptAndAmountFromUtxo(inputIndex, input, cache);
        return (0, psbtutils_js_1.isP2TR)(script) ? script.subarray(2, 34) : null;
      }
      function trimTaprootSig(signature) {
        return signature.length === 64 ? signature : signature.subarray(0, 64);
      }
      function getTaprootHashesForSigning(inputIndex, input, inputs, pubkey, cache, tapLeafHashToSign, allowedSighashTypes) {
        const sighashType = input.sighashType || transaction_js_1.Transaction.SIGHASH_DEFAULT;
        checkSighashTypeAllowed(sighashType, allowedSighashTypes);
        const keySpend = Boolean(input.tapInternalKey && !tapLeafHashToSign);
        return getTaprootHashesForSig(
          inputIndex,
          input,
          inputs,
          pubkey,
          cache,
          keySpend,
          sighashType,
          tapLeafHashToSign
        );
      }
      function getTaprootHashesForSigValidation(inputIndex, input, inputs, pubkey, cache) {
        const sighashType = input.sighashType || transaction_js_1.Transaction.SIGHASH_DEFAULT;
        const keySpend = Boolean(input.tapKeySig);
        return getTaprootHashesForSig(
          inputIndex,
          input,
          inputs,
          pubkey,
          cache,
          keySpend,
          sighashType
        );
      }
      function getTaprootHashesForSig(inputIndex, input, inputs, pubkey, cache, keySpend, sighashType, tapLeafHashToSign) {
        const unsignedTx = cache.__TX;
        const prevOuts = inputs.map(
          (i, index) => getScriptAndAmountFromUtxo(index, i, cache)
        );
        const signingScripts = prevOuts.map((o) => o.script);
        const values = prevOuts.map((o) => o.value);
        const hashes = [];
        if (keySpend) {
          const outputKey = getPrevoutTaprootKey(inputIndex, input, cache) || Uint8Array.from([]);
          if (tools.compare((0, bip371_js_1.toXOnly)(pubkey), outputKey) === 0) {
            const tapKeyHash = unsignedTx.hashForWitnessV1(
              inputIndex,
              signingScripts,
              values,
              sighashType
            );
            hashes.push({ pubkey, hash: tapKeyHash });
          }
        }
        const tapLeafHashes = (input.tapLeafScript || []).filter(
          (tapLeaf) => (0, psbtutils_js_1.pubkeyInScript)(pubkey, tapLeaf.script)
        ).map((tapLeaf) => {
          const hash = (0, bip341_js_1.tapleafHash)({
            output: tapLeaf.script,
            version: tapLeaf.leafVersion
          });
          return Object.assign({ hash }, tapLeaf);
        }).filter(
          (tapLeaf) => !tapLeafHashToSign || tools.compare(tapLeafHashToSign, tapLeaf.hash) === 0
        ).map((tapLeaf) => {
          const tapScriptHash = unsignedTx.hashForWitnessV1(
            inputIndex,
            signingScripts,
            values,
            sighashType,
            tapLeaf.hash
          );
          return {
            pubkey,
            hash: tapScriptHash,
            leafHash: tapLeaf.hash
          };
        });
        return hashes.concat(tapLeafHashes);
      }
      function checkSighashTypeAllowed(sighashType, sighashTypes) {
        if (sighashTypes && sighashTypes.indexOf(sighashType) < 0) {
          const str = sighashTypeToString(sighashType);
          throw new Error(
            `Sighash type is not allowed. Retry the sign method passing the sighashTypes array of whitelisted types. Sighash type: ${str}`
          );
        }
      }
      function getPayment(script, scriptType, partialSig) {
        let payment;
        switch (scriptType) {
          case "multisig":
            const sigs = getSortedSigs(script, partialSig);
            payment = payments.p2ms({
              output: script,
              signatures: sigs
            });
            break;
          case "pubkey":
            payment = payments.p2pk({
              output: script,
              signature: partialSig[0].signature
            });
            break;
          case "pubkeyhash":
            payment = payments.p2pkh({
              output: script,
              pubkey: partialSig[0].pubkey,
              signature: partialSig[0].signature
            });
            break;
          case "witnesspubkeyhash":
            payment = payments.p2wpkh({
              output: script,
              pubkey: partialSig[0].pubkey,
              signature: partialSig[0].signature
            });
            break;
        }
        return payment;
      }
      function getScriptFromInput(inputIndex, input, cache) {
        const unsignedTx = cache.__TX;
        const res = {
          script: null,
          isSegwit: false,
          isP2SH: false,
          isP2WSH: false
        };
        res.isP2SH = !!input.redeemScript;
        res.isP2WSH = !!input.witnessScript;
        if (input.witnessScript) {
          res.script = input.witnessScript;
        } else if (input.redeemScript) {
          res.script = input.redeemScript;
        } else {
          if (input.nonWitnessUtxo) {
            const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
              cache,
              input,
              inputIndex
            );
            const prevoutIndex = unsignedTx.ins[inputIndex].index;
            res.script = nonWitnessUtxoTx.outs[prevoutIndex].script;
          } else if (input.witnessUtxo) {
            res.script = input.witnessUtxo.script;
          }
        }
        if (input.witnessScript || (0, psbtutils_js_1.isP2WPKH)(res.script)) {
          res.isSegwit = true;
        }
        return res;
      }
      function getSignersFromHD(inputIndex, inputs, hdKeyPair) {
        const input = (0, bip174_2.checkForInput)(inputs, inputIndex);
        if (!input.bip32Derivation || input.bip32Derivation.length === 0) {
          throw new Error("Need bip32Derivation to sign with HD");
        }
        const myDerivations = input.bip32Derivation.map((bipDv) => {
          if (tools.compare(bipDv.masterFingerprint, hdKeyPair.fingerprint) === 0) {
            return bipDv;
          } else {
            return;
          }
        }).filter((v) => !!v);
        if (myDerivations.length === 0) {
          throw new Error(
            "Need one bip32Derivation masterFingerprint to match the HDSigner fingerprint"
          );
        }
        const signers = myDerivations.map((bipDv) => {
          const node = hdKeyPair.derivePath(bipDv.path);
          if (tools.compare(bipDv.pubkey, node.publicKey) !== 0) {
            throw new Error("pubkey did not match bip32Derivation");
          }
          return node;
        });
        return signers;
      }
      function getSortedSigs(script, partialSig) {
        const p2ms = payments.p2ms({ output: script });
        return p2ms.pubkeys.map((pk) => {
          return (partialSig.filter((ps) => {
            return tools.compare(ps.pubkey, pk) === 0;
          })[0] || {}).signature;
        }).filter((v) => !!v);
      }
      function scriptWitnessToWitnessStack(buffer) {
        let offset = 0;
        function readSlice(n) {
          offset += n;
          return buffer.slice(offset - n, offset);
        }
        function readVarInt() {
          const vi = varuint.decode(buffer, offset);
          offset += varuint.encodingLength(vi.bigintValue);
          return vi.numberValue;
        }
        function readVarSlice() {
          return readSlice(readVarInt());
        }
        function readVector() {
          const count = readVarInt();
          const vector = [];
          for (let i = 0; i < count; i++) vector.push(readVarSlice());
          return vector;
        }
        return readVector();
      }
      function sighashTypeToString(sighashType) {
        let text = sighashType & transaction_js_1.Transaction.SIGHASH_ANYONECANPAY ? "SIGHASH_ANYONECANPAY | " : "";
        const sigMod = sighashType & 31;
        switch (sigMod) {
          case transaction_js_1.Transaction.SIGHASH_ALL:
            text += "SIGHASH_ALL";
            break;
          case transaction_js_1.Transaction.SIGHASH_SINGLE:
            text += "SIGHASH_SINGLE";
            break;
          case transaction_js_1.Transaction.SIGHASH_NONE:
            text += "SIGHASH_NONE";
            break;
        }
        return text;
      }
      function addNonWitnessTxCache(cache, input, inputIndex) {
        cache.__NON_WITNESS_UTXO_BUF_CACHE[inputIndex] = input.nonWitnessUtxo;
        const tx = transaction_js_1.Transaction.fromBuffer(input.nonWitnessUtxo);
        cache.__NON_WITNESS_UTXO_TX_CACHE[inputIndex] = tx;
        const self2 = cache;
        const selfIndex = inputIndex;
        delete input.nonWitnessUtxo;
        Object.defineProperty(input, "nonWitnessUtxo", {
          enumerable: true,
          get() {
            const buf = self2.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex];
            const txCache = self2.__NON_WITNESS_UTXO_TX_CACHE[selfIndex];
            if (buf !== void 0) {
              return buf;
            } else {
              const newBuf = txCache.toBuffer();
              self2.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex] = newBuf;
              return newBuf;
            }
          },
          set(data) {
            self2.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex] = data;
          }
        });
      }
      function inputFinalizeGetAmts(inputs, tx, cache, mustFinalize) {
        let inputAmount = 0n;
        inputs.forEach((input, idx) => {
          if (mustFinalize && input.finalScriptSig)
            tx.ins[idx].script = input.finalScriptSig;
          if (mustFinalize && input.finalScriptWitness) {
            tx.ins[idx].witness = scriptWitnessToWitnessStack(
              input.finalScriptWitness
            );
          }
          if (input.witnessUtxo) {
            inputAmount += input.witnessUtxo.value;
          } else if (input.nonWitnessUtxo) {
            const nwTx = nonWitnessUtxoTxFromCache(cache, input, idx);
            const vout = tx.ins[idx].index;
            const out = nwTx.outs[vout];
            inputAmount += out.value;
          }
        });
        const outputAmount = tx.outs.reduce((total, o) => total + o.value, 0n);
        const fee = inputAmount - outputAmount;
        if (fee < 0) {
          throw new Error("Outputs are spending more than Inputs");
        }
        const bytes = tx.virtualSize();
        cache.__FEE = fee;
        cache.__EXTRACTED_TX = tx;
        cache.__FEE_RATE = Math.floor(Number(fee / BigInt(bytes)));
      }
      function nonWitnessUtxoTxFromCache(cache, input, inputIndex) {
        const c = cache.__NON_WITNESS_UTXO_TX_CACHE;
        if (!c[inputIndex]) {
          addNonWitnessTxCache(cache, input, inputIndex);
        }
        return c[inputIndex];
      }
      function getScriptFromUtxo(inputIndex, input, cache) {
        const { script } = getScriptAndAmountFromUtxo(inputIndex, input, cache);
        return script;
      }
      function getScriptAndAmountFromUtxo(inputIndex, input, cache) {
        if (input.witnessUtxo !== void 0) {
          return {
            script: input.witnessUtxo.script,
            value: input.witnessUtxo.value
          };
        } else if (input.nonWitnessUtxo !== void 0) {
          const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
            cache,
            input,
            inputIndex
          );
          const o = nonWitnessUtxoTx.outs[cache.__TX.ins[inputIndex].index];
          return { script: o.script, value: o.value };
        } else {
          throw new Error("Can't find pubkey in input without Utxo data");
        }
      }
      function pubkeyInInput(pubkey, input, inputIndex, cache) {
        const script = getScriptFromUtxo(inputIndex, input, cache);
        const { meaningfulScript } = getMeaningfulScript(
          script,
          inputIndex,
          "input",
          input.redeemScript,
          input.witnessScript
        );
        return (0, psbtutils_js_1.pubkeyInScript)(pubkey, meaningfulScript);
      }
      function pubkeyInOutput(pubkey, output, outputIndex, cache) {
        const script = cache.__TX.outs[outputIndex].script;
        const { meaningfulScript } = getMeaningfulScript(
          script,
          outputIndex,
          "output",
          output.redeemScript,
          output.witnessScript
        );
        return (0, psbtutils_js_1.pubkeyInScript)(pubkey, meaningfulScript);
      }
      function redeemFromFinalScriptSig(finalScript) {
        if (!finalScript) return;
        const decomp = bscript.decompile(finalScript);
        if (!decomp) return;
        const lastItem = decomp[decomp.length - 1];
        if (!(lastItem instanceof Uint8Array) || isPubkeyLike(lastItem) || isSigLike(lastItem))
          return;
        const sDecomp = bscript.decompile(lastItem);
        if (!sDecomp) return;
        return lastItem;
      }
      function redeemFromFinalWitnessScript(finalScript) {
        if (!finalScript) return;
        const decomp = scriptWitnessToWitnessStack(finalScript);
        const lastItem = decomp[decomp.length - 1];
        if (isPubkeyLike(lastItem)) return;
        const sDecomp = bscript.decompile(lastItem);
        if (!sDecomp) return;
        return lastItem;
      }
      function compressPubkey(pubkey) {
        if (pubkey.length === 65) {
          const parity = pubkey[64] & 1;
          const newKey = pubkey.slice(0, 33);
          newKey[0] = 2 | parity;
          return newKey;
        }
        return pubkey.slice();
      }
      function isPubkeyLike(buf) {
        return buf.length === 33 && bscript.isCanonicalPubKey(buf);
      }
      function isSigLike(buf) {
        return bscript.isCanonicalScriptSignature(buf);
      }
      function getMeaningfulScript(script, index, ioType, redeemScript, witnessScript) {
        const isP2SH = (0, psbtutils_js_1.isP2SHScript)(script);
        const isP2SHP2WSH = isP2SH && redeemScript && (0, psbtutils_js_1.isP2WSHScript)(redeemScript);
        const isP2WSH = (0, psbtutils_js_1.isP2WSHScript)(script);
        if (isP2SH && redeemScript === void 0)
          throw new Error("scriptPubkey is P2SH but redeemScript missing");
        if ((isP2WSH || isP2SHP2WSH) && witnessScript === void 0)
          throw new Error(
            "scriptPubkey or redeemScript is P2WSH but witnessScript missing"
          );
        let meaningfulScript;
        if (isP2SHP2WSH) {
          meaningfulScript = witnessScript;
          checkRedeemScript(index, script, redeemScript, ioType);
          checkWitnessScript(index, redeemScript, witnessScript, ioType);
          checkInvalidP2WSH(meaningfulScript);
        } else if (isP2WSH) {
          meaningfulScript = witnessScript;
          checkWitnessScript(index, script, witnessScript, ioType);
          checkInvalidP2WSH(meaningfulScript);
        } else if (isP2SH) {
          meaningfulScript = redeemScript;
          checkRedeemScript(index, script, redeemScript, ioType);
        } else {
          meaningfulScript = script;
        }
        return {
          meaningfulScript,
          type: isP2SHP2WSH ? "p2sh-p2wsh" : isP2SH ? "p2sh" : isP2WSH ? "p2wsh" : "raw"
        };
      }
      function checkInvalidP2WSH(script) {
        if ((0, psbtutils_js_1.isP2WPKH)(script) || (0, psbtutils_js_1.isP2SHScript)(script)) {
          throw new Error("P2WPKH or P2SH can not be contained within P2WSH");
        }
      }
      function classifyScript(script) {
        if ((0, psbtutils_js_1.isP2WPKH)(script)) return "witnesspubkeyhash";
        if ((0, psbtutils_js_1.isP2PKH)(script)) return "pubkeyhash";
        if ((0, psbtutils_js_1.isP2MS)(script)) return "multisig";
        if ((0, psbtutils_js_1.isP2PK)(script)) return "pubkey";
        return "nonstandard";
      }
      function range(n) {
        return [...Array(n).keys()];
      }
    }
  });

  // node_modules/bitcoinjs-lib/src/cjs/index.cjs
  var require_cjs5 = __commonJS({
    "node_modules/bitcoinjs-lib/src/cjs/index.cjs"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function() {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.initEccLib = exports.Transaction = exports.opcodes = exports.toXOnly = exports.Psbt = exports.Block = exports.script = exports.payments = exports.networks = exports.crypto = exports.address = void 0;
      var address = __importStar(require_address());
      exports.address = address;
      var crypto = __importStar(require_crypto2());
      exports.crypto = crypto;
      var networks = __importStar(require_networks());
      exports.networks = networks;
      var payments = __importStar(require_payments());
      exports.payments = payments;
      var script = __importStar(require_script());
      exports.script = script;
      var block_js_1 = require_block();
      Object.defineProperty(exports, "Block", {
        enumerable: true,
        get: function() {
          return block_js_1.Block;
        }
      });
      var psbt_js_1 = require_psbt2();
      Object.defineProperty(exports, "Psbt", {
        enumerable: true,
        get: function() {
          return psbt_js_1.Psbt;
        }
      });
      Object.defineProperty(exports, "toXOnly", {
        enumerable: true,
        get: function() {
          return psbt_js_1.toXOnly;
        }
      });
      var ops_js_1 = require_ops();
      Object.defineProperty(exports, "opcodes", {
        enumerable: true,
        get: function() {
          return ops_js_1.OPS;
        }
      });
      var transaction_js_1 = require_transaction();
      Object.defineProperty(exports, "Transaction", {
        enumerable: true,
        get: function() {
          return transaction_js_1.Transaction;
        }
      });
      var ecc_lib_js_1 = require_ecc_lib();
      Object.defineProperty(exports, "initEccLib", {
        enumerable: true,
        get: function() {
          return ecc_lib_js_1.initEccLib;
        }
      });
    }
  });

  // public/js/derive_address_from_private_key_ui.js
  var axios = require_axios();
  var bitcoin = require_cjs5();
  document.addEventListener("DOMContentLoaded", () => {
    const privateKeyInput = document.getElementById("privateKey");
    const fromAddressInput = document.getElementById("fromAddress");
    const networkSelect = document.getElementById("network");
    const deriveAddress = async () => {
      const privateKeyHex = privateKeyInput.value.trim();
      const networkName = networkSelect.value;
      if (privateKeyHex.length === 64) {
        try {
          const network = networkName === "mainnet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
          const keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKeyHex, "hex"), { network });
          const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
          fromAddressInput.value = address;
        } catch (error) {
          fromAddressInput.value = "Invalid private key";
        }
      } else {
        fromAddressInput.value = "";
      }
    };
    privateKeyInput.addEventListener("input", deriveAddress);
    networkSelect.addEventListener("change", deriveAddress);
  });
})();
/*! Bundled license information:

axios/dist/browser/axios.cjs:
  (*! Axios v1.13.5 Copyright (c) 2026 Matt Zabriskie and contributors *)

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
