var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "./ViewBase"], function (require, exports, ViewBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebMap = function (props) {
        return ViewBase_1.default(__assign({}, props, { ViewModule: "esri/views/MapView", WebModule: "esri/WebMap" }));
    };
    exports.WebScene = function (props) {
        return ViewBase_1.default(__assign({}, props, { ViewModule: "esri/views/SceneView", WebModule: "esri/WebScene" }));
    };
});
//# sourceMappingURL=ViewComposites.js.map