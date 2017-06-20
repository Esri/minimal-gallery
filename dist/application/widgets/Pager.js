var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "esri/widgets/support/widget"], function (require, exports, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = function (props) {
        var state = {
            pointer: props.pointer
        };
        return {
            render: function () {
                var prevButtonClasses = {
                    "btn": true,
                    "btn-disabled": state.pointer <= 0,
                    "btn-transparent": true
                };
                var nextButtonClasses = {
                    "btn": true,
                    "btn-arrow": true,
                    "btn-disabled": props.total - state.pointer <= props.perPage,
                    "btn-transparent": true
                };
                var pageButtons = Array.apply(null, Array(Math.ceil(props.total / props.perPage))).map(function (v, i) {
                    var isActive = state.pointer < ((i + 1) * props.perPage) && state.pointer >= (i * props.perPage);
                    var buttonClasses = {
                        "btn": true,
                        "btn-transparent": !isActive
                    };
                    return {
                        render: function () { return (widget_1.jsxFactory("a", { id: "page-" + (i + 1), title: "page-" + (i + 1), classes: buttonClasses, onclick: handlePage, role: "link", tabindex: "0", style: "\n                                color: " + (isActive ? props.config.buttonTextColor : props.config.buttonBgColor) + ";\n                                background-color: " + (isActive ? props.config.buttonBgColor : null) + ";\n                                border: " + (isActive ? "1px solid " + props.config.buttonBgColor : "none") + ";\n                            ", key: "page-button-" + (i + 1) + "-" + props.keyCode }, i + 1)); }
                    };
                });
                if (pageButtons.length === 0) {
                    return (widget_1.jsxFactory("h3", { class: "center-style" }, props.i18n.pager.noResults));
                }
                else if (pageButtons.length === 1) {
                    return null;
                }
                return (widget_1.jsxFactory("div", { class: "text-center trailer-1 leader-1", key: "pager-" + props.total },
                    widget_1.jsxFactory("a", { id: "previous", title: "previous", classes: prevButtonClasses, onclick: handlePrevious, role: "link", tabindex: "0", style: "color:" + props.config.buttonBgColor + ";", key: "previous-button-" + props.keyCode }, "Previous"),
                    pageButtons.map(function (button) { return button.render(); }),
                    widget_1.jsxFactory("a", { id: "next", title: "next", classes: nextButtonClasses, onclick: handleNext, role: "link", tabindex: "0", style: "color:" + props.config.buttonBgColor + ";", key: "next-button-" + props.keyCode }, "Next")));
            }
        };
        function handlePrevious() {
            state = __assign({}, state, { pointer: state.pointer - props.perPage });
            props.pointHandler(state.pointer);
        }
        function handleNext() {
            state = __assign({}, state, { pointer: state.pointer + props.perPage });
            props.pointHandler(state.pointer);
        }
        function handlePage(e) {
            state = __assign({}, state, { pointer: (parseInt(e.target.text, 10) - 1) * props.perPage });
            props.pointHandler(state.pointer);
        }
    };
});
//# sourceMappingURL=Pager.js.map