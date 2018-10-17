import { HASH_CHANGE } from "../_actions";

export interface RouterState {
    hash: string;
}

const initialState = {
    hash: ""
};

export default (state: RouterState = initialState, action: __Component.Action) => {
    switch (action.type) {
        case HASH_CHANGE:
            return {
                ...state,
                hash: action.payload
            };
        default:
            return state;
    }
};
