import Component from "../../../../Component";
import { MinimalGalleryState } from "../..";

export class AppView extends Component<MinimalGalleryState> {
    constructor(store: __Component.Store) {
        super(store);
    }

    render() {
        const tsx = this.tsx;

        return (
            <iframe
                src={this.props.items.viewerItem.url}
                class="app-frame"
                id="embedded-mapping-application-iframe"
                name="nested-iframe"
            >
                <h3 class="center-style">{this.props.base.i18n.viewLoading.iframe}</h3>
            </iframe>
        );
    }
}