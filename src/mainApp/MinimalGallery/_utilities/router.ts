import { PUSH, hashChange } from "../_actions";

export const router = () => (next: any) => (action: any) => {
    switch (action.type) {
        case PUSH:
            window.location.hash = action.payload;
            break;
        default:
            return next(action);
    }
};

export function startHistoryListener(store: __Component.Store) {
    store.dispatch(hashChange(window.location.hash.slice(1)));

    window.onhashchange = (event: any) => {
        store.dispatch(hashChange(window.location.hash.slice(1)));
    };
}
