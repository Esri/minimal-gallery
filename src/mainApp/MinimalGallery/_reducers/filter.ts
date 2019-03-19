import * as ioQuery from "dojo/io-query";
import { HASH_CHANGE } from "../_actions";

export type FilterState = string;

export default (state: FilterState = "", action: __Component.Action): FilterState => {
    switch (action.type) {
        case HASH_CHANGE:
            const hashParams = ioQuery.queryToObject(action.payload);
            return (hashParams.query ? hashParams.query : "");
        default:
            return state;
    }
};
