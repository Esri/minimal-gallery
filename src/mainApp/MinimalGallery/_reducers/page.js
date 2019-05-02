Object.defineProperty(exports, "__esModule", { value: true });
var ioQuery = require("dojo/io-query");
var _actions_1 = require("../_actions");
exports.default = (function (state, action) {
    if (state === void 0) { state = 1; }
    switch (action.type) {
        case _actions_1.HASH_CHANGE:
            var hashParams = ioQuery.queryToObject(action.payload);
            if (hashParams.page) {
                return parseInt(hashParams.page, 10);
            }
            return 1;
        default:
            return state;
    }
});
//# sourceMappingURL=page.js.map