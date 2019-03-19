/** All state params must be provided to view */
export interface ViewState {
    config: __Component.Pojo;
    i18n: __Component.Pojo;
    id: string;
    widgets: {
        [propName: string]: string;
    };
    viewModule: string;
    webModule: string;
    containerId: string;
}

const initialState = {
    config: {},
    i18n: {},
    id: "",
    widgets: {},
    viewModule: "",
    webModule: "",
    containerId: "map-container"
};

export const reducers = (state: ViewState = initialState, action: __Component.Action) => state;
