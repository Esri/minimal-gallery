var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("../../../../../Component");
var _reducers_1 = require("./_reducers");
exports.reducers = _reducers_1.reducers;
var all = require("dojo/promise/all");
var promiseUtils = require("esri/core/promiseUtils");
var requireUtils = require("esri/core/requireUtils");
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
//# sourceMappingURL=index.js.map