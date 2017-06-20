import { jsxFactory } from "esri/widgets/support/widget";

import * as all from "dojo/promise/all";
import * as promiseUtils from "esri/core/promiseUtils";
import * as requireUtils from "esri/core/requireUtils";

interface IViewProps {
    config: {
        [propName: string]: any;
    };
    i18n: any;
    id: string;
    projector: any;
    ViewModule: string;
    WebModule: string;
    widgets: {
        [propName: string]: string;
    };
}

const widgetKey = {
    compassWidget: "esri/widgets/Compass",
    homeWidget: "esri/widgets/Home",
    legendWidget: "esri/widgets/Legend",
    locateWidget: "esri/widgets/Locate",
    searchWidget: "esri/widgets/Search"
};

export default (props: IViewProps) => {
    const ViewPublic = {
        i18n: props.i18n,
        loadText: "scripts",
        status: "loading",

        render() {
            if (ViewPublic.status === "loaded") {
                return (
                    <div>
                    </div>
                );
            } else if (ViewPublic.status === "loading") {
                return (
                    <div>
                        <div class="loader is-active padding-leader-3 padding-trailer-3 center-style">
                            <div class="loader-bars"></div>
                            <div class="loader-text">{ViewPublic.i18n.viewLoading[ViewPublic.loadText]}</div>
                        </div>
                    </div>
                );
            }
            return (
                <div>
                    <h3 class="center-style">{ViewPublic.i18n.viewLoading.failed}</h3>
                </div>
            );
        }
    };

    loadScripts();

    function loadScripts() {
        requireUtils.when(require, [props.WebModule, props.ViewModule])
            .then(
                ([WebConstructor, ViewConstructor]) => {
                    ViewPublic.loadText = "map";
                    props.projector.scheduleRender();
                    loadMap(WebConstructor, ViewConstructor);
                },
                (err) => {
                    // console.log(err);
                    ViewPublic.status = "failed";
                    props.projector.scheduleRender();
                }
            );
    }

    function loadMap(
        WebConstructor: __esri.WebMapConstructor,
        ViewConstructor: __esri.MapViewConstructor
    ) {
        const map: __esri.WebMap | __esri.WebScene = new WebConstructor({
            portalItem: {
                id: props.id
            }
        });
        map.load().then(() => {
            ViewPublic.loadText = "basemap";
            props.projector.scheduleRender();
            return map.basemap.load();
        }).then(() => {
            ViewPublic.loadText = "layers";
            const allLayers = map.allLayers;
            const promises = allLayers.map((layer) => layer.load());
            props.projector.scheduleRender();
            return all(promises.toArray());
        }).then((layers) => {
            ViewPublic.loadText = "view";
            const view = new ViewConstructor({
                container: "map-container",
                map
            });
            props.projector.scheduleRender();
            return promiseUtils.resolve(view);
        }).then((view) => {
            ViewPublic.loadText = "widgets";
            props.projector.scheduleRender();
            return loadWidgets(view);
        }).then(() => {
            ViewPublic.status = "loaded";
            props.projector.scheduleRender();
        }).otherwise((err) => {
            ViewPublic.status = "failed";
            props.projector.scheduleRender();
        });
    }

    function loadWidgets(view) {
        const positions = {
            "bottom-left": true,
            "bottom-right": true,
            "top-left": true,
            "top-right": true
        };
        const modules = Object.keys(props.widgets).reduce((p, c, i) => {
            if (positions[props.widgets[c]]) {
                return p.concat([{
                    module: widgetKey[c],
                    position: props.widgets[c]
                }]);
            }
            return p;
        }, []);
        return requireUtils.when(require, modules.map((item) => item.module))
            .then((constructors) => {
                constructors.forEach((Constructor, i) => {
                    const widget = new Constructor({
                        view
                    });
                    if (widget.activeLayerInfos) {
                        widget.watch("activeLayerInfos.length", (something) => {
                            view.ui.add(widget, modules[i].position);
                        });
                        return;
                    }
                    view.ui.add(widget, modules[i].position);
                });
                return promiseUtils.resolve();
            });
    }

    return ViewPublic;
};
