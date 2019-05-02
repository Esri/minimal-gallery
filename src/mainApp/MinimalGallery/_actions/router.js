Object.defineProperty(exports, "__esModule", { value: true });
exports.PUSH = "ROUTER/PUSH";
exports.LOCATION_CHANGE = "ROUTER/LOCATION_CHANGE";
exports.HASH_CHANGE = "ROUTER/HASH_CHANGE";
exports.push = function (hash) { return ({
    type: exports.PUSH,
    payload: hash,
}); };
exports.hashChange = function (hash) { return ({
    type: exports.HASH_CHANGE,
    payload: hash
}); };
//# sourceMappingURL=router.js.map