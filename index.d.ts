declare namespace __esriApplicationBase {
    interface ApplicationBaseItemPromises {
        webMap?: IPromise<any>;
        webScene?: IPromise<any>;
        groupInfo?: IPromise<any>;
        groupItems?: IPromise<any>;
    }
    
    interface ApplicationConfigs {
        application?: ApplicationConfig;
        config: ApplicationConfig;
        local?: ApplicationConfig;
        url?: ApplicationConfig;
    }
    
    interface ApplicationConfig {
        appid?: string;
        center?: string;
        components?: string;
        embed?: boolean;
        extent?: string;
        find?: string;
        group?: string | string[];
        helperServices?: any;
        level?: string;
        marker?: string;
        oauthappid?: string;
        portalUrl?: string;
        proxyUrl?: string;
        title?: string;
        viewpoint?: string;
        webmap?: string | string[];
        webscene?: string | string[];
        [propName: string]: any;
    }
    
    interface ApplicationBaseSettings {
        environment: {
            isEsri?: boolean;
            webTierSecurity?: boolean;
        };
        localStorage?: {
            fetch?: boolean;
        };
        group?: {
            default?: string;
            itemParams?: __esri.PortalQueryParams;
            fetchItems?: boolean;
            fetchInfo?: boolean;
            fetchMultiple?: boolean;
        };
        portal?: {
            fetch?: boolean;
        };
        rightToLeftLocales?: string[];
        urlParams?: string[];
        webMap?: {
            default?: string;
            fetch?: boolean;
            fetchMultiple?: boolean;
        };
        webScene?: {
            default?: string;
            fetch?: boolean;
            fetchMultiple?: boolean;
        }
    }
    
    interface ApplicationBaseResult {
        error?: Error;
        value: any;
        promise: IPromise<any>;
    }
    
    interface ApplicationBasePortalItemResult extends ApplicationBaseResult {
        value: __esri.PortalItem;
        promise: IPromise<__esri.PortalItem>;
    }
    
    interface ApplicationBasePortalQueryResult extends ApplicationBaseResult {
        value: __esri.PortalQueryResult;
        promise: IPromise<__esri.PortalQueryResult>;
    }
    
    interface ApplicationBaseResults {
        applicationItem?: ApplicationBasePortalItemResult;
        applicationData?: ApplicationBaseResult;
        groupInfos?: ApplicationBasePortalQueryResult;
        groupItems?: ApplicationBasePortalQueryResult;
        localStorage?: ApplicationConfig;
        portal?: __esri.Portal;
        urlParams?: ApplicationConfig;
        webMapItems?: ApplicationBasePortalItemResult[];
        webSceneItems?: ApplicationBasePortalItemResult[];
    }
    
    interface ApplicationProxy {
        sourceUrl: string,
        proxyUrl: string,
        proxyId: string
    }
    
    interface ApplicationBaseConstructorOptions {
        config: ApplicationConfig | string;
        settings: ApplicationBaseSettings | string;
    }
    
    interface CreateMapFromItemOptions {
        item: __esri.PortalItem;
        appProxies?: ApplicationProxy[];
    }

    class ApplicationBase {
        constructor(options: ApplicationBaseConstructorOptions);
        settings: ApplicationBaseSettings;
        config: ApplicationConfig;
        results: ApplicationBaseResults;
        portal: __esri.Portal;
        direction: "ltr" | "rtl";
        locale: string;
        units: string;
        queryGroupItems(groupId: string, itemParams: __esri.PortalQueryParams, portal?: __esri.Portal): IPromise<any>;
        load(): IPromise<ApplicationBase>;
        private _mixinSettingsDefaults(settings);
        private _limitItemSize(items, allowMultiple);
        private _getPropertyArray(property);
        private _getEsriEnvironmentPortalUrl();
        private _getEsriEnvironmentProxyUrl(portalUrl);
        private _getUnits(portal);
        private _queryGroupInfo(groupId, portal);
        private _loadItem(id);
        private _getLocalConfig(appid);
        private _overwriteItemsExtent(responses, applicationItem);
        private _overwriteItemExtent(item, applicationItem);
        private _getDefaultId(id, defaultId);
        private _getLanguageDirection(rtlLocales?);
        private _mixinAllConfigs(params);
        private _setUpCORS(authorizedDomains, webTierSecurity);
        private _setGeometryService(config, portal);
        private _setPortalUrl(portalUrl);
        private _setProxyUrl(proxyUrl);
        private _registerOauthInfos(oauthappid, portalUrl);
        private _getUrlParamValues(urlParams);
        private _urlToObject();
        private _formatUrlParamValue(urlParamValue);
        private _stripStringTags(value);
    }

    interface ApplicationBaseConstructor {
        new(options: ApplicationBaseConstructorOptions): ApplicationBase;
    }

    export const ApplicationBaseConstructor: ApplicationBaseConstructor;
}

declare module "esriApplicationBase/ApplicationBase" {
    import ApplicationBase = __esriApplicationBase.ApplicationBaseConstructor;
    export = ApplicationBase;
}