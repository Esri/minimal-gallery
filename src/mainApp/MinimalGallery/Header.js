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
var base_1 = require("./_actions/base");
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(store) {
        var _this = _super.call(this, store) || this;
        _this.state = {
            searchTerm: _this.props.filter
        };
        _this.handleSearch = _this.handleSearch.bind(_this);
        _this.handleSearchChange = _this.handleSearchChange.bind(_this);
        _this.handleSignIn = _this.handleSignIn.bind(_this);
        _this.handleSignOut = _this.handleSignOut.bind(_this);
        return _this;
    }
    Header.prototype.render = function () {
        var tsx = this.tsx;
        var config = this.props.base.applicationBaseResult.config;
        var headSearch = config.headerSearch ? (tsx("nav", { class: "class-top-nav-list right", role: "navigation", title: "usernav" },
            tsx("form", { class: "inline-block padding-leader-half", role: "search", onsubmit: this.handleSearch },
                tsx("input", { title: config.searchPlaceholder, type: "search", placeholder: config.searchPlaceholder, name: "q", value: this.state.searchTerm, style: "margin-top: -1px;", oninput: this.handleSearchChange }),
                tsx("button", { type: "submit", class: "hide" }, config.searchPlaceholder)))) : null;
        var tabletHeadSearch = config.headerSearch ? (tsx("nav", { class: "class-top-nav-list right", role: "navigation", title: "usernav" },
            tsx("form", { class: "inline-block padding-leader-half", role: "search", onsubmit: this.handleSearch },
                tsx("input", { title: config.searchPlaceholder, type: "search", placeholder: config.searchPlaceholder, name: "q", value: this.state.searchTerm, style: "margin-top: -1px;", oninput: this.handleSearchChange }),
                tsx("button", { type: "submit", class: "hide" }, config.searchPlaceholder)))) : null;
        var headImage = config.headerImage ? (tsx("img", { src: config.headerImageLocation, class: "header-image", alt: config.headerText })) : null;
        var agolLink = config.showAgolLink ? (tsx("a", { class: "top-nav-link", href: appendProtocol(config.agolLinkLocation.replace("${GROUP_ID}", config.group)), style: "color: " + config.headerTextColor, title: config.agolLinkText, target: "_blank" }, config.agolLinkText)) : null;
        var signInLink = null;
        if (!this.props.base.applicationBase.portal["credential"] &&
            this.props.base.applicationBaseResult.config.showSignInBtn) {
            signInLink = (tsx("button", { class: "top-nav-btn", key: "sign-in-btn", onclick: this.handleSignIn, style: "color: " + config.headerTextColor },
                tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", style: "\n                            fill: currentColor;\n                            pointer-events: none;\n                            display: inline-block;\n                            width: 1em;\n                            height: 1em;\n                            vertical-align: -0.15em;\n                            padding-right: .5em;\n                        " },
                    tsx("path", { d: "M16.005 15.871a5.872 5.872 0 0 0 0-11.742 5.87 5.87 0 1 0 0 11.742zm11.567 7.188C27.27 19.036 20.023 18 16 18c-4.012 0-11.271 1.039-11.573 5.059C4.203 26.11 4.068 28.18 4.02 30h23.96c-.047-1.82-.184-3.891-.407-6.941z" })),
                this.props.base.i18n.header.signIn));
        }
        else if (this.props.base.applicationBaseResult.config.showSignInBtn &&
            this.props.base.applicationBase.portal.user) {
            signInLink = (tsx("button", { class: "top-nav-btn", key: "sign-out-btn", onclick: this.handleSignOut, style: "color: " + config.headerTextColor },
                tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", style: "\n                            fill: currentColor;\n                            pointer-events: none;\n                            display: inline-block;\n                            width: 1em;\n                            height: 1em;\n                            vertical-align: -0.15em;\n                            padding-right: .5em;\n                        " },
                    tsx("path", { d: "M16.005 15.871a5.872 5.872 0 0 0 0-11.742 5.87 5.87 0 1 0 0 11.742zm11.567 7.188C27.27 19.036 20.023 18 16 18c-4.012 0-11.271 1.039-11.573 5.059C4.203 26.11 4.068 28.18 4.02 30h23.96c-.047-1.82-.184-3.891-.407-6.941z" })), this.props.base.i18n.header.signOut + " (" + this.props.base.applicationBase.portal.user.username + ")"));
        }
        return (tsx("header", { class: "top-nav fade-in", style: "background-color: " + config.headColor },
            tsx("div", { class: "grid-container" },
                tsx("div", { class: "column-24" },
                    tsx("div", { class: "tablet-hide" },
                        tsx("a", { href: appendProtocol(config.headerTextURL), target: "_blank" },
                            headImage,
                            tsx("a", { class: "top-nav-title", style: "color: " + config.headerTextColor }, config.headerText)),
                        headSearch,
                        signInLink,
                        agolLink),
                    tsx("div", { class: "tablet-show top-nav-flex" },
                        tsx("header", { class: "top-nav-flex-title" },
                            tsx("a", { href: appendProtocol(config.headerTextURL) },
                                tsx("a", { class: "top-nav-title", style: "color: " + config.headerTextColor }, config.headerText)),
                            tabletHeadSearch))))));
    };
    Header.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.filter !== this.state.searchTerm) { // Set search term based on URL param
            this.setState({ searchTerm: nextProps.filter });
        }
    };
    Header.prototype.handleSearch = function (e) {
        if (e) {
            e.preventDefault();
        }
        var query = this.state.searchTerm.length > 0 ? "query=" + this.state.searchTerm : "";
        this.dispatch(_actions_1.push("" + query));
    };
    Header.prototype.handleSearchChange = function (e) {
        this.setState({
            searchTerm: e.target.value
        });
        if (e.target.value === "") {
            this.handleSearch();
        }
    };
    Header.prototype.handleSignIn = function () {
        this.dispatch(base_1.signIn());
    };
    Header.prototype.handleSignOut = function () {
        this.dispatch(base_1.signOut());
    };
    return Header;
}(Component_1.default));
exports.default = Header;
function appendProtocol(location) {
    if (location.indexOf("http") === 0) {
        return location;
    }
    return "http://" + location;
}
//# sourceMappingURL=Header.js.map