import {
    IAuthData,
    IChannelItems,
    ICustomTheme,
    IDocumentItem,
    IDocumentItems,
    IFavoriteItem,
    IFavoriteItems,
    IRecentLinkItems,
    IRootState,
    ICustomFooter,
    IConfigurationData,
    IDocumentPathData,
    ISearchResultsData,
    ISearchResult,
    ISearchFacet,
    ISearchFacetsFilter,
    IClassifications,
    IClassificationsFilter,
    SearchSortByEnum,
    IChannelData,
    IClassificationTree,
    IUserData,
} from '../utils/types';

/////////////////////////////////////////////////////////////

export const dataIsLoading = (state: IRootState): boolean => state.data.loading;
export const filterDataIsLoading = (state: IRootState): boolean => state.data.filterIsLoading;
export const userDataWasUpdated = (state: IRootState): boolean => state.data.userDataWasUpdated;

export const favoriteDocumentWasAdded = (state: IRootState): boolean => state.data.favoriteDocumentWasAdded;
export const favoriteDocumentWasDeleted = (state: IRootState): boolean => state.data.favoriteDocumentWasDeleted;
export const favoriteWasMoved = (state: IRootState): boolean => state.data.favoriteWasMoved;
export const getFavoritesData = (state: IRootState): IFavoriteItems => state.data.favorites;
export const getRecentFavoriteData = (state: IRootState): IFavoriteItem => state.data.recentFavoriteData;
export const getTotalFavoritesCountData = (state: IRootState): number | undefined => state.data.totalFavoritesCount;
export const getFilteredFavoritesCountData = (state: IRootState): number | undefined =>
    state.data.filteredFavoritesCount;

export const getAuthData = (state: IRootState): IAuthData => state.data.authData;
export const getUserData = (state: IRootState): IUserData => state.data.userData;

export const getChannelsData = (state: IRootState): IChannelItems => state.data.channels;
export const getChannelsCountData = (state: IRootState): number | undefined => state.data.channelsCount;
export const selectChannelData = (state: IRootState): IChannelData => state.data.channelData;

export const getDocumentsData = (state: IRootState): IDocumentItems => state.data.documents;
export const getTotalDocumentsCountData = (state: IRootState): number | undefined => state.data.totalDocumentsCount;
export const getFilteredDocumentsCountData = (state: IRootState): number | undefined =>
    state.data.filteredDocumentsCount;
export const getFolderItemsData = (state: IRootState): IDocumentItems => state.data.folderItems;
export const getFilteredFolderItemsData = (state: IRootState): IDocumentItems => state.data.filteredFolderItems;
export const getFolderPathData = (state: IRootState): IDocumentPathData => state.data.folderPath;

export const getRecentLinksData = (state: IRootState): IRecentLinkItems => state.data.recentLinks;

export const getCustomThemeData = (state: IRootState): ICustomTheme => state.data.customThemeData;

export const getCustomFooterData = (state: IRootState): ICustomFooter => state.data.customFooterData;

export const getConfigurationData = (state: IRootState): IConfigurationData => state.data.configurationData;

export const selectSearchResultsData = (state: IRootState): ISearchResultsData => state.data.searchResultsData;
export const selectSearchResultsLoading = (state: IRootState): boolean => state.data.searchResultsLoading;
export const selectSearchResults = (state: IRootState): ISearchResult[] => state.data.searchResults;
export const selectSearchFacets = (state: IRootState): ISearchFacet[] => state.data.searchFacets;
export const selectSearchQueryText = (state: IRootState): string => state.data.searchQueryText;
export const selectSearchSortBy = (state: IRootState): SearchSortByEnum => state.data.searchSortBy;
export const selectSearchFacetsFilter = (state: IRootState): ISearchFacetsFilter => state.data.searchFacetsFilter;
export const selectSearchClassifications = (state: IRootState): IClassifications => state.data.searchClassifications;
export const selectSearchClassificationsFilter = (state: IRootState): IClassificationsFilter =>
    state.data.searchClassificationsFilter;
export const selectSearchContentObjects = (state: IRootState, documentId: string | number): ISearchResult[] =>
    state.data.searchContentObjects[documentId];
export const selectClassificationTree = (state: IRootState): IClassificationTree => state.data.classificationTree;

/////////////////////////////////////////////////////////////

export const combinedDocumentId = (documentItem: IDocumentItem): string => {
    return `${documentItem.id}|${documentItem.name}`; // in case of class="JobDetails" -> id=undefined
};

export const getDocumentItemById = (
    documents: IDocumentItems,
    combinedId: string | number
): IDocumentItem | undefined => {
    return documents.find((d) => {
        return combinedId === combinedDocumentId(d);
    });
};

export const getFavoriteItemById = (favorites: IFavoriteItems, id: string | number): IFavoriteItem | undefined => {
    return favorites.find((f) => {
        return id === f.id;
    });
};
