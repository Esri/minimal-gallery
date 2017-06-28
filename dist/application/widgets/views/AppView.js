define(["require", "exports", "esri/widgets/support/widget"], function (require, exports, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = function (props) {
        return ({
            render: function () {
                return (widget_1.tsx("iframe", { src: props.url, class: "app-frame", id: "embedded-mapping-application-iframe", name: "nested-iframe" },
                    widget_1.tsx("h3", { class: "center-style" }, props.i18n.viewLoading.iframe)));
            }
        });
    };
});
//# sourceMappingURL=AppView.js.map