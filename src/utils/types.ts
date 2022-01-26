import { IGetChannelsCountProps, IGetChannelsProps } from '../redux/actions';

export interface IAuthData {
    value: string;
    name: string;
}

export interface IConfigurationData {
    authCookieName: string;
    authCookieDomain: string;
    directCoreBaseUrl: string;
    coreBaseUrl: string;
    lrsStatementsUrl: string;
    lrsAgentsUrl: string;
    webPortalUrl: string;
    localAccounts: boolean;
    restPattern: string;
    rootFolderName: string;
    rootGroupName: string;
    releaseNotesUrl: string;
    maxUploadFileSize: number;
    maxSyncUploadFileSize: number;
    logoutPath: string;
    appVersion: string;
    ui: string;
    uiPath: string;
    enableThinPackageIframe: string;
    logRocketChannel: string;
    dictionary: string;
    lrsPath: string;
    sessionData?: IConfigurationSessionData | null;
}

export interface IConfigurationSessionData {
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    username: string;
    userId: number;
    tenantId: number;
}

///////////////////////////////////////////////////////////////

export interface IDocumentItem {
    id: number;
    resourceType: string;
    class: string;
    name: string;
    path: string;
    format?: string;
    dateUpdated: string;
    dateCreated: string;
    isFavorite?: boolean;
    latestVersion?: IDocumentLatestVersion | null;
    description: string;
    accessLevel: number;
    spaceId: number;
    folderId: number;
    guid: string;
    numberOfDocuments: number;
    parentId: number;
    numberOfSubfolders: number;
    nesting: number;
    whitelistExempt: boolean;
    numberOfSharedLinks: number;
    service: string;
}

export interface IDocumentItems extends Array<IDocumentItem> {}

export interface IDocumentLatestVersion {
    dateCreated: string;
    languages: string;
    id: number;
    previewId: number;
    name: string;
    fileId: number;
    class: string;
    resourceType: string;
    guid: string;
    format: string;
}

export interface IDocumentPath {
    id: number;
    class: string;
    name: string;
    path: string;
    dateUpdated: string;
    dateCreated: string;
    isFavorite?: boolean;
    description: string;
    accessLevel: number;
    numberOfDocuments: number;
    parentId: number;
    numberOfSubfolders: number;
    nesting: number;
    whitelistExempt: boolean;
}

export interface IDocumentPaths extends Array<IDocumentPath> {}

export interface IDocumentPathData {
    documentId: string;
    paths: IDocumentPaths;
}

///////////////////////////////////////////////////////////////

export interface IRecentLinkItem {
    id: number;
    documentResource: string;
    class: string;
    documentName: string;
    documentFormat: string;
    documentUpdated: string;
    documentCreated: string;
}

export interface IRecentLinkItems extends Array<IRecentLinkItem> {}

///////////////////////////////////////////////////////////////

export interface IFavoriteItem {
    id: number;
    index: number;
    itemId: number;
    itemStatus: string;
    itemName: string;
    itemClass: string;
    itemUpdated: string;
    itemCreated: string;
    itemFormat: string;
    itemResource: string;
}

export interface IFavoriteItems extends Array<IFavoriteItem> {}

///////////////////////////////////////////////////////////////

export interface IChannelItem {
    id: number;
    description: string;
    name: string;
    pictureId: number;
}

export interface IChannelItems extends Array<IChannelItem> {}

export interface IChannelsProps {
    channels: IChannelItems;
    channelsCount: number | undefined;
    authData: IAuthData;
    configurationData: IConfigurationData;
    getChannels: (data: IGetChannelsProps) => void;
    getChannelsCount: (data: IGetChannelsCountProps) => void;
    loading: boolean;
}

export interface IChannelsState {
    channelsCount: number | undefined;
    channels: IChannelItems;
    authData: IAuthData;
    configurationData: IConfigurationData;
    loading: boolean;
}

export interface IChannelsDispatch {
    getChannels: (data: IGetChannelsProps) => void;
    getChannelsCount: (data: IGetChannelsCountProps) => void;
}

export interface IChannelData {
    accessLevel: number;
    class: string;
    dateCreated: string;
    dateUpdated: string;
    description: string;
    displayOrder: number;
    facetFilters: string;
    id: number;
    isDisplayed: boolean;
    name: string;
    query: string;
    sortBy: string;
}

///////////////////////////////////////////////////////////////
// state interfaces
///////////////////////////////////////////////////////////////

export interface IDataState {
    authData: IAuthData;
    userData: IUserData;
    channels: IChannelItems;
    channelData: IChannelData;
    favorites: IFavoriteItems;
    documents: IDocumentItems;
    totalDocumentsCount?: number;
    filteredDocumentsCount?: number;
    recentLinks: IRecentLinkItems;
    folderItems: IDocumentItems; // items on Documents page
    filteredFolderItems: IDocumentItems; // items in Favorites filter
    loading: boolean;
    filterIsLoading: boolean;
    favoriteDocumentWasAdded: boolean;
    favoriteDocumentWasDeleted: boolean;
    favoriteWasMoved: boolean;
    userDataWasUpdated: boolean;
    recentFavoriteData: IFavoriteItem;
    customThemeData: ICustomTheme;
    customFooterData: ICustomFooter;
    folderPath: IDocumentPathData;
    configurationData: IConfigurationData;
    channelsCount?: number;
    totalFavoritesCount?: number;
    filteredFavoritesCount?: number;
    searchResultsData: ISearchResultsData;
    searchResults: ISearchResult[];
    searchResultsLoading: boolean;
    searchContentObjects: { [key: string | number]: ISearchResult[] };
    searchFacets: ISearchFacet[];
    searchQueryText: string;
    searchSortBy: SearchSortByEnum;
    searchFacetsFilter: ISearchFacetsFilter;
    searchClassifications: IClassifications;
    searchClassificationsFilter: IClassificationsFilter;
    classificationTree: IClassificationTree;
}

export interface IRootState {
    data: IDataState;
}

///////////////////////////////////////////////////////////////
// app interfaces
///////////////////////////////////////////////////////////////

export interface IAuthCookie {
    name?: string;
    value?: string;
}

export interface ITenantData {
    userId: number;
    class: string;
    updatedTime: number;
    status: string;
    id: number;
    locked: boolean;
    username: string;
}

export interface IUserData {
    id: number;
    dateUpdated: string;
    dateCreated: string;
    firstName: string;
    locked: boolean;
    active: boolean;
    class: string;
    status: string;
    lastName: string;
    email: string;
    lastLogin: string;
}

export interface IAppProps {
    authData: IAuthData;
    customThemeData: ICustomTheme;
    doAuthenticate: (authCookie: IAuthCookie) => void;
    doGetCustomTheme: (configurationData: IConfigurationData) => void;
    doGetConfiguration: () => void;
    configurationData: IConfigurationData;
}

export interface IAppDispatch {
    doAuthenticate: (authCookie: IAuthCookie) => void;
    doGetConfiguration: () => void;
    doGetCustomTheme: (configurationData: IConfigurationData) => void;
}

export interface IAppState {
    authData: IAuthData;
    customThemeData: ICustomTheme;
    configurationData: IConfigurationData;
}

///////////////////////////////////////////////////////////////
// theme interfaces
///////////////////////////////////////////////////////////////

export interface ICustomButtonProps {
    backgroundBottomColor?: string;
    backgroundTopColor?: string;
    backgroundColor?: string;
    borderColor: string;
    textColor: string;
    textShadowColor?: string;
}

export interface ICustomUIElementProps {
    defaultColor: string;
    activeColor: string;
    hoverColor: string;
    textColor: string;
}

