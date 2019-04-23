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
var Component_1 = require("../../Component");
var _actions_1 = require("./_actions");
var Header_1 = require("./Header");
var Gallery_1 = require("./Gallery");
var Viewer_1 = require("./Viewer");
var Pager_1 = require("./Pager");
var _reducers_1 = require("./_reducers");
exports.reducers = _reducers_1.reducers;
var MinimalGallery = /** @class */ (function (_super) {
    __extends(MinimalGallery, _super);
    function MinimalGallery(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            status: "loading",
            loadMessage: "init"
        };
        _this.dispatch(_actions_1.loadApplicationBase());
        return _this;
    }
    MinimalGallery.prototype.render = function () {
        var tsx = this.tsx;
        var i18n = this.props.base.i18n;
        var status = this.props.base.status;
        if (status === "loading") {
            return (tsx("div", null,
                tsx("div", { class: "loader is-active padding-leader-3 padding-trailer-3 center-style", key: "loader" },
                    tsx("div", { class: "loader-bars" }),
                    tsx("div", { bind: this, class: "loader-text" }, i18n.appLoading[this.state.loadMessage]))));
        }
        else if (status === "success") {
            return (tsx("div", null,
                this.props.base.applicationBaseResult.config.showHeader ?
                    tsx(Header_1.default, { key: "minimal-gallery-header" }) :
                    null,
                tsx(Gallery_1.default, { key: "minimal-gallery" }),
                tsx(Viewer_1.default, { key: "minimal-gallery-viewer" }),
                tsx(Pager_1.default, { key: "minimal-gallery-pager" })));
        }
        else if (status === "noauth") {
            return (tsx("div", null,
                tsx("div", { key: "no-auth-container", class: "center-style", style: "padding: 1rem;" },
                    tsx("h3", { key: "no-license" }, i18n.appLoading.notLicensed),
                    tsx("p", { key: "no-auth" }, i18n.appLoading.noauth))));
        }
        return (tsx("div", null,
            tsx("h3", { class: "center-style" }, i18n.appLoading.failed)));
    };
    return MinimalGallery;
}(Component_1.default));
exports.default = MinimalGallery;
//# sourceMappingURL=index.js.map