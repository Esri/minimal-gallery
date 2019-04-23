Object.defineProperty(exports, "__esModule", { value: true });
var _actions_1 = require("../_actions");
exports.router = function () { return function (next) { return function (action) {
    switch (action.type) {
        case _actions_1.PUSH:
            window.location.hash = action.payload;
            break;
        default:
            return next(action);
    }
}; }; };
function startHistoryListener(store) {
    store.dispatch(_actions_1.hashChange(window.location.hash.slice(1)));
    window.onhashchange = function (event) {
        store.dispatch(_actions_1.hashChange(window.location.hash.slice(1)));
    };
}
exports.startHistoryListener = startHistoryListener;
//# sourceMappingURL=router.js.map