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
    allowedItemTypes: {},
    allItems: [],
    filteredItems: [],
    displayKey: "",
    viewerItem: {}
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _actions_1.SAVE_APP_BASE_RESULT:
            var itemTypes = !!action.payload.config.itemTypes && action.payload.config.itemTypes.length > 0 ?
                action.payload.config.itemTypes :
                "WMS, Web Map, CityEngine Web Scene, Web Scene, 360 VR Experience, Pro Map, Feature Service, Map Service, Image Service, KML, KML Collection, WFS, WMTS, Feature Collection, Feature Collection Template, Vector Tile Service, Scene Service, Relational Database Connection, Web Mapping Application, Mobile Application, Code Attachment, Operations Dashboard Add In, Native Application, Native Application Template, Native Application Installer, Workforce Project, Form, Insights Workbook, Insights Model, Insights Page, Dashboard, Hub Initiative, Hub Site Application, Hub Page, AppBuilder Widget Package, Symbol Set, Color Set, Shapefile, File Geodatabase, CSV, CAD Drawing, Service Definition, Microsoft Word, Microsoft Powerpoint, Microsoft Excel, PDF, Image, Visio Document, iWork Keynote, iWork Pages, iWork Numbers, Report Template, Statistical Data Collection, Map Document, Map Package, Mobile Basemap Package, Mobile Map Package, Tile Package, Vector Tile Package, Project Package, Task File, ArcPad Package, Explorer Map, Globe Document, Scene Document, Published Map, Map Template, Windows Mobile Package, Pro Map, Layout, Project Template, Layer, Layer, Layer Package, Explorer Layer, Scene Package, Image Collection, Desktop Style, Geoprocessing Package, Geoprocessing Package (Pro version), Geoprocessing Sample, Locator Package, Rule Package, Raster function template, ArcGIS Pro Configuration, Workflow Manager Package, Desktop Application, Desktop Application Template, Code Sample, Desktop Add In, Explorer Add In, ArcGIS Pro Add In, Geometry Service, Geocoding Service, Network Analysis Service, Geoprocessing Service, Workflow Manager Service, Document Link";
            return __assign({}, state, { allowedItemTypes: itemTypes.split(",")
                    .map(function (type) { return type.trim(); })
                    .reduce(function (r, c) {
                    r[c] = true;
                    return r;
                }, {}) });
        case _actions_1.UPDATE_ITEMS:
            return __assign({}, state, { allItems: action.payload });
        case _actions_1.HASH_CHANGE:
            var hashParams_1 = ioQuery.queryToObject(action.payload);
            if (hashParams_1.viewer) {
                var viewerItem = state.allItems.filter(function (item) { return item.id === hashParams_1.viewer; })[0];
                return __assign({}, state, { viewerItem: viewerItem ? viewerItem : {}, filteredItems: filterItems(state.allItems, hashParams_1.query ? hashParams_1.query : "", state.allowedItemTypes), displayKey: Math.random().toString(36).substring(7) });
            }
            return __assign({}, state, { filteredItems: filterItems(state.allItems, hashParams_1.query ? hashParams_1.query : "", state.allowedItemTypes), displayKey: Math.random().toString(36).substring(7) });
        default:
            return state;
    }
});
function filterItems(items, filter, allowedItemTypes) {
    return items.filter(function (item) { return (allowedItemTypes[item.type] && (item.title.toLowerCase().indexOf(filter) !== -1 ||
        item.type.toLowerCase().indexOf(filter) !== -1 ||
        item.owner.toLowerCase().indexOf(filter) !== -1 ||
        (item.tags && item.tags.map(function (tag) { return tag.toLowerCase(); }).indexOf(filter) !== -1) ||
        (item.description && item.description.indexOf(filter) !== -1) ||
        (item.snippet && item.snippet.indexOf(filter) !== -1))); });
}
//# sourceMappingURL=items.js.map