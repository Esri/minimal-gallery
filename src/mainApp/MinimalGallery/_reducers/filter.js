Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = require("dojo/io-query");
var _actions_1 = require("../_actions");
exports.default = (function (state, action) {
    if (state === void 0) { state = ""; }
    switch (action.type) {
        case _actions_1.HASH_CHANGE:
            var hashParams = ioQuery.queryToObject(action.payload);
            return (hashParams.query ? hashParams.query : "");
        default:
            return state;
    }
});
//# sourceMappingURL=filter.js.map