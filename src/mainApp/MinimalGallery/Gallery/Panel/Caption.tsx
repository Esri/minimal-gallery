import Component from "../../../../Component";
import { PanelState } from ".";

interface ComponentState {
    captionBelowOpacity: number;
    captionOpacity: number;
    captionTransform: number;
    panelType: string;
}

export default class Caption extends Component<PanelState, ComponentState> {
    constructor(store: __Component.Store) {
        super(store);

        this.state = {
            captionBelowOpacity: 0.8,
            captionOpacity: 1,
            captionTransform: 0,
            panelType: this.props.getPanelType(this.props.item.type)
        };
    }

    public render() {
        const tsx = this.tsx;
        const config = this.props.applicationBaseResult.config;

        if (config.showItemType) {
            if (config.itemTypeBelowThumbnail) {
                return (
                    <div
                        class="card-below-image-caption"
                        style={`
                            opacity: ${this.state.captionBelowOpacity};
                            background-color: ${convertHex(config[`${this.state.panelType}CaptionColor`], 80)};
                            color: ${config.captionTextColor};
                        `}
                    >
                        {this.props.item.displayName}
                    </div>
                );
            } else {
                return (
                    <div
                        class="card-image-caption"
                        style={`
                            opacity: ${this.state.captionOpacity};
                            transform: translate(0, ${this.state.captionTransform}%);
                            background-color: ${convertHex(config[`${this.state.panelType}CaptionColor`], 80)};
                            color: ${config.captionTextColor};
                        `}
                    >
                        {this.props.item.displayName}
                    </div>
                );
            }
        }

        return null;
    }

    public componentWillReceiveProps(nextProps: PanelState) {
        if (nextProps.hovering !== this.props.hovering) {
            this.setState({
                captionBelowOpacity: nextProps.hovering ? 1 : 0.8,
                captionOpacity: nextProps.hovering ? 0 : 1,
                captionTransform: nextProps.hovering ? 100 : 0
            });
        }
    }
}

function convertHex( hex: string, opacity: number ) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const result = `rgba(${r},${g},${b},${opacity / 100})`;
    return result;
}
