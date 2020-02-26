/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("esri/core/accessorSupport/decorators");
var Widget = require("esri/widgets/Widget");
var MinimalGallery_1 = require("./MinimalGallery");
var router_1 = require("./MinimalGallery/_utilities/router");
var Component_1 = require("../Component");
var thunk = Component_1.middlewares.thunk, debug = Component_1.middlewares.debug;
var MainApp = /** @class */ (function (_super) {
    __extends(MainApp, _super);
    function MainApp(props) {
        var _this = _super.call(this) || this;
        _this.minimalGallery = new MinimalGallery_1.default(Component_1.newStore({
            reducers: MinimalGallery_1.reducers,
            parentWidget: _this,
            initialState: {
                base: {
                    applicationBase: props.boilerplate,
                    applicationBaseResult: null,
                    i18n: props.i18n,
                    status: "loading",
                    loadMessage: "init"
                }
            },
            middlewares: [thunk, router_1.router]
        }));
        router_1.startHistoryListener(_this.minimalGallery.store);
        return _this;
    }
    MainApp.prototype.render = function () {
        return this.minimalGallery.render();
    };
    MainApp = __decorate([
        decorators_1.subclass("esri.widgets.MinimalGallery")
    ], MainApp);
    return MainApp;
}(decorators_1.declared(Widget)));
exports.default = MainApp;
//# sourceMappingURL=Widget.js.map