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
var Caption = /** @class */ (function (_super) {
    __extends(Caption, _super);
    function Caption(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            captionBelowOpacity: 0.8,
            captionOpacity: 1,
            captionTransform: 0,
            panelType: _this.props.getPanelType(_this.props.item.type)
        };
        return _this;
    }
    Caption.prototype.render = function () {
        var tsx = this.tsx;
        var config = this.props.applicationBaseResult.config;
        if (config.showItemType) {
            if (config.itemTypeBelowThumbnail) {
                return (tsx("div", { class: "card-below-image-caption", style: "\n                            opacity: " + this.state.captionBelowOpacity + ";\n                            background-color: " + convertHex(config[this.state.panelType + "CaptionColor"], 80) + ";\n                            color: " + config.captionTextColor + ";\n                        " }, this.props.item.displayName));
            }
            else {
                return (tsx("div", { class: "card-image-caption", style: "\n                            opacity: " + this.state.captionOpacity + ";\n                            transform: translate(0, " + this.state.captionTransform + "%);\n                            background-color: " + convertHex(config[this.state.panelType + "CaptionColor"], 80) + ";\n                            color: " + config.captionTextColor + ";\n                        " }, this.props.item.displayName));
            }
        }
        return null;
    };
    Caption.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.hovering !== this.props.hovering) {
            this.setState({
                captionBelowOpacity: nextProps.hovering ? 1 : 0.8,
                captionOpacity: nextProps.hovering ? 0 : 1,
                captionTransform: nextProps.hovering ? 100 : 0
            });
        }
    };
    return Caption;
}(Component_1.default));
exports.default = Caption;
function convertHex(hex, opacity) {
    hex = hex.replace("#", "");
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    var result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
    return result;
}
//# sourceMappingURL=Caption.js.map