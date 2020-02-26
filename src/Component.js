var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("esri/widgets/support/widget");
var Component = /** @class */ (function () {
    function Component(store) {
        /** Child components defined in this component's render function */
        this.childComponents = {};
        /** Indicates whether a component needs to re-render, or can simply return precalculated vdom */
        this.dirty = true;
        this.store = store;
        this.props = store.getState();
        this.tsx = this.tsx.bind(this);
        this.updateProps = this.updateProps.bind(this);
        store.subscribe(this.updateProps);
    }
    /** tsx function required to render child components */
    Component.prototype.tsx = function (element, properties, children) {
        if (typeof element === "string") { // Rendering ordinary hyperscript
            return widget_1.tsx.apply(this, arguments);
        }
        else { // Rendering a custom component
            if (properties && properties.key) { // Make sure the component has a unique key
                var child = this.childComponents[properties.key];
                if (child) {
                    if (child.dirty) { // Need to re-render
                        child.renderResult = child.render();
                    }
                    return child.renderResult;
                }
                else {
                    this.childComponents[properties.key] = new element(properties.store ? newStore(__assign({}, properties.store, { parentWidget: this.store.parentWidget })) :
                        this.store, properties.key);
                    this.childComponents[properties.key].renderResult = this.childComponents[properties.key].render();
                    return this.childComponents[properties.key].renderResult;
                }
            }
            else {
                throw new Error("Custom components must each have a unique key property.");
            }
        }
    };
    /** Returns a VNode, needs to be implemented by component creator */
    Component.prototype.render = function () { };
    /** Called before a component's props are updated. */
    Component.prototype.componentWillReceiveProps = function (nextProps) { };
    /** Returns true by default. If false returned component will not re-render */
    Component.prototype.shouldComponentUpdate = function (nextProps) {
        return true;
    };
    /** Updates the private state of the component */
    Component.prototype.setState = function (newState) {
        this.state = __assign({}, this.state, newState);
        this.store.parentWidget.scheduleRender();
    };
    /** Dispatches an action to the component's store */
    Component.prototype.dispatch = function (action) {
        this.store.dispatch(action);
    };
    /** Used behind the scenes to sync a component's props with the current application state */
    Component.prototype.updateProps = function (nextProps) {
        this.componentWillReceiveProps(nextProps);
        this.dirty = this.shouldComponentUpdate(nextProps);
        this.props = nextProps;
    };
    return Component;
}());
exports.default = Component;
/** Creates a new store of application state */
function newStore(storeParams) {
    if (storeParams.middlewares) {
        return applyMiddleware.apply(void 0, storeParams.middlewares)(createStore)(storeParams.reducers, storeParams.parentWidget, storeParams.initialState);
    }
    return createStore(storeParams.reducers, storeParams.parentWidget, storeParams.initialState);
}
exports.newStore = newStore;
/** Combines reducers to allow composition */
function combineReducers(reducers) {
    var finalReducers = pick(reducers, function (val) { return typeof val === 'function'; });
    return function (state, action) {
        if (state === void 0) { state = {}; }
        return mapValues(finalReducers, function (reducer, key) { return reducer(state[key], action); });
    };
}
exports.combineReducers = combineReducers;
function createStore(reducers, parentWidget, initialState) {
    var state;
    if (initialState) {
        state = initialState;
    }
    var subscribers = [];
    var store = {
        parentWidget: parentWidget,
        dispatch: function (action) {
            state = reducers(state, action);
            subscribers.forEach(function (handler) { return handler(state); });
            parentWidget.scheduleRender();
        },
        subscribe: function (handler) {
            subscribers.push(handler);
            return function unsubscribe() {
                var index = subscribers.indexOf(handler);
                subscribers.splice(index, 1);
            };
        },
        getState: function () {
            return state;
        }
    };
    store.dispatch({ type: "INITIALIZE" });
    return store;
}
function applyMiddleware() {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return function (next) { return function (reducer, parentWidget, initialState) {
        var store = next(reducer, parentWidget, initialState);
        var dispatch = store.dispatch;
        var chain = [];
        chain = middlewares.map(function (middleware) { return middleware({
            getState: store.getState,
            dispatch: function (action) { return dispatch(action); }
        }); });
        dispatch = compose.apply(void 0, chain)(store.dispatch);
        return __assign({}, store, { dispatch: dispatch });
    }; };
}
function compose() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    return function (arg) { return funcs.reduceRight(function (composed, f) { return f(composed); }, arg); };
}
function mapValues(obj, fn) {
    return Object.keys(obj).reduce(function (result, key) {
        result[key] = fn(obj[key], key);
        return result;
    }, {});
}
function pick(obj, fn) {
    return Object.keys(obj).reduce(function (result, key) {
        if (fn(obj[key])) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}
/** Available Redux middlewares */
exports.middlewares = {
    /** Asynchronous control flow using thunks */
    thunk: function (params) { return function (next) { return function (action) {
        if (typeof action === "function") {
            return action(params.dispatch, params.getState);
        }
        return next(action);
    }; }; },
    /** Log dispatch and next state to the console */
    debug: function (params) { return function (next) { return function (action) {
        console.log(action.type, action);
        var result = next(action);
        console.log('next state', params.getState());
        return result;
    }; }; },
    /** Send actions and resulting state to a listener */
    addListener: function (listener) {
        return function (params) { return function (next) { return function (action) {
            var result = next(action);
            listener(action, params.getState());
            return result;
        }; }; };
    }
};
//# sourceMappingURL=Component.js.map