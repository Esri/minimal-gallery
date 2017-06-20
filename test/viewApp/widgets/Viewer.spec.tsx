import { expect } from "chai";
import { createTestProjector } from "maquette-query";
import * as sinon from "sinon";
import Viewer from "../../../src/viewApp/widgets/Viewer";

const projector = createTestProjector();

export default () => (
    describe("The viewApp Viewer Component", () => {
        let viewerComponent;

        beforeEach(() => {
            viewerComponent = Viewer({
                config: {
                    id: "abc123",
                    type: "webmap",
                    bgColor: "#123456"
                },
                i18n: {
                    viewLoading: {
                        sorry: "foobar"
                    }
                },
                projector: {},
                widgets: {
                    compass: ""
                }
            });
            projector.initialize(viewerComponent.render);
        });

        it("should exist", () => {
            expect(viewerComponent).to.exist;
        });

        it("should have a render function", () => {
            expect(viewerComponent.render).to.exist;
        });

        it("should return some vdom from its render function", () => {
            expect(projector.query("div").exists()).to.equal(true);
        });

        it("should return a webmap if the item type is 'webmap'", () => {
            viewerComponent = Viewer({
                config: {
                    bgColor: "#123456",
                    id: "abc123",
                    type: "webmap"
                },
                i18n: {
                    ui: { close: "foobar" },
                    viewLoading: { sorry: "foobar" }
                },
                projector,
                widgets: {
                    compass: ""
                }
            });
            projector.initialize(viewerComponent.render);
            const webmap = projector.queryAll("div").execute().filter((div) => div.properties.id === "webmap")[0];
            expect(webmap).to.exist;
        });

        it("should return a webscene if the item type is 'webscene'", () => {
            viewerComponent = Viewer({
                config: {
                    bgColor: "#123456",
                    id: "abc123",
                    type: "webscene"
                },
                i18n: {
                    ui: { close: "foobar" },
                    viewLoading: { sorry: "foobar" }
                },
                projector,
                widgets: {
                    compass: ""
                }
            });
            projector.initialize(viewerComponent.render);
            const webscene = projector.queryAll("div").execute().filter((div) => div.properties.id === "webscene")[0];
            expect(webscene).to.exist;
        });

        it("should return a webapp if the item type is 'webapp'", () => {
            viewerComponent = Viewer({
                config: {
                    bgColor: "#123456",
                    id: "abc123",
                    type: "webapp"
                },
                i18n: {
                    ui: { close: "foobar" },
                    viewLoading: { sorry: "foobar" }
                },
                projector,
                widgets: {
                    compass: ""
                }
            });
            projector.initialize(viewerComponent.render);
            const webapp = projector.queryAll("div").execute().filter((div) => div.properties.id === "webapp")[0];
            expect(webapp).to.exist;
        });

        it("should return the sorry message if the item type is anything else", () => {
            viewerComponent = Viewer({
                config: {
                    bgColor: "#123456",
                    id: "abc123",
                    type: "foobar"
                },
                i18n: {
                    ui: { close: "foobar" },
                    viewLoading: { sorry: "blahblahblah" }
                },
                projector,
                widgets: {
                    compass: ""
                }
            });
            projector.initialize(viewerComponent.render);
            expect(projector.query("h3").exists()).to.equal(true);
            const message = projector.query("h3").execute();
            expect(message.text).to.equal("blahblahblah");
        });
    })
);
