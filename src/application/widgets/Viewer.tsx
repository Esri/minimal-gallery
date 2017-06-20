import { jsxFactory } from "esri/widgets/support/widget";

import AppView from "./views/AppView";
import { WebMap, WebScene } from "./views/ViewComposites";

interface IViewerProps {
    config: {
        [propName: string]: any;
    };
    exitClickHandler: any;
    i18n: any;
    id: string;
    projector: any;
    type: string;
    widgets: {
        [propName: string]: any;
    };
}

export default (props: IViewerProps) => {
    const childProps = {
        config: props.config,
        i18n: props.i18n,
        id: props.id,
        projector: props.projector,
        widgets: props.widgets
    };
    let containerClasses = {
        "animate-fade-in": true,
        "animate-fade-out": false,
    };
    let view;
    if (props.type === "webmap") {
        view = WebMap(childProps);
    } else if (props.type === "webscene") {
        view = WebScene(childProps);
    } else if (props.type === "webapp") {
        view = AppView({ url: props.id, projector: props.projector, i18n: props.i18n });
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
                    style={`background-color: ${convertHex(props.config.bgColor, 85)}`}
                >
                    <div id="map-container">
                        {view.render()}
                        <button class="btn btn-clear view-exit-button clickable" onclick={handleExitClick} title={props.i18n.ui.close}>
                            <span class="icon-ui-close view-exit-icon" />
                        </button>
                    </div>
                </div>
            );
        }
    };

    function handleExitClick() {
        containerClasses = {
            "animate-fade-in": false,
            "animate-fade-out": true,
        };
        setTimeout(() => {
            props.exitClickHandler();
        }, 750);
    }

    function convertHex( hex: string, opacity: number ) {
        hex = hex.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const result = `rgba(${r},${g},${b},${opacity / 100})`;
        return result;
    }
};
