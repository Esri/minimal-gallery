export const UPDATE_ITEMS = "UPDATE_ITEMS";
export const FILTER_ITEMS = "FILTER_ITEMS";

export const updateItems = (items: __Component.Pojo[]) => ({
    type: UPDATE_ITEMS,
    payload: items
});

export const filterItems = (filter: string) => ({
    type: FILTER_ITEMS,
    payload: filter
});
