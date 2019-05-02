var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _actions_1 = require("../_actions");
var base_1 = require("../_actions/base");
exports.default = (function (state, action) {
    switch (action.type) {
        case _actions_1.SAVE_APP_BASE_RESULT:
            var perPage = parseInt(action.payload.config.itemsPerPage, 10);
            state.applicationBase.portal = action.payload.portal;
            return __assign({}, state, { loadMessage: "groupItems", applicationBaseResult: __assign({}, action.payload, { config: __assign({}, action.payload.config, { itemsPerPage: !isNaN(perPage) && perPage > 0 ? perPage : 20 }) }) });
        case _actions_1.LOAD_APP_FAIL:
            return __assign({}, state, { status: "failed" });
        case _actions_1.LOAD_APP_PROGRESS:
            return __assign({}, state, { loadMessage: action.payload });
        case _actions_1.LOAD_APP_SUCCESS:
            return __assign({}, state, { status: "success" });
        case base_1.AUTHENTICATION_FAILED:
            return __assign({}, state, { status: "noauth" });
        default:
            return state;
    }
});
//# sourceMappingURL=base.js.map