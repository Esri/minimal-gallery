import * as mock from "mock-require";
mock("esri/widgets/support/widget", "./mocks/widget");
mock("esri/widgets/Widget", "./mocks/widgets/Widget");
mock("esri/core/accessorSupport/decorators", "./mocks/decorators");
mock("dojo/promise/all", "./mocks/all");
mock("esri/core/promiseUtils", "./mocks/promiseUtils");
mock("esri/core/requireUtils", "./mocks/requireUtils");

import HeaderTests from "./application/widgets/Header.spec";
import PagerTests from "./application/widgets/Pager.spec";
// import MainTests from "./application/widgets/Main.spec";
// import MainViewerTests from "./viewApp/widgets/Main.spec";

HeaderTests();
PagerTests();

import BasePanelTests from "./application/widgets/panels/PanelBase.spec";
BasePanelTests();

mock("../src/application/widgets/panels/PanelBase", "./mocks/widgets/PanelBase");
import PanelTests from "./application/widgets/panels/PanelComposites.spec";
PanelTests();

mock("../src/application/widgets/panels/PanelComposites", "./mocks/widgets/PanelComposites");
import GalleryTests from "./application/widgets/Gallery.spec";
GalleryTests();

import BaseViewTests from "./application/widgets/views/ViewBase.spec";
BaseViewTests();

import AppViewTests from "./application/widgets/views/AppView.spec";
AppViewTests();

mock("../src/application/widgets/views/ViewBase", "./mocks/widgets/ViewBase");
import ViewCompositeTests from "./application/widgets/views/ViewComposites.spec";
ViewCompositeTests();

mock("../src/application/widgets/views/AppView", "./mocks/widgets/AppView");
mock("../src/application/widgets/views/ViewComposites", "./mocks/widgets/ViewComposites");
import ViewerTests from "./application/widgets/Viewer.spec";
ViewerTests();

// Very difficult to test!
// Todo: Use minimal class/decorator based widget as entrypoint, move everything else to easily testable factory modules
// MainTests();
// MainViewerTests();

import ViewerAppTests from "./viewApp/widgets/Viewer.spec";
ViewerAppTests();

import createMappingTests from "./application/utilities/createMapping.spec";
createMappingTests();
