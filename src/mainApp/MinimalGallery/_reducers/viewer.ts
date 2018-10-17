import * as ioQuery from "dojo/io-query";
import { HASH_CHANGE } from "../_actions";

export interface ViewerState {
    visible: boolean;
    fullscreen: boolean; 
}

const initialState: ViewerState = {
    visible: false,
    fullscreen: false
};

export default (state: ViewerState = initialState, action: __Component.Action) => {
    switch (action.type) {
        case HASH_CHANGE:
            const hashParams = ioQuery.queryToObject(action.payload);
            if (hashParams.viewer) {
                return {
                    ...state,
                    visible: true,
                    fullscreen: !!hashParams.fullscreen
                };
            }
            return {
                ...state,
                visible: false,
                fullscreen: false
            };
        default:
            return state;
    }
};
