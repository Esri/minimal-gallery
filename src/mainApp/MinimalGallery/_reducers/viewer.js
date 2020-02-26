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
var ioQuery = require("dojo/io-query");
var _actions_1 = require("../_actions");
var initialState = {
    visible: false,
    fullscreen: false
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_1.HASH_CHANGE:
            var hashParams = ioQuery.queryToObject(action.payload);
            if (hashParams.viewer) {
                return __assign({}, state, { visible: true, fullscreen: !!hashParams.fullscreen });
            }
            return __assign({}, state, { visible: false, fullscreen: false });
        default:
            return state;
    }
});
//# sourceMappingURL=viewer.js.map