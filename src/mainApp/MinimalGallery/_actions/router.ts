export const PUSH = "ROUTER/PUSH";
export const LOCATION_CHANGE = "ROUTER/LOCATION_CHANGE";
export const HASH_CHANGE = "ROUTER/HASH_CHANGE";

import { MinimalGalleryState } from "..";

export const push = (hash: string) => ({
    type: PUSH,
    payload: hash,
});

export const hashChange = (hash: string) => ({
    type: HASH_CHANGE,
    payload: hash
});
