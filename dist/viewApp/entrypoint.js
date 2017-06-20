define(["require", "exports", "boilerplate/ApplicationBase", "esri/core/requireUtils", "./widgets/Main"], function (require, exports, ApplicationBase_1, requireUtils, Main_1) {
    "use strict";
    return function (applicationConfigJSON, boilerplateConfigJSON) {
        var boilerplate = new ApplicationBase_1.default({ config: JSON.parse(applicationConfigJSON), settings: JSON.parse(boilerplateConfigJSON) });
        requireUtils.when(require, ["dojo/i18n!application/nls/resources"]).then(function (i18n) {
            var MainComponent = new Main_1.default({ boilerplate: boilerplate, i18n: i18n[0] });
            MainComponent.container = "viewDiv";
        });
    };
});
//# sourceMappingURL=entrypoint.js.map