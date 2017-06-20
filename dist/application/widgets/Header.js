define(["require", "exports", "esri/widgets/support/widget"], function (require, exports, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = function (props) {
        var headSearch = props.config.headerSearch ? (widget_1.jsxFactory("nav", { class: "class-top-nav-list right", role: "navigation", title: "usernav" },
            widget_1.jsxFactory("form", { class: "inline-block padding-leader-half", role: "search", onsubmit: props.onSearch },
                widget_1.jsxFactory("input", { title: props.config.searchPlaceholder, type: "search", placeholder: props.config.searchPlaceholder, name: "q", style: "margin-top: -1px;", oninput: handleSearchChange }),
                widget_1.jsxFactory("button", { type: "submit", class: "hide" }, props.config.searchPlaceholder)))) : null;
        var headImage = props.config.headerImage ? (widget_1.jsxFactory("img", { src: props.config.headerImageLocation, class: "header-image", alt: props.config.headerText })) : null;
        return {
            render: function () {
                return (widget_1.jsxFactory("header", { class: "top-nav fade-in", style: "background-color: " + props.config.headColor },
                    widget_1.jsxFactory("div", { class: "grid-container" },
                        widget_1.jsxFactory("div", { class: "column-24" },
                            widget_1.jsxFactory("div", { class: "tablet-hide" },
                                widget_1.jsxFactory("a", { href: props.config.headerTextURL },
                                    headImage,
                                    widget_1.jsxFactory("a", { class: "top-nav-title", style: "color: " + props.config.fontColor }, props.config.headerText)),
                                widget_1.jsxFactory("nav", { class: "top-nav-list", role: "navigation", title: "topnav" },
                                    widget_1.jsxFactory("a", { class: "top-nav-link", href: props.config.agolLinkLocation.replace("${GROUP_ID}", props.config.group), style: "color: " + props.config.fontColor }, props.config.agolLinkText)),
                                headSearch),
                            widget_1.jsxFactory("div", { class: "tablet-show top-nav-flex" },
                                widget_1.jsxFactory("header", { class: "top-nav-flex-title" },
                                    widget_1.jsxFactory("a", { href: props.config.headerTextURL },
                                        widget_1.jsxFactory("a", { class: "top-nav-title", style: "color: " + props.config.fontColor }, props.config.headerText))),
                                headSearch)))));
            }
        };
        function handleSearchChange(e) {
            if (e.target.value === "") {
                props.onSearch({
                    preventDefault: function () { return null; },
                    target: {
                        childNodes: [{ value: e.target.value }]
                    }
                });
            }
        }
    };
});
//# sourceMappingURL=Header.js.map