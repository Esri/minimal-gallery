import * as ioQuery from "dojo/io-query";
import { HASH_CHANGE } from "../_actions";

export type PageState = number;

export default (state: PageState = 1, action: __Component.Action): PageState => {
    switch (action.type) {
        case HASH_CHANGE:
            const hashParams = ioQuery.queryToObject(action.payload);
            if (hashParams.page) {
                return parseInt(hashParams.page, 10);
            }
            return 1;
        default:
            return state;
    }
};