export interface ICustomTheme {
    header?: {
        topColor: string;
        bottomColor: string;
        text: {
            defaultColor: string;
            hoverColor: string;
        };
    };
    navMenu?: ICustomUIElementProps;
    tab?: ICustomUIElementProps;
    link?: ICustomUIElementProps;
    defaultButton?: ICustomButtonProps;
    primaryButton?: ICustomButtonProps;
    warningButton?: ICustomButtonProps;
    cancelButton?: ICustomButtonProps;
    searchButton?: ICustomButtonProps;
    table?: {
        row: ICustomUIElementProps;
    };
    h1?: {
        color: string;
        fontFamily: string;
        fontSize: string;
    };
    h2?: {
        color: string;
        fontFamily: string;
        fontSize: string;
    };
    customStyles?: string;
}

export interface ICustomFooter {
    [key: string]: {
        footerContent?: string;
        termsOfUse?: string;
    };
}

///////////////////////////////////////////////////////////////
// Search interfaces
///////////////////////////////////////////////////////////////

export enum SearchSortByEnum {
    SCORE = 'SCORE',
    TITLE_ASC = 'TITLE_ASC',
    TITLE_DESC = 'TITLE_DESC',
    RECENT_FIRST = 'RECENT_FIRST',
    OLDEST_FIRST = 'OLDEST_FIRST',
}

export interface ISearchFacetValue {
    class: string;
    count: number;
    name: string;
    isActive?: boolean;
}

export interface ISearchFacet {
    class: string;
    name: string;
    values: ISearchFacetValue[];
}

export interface ISearchFacetsFilter {
    [key: string]: string;
}

export interface ISearchResult {
    class: string;
    contentGuid: string;
    dateUpdated: string;
    description: string;
    document: IDocumentItem;
    documentGuid: string;
    documentId: number;
    documentVersionId: number;
    fileId: number;
    format: string;
    id: string;
    isFavorite: boolean;
    languages: string;
    name: string;
    numberOfIndexedCoobs: number;
    numberOfSharedLinks: number;
    packageType: string;
    previewId: number;
    resourceType: string;
    score: number;
    snippets: { [key: string]: string[] };
    updatedById: number;
    updatedByName: string;
    versionName: string;
}

export interface ISearchResultsData {
    class: string;
    facets: ISearchFacet[];
    numberFound: number;
    results: ISearchResult[];
}

export interface ISearchQuery {
    query: string;
    facetFilters?: string;
    classifications?: string;
    start?: number;
    limit?: number;
    sortBy?: string;
    documentId?: string | number;
    [key: string]: any;
}

///////////////////////////////////////////////////////////////
// Classification interfaces
///////////////////////////////////////////////////////////////

export interface IClassificationBase {
    id: number;
    name: string;
    path: string;
    taxonCode: string;
    taxonType: string;
}

/**
 * Item returned by endpoint [/classifications/:clid/children] and [/channels/:channelid/classifications]
 */
export interface IClassificationItem extends IClassificationBase {
    id: number;
    name: string;
    path: string;
    taxonCode: string;
    taxonType: string;

    hasChildren: boolean;
    parentId?: number;
    dateCreated?: string;
    dateUpdated?: string;
    guid?: string;
    class: string;

    customSelected?: boolean;
    customFullName?: string;
}

/**
 * Item returned by endpoint [/classifications/getNames]
 */
export interface IClassificationName extends IClassificationBase {
    id: number;
    name: string;
    path: string;
    taxonCode: string;
    taxonType: string;

    children: { [key: string]: IClassificationName };
    parentPath: string;
}

/**
 * Item returned by endpoint [/classifications/roots/full]
 */
export interface IClassificationTreeItem extends IClassificationBase {
    id: number;
    name: string;
    path: string;
    taxonCode: string;
    taxonType: string;

    children: IClassificationTreeItem[];
    hasChildren: boolean;
    parentId?: number;
    class: string;
}

export interface IClassifications extends Array<IClassificationItem> {}
export interface IClassificationsFilter extends Array<number> {}
export interface IClassificationNames extends Array<IClassificationName> {}
export interface IClassificationTree extends Array<IClassificationTreeItem> {}
