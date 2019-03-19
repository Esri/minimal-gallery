import * as ioQuery from "dojo/io-query";
import Component, { middlewares } from "../../../Component";
import Panel, { PanelState, reducers } from "./Panel";
import { SHOW_IN_VIEWER, SHOW_FULLSCREEN, VIEWER_CHANGE } from "./Panel/_actions";
import { push } from "../_actions";
import { MinimalGalleryState } from "..";
import supportedItemTypes from "../_utilities/supportedItemTypes";

const { addListener } = middlewares;

interface ComponentState {
    itemPages: __Component.Pojo[][];
}

export default class Gallery extends Component<MinimalGalleryState, ComponentState> {
    constructor(store: __Component.Store) {
        super(store);

        const itemsPerPage = this.props.base.applicationBaseResult.config.itemsPerPage;
        this.state = {
            itemPages: splitToPages(this.props.items.filteredItems, itemsPerPage)
        };

        this.mapItemsToChildren = this.mapItemsToChildren.bind(this);
        this.handleChildUpdate = this.handleChildUpdate.bind(this);
        this.showInViewer = this.showInViewer.bind(this);
    }

    public render() {
        const tsx = this.tsx;

        if (this.props.viewer.fullscreen) {
            return null;
        }

        return (
            <div
                class="grid-container leader-1"
                style={`background-color: ${this.props.base.applicationBaseResult.config.bgColor};`}
            >
                <div class="column-24">
                    <div class="padding-leader-1 block-group block-group-5-up tablet-block-group-3-up phone-block-group-1-up">
                        {this.mapItemsToChildren()}
                    </div>
                </div>
            </div>
        );
    }

    public componentWillReceiveProps(nextProps: MinimalGalleryState) {
        if (nextProps.items.displayKey !== this.props.items.displayKey) {
            const itemsPerPage = this.props.base.applicationBaseResult.config.itemsPerPage;
            this.setState({
                itemPages: splitToPages(nextProps.items.filteredItems, itemsPerPage)
            });
        }

        if (nextProps.router.hash !== this.props.router.hash) {
            const currentViewer = ioQuery.queryToObject(this.props.router.hash).viewer;
            const nextViewer = ioQuery.queryToObject(nextProps.router.hash).viewer;
            if (currentViewer !== nextViewer) {
                for (let child in this.childComponents) {
                    if (this.childComponents.hasOwnProperty(child)) {
                        this.childComponents[child].store.dispatch({
                            type: VIEWER_CHANGE,
                            payload: nextViewer
                        });
                    }
                }
            }
        }
    }

    private mapItemsToChildren() {
        const tsx = this.tsx;

        const displayItems = this.state.itemPages[this.props.page - 1];

        this.childComponents = displayItems.reduce((result: __Component.Pojo, item: __Component.Pojo) => {
            if (this.childComponents[item.id]) {
                result[item.id] = this.childComponents[item.id];
            }
            return result;
        }, {});

        return displayItems.map(
            (item) => {
                if (item.type === "Dashboard") {
                    item.url = `${item.portal.url}/apps/opsdashboard/index.html#/${item.id}`;
                }
                return (
                    <Panel
                        key={item.id}
                        store={{
                            reducers,
                            initialState: {
                                applicationBaseResult: this.props.base.applicationBaseResult,
                                i18n: this.props.base.i18n,
                                item,
                                itemType: supportedItemTypes[item.type],
                                portal: this.props.base.applicationBase.portal
                            },
                            middlewares: [ addListener(this.handleChildUpdate) ]
                        }}
                    />
                );
            }
        );
    }

    private handleChildUpdate(action: { type: string, payload?: any }, childState: PanelState) {
        switch (action.type) {
            case SHOW_IN_VIEWER:
                this.showInViewer(childState.item.id);
                break;
            case SHOW_FULLSCREEN:
                this.showFullscreen(childState.item.id);
                break;
            default: //
        }
    }

    private showInViewer(itemId: string) {
        const { hash } = this.props.router;
        const hashParams = ioQuery.queryToObject(hash);
        hashParams.viewer = itemId;
        this.dispatch(push(ioQuery.objectToQuery(hashParams)));
    }

    private showFullscreen(itemId: string) {
        const { hash } = this.props.router;
        const hashParams = ioQuery.queryToObject(hash);
        hashParams.viewer = itemId;
        hashParams.fullscreen = true;
        this.dispatch(push(ioQuery.objectToQuery(hashParams)));
    }
}

function splitToPages(items: __Component.Pojo, perPage: number) {
    return items.reduce((result: __Component.Pojo[][], item: __Component.Pojo) => {
        if (result[result.length - 1].length < perPage) {
            result[result.length - 1].push(item);
        } else {
            result.push([item]);
        }
        return result;
    }, [[]]);
}
