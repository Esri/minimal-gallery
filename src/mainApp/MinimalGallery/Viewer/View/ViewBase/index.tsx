import Component from "../../../../../Component";
import { ViewState } from "./_reducers";

export { reducers } from "./_reducers";

import * as all from "dojo/promise/all";
import * as promiseUtils from "esri/core/promiseUtils";
import * as requireUtils from "esri/core/requireUtils";

interface ComponentState {
    status: string;
    loadText: string;
}

const widgetKey = {
    compassWidget: "esri/widgets/Compass",
    homeWidget: "esri/widgets/Home",
    legendWidget: "esri/widgets/Legend",
    locateWidget: "esri/widgets/Locate",
    searchWidget: "esri/widgets/Search"
};

export default class ViewBase extends Component<ViewState, ComponentState> {
    constructor(store: __Component.Store) {
        super(store);

        this.state = {
            status: "loading",
            loadText: "scripts"
        };

        this.loadScripts = this.loadScripts.bind(this);
        this.loadMap = this.loadMap.bind(this);
        this.loadWidgets = this.loadWidgets.bind(this);

        this.loadScripts.bind(this)();
    }

    public render() {
        const tsx = this.tsx;

        if (this.state.status === "loaded") {
            return <div />;
        } else if (this.state.status === "loading") {
            return (
                <div>
                    <div class="loader is-active padding-leader-3 padding-trailer-3 center-style">
                        <div class="loader-bars" />
                        <div class="loader-text">{this.props.i18n.viewLoading[this.state.loadText]}</div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <h3 class="center-style">{this.props.i18n.viewLoading.failed}</h3>
            </div>
        );
    }

    private loadScripts() {
        requireUtils.when(window["require"], [this.props.webModule, this.props.viewModule])
            .then(
                ([WebConstructor, ViewConstructor]) => {
                    this.setState({ loadText: "map" });
                    this.loadMap(WebConstructor, ViewConstructor);
                },
                (err) => {
                    this.setState({ status: "failed" });
                }
            );
    }

    private loadMap(
        WebConstructor: __esri.WebMapConstructor,
        ViewConstructor: __esri.MapViewConstructor
    ) {
        let view: any;
        const map: __esri.WebMap | __esri.WebScene = new WebConstructor({
            portalItem: {
                id: this.props.id
            }
        });
        map.load().then(() => {
            this.setState({ loadText: "basemap" });
            return map.basemap.load();
        }).then(() => {
            this.setState({ loadText: "layers" });
            const allLayers = map.allLayers;
            const promises = allLayers.map((layer) => layer.load());
            return all(promises.toArray());
        }).then((layers) => {
            this.setState({ loadText: "widgets" });
            view = new ViewConstructor({
                container: this.props.containerId,
                map
            });
            return this.loadWidgets(view);
        }).then(() => {
            view.container = this.props.containerId;
            this.setState({ status: "loaded" });
        }).otherwise((err) => {
            this.setState({ status: "failed" });
        });
    }

    private loadWidgets(view: __esri.MapView) {
        const positions = {
            "bottom-left": true,
            "bottom-right": true,
            "top-left": true,
            "top-right": true
        };
        const modules = Object.keys(this.props.widgets).reduce((p, c, i) => {
            if (positions[this.props.widgets[c]]) {
                p.push({
                    module: widgetKey[c],
                    position: this.props.widgets[c]
                } as never); // typescript is weird
            }
            return p;
        }, []);
        return requireUtils.when(window["require"], modules.map((item) => item["module"]))
            .then((constructors) => {
                constructors.forEach((Constructor: any, i: number) => {
                    const widget = new Constructor({ view });
                    if (widget.activeLayerInfos) {
                        widget.watch("activeLayerInfos.length", () => {
                            view.ui.add(widget, modules[i]["position"]);
                        });
                        return;
                    }
                    view.ui.add(widget, modules[i]["position"]);
                });
                return promiseUtils.resolve();
            });
    }
}