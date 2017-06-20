define(["require", "exports", "esri/widgets/support/widget", "dojo/promise/all", "esri/core/promiseUtils", "esri/core/requireUtils"], function (require, exports, widget_1, all, promiseUtils, requireUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var widgetKey = {
        compassWidget: "esri/widgets/Compass",
        homeWidget: "esri/widgets/Home",
        legendWidget: "esri/widgets/Legend",
        locateWidget: "esri/widgets/Locate",
        searchWidget: "esri/widgets/Search"
    };
    exports.default = function (props) {
        var ViewPublic = {
            i18n: props.i18n,
            loadText: "scripts",
            status: "loading",
            render: function () {
                if (ViewPublic.status === "loaded") {
                    return (widget_1.jsxFactory("div", null));
                }
                else if (ViewPublic.status === "loading") {
                    return (widget_1.jsxFactory("div", null,
                        widget_1.jsxFactory("div", { class: "loader is-active padding-leader-3 padding-trailer-3 center-style" },
                            widget_1.jsxFactory("div", { class: "loader-bars" }),
                            widget_1.jsxFactory("div", { class: "loader-text" }, ViewPublic.i18n.viewLoading[ViewPublic.loadText]))));
                }
                return (widget_1.jsxFactory("div", null,
                    widget_1.jsxFactory("h3", { class: "center-style" }, ViewPublic.i18n.viewLoading.failed)));
            }
        };
        loadScripts();
        function loadScripts() {
            requireUtils.when(require, [props.WebModule, props.ViewModule])
                .then(function (_a) {
                var WebConstructor = _a[0], ViewConstructor = _a[1];
                ViewPublic.loadText = "map";
                props.projector.scheduleRender();
                loadMap(WebConstructor, ViewConstructor);
            }, function (err) {
                // console.log(err);
                ViewPublic.status = "failed";
                props.projector.scheduleRender();
            });
        }
        function loadMap(WebConstructor, ViewConstructor) {
            var map = new WebConstructor({
                portalItem: {
                    id: props.id
                }
            });
            map.load().then(function () {
                ViewPublic.loadText = "basemap";
                props.projector.scheduleRender();
                return map.basemap.load();
            }).then(function () {
                ViewPublic.loadText = "layers";
                var allLayers = map.allLayers;
                var promises = allLayers.map(function (layer) { return layer.load(); });
                props.projector.scheduleRender();
                return all(promises.toArray());
            }).then(function (layers) {
                ViewPublic.loadText = "view";
                var view = new ViewConstructor({
                    container: "map-container",
                    map: map
                });
                props.projector.scheduleRender();
                return promiseUtils.resolve(view);
            }).then(function (view) {
                ViewPublic.loadText = "widgets";
                props.projector.scheduleRender();
                return loadWidgets(view);
            }).then(function () {
                ViewPublic.status = "loaded";
                props.projector.scheduleRender();
            }).otherwise(function (err) {
                ViewPublic.status = "failed";
                props.projector.scheduleRender();
            });
        }
        function loadWidgets(view) {
            var positions = {
                "bottom-left": true,
                "bottom-right": true,
                "top-left": true,
                "top-right": true
            };
            var modules = Object.keys(props.widgets).reduce(function (p, c, i) {
                if (positions[props.widgets[c]]) {
                    return p.concat([{
                            module: widgetKey[c],
                            position: props.widgets[c]
                        }]);
                }
                return p;
            }, []);
            return requireUtils.when(require, modules.map(function (item) { return item.module; }))
                .then(function (constructors) {
                constructors.forEach(function (Constructor, i) {
                    var widget = new Constructor({
                        view: view
                    });
                    if (widget.activeLayerInfos) {
                        widget.watch("activeLayerInfos.length", function (something) {
                            view.ui.add(widget, modules[i].position);
                        });
                        return;
                    }
                    view.ui.add(widget, modules[i].position);
                });
                return promiseUtils.resolve();
            });
        }
        return ViewPublic;
    };
});
//# sourceMappingURL=ViewBase.js.map