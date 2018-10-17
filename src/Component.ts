import { tsx as h } from "esri/widgets/support/widget";

interface StoreParams {
    reducers: any;
    parentWidget: __esri.Widget;
    initialState?: __Component.Pojo;
    middlewares?: any[];
}

export default abstract class Component<ApplicationState extends __Component.Pojo, ComponentState extends __Component.Pojo = {}> {
    /** Child components defined in this component's render function */
    public childComponents: {
        [childKey: string]: Component<__Component.Pojo, __Component.Pojo>;
    } = {};

    /** Internal component state */
    public state: ComponentState;

    /** The full state tree for the current scope */
    public props: ApplicationState;

    /** Indicates whether a component needs to re-render, or can simply return precalculated vdom */
    public dirty: Boolean = true;

    /** The previous result of rendering the component */
    public renderResult: any;

    /** Injectable hyperscript or custom components */
    public children: any;

    /** The component's store, which is shared by all components in the scope */
    public store: __Component.Store;

    constructor(store: __Component.Store) {
        this.store = store;
        this.props = store.getState();

        this.tsx = this.tsx.bind(this);
        this.updateProps = this.updateProps.bind(this);

        store.subscribe(this.updateProps);
    }

    /** tsx function required to render child components */
    public tsx(element: string | any, properties?: any, children?: any) {
        if (typeof element === "string") { // Rendering ordinary hyperscript
            return h.apply(this, arguments);
        } else { // Rendering a custom component
            if (properties && properties.key) { // Make sure the component has a unique key
                let child = this.childComponents[properties.key];
                if (child) {
                    if (child.dirty) { // Need to re-render
                        child.renderResult = child.render();
                    }
                    return child.renderResult;
                } else {
                    this.childComponents[properties.key] = new element(
                        properties.store ? newStore({ ...properties.store, parentWidget: this.store.parentWidget }) :
                        this.store,
                        properties.key
                    );
                    this.childComponents[properties.key].renderResult = this.childComponents[properties.key].render();
                    return this.childComponents[properties.key].renderResult;
                }
            } else {
                throw new Error("Custom components must each have a unique key property.");
            }
        }
    }
    
    /** Returns a VNode, needs to be implemented by component creator */
    public render() {}
    
    /** Called before a component's props are updated. */
    public componentWillReceiveProps(nextProps: ApplicationState) {}
    
    /** Returns true by default. If false returned component will not re-render */
    public shouldComponentUpdate(nextProps: ApplicationState) {
        return true;
    }
    
    /** Updates the private state of the component */
    public setState(newState: Partial<ComponentState>) {
        this.state = {...this.state as any, ...newState as any};
        this.store.parentWidget.scheduleRender();
    }
    
    /** Dispatches an action to the component's store */
    public dispatch(action: any) {
        this.store.dispatch(action);
    }

    /** Used behind the scenes to sync a component's props with the current application state */
    private updateProps(nextProps: ApplicationState) {
        this.componentWillReceiveProps(nextProps);
        this.dirty = this.shouldComponentUpdate(nextProps);
        this.props = nextProps;
    }
}

/** Creates a new store of application state */
export function newStore(storeParams: StoreParams) {
    if (storeParams.middlewares) {
        return applyMiddleware(...storeParams.middlewares)(createStore)(
            storeParams.reducers, storeParams.parentWidget, storeParams.initialState
        );
    }
    return createStore(storeParams.reducers, storeParams.parentWidget, storeParams.initialState);
}

/** Combines reducers to allow composition */
export function combineReducers(reducers: any) {
    var finalReducers = pick(reducers, (val: any) => typeof val === 'function');
    return (state = {}, action: any) => mapValues(finalReducers,
        (reducer: any, key: any) => reducer(state[key], action)
    );
}

function createStore(reducers: any, parentWidget: __esri.Widget, initialState?: __Component.Pojo): __Component.Store {
    let state: __Component.Pojo;
    if (initialState) {
        state = initialState;
    }
    const subscribers: ((state: __Component.Pojo) => void)[] = [];
    const store = {
        parentWidget,
        dispatch: (action: any) => {
            state = reducers(state, action);
            subscribers.forEach(handler => handler(state));
            parentWidget.scheduleRender();
        },
        subscribe: (handler: (state: __Component.Pojo) => void) => {
            subscribers.push(handler);
            return function unsubscribe() {
                const index = subscribers.indexOf(handler);
                subscribers.splice(index, 1);
            };
        },
        getState() {
            return state;
        }
    };
    store.dispatch({ type: "INITIALIZE" });
    return store;
}

function applyMiddleware(...middlewares: any[]) {
    return (next: any) => (reducer: any, parentWidget: any, initialState: any) => {
      var store = next(reducer, parentWidget, initialState);
      var dispatch = store.dispatch;
      var chain = [];
  
      chain = middlewares.map(middleware => middleware({
        getState: store.getState,
        dispatch: (action: any) => dispatch(action)
      }));
      dispatch = compose(...chain)(store.dispatch);
  
      return { ...store, dispatch };
    };
  }

function compose(...funcs: any[]) {
    return (arg: any) => funcs.reduceRight((composed, f) => f(composed), arg);
}
    
function mapValues(obj: __Component.Pojo, fn: any) {
    return Object.keys(obj).reduce((result, key) => {
        result[key] = fn(obj[key], key);
        return result;
    }, {});
}

function pick(obj: __Component.Pojo, fn: any) {
    return Object.keys(obj).reduce((result, key) => {
        if (fn(obj[key])) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}

/** Available Redux middlewares */
export const middlewares = {
    /** Asynchronous control flow using thunks */
    thunk: (params: { dispatch: any, getState: any }) => (next: any) => (action: any) => {
        if (typeof action === "function") {
            return action(params.dispatch, params.getState);
        }
        return next(action);
    },
    /** Log dispatch and next state to the console */
    debug:  (params: { dispatch: any, getState: any }) => (next: any) => (action: any) => {
        console.log(action.type, action);
        let result = next(action);
        console.log('next state', params.getState());
        return result;
    },
    /** Send actions and resulting state to a listener */
    addListener: (listener: (action: any, nextState: __Component.Pojo) => any) =>
        (params: { dispatch: any, getState: any }) => (next: any) => (action: any) => {
            let result = next(action);
            listener(action, params.getState());
            return result;
    }
};
