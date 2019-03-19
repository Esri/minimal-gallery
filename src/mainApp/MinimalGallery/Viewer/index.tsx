import * as ioQuery from "dojo/io-query";
import Component from "../../../Component";
import { push } from "../_actions";

import { MinimalGalleryState } from "..";
import { AppView, MapView, SceneView } from "./View";
import convertHex from "../_utilities/convertHex";
import supportedItemTypes from "../_utilities/supportedItemTypes";

interface ComponentState {
    containerClasses: {
        "animate-fade-in": boolean;
        "animate-fade-out": boolean;
    };
    scrollY: number;
}

export default class Viewer extends Component<MinimalGalleryState, ComponentState> {
    constructor(store: __Component.Store) {
        super(store);

        this.state = {
            containerClasses: {
                "animate-fade-in": true,
                "animate-fade-out": false
            },
            scrollY: 0
        };

        this.handleExitKeyPress = this.handleExitKeyPress.bind(this);
        this.handleExitClick = this.handleExitClick.bind(this);
        this.closeViewer = this.closeViewer.bind(this);
    }

    public render() {
        const tsx = this.tsx;
        const i18n = this.props.base.i18n;
        const config = this.props.base.applicationBaseResult.config;
        const item = this.props.items.viewerItem;

        if (this.props.viewer.visible && !!item.id) {
            const viewType = supportedItemTypes[item.type];
            let view;
            if (viewType === "webmap") {
                view = <MapView key={item.id} />;
            } else if (viewType === "webscene") {
                view = <SceneView key={item.id} />;
            } else if (viewType === "webapp") {
                view = <AppView key={item.id} />;
            } else {
                return null;
            }

            if (this.props.viewer.fullscreen) {
                return (
                    <div id="map-container" class="map-container fullscreen" key={`map-container-fullscreen-${item.id}`}>
                        {view}
                    </div>
                );
            }
            return (
                <div
                    id="view-container"
                    key="view-container"
                    classes={this.state.containerClasses}
                    style={`background-color: ${convertHex(config.bgColor, 85)};`}
                >
                    <div id="map-container" class="map-container" key={`map-container-${item.id}`}>
                        {view}
                    </div>
                    <button
                        class="btn btn-clear view-exit-button clickable"
                        onclick={this.handleExitClick}
                        onkeypress={this.handleExitKeyPress}
                        title={i18n.ui.close}
                        afterCreate={this.focus}
                    >
                        <span class="view-exit-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                            >
                                <path
                                    d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
            );
        }
        return null;
    }

    public componentWillReceiveProps(nextProps: MinimalGalleryState) {
        if (!this.props.viewer.visible && nextProps.viewer.visible) {
            this.setState({ scrollY: window.scrollY });
        }
        if (this.props.viewer.visible && !nextProps.viewer.visible) {
            this.childComponents = {};
        }
    }

    private focus(el: HTMLElement) {
        setTimeout(() => {
            el.focus();
        }, 10);
    }

    private handleExitKeyPress(e: KeyboardEvent) {
        if (e.key === "Enter") {
            this.handleExitClick();
        }
    }

    private handleExitClick() {
        this.setState({
            containerClasses: {
                "animate-fade-in": false,
                "animate-fade-out": true
            }
        });
        setTimeout(() => {
            this.closeViewer();
            this.setState({
                containerClasses: {
                    "animate-fade-in": true,
                    "animate-fade-out": false
                }
            });
        }, 750);
    }

    private closeViewer() {
        const { hash } = this.props.router;
        const hashParams = ioQuery.queryToObject(hash);
        delete hashParams.viewer;
        this.dispatch(push(ioQuery.objectToQuery(hashParams)));
    }
}