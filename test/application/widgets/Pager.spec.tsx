import { expect } from "chai";
import { createTestProjector } from "maquette-query";
import * as sinon from "sinon";
import Pager from "../../../src/application/widgets/Pager";

const projector = createTestProjector();

export default () => (
    describe("The Pager", () => {
        let pagerComponent;
        let pointHandler;

        beforeEach(() => {
            pointHandler = sinon.stub();
            pagerComponent = Pager({
                config: {},
                i18n: {
                    pager: {
                        noResults: "Sorry, not sorry."
                    }
                },
                keyCode: "abc123",
                perPage: 20,
                pointHandler,
                pointer: 0,
                total: 60
            });
            projector.initialize(pagerComponent.render);
        });

        it("should exist", () => {
            expect(pagerComponent).to.exist;
        });

        it("should have a render function", () => {
            expect(pagerComponent.render).to.exist;
        });

        it("should return some vdom from its render function", () => {
            expect(projector.query("div").exists()).to.equal(true);
        });

        it("should have a next button with a click handler", () => {
            const links = projector.queryAll("a");
            const nextLink = links.execute().filter((link) => {
                return link.properties.id === "next";
            })[0];
            expect(nextLink).to.exist;
            expect(nextLink.properties['onclick']).to.exist;
        });

        it("should fire the pointHandler when nextbutton's onclick is fired", () => {
            const links = projector.queryAll("a");
            const nextLink = links.execute().filter((link) => {
                return link.properties.id === "next";
            })[0];
            nextLink.properties['onclick']();
            expect(pointHandler.callCount).to.equal(1);
        });

        it("should have a previous button with a click handler", () => {
            const links = projector.queryAll("a");
            const prevLink = links.execute().filter((link) => {
                return link.properties.id === "previous";
            })[0];
            expect(prevLink).to.exist;
            expect(prevLink.properties['onclick']).to.exist;
        });

        it("should fire the pointHandler when prevbutton's onclick is fired", () => {
            const links = projector.queryAll("a");
            const prevLink = links.execute().filter((link) => {
                return link.properties.id === "previous";
            })[0];
            prevLink.properties['onclick']();
            expect(pointHandler.callCount).to.equal(1);
        });

        it ("should have 3 page buttons (with 60 items, 20 per page)", () => {
            const links = projector.queryAll("a");
            const pageButtons = links.execute().filter((link) => {
                return link.properties.id.slice(0, 4) === "page";
            });
            expect(pageButtons.length).to.equal(3);
        });

        it ("should have 123 page buttons (with 2440 items, 20 per page)", () => {
            pagerComponent = Pager({
                config: {},
                i18n: {
                    pager: {
                        noResults: "Sorry, not sorry."
                    }
                },
                keyCode: "abc123",
                perPage: 20,
                pointHandler,
                pointer: 0,
                total: 2447
            });
            projector.initialize(pagerComponent.render);
            const links = projector.queryAll("a");
            const pageButtons = links.execute().filter((link) => {
                return link.properties.id.slice(0, 4) === "page";
            });
            expect(pageButtons.length).to.equal(123);
        });

        it ("shouldn't show any pager if there's only one page", (done) => {
            pagerComponent = Pager({
                config: {},
                i18n: {
                    pager: {
                        noResults: "Sorry, not sorry."
                    }
                },
                keyCode: "abc123",
                perPage: 20,
                pointHandler,
                pointer: 0,
                total: 2
            });
            projector.initialize(pagerComponent.render);
            try {
                projector.query("div").exists();
            } catch(e) {
                done();
            }
        });

        it("should be a jerk if there are no results", () => {
            pagerComponent = Pager({
                config: {},
                i18n: {
                    pager: {
                        noResults: "Sorry, not sorry."
                    }
                },
                keyCode: "abc123",
                perPage: 20,
                pointHandler,
                pointer: 0,
                total: 0
            });
            projector.initialize(pagerComponent.render);
            expect(projector.query("h3").exists()).to.equal(true);
            expect(projector.query("h3").execute().text).to.equal("Sorry, not sorry.");
        });
    })
);
