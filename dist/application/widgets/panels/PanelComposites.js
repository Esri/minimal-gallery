var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "./PanelBase"], function (require, exports, PanelBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MapPanel = function (props) { return (PanelBase_1.default(__assign({}, props, { captionColor: props.config.mapCaptionColor, extItem: props.i18n.ui.itemExtTip, extLink: props.portalUrl + "/home/item.html?id=" + props.item.id, extTitle: props.i18n.ui.mapExtTip, itemClickHandler: function () {
            props.itemClickHandler(props.item.id, "webmap");
        }, maxLink: "viewApp.html?itemId=" + props.item.id + "&type=webmap" }))); };
    exports.ScenePanel = function (props) { return (PanelBase_1.default(__assign({}, props, { captionColor: props.config.sceneCaptionColor, extItem: props.i18n.ui.itemExtTip, extLink: props.portalUrl + "/home/item.html?id=" + props.item.id, extTitle: props.i18n.ui.sceneExtTip, itemClickHandler: function () {
            props.itemClickHandler(props.item.id, "webscene");
        }, maxLink: "viewApp.html?itemId=" + props.item.id + "&type=webscene" }))); };
    exports.AppPanel = function (props) { return (PanelBase_1.default(__assign({}, props, { captionColor: props.config.appCaptionColor, extItem: props.i18n.ui.itemExtTip, extLink: props.portalUrl + "/home/item.html?id=" + props.item.id, extTitle: props.i18n.ui.appExtTip, itemClickHandler: function () {
            props.itemClickHandler(props.item.url, "webapp");
        }, maxLink: props.item.url }))); };
});
//# sourceMappingURL=PanelComposites.js.map