/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/promise/all", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "./Gallery", "./Header", "./Pager", "./Viewer"], function (require, exports, __extends, __decorate, all, decorators_1, widget_1, Widget, Gallery_1, Header_1, Pager_1, Viewer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var filterMap = {
        "Web Map": "webmap",
        "Web Mapping Application": "webapp",
        "Web Scene": "webscene"
    };
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main(params) {
            var _this = _super.call(this) || this;
            _this.state = {
                boilerplate: params.boilerplate,
                boilerplateResult: null,
                galleryComponent: null,
                groupQueryResults: null,
                headComponent: { render: function () { return null; } },
                i18n: params.i18n,
                items: null,
                itemPointer: 0,
                itemsPerPage: 20,
                loadMessage: "init",
                loadStatus: "loading",
                pagerComponent: { render: function () { return null; } },
                searchResults: null,
                viewComponent: { render: function () { return null; } }
            };
            _this.exitClickHandler = _this.exitClickHandler.bind(_this);
            _this.handleBoilerplateError = _this.handleBoilerplateError.bind(_this);
            _this.handleBoilerplateLoad = _this.handleBoilerplateLoad.bind(_this);
            _this.handleBoilerplateProgress = _this.handleBoilerplateProgress.bind(_this);
            _this.itemClickHandler = _this.itemClickHandler.bind(_this);
            _this.processItems = _this.processItems.bind(_this);
            _this.handleSearch = _this.handleSearch.bind(_this);
            _this.goToPointer = _this.goToPointer.bind(_this);
            _this.boilerplate = params.boilerplate;
            _this.boilerplate.load().then(_this.handleBoilerplateLoad, _this.handleBoilerplateError, _this.handleBoilerplateProgress);
            return _this;
        }
        Main.prototype.render = function () {
            if (this.state.loadStatus === "loaded") {
                return (widget_1.jsxFactory("div", null,
                    this.state.headComponent.render(),
                    this.state.galleryComponent.render(),
                    this.state.viewComponent.render(),
                    this.state.pagerComponent.render()));
            }
            else if (this.state.loadStatus === "failed") {
                return (widget_1.jsxFactory("h3", { class: "center-style" }, this.state.i18n.appLoading.failed));
            }
            else if (this.state.loadStatus === "searching") {
                return (widget_1.jsxFactory("div", null,
                    this.state.headComponent.render(),
                    widget_1.jsxFactory("div", { class: "loader is-active padding-leader-3 padding-trailer-3 center-style", key: "loader" },
                        widget_1.jsxFactory("div", { class: "loader-bars" }),
                        widget_1.jsxFactory("div", { bind: this, class: "loader-text" }, this.state.i18n.appLoading[this.state.loadMessage]))));
            }
            return (widget_1.jsxFactory("div", null,
                widget_1.jsxFactory("div", { class: "loader is-active padding-leader-3 padding-trailer-3 center-style", key: "loader" },
                    widget_1.jsxFactory("div", { class: "loader-bars" }),
                    widget_1.jsxFactory("div", { bind: this, class: "loader-text" }, this.state.i18n.appLoading[this.state.loadMessage]))));
        };
        Main.prototype.handleBoilerplateLoad = function (boilerplateResult) {
            var _this = this;
            boilerplateResult.results.groupInfos[0].promise.then(function (response) {
                document.title = response.results[0].title;
            });
            document.documentElement.lang = boilerplateResult.locale;
            this.state = __assign({}, this.state, { boilerplateResult: boilerplateResult, loadMessage: "groupitems" });
            this.state.boilerplate.queryGroupItems(boilerplateResult.config.group, {
                num: 100,
                sortField: (boilerplateResult.config.sortField ? boilerplateResult.config.sortField : "num-views"),
                sortOrder: (boilerplateResult.config.sortOrder ? boilerplateResult.config.sortOrder : "desc"),
                start: 0
            }).then(this.processItems, function (err) {
                console.error(err);
                _this.state = __assign({}, _this.state, { loadStatus: "failed" });
            });
        };
        Main.prototype.processItems = function (response) {
            var _this = this;
            var promises = response.results.map(function (item) { return item.load(); });
            all(promises).then(function (items) {
                document.body.setAttribute("style", "background-color: " + _this.state.boilerplateResult.config.bgColor);
                _this.state = __assign({}, _this.state, { groupQueryResults: response.results });
                var filteredResults;
                var filters = _this.state.boilerplateResult.config.filter;
                if (filters) {
                    var filterKey_1 = filters.split(",").reduce(function (p, c, i) {
                        p[c] = true;
                        return p;
                    }, {});
                    filteredResults = response.results.filter(function (item) {
                        return filterKey_1[filterMap[item.type]];
                    });
                }
                else {
                    filteredResults = response.results.filter(function (item) {
                        return item.type === "Web Map" ||
                            item.type === "Web Mapping Application" ||
                            item.type === "Web Scene";
                    });
                }
                var headComponent = (_this.state.boilerplateResult.config.showHeader ?
                    Header_1.default({
                        config: _this.state.boilerplateResult.config,
                        i18n: _this.state.i18n,
                        onSearch: _this.handleSearch
                    }) :
                    {
                        render: function () { return null; }
                    });
                var pagerComponent = Pager_1.default({
                    config: _this.state.boilerplateResult.config,
                    i18n: _this.state.i18n,
                    keyCode: Math.random().toString(36).substring(7),
                    pointHandler: _this.goToPointer,
                    perPage: _this.state.itemsPerPage,
                    pointer: _this.state.itemPointer,
                    total: filteredResults.length
                });
                _this.state = __assign({}, _this.state, { galleryComponent: Gallery_1.default({
                        config: _this.state.boilerplateResult.config,
                        i18n: _this.state.i18n,
                        itemClickHandler: _this.itemClickHandler,
                        items: filteredResults.slice(0, _this.state.itemsPerPage)
                    }), headComponent: headComponent, items: filteredResults, searchResults: filteredResults, loadStatus: "loaded", pagerComponent: pagerComponent });
            }, function (err) {
                console.error(err);
                _this.state = __assign({}, _this.state, { status: "failed" });
            });
        };
        Main.prototype.handleBoilerplateError = function (err) {
            console.error(err);
            this.state = __assign({}, this.state, { loadStatus: "failed" });
        };
        Main.prototype.handleBoilerplateProgress = function (progress) {
            this.state = __assign({}, this.state, { loadMessage: progress.status });
        };
        Main.prototype.itemClickHandler = function (id, type) {
            var _this = this;
            this.state = __assign({}, this.state, { viewComponent: Viewer_1.default({
                    config: this.state.boilerplateResult.config,
                    exitClickHandler: this.exitClickHandler,
                    i18n: this.state.i18n,
                    id: id,
                    projector: this,
                    type: type,
                    widgets: Object.keys(this.state.boilerplateResult.config)
                        .filter(function (key) { return key.indexOf("Widget") !== -1; })
                        .reduce(function (p, key) {
                        p[key] = _this.state.boilerplateResult.config[key];
                        return p;
                    }, {})
                }) });
        };
        Main.prototype.exitClickHandler = function () {
            this.state = __assign({}, this.state, { viewComponent: { render: function () { return null; } } });
        };
        ;
        Main.prototype.handleSearch = function (e) {
            e.preventDefault();
            var searchResults = this.state.items.filter(function (item) {
                return item.title.toLowerCase().indexOf(e.target.childNodes[0].value.toLowerCase()) !== -1 ||
                    item.type.toLowerCase().indexOf(e.target.childNodes[0].value.toLowerCase()) !== -1 ||
                    item.owner.toLowerCase().indexOf(e.target.childNodes[0].value.toLowerCase()) !== -1;
            });
            this.state = __assign({}, this.state, { galleryComponent: Gallery_1.default({
                    config: this.state.boilerplateResult.config,
                    i18n: this.state.i18n,
                    itemClickHandler: this.itemClickHandler,
                    items: searchResults.slice(0, this.state.itemsPerPage)
                }), loadStatus: "loaded", pagerComponent: Pager_1.default({
                    config: this.state.boilerplateResult.config,
                    i18n: this.state.i18n,
                    keyCode: Math.random().toString(36).substring(7),
                    perPage: this.state.itemsPerPage,
                    pointHandler: this.goToPointer,
                    pointer: 0,
                    total: searchResults.length
                }), searchResults: searchResults });
        };
        Main.prototype.goToPointer = function (pointer) {
            this.state = __assign({}, this.state, { galleryComponent: Gallery_1.default({
                    config: this.state.boilerplateResult.config,
                    i18n: this.state.i18n,
                    itemClickHandler: this.itemClickHandler,
                    items: this.state.searchResults.slice(pointer, pointer + this.state.itemsPerPage)
                }), loadStatus: "loaded" });
        };
        return Main;
    }(decorators_1.declared(Widget)));
    __decorate([
        decorators_1.property(),
        widget_1.renderable()
    ], Main.prototype, "state", void 0);
    Main = __decorate([
        decorators_1.subclass("esri.widgets.Main")
    ], Main);
    exports.default = Main;
});
//# sourceMappingURL=Main.js.map