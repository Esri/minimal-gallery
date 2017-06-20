import PanelBase from "./PanelBase";

interface IPanelCompositeProps {
    config: {
        [propName: string]: any;
    };
    i18n: any;
    item: any;
    itemClickHandler: any;
}

export const MapPanel = (props: IPanelCompositeProps) => (
    PanelBase({
            ...props,
            captionColor: props.config.mapCaptionColor,
            extItem: props.i18n.ui.itemExtTip,
            extLink: `http://jsapi.maps.arcgis.com/home/item.html?id=${props.item.id}`,
            extTitle: props.i18n.ui.mapExtTip,
            itemClickHandler: () => {
                props.itemClickHandler(props.item.id, "webmap");
            },
            maxLink: `viewApp.html?itemId=${props.item.id}&type=webmap`
    })
);

export const ScenePanel = (props: IPanelCompositeProps) => (
    PanelBase({
        ...props,
        captionColor: props.config.sceneCaptionColor,
        extItem: props.i18n.ui.itemExtTip,
        extLink: `http://jsapi.maps.arcgis.com/home/item.html?id=${props.item.id}`,
        extTitle: props.i18n.ui.sceneExtTip,
        itemClickHandler: () => {
            props.itemClickHandler(props.item.id, "webscene");
        },
        maxLink: `viewApp.html?itemId=${props.item.id}&type=webscene`
    })
);

export const AppPanel = (props: IPanelCompositeProps) => (
    PanelBase({
        ...props,
        captionColor: props.config.appCaptionColor,
        extItem: props.i18n.ui.itemExtTip,
        extLink: `http://jsapi.maps.arcgis.com/home/item.html?id=${props.item.id}`,
        extTitle: props.i18n.ui.appExtTip,
        itemClickHandler: () => {
            props.itemClickHandler(props.item.url, "webapp");
        },
        maxLink: props.item.url
    })
);

