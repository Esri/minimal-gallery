define(["require", "exports", "esri/widgets/support/widget", "./views/AppView", "./views/ViewComposites"], function (require, exports, widget_1, AppView_1, ViewComposites_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = function (props) {
        var childProps = {
            config: props.config,
            i18n: props.i18n,
            id: props.id,
            projector: props.projector,
            widgets: props.widgets
        };
        var containerClasses = {
            "animate-fade-in": true,
            "animate-fade-out": false,
        };
        var view;
        if (props.type === "webmap") {
            view = ViewComposites_1.WebMap(childProps);
        }
        else if (props.type === "webscene") {
            view = ViewComposites_1.WebScene(childProps);
        }
        else if (props.type === "webapp") {
            view = AppView_1.default({ url: props.id, projector: props.projector, i18n: props.i18n });
        }
        else {
            view = {
                render: function () { return (widget_1.tsx("h3", { class: "center-style" }, props.i18n.viewLoading.sorry)); }
            };
        }
        return {
            render: function () {
                return (widget_1.tsx("div", { id: "view-container", key: "view-container", classes: containerClasses, style: "background-color: " + convertHex(props.config.bgColor, 85) },
                    widget_1.tsx("div", { id: "map-container" },
                        view.render(),
                        widget_1.tsx("button", { class: "btn btn-clear view-exit-button clickable", onclick: handleExitClick, title: props.i18n.ui.close },
                            widget_1.tsx("span", { class: "icon-ui-close view-exit-icon" })))));
            }
        };
        function handleExitClick() {
            containerClasses = {
                "animate-fade-in": false,
                "animate-fade-out": true,
            };
            setTimeout(function () {
                props.exitClickHandler();
            }, 750);
        }
        function convertHex(hex, opacity) {
            hex = hex.replace("#", "");
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);
            var result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
            return result;
        }
    };
});
//# sourceMappingURL=Viewer.js.map