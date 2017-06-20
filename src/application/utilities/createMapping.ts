export default (getSourceKey, createResult, updateResult) => {
    let keys = [];
    const results = [];
    return {
        results,
        map: (newSources) => {
            const newKeys = newSources.map(getSourceKey);
            const oldTargets = results.slice();
            let oldIndex = 0;
            for (let i = 0; i < newSources.length; i++) {
                const source = newSources[i];
                const sourceKey = newKeys[i];
                if (sourceKey === keys[oldIndex]) {
                    results[i] = oldTargets[oldIndex];
                    updateResult(source, oldTargets[oldIndex], i);
                    oldIndex++;
                } else {
                    let found = false;
                    for (let j = 1; j < keys.length + 1; j++) {
                        const searchIndex = (oldIndex + j) % keys.length;
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
