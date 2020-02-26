var ApplicationBase = require("../applicationBase/ApplicationBase");
var Widget_1 = require("./Widget");
module.exports = function (applicationConfigJSON, boilerplateConfigJSON, i18n) {
    var config = JSON.parse(applicationConfigJSON);
    var settings = JSON.parse(boilerplateConfigJSON);
    var boilerplate = new ApplicationBase({ config: config, settings: settings });
    var MainComponent = new Widget_1.default({ boilerplate: boilerplate, i18n: i18n });
    MainComponent.container = "viewDiv";
};
//# sourceMappingURL=index.js.map