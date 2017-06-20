import { expect } from "chai";
import { createTestProjector } from "maquette-query";
import * as sinon from "sinon";
import { WebMap, WebScene } from "../../../../src/application/widgets/views/ViewComposites";

const projector = createTestProjector();

export default () => (
    describe("The View Composites", () => {
        describe("The Map View", () => {
            let viewComponent;

            beforeEach(() => {
                viewComponent = WebMap({
                    config: {},
                    i18n: {},
                    id: "abc123",
                    projector: {},
                    widgets: {
                        compass: ""
                    }
                });
                projector.initialize(viewComponent.render);
            });

            it("should exist", () => {
                expect(viewComponent).to.exist;
            });

            it("should have a render function", () => {
                expect(viewComponent.render).to.exist;
            });

            it("should return some vdom from its render function", () => {
                expect(projector.query("div").exists()).to.equal(true);
            });
        });

        describe("The Scene View", () => {
            let viewComponent;

            beforeEach(() => {
                viewComponent = WebScene({
                    config: {},
                    i18n: {},
                    id: "abc123",
                    projector: {},
                    widgets: {
                        compass: ""
                    }
                });
                projector.initialize(viewComponent.render);
            });

            it("should exist", () => {
                expect(viewComponent).to.exist;
            });

            it("should have a render function", () => {
                expect(viewComponent.render).to.exist;
            });

            it("should return some vdom from its render function", () => {
                expect(projector.query("div").exists()).to.equal(true);
            });
        });
    })
);
