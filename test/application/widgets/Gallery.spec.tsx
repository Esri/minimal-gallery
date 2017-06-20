import { expect } from "chai";
import { createTestProjector } from "maquette-query";
import * as sinon from "sinon";
import Gallery from "../../../src/application/widgets/Gallery";

const projector = createTestProjector();

export default () => (
    describe("The Gallery", () => {
        let galleryComponent;
        let itemClickHandler;

        beforeEach(() => {
            itemClickHandler = sinon.stub();
            galleryComponent = Gallery({
                config: {
                    captionColor: "#123456",
                    cardColor: "#123456",
                    fontColor: "#123456",
                    group: "abcdefgh12345",
                    linkColor: "#123456",
                    showAuthor: true
                },
                i18n: {},
                itemClickHandler,
                items: []
            });
            projector.initialize(galleryComponent.render);
        });

        it("should exist", () => {
            expect(galleryComponent).to.exist;
        });

        it("should have a render function", () => {
            expect(galleryComponent.render).to.exist;
        });

        it("should return some vdom from its render function", () => {
            expect(projector.query("div").exists()).to.equal(true);
        });

        it("should render a panel for each item type", () => {
            galleryComponent = Gallery({
                config: {
                    captionColor: "#123456",
                    cardColor: "#123456",
                    fontColor: "#123456",
                    group: "abcdefgh12345",
                    linkColor: "#123456",
                    showAuthor: true
                },
                i18n: {},
                itemClickHandler,
                items: [{ type: "Web Map", title: "foo" }, { type: "Web Scene", title: "bar" }, { type: "Web Mapping Application", title: "foobar" }]
            });
            projector.initialize(galleryComponent.render);
            const divs = projector.queryAll("div").execute();
            const mapPanels = divs.filter((div) => div.properties.id === "map-panel");
            const scenePanels = divs.filter((div) => div.properties.id === "scene-panel");
            const appPanels = divs.filter((div) => div.properties.id === "app-panel");

            expect(mapPanels.length).to.equal(1);
            expect(scenePanels.length).to.equal(1);
            expect(appPanels.length).to.equal(1);
        });
    })
);
