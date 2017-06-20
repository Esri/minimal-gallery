import { expect } from "chai";
import { createTestProjector } from "maquette-query";
import * as sinon from "sinon";
import Viewer from "../../../src/application/widgets/Viewer";

const projector = createTestProjector();

export default () => (
    describe("The Gallery Viewer", () => {
        let viewerComponent;
        let exitClickHandler;

        beforeEach(() => {
            exitClickHandler = sinon.stub();
            viewerComponent = Viewer({
                config: {
                    bgColor: "#123456",
                },
                exitClickHandler,
                i18n: {
                    ui: { close: "foobar" },
                    viewLoading: { sorry: "foobar" }
                },
                id: "abcdefg123456",
                projector,
                type: "webmap",
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
                },
                exitClickHandler,
                i18n: {
                    ui: { close: "foobar" },
                    viewLoading: { sorry: "foobar" }
                },
                id: "abcdefg123456",
                projector,
                type: "webmap",
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
                },
                exitClickHandler,
                i18n: {
                    ui: { close: "foobar" },
                    viewLoading: { sorry: "foobar" }
                },
                id: "abcdefg123456",
                projector,
                type: "webscene",
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
                },
                exitClickHandler,
                i18n: {
                    ui: { close: "foobar" },
                    viewLoading: { sorry: "foobar" }
                },
                id: "abcdefg123456",
                projector,
                type: "webapp",
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
                },
                exitClickHandler,
                i18n: {
                    ui: { close: "foobar" },
                    viewLoading: { sorry: "blahblahblah" }
                },
                id: "abcdefg123456",
                projector,
                type: "foobar",
                widgets: {
                    compass: ""
                }
            });
            projector.initialize(viewerComponent.render);
            expect(projector.query("h3").exists()).to.equal(true);
            const message = projector.query("h3").execute();
            expect(message.text).to.equal("blahblahblah");
        });

        it("should fire the exit handler when the close button is clicked", (done) => {
            const closeButton = projector.query("button").simulate.click();
            setTimeout(() => {
                expect(exitClickHandler.callCount).to.equal(1);
                done();
            }, 750);
        });
    })
);
