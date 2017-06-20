import { expect } from "chai";
import { createTestProjector } from "maquette-query";
import * as sinon from "sinon";
import ViewBase from "../../../../src/application/widgets/views/ViewBase";

const projector = createTestProjector();

export default () => (
    describe("The Base View", () => {
        let viewBaseComponent;

        beforeEach(() => {
            viewBaseComponent = ViewBase({
                config: {},
                i18n: {
                    viewLoading: {
                        failed: "foobar",
                        scripts: "foobar"
                    }
                },
                id: "abc123",
                projector: { scheduleRender: () => null },
                ViewModule: "someModule",
                WebModule: "someOtherModule",
                widgets: {
                    compass: "top-left",
                    search: "top-right"
                }
            });
            projector.initialize(viewBaseComponent.render);
        });

        it("should exist", () => {
            expect(viewBaseComponent).to.exist;
        });

        it("should have a render function", () => {
            expect(viewBaseComponent.render).to.exist;
        });

        it("should return some vdom from its render function", () => {
            expect(projector.query("div").exists()).to.equal(true);
        });

        it("should return some vdom from its render function if it's in the loading state", () => {
            viewBaseComponent.status = "loading";
            projector.initialize(viewBaseComponent.render);
            expect(projector.query("div").exists()).to.equal(true);
        });

        it("should return some vdom from its render function if it's in the loaded state", () => {
            viewBaseComponent.status = "loaded";
            projector.initialize(viewBaseComponent.render);
            expect(projector.query("div").exists()).to.equal(true);
        });
    })
);
