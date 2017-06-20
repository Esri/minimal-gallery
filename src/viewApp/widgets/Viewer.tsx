import { jsxFactory } from "esri/widgets/support/widget";

import AppView from "../../application/widgets/views/AppView";
import { WebMap, WebScene } from "../../application/widgets/views/ViewComposites";

interface IViewerProps {
    config: {
        [propName: string]: any;
    };
    i18n: any;
    projector: any;
    widgets: {
        [propName: string]: string;
    };
}

export default (props: IViewerProps) => {
    const childProps = {
        config: props.config,
        i18n: props.i18n,
        id: props.config.itemId,
        projector: props.projector,
        widgets: props.widgets,
    };
    const viewBackgroundColor = props.config.bgColor ? props.config.bgColor : "ffffff";
    const containerClasses = {
        "animate-fade-in": true,
        "animate-fade-out": false,
    };
    let view;
    if (props.config.type === "webmap") {
        view = WebMap(childProps);
    } else if (props.config.type === "webscene") {
        view = WebScene(childProps);
    } else if (props.config.type === "webapp") {
        view = AppView({ url: props.config.id, projector: props.projector, i18n: props.i18n });
    } else {
        view = {
            render: () => (
                <h3 class="center-style">{props.i18n.viewLoading.sorry}</h3>
            )
        };
    }
    return {
        render() {
            return (
                <div
                    id="view-container"
                    key="view-container"
                    classes={containerClasses}
                    style={`background-color: ${convertHex(viewBackgroundColor, 85)}`}
                >
                    <div id="map-container" style={`width: 100%; height: 100%`}>
                        {view.render()}
                    </div>
                </div>
            );
        }
    };

    function convertHex( hex: string, opacity: number ) {
        hex = hex.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const result = `rgba(${r},${g},${b},${opacity / 100})`;
        return result;
    }
};
