import { AppPanel, MapPanel, ScenePanel } from "./panels/PanelComposites";
import { jsxFactory } from "esri/widgets/support/widget";
import createMapping from "../utilities/createMapping";

interface IGalleryProps {
    config: {
        [propName: string]: any;
    };
    i18n: any;
    itemClickHandler: any;
    items: any[];
}

const itemMapping = createMapping(
    (blob) => {
        return blob.item.title;
    },
    (blob, index) => {
        if (blob.item.type === "Web Map") {
            return MapPanel({ ...blob.props, item: blob.item });
        } else if (blob.item.type === "Web Mapping Application") {
            return AppPanel({ ...blob.props, item: blob.item });
        }
        return ScenePanel({ ...blob.props, item: blob.item });
    },
    () => {
        return null;
    }
);

export default (props: IGalleryProps) => {
    const blobs = props.items.map((item) => ({
        item,
        props: {
            config: props.config,
            i18n: props.i18n,
            itemClickHandler: props.itemClickHandler
        }
    }));
    itemMapping.map(blobs);
    return {
        render() {
            return (
                <div class="grid-container leader-1">
                    <div class="column-24">
                        <div class="block-group block-group-5-up tablet-block-group-2-up phone-block-group-1-up">
                            {itemMapping.results.map((item) => item.render())}
                        </div>
                    </div>
                </div>
            );
        }
    };
};
