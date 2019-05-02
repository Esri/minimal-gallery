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
var Component_1 = require("../../../../Component");
var AppView = /** @class */ (function (_super) {
    __extends(AppView, _super);
    function AppView(store) {
        return _super.call(this, store) || this;
    }
    AppView.prototype.render = function () {
        var tsx = this.tsx;
        return (tsx("iframe", { src: this.props.items.viewerItem.url, class: "app-frame", id: "embedded-mapping-application-iframe", name: "nested-iframe" },
            tsx("h3", { class: "center-style" }, this.props.base.i18n.viewLoading.iframe)));
    };
    return AppView;
}(Component_1.default));
exports.AppView = AppView;
//# sourceMappingURL=AppView.js.map