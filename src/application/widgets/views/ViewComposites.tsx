import { jsxFactory } from "esri/widgets/support/widget";

import ViewBase from "./ViewBase";

interface IViewCompositeProps {
    config: {
        [propName: string]: any;
    };
    i18n: any;
    id: string;
    projector: any;
    widgets: {
        [propName: string]: string;
    };
}

export const WebMap = (props: IViewCompositeProps) => {
    return ViewBase({
        ...props,
        ViewModule: "esri/views/MapView",
        WebModule: "esri/WebMap"
    });
};

export const WebScene = (props: IViewCompositeProps) => {
    return ViewBase({
        ...props,
        ViewModule: "esri/views/SceneView",
        WebModule: "esri/WebScene"
    });
};
