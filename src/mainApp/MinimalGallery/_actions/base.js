var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAVE_APP_BASE_RESULT = "SAVE_APP_BASE_RESULT";
exports.LOAD_APP_FAIL = "LOAD_APP_FAIL";
exports.LOAD_APP_PROGRESS = "LOAD_APP_PROGRESS";
exports.LOAD_APP_SUCCESS = "LOAD_APP_FINISH";
exports.AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED";
var all = require("dojo/promise/all");
var Deferred = require("dojo/Deferred");
var IdentityManager = require("esri/identity/IdentityManager");
var Portal = require("esri/portal/Portal");
var cookie = require("dojo/cookie");
var _1 = require(".");
var supportedItemTypes_1 = require("../_utilities/supportedItemTypes");
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
        if (response.total > response.results.length) { // This group is more than 100 items, fetch them all!
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
//# sourceMappingURL=base.js.map