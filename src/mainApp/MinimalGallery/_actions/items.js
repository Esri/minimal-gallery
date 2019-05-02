Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_ITEMS = "UPDATE_ITEMS";
exports.FILTER_ITEMS = "FILTER_ITEMS";
exports.updateItems = function (items) { return ({
    type: exports.UPDATE_ITEMS,
    payload: items
}); };
exports.filterItems = function (filter) { return ({
    type: exports.FILTER_ITEMS,
    payload: filter
}); };
//# sourceMappingURL=items.js.map