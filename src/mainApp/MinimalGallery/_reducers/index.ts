import { combineReducers } from "../../../Component";

import base, { BaseState } from "./base";
import items, { ItemsState } from "./items";
import router, { RouterState } from "./router";
import filter, { FilterState } from "./filter";
import page, { PageState } from "./page";
import viewer, { ViewerState } from "./viewer";

export interface MinimalGalleryState {
    base: BaseState;
    items: ItemsState;
    router: RouterState;
    filter: FilterState;
    page: PageState;
    viewer: ViewerState;
}

export const reducers = combineReducers({
    base,
    items,
    router,
    filter,
    page,
    viewer
});
