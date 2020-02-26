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
var Component_1 = require("../../../../Component");
var ViewBase_1 = require("./ViewBase");
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
                        var _a;
                        return __assign({}, result, (_a = {}, _a[key] = config[key], _a));
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
//# sourceMappingURL=MapView.js.map