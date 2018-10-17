import * as ioQuery from "dojo/io-query";
import Component from "../../Component";
import { MinimalGalleryState } from ".";
import { push } from "./_actions";

export default class Pager extends Component<MinimalGalleryState> {
    constructor(store: __Component.Store) {
        super(store);

        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handlePageButton = this.handlePageButton.bind(this);
        this.handlePage = this.handlePage.bind(this);
    }

    public render() {
        const tsx = this.tsx;
        const config = this.props.base.applicationBaseResult.config;
        const displayItems = this.props.items.filteredItems;

        const pages = Math.ceil(displayItems.length / config.itemsPerPage);

        const prevButtonClasses = {
            "btn": true,
            "btn-disabled": this.props.page <= 1,
            "btn-transparent": true
        };

        const nextButtonClasses = {
            "btn": true,
            "btn-arrow": true,
            "btn-disabled": this.props.page >= pages,
            "btn-transparent": true
        };

        const pageButtons = Array.apply(null, Array(pages)).map((v: any, i: number) => {
            const isActive = this.props.page === i + 1;
            return (
                <a
                    id={`page-${i + 1}-button`}
                    title={`page-${i + 1}`}
                    class={`btn${!isActive ? " btn-transparent" : ""}`}
                    onclick={this.handlePageButton}
                    role="link"
                    tabindex="0"
                    style={`
                        color: ${isActive ? config.buttonTextColor : config.buttonBgColor};
                        background-color: ${isActive ? config.buttonBgColor : null};
                        border: ${isActive ? `1px solid ${config.buttonBgColor}` : "none"}
                    `}
                    key={`page-button-${i + 1}-${this.props.items.displayKey}`}
                >
                    {i + 1}
                </a>
            );
        });

        return (
            <div class="text-center trailer-1 leader-1" key="pager">
                <a
                    id="previous"
                    title="previous"
                    classes={prevButtonClasses}
                    role="link"
                    tabindex="0"
                    style={`color:${config.buttonBgColor};`}
                    key="previous-button"
                    onclick={this.handlePrevious}
                >
                    Previous
                </a>
                    {pageButtons}
                <a
                    id="next"
                    title="next"
                    classes={nextButtonClasses}
                    role="link"
                    tabindex="0"
                    style={`color:${config.buttonBgColor};`}
                    key="next-button"
                    onclick={this.handleNext}
                >
                    Next
                </a>
            </div>
        );
    }

    private handleNext() {
        this.handlePage(this.props.page + 1);
    }

    private handlePrevious() {
        this.handlePage(this.props.page - 1);
    }

    private handlePageButton(e: any) {
        this.handlePage(e.target.text);
    }

    private handlePage(page: number) {
        const { hash } = this.props.router;
        const hashParams = ioQuery.queryToObject(hash);
        if (page > 1) {
            hashParams.page = page;
        } else {
            if (hashParams.page) {
                delete hashParams.page;
            }
        }
        this.dispatch(push(ioQuery.objectToQuery(hashParams)));
    }
}
