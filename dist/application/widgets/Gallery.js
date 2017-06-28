var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "./panels/PanelComposites", "esri/widgets/support/widget", "../utilities/createMapping"], function (require, exports, PanelComposites_1, widget_1, createMapping_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var itemMapping = createMapping_1.default(function (blob) {
        return blob.item.title;
    }, function (blob, index) {
        if (blob.item.type === "Web Map") {
            return PanelComposites_1.MapPanel(__assign({}, blob.props, { item: blob.item }));
        }
        else if (blob.item.type === "Web Mapping Application") {
            return PanelComposites_1.AppPanel(__assign({}, blob.props, { item: blob.item }));
        }
        return PanelComposites_1.ScenePanel(__assign({}, blob.props, { item: blob.item }));
    }, function () {
        return null;
    });
    exports.default = function (props) {
        var blobs = props.items.map(function (item) { return ({
            item: item,
            props: {
                config: props.config,
                i18n: props.i18n,
                itemClickHandler: props.itemClickHandler,
                portalUrl: props.portalUrl
            }
        }); });
        itemMapping.map(blobs);
        return {
            render: function () {
                return (widget_1.tsx("div", { class: "grid-container leader-1" },
                    widget_1.tsx("div", { class: "column-24" },
                        widget_1.tsx("div", { class: "block-group block-group-5-up tablet-block-group-2-up phone-block-group-1-up" }, itemMapping.results.map(function (item) { return item.render(); })))));
            }
        };
    };
});
//# sourceMappingURL=Gallery.js.map