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
var ioQuery = require("dojo/io-query");
var Component_1 = require("../../../Component");
var _actions_1 = require("../_actions");
var View_1 = require("./View");
var convertHex_1 = require("../_utilities/convertHex");
var supportedItemTypes_1 = require("../_utilities/supportedItemTypes");
var Viewer = /** @class */ (function (_super) {
    __extends(Viewer, _super);
    function Viewer(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            containerClasses: {
                "animate-fade-in": true,
                "animate-fade-out": false
            },
            scrollY: 0
        };
        _this.handleExitKeyPress = _this.handleExitKeyPress.bind(_this);
        _this.handleExitClick = _this.handleExitClick.bind(_this);
        _this.closeViewer = _this.closeViewer.bind(_this);
        return _this;
    }
    Viewer.prototype.render = function () {
        var tsx = this.tsx;
        var i18n = this.props.base.i18n;
        var config = this.props.base.applicationBaseResult.config;
        var item = this.props.items.viewerItem;
        if (this.props.viewer.visible && !!item.id) {
            var viewType = supportedItemTypes_1.default[item.type];
            var view = void 0;
            if (viewType === "webmap") {
                view = tsx(View_1.MapView, { key: item.id });
            }
            else if (viewType === "webscene") {
                view = tsx(View_1.SceneView, { key: item.id });
            }
            else if (viewType === "webapp") {
                view = tsx(View_1.AppView, { key: item.id });
            }
            else {
                return null;
            }
            if (this.props.viewer.fullscreen) {
                return (tsx("div", { id: "map-container", class: "map-container fullscreen", key: "map-container-fullscreen-" + item.id }, view));
            }
            return (tsx("div", { id: "view-container", key: "view-container", classes: this.state.containerClasses, style: "background-color: " + convertHex_1.default(config.bgColor, 85) + ";" },
                tsx("div", { id: "map-container", class: "map-container", key: "map-container-" + item.id }, view),
                tsx("button", { class: "btn btn-clear view-exit-button clickable", onclick: this.handleExitClick, onkeypress: this.handleExitKeyPress, title: i18n.ui.close, afterCreate: this.focus },
                    tsx("span", { class: "view-exit-icon" },
                        tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32" },
                            tsx("path", { d: "M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z" }))))));
        }
        return null;
    };
    Viewer.prototype.componentWillReceiveProps = function (nextProps) {
        if (!this.props.viewer.visible && nextProps.viewer.visible) {
            this.setState({ scrollY: window.scrollY });
        }
        if (this.props.viewer.visible && !nextProps.viewer.visible) {
            this.childComponents = {};
        }
    };
    Viewer.prototype.focus = function (el) {
        setTimeout(function () {
            el.focus();
        }, 10);
    };
    Viewer.prototype.handleExitKeyPress = function (e) {
        if (e.key === "Enter") {
            this.handleExitClick();
        }
    };
    Viewer.prototype.handleExitClick = function () {
        var _this = this;
        this.setState({
            containerClasses: {
                "animate-fade-in": false,
                "animate-fade-out": true
            }
        });
        setTimeout(function () {
            _this.closeViewer();
            _this.setState({
                containerClasses: {
                    "animate-fade-in": true,
                    "animate-fade-out": false
                }
            });
        }, 750);
    };
    Viewer.prototype.closeViewer = function () {
        var hash = this.props.router.hash;
        var hashParams = ioQuery.queryToObject(hash);
        delete hashParams.viewer;
        this.dispatch(_actions_1.push(ioQuery.objectToQuery(hashParams)));
    };
    return Viewer;
}(Component_1.default));
exports.default = Viewer;
//# sourceMappingURL=index.js.map