import { expect } from "chai";
import { createTestProjector } from "maquette-query";
import * as sinon from "sinon";
import { MapPanel, ScenePanel, AppPanel } from "../../../../src/application/widgets/panels/PanelComposites";

const projector = createTestProjector();

export default () => (
    describe("The Panel Composites", () => {
        describe("The Map Panel composite", () => {
            let panelComponent;
            let itemClickHandler;

            beforeEach(() => {
                itemClickHandler = sinon.stub();
                panelComponent = MapPanel({
                    config: {
                        captionColor: "123456",
                        cardColor: "123456",
                        fontColor: "123456",
                        group: "abc123",
                        linkColor: "123456",
                        showAuthor: true
                    },
                    i18n: {
                        ui: {
                            itemExtTip: "foo",
                            mapExtTip: "bar"
                        }
                    },
                    item: {},
                    itemClickHandler
                });
                projector.initialize(panelComponent.render);
            });

            it("should exist", () => {
                expect(panelComponent).to.exist;
            });

            it("should have a render function", () => {
                expect(panelComponent.render).to.exist;
            });

            it ("should return some vdom from its render function", () => {
                expect(projector.query("div").exists()).to.equal(true);
            });

            it("should fire the itemClickHandler when the base-panel's itemClickHandler is fired", () => {
                projector.query("div").simulate.click();
                expect(itemClickHandler.callCount).to.equal(1);
            });
        });

        describe("The Scene Panel composite", () => {
            let panelComponent;
            let itemClickHandler;

            beforeEach(() => {
                itemClickHandler = sinon.stub();
                panelComponent = ScenePanel({
                    config: {
                        captionColor: "123456",
                        cardColor: "123456",
                        fontColor: "123456",
                        group: "abc123",
                        linkColor: "123456",
                        showAuthor: true
                    },
                    i18n: {
                        ui: {
                            itemExtTip: "foo",
                            mapExtTip: "bar"
                        }
                    },
                    item: {},
                    itemClickHandler
                });
                projector.initialize(panelComponent.render);
            });

            it("should exist", () => {
                expect(panelComponent).to.exist;
            });

            it("should have a render function", () => {
                expect(panelComponent.render).to.exist;
            });

            it ("should return some vdom from its render function", () => {
                expect(projector.query("div").exists()).to.equal(true);
            });

            it("should fire the itemClickHandler when the base-panel's itemClickHandler is fired", () => {
                projector.query("div").simulate.click();
                expect(itemClickHandler.callCount).to.equal(1);
            });
        });

        describe("The App Panel composite", () => {
            let panelComponent;
            let itemClickHandler;

            beforeEach(() => {
                itemClickHandler = sinon.stub();
                panelComponent = AppPanel({
                    config: {
                        captionColor: "123456",
                        cardColor: "123456",
                        fontColor: "123456",
                        group: "abc123",
                        linkColor: "123456",
                        showAuthor: true
                    },
                    i18n: {
                        ui: {
                            itemExtTip: "foo",
                            mapExtTip: "bar"
                        }
                    },
                    item: {},
                    itemClickHandler,
                });
                projector.initialize(panelComponent.render);
            });

            it("should exist", () => {
                expect(panelComponent).to.exist;
            });

            it("should have a render function", () => {
                expect(panelComponent.render).to.exist;
            });

            it ("should return some vdom from its render function", () => {
                expect(projector.query("div").exists()).to.equal(true);
            });

            it("should fire the itemClickHandler when the base-panel's itemClickHandler is fired", () => {
                projector.query("div").simulate.click();
                expect(itemClickHandler.callCount).to.equal(1);
            });
        });
    })
);
