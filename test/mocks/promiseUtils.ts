const foo = {
    resolve: (returnVal) => ({
        then: (callback) => callback(returnVal)
    })
};
export = foo;
