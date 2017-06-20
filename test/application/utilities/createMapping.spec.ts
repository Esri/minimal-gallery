import { expect } from "chai";
import createMapping from "../../../src/application/utilities/createMapping";

export default () => (
    describe("the createMapping utility", () => {
      it("should take 3 functions as arguments, and return a map", () => {
            const mapping = createMapping(() => null, () => null, () => null);
            expect(mapping.map).to.exist;
      });

      it("should update with new data", () => {
            const mapping = createMapping(
                (item) => item.key,
                (item) => item,
                () => null
            );

            const data = [{key: "bar"}, {key: "foo"}, {key: "foobar"}];
            mapping.map(data);
            const oldResults = [...mapping.results];

            const newData = [{key: "monkey"}, {key: "banana"}, {key: "forest"}];
            mapping.map(newData);
            const newResults = [...mapping.results];

            expect(newResults[0].key !== oldResults[0].key).to.be.true;
      });

      it("should keep old entries with the same key", () => {
            const mapping = createMapping(
                (item) => item.key,
                (item) => item,
                () => null
            );

            const data = [{key: "bar"}, {key: "foo"}, {key: "foobar"}];
            mapping.map(data);
            const oldResults = [...mapping.results];

            const newData = [{key: "bar"}, {key: "banana"}, {key: "forest"}];
            mapping.map(newData);
            const newResults = [...mapping.results];

            expect(newResults[0].key === oldResults[0].key).to.be.true;
      });

      it("should keep old entries with the same key", () => {
            const mapping = createMapping(
                (item) => item.key,
                (item) => item,
                () => null
            );

            const data = [{key: "bar"}, {key: "foo"}, {key: "foobar"}];
            mapping.map(data);
            const oldResults = [...mapping.results];

            const newData = [{key: "bar"}, {key: "foo"}, {key: "foobar"}];;
            mapping.map(newData);
            const newResults = [...mapping.results];

            expect(newResults[0].key === oldResults[0].key).to.be.true;
      });

      it("should keep old entries with the same key in different positions", () => {
            const mapping = createMapping(
                (item) => item.key,
                (item) => item,
                () => null
            );

            const data = [{key: "bar"}, {key: "foo"}, {key: "foobar"}];
            mapping.map(data);
            const oldResults = [...mapping.results];

            const newData = [{key: "monkey"}, {key: "forest"}, {key: "banana"}, {key: "foo"}, {key: "bar"}];
            mapping.map(newData);
            const newResults = [...mapping.results];

            expect(newResults[3].key === oldResults[1].key).to.be.true;
      });
    })
);
