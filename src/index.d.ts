declare namespace __Component {
    /** Plain Old JavaScript Object */
    export interface Pojo {
        [propName: string]: any;
    }

    export interface Store {
        parentWidget: __esri.Widget;
        dispatch: (action: any) => void;
        subscribe: (handler: (state: Pojo) => void) => () => void;
        getState: () => any;
    }

    export interface Action {
        type: string;
        payload: any;
    }
}