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
var Panel_1 = require("./Panel");
var _actions_1 = require("./Panel/_actions");
var _actions_2 = require("../_actions");
var supportedItemTypes_1 = require("../_utilities/supportedItemTypes");
var addListener = Component_1.middlewares.addListener;
var Gallery = /** @class */ (function (_super) {
    __extends(Gallery, _super);
    function Gallery(store) {
        var _this = _super.call(this, store) || this;
        var itemsPerPage = _this.props.base.applicationBaseResult.config.itemsPerPage;
        _this.state = {
            itemPages: splitToPages(_this.props.items.filteredItems, itemsPerPage)
        };
        _this.mapItemsToChildren = _this.mapItemsToChildren.bind(_this);
        _this.handleChildUpdate = _this.handleChildUpdate.bind(_this);
        _this.showInViewer = _this.showInViewer.bind(_this);
        return _this;
    }
    Gallery.prototype.render = function () {
        var tsx = this.tsx;
        if (this.props.viewer.fullscreen) {
            return null;
        }
        return (tsx("div", { class: "grid-container leader-1", style: "background-color: " + this.props.base.applicationBaseResult.config.bgColor + ";" },
            tsx("div", { class: "column-24" },
                tsx("div", { class: "padding-leader-1 block-group block-group-5-up tablet-block-group-3-up phone-block-group-1-up" }, this.mapItemsToChildren()))));
    };
    Gallery.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.items.displayKey !== this.props.items.displayKey) {
            var itemsPerPage = this.props.base.applicationBaseResult.config.itemsPerPage;
            this.setState({
                itemPages: splitToPages(nextProps.items.filteredItems, itemsPerPage)
            });
        }
        if (nextProps.router.hash !== this.props.router.hash) {
            var currentViewer = ioQuery.queryToObject(this.props.router.hash).viewer;
            var nextViewer = ioQuery.queryToObject(nextProps.router.hash).viewer;
            if (currentViewer !== nextViewer) {
                for (var child in this.childComponents) {
                    if (this.childComponents.hasOwnProperty(child)) {
                        this.childComponents[child].store.dispatch({
                            type: _actions_1.VIEWER_CHANGE,
                            payload: nextViewer
                        });
                    }
                }
            }
        }
    };
    Gallery.prototype.mapItemsToChildren = function () {
        var _this = this;
        var tsx = this.tsx;
        var displayItems = this.state.itemPages[this.props.page - 1];
        this.childComponents = displayItems.reduce(function (result, item) {
            if (_this.childComponents[item.id]) {
                result[item.id] = _this.childComponents[item.id];
            }
            return result;
        }, {});
        return displayItems.map(function (item) {
            if (item.type === "Dashboard") {
                item.url = item.portal.url + "/apps/opsdashboard/index.html#/" + item.id;
            }
            return (tsx(Panel_1.default, { key: item.id, store: {
                    reducers: Panel_1.reducers,
                    initialState: {
                        applicationBaseResult: _this.props.base.applicationBaseResult,
                        i18n: _this.props.base.i18n,
                        item: item,
                        itemType: supportedItemTypes_1.default[item.type],
                        portal: _this.props.base.applicationBase.portal
                    },
                    middlewares: [addListener(_this.handleChildUpdate)]
                } }));
        });
    };
    Gallery.prototype.handleChildUpdate = function (action, childState) {
        switch (action.type) {
            case _actions_1.SHOW_IN_VIEWER:
                this.showInViewer(childState.item.id);
                break;
            case _actions_1.SHOW_FULLSCREEN:
                this.showFullscreen(childState.item.id);
                break;
            default: //
        }
    };
    Gallery.prototype.showInViewer = function (itemId) {
        var hash = this.props.router.hash;
        var hashParams = ioQuery.queryToObject(hash);
        hashParams.viewer = itemId;
        this.dispatch(_actions_2.push(ioQuery.objectToQuery(hashParams)));
    };
    Gallery.prototype.showFullscreen = function (itemId) {
        var hash = this.props.router.hash;
        var hashParams = ioQuery.queryToObject(hash);
        hashParams.viewer = itemId;
        hashParams.fullscreen = true;
        this.dispatch(_actions_2.push(ioQuery.objectToQuery(hashParams)));
    };
    return Gallery;
}(Component_1.default));
exports.default = Gallery;
function splitToPages(items, perPage) {
    return items.reduce(function (result, item) {
        if (result[result.length - 1].length < perPage) {
            result[result.length - 1].push(item);
        }
        else {
            result.push([item]);
        }
        return result;
    }, [[]]);
}
//# sourceMappingURL=index.js.map