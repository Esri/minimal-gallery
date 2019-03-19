/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { subclass, declared, property } from "esri/core/accessorSupport/decorators";
import * as Widget from "esri/widgets/Widget";
import { renderable } from "esri/widgets/support/widget";

import MinimalGallery, { MinimalGalleryState, reducers } from "./MinimalGallery";
import { router, startHistoryListener } from "./MinimalGallery/_utilities/router";
import { newStore, middlewares } from "../Component";

interface MainAppProps {
    boilerplate: __Component.Pojo;
    i18n: __Component.Pojo;
}

const { thunk, debug } = middlewares;

@subclass("esri.widgets.MinimalGallery")
export default class MainApp extends declared(Widget) {
    minimalGallery: MinimalGallery;

    constructor(props: MainAppProps) {
        super();

        this.minimalGallery = new MinimalGallery(
            newStore({
                reducers,
                parentWidget: this,
                initialState: {
                    base: {
                        applicationBase: props.boilerplate,
                        applicationBaseResult: null,
                        i18n: props.i18n,
                        status: "loading",
                        loadMessage: "init"
                    }
                },
                middlewares: [ thunk, router ]
            })
        );

        startHistoryListener(this.minimalGallery.store);
    }

    render() {
        return this.minimalGallery.render();
    }
}
