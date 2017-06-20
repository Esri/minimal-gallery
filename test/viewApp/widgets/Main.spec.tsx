import { expect } from "chai";
import { createTestProjector } from "maquette-query";
import * as sinon from "sinon";
import Main from "../../../src/application/widgets/Main";

const projector = createTestProjector();

export default () => (
    describe("The Main Component", () => {
        let mainComponent;

        beforeEach(() => {
            mainComponent = new Main({
                boilerplate: {
                    then: () => null
                },
                i18n: {}
            });
            projector.initialize(mainComponent.render);
        });

        it("should exist", () => {
            expect(mainComponent).to.exist;
        });

        it("should have a render function", () => {
            expect(mainComponent.render).to.exist;
        });

        it("should return some vdom from its render function", () => {
            expect(projector.query("div").exists()).to.equal(true);
        });
    })
);
