import { jsxFactory } from "esri/widgets/support/widget";

interface IAppViewProps {
    i18n: any;
    projector: any;
    url: string;
}

export default (props: IAppViewProps) => {
    return ({
        render() {
            return (
                <iframe src={props.url} class="app-frame" id="embedded-mapping-application-iframe" name="nested-iframe">
                    <h3 class="center-style">{props.i18n.viewLoading.iframe}</h3>
                </iframe>
            );
        }
    });
};
