class WebMapConstructor {
    basemap: any;
    allLayers: any;

    constructor(props) {
        this.basemap = {
            load: () => ({
                then: (callback, errback) => callback()
            })
        };
        this.allLayers = {
            map: () => ({ toArray: () => null })
        };
    };

    public load() {
        return {
            then: (callback, errback) => callback(),
        };
    }
}

class WebViewConstructor {
    ui: any;

    constructor(props) {
        this.ui = {
            add: () => null
        }
    }

    public load() {
        return {
            then: (callback, errback) => callback()
        };
    }
}

const foo = {
    when: () => {
        const modules = [WebMapConstructor, WebViewConstructor];
        return {
            then: (callback, errback) => {
                if (errback) {
                    errback();
                }
                callback(modules);
                return {
                    then: (callback) => {
                        callback();
                        return {
                            otherwise: (errback) => {
                                errback();
                            }
                        };
                    }
                };
            }
        };
    }
};
export = foo;
