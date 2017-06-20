import ApplicationBase from "boilerplate/ApplicationBase";
import * as requireUtils from "esri/core/requireUtils";

import Main from "./widgets/Main";

export = (applicationConfigJSON, boilerplateConfigJSON) => {
    const boilerplate = new ApplicationBase({ config: JSON.parse(applicationConfigJSON), settings: JSON.parse(boilerplateConfigJSON) });
    requireUtils.when(require, ["dojo/i18n!application/nls/resources"]).then((i18n) => {
        const MainComponent = new Main({ boilerplate, i18n: i18n[0] });
        MainComponent.container = "viewDiv";
    });
};
