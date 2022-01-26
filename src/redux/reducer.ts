import { AnyAction, combineReducers } from 'redux';
import {
    AUTHENTICATE_USER,
    AUTHENTICATE_USER_DONE,
    GET_CHANNELS,
    GET_CHANNELS_DONE,
    GET_FILTERED_DOCUMENTS_COUNT,
    GET_FILTERED_DOCUMENTS_COUNT_DONE,
    GET_FOLDER_ITEMS,
    GET_FOLDER_ITEMS_DONE,
    GET_TOTAL_DOCUMENTS_COUNT,
    GET_TOTAL_DOCUMENTS_COUNT_DONE,
    GET_CUSTOM_THEME,
    GET_CUSTOM_THEME_DONE,
    GET_FOLDER_PATH,
    GET_FOLDER_PATH_DONE,
    GET_CUSTOM_FOOTER_DONE,
    GET_CUSTOM_FOOTER,
    GET_CONFIGURATION,
    GET_CONFIGURATION_DONE,
    GET_CHANNELS_COUNT,
    GET_CHANNELS_COUNT_DONE,
    GET_FILTERED_FAVORITES_COUNT,
    GET_TOTAL_FAVORITES_COUNT,
    GET_TOTAL_FAVORITES_COUNT_DONE,
    GET_FILTERED_FAVORITES_COUNT_DONE,
    GET_FAVORITES,
    GET_FAVORITES_DONE,
    MOVE_FAVORITE_DONE,
    MOVE_FAVORITE,
    GET_SEARCH_RESULTS,
    GET_SEARCH_RESULTS_DONE,
    CLEAR_SEARCH,
    CLEAR_SEARCH_RESULTS,
    UPDATE_SEARCH_FAVORITE,
    GET_SEARCH_CONTENT_OBJECTS,
    GET_SEARCH_CONTENT_OBJECTS_DONE,
    GET_FILTERED_FOLDER_ITEMS,
    GET_FILTERED_FOLDER_ITEMS_DONE,
    UPDATE_SEARCH_QUERYTEXT,
    UPDATE_SEARCH_FACETS_FILTER,
    UPDATE_SEARCH_CLASSIFICATIONS_FILTER,
    ADD_FOLDER_ITEM_TO_FAVORITES,
    DELETE_FOLDER_ITEM_FROM_FAVORITES,
    ADD_FOLDER_ITEM_TO_FAVORITES_DONE,
    DELETE_FOLDER_ITEM_FROM_FAVORITES_DONE,
    DELETE_FAVORITE,
    DELETE_FAVORITE_DONE,
    GET_CHANNEL_SEARCH_DATA,
    GET_CHANNEL_SEARCH_DATA_DONE,
    UPDATE_SEARCH_SORTBY,
    GET_CLASSIFICATIONS_ROOT_DONE,
    GET_CLASSIFICATIONS_CHILDREN_DONE,
    UPDATE_SEARCH_CLASSIFICATIONS_DONE,
    CHANGE_USER_PASSWORD,
    CHANGE_USER_LAST_NAME,
    CHANGE_USER_FIRST_NAME,
    GET_USER_DATA,
    GET_USER_DATA_DONE,
    CHANGE_USER_LAST_NAME_DONE,
    CHANGE_USER_FIRST_NAME_DONE,
    CHANGE_USER_PASSWORD_DONE,
} from './actions';

import {
    ISearchResultsData,
    ISearchResult,
    IChannelData,
    ISearchFacet,
    IClassifications,
    ISearchFacetsFilter,
    IClassificationsFilter,
    IClassificationNames,
    IClassificationTree,
    IClassificationItem,
} from '../utils/types';

const initialState = {
    loading: false,
    filterIsLoading: false,
    favoriteDocumentWasAdded: false, // indicates whether we need to reload documents grid to display or hide star marks
    favoriteDocumentWasDeleted: false, // indicates whether we need to reload documents grid to display or hide star marks
    userDataWasUpdated: false, // user data was updated and needs to be reloaded
    userData: null,
    favoriteWasMoved: false,
    folderItems: null,
    filteredFolderItems: null,
    channels: null,
    channelData: null as unknown as IChannelData,
    favorites: null,
    totalDocumentsCount: null,
    filteredDocumentsCount: null,
    authData: null,
    recentFavoriteData: null, // last object which was changed with favorites
    customThemeData: null,
    customFooterData: null,
    searchResultsData: null,
    searchResults: null,
    searchFacets: null as unknown as ISearchFacet[],
    searchQueryText: null as unknown as string,
    searchSortBy: null as unknown as string,
    searchFacetsFilter: null as unknown as ISearchFacetsFilter,
    searchClassifications: null as unknown as IClassifications,
    searchClassificationsFilter: null as unknown as IClassificationsFilter,
    searchResultsLoading: false,
    searchContentObjects: {} as { [key: string | number]: ISearchResult[] },
    classificationTree: null as unknown as IClassificationTree,
    folderPath: null,
    configurationData: null,
    channelsCount: null,
    totalFavoritesCount: null,
    filteredFavoritesCount: null,
};

type InitialStateType = typeof initialState;

const mainReducer = (state = initialState, action: AnyAction): InitialStateType => {
    switch (action.type) {
        default:
            return state;
    }
};

export function createReducer(): any {
    return combineReducers({
        data: mainReducer,
    });
}
