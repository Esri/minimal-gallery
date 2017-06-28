define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = function (getSourceKey, createResult, updateResult) {
        var keys = [];
        var results = [];
        return {
            results: results,
            map: function (newSources) {
                var newKeys = newSources.map(getSourceKey);
                var oldTargets = results.slice();
                var oldIndex = 0;
                for (var i = 0; i < newSources.length; i++) {
                    var source = newSources[i];
                    var sourceKey = newKeys[i];
                    if (sourceKey === keys[oldIndex]) {
                        results[i] = oldTargets[oldIndex];
                        updateResult(source, oldTargets[oldIndex], i);
                        oldIndex++;
                    }
                    else {
                        var found = false;
                        for (var j = 1; j < keys.length + 1; j++) {
                            var searchIndex = (oldIndex + j) % keys.length;
                            if (keys[searchIndex] === sourceKey) {
                                results[i] = oldTargets[searchIndex];
                                updateResult(newSources[i], oldTargets[searchIndex], i);
                                oldIndex = searchIndex + 1;
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            results[i] = createResult(source, i);
                        }
                    }
                }
                results.length = newSources.length;
                keys = newKeys;
            }
        };
    };
});
//# sourceMappingURL=createMapping.js.map