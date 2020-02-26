Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("../../../../../Component");
var _actions_1 = require("../_actions");
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
//# sourceMappingURL=index.js.map