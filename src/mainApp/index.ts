import * as ApplicationBase from "../applicationBase/ApplicationBase";
import * as requireUtils from "esri/core/requireUtils";

import MainApp from "./Widget";

export = (applicationConfigJSON: string, boilerplateConfigJSON: string, i18n: any) => {
    const boilerplate = new ApplicationBase({
        config: JSON.parse(applicationConfigJSON),
        settings: JSON.parse(boilerplateConfigJSON)
    });
    const MainComponent = new MainApp({ boilerplate, i18n });
    MainComponent.container = "viewDiv";
};
