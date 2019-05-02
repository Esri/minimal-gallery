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
var Component_1 = require("../../Component");
var _actions_1 = require("./_actions");
var Pager = /** @class */ (function (_super) {
    __extends(Pager, _super);
    function Pager(store) {
        var _this = _super.call(this, store) || this;
        _this.handleNext = _this.handleNext.bind(_this);
        _this.handlePrevious = _this.handlePrevious.bind(_this);
        _this.handlePageButton = _this.handlePageButton.bind(_this);
        _this.handlePage = _this.handlePage.bind(_this);
        return _this;
    }
    Pager.prototype.render = function () {
        var _this = this;
        var tsx = this.tsx;
        var config = this.props.base.applicationBaseResult.config;
        var displayItems = this.props.items.filteredItems;
        var pages = Math.ceil(displayItems.length / config.itemsPerPage);
        //No pager rendered if only a single page
        if (pages <= 1) {
            return;
        }
        var prevButtonClasses = {
            "btn": true,
            "btn-disabled": this.props.page <= 1,
            "btn-transparent": true
        };
        var nextButtonClasses = {
            "btn": true,
            "btn-arrow": true,
            "btn-disabled": this.props.page >= pages,
            "btn-transparent": true
        };
        var pageButtons = Array.apply(null, Array(pages)).map(function (v, i) {
            var isActive = _this.props.page === i + 1;
            return (tsx("a", { id: "page-" + (i + 1) + "-button", title: "page-" + (i + 1), class: "btn" + (!isActive ? " btn-transparent" : ""), onclick: _this.handlePageButton, role: "link", tabindex: "0", style: "\n                        color: " + (isActive ? config.buttonTextColor : config.buttonBgColor) + ";\n                        background-color: " + (isActive ? config.buttonBgColor : null) + ";\n                        border: " + (isActive ? "1px solid " + config.buttonBgColor : "none") + "\n                    ", key: "page-button-" + (i + 1) + "-" + _this.props.items.displayKey }, i + 1));
        });
        return (tsx("div", { class: "text-center trailer-1 leader-1", key: "pager" },
            tsx("a", { id: "previous", title: "previous", classes: prevButtonClasses, role: "link", tabindex: "0", style: "color:" + config.buttonBgColor + ";", key: "previous-button", onclick: this.handlePrevious }, "Previous"),
            pageButtons,
            tsx("a", { id: "next", title: "next", classes: nextButtonClasses, role: "link", tabindex: "0", style: "color:" + config.buttonBgColor + ";", key: "next-button", onclick: this.handleNext }, "Next")));
    };
    Pager.prototype.handleNext = function () {
        this.handlePage(this.props.page + 1);
    };
    Pager.prototype.handlePrevious = function () {
        this.handlePage(this.props.page - 1);
    };
    Pager.prototype.handlePageButton = function (e) {
        this.handlePage(e.target.text);
    };
    Pager.prototype.handlePage = function (page) {
        var hash = this.props.router.hash;
        var hashParams = ioQuery.queryToObject(hash);
        if (page > 1) {
            hashParams.page = page;
        }
        else {
            if (hashParams.page) {
                delete hashParams.page;
            }
        }
        this.dispatch(_actions_1.push(ioQuery.objectToQuery(hashParams)));
    };
    return Pager;
}(Component_1.default));
exports.default = Pager;
//# sourceMappingURL=Pager.js.map