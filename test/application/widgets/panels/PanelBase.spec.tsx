import { expect } from "chai";
import { createTestProjector } from "maquette-query";
import * as sinon from "sinon";
import BasePanel from "../../../../src/application/widgets/panels/PanelBase";

const projector = createTestProjector();

export default () => (
    describe("The Base Panel", () => {
        let panelComponent;
        let itemClickHandler;

        beforeEach(() => {
            itemClickHandler = sinon.stub();
            panelComponent = BasePanel({
                captionColor: "#123456",
                config: {
                    group: "abc123",
                    cardColor: "123456",
                    fontColor: "123456",
                    captionColor: "123456",
                    linkColor: "123456",
                    showAuthor: true,
                },
                i18n: { ui: { galleryTip: "foobar" } },
                item: {},
                itemClickHandler,
                maxLink: "http://abc.123.com",
                extTitle: "abc123",
                extLink: "http://abc.123.com",
                extItem: "abc123"
            });
            projector.initialize(panelComponent.render);
        });

        it("should exist", () => {
            expect(panelComponent).to.exist;
        });

        it("should have a render function", () => {
            expect(panelComponent.render).to.exist;
        });

        it("should return some vdom from its render function", () => {
            expect(projector.query("div").exists()).to.equal(true);
        });

        it("should have an image with click, mouseover and mouseleave handlers", () => {
            const image = projector.query("img");
            expect(image.exists()).to.equal(true);
            const imageInstance = image.execute();
            expect(imageInstance.properties.onmouseover).to.exist;
            imageInstance.properties.onmouseover();
            expect(imageInstance.properties.onmouseleave).to.exist;
            imageInstance.properties.onmouseleave();
        });

        it("should fire the itemClickHandler when the item image is clicked", () => {
            projector.query("img").simulate.click();
            expect(itemClickHandler.callCount).to.equal(1);
        });

        it("should fire the itemClickHandler when the user presses 'enter' on the image link (for accessibility)", () => {
            const imageLink = projector.queryAll("a").execute().filter((link) => link.properties.title === "foobar")[0];
            imageLink.properties.onkeypress({ keyCode: 13 } as KeyboardEvent);
            expect(itemClickHandler.callCount).to.equal(1);
        });

        it ("should not fire the itemClickHandler when the user presses any other key on the image link", () => {
            const imageLink = projector.queryAll("a").execute().filter((link) => link.properties.title === "foobar")[0];
            imageLink.properties.onkeypress({ keyCode: 14 } as KeyboardEvent);
            expect(itemClickHandler.callCount).to.equal(0);
        });

        it("should not show the author if props.showAuthor === false", () => {
            panelComponent = BasePanel({
                i18n: { ui: { galleryTip: "foobar" } },
                item: {},
                captionColor: "#123456",
                config: {
                    cardColor: "123456",
                    captionColor: "123456",
                    fontColor: "123456",
                    group: "abc123",
                    linkColor: "123456",
                    showAuthor: false
                },
                itemClickHandler,
                maxLink: "http://abc.123.com",
                extTitle: "abc123",
                extLink: "http://abc.123.com",
                extItem: "abc123"
            });
            projector.initialize(panelComponent.render);
            expect(projector.query("p").exists()).to.equal(false);
        });

        it("should not show the item type if props.showItemType === false", () => {
            panelComponent = BasePanel({
                i18n: { ui: { galleryTip: "foobar" } },
                item: {},
                captionColor: "#123456",
                config: {
                    captionColor: "123456",
                    cardColor: "123456",
                    fontColor: "123456",
                    group: "abc123",
                    linkColor: "123456",
                    showItemType: false
                },
                itemClickHandler,
                maxLink: "http://abc.123.com",
                extTitle: "abc123",
                extLink: "http://abc.123.com",
                extItem: "abc123"
            });
            projector.initialize(panelComponent.render);
            expect(
                projector.queryAll("div").execute().filter((vnode) => vnode.properties.class === "card-image-caption").length
            ).to.equal(0);
        });

        it("should show the item type if props.showItemType === true", () => {
            panelComponent = BasePanel({
                i18n: { ui: { galleryTip: "foobar" } },
                item: {},
                captionColor: "#123456",
                config: {
                    captionColor: "123456",
                    cardColor: "123456",
                    fontColor: "123456",
                    group: "abc123",
                    linkColor: "123456",
                    showItemType: true
                },
                itemClickHandler,
                maxLink: "http://abc.123.com",
                extTitle: "abc123",
                extLink: "http://abc.123.com",
                extItem: "abc123"
            });
            projector.initialize(panelComponent.render);
            expect(
                projector.queryAll("div").execute().filter((vnode) => vnode.properties.class === "card-image-caption").length
            ).to.equal(1);
        });
    })
);
