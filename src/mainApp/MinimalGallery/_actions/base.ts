export const SAVE_APP_BASE_RESULT = "SAVE_APP_BASE_RESULT";
export const LOAD_APP_FAIL = "LOAD_APP_FAIL";
export const LOAD_APP_PROGRESS = "LOAD_APP_PROGRESS";
export const LOAD_APP_SUCCESS = "LOAD_APP_FINISH";

import * as all from "dojo/promise/all";
import * as Deferred from "dojo/Deferred";
import { updateItems, push, hashChange } from ".";
import { MinimalGalleryState } from "..";
import supportedItemTypes from "../_utilities/supportedItemTypes";

export const loadApplicationBase = () => (dispatch: any, getState: () => MinimalGalleryState) => {
    const { base } = getState();
    base.applicationBase.load().then(
        (result: __esriApplicationBase.ApplicationConfig) => dispatch(queryGroupItems(result)),
        (err: any) => dispatch(loadAppFail(err)),
        (progress: __Component.Pojo) => dispatch(loadAppProgress(progress))
    );
};

export const queryGroupItems = (applicationBaseResult: __esriApplicationBase.ApplicationConfig) =>
    (dispatch: any, getState: () => MinimalGalleryState) => {

        // Boilerplate loaded properly so save it
        dispatch(saveAppBaseResult(applicationBaseResult));

        const state = getState();
        const applicationBase = state.base.applicationBase;
        const config = applicationBaseResult.config;
        fetchAllGroupItems(applicationBase, config).then(
            (response: any) => {
                const promises = response.results.map((item: any) => item.load());
                all(promises).then(
                    (items: __Component.Pojo[]) => {
                        const { hash } = state.router;

                        dispatch(updateItems(items.filter((item: __Component.Pojo) => supportedItemTypes[item.type])));
                        dispatch(hashChange(window.location.hash.slice(1)));
                        dispatch(loadAppSuccess());
                    },
                    (err: any) => dispatch(loadAppFail(err))
                );
            },
            (err: any) => dispatch(loadAppFail(err))
        );
    };

const fetchAllGroupItems = (applicationBase: MinimalGalleryState["base"]["applicationBase"], config: any) => {
    const dfd = new Deferred;
    
    applicationBase.queryGroupItems(
        config.group,
        {
            num: 100,
            sortField: (config.sortField ? config.sortField : "numviews"),
            sortOrder: (config.sortOrder ? config.sortOrder : "desc"),
            start: 0
        } as __esri.PortalQueryParams
    ).then((response: any) => {
        if (response.total > response.results.length) { // This group is more than 100 items, fetch them all!
            const mappableArr = Array.apply(null, { length: Math.floor(response.total / 100) });
            const promises = mappableArr.map((c: any, i: number) => (
                applicationBase.queryGroupItems(
                    config.group,
                    {
                        num: 100,
                        sortField: (config.sortField ? config.sortField : "numviews"),
                        sortOrder: (config.sortOtder ? config.sortOrder : "desc"),
                        start:  100 + (i * 100)
                    } as __esri.PortalQueryParams
                )
            ));
            all(promises).then((responses: any) => {
                const allItems = responses.reduce((p: any, c: any) => {
                    p.results = p.results.concat(c.results);
                    return p;
                }, { results: response.results });
                dfd.resolve(allItems);
            }, (err: Error) => {
                dfd.reject(err);
            });
        } else {
            dfd.resolve(response);
        }
    }, (err: Error) => {
        dfd.reject(err);
    });

    return dfd;
};

const saveAppBaseResult = (applicationBaseResult: __esriApplicationBase.ApplicationConfig) => ({
    type: SAVE_APP_BASE_RESULT,
    payload: applicationBaseResult
});

const loadAppFail = (err: any) => ({
    type: LOAD_APP_FAIL,
    payload: err
});

const loadAppProgress = (progress: __Component.Pojo) => ({
    type: LOAD_APP_PROGRESS,
    payload: progress.status
});

const loadAppSuccess = () => ({
    type: LOAD_APP_SUCCESS
});
