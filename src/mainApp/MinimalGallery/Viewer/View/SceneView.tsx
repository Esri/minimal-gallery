import Component from "../../../../Component";
import { MinimalGalleryState } from "../..";

import ViewBase, { reducers } from "./ViewBase";

export class SceneView extends Component<MinimalGalleryState> {
    constructor(store: __Component.Store) {
        super(store);
    }

    render() {
        const tsx = this.tsx;
        const config = this.props.base.applicationBaseResult.config;

        return (
            <ViewBase
                key="map-view"
                store={{
                    reducers,
                    initialState: {
                        config,
                        i18n: this.props.base.i18n,
                        id: this.props.items.viewerItem.id,
                        widgets: Object.keys(config)
                            .filter((key: string) => key.indexOf("Widget") !== -1)
                            .reduce((result: __Component.Pojo, key: string) => {
                                return { ...result, [key]: config[key] };
                            }, {}),
                        viewModule: "esri/views/SceneView",
                        webModule: "esri/WebScene",
                        containerId: "map-container"
                    }
                }}
            />
        );
    }
}