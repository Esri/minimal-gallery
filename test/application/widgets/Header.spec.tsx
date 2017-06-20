import { expect } from "chai";
import { createTestProjector } from "maquette-query";
import * as sinon from "sinon";
import Header from "../../../src/application/widgets/Header";

const projector = createTestProjector();

export default () => (
    describe("The Header", () => {
        let headerComponent;
        let onSearch;

        beforeEach(() => {
            onSearch = sinon.stub();
            headerComponent = Header({
                config: {
                    agolLinkLocation: "www.foobar.com",
                    agolLinkText: "foobar",
                    bgColor: "#ffffff",
                    fontColor: "#000000",
                    headerSearch: true,
                    headerText: "Foobar",
                    headerTextURL: "www.foobar.com",
                    headerImage: true,
                    headerImageLocation: "www.foobar.com/foobar.jpg",
                    searchPlaceholder: "foobar"
                },
                i18n: {
                    header: { foo: "bar" }
                },
                onSearch,
            });
            projector.initialize(headerComponent.render);
        });

        it("should exist", () => {
            expect(headerComponent).to.exist;
        });

        it("should have a render function", () => {
            expect(headerComponent.render).to.exist;
        });

        it("should return some vdom from its render function", () => {
            expect(projector.query("header").exists()).to.equal(true);
        });

        it("should have an input with a handler", () => {
            const input = projector.query("input");
            expect(input.exists()).to.equal(true);
            input.simulate.input({ value: "" });
            expect(onSearch.callCount).to.equal(1);
        });

        it("should not fire input handler unless input is empty", () => {
            const input = projector.query("input");
            input.simulate.input({ value: "foobar" });
            expect(onSearch.callCount).to.equal(0);
        });

        it("should show the search input if headerSearch is enabled (with text equal to the placeholder)", () => {
            expect(projector.query("input").execute().properties.placeholder).to.equal("foobar");
        });

        it("should not show the search input if headerSearch is disabled", () => {
            headerComponent = Header({
                config: {
                    agolLinkLocation: "www.foobar.com",
                    agolLinkText: "foobar",
                    bgColor: "#ffffff",
                    fontColor: "#000000",
                    headerSearch: false,
                    headerText: "Foobar",
                    headerTextURL: "www.foobar.com",
                    headerImage: true,
                    headerImageLocation: "www.foobar.com/foobar.jpg",
                    searchPlaceholder: "foobar"
                },
                i18n: {
                    header: { foo: "bar" }
                },
                onSearch,
            });
            projector.initialize(headerComponent.render);
            expect(projector.query("input").exists()).to.equal(false);
        });
    })
);
