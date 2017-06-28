import { tsx } from "esri/widgets/support/widget";

interface IHeaderProps {
    config: {
        [propName: string]: any;
    }
    i18n: any;
    onSearch: (e: any) => void;
}

export default (props: IHeaderProps) => {
    const headSearch = props.config.headerSearch ? (
        <nav class="class-top-nav-list right" role="navigation" title="usernav">
            <form class="inline-block padding-leader-half" role="search" onsubmit={props.onSearch}>
                <input
                    title={props.config.searchPlaceholder}
                    type="search"
                    placeholder={props.config.searchPlaceholder}
                    name="q" style="margin-top: -1px;"
                    oninput={handleSearchChange}
                />
                <button type="submit" class="hide">{props.config.searchPlaceholder}</button>
            </form>
        </nav>
    ) : null;
    const headImage = props.config.headerImage ? (
        <img src={props.config.headerImageLocation} class="header-image" alt={props.config.headerText} />
    ) : null;
    return {
        render() {
            return (
                <header class="top-nav fade-in" style={`background-color: ${props.config.headColor}`}>
                    <div class="grid-container">
                        <div class="column-24">
                            <div class="tablet-hide">
                                <a href={props.config.headerTextURL}>
                                    {headImage}
                                    <a class="top-nav-title" style={`color: ${props.config.headerTextColor}`}>
                                        {props.config.headerText}
                                    </a>
                                </a>
                                <nav class="top-nav-list" role="navigation" title="topnav">
                                    <a
                                        class="top-nav-link"
                                        href={props.config.agolLinkLocation.replace("${GROUP_ID}", props.config.group)}
                                        style={`color: ${props.config.headerTextColor}`}
                                    >
                                        {props.config.agolLinkText}
                                    </a>
                                </nav>
                                {headSearch}
                            </div>

                            <div class="tablet-show top-nav-flex">
                                <header class="top-nav-flex-title">
                                    <a href={props.config.headerTextURL}>
                                        <a class="top-nav-title" style={`color: ${props.config.headerTextColor}`}>
                                            {props.config.headerText}
                                        </a>
                                    </a>
                                </header>
                                {headSearch}
                            </div>
                        </div>

                    </div>
                </header>
            );
        }
    };

    function handleSearchChange(e) {
        if (e.target.value === "") {
            props.onSearch({
                preventDefault: () => null,
                target: {
                    childNodes: [{ value: e.target.value }]
                }
            });
        }
    }
};
