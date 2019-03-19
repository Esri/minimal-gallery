define(["dojo/io-query","esri/core/promiseUtils","esri/identity/IdentityManager","esri/portal/Portal","dojo/promise/all","esri/identity/OAuthInfo","dojo/_base/kernel","esri/config","esri/portal/PortalItem","esri/portal/PortalQueryParams","dojo/_base/declare","esri/core/accessorSupport/decorators","esri/widgets/Widget","esri/widgets/support/widget","dojo/Deferred","dojo/cookie","esri/core/requireUtils"], function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_23__, __WEBPACK_EXTERNAL_MODULE_25__, __WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_27__, __WEBPACK_EXTERNAL_MODULE_39__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = __webpack_require__(25);
var Component = /** @class */ (function () {
    function Component(store) {
        /** Child components defined in this component's render function */
        this.childComponents = {};
        /** Indicates whether a component needs to re-render, or can simply return precalculated vdom */
        this.dirty = true;
        this.store = store;
        this.props = store.getState();
        this.tsx = this.tsx.bind(this);
        this.updateProps = this.updateProps.bind(this);
        store.subscribe(this.updateProps);
    }
    /** tsx function required to render child components */
    Component.prototype.tsx = function (element, properties, children) {
        if (typeof element === "string") {
            return widget_1.tsx.apply(this, arguments);
        }
        else {
            if (properties && properties.key) {
                var child = this.childComponents[properties.key];
                if (child) {
                    if (child.dirty) {
                        child.renderResult = child.render();
                    }
                    return child.renderResult;
                }
                else {
                    this.childComponents[properties.key] = new element(properties.store ? newStore(__assign({}, properties.store, { parentWidget: this.store.parentWidget })) :
                        this.store, properties.key);
                    this.childComponents[properties.key].renderResult = this.childComponents[properties.key].render();
                    return this.childComponents[properties.key].renderResult;
                }
            }
            else {
                throw new Error("Custom components must each have a unique key property.");
            }
        }
    };
    /** Returns a VNode, needs to be implemented by component creator */
    Component.prototype.render = function () { };
    /** Called before a component's props are updated. */
    Component.prototype.componentWillReceiveProps = function (nextProps) { };
    /** Returns true by default. If false returned component will not re-render */
    Component.prototype.shouldComponentUpdate = function (nextProps) {
        return true;
    };
    /** Updates the private state of the component */
    Component.prototype.setState = function (newState) {
        this.state = __assign({}, this.state, newState);
        this.store.parentWidget.scheduleRender();
    };
    /** Dispatches an action to the component's store */
    Component.prototype.dispatch = function (action) {
        this.store.dispatch(action);
    };
    /** Used behind the scenes to sync a component's props with the current application state */
    Component.prototype.updateProps = function (nextProps) {
        this.componentWillReceiveProps(nextProps);
        this.dirty = this.shouldComponentUpdate(nextProps);
        this.props = nextProps;
    };
    return Component;
}());
exports.default = Component;
/** Creates a new store of application state */
function newStore(storeParams) {
    if (storeParams.middlewares) {
        return applyMiddleware.apply(void 0, storeParams.middlewares)(createStore)(storeParams.reducers, storeParams.parentWidget, storeParams.initialState);
    }
    return createStore(storeParams.reducers, storeParams.parentWidget, storeParams.initialState);
}
exports.newStore = newStore;
/** Combines reducers to allow composition */
function combineReducers(reducers) {
    var finalReducers = pick(reducers, function (val) { return typeof val === 'function'; });
    return function (state, action) {
        if (state === void 0) { state = {}; }
        return mapValues(finalReducers, function (reducer, key) { return reducer(state[key], action); });
    };
}
exports.combineReducers = combineReducers;
function createStore(reducers, parentWidget, initialState) {
    var state;
    if (initialState) {
        state = initialState;
    }
    var subscribers = [];
    var store = {
        parentWidget: parentWidget,
        dispatch: function (action) {
            state = reducers(state, action);
            subscribers.forEach(function (handler) { return handler(state); });
            parentWidget.scheduleRender();
        },
        subscribe: function (handler) {
            subscribers.push(handler);
            return function unsubscribe() {
                var index = subscribers.indexOf(handler);
                subscribers.splice(index, 1);
            };
        },
        getState: function () {
            return state;
        }
    };
    store.dispatch({ type: "INITIALIZE" });
    return store;
}
function applyMiddleware() {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return function (next) { return function (reducer, parentWidget, initialState) {
        var store = next(reducer, parentWidget, initialState);
        var dispatch = store.dispatch;
        var chain = [];
        chain = middlewares.map(function (middleware) { return middleware({
            getState: store.getState,
            dispatch: function (action) { return dispatch(action); }
        }); });
        dispatch = compose.apply(void 0, chain)(store.dispatch);
        return __assign({}, store, { dispatch: dispatch });
    }; };
}
function compose() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    return function (arg) { return funcs.reduceRight(function (composed, f) { return f(composed); }, arg); };
}
function mapValues(obj, fn) {
    return Object.keys(obj).reduce(function (result, key) {
        result[key] = fn(obj[key], key);
        return result;
    }, {});
}
function pick(obj, fn) {
    return Object.keys(obj).reduce(function (result, key) {
        if (fn(obj[key])) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}
/** Available Redux middlewares */
exports.middlewares = {
    /** Asynchronous control flow using thunks */
    thunk: function (params) { return function (next) { return function (action) {
        if (typeof action === "function") {
            return action(params.dispatch, params.getState);
        }
        return next(action);
    }; }; },
    /** Log dispatch and next state to the console */
    debug: function (params) { return function (next) { return function (action) {
        console.log(action.type, action);
        var result = next(action);
        console.log('next state', params.getState());
        return result;
    }; }; },
    /** Send actions and resulting state to a listener */
    addListener: function (listener) {
        return function (params) { return function (next) { return function (action) {
            var result = next(action);
            listener(action, params.getState());
            return result;
        }; }; };
    }
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(3);
exports.SAVE_APP_BASE_RESULT = base_1.SAVE_APP_BASE_RESULT;
exports.LOAD_APP_FAIL = base_1.LOAD_APP_FAIL;
exports.LOAD_APP_PROGRESS = base_1.LOAD_APP_PROGRESS;
exports.LOAD_APP_SUCCESS = base_1.LOAD_APP_SUCCESS;
exports.loadApplicationBase = base_1.loadApplicationBase;
var items_1 = __webpack_require__(28);
exports.UPDATE_ITEMS = items_1.UPDATE_ITEMS;
exports.FILTER_ITEMS = items_1.FILTER_ITEMS;
exports.filterItems = items_1.filterItems;
exports.updateItems = items_1.updateItems;
var router_1 = __webpack_require__(29);
exports.PUSH = router_1.PUSH;
exports.HASH_CHANGE = router_1.HASH_CHANGE;
exports.push = router_1.push;
exports.hashChange = router_1.hashChange;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAVE_APP_BASE_RESULT = "SAVE_APP_BASE_RESULT";
exports.LOAD_APP_FAIL = "LOAD_APP_FAIL";
exports.LOAD_APP_PROGRESS = "LOAD_APP_PROGRESS";
exports.LOAD_APP_SUCCESS = "LOAD_APP_FINISH";
exports.AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED";
var all = __webpack_require__(9);
var Deferred = __webpack_require__(26);
var IdentityManager = __webpack_require__(7);
var Portal = __webpack_require__(8);
var cookie = __webpack_require__(27);
var _1 = __webpack_require__(1);
var supportedItemTypes_1 = __webpack_require__(4);
exports.loadApplicationBase = function () { return function (dispatch, getState) {
    var base = getState().base;
    base.applicationBase.load().then(function (result) { return dispatch(exports.queryGroupItems(result)); }, function (err) {
        if (err === "identity-manager:not-authorized") {
            dispatch(loadAppNoAuth(err));
        }
        else {
            dispatch(loadAppFail(err));
        }
    }, function (progress) { return dispatch(loadAppProgress(progress)); });
}; };
exports.updateApplicationBase = function (applicationBaseResult) {
    return function (dispatch) {
        dispatch({ type: exports.SAVE_APP_BASE_RESULT, payload: applicationBaseResult });
        dispatch(exports.queryGroupItems(applicationBaseResult));
    };
};
exports.queryGroupItems = function (applicationBaseResult) {
    return function (dispatch, getState) {
        // Boilerplate loaded properly so save it
        dispatch(saveAppBaseResult(applicationBaseResult));
        var state = getState();
        var applicationBase = state.base.applicationBase;
        var config = applicationBaseResult.config;
        // Inject custom stylesheet if provided
        if (config.customCSS && config.customCSS !== "") {
            var customStyle = document.createElement("style");
            customStyle.innerHTML = config.customCSS;
            document.body.appendChild(customStyle);
        }
        fetchAllGroupItems(applicationBase, config).then(function (response) {
            var promises = response.results.map(function (item) { return item.load(); });
            all(promises).then(function (items) {
                var hash = state.router.hash;
                dispatch(_1.updateItems(items.filter(function (item) { return supportedItemTypes_1.default[item.type]; })));
                dispatch(_1.hashChange(window.location.hash.slice(1)));
                dispatch(loadAppSuccess());
            }, function (err) { return dispatch(loadAppFail(err)); });
        }, function (err) { return dispatch(loadAppFail(err)); });
    };
};
var fetchAllGroupItems = function (applicationBase, config) {
    var dfd = new Deferred;
    applicationBase.queryGroupItems(config.group, {
        num: 100,
        sortField: (config.sortField ? config.sortField : "numviews"),
        sortOrder: (config.sortOrder ? config.sortOrder : "desc"),
        start: 0
    }).then(function (response) {
        if (response.total > response.results.length) {
            var mappableArr = Array.apply(null, { length: Math.floor(response.total / 100) });
            var promises = mappableArr.map(function (c, i) { return (applicationBase.queryGroupItems(config.group, {
                num: 100,
                sortField: (config.sortField ? config.sortField : "numviews"),
                sortOrder: (config.sortOrder ? config.sortOrder : "desc"),
                start: 100 + (i * 100)
            })); });
            all(promises).then(function (responses) {
                var allItems = responses.reduce(function (p, c) {
                    p.results = p.results.concat(c.results);
                    return p;
                }, { results: response.results });
                dfd.resolve(allItems);
            }, function (err) {
                dfd.reject(err);
            });
        }
        else {
            dfd.resolve(response);
        }
    }, function (err) {
        dfd.reject(err);
    });
    return dfd;
};
exports.signIn = function () { return function (dispatch, getState) {
    var state = getState();
    var portal = new Portal({ url: state.base.applicationBase.portal.url });
    portal.authMode = "immediate";
    portal.load().then(function () {
        dispatch(exports.updateApplicationBase(__assign({}, state.base.applicationBaseResult, { portal: portal })));
    });
}; };
exports.signOut = function () { return function (dispatch, getState) {
    IdentityManager.destroyCredentials();
    cookie("esri_auth", undefined, {
        path: "/",
        domain: ".arcgis.com",
        expires: -1
    });
    cookie("esri_auth", undefined, {
        path: "/",
        domain: "." + document.domain,
        expires: -1
    });
    var state = getState();
    var portal = new Portal({ url: state.base.applicationBase.portal.url });
    portal.authMode = "auto";
    portal.load().then(function () {
        portal.user = null;
        dispatch(exports.updateApplicationBase(__assign({}, state.base.applicationBaseResult, { portal: portal })));
    });
}; };
var saveAppBaseResult = function (applicationBaseResult) { return ({
    type: exports.SAVE_APP_BASE_RESULT,
    payload: applicationBaseResult
}); };
var loadAppFail = function (err) { return ({
    type: exports.LOAD_APP_FAIL,
    payload: err
}); };
var loadAppNoAuth = function (err) { return ({
    type: exports.AUTHENTICATION_FAILED,
    payload: err
}); };
var loadAppProgress = function (progress) { return ({
    type: exports.LOAD_APP_PROGRESS,
    payload: progress.status
}); };
var loadAppSuccess = function () { return ({
    type: exports.LOAD_APP_SUCCESS
}); };


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fileTypes = {
    "360 VR Experience": "file",
    "App Builder Extension": "file",
    "Application": "file",
    "ArcGIS Pro Add In": "file",
    "ArcGIS Pro Configuration": "file",
    "ArcPad Package": "file",
    "CAD Drawing": "file",
    "CSV": "file",
    "CSV Collection": "file",
    "CityEngine Web Scene": "file",
    "Code Sample": "file",
    "Dashboard": "file",
    "Desktop Add In": "file",
    "Desktop Application": "file",
    "Desktop Application Template": "file",
    "Desktop Style": "file",
    "Document Link": "file",
    "Explorer Add In": "file",
    "Explorer Layer": "file",
    "Explorer Map": "file",
    "Feature Collection": "file",
    "Feature Service": "file",
    "File Geodatabase": "file",
    "GeoJson": "file",
    "Geocoding Service": "file",
    "Geodata Service": "file",
    "Geometry Service": "file",
    "Geoprocessing Package": "file",
    "Geoprocessing Sample": "file",
    "Geoprocessing Service": "file",
    "Globe Document": "file",
    "Globe Service": "file",
    "Image": "file",
    "Image Collection": "file",
    "Image Service": "file",
    "Insights Workbook": "file",
    "KML": "file",
    "KML Collection": "file",
    "Layer": "file",
    "Layer Package": "file",
    "Layout": "file",
    "Locator Package": "file",
    "Map Document": "file",
    "Map Package": "file",
    "Map Service": "file",
    "Map Template": "file",
    "Microsoft Excel": "file",
    "Microsoft Powerpoint": "file",
    "Microsoft Word": "file",
    "Mobile Application": "file",
    "Mobile Basemap Package": "file",
    "Mobile Map Package": "file",
    "Network Analysis Service": "file",
    "Operations Dashboard Add In": "file",
    "Operations Dashboard Extension": "file",
    "PDF": "file",
    "Pro Map": "file",
    "Project Package": "file",
    "Project Template": "file",
    "Published Map": "file",
    "Raster function template": "file",
    "Rule Package": "file",
    "Scene Document": "file",
    "Scene Package": "file",
    "Scene Service": "file",
    "Service Definition": "file",
    "Shapefile": "file",
    "Stream Service": "file",
    "Task File": "file",
    "Visio Document": "file",
    "WFS": "file",
    "WMS": "file",
    "WMTS": "file",
    "Windows Mobile Package": "file",
    "Windows Viewer Add In": "file",
    "Workflow Manager Service": "file",
    "iWork Keynote": "file",
    "iWork Numbers": "file",
    "iWork Pages": "file",
    "Form": "file",
    "Workforce Project": "file"
};
exports.default = __assign({}, fileTypes, { "Web Map": "webmap", "Web Mapping Application": "webapp", "Web Scene": "webscene", "Dashboard": "webapp" });


/***/ }),
/* 5 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOW_IN_VIEWER = "SHOW_IN_VIEWER";
exports.SHOW_FULLSCREEN = "SHOW_FULLSCREEN";
exports.MOUSE_OVER = "MOUSE_OVER";
exports.MOUSE_OUT = "MOUSE_OUT";
exports.VIEWER_CHANGE = "VIEWER_CHANGE";
exports.showInViewer = function () { return ({
    type: exports.SHOW_IN_VIEWER
}); };
exports.showFullscreen = function () { return ({
    type: exports.SHOW_FULLSCREEN
}); };
exports.mouseOver = function () { return ({
    type: exports.MOUSE_OVER
}); };
exports.mouseOut = function () { return ({
    type: exports.MOUSE_OUT
}); };


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var _reducers_1 = __webpack_require__(38);
exports.reducers = _reducers_1.reducers;
var all = __webpack_require__(9);
var promiseUtils = __webpack_require__(6);
var requireUtils = __webpack_require__(39);
var widgetKey = {
    compassWidget: "esri/widgets/Compass",
    homeWidget: "esri/widgets/Home",
    legendWidget: "esri/widgets/Legend",
    locateWidget: "esri/widgets/Locate",
    searchWidget: "esri/widgets/Search"
};
var ViewBase = /** @class */ (function (_super) {
    __extends(ViewBase, _super);
    function ViewBase(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            status: "loading",
            loadText: "scripts"
        };
        _this.loadScripts = _this.loadScripts.bind(_this);
        _this.loadMap = _this.loadMap.bind(_this);
        _this.loadWidgets = _this.loadWidgets.bind(_this);
        _this.loadScripts.bind(_this)();
        return _this;
    }
    ViewBase.prototype.render = function () {
        var tsx = this.tsx;
        if (this.state.status === "loaded") {
            return tsx("div", null);
        }
        else if (this.state.status === "loading") {
            return (tsx("div", null,
                tsx("div", { class: "loader is-active padding-leader-3 padding-trailer-3 center-style" },
                    tsx("div", { class: "loader-bars" }),
                    tsx("div", { class: "loader-text" }, this.props.i18n.viewLoading[this.state.loadText]))));
        }
        return (tsx("div", null,
            tsx("h3", { class: "center-style" }, this.props.i18n.viewLoading.failed)));
    };
    ViewBase.prototype.loadScripts = function () {
        var _this = this;
        requireUtils.when(window["require"], [this.props.webModule, this.props.viewModule])
            .then(function (_a) {
            var WebConstructor = _a[0], ViewConstructor = _a[1];
            _this.setState({ loadText: "map" });
            _this.loadMap(WebConstructor, ViewConstructor);
        }, function (err) {
            _this.setState({ status: "failed" });
        });
    };
    ViewBase.prototype.loadMap = function (WebConstructor, ViewConstructor) {
        var _this = this;
        var view;
        var map = new WebConstructor({
            portalItem: {
                id: this.props.id
            }
        });
        map.load().then(function () {
            _this.setState({ loadText: "basemap" });
            return map.basemap.load();
        }).then(function () {
            _this.setState({ loadText: "layers" });
            var allLayers = map.allLayers;
            var promises = allLayers.map(function (layer) { return layer.load(); });
            return all(promises.toArray());
        }).then(function (layers) {
            _this.setState({ loadText: "widgets" });
            view = new ViewConstructor({
                container: _this.props.containerId,
                map: map
            });
            return _this.loadWidgets(view);
        }).then(function () {
            view.container = _this.props.containerId;
            _this.setState({ status: "loaded" });
        }).otherwise(function (err) {
            _this.setState({ status: "failed" });
        });
    };
    ViewBase.prototype.loadWidgets = function (view) {
        var _this = this;
        var positions = {
            "bottom-left": true,
            "bottom-right": true,
            "top-left": true,
            "top-right": true
        };
        var modules = Object.keys(this.props.widgets).reduce(function (p, c, i) {
            if (positions[_this.props.widgets[c]]) {
                p.push({
                    module: widgetKey[c],
                    position: _this.props.widgets[c]
                }); // typescript is weird
            }
            return p;
        }, []);
        return requireUtils.when(window["require"], modules.map(function (item) { return item["module"]; }))
            .then(function (constructors) {
            constructors.forEach(function (Constructor, i) {
                var widget = new Constructor({ view: view });
                if (widget.activeLayerInfos) {
                    widget.watch("activeLayerInfos.length", function () {
                        view.ui.add(widget, modules[i]["position"]);
                    });
                    return;
                }
                view.ui.add(widget, modules[i]["position"]);
            });
            return promiseUtils.resolve();
        });
    };
    return ViewBase;
}(Component_1.default));
exports.default = ViewBase;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var ApplicationBase = __webpack_require__(13);
var Widget_1 = __webpack_require__(21);
module.exports = function (applicationConfigJSON, boilerplateConfigJSON, i18n) {
    var config = JSON.parse(applicationConfigJSON);
    var settings = JSON.parse(boilerplateConfigJSON);
    var boilerplate = new ApplicationBase({ config: config, settings: settings });
    var MainComponent = new Widget_1.default({ boilerplate: boilerplate, i18n: i18n });
    MainComponent.container = "viewDiv";
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
  Copyright 2017 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(15), __webpack_require__(16), __webpack_require__(6), __webpack_require__(7), __webpack_require__(14), __webpack_require__(8), __webpack_require__(17), __webpack_require__(18), __webpack_require__(19)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, kernel, esriConfig, promiseUtils, IdentityManager, OAuthInfo, Portal, PortalItem, PortalQueryParams, declareDecorator_1) {
    "use strict";
    var defaultConfig = {
        portalUrl: "https://www.arcgis.com",
        helperServices: {
            geometry: {},
            printTask: {},
            elevationSync: {},
            geocode: []
        }
    };
    var defaultSettings = {
        environment: {},
        group: {},
        localStorage: {},
        portal: {},
        rightToLeftLocales: ["ar", "he"],
        urlParams: [],
        webMap: {},
        webScene: {}
    };
    var ApplicationBase = /** @class */ (function () {
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function ApplicationBase(options) {
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  settings
            //----------------------------------
            this.settings = defaultSettings;
            //----------------------------------
            //  config
            //----------------------------------
            this.config = defaultConfig;
            //----------------------------------
            //  results
            //----------------------------------
            this.results = {};
            //----------------------------------
            //  portal
            //----------------------------------
            this.portal = null;
            //----------------------------------
            //  direction
            //----------------------------------
            this.direction = null;
            //----------------------------------
            //  locale
            //----------------------------------
            this.locale = kernel.locale;
            //----------------------------------
            //  units
            //----------------------------------
            this.units = null;
            var config = options.config, settings = options.settings;
            var applicationConfig = typeof config === "string"
                ? JSON.parse(config)
                : config;
            var applicationBaseSettings = typeof settings === "string"
                ? JSON.parse(settings)
                : settings;
            var configMixin = __assign({}, defaultConfig, applicationConfig);
            var settingsMixin = __assign({}, defaultSettings, applicationBaseSettings);
            this._mixinSettingsDefaults(settingsMixin);
            this.config = configMixin;
            this.settings = settingsMixin;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        ApplicationBase.prototype.queryGroupItems = function (groupId, itemParams, portal) {
            if (!portal || !groupId) {
                portal = this.portal;
            }
            var defaultGroup = this.settings.group.default;
            groupId = this._getDefaultId(groupId, defaultGroup);
            var paramOptions = __assign({ query: "group:\"" + groupId + "\" AND -type:\"Code Attachment\"", sortField: "modified", sortOrder: "desc", num: 9, start: 1 }, itemParams);
            var params = new PortalQueryParams(paramOptions);
            return portal.queryItems(params);
        };
        ApplicationBase.prototype.load = function () {
            var _this = this;
            var settings = this.settings;
            var environmentSettings = settings.environment, groupSettings = settings.group, localStorageSettings = settings.localStorage, portalSettings = settings.portal, webMapSettings = settings.webMap, websceneSettings = settings.webScene, urlParamsSettings = settings.urlParams;
            var isEsri = environmentSettings.isEsri;
            var urlParams = this._getUrlParamValues(urlParamsSettings);
            this.results.urlParams = urlParams;
            this.config = this._mixinAllConfigs({
                config: this.config,
                url: urlParams
            });
            if (isEsri) {
                var esriPortalUrl = this._getEsriEnvironmentPortalUrl();
                this.config.portalUrl = esriPortalUrl;
                this.config.proxyUrl = this._getEsriEnvironmentProxyUrl(esriPortalUrl);
            }
            var _a = this.config, portalUrl = _a.portalUrl, proxyUrl = _a.proxyUrl, oauthappid = _a.oauthappid, appid = _a.appid;
            this._setPortalUrl(portalUrl);
            this._setProxyUrl(proxyUrl);
            var rtlLocales = this.settings.rightToLeftLocales;
            this.direction = this._getLanguageDirection(rtlLocales);
            this._registerOauthInfos(oauthappid, portalUrl);
            var sharingUrl = portalUrl + "/sharing";
            var loadApplicationItem = appid
                ? this._loadItem(appid)
                : promiseUtils.resolve();
            var checkAppAccess = IdentityManager.checkAppAccess(sharingUrl, oauthappid).always(function (response) { return response; });
            var fetchApplicationData = appid
                ? loadApplicationItem.then(function (itemInfo) {
                    return itemInfo instanceof PortalItem
                        ? itemInfo.fetchData()
                        : undefined;
                })
                : promiseUtils.resolve();
            var loadPortal = portalSettings.fetch
                ? new Portal().load()
                : promiseUtils.resolve();
            return promiseUtils
                .eachAlways([loadApplicationItem, fetchApplicationData, loadPortal, checkAppAccess])
                .always(function (applicationArgs) {
                var applicationItemResponse = applicationArgs[0], applicationDataResponse = applicationArgs[1], portalResponse = applicationArgs[2], checkAppAccessResponse = applicationArgs[3];
                var applicationItem = applicationItemResponse
                    ? applicationItemResponse.value
                    : null;
                var applicationData = applicationDataResponse
                    ? applicationDataResponse.value
                    : null;
                var localStorage = localStorageSettings.fetch
                    ? _this._getLocalConfig(appid)
                    : null;
                var appAccess = checkAppAccessResponse ? checkAppAccessResponse.value : null;
                if (applicationItem && applicationItem.access && applicationItem.access !== "public") {
                    // do we have permission to access app
                    if (appAccess && appAccess.name && appAccess.name === "identity-manager:not-authorized") {
                        //identity-manager:not-authorized, identity-manager:not-authenticated, identity-manager:invalid-request
                        return promiseUtils.reject(appAccess.name);
                    }
                }
                else if (applicationItemResponse.error) {
                    return promiseUtils.reject(applicationItemResponse.error);
                }
                _this.results.localStorage = localStorage;
                _this.results.applicationItem = applicationItemResponse;
                _this.results.applicationData = applicationDataResponse;
                var applicationConfig = applicationData
                    ? applicationData.values
                    : null;
                var portal = portalResponse ? portalResponse.value : null;
                _this.portal = portal;
                _this.units = _this._getUnits(portal);
                _this.config = _this._mixinAllConfigs({
                    config: _this.config,
                    url: urlParams,
                    local: localStorage,
                    application: applicationConfig
                });
                _this._setGeometryService(_this.config, portal);
                var _a = _this.config, webmap = _a.webmap, webscene = _a.webscene, group = _a.group;
                var webMapPromises = [];
                var webScenePromises = [];
                var groupInfoPromises = [];
                var groupItemsPromises = [];
                var isWebMapEnabled = webMapSettings.fetch && webmap;
                var isWebSceneEnabled = websceneSettings.fetch && webscene;
                var isGroupInfoEnabled = groupSettings.fetchInfo && group;
                var isGroupItemsEnabled = groupSettings.fetchItems && group;
                var itemParams = groupSettings.itemParams;
                var defaultWebMap = webMapSettings.default;
                var defaultWebScene = websceneSettings.default;
                var defaultGroup = groupSettings.default;
                var fetchMultipleWebmaps = webMapSettings.fetchMultiple;
                var fetchMultipleWebscenes = websceneSettings.fetchMultiple;
                var fetchMultipleGroups = groupSettings.fetchMultiple;
                if (isWebMapEnabled) {
                    var webMaps = _this._getPropertyArray(webmap);
                    var allowedWebmaps = _this._limitItemSize(webMaps, fetchMultipleWebmaps);
                    allowedWebmaps.forEach(function (id) {
                        var webMapId = _this._getDefaultId(id, defaultWebMap);
                        webMapPromises.push(_this._loadItem(webMapId));
                    });
                }
                if (isWebSceneEnabled) {
                    var webScenes = _this._getPropertyArray(webscene);
                    var allowedWebsenes = _this._limitItemSize(webScenes, fetchMultipleWebscenes);
                    allowedWebsenes.forEach(function (id) {
                        var webSceneId = _this._getDefaultId(id, defaultWebScene);
                        webScenePromises.push(_this._loadItem(webSceneId));
                    });
                }
                if (isGroupInfoEnabled) {
                    var groups = _this._getPropertyArray(group);
                    var allowedGroups = _this._limitItemSize(groups, fetchMultipleGroups);
                    allowedGroups.forEach(function (id) {
                        var groupId = _this._getDefaultId(id, defaultGroup);
                        groupInfoPromises.push(_this._queryGroupInfo(groupId, portal));
                    });
                }
                if (isGroupItemsEnabled) {
                    var groups = _this._getPropertyArray(group);
                    groups.forEach(function (id) {
                        groupItemsPromises.push(_this.queryGroupItems(id, itemParams, portal));
                    });
                }
                var promises = {
                    webMap: webMapPromises
                        ? promiseUtils.eachAlways(webMapPromises)
                        : promiseUtils.resolve(),
                    webScene: webScenePromises
                        ? promiseUtils.eachAlways(webScenePromises)
                        : promiseUtils.resolve(),
                    groupInfo: groupInfoPromises
                        ? promiseUtils.eachAlways(groupInfoPromises)
                        : promiseUtils.resolve(),
                    groupItems: groupItemsPromises
                        ? promiseUtils.eachAlways(groupItemsPromises)
                        : promiseUtils.resolve()
                };
                return promiseUtils.eachAlways(promises).always(function (itemArgs) {
                    var webMapResponses = itemArgs.webMap.value;
                    var webSceneResponses = itemArgs.webScene.value;
                    var groupInfoResponses = itemArgs.groupInfo.value;
                    var groupItemsResponses = itemArgs.groupItems.value;
                    var itemInfo = applicationItem ? applicationItem.itemInfo : null;
                    _this._overwriteItemsExtent(webMapResponses, itemInfo);
                    _this._overwriteItemsExtent(webSceneResponses, itemInfo);
                    _this.results.webMapItems = webMapResponses;
                    _this.results.webSceneItems = webSceneResponses;
                    _this.results.groupInfos = groupInfoResponses;
                    _this.results.groupItems = groupItemsResponses;
                    return _this;
                });
            });
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        ApplicationBase.prototype._mixinSettingsDefaults = function (settings) {
            var userEnvironmentSettings = settings.environment;
            var userLocalStorageSettings = settings.localStorage;
            var userGroupSettings = settings.group;
            var userPortalSettings = settings.portal;
            var userWebmapSettings = settings.webMap;
            var userWebsceneSettings = settings.webScene;
            settings.environment = __assign({ isEsri: false, webTierSecurity: false }, userEnvironmentSettings);
            settings.localStorage = __assign({ fetch: true }, userLocalStorageSettings);
            var itemParams = {
                sortField: "modified",
                sortOrder: "desc",
                num: 9,
                start: 0
            };
            settings.group = __assign({ default: "908dd46e749d4565a17d2b646ace7b1a", fetchInfo: true, fetchItems: true, fetchMultiple: true, itemParams: itemParams }, userGroupSettings);
            settings.portal = __assign({ fetch: true }, userPortalSettings);
            settings.webMap = __assign({ default: "1970c1995b8f44749f4b9b6e81b5ba45", fetch: true, fetchMultiple: true }, userWebmapSettings);
            settings.webScene = __assign({ default: "e8f078ba0c1546b6a6e0727f877742a5", fetch: true, fetchMultiple: true }, userWebsceneSettings);
        };
        ApplicationBase.prototype._limitItemSize = function (items, allowMultiple) {
            var firstItem = items[0];
            return allowMultiple ? items : firstItem ? [firstItem] : [];
        };
        ApplicationBase.prototype._getPropertyArray = function (property) {
            if (typeof property === "string") {
                return property.split(",");
            }
            if (Array.isArray(property)) {
                return property;
            }
            return [];
        };
        ApplicationBase.prototype._getEsriEnvironmentPortalUrl = function () {
            var pathname = location.pathname;
            var esriAppsPath = "/apps/";
            var esriHomePath = "/home/";
            var esriAppsPathIndex = pathname.indexOf(esriAppsPath);
            var esriHomePathIndex = pathname.indexOf(esriHomePath);
            var isEsriAppsPath = esriAppsPathIndex !== -1;
            var isEsriHomePath = esriHomePathIndex !== -1;
            var appLocationIndex = isEsriAppsPath
                ? esriAppsPathIndex
                : isEsriHomePath
                    ? esriHomePathIndex
                    : undefined;
            if (appLocationIndex === undefined) {
                return;
            }
            var portalInstance = pathname.substr(0, appLocationIndex);
            var host = location.host;
            return "https://" + host + portalInstance;
        };
        ApplicationBase.prototype._getEsriEnvironmentProxyUrl = function (portalUrl) {
            if (!portalUrl) {
                return;
            }
            return portalUrl + "/sharing/proxy";
        };
        ApplicationBase.prototype._getUnits = function (portal) {
            var USRegion = "US";
            var USLocale = "en-us";
            var user = portal.user;
            var userRegion = user && user.region;
            var userUnits = user && user.units;
            var responseUnits = portal.units;
            var responseRegion = portal.region;
            var ipCountryCode = portal.ipCntryCode;
            var isEnglishUnits = userRegion === USRegion ||
                (userRegion && responseRegion === USRegion) ||
                (userRegion && !responseRegion) ||
                (!user && ipCountryCode === USRegion) ||
                (!user && !ipCountryCode && kernel.locale === USLocale);
            var units = userUnits
                ? userUnits
                : responseUnits
                    ? responseUnits
                    : isEnglishUnits
                        ? "english"
                        : "metric";
            return units;
        };
        ApplicationBase.prototype._queryGroupInfo = function (groupId, portal) {
            var params = new PortalQueryParams({
                query: "id:\"" + groupId + "\""
            });
            return portal.queryGroups(params);
        };
        ApplicationBase.prototype._loadItem = function (id) {
            var item = new PortalItem({
                id: id
            });
            return item.load();
        };
        ApplicationBase.prototype._getLocalConfig = function (appid) {
            if (!window.localStorage || !appid) {
                return;
            }
            var lsItemId = "application_base_config_" + appid;
            var lsItem = localStorage.getItem(lsItemId);
            var localConfig = lsItem && JSON.parse(lsItem);
            return localConfig;
        };
        ApplicationBase.prototype._overwriteItemsExtent = function (responses, applicationItem) {
            var _this = this;
            if (!responses) {
                return;
            }
            responses.forEach(function (response) {
                var value = response.value;
                if (value) {
                    _this._overwriteItemExtent(value, applicationItem);
                }
            });
        };
        ApplicationBase.prototype._overwriteItemExtent = function (item, applicationItem) {
            if (!item || !applicationItem) {
                return;
            }
            var applicationExtent = applicationItem.extent;
            item.extent = applicationExtent ? applicationExtent : item.extent;
        };
        ApplicationBase.prototype._getDefaultId = function (id, defaultId) {
            var defaultUrlParam = "default";
            var trimmedId = id ? id.trim() : "";
            var useDefaultId = (!trimmedId || trimmedId === defaultUrlParam) && defaultId;
            return useDefaultId ? defaultId : id;
        };
        ApplicationBase.prototype._getLanguageDirection = function (rtlLocales) {
            if (rtlLocales === void 0) { rtlLocales = ["ar", "he"]; }
            var isRTL = rtlLocales.some(function (language) {
                return kernel.locale.indexOf(language) !== -1;
            });
            return isRTL ? "rtl" : "ltr";
        };
        ApplicationBase.prototype._mixinAllConfigs = function (params) {
            var config = params.config || null;
            var appConfig = params.application || null;
            var localConfig = params.local || null;
            var urlConfig = params.url || null;
            return __assign({}, config, appConfig, localConfig, urlConfig);
        };
        ApplicationBase.prototype._setGeometryService = function (config, portal) {
            var configHelperServices = config.helperServices;
            var anyPortal = portal;
            var portalHelperServices = anyPortal && anyPortal.helperServices;
            var configGeometryUrl = configHelperServices &&
                configHelperServices.geometry &&
                configHelperServices.geometry.url;
            var portalGeometryUrl = portalHelperServices &&
                portalHelperServices.geometry &&
                portalHelperServices.geometry.url;
            var geometryServiceUrl = portalGeometryUrl || configGeometryUrl;
            if (!geometryServiceUrl) {
                return;
            }
            esriConfig.geometryServiceUrl = geometryServiceUrl;
        };
        ApplicationBase.prototype._setPortalUrl = function (portalUrl) {
            if (!portalUrl) {
                return;
            }
            esriConfig.portalUrl = portalUrl;
        };
        ApplicationBase.prototype._setProxyUrl = function (proxyUrl) {
            if (!proxyUrl) {
                return;
            }
            esriConfig.request.proxyUrl = proxyUrl;
        };
        ApplicationBase.prototype._registerOauthInfos = function (appId, portalUrl) {
            if (!appId) {
                return;
            }
            var info = new OAuthInfo({
                appId: appId,
                portalUrl: portalUrl,
                popup: true
            });
            if (!info) {
                return;
            }
            IdentityManager.registerOAuthInfos([info]);
        };
        ApplicationBase.prototype._getUrlParamValues = function (urlParams) {
            var _this = this;
            var urlObject = this._urlToObject();
            var formattedUrlObject = {};
            if (!urlObject || !urlParams || !urlParams.length) {
                return;
            }
            urlParams.forEach(function (param) {
                var urlParamValue = urlObject[param];
                if (urlParamValue) {
                    formattedUrlObject[param] = _this._formatUrlParamValue(urlParamValue);
                }
            });
            return formattedUrlObject;
        };
        ApplicationBase.prototype._urlToObject = function () {
            var _this = this;
            var query = (window.location.search || "?").substr(1), map = {};
            var urlRE = /([^&=]+)=?([^&]*)(?:&+|$)/g;
            query.replace(urlRE, function (match, key, value) {
                map[key] = _this._stripStringTags(decodeURIComponent(value));
                return "";
            });
            return map;
        };
        ApplicationBase.prototype._formatUrlParamValue = function (urlParamValue) {
            if (typeof urlParamValue !== "string") {
                return urlParamValue;
            }
            var lowerCaseValue = urlParamValue.toLowerCase();
            if (lowerCaseValue === "true") {
                return true;
            }
            if (lowerCaseValue === "false") {
                return false;
            }
            return urlParamValue;
        };
        ApplicationBase.prototype._stripStringTags = function (value) {
            var tagsRE = /<\/?[^>]+>/g;
            return value.replace(tagsRE, "");
        };
        ApplicationBase = __decorate([
            declareDecorator_1.default()
        ], ApplicationBase);
        return ApplicationBase;
    }());
    return ApplicationBase;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=ApplicationBase.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(20)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, declare) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * A decorator that converts a TypeScript class into a declare constructor.
     * This allows declare constructors to be defined as classes, which nicely
     * hides away the `declare([], {})` boilerplate.
     */
    function default_1() {
        var mixins = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mixins[_i] = arguments[_i];
        }
        return function (target) {
            return declare(mixins, target.prototype);
        };
    }
    exports.default = default_1;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=declareDecorator.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = __webpack_require__(22);
var Widget = __webpack_require__(23);
var MinimalGallery_1 = __webpack_require__(24);
var router_1 = __webpack_require__(51);
var Component_1 = __webpack_require__(0);
var thunk = Component_1.middlewares.thunk, debug = Component_1.middlewares.debug;
var MainApp = /** @class */ (function (_super) {
    __extends(MainApp, _super);
    function MainApp(props) {
        var _this = _super.call(this) || this;
        _this.minimalGallery = new MinimalGallery_1.default(Component_1.newStore({
            reducers: MinimalGallery_1.reducers,
            parentWidget: _this,
            initialState: {
                base: {
                    applicationBase: props.boilerplate,
                    applicationBaseResult: null,
                    i18n: props.i18n,
                    status: "loading",
                    loadMessage: "init"
                }
            },
            middlewares: [thunk, router_1.router]
        }));
        router_1.startHistoryListener(_this.minimalGallery.store);
        return _this;
    }
    MainApp.prototype.render = function () {
        return this.minimalGallery.render();
    };
    MainApp = __decorate([
        decorators_1.subclass("esri.widgets.MinimalGallery")
    ], MainApp);
    return MainApp;
}(decorators_1.declared(Widget)));
exports.default = MainApp;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var _actions_1 = __webpack_require__(1);
var Header_1 = __webpack_require__(30);
var Gallery_1 = __webpack_require__(31);
var Viewer_1 = __webpack_require__(35);
var Pager_1 = __webpack_require__(43);
var _reducers_1 = __webpack_require__(44);
exports.reducers = _reducers_1.reducers;
var MinimalGallery = /** @class */ (function (_super) {
    __extends(MinimalGallery, _super);
    function MinimalGallery(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            status: "loading",
            loadMessage: "init"
        };
        _this.dispatch(_actions_1.loadApplicationBase());
        return _this;
    }
    MinimalGallery.prototype.render = function () {
        var tsx = this.tsx;
        var i18n = this.props.base.i18n;
        var status = this.props.base.status;
        if (status === "loading") {
            return (tsx("div", null,
                tsx("div", { class: "loader is-active padding-leader-3 padding-trailer-3 center-style", key: "loader" },
                    tsx("div", { class: "loader-bars" }),
                    tsx("div", { bind: this, class: "loader-text" }, i18n.appLoading[this.state.loadMessage]))));
        }
        else if (status === "success") {
            return (tsx("div", null,
                this.props.base.applicationBaseResult.config.showHeader ?
                    tsx(Header_1.default, { key: "minimal-gallery-header" }) :
                    null,
                tsx(Gallery_1.default, { key: "minimal-gallery" }),
                tsx(Viewer_1.default, { key: "minimal-gallery-viewer" }),
                tsx(Pager_1.default, { key: "minimal-gallery-pager" })));
        }
        else if (status === "noauth") {
            return (tsx("div", null,
                tsx("div", { key: "no-auth-container", class: "center-style", style: "padding: 1rem;" },
                    tsx("h3", { key: "no-license" }, i18n.appLoading.notLicensed),
                    tsx("p", { key: "no-auth" }, i18n.appLoading.noauth))));
        }
        return (tsx("div", null,
            tsx("h3", { class: "center-style" }, i18n.appLoading.failed)));
    };
    return MinimalGallery;
}(Component_1.default));
exports.default = MinimalGallery;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_25__;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_27__;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_ITEMS = "UPDATE_ITEMS";
exports.FILTER_ITEMS = "FILTER_ITEMS";
exports.updateItems = function (items) { return ({
    type: exports.UPDATE_ITEMS,
    payload: items
}); };
exports.filterItems = function (filter) { return ({
    type: exports.FILTER_ITEMS,
    payload: filter
}); };


/***/ }),
/* 29 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.PUSH = "ROUTER/PUSH";
exports.LOCATION_CHANGE = "ROUTER/LOCATION_CHANGE";
exports.HASH_CHANGE = "ROUTER/HASH_CHANGE";
exports.push = function (hash) { return ({
    type: exports.PUSH,
    payload: hash,
}); };
exports.hashChange = function (hash) { return ({
    type: exports.HASH_CHANGE,
    payload: hash
}); };


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var _actions_1 = __webpack_require__(1);
var base_1 = __webpack_require__(3);
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            searchTerm: _this.props.filter
        };
        _this.handleSearch = _this.handleSearch.bind(_this);
        _this.handleSearchChange = _this.handleSearchChange.bind(_this);
        _this.handleSignIn = _this.handleSignIn.bind(_this);
        _this.handleSignOut = _this.handleSignOut.bind(_this);
        return _this;
    }
    Header.prototype.render = function () {
        var tsx = this.tsx;
        var config = this.props.base.applicationBaseResult.config;
        var headSearch = config.headerSearch ? (tsx("nav", { class: "class-top-nav-list right", role: "navigation", title: "usernav" },
            tsx("form", { class: "inline-block padding-leader-half", role: "search", onsubmit: this.handleSearch },
                tsx("input", { title: config.searchPlaceholder, type: "search", placeholder: config.searchPlaceholder, name: "q", value: this.state.searchTerm, style: "margin-top: -1px;", oninput: this.handleSearchChange }),
                tsx("button", { type: "submit", class: "hide" }, config.searchPlaceholder)))) : null;
        var tabletHeadSearch = config.headerSearch ? (tsx("nav", { class: "class-top-nav-list right", role: "navigation", title: "usernav" },
            tsx("form", { class: "inline-block padding-leader-half", role: "search", onsubmit: this.handleSearch },
                tsx("input", { title: config.searchPlaceholder, type: "search", placeholder: config.searchPlaceholder, name: "q", value: this.state.searchTerm, style: "margin-top: -1px;", oninput: this.handleSearchChange }),
                tsx("button", { type: "submit", class: "hide" }, config.searchPlaceholder)))) : null;
        var headImage = config.headerImage ? (tsx("img", { src: config.headerImageLocation, class: "header-image", alt: config.headerText })) : null;
        var agolLink = config.showAgolLink ? (tsx("a", { class: "top-nav-link", href: appendProtocol(config.agolLinkLocation.replace("${GROUP_ID}", config.group)), style: "color: " + config.headerTextColor, title: config.agolLinkText, target: "_blank" }, config.agolLinkText)) : null;
        var signInLink = null;
        if (!this.props.base.applicationBase.portal["credential"] &&
            this.props.base.applicationBaseResult.config.showSignInBtn) {
            signInLink = (tsx("button", { class: "top-nav-btn", key: "sign-in-btn", onclick: this.handleSignIn, style: "color: " + config.headerTextColor },
                tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", style: "\n                            fill: currentColor;\n                            pointer-events: none;\n                            display: inline-block;\n                            width: 1em;\n                            height: 1em;\n                            vertical-align: -0.15em;\n                            padding-right: .5em;\n                        " },
                    tsx("path", { d: "M16.005 15.871a5.872 5.872 0 0 0 0-11.742 5.87 5.87 0 1 0 0 11.742zm11.567 7.188C27.27 19.036 20.023 18 16 18c-4.012 0-11.271 1.039-11.573 5.059C4.203 26.11 4.068 28.18 4.02 30h23.96c-.047-1.82-.184-3.891-.407-6.941z" })),
                this.props.base.i18n.header.signIn));
        }
        else if (this.props.base.applicationBaseResult.config.showSignInBtn &&
            this.props.base.applicationBase.portal.user) {
            signInLink = (tsx("button", { class: "top-nav-btn", key: "sign-out-btn", onclick: this.handleSignOut, style: "color: " + config.headerTextColor },
                tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", style: "\n                            fill: currentColor;\n                            pointer-events: none;\n                            display: inline-block;\n                            width: 1em;\n                            height: 1em;\n                            vertical-align: -0.15em;\n                            padding-right: .5em;\n                        " },
                    tsx("path", { d: "M16.005 15.871a5.872 5.872 0 0 0 0-11.742 5.87 5.87 0 1 0 0 11.742zm11.567 7.188C27.27 19.036 20.023 18 16 18c-4.012 0-11.271 1.039-11.573 5.059C4.203 26.11 4.068 28.18 4.02 30h23.96c-.047-1.82-.184-3.891-.407-6.941z" })), this.props.base.i18n.header.signOut + " (" + this.props.base.applicationBase.portal.user.username + ")"));
        }
        return (tsx("header", { class: "top-nav fade-in", style: "background-color: " + config.headColor },
            tsx("div", { class: "grid-container" },
                tsx("div", { class: "column-24" },
                    tsx("div", { class: "tablet-hide" },
                        tsx("a", { href: appendProtocol(config.headerTextURL), target: "_blank" },
                            headImage,
                            tsx("a", { class: "top-nav-title", style: "color: " + config.headerTextColor }, config.headerText)),
                        headSearch,
                        signInLink,
                        agolLink),
                    tsx("div", { class: "tablet-show top-nav-flex" },
                        tsx("header", { class: "top-nav-flex-title" },
                            tsx("a", { href: appendProtocol(config.headerTextURL) },
                                tsx("a", { class: "top-nav-title", style: "color: " + config.headerTextColor }, config.headerText)),
                            tabletHeadSearch))))));
    };
    Header.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.filter !== this.state.searchTerm) {
            this.setState({ searchTerm: nextProps.filter });
        }
    };
    Header.prototype.handleSearch = function (e) {
        if (e) {
            e.preventDefault();
        }
        var query = this.state.searchTerm.length > 0 ? "query=" + this.state.searchTerm : "";
        this.dispatch(_actions_1.push("" + query));
    };
    Header.prototype.handleSearchChange = function (e) {
        this.setState({
            searchTerm: e.target.value
        });
        if (e.target.value === "") {
            this.handleSearch();
        }
    };
    Header.prototype.handleSignIn = function () {
        this.dispatch(base_1.signIn());
    };
    Header.prototype.handleSignOut = function () {
        this.dispatch(base_1.signOut());
    };
    return Header;
}(Component_1.default));
exports.default = Header;
function appendProtocol(location) {
    if (location.indexOf("http") === 0) {
        return location;
    }
    return "http://" + location;
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = __webpack_require__(2);
var Component_1 = __webpack_require__(0);
var Panel_1 = __webpack_require__(32);
var _actions_1 = __webpack_require__(5);
var _actions_2 = __webpack_require__(1);
var supportedItemTypes_1 = __webpack_require__(4);
var addListener = Component_1.middlewares.addListener;
var Gallery = /** @class */ (function (_super) {
    __extends(Gallery, _super);
    function Gallery(store) {
        var _this = _super.call(this, store) || this;
        var itemsPerPage = _this.props.base.applicationBaseResult.config.itemsPerPage;
        _this.state = {
            itemPages: splitToPages(_this.props.items.filteredItems, itemsPerPage)
        };
        _this.mapItemsToChildren = _this.mapItemsToChildren.bind(_this);
        _this.handleChildUpdate = _this.handleChildUpdate.bind(_this);
        _this.showInViewer = _this.showInViewer.bind(_this);
        return _this;
    }
    Gallery.prototype.render = function () {
        var tsx = this.tsx;
        if (this.props.viewer.fullscreen) {
            return null;
        }
        return (tsx("div", { class: "grid-container leader-1", style: "background-color: " + this.props.base.applicationBaseResult.config.bgColor + ";" },
            tsx("div", { class: "column-24" },
                tsx("div", { class: "padding-leader-1 block-group block-group-5-up tablet-block-group-3-up phone-block-group-1-up" }, this.mapItemsToChildren()))));
    };
    Gallery.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.items.displayKey !== this.props.items.displayKey) {
            var itemsPerPage = this.props.base.applicationBaseResult.config.itemsPerPage;
            this.setState({
                itemPages: splitToPages(nextProps.items.filteredItems, itemsPerPage)
            });
        }
        if (nextProps.router.hash !== this.props.router.hash) {
            var currentViewer = ioQuery.queryToObject(this.props.router.hash).viewer;
            var nextViewer = ioQuery.queryToObject(nextProps.router.hash).viewer;
            if (currentViewer !== nextViewer) {
                for (var child in this.childComponents) {
                    if (this.childComponents.hasOwnProperty(child)) {
                        this.childComponents[child].store.dispatch({
                            type: _actions_1.VIEWER_CHANGE,
                            payload: nextViewer
                        });
                    }
                }
            }
        }
    };
    Gallery.prototype.mapItemsToChildren = function () {
        var _this = this;
        var tsx = this.tsx;
        var displayItems = this.state.itemPages[this.props.page - 1];
        this.childComponents = displayItems.reduce(function (result, item) {
            if (_this.childComponents[item.id]) {
                result[item.id] = _this.childComponents[item.id];
            }
            return result;
        }, {});
        return displayItems.map(function (item) {
            if (item.type === "Dashboard") {
                item.url = item.portal.url + "/apps/opsdashboard/index.html#/" + item.id;
            }
            return (tsx(Panel_1.default, { key: item.id, store: {
                    reducers: Panel_1.reducers,
                    initialState: {
                        applicationBaseResult: _this.props.base.applicationBaseResult,
                        i18n: _this.props.base.i18n,
                        item: item,
                        itemType: supportedItemTypes_1.default[item.type],
                        portal: _this.props.base.applicationBase.portal
                    },
                    middlewares: [addListener(_this.handleChildUpdate)]
                } }));
        });
    };
    Gallery.prototype.handleChildUpdate = function (action, childState) {
        switch (action.type) {
            case _actions_1.SHOW_IN_VIEWER:
                this.showInViewer(childState.item.id);
                break;
            case _actions_1.SHOW_FULLSCREEN:
                this.showFullscreen(childState.item.id);
                break;
            default: //
        }
    };
    Gallery.prototype.showInViewer = function (itemId) {
        var hash = this.props.router.hash;
        var hashParams = ioQuery.queryToObject(hash);
        hashParams.viewer = itemId;
        this.dispatch(_actions_2.push(ioQuery.objectToQuery(hashParams)));
    };
    Gallery.prototype.showFullscreen = function (itemId) {
        var hash = this.props.router.hash;
        var hashParams = ioQuery.queryToObject(hash);
        hashParams.viewer = itemId;
        hashParams.fullscreen = true;
        this.dispatch(_actions_2.push(ioQuery.objectToQuery(hashParams)));
    };
    return Gallery;
}(Component_1.default));
exports.default = Gallery;
function splitToPages(items, perPage) {
    return items.reduce(function (result, item) {
        if (result[result.length - 1].length < perPage) {
            result[result.length - 1].push(item);
        }
        else {
            result.push([item]);
        }
        return result;
    }, [[]]);
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var Caption_1 = __webpack_require__(33);
var _actions_1 = __webpack_require__(5);
var _reducers_1 = __webpack_require__(34);
exports.reducers = _reducers_1.reducers;
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            panelType: _this.props.getPanelType(_this.props.item.type),
        };
        _this.handleMouseOver = _this.handleMouseOver.bind(_this);
        _this.handleMouseOut = _this.handleMouseOut.bind(_this);
        _this.handleItemKeyPress = _this.handleItemKeyPress.bind(_this);
        _this.handleItemClick = _this.handleItemClick.bind(_this);
        _this.handleMaxClick = _this.handleMaxClick.bind(_this);
        _this.registerItemLink = _this.registerItemLink.bind(_this);
        return _this;
    }
    Panel.prototype.render = function () {
        var tsx = this.tsx;
        var i18n = this.props.i18n;
        var config = this.props.applicationBaseResult.config;
        var author = config.showAuthor ? (tsx("p", { class: "font-size--1 card-last hug-bottom author-text", key: this.props.item.title + "-author" }, this.props.item.owner)) : null;
        var tooltipSnippet;
        if (config.showSummaryTooltip) {
            tooltipSnippet = this.props.item.snippet ? this.props.item.snippet : null;
            if (tooltipSnippet && tooltipSnippet.length > config.tooltipTruncLength) {
                tooltipSnippet = tooltipSnippet.slice(0, config.tooltipTruncLength) + "...";
            }
        }
        var cardSnippet;
        var summaryElement;
        if (config.showItemSummary) {
            cardSnippet = this.props.item.snippet ? this.props.item.snippet : null;
            if (cardSnippet && cardSnippet.length > config.summaryTruncLength) {
                cardSnippet = cardSnippet.slice(0, config.summaryTruncLength) + "...";
            }
            summaryElement = tsx("p", { class: "item-description-text" }, cardSnippet);
        }
        var itemPageLink;
        if (config.showItemPageLink) {
            itemPageLink = (tsx("a", { class: "open-out-icon btn btn-transparent toolbar-tooltip", "aria-label": tooltipSnippet ? tooltipSnippet : i18n.ui.itemExtTip, href: this.props.applicationBaseResult.portal.url + "/home/item.html?id=" + this.props.item.id, style: "color: " + config.buttonBgColor, key: this.props.item.title + "-info-icon", tabindex: "0", target: this.props.applicationBaseResult.config.openItemDetailsSeparateTab ? "_blank" : "" },
                tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", style: "\n                            fill: #0079c1;\n                            pointer-events: none;\n                            display: inline-block;\n                            width: 1em;\n                            height: 1em;\n                            vertical-align: -0.15em;\n                            padding-right: .15em;\n                        " },
                    tsx("path", { d: "M31.297 16.047c0 8.428-6.826 15.25-15.25 15.25S.797 24.475.797 16.047c0-8.424 6.826-15.25 15.25-15.25s15.25 6.826 15.25 15.25zM18 24V12h-4v12h-2v2h8v-2h-2zm0-18h-4v4h4V6z" }))));
        }
        var maxLink;
        if (this.props.itemType !== "file" && !config.alwaysOpenFullscreen) {
            maxLink = (tsx("a", { class: "open-out-icon btn btn-transparent toolbar-tooltip", "aria-label": i18n.ui[this.state.panelType + "ExtTip"], style: "color: " + config.buttonBgColor, key: this.props.item.title + "-open-out-icon", href: this.props.itemType === "webapp" ?
                    this.props.item.url :
                    "" + window.location.origin + window.location.pathname + window.location.search + "#viewer=" + this.props.item.id + "&fullscreen=true", target: this.props.applicationBaseResult.config.openFullscreenSeparateTab ? "_blank" : "", tabindex: "0" },
                tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", style: "\n                            fill: #0079c1;\n                            pointer-events: none;\n                            display: inline-block;\n                            width: 1em;\n                            height: 1em;\n                            vertical-align: -0.15em;\n                            padding-right: .15em;\n                        " },
                    tsx("path", { d: "M2 4v24h28V4H2zm26 22H4V10h24v16z" }))));
        }
        var mainTip = this.props.itemType === "file" ? i18n.ui.itemExtTip :
            (config.alwaysOpenFullscreen ? i18n.ui[this.state.panelType + "ExtTip"] : i18n.ui.galleryTip);
        if (this.props.item.type === "PDF") {
            mainTip = i18n.ui.pdfTip;
        }
        else if (this.props.item.type === "Document Link" &&
            this.props.applicationBaseResult.config.openDocumentLinksDirectly) {
            mainTip = i18n.ui.documentTip;
        }
        var title;
        if (config.showItemTitle) {
            title = (tsx("a", { title: mainTip, style: "color: " + config.linkColor, class: "break-word", onclick: this.handleItemClick, onkeypress: this.handleItemKeyPress },
                tsx("h5", { tabindex: "0", class: "clickable" }, this.props.item.title)));
        }
        return (tsx("div", { class: "card block trailer-1 animate-fade-in card-fade", style: "background-color: " + config.cardColor + "; z-index: 1", key: this.props.item.id + "-div" },
            tsx("figure", { class: "card-image-wrap" },
                tsx("a", { title: mainTip, role: "link", tabindex: "0", onclick: this.handleItemClick, onkeypress: this.handleItemKeyPress, afterCreate: this.registerItemLink },
                    tsx("img", { key: this.props.item.id + "-thumbnail", class: "card-image clickable thumbnail-min", src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", alt: this.props.item.title, onmouseover: this.handleMouseOver, onmouseout: this.handleMouseOut, style: "\n                                background-image: url(" + this.props.item.thumbnailUrl + ");\n                                background-repeat: no-repeat;\n                                background-size: cover;\n                            " })),
                tsx(Caption_1.default, { key: "card-caption" })),
            tsx("div", { class: "card-content", style: "color: " + config.fontColor },
                title,
                summaryElement,
                author,
                tsx("div", { class: "open-out-container" },
                    itemPageLink,
                    maxLink))));
    };
    Panel.prototype.componentWillReceiveProps = function (nextProps) {
        if (!nextProps.activeViewer &&
            this.props.activeViewer &&
            this.state.itemLink &&
            this.props.activeViewer === this.props.item.id) {
            this.state.itemLink.focus();
        }
    };
    Panel.prototype.registerItemLink = function (itemLink) {
        this.setState({ itemLink: itemLink });
    };
    Panel.prototype.handleMouseOver = function () {
        this.dispatch(_actions_1.mouseOver());
    };
    Panel.prototype.handleMouseOut = function () {
        this.dispatch(_actions_1.mouseOut());
    };
    Panel.prototype.handleItemKeyPress = function (e) {
        if (e.key === "Enter") {
            this.handleItemClick();
        }
    };
    Panel.prototype.handleItemClick = function () {
        if (this.props.item.type === "Document Link" &&
            this.props.applicationBaseResult.config.openDocumentLinksDirectly) {
            window.open(this.props.item.url);
        }
        else if (this.props.item.type === "PDF") {
            window.open(this.props.item.itemUrl + "/data" + (this.props.portal["credential"] ?
                "?token=" + this.props.portal["credential"].token : ""));
        }
        else if (this.props.itemType === "file") {
            window.open(this.props.applicationBaseResult.portal.url + "/home/item.html?id=" + this.props.item.id, "_blank");
        }
        else {
            if (this.props.applicationBaseResult.config.alwaysOpenFullscreen) {
                this.handleMaxClick();
            }
            else {
                this.dispatch(_actions_1.showInViewer());
            }
        }
    };
    Panel.prototype.handleMaxClick = function () {
        if (this.props.applicationBaseResult.config.openFullscreenSeparateTab) {
            if (this.props.itemType === "webapp") {
                window.open(this.props.item.url, "_blank");
            }
            else {
                window.open("" + window.location.origin + window.location.pathname + window.location.search + "#viewer=" + this.props.item.id + "&fullscreen=true", "_blank");
            }
        }
        else {
            if (this.props.itemType === "webapp") {
                window.location.href = this.props.item.url;
            }
            else {
                this.dispatch(_actions_1.showFullscreen());
            }
        }
    };
    return Panel;
}(Component_1.default));
exports.default = Panel;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var Caption = /** @class */ (function (_super) {
    __extends(Caption, _super);
    function Caption(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            captionBelowOpacity: 0.8,
            captionOpacity: 1,
            captionTransform: 0,
            panelType: _this.props.getPanelType(_this.props.item.type)
        };
        return _this;
    }
    Caption.prototype.render = function () {
        var tsx = this.tsx;
        var config = this.props.applicationBaseResult.config;
        if (config.showItemType) {
            if (config.itemTypeBelowThumbnail) {
                return (tsx("div", { class: "card-below-image-caption", style: "\n                            opacity: " + this.state.captionBelowOpacity + ";\n                            background-color: " + convertHex(config[this.state.panelType + "CaptionColor"], 80) + ";\n                            color: " + config.captionTextColor + ";\n                        " }, this.props.item.displayName));
            }
            else {
                return (tsx("div", { class: "card-image-caption", style: "\n                            opacity: " + this.state.captionOpacity + ";\n                            transform: translate(0, " + this.state.captionTransform + "%);\n                            background-color: " + convertHex(config[this.state.panelType + "CaptionColor"], 80) + ";\n                            color: " + config.captionTextColor + ";\n                        " }, this.props.item.displayName));
            }
        }
        return null;
    };
    Caption.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.hovering !== this.props.hovering) {
            this.setState({
                captionBelowOpacity: nextProps.hovering ? 1 : 0.8,
                captionOpacity: nextProps.hovering ? 0 : 1,
                captionTransform: nextProps.hovering ? 100 : 0
            });
        }
    };
    return Caption;
}(Component_1.default));
exports.default = Caption;
function convertHex(hex, opacity) {
    hex = hex.replace("#", "");
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    var result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
    return result;
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var _actions_1 = __webpack_require__(5);
var applicationBaseResult = function (state) {
    if (state === void 0) { state = {}; }
    return state;
};
var i18n = function (state) {
    if (state === void 0) { state = {}; }
    return state;
};
var item = function (state) {
    if (state === void 0) { state = {}; }
    return state;
};
var itemType = function (state) {
    if (state === void 0) { state = "file"; }
    return state;
};
var portal = function (state) {
    if (state === void 0) { state = {}; }
    return state;
};
var getPanelType = function (state) {
    if (state === void 0) { state = function (type) {
        var recognizedTypes = {
            "Web Mapping Application": "app",
            "Web Map": "map",
            "Web Scene": "scene",
            "Dashboard": "app"
        };
        if (recognizedTypes[type]) {
            return recognizedTypes[type];
        }
        return "file";
    }; }
    return state;
};
var hovering = function (state, action) {
    if (state === void 0) { state = false; }
    switch (action.type) {
        case _actions_1.MOUSE_OVER:
            return true;
        case _actions_1.MOUSE_OUT:
            return false;
        default:
            return state;
    }
};
var activeViewer = function (state, action) {
    switch (action.type) {
        case _actions_1.VIEWER_CHANGE:
            return action.payload;
        default:
            return state;
    }
};
exports.reducers = Component_1.combineReducers({
    applicationBaseResult: applicationBaseResult,
    i18n: i18n,
    item: item,
    hovering: hovering,
    getPanelType: getPanelType,
    itemType: itemType,
    activeViewer: activeViewer,
    portal: portal
});


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = __webpack_require__(2);
var Component_1 = __webpack_require__(0);
var _actions_1 = __webpack_require__(1);
var View_1 = __webpack_require__(36);
var convertHex_1 = __webpack_require__(42);
var supportedItemTypes_1 = __webpack_require__(4);
var Viewer = /** @class */ (function (_super) {
    __extends(Viewer, _super);
    function Viewer(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            containerClasses: {
                "animate-fade-in": true,
                "animate-fade-out": false
            },
            scrollY: 0
        };
        _this.handleExitKeyPress = _this.handleExitKeyPress.bind(_this);
        _this.handleExitClick = _this.handleExitClick.bind(_this);
        _this.closeViewer = _this.closeViewer.bind(_this);
        return _this;
    }
    Viewer.prototype.render = function () {
        var tsx = this.tsx;
        var i18n = this.props.base.i18n;
        var config = this.props.base.applicationBaseResult.config;
        var item = this.props.items.viewerItem;
        if (this.props.viewer.visible && !!item.id) {
            var viewType = supportedItemTypes_1.default[item.type];
            var view = void 0;
            if (viewType === "webmap") {
                view = tsx(View_1.MapView, { key: item.id });
            }
            else if (viewType === "webscene") {
                view = tsx(View_1.SceneView, { key: item.id });
            }
            else if (viewType === "webapp") {
                view = tsx(View_1.AppView, { key: item.id });
            }
            else {
                return null;
            }
            if (this.props.viewer.fullscreen) {
                return (tsx("div", { id: "map-container", class: "map-container fullscreen", key: "map-container-fullscreen-" + item.id }, view));
            }
            return (tsx("div", { id: "view-container", key: "view-container", classes: this.state.containerClasses, style: "background-color: " + convertHex_1.default(config.bgColor, 85) + ";" },
                tsx("div", { id: "map-container", class: "map-container", key: "map-container-" + item.id }, view),
                tsx("button", { class: "btn btn-clear view-exit-button clickable", onclick: this.handleExitClick, onkeypress: this.handleExitKeyPress, title: i18n.ui.close, afterCreate: this.focus },
                    tsx("span", { class: "view-exit-icon" },
                        tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32" },
                            tsx("path", { d: "M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z" }))))));
        }
        return null;
    };
    Viewer.prototype.componentWillReceiveProps = function (nextProps) {
        if (!this.props.viewer.visible && nextProps.viewer.visible) {
            this.setState({ scrollY: window.scrollY });
        }
        if (this.props.viewer.visible && !nextProps.viewer.visible) {
            this.childComponents = {};
        }
    };
    Viewer.prototype.focus = function (el) {
        setTimeout(function () {
            el.focus();
        }, 10);
    };
    Viewer.prototype.handleExitKeyPress = function (e) {
        if (e.key === "Enter") {
            this.handleExitClick();
        }
    };
    Viewer.prototype.handleExitClick = function () {
        var _this = this;
        this.setState({
            containerClasses: {
                "animate-fade-in": false,
                "animate-fade-out": true
            }
        });
        setTimeout(function () {
            _this.closeViewer();
            _this.setState({
                containerClasses: {
                    "animate-fade-in": true,
                    "animate-fade-out": false
                }
            });
        }, 750);
    };
    Viewer.prototype.closeViewer = function () {
        var hash = this.props.router.hash;
        var hashParams = ioQuery.queryToObject(hash);
        delete hashParams.viewer;
        this.dispatch(_actions_1.push(ioQuery.objectToQuery(hashParams)));
    };
    return Viewer;
}(Component_1.default));
exports.default = Viewer;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var MapView_1 = __webpack_require__(37);
exports.MapView = MapView_1.MapView;
var AppView_1 = __webpack_require__(40);
exports.AppView = AppView_1.AppView;
var SceneView_1 = __webpack_require__(41);
exports.SceneView = SceneView_1.SceneView;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var ViewBase_1 = __webpack_require__(10);
var MapView = /** @class */ (function (_super) {
    __extends(MapView, _super);
    function MapView(store) {
        return _super.call(this, store) || this;
    }
    MapView.prototype.render = function () {
        var tsx = this.tsx;
        var config = this.props.base.applicationBaseResult.config;
        return (tsx(ViewBase_1.default, { key: "map-view", store: {
                reducers: ViewBase_1.reducers,
                initialState: {
                    config: config,
                    i18n: this.props.base.i18n,
                    id: this.props.items.viewerItem.id,
                    widgets: Object.keys(config)
                        .filter(function (key) { return key.indexOf("Widget") !== -1; })
                        .reduce(function (result, key) {
                        return __assign({}, result, (_a = {}, _a[key] = config[key], _a));
                        var _a;
                    }, {}),
                    viewModule: "esri/views/MapView",
                    webModule: "esri/WebMap",
                    containerId: "map-container"
                }
            } }));
    };
    return MapView;
}(Component_1.default));
exports.MapView = MapView;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    config: {},
    i18n: {},
    id: "",
    widgets: {},
    viewModule: "",
    webModule: "",
    containerId: "map-container"
};
exports.reducers = function (state, action) {
    if (state === void 0) { state = initialState; }
    return state;
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_39__;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var AppView = /** @class */ (function (_super) {
    __extends(AppView, _super);
    function AppView(store) {
        return _super.call(this, store) || this;
    }
    AppView.prototype.render = function () {
        var tsx = this.tsx;
        return (tsx("iframe", { src: this.props.items.viewerItem.url, class: "app-frame", id: "embedded-mapping-application-iframe", name: "nested-iframe" },
            tsx("h3", { class: "center-style" }, this.props.base.i18n.viewLoading.iframe)));
    };
    return AppView;
}(Component_1.default));
exports.AppView = AppView;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var ViewBase_1 = __webpack_require__(10);
var SceneView = /** @class */ (function (_super) {
    __extends(SceneView, _super);
    function SceneView(store) {
        return _super.call(this, store) || this;
    }
    SceneView.prototype.render = function () {
        var tsx = this.tsx;
        var config = this.props.base.applicationBaseResult.config;
        return (tsx(ViewBase_1.default, { key: "map-view", store: {
                reducers: ViewBase_1.reducers,
                initialState: {
                    config: config,
                    i18n: this.props.base.i18n,
                    id: this.props.items.viewerItem.id,
                    widgets: Object.keys(config)
                        .filter(function (key) { return key.indexOf("Widget") !== -1; })
                        .reduce(function (result, key) {
                        return __assign({}, result, (_a = {}, _a[key] = config[key], _a));
                        var _a;
                    }, {}),
                    viewModule: "esri/views/SceneView",
                    webModule: "esri/WebScene",
                    containerId: "map-container"
                }
            } }));
    };
    return SceneView;
}(Component_1.default));
exports.SceneView = SceneView;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (hex, opacity) {
    hex = hex.replace("#", "");
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    var result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
    return result;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = __webpack_require__(2);
var Component_1 = __webpack_require__(0);
var _actions_1 = __webpack_require__(1);
var Pager = /** @class */ (function (_super) {
    __extends(Pager, _super);
    function Pager(store) {
        var _this = _super.call(this, store) || this;
        _this.handleNext = _this.handleNext.bind(_this);
        _this.handlePrevious = _this.handlePrevious.bind(_this);
        _this.handlePageButton = _this.handlePageButton.bind(_this);
        _this.handlePage = _this.handlePage.bind(_this);
        return _this;
    }
    Pager.prototype.render = function () {
        var _this = this;
        var tsx = this.tsx;
        var config = this.props.base.applicationBaseResult.config;
        var displayItems = this.props.items.filteredItems;
        var pages = Math.ceil(displayItems.length / config.itemsPerPage);
        //No pager rendered if only a single page
        if (pages <= 1) {
            return;
        }
        var prevButtonClasses = {
            "btn": true,
            "btn-disabled": this.props.page <= 1,
            "btn-transparent": true
        };
        var nextButtonClasses = {
            "btn": true,
            "btn-arrow": true,
            "btn-disabled": this.props.page >= pages,
            "btn-transparent": true
        };
        var pageButtons = Array.apply(null, Array(pages)).map(function (v, i) {
            var isActive = _this.props.page === i + 1;
            return (tsx("a", { id: "page-" + (i + 1) + "-button", title: "page-" + (i + 1), class: "btn" + (!isActive ? " btn-transparent" : ""), onclick: _this.handlePageButton, role: "link", tabindex: "0", style: "\n                        color: " + (isActive ? config.buttonTextColor : config.buttonBgColor) + ";\n                        background-color: " + (isActive ? config.buttonBgColor : null) + ";\n                        border: " + (isActive ? "1px solid " + config.buttonBgColor : "none") + "\n                    ", key: "page-button-" + (i + 1) + "-" + _this.props.items.displayKey }, i + 1));
        });
        return (tsx("div", { class: "text-center trailer-1 leader-1", key: "pager" },
            tsx("a", { id: "previous", title: "previous", classes: prevButtonClasses, role: "link", tabindex: "0", style: "color:" + config.buttonBgColor + ";", key: "previous-button", onclick: this.handlePrevious }, "Previous"),
            pageButtons,
            tsx("a", { id: "next", title: "next", classes: nextButtonClasses, role: "link", tabindex: "0", style: "color:" + config.buttonBgColor + ";", key: "next-button", onclick: this.handleNext }, "Next")));
    };
    Pager.prototype.handleNext = function () {
        this.handlePage(this.props.page + 1);
    };
    Pager.prototype.handlePrevious = function () {
        this.handlePage(this.props.page - 1);
    };
    Pager.prototype.handlePageButton = function (e) {
        this.handlePage(e.target.text);
    };
    Pager.prototype.handlePage = function (page) {
        var hash = this.props.router.hash;
        var hashParams = ioQuery.queryToObject(hash);
        if (page > 1) {
            hashParams.page = page;
        }
        else {
            if (hashParams.page) {
                delete hashParams.page;
            }
        }
        this.dispatch(_actions_1.push(ioQuery.objectToQuery(hashParams)));
    };
    return Pager;
}(Component_1.default));
exports.default = Pager;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(0);
var base_1 = __webpack_require__(45);
var items_1 = __webpack_require__(46);
var router_1 = __webpack_require__(47);
var filter_1 = __webpack_require__(48);
var page_1 = __webpack_require__(49);
var viewer_1 = __webpack_require__(50);
exports.reducers = Component_1.combineReducers({
    base: base_1.default,
    items: items_1.default,
    router: router_1.default,
    filter: filter_1.default,
    page: page_1.default,
    viewer: viewer_1.default
});


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _actions_1 = __webpack_require__(1);
var base_1 = __webpack_require__(3);
exports.default = function (state, action) {
    switch (action.type) {
        case _actions_1.SAVE_APP_BASE_RESULT:
            var perPage = parseInt(action.payload.config.itemsPerPage, 10);
            state.applicationBase.portal = action.payload.portal;
            return __assign({}, state, { loadMessage: "groupItems", applicationBaseResult: __assign({}, action.payload, { config: __assign({}, action.payload.config, { itemsPerPage: !isNaN(perPage) && perPage > 0 ? perPage : 20 }) }) });
        case _actions_1.LOAD_APP_FAIL:
            return __assign({}, state, { status: "failed" });
        case _actions_1.LOAD_APP_PROGRESS:
            return __assign({}, state, { loadMessage: action.payload });
        case _actions_1.LOAD_APP_SUCCESS:
            return __assign({}, state, { status: "success" });
        case base_1.AUTHENTICATION_FAILED:
            return __assign({}, state, { status: "noauth" });
        default:
            return state;
    }
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = __webpack_require__(2);
var _actions_1 = __webpack_require__(1);
var initialState = {
    allowedItemTypes: {},
    allItems: [],
    filteredItems: [],
    displayKey: "",
    viewerItem: {}
};
exports.default = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_1.SAVE_APP_BASE_RESULT:
            var itemTypes = !!action.payload.config.itemTypes && action.payload.config.itemTypes.length > 0 ?
                action.payload.config.itemTypes :
                "WMS, Web Map, CityEngine Web Scene, Web Scene, 360 VR Experience, Pro Map, Feature Service, Map Service, Image Service, KML, KML Collection, WFS, WMTS, Feature Collection, Feature Collection Template, Vector Tile Service, Scene Service, Relational Database Connection, Web Mapping Application, Mobile Application, Code Attachment, Operations Dashboard Add In, Native Application, Native Application Template, Native Application Installer, Workforce Project, Form, Insights Workbook, Insights Model, Insights Page, Dashboard, Hub Initiative, Hub Site Application, Hub Page, AppBuilder Widget Package, Symbol Set, Color Set, Shapefile, File Geodatabase, CSV, CAD Drawing, Service Definition, Microsoft Word, Microsoft Powerpoint, Microsoft Excel, PDF, Image, Visio Document, iWork Keynote, iWork Pages, iWork Numbers, Report Template, Statistical Data Collection, Map Document, Map Package, Mobile Basemap Package, Mobile Map Package, Tile Package, Vector Tile Package, Project Package, Task File, ArcPad Package, Explorer Map, Globe Document, Scene Document, Published Map, Map Template, Windows Mobile Package, Pro Map, Layout, Project Template, Layer, Layer, Layer Package, Explorer Layer, Scene Package, Image Collection, Desktop Style, Geoprocessing Package, Geoprocessing Package (Pro version), Geoprocessing Sample, Locator Package, Rule Package, Raster function template, ArcGIS Pro Configuration, Workflow Manager Package, Desktop Application, Desktop Application Template, Code Sample, Desktop Add In, Explorer Add In, ArcGIS Pro Add In, Geometry Service, Geocoding Service, Network Analysis Service, Geoprocessing Service, Workflow Manager Service, Document Link";
            return __assign({}, state, { allowedItemTypes: itemTypes.split(",")
                    .map(function (type) { return type.trim(); })
                    .reduce(function (r, c) {
                    r[c] = true;
                    return r;
                }, {}) });
        case _actions_1.UPDATE_ITEMS:
            return __assign({}, state, { allItems: action.payload });
        case _actions_1.HASH_CHANGE:
            var hashParams_1 = ioQuery.queryToObject(action.payload);
            if (hashParams_1.viewer) {
                var viewerItem = state.allItems.filter(function (item) { return item.id === hashParams_1.viewer; })[0];
                return __assign({}, state, { viewerItem: viewerItem ? viewerItem : {}, filteredItems: filterItems(state.allItems, hashParams_1.query ? hashParams_1.query : "", state.allowedItemTypes), displayKey: Math.random().toString(36).substring(7) });
            }
            return __assign({}, state, { filteredItems: filterItems(state.allItems, hashParams_1.query ? hashParams_1.query : "", state.allowedItemTypes), displayKey: Math.random().toString(36).substring(7) });
        default:
            return state;
    }
};
function filterItems(items, filter, allowedItemTypes) {
    return items.filter(function (item) { return (allowedItemTypes[item.type] && (item.title.toLowerCase().indexOf(filter) !== -1 ||
        item.type.toLowerCase().indexOf(filter) !== -1 ||
        item.owner.toLowerCase().indexOf(filter) !== -1 ||
        (item.tags && item.tags.map(function (tag) { return tag.toLowerCase(); }).indexOf(filter) !== -1) ||
        (item.description && item.description.indexOf(filter) !== -1) ||
        (item.snippet && item.snippet.indexOf(filter) !== -1))); });
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _actions_1 = __webpack_require__(1);
var initialState = {
    hash: ""
};
exports.default = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_1.HASH_CHANGE:
            return __assign({}, state, { hash: action.payload });
        default:
            return state;
    }
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = __webpack_require__(2);
var _actions_1 = __webpack_require__(1);
exports.default = function (state, action) {
    if (state === void 0) { state = ""; }
    switch (action.type) {
        case _actions_1.HASH_CHANGE:
            var hashParams = ioQuery.queryToObject(action.payload);
            return (hashParams.query ? hashParams.query : "");
        default:
            return state;
    }
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = __webpack_require__(2);
var _actions_1 = __webpack_require__(1);
exports.default = function (state, action) {
    if (state === void 0) { state = 1; }
    switch (action.type) {
        case _actions_1.HASH_CHANGE:
            var hashParams = ioQuery.queryToObject(action.payload);
            if (hashParams.page) {
                return parseInt(hashParams.page, 10);
            }
            return 1;
        default:
            return state;
    }
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = __webpack_require__(2);
var _actions_1 = __webpack_require__(1);
var initialState = {
    visible: false,
    fullscreen: false
};
exports.default = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_1.HASH_CHANGE:
            var hashParams = ioQuery.queryToObject(action.payload);
            if (hashParams.viewer) {
                return __assign({}, state, { visible: true, fullscreen: !!hashParams.fullscreen });
            }
            return __assign({}, state, { visible: false, fullscreen: false });
        default:
            return state;
    }
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var _actions_1 = __webpack_require__(1);
exports.router = function () { return function (next) { return function (action) {
    switch (action.type) {
        case _actions_1.PUSH:
            window.location.hash = action.payload;
            break;
        default:
            return next(action);
    }
}; }; };
function startHistoryListener(store) {
    store.dispatch(_actions_1.hashChange(window.location.hash.slice(1)));
    window.onhashchange = function (event) {
        store.dispatch(_actions_1.hashChange(window.location.hash.slice(1)));
    };
}
exports.startHistoryListener = startHistoryListener;


/***/ })
/******/ ])});;
//# sourceMappingURL=application.js.map