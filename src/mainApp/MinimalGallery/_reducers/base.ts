import { MinimalGalleryState } from ".";
import { SAVE_APP_BASE_RESULT, LOAD_APP_FAIL, LOAD_APP_PROGRESS, LOAD_APP_SUCCESS } from "../_actions";
import { AUTHENTICATION_FAILED } from "../_actions/base";

export interface BaseState {
    applicationBase: __esriApplicationBase.ApplicationBase;
    applicationBaseResult: __esriApplicationBase.ApplicationConfig;
    i18n: __Component.Pojo;
    status: string;
    loadMessage: string;
}

export default (state: MinimalGalleryState["base"], action: { type: string, payload: any }): MinimalGalleryState["base"] => {
    switch (action.type) {
        case SAVE_APP_BASE_RESULT:
            const perPage = parseInt(action.payload.config.itemsPerPage, 10);
            state.applicationBase.portal = action.payload.portal;
            return {
                ...state,
                loadMessage: "groupItems",
                applicationBaseResult: {
                    ...action.payload,
                    config: {
                        ...action.payload.config,
                        itemsPerPage: !isNaN(perPage) && perPage > 0 ? perPage : 20
                    }
                }
            };
        case LOAD_APP_FAIL:
            return {
                ...state,
                status: "failed"
            };
        case LOAD_APP_PROGRESS:
            return {
                ...state,
                loadMessage: action.payload
            };
        case LOAD_APP_SUCCESS:
            return {
                ...state,
                status: "success"
            };
        case AUTHENTICATION_FAILED:
            return {
                ...state,
                status: "noauth"
            };
        default:
            return state;
    }
};
