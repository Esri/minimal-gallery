import * as ioQuery from "dojo/io-query";
import { UPDATE_ITEMS, FILTER_ITEMS, HASH_CHANGE, SAVE_APP_BASE_RESULT } from "../_actions";

export interface ItemsState {
    allowedItemTypes: { [type: string]: boolean };
    allItems: __Component.Pojo[];
    filteredItems: __Component.Pojo[];
    displayKey: string;
    viewerItem: __Component.Pojo;
} 

const initialState: ItemsState = {
    allowedItemTypes: {},
    allItems: [],
    filteredItems: [],
    displayKey: "",
    viewerItem: {}
};

export default (state: ItemsState = initialState, action: { type: string, payload: any }): ItemsState => {
    switch (action.type) {
        case SAVE_APP_BASE_RESULT:
            const itemTypes = !!action.payload.config.itemTypes && action.payload.config.itemTypes.length > 0 ?
                action.payload.config.itemTypes :
                "WMS, Web Map, CityEngine Web Scene, Web Scene, 360 VR Experience, Pro Map, Feature Service, Map Service, Image Service, KML, KML Collection, WFS, WMTS, Feature Collection, Feature Collection Template, Vector Tile Service, Scene Service, Relational Database Connection, Web Mapping Application, Mobile Application, Code Attachment, Operations Dashboard Add In, Native Application, Native Application Template, Native Application Installer, Workforce Project, Form, Insights Workbook, Insights Model, Insights Page, Dashboard, Hub Initiative, Hub Site Application, Hub Page, AppBuilder Widget Package, Symbol Set, Color Set, Shapefile, File Geodatabase, CSV, CAD Drawing, Service Definition, Microsoft Word, Microsoft Powerpoint, Microsoft Excel, PDF, Image, Visio Document, iWork Keynote, iWork Pages, iWork Numbers, Report Template, Statistical Data Collection, Map Document, Map Package, Mobile Basemap Package, Mobile Map Package, Tile Package, Vector Tile Package, Project Package, Task File, ArcPad Package, Explorer Map, Globe Document, Scene Document, Published Map, Map Template, Windows Mobile Package, Pro Map, Layout, Project Template, Layer, Layer, Layer Package, Explorer Layer, Scene Package, Image Collection, Desktop Style, Geoprocessing Package, Geoprocessing Package (Pro version), Geoprocessing Sample, Locator Package, Rule Package, Raster function template, ArcGIS Pro Configuration, Workflow Manager Package, Desktop Application, Desktop Application Template, Code Sample, Desktop Add In, Explorer Add In, ArcGIS Pro Add In, Geometry Service, Geocoding Service, Network Analysis Service, Geoprocessing Service, Workflow Manager Service, Document Link";
            return {
                ...state,
                allowedItemTypes: itemTypes.split(",")
                    .map((type: string) => type.trim())
                    .reduce((r: ItemsState["allowedItemTypes"], c: string) => {
                        r[c] = true;
                        return r;
                    }, {})
            };
        case UPDATE_ITEMS:
            return {
                ...state,
                allItems: action.payload
            };
        case HASH_CHANGE:
            const hashParams = ioQuery.queryToObject(action.payload);
            if (hashParams.viewer) {
                const viewerItem = state.allItems.filter((item) => item.id === hashParams.viewer)[0];
                return {
                    ...state,
                    viewerItem: viewerItem ? viewerItem : {},
                    filteredItems: filterItems(
                        state.allItems,
                        hashParams.query ? hashParams.query : "",
                        state.allowedItemTypes
                    ),
                    displayKey: Math.random().toString(36).substring(7)
                };
            }
            return {
                ...state,
                filteredItems: filterItems(
                    state.allItems,
                    hashParams.query ? hashParams.query : "",
                    state.allowedItemTypes
                ),
                displayKey: Math.random().toString(36).substring(7)
            };
        default:
            return state;
    }
};

function filterItems(items: __Component.Pojo[], filter: string, allowedItemTypes: ItemsState["allowedItemTypes"]) {
    return items.filter((item: __Component.Pojo) => (
        allowedItemTypes[item.type] && (
            item.title.toLowerCase().indexOf(filter) !== -1 ||
            item.type.toLowerCase().indexOf(filter) !== -1 ||
            item.owner.toLowerCase().indexOf(filter) !== -1 ||
            (item.tags && item.tags.map((tag: string) => tag.toLowerCase()).indexOf(filter) !== -1) ||
            (item.description && item.description.indexOf(filter) !== -1) ||
            (item.snippet && item.snippet.indexOf(filter) !== -1)
        )
    ));
}
