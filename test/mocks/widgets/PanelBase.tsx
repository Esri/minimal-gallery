import { jsxFactory } from "esri/widgets/support/widget";

export default (props) => ({ render: () => <div id="base-panel" onclick={props.itemClickHandler} /> });
