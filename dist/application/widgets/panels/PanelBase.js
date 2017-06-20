define(["require", "exports", "esri/widgets/support/widget"], function (require, exports, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = function (props) {
        var author = props.config.showAuthor ? (widget_1.jsxFactory("p", { class: "font-size--1 card-last hug-bottom", key: props.item.title + "-author" }, props.item.owner)) : null;
        var PanelBaseComponent = {
            captionOpacity: 1,
            captionTransform: 0,
            render: function () {
                var caption = props.config.showItemType ? (widget_1.jsxFactory("div", { class: "card-image-caption", style: "\n                        opacity: " + PanelBaseComponent.captionOpacity + ";\n                        transform: translate(0, " + PanelBaseComponent.captionTransform + "%);\n                        background-color: " + convertHex(props.captionColor, 80) + ";\n                        color: " + props.config.captionTextColor + "\n                    " }, props.item.displayName)) : null;
                return (widget_1.jsxFactory("div", { class: "card block trailer-1 animate-fade-in card-fade", style: "background-color: " + props.config.cardColor + ";", key: props.item.title + "-div" },
                    widget_1.jsxFactory("figure", { class: "card-image-wrap" },
                        widget_1.jsxFactory("a", { title: props.i18n.ui.galleryTip, role: "link", tabindex: "0", onkeypress: handleKeyPress },
                            widget_1.jsxFactory("img", { class: "card-image clickable thumbnail-min", img: true, src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", alt: props.item.title, onmouseover: handleMouseOver, onmouseleave: handleMouseOut, onclick: props.itemClickHandler, style: "\n                                    background-image: url(" + props.item.thumbnailUrl + ");\n                                    background-repeat: no-repeat;\n                                    background-size: cover;\n                                " })),
                        caption),
                    widget_1.jsxFactory("div", { class: "card-content", style: "color: " + props.config.fontColor },
                        widget_1.jsxFactory("a", { title: props.i18n.ui.galleryTip, style: "color: " + props.config.linkColor },
                            widget_1.jsxFactory("h5", { tabindex: "0", class: "clickable", onclick: props.itemClickHandler }, props.item.title)),
                        author,
                        widget_1.jsxFactory("div", { class: "open-out-container" },
                            widget_1.jsxFactory("a", { class: "open-out-icon btn btn-transparent icon-ui-description", title: props.extItem, href: props.extLink, style: "color: " + props.config.buttonBgColor, key: props.item.title + "-info-icon" }),
                            widget_1.jsxFactory("a", { class: "open-out-icon btn btn-transparent icon-ui-maximize", title: props.extTitle, href: props.maxLink, style: "color: " + props.config.buttonBgColor, key: props.item.title + "-open-out-icon" })))));
            }
        };
        function handleMouseOver() {
            PanelBaseComponent.captionOpacity = 0;
            PanelBaseComponent.captionTransform = 100;
        }
        function handleMouseOut() {
            PanelBaseComponent.captionOpacity = 1;
            PanelBaseComponent.captionTransform = 0;
        }
        function handleKeyPress(e) {
            if (e.keyCode === 13) {
                props.itemClickHandler();
            }
        }
        function convertHex(hex, opacity) {
            hex = hex.replace("#", "");
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);
            var result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
            return result;
        }
        return PanelBaseComponent;
    };
});
//# sourceMappingURL=PanelBase.js.map