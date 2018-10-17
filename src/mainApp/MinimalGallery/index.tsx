import Component from "../../Component";

import { MinimalGalleryState } from "./_reducers";
import { loadApplicationBase } from "./_actions";

import Header from "./Header";
import Gallery from "./Gallery";
import Viewer from "./Viewer";
import Pager from "./Pager";

export { MinimalGalleryState, reducers } from "./_reducers";

interface ComponentState {
    status: "loading" | "loaded" | "failed";
    loadMessage: string;
}

export default class MinimalGallery extends Component<MinimalGalleryState, ComponentState> {
    constructor(store: __Component.Store) {
        super(store);

        this.state = {
            status: "loading",
            loadMessage: "init"
        };

        this.dispatch(loadApplicationBase());
    }

    public render() {
        const tsx = this.tsx;
        const i18n = this.props.base.i18n;
        const status = this.props.base.status;

        if (status === "loading") {
            return (
                <div>
                    <div class="loader is-active padding-leader-3 padding-trailer-3 center-style" key={"loader"}>
                        <div class="loader-bars" />
                        <div bind={this} class="loader-text">{i18n.appLoading[this.state.loadMessage]}</div>
                    </div>
                </div>
            );
        } else if (status === "success") {
            return (
                <div>
                    {
                        this.props.base.applicationBaseResult.config.showHeader ?
                            <Header key="minimal-gallery-header" /> :
                            null
                    }
                    <Gallery key="minimal-gallery" />
                    <Viewer key="minimal-gallery-viewer" />
                    <Pager key="minimal-gallery-pager" />
                </div>
            );
        }
        return (
            <div>
                <h3 class="center-style">{i18n.appLoading.failed}</h3>
            </div>
        );
    }
}
