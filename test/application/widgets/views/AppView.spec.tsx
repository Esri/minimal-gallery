import { expect } from "chai";
import { createTestProjector } from "maquette-query";
import * as sinon from "sinon";
import AppView from "../../../../src/application/widgets/views/AppView";

const projector = createTestProjector();

export default () => (
    describe("The App View", () => {
        let viewComponent;

        beforeEach(() => {
            viewComponent = AppView({
                i18n: {
                    viewLoading: {
                        iframe: "foobar"
                    }
                },
                projector: {},
                url: "foobar"
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
            expect(projector.query("iframe").exists()).to.equal(true);
        });
    })
);
