/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import {declared, property, subclass} from "esri/core/accessorSupport/decorators";
import { jsxFactory, renderable } from "esri/widgets/support/widget";
import * as Widget from "esri/widgets/Widget";
import ApplicationBase from "../../boilerplate/ApplicationBase";
import { ApplicationConfig } from "../../boilerplate/interfaces";

import Viewer from "./Viewer";

const filterMap = {
    "Web Map": "webmap",
    "Web Mapping Application": "webapp",
    "Web Scene": "webscene"
};

interface State {
    boilerplate: ApplicationBase;
    boilerplateResult: ApplicationConfig;
    galleryComponent: any;
    i18n: any;
    items: any[];
    loadStatus: string;
    loadMessage: string;
    viewComponent: any;
}

@subclass("esri.widgets.Main")
export default class Main extends declared(Widget) {
    @property()
    @renderable()
    public state: State;

    private boilerplate: ApplicationBase;

    constructor(params) {
        super();

        this.state = {
            boilerplate: params.boilerplate,
            boilerplateResult: null,
            galleryComponent: null,
            i18n: params.i18n,
            items: null,
            loadMessage: "init",
            loadStatus: "loading",
            viewComponent: { render: () => null }
        };

        this.handleBoilerplateError = this.handleBoilerplateError.bind(this);
        this.handleBoilerplateLoad = this.handleBoilerplateLoad.bind(this);
        this.handleBoilerplateProgress = this.handleBoilerplateProgress.bind(this);

        this.boilerplate = params.boilerplate;
        this.boilerplate.load().then(
            this.handleBoilerplateLoad,
            this.handleBoilerplateError,
            this.handleBoilerplateProgress
        );
    }

    public render() {
        if (this.state.loadStatus === "loaded") {
            return (
                <div>
                    {this.state.viewComponent.render()}
                </div>
            );
        } else if (this.state.loadStatus === "failed") {
            return (
                <h3 class="center-style">{this.state.i18n.appLoading.failed}</h3>
            );
        }
        return (
            <div>
                <div class="loader is-active padding-leader-3 padding-trailer-3 center-style" key={"loader"}>
                    <div class="loader-bars"></div>
                    <div bind={this} class="loader-text">{this.state.i18n.appLoading[this.state.loadMessage]}</div>
                </div>
            </div>
        );
    }

    private handleBoilerplateLoad(boilerplateResult) {
        const widgets = Object.keys(boilerplateResult.config)
                            .filter((key) => key.indexOf("Widget") !== -1)
                            .reduce((p, key) => {
                                p[key] = boilerplateResult.config[key];
                                return p;
                            }, {});
        this.state = {
            ...this.state,
            boilerplateResult,
            loadStatus: "loaded",
            viewComponent: Viewer({
                config: boilerplateResult.config,
                i18n: this.state.i18n,
                projector: this,
                widgets
            })
        };
    }

    private handleBoilerplateError(err) {
        this.state = {
            ...this.state,
            loadStatus: "failed"
        };
    }

    private handleBoilerplateProgress(progress) {
        this.state = {
            ...this.state,
            loadMessage: progress.status
        };
    }
}
