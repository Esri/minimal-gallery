/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import * as all from "dojo/promise/all";
import { declared, property, subclass } from "esri/core/accessorSupport/decorators";
import { jsxFactory, renderable } from "esri/widgets/support/widget";
import * as Widget from "esri/widgets/Widget";
import ApplicationBase from "../../boilerplate/ApplicationBase";
import { ApplicationConfig } from "../../boilerplate/interfaces";

import Gallery from "./Gallery";
import Header from "./Header";
import Pager from "./Pager";
import Viewer from "./Viewer";

const filterMap = {
    "Web Map": "webmap",
    "Web Mapping Application": "webapp",
    "Web Scene": "webscene"
};

interface State {
    boilerplate: ApplicationBase;
    boilerplateResult: ApplicationConfig;
    galleryComponent: any;
    groupQueryResults: any;
    i18n: any;
    items: any[];
    itemPointer: number;
    itemsPerPage: number;
    loadStatus: string;
    loadMessage: string;
    pagerComponent: any;
    viewComponent: any;
    headComponent: any;
    searchResults: any[];
}

@subclass("esri.widgets.Main")
export default class Main extends declared(Widget) {
    @property()
    @renderable()
    public state: State;

    private boilerplate: ApplicationBase;

    constructor(params) {
        super();

        this.state = {
            boilerplate: params.boilerplate,
            boilerplateResult: null,
            galleryComponent: null,
            groupQueryResults: null,
            headComponent: { render: () => null },
            i18n: params.i18n,
            items: null,
            itemPointer: 0,
            itemsPerPage: 20,
            loadMessage: "init",
            loadStatus: "loading",
            pagerComponent: { render: () => null },
            searchResults: null,
            viewComponent: { render: () => null }
        };

        this.exitClickHandler = this.exitClickHandler.bind(this);
        this.handleBoilerplateError = this.handleBoilerplateError.bind(this);
        this.handleBoilerplateLoad = this.handleBoilerplateLoad.bind(this);
        this.handleBoilerplateProgress = this.handleBoilerplateProgress.bind(this);
        this.itemClickHandler = this.itemClickHandler.bind(this);
        this.processItems = this.processItems.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.goToPointer = this.goToPointer.bind(this);

        this.boilerplate = params.boilerplate;
        this.boilerplate.load().then(
            this.handleBoilerplateLoad,
            this.handleBoilerplateError,
            this.handleBoilerplateProgress
        );
    }

    public render() {
        if (this.state.loadStatus === "loaded") {
            return (
                <div>
                    {this.state.headComponent.render()}
                    {this.state.galleryComponent.render()}
                    {this.state.viewComponent.render()}
                    {this.state.pagerComponent.render()}
                </div>
            );
        } else if (this.state.loadStatus === "failed") {
            return (
                <h3 class="center-style">{this.state.i18n.appLoading.failed}</h3>
            );
        } else if (this.state.loadStatus === "searching") {
            return (
                <div>
                    {this.state.headComponent.render()}
                    <div class="loader is-active padding-leader-3 padding-trailer-3 center-style" key={"loader"}>
                        <div class="loader-bars"></div>
                        <div bind={this} class="loader-text">{this.state.i18n.appLoading[this.state.loadMessage]}</div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div class="loader is-active padding-leader-3 padding-trailer-3 center-style" key={"loader"}>
                    <div class="loader-bars"></div>
                    <div bind={this} class="loader-text">{this.state.i18n.appLoading[this.state.loadMessage]}</div>
                </div>
            </div>
        );
    }

    private handleBoilerplateLoad(boilerplateResult) {
        boilerplateResult.results.groupInfos[0].promise.then((response) => {
            document.title = response.results[0].title;
        });
        document.documentElement.lang = boilerplateResult.locale;
        this.state = {
            ...this.state,
            boilerplateResult,
            loadMessage: "groupitems"
        };
        this.state.boilerplate.queryGroupItems(
            boilerplateResult.config.group,
            {
                num: 100,
                sortField: (boilerplateResult.config.sortField ? boilerplateResult.config.sortField : "num-views"),
                sortOrder: (boilerplateResult.config.sortOrder ? boilerplateResult.config.sortOrder : "desc"),
                start: 0
            } as __esri.PortalQueryParams
        ).then(
            this.processItems,
            (err) => {
                console.error(err);
                this.state = {
                    ...this.state,
                    loadStatus: "failed"
                };
            });
    }

    private processItems(response) {
        const promises = response.results.map((item) => item.load());
        all(promises).then((items) => {
            document.body.setAttribute("style", `background-color: ${this.state.boilerplateResult.config.bgColor}`);
            this.state = {
                ...this.state,
                groupQueryResults: response.results
            };

            let filteredResults;
            const filters = this.state.boilerplateResult.config.filter;
            if (filters) {
                const filterKey = filters.split(",").reduce((p, c, i) => {
                    p[c] = true;
                    return p;
                }, {});
                filteredResults = response.results.filter((item) => {
                    return filterKey[filterMap[item.type]];
                });
            } else {
                filteredResults = response.results.filter((item) => {
                    return item.type === "Web Map" ||
                        item.type === "Web Mapping Application" ||
                        item.type === "Web Scene";
                });
            }

            const headComponent = (
                this.state.boilerplateResult.config.showHeader ?
                Header({
                    config: this.state.boilerplateResult.config,
                    i18n: this.state.i18n,
                    onSearch: this.handleSearch
                }) :
                {
                    render: () => null
                }
            );

            const pagerComponent = Pager({
                config: this.state.boilerplateResult.config,
                i18n: this.state.i18n,
                keyCode: Math.random().toString(36).substring(7),
                pointHandler: this.goToPointer,
                perPage: this.state.itemsPerPage,
                pointer: this.state.itemPointer,
                total: filteredResults.length
            });

            this.state = {
                ...this.state,
                galleryComponent: Gallery({
                    config: this.state.boilerplateResult.config,
                    i18n: this.state.i18n,
                    itemClickHandler: this.itemClickHandler,
                    items: filteredResults.slice(0, this.state.itemsPerPage)
                }),
                headComponent,
                items: filteredResults,
                searchResults: filteredResults,
                loadStatus: "loaded",
                pagerComponent
            };
        }, (err) => {
            console.error(err);
            this.state = {
                ...this.state,
                status: "failed"
            };
        })
    }

    private handleBoilerplateError(err) {
        console.error(err);
        this.state = {
            ...this.state,
            loadStatus: "failed"
        };
    }

    private handleBoilerplateProgress(progress) {
        this.state = {
            ...this.state,
            loadMessage: progress.status
        };
    }

    private itemClickHandler(id: string, type: string) {
        this.state = {
            ...this.state,
            viewComponent: Viewer({
                config: this.state.boilerplateResult.config,
                exitClickHandler: this.exitClickHandler,
                i18n: this.state.i18n,
                id,
                projector: this,
                type,
                widgets: Object.keys(this.state.boilerplateResult.config)
                            .filter((key) => key.indexOf("Widget") !== -1)
                            .reduce((p, key) => {
                                p[key] = this.state.boilerplateResult.config[key];
                                return p;
                            }, {})
            })
        };
    }

    private exitClickHandler() {
        this.state = {
            ...this.state,
            viewComponent: { render: () => null }
        };
    };

    private handleSearch(e) {
        e.preventDefault();

        const searchResults = this.state.items.filter((item) => {
            return item.title.toLowerCase().indexOf(e.target.childNodes[0].value.toLowerCase()) !== -1 ||
                item.type.toLowerCase().indexOf(e.target.childNodes[0].value.toLowerCase()) !== -1 ||
                item.owner.toLowerCase().indexOf(e.target.childNodes[0].value.toLowerCase()) !== -1;
        });

        this.state = {
            ...this.state,
            galleryComponent: Gallery({
                config: this.state.boilerplateResult.config,
                i18n: this.state.i18n,
                itemClickHandler: this.itemClickHandler,
                items: searchResults.slice(0, this.state.itemsPerPage)
            }),
            loadStatus: "loaded",
            pagerComponent: Pager({
                config: this.state.boilerplateResult.config,
                i18n: this.state.i18n,
                keyCode: Math.random().toString(36).substring(7),
                perPage: this.state.itemsPerPage,
                pointHandler: this.goToPointer,
                pointer: 0,
                total: searchResults.length
            }),
            searchResults
        };
    }

    private goToPointer(pointer) {
        this.state = {
            ...this.state,
            galleryComponent: Gallery({
                config: this.state.boilerplateResult.config,
                i18n: this.state.i18n,
                itemClickHandler: this.itemClickHandler,
                items: this.state.searchResults.slice(pointer, pointer + this.state.itemsPerPage)
            }),
            loadStatus: "loaded"
        };
    }
}
