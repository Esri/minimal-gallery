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
var Caption_1 = require("./Caption");
var _actions_1 = require("./_actions");
var _reducers_1 = require("./_reducers");
exports.reducers = _reducers_1.reducers;
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            panelType: _this.props.getPanelType(_this.props.item.type),
        };
        _this.handleMouseOver = _this.handleMouseOver.bind(_this);
        _this.handleMouseOut = _this.handleMouseOut.bind(_this);
        _this.handleItemKeyPress = _this.handleItemKeyPress.bind(_this);
        _this.handleItemClick = _this.handleItemClick.bind(_this);
        _this.handleMaxClick = _this.handleMaxClick.bind(_this);
        _this.registerItemLink = _this.registerItemLink.bind(_this);
        return _this;
    }
    Panel.prototype.render = function () {
        var tsx = this.tsx;
        var i18n = this.props.i18n;
        var config = this.props.applicationBaseResult.config;
        var author = config.showAuthor ? (tsx("p", { class: "font-size--1 card-last hug-bottom author-text", key: this.props.item.title + "-author" }, this.props.item.owner)) : null;
        var tooltipSnippet;
        if (config.showSummaryTooltip) {
            tooltipSnippet = this.props.item.snippet ? this.props.item.snippet : null;
            if (tooltipSnippet && tooltipSnippet.length > config.tooltipTruncLength) {
                tooltipSnippet = tooltipSnippet.slice(0, config.tooltipTruncLength) + "...";
            }
        }
        var cardSnippet;
        var summaryElement;
        if (config.showItemSummary) {
            cardSnippet = this.props.item.snippet ? this.props.item.snippet : null;
            if (cardSnippet && cardSnippet.length > config.summaryTruncLength) {
                cardSnippet = cardSnippet.slice(0, config.summaryTruncLength) + "...";
            }
            summaryElement = tsx("p", { class: "item-description-text" }, cardSnippet);
        }
        var itemPageLink;
        if (config.showItemPageLink) {
            itemPageLink = (tsx("a", { class: "open-out-icon btn btn-transparent toolbar-tooltip", "aria-label": tooltipSnippet ? tooltipSnippet : i18n.ui.itemExtTip, href: this.props.applicationBaseResult.portal.url + "/home/item.html?id=" + this.props.item.id, style: "color: " + config.buttonBgColor, key: this.props.item.title + "-info-icon", tabindex: "0", target: this.props.applicationBaseResult.config.openItemDetailsSeparateTab ? "_blank" : "" },
                tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", style: "\n                            fill: #0079c1;\n                            pointer-events: none;\n                            display: inline-block;\n                            width: 1em;\n                            height: 1em;\n                            vertical-align: -0.15em;\n                            padding-right: .15em;\n                        " },
                    tsx("path", { d: "M31.297 16.047c0 8.428-6.826 15.25-15.25 15.25S.797 24.475.797 16.047c0-8.424 6.826-15.25 15.25-15.25s15.25 6.826 15.25 15.25zM18 24V12h-4v12h-2v2h8v-2h-2zm0-18h-4v4h4V6z" }))));
        }
        var maxLink;
        if (this.props.itemType !== "file" && !config.alwaysOpenFullscreen) {
            maxLink = (tsx("a", { class: "open-out-icon btn btn-transparent toolbar-tooltip", "aria-label": i18n.ui[this.state.panelType + "ExtTip"], style: "color: " + config.buttonBgColor, key: this.props.item.title + "-open-out-icon", href: this.props.itemType === "webapp" ?
                    this.props.item.url :
                    "" + window.location.origin + window.location.pathname + window.location.search + "#viewer=" + this.props.item.id + "&fullscreen=true", target: this.props.applicationBaseResult.config.openFullscreenSeparateTab ? "_blank" : "", tabindex: "0" },
                tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", style: "\n                            fill: #0079c1;\n                            pointer-events: none;\n                            display: inline-block;\n                            width: 1em;\n                            height: 1em;\n                            vertical-align: -0.15em;\n                            padding-right: .15em;\n                        " },
                    tsx("path", { d: "M2 4v24h28V4H2zm26 22H4V10h24v16z" }))));
        }
        var mainTip = this.props.itemType === "file" ? i18n.ui.itemExtTip :
            (config.alwaysOpenFullscreen ? i18n.ui[this.state.panelType + "ExtTip"] : i18n.ui.galleryTip);
        if (this.props.item.type === "PDF") {
            mainTip = i18n.ui.pdfTip;
        }
        else if (this.props.item.type === "Document Link" &&
            this.props.applicationBaseResult.config.openDocumentLinksDirectly) {
            mainTip = i18n.ui.documentTip;
        }
        var title;
        if (config.showItemTitle) {
            title = (tsx("a", { title: mainTip, style: "color: " + config.linkColor, class: "break-word", onclick: this.handleItemClick, onkeypress: this.handleItemKeyPress },
                tsx("h5", { tabindex: "0", class: "clickable" }, this.props.item.title)));
        }
        return (tsx("div", { class: "card block trailer-1 animate-fade-in card-fade", style: "background-color: " + config.cardColor + "; z-index: 1", key: this.props.item.id + "-div" },
            tsx("figure", { class: "card-image-wrap" },
                tsx("a", { title: mainTip, role: "link", tabindex: "0", onclick: this.handleItemClick, onkeypress: this.handleItemKeyPress, afterCreate: this.registerItemLink },
                    tsx("img", { key: this.props.item.id + "-thumbnail", class: "card-image clickable thumbnail-min", src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", alt: this.props.item.title, onmouseover: this.handleMouseOver, onmouseout: this.handleMouseOut, style: "\n                                background-image: url(" + this.props.item.thumbnailUrl + ");\n                                background-repeat: no-repeat;\n                                background-size: cover;\n                            " })),
                tsx(Caption_1.default, { key: "card-caption" })),
            tsx("div", { class: "card-content", style: "color: " + config.fontColor },
                title,
                summaryElement,
                author,
                tsx("div", { class: "open-out-container" },
                    itemPageLink,
                    maxLink))));
    };
    Panel.prototype.componentWillReceiveProps = function (nextProps) {
        if (!nextProps.activeViewer &&
            this.props.activeViewer &&
            this.state.itemLink &&
            this.props.activeViewer === this.props.item.id) {
            this.state.itemLink.focus();
        }
    };
    Panel.prototype.registerItemLink = function (itemLink) {
        this.setState({ itemLink: itemLink });
    };
    Panel.prototype.handleMouseOver = function () {
        this.dispatch(_actions_1.mouseOver());
    };
    Panel.prototype.handleMouseOut = function () {
        this.dispatch(_actions_1.mouseOut());
    };
    Panel.prototype.handleItemKeyPress = function (e) {
        if (e.key === "Enter") {
            this.handleItemClick();
        }
    };
    Panel.prototype.handleItemClick = function () {
        if (this.props.item.type === "Document Link" &&
            this.props.applicationBaseResult.config.openDocumentLinksDirectly) {
            window.open(this.props.item.url);
        }
        else if (this.props.item.type === "PDF") {
            window.open(this.props.item.itemUrl + "/data" + (this.props.portal["credential"] ?
                "?token=" + this.props.portal["credential"].token : ""));
        }
        else if (this.props.itemType === "file") {
            window.open(this.props.applicationBaseResult.portal.url + "/home/item.html?id=" + this.props.item.id, "_blank");
        }
        else {
            if (this.props.applicationBaseResult.config.alwaysOpenFullscreen) {
                this.handleMaxClick();
            }
            else {
                this.dispatch(_actions_1.showInViewer());
            }
        }
    };
    Panel.prototype.handleMaxClick = function () {
        if (this.props.applicationBaseResult.config.openFullscreenSeparateTab) {
            if (this.props.itemType === "webapp") {
                window.open(this.props.item.url, "_blank");
            }
            else {
                window.open("" + window.location.origin + window.location.pathname + window.location.search + "#viewer=" + this.props.item.id + "&fullscreen=true", "_blank");
            }
        }
        else {
            if (this.props.itemType === "webapp") {
                window.location.href = this.props.item.url;
            }
            else {
                this.dispatch(_actions_1.showFullscreen());
            }
        }
    };
    return Panel;
}(Component_1.default));
exports.default = Panel;
//# sourceMappingURL=index.js.map