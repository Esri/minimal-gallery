Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("../../../Component");
var base_1 = require("./base");
var items_1 = require("./items");
var router_1 = require("./router");
var filter_1 = require("./filter");
var page_1 = require("./page");
var viewer_1 = require("./viewer");
exports.reducers = Component_1.combineReducers({
    base: base_1.default,
    items: items_1.default,
    router: router_1.default,
    filter: filter_1.default,
    page: page_1.default,
    viewer: viewer_1.default
});
//# sourceMappingURL=index.js.map