import { jsxFactory } from "esri/widgets/support/widget";

interface IPagerProps {
    config: {
        [propName: string]: any
    };
    i18n: any;
    keyCode: string;
    pointHandler: (pointer: number) => void;
    pointer: number;
    perPage: number;
    total: number;
}

export default (props: IPagerProps) => {
    let state = {
        pointer: props.pointer
    };

    return {
        render() {

            const prevButtonClasses = {
                "btn": true,
                "btn-disabled": state.pointer <= 0,
                "btn-transparent": true
            };

            const nextButtonClasses = {
                "btn": true,
                "btn-arrow": true,
                "btn-disabled": props.total - state.pointer <= props.perPage,
                "btn-transparent": true
            };

            const pageButtons = Array.apply(null, Array(Math.ceil(props.total / props.perPage))).map((v, i) => {
                const isActive = state.pointer < ((i + 1) * props.perPage) && state.pointer >= (i * props.perPage);
                const buttonClasses = {
                    "btn": true,
                    "btn-transparent": !isActive
                };
                return {
                    render: () => (
                        <a
                            id={`page-${i + 1}`}
                            title={`page-${i + 1}`}
                            classes={buttonClasses}
                            onclick={handlePage}
                            role="link"
                            tabindex="0"
                            style={`
                                color: ${isActive ? props.config.buttonTextColor : props.config.buttonBgColor};
                                background-color: ${isActive ? props.config.buttonBgColor : null};
                                border: ${isActive ? `1px solid ${props.config.buttonBgColor}` : "none"};
                            `}
                            key={`page-button-${i + 1}-${props.keyCode}`}
                        >
                            {i + 1}
                        </a>
                    )
                };

            });

            if (pageButtons.length === 0) {
                return (
                        <h3 class="center-style">{props.i18n.pager.noResults}</h3>
                );
            } else if (pageButtons.length === 1) {
                return null;
            }

            return (
                <div class="text-center trailer-1 leader-1" key={`pager-${props.total}`}>
                    <a
                        id="previous"
                        title="previous"
                        classes={prevButtonClasses}
                        onclick={handlePrevious}
                        role="link"
                        tabindex="0"
                        style={`color:${props.config.buttonBgColor};`}
                        key={`previous-button-${props.keyCode}`}
                    >
                        Previous
                    </a>
                        {pageButtons.map((button) => button.render())}
                    <a
                        id="next"
                        title="next"
                        classes={nextButtonClasses}
                        onclick={handleNext}
                        role="link"
                        tabindex="0"
                        style={`color:${props.config.buttonBgColor};`}
                        key={`next-button-${props.keyCode}`}
                    >
                        Next
                    </a>
                </div>
            );
        }
    };

    function handlePrevious() {
        state = {
            ...state,
            pointer: state.pointer - props.perPage
        };
        props.pointHandler(state.pointer);
    }

    function handleNext() {
        state = {
            ...state,
            pointer: state.pointer + props.perPage
        };
        props.pointHandler(state.pointer);
    }

    function handlePage(e) {
        state = {
            ...state,
            pointer: (parseInt(e.target.text, 10) - 1) * props.perPage
        };
        props.pointHandler(state.pointer);
    }
};
