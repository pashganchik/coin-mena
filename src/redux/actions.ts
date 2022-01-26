import { Action, AnyAction } from 'redux';
import {
    IAuthCookie,
    IAuthData,
    IConfigurationData,
    ISearchQuery,
    ISearchFacetsFilter,
    IClassificationsFilter,
    IClassifications,
} from '../utils/types';

export const GET_DOCUMENTS = 'GET_DOCUMENTS';
export const GET_FILTERED_DOCUMENTS_COUNT = 'GET_FILTERED_DOCUMENTS_COUNT';
export const GET_TOTAL_DOCUMENTS_COUNT = 'GET_TOTAL_DOCUMENTS_COUNT';
export const GET_CHANNELS = 'GET_CHANNELS';
export const GET_FAVORITES = 'GET_FAVORITES';
export const GET_RECENT_LINKS = 'GET_RECENT_LINKS';
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const GET_FOLDER_ITEMS = 'GET_FOLDER_ITEMS'; // used on Documents page to fetch contents for the grid
export const GET_FOLDER_PATH = 'GET_FOLDER_PATH';
export const ADD_FOLDER_ITEM_TO_FAVORITES = 'ADD_FOLDER_ITEM_TO_FAVORITES';
export const DELETE_FOLDER_ITEM_FROM_FAVORITES = 'DELETE_FOLDER_ITEM_FROM_FAVORITES';

export const GET_DOCUMENTS_DONE = 'GET_DOCUMENTS_DONE';
export const GET_FOLDER_PATH_DONE = 'GET_FOLDER_PATH_DONE';
export const GET_FILTERED_DOCUMENTS_COUNT_DONE = 'GET_FILTERED_DOCUMENTS_COUNT_DONE';
export const GET_TOTAL_DOCUMENTS_COUNT_DONE = 'GET_TOTAL_DOCUMENTS_COUNT_DONE';
export const GET_RECENT_LINKS_DONE = 'GET_RECENT_LINKS_DONE';
export const GET_FAVORITES_DONE = 'GET_FAVORITES_DONE';
export const GET_CHANNELS_DONE = 'GET_CHANNELS_DONE';
export const AUTHENTICATE_USER_DONE = 'AUTHENTICATE_USER_DONE';
export const GET_FOLDER_ITEMS_DONE = 'GET_FOLDER_ITEMS_DONE';
export const ADD_FOLDER_ITEM_TO_FAVORITES_DONE = 'ADD_FOLDER_ITEM_TO_FAVORITES_DONE';
export const DELETE_FOLDER_ITEM_FROM_FAVORITES_DONE = 'DELETE_FOLDER_ITEM_FROM_FAVORITES_DONE';

export const GET_FILTERED_FAVORITES_COUNT = 'GET_FILTERED_FAVORITES_COUNT';
export const GET_TOTAL_FAVORITES_COUNT = 'GET_TOTAL_FAVORITES_COUNT';
export const GET_FILTERED_FAVORITES_COUNT_DONE = 'GET_FILTERED_FAVORITES_COUNT_DONE';
export const GET_TOTAL_FAVORITES_COUNT_DONE = 'GET_TOTAL_FAVORITES_COUNT_DONE';

export const GET_CUSTOM_THEME = 'GET_CUSTOM_THEME';
export const GET_CUSTOM_THEME_DONE = 'GET_CUSTOM_THEME_DONE';
export const GET_CUSTOM_FOOTER = 'GET_CUSTOM_FOOTER';
export const GET_CUSTOM_FOOTER_DONE = 'GET_CUSTOM_FOOTER_DONE';

export const GET_CONFIGURATION = 'GET_CONFIGURATION';
export const GET_CONFIGURATION_DONE = 'GET_CONFIGURATION_DONE';

export const GET_CHANNELS_COUNT = 'GET_CHANNELS_COUNT';
export const GET_CHANNELS_COUNT_DONE = 'GET_CHANNELS_COUNT_DONE';

export const MOVE_FAVORITE = 'MOVE_FAVORITE';
export const MOVE_FAVORITE_DONE = 'MOVE_FAVORITE_DONE';

export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const DELETE_FAVORITE_DONE = 'DELETE_FAVORITE_DONE';

export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const GET_SEARCH_RESULTS_DONE = 'GET_SEARCH_RESULTS_DONE';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const UPDATE_SEARCH_FAVORITE = 'UPDATE_SEARCH_FAVORITE';
export const GET_SEARCH_CONTENT_OBJECTS = 'GET_SEARCH_CONTENT_OBJECTS';
export const GET_SEARCH_CONTENT_OBJECTS_DONE = 'GET_SEARCH_CONTENT_OBJECTS_DONE';
export const UPDATE_SEARCH_QUERYTEXT = 'UPDATE_SEARCH_QUERYTEXT';
export const UPDATE_SEARCH_SORTBY = 'UPDATE_SEARCH_SORTBY';
export const UPDATE_SEARCH_FACETS_FILTER = 'UPDATE_SEARCH_FACETS_FILTER';
export const UPDATE_SEARCH_CLASSIFICATIONS = 'UPDATE_SEARCH_CLASSIFICATIONS';
export const UPDATE_SEARCH_CLASSIFICATIONS_DONE = 'UPDATE_SEARCH_CLASSIFICATIONS_DONE';
export const UPDATE_SEARCH_CLASSIFICATIONS_FILTER = 'UPDATE_SEARCH_CLASSIFICATIONS_FILTER';
export const GET_CHANNEL_SEARCH_DATA = 'GET_CHANNEL_SEARCH_DATA';
export const GET_CHANNEL_SEARCH_DATA_DONE = 'GET_CHANNEL_SEARCH_DATA_DONE';

export const GET_CLASSIFICATIONS_ROOT = 'GET_CLASSIFICATIONS_ROOT';
export const GET_CLASSIFICATIONS_ROOT_DONE = 'GET_CLASSIFICATIONS_ROOT_DONE';
export const GET_CLASSIFICATIONS_CHILDREN = 'GET_CLASSIFICATIONS_CHILDREN';
export const GET_CLASSIFICATIONS_CHILDREN_DONE = 'GET_CLASSIFICATIONS_CHILDREN_DONE';

export const GET_FILTERED_FOLDER_ITEMS = 'GET_FILTERED_FOLDER_ITEMS';
export const GET_FILTERED_FOLDER_ITEMS_DONE = 'GET_FILTERED_FOLDER_ITEMS_DONE';

export const CHANGE_USER_PASSWORD = 'CHANGE_USER_PASSWORD';
export const CHANGE_USER_PASSWORD_DONE = 'CHANGE_USER_PASSWORD_DONE';
export const CHANGE_USER_LAST_NAME = 'CHANGE_USER_LAST_NAME';
export const CHANGE_USER_LAST_NAME_DONE = 'CHANGE_USER_LAST_NAME_DONE';
export const CHANGE_USER_FIRST_NAME = 'CHANGE_USER_FIRST_NAME';
export const CHANGE_USER_FIRST_NAME_DONE = 'CHANGE_USER_FIRST_NAME_DONE';
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_DATA_DONE = 'GET_USER_DATA_DONE';

//////////////////////////////////////////////////////////////////////
// interfaces
//////////////////////////////////////////////////////////////////////

export interface ICustomAction<T> extends Action<string> {
    type: string;
    data: T;
}

export interface IDoAuthenticate {
    type: string;
    data: IDoAuthenticateProps;
}

export interface IDoAuthenticateProps {
    authCookie: IAuthCookie;
}

export interface IDoChangeUserPasswordProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    currentPassword: string;
    newPassword: string;
    invalidate: boolean;
    userName: string;
    tenantId: string;
}

export interface IDoChangeUserPassword {
    type: string;
    data: IDoChangeUserPasswordProps;
}

export interface IDoChangeUserFirstNameProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    firstName: string;
    userId: string;
}

export interface IDoChangeUserFirstName {
    type: string;
    data: IDoChangeUserFirstNameProps;
}

export interface IDoChangeUserLastNameProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    lastName: string;
    userId: string;
}

export interface IDoChangeUserLastName {
    type: string;
    data: IDoChangeUserLastNameProps;
}

export interface IGetUserProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    userId: string;
}

export interface IGetUser {
    type: string;
    data: IGetUserProps;
}

//////////////////////////////////////////////////////////////////////

export interface IGetFavoritesProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    maxRows: number;
    offset: number;
    filterText?: string;
}

export interface IGetFavoritesCountProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    filterText?: string;
}

export interface IAddFolderItemToFavoritesProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    list: string;
    id: number | string;
}

export interface IDeleteFolderItemFromFavoritesProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    id: number | string;
}

export interface IMoveFavoriteProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    id: number | string;
    delta: number;
}

export interface IDeleteFavoriteProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    id: number | string;
}

export interface IGetFavorites {
    type: string;
    data: IGetFavoritesProps;
}

export interface IGetFavoritesCount {
    type: string;
    data: IGetFavoritesCountProps;
}

export interface IAddFolderItemToFavorites {
    type: string;
    data: IAddFolderItemToFavoritesProps;
}

export interface IDeleteFolderItemFromFavorites {
    type: string;
    data: IDeleteFolderItemFromFavoritesProps;
}

export interface IMoveFavorite {
    type: string;
    data: IMoveFavoriteProps;
}

export interface IDeleteFavorite {
    type: string;
    data: IDeleteFavoriteProps;
}

//////////////////////////////////////////////////////////////////////

export interface IGetRecentLinksProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    maxRows: number;
}

export interface IGetRecentLinks {
    type: string;
    data: IGetRecentLinksProps;
}

//////////////////////////////////////////////////////////////////////

export interface IGetDocumentsProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    maxRows: number;
}

export interface IGetDocumentsCountProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    documentId: string | undefined;
    filterText?: string;
}

export interface IGetDocuments {
    type: string;
    data: IGetDocumentsProps;
}

export interface IGetDocumentsCount {
    type: string;
    data: IGetDocumentsCountProps;
}

export interface IGetFolderItemsProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    maxRows: number;
    offset: number;
    filterText?: string;
    orderBy?: string;
    orderDirection?: string | null;
    documentId: string | undefined;
}

export interface IGetFolderItems {
    type: string;
    data: IGetFolderItemsProps;
}

export interface IGetFolderPathProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    documentId: string | undefined;
}

export interface IGetFolderPath {
    type: string;
    data: IGetFolderPathProps;
}

export interface IGetFilteredFolderItemsProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    maxRows: number;
    filterText?: string;
}

export interface IGetFilteredFolderItems {
    type: string;
    data: IGetFilteredFolderItemsProps;
}

//////////////////////////////////////////////////////////////////////

export interface IGetChannelsProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    maxRows: number;
    offset: number;
}

export interface IGetChannels {
    type: string;
    data: IGetChannelsProps;
}

export interface IGetChannelsCountProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
}

export interface IGetChannelsCount {
    type: string;
    data: IGetChannelsCountProps;
}

//////////////////////////////////////////////////////////////////////

export interface IGetChannelsProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    maxRows: number;
    offset: number;
}

export interface IGetChannels {
    type: string;
    data: IGetChannelsProps;
}

//////////////////////////////////////////////////////////////////////

export interface IGetCustomThemeProps {
    configurationData: IConfigurationData;
}

export interface IGetCustomFooterProps {
    configurationData: IConfigurationData;
}

export interface IGetSearchResultsProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    searchQuery: ISearchQuery;
    appendResults?: boolean;
}

export interface IGetSearchContentObjectsProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    searchQuery: ISearchQuery;
    documentId: string | number;
}

export interface IGetChannelSearchDataProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    channelId: string;
}

export interface IGetClassificationsRootProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    checkedItems: number[];
}

export interface IGetClassificationsChildrenProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    classificationId: number;
}

export interface IUpdateSearchFavoriteProps {
    documentId: string | number;
    isFavoriteAdded: boolean;
}

export interface IUpdateSearchQueryTextProps {
    queryText: string;
}

export interface IUpdateSearchSortByProps {
    sortBy: string;
}

export interface IUpdateSearchFacetsFilterProps {
    searchFacetsFilter: ISearchFacetsFilter;
}

export interface IUpdateSearchClassificationsFilterProps {
    searchClassificationsFilter: IClassificationsFilter;
}

export interface IUpdateSearchClassificationsProps {
    authData: IAuthData;
    configurationData: IConfigurationData;
    searchClassifications: IClassifications;
}

//////////////////////////////////////////////////////////////////////
// actions
//////////////////////////////////////////////////////////////////////

export function doAuthenticate(data: IDoAuthenticateProps): IDoAuthenticate {
    return { type: AUTHENTICATE_USER, data };
}

export function doChangeUserPassword(data: IDoChangeUserPasswordProps): IDoChangeUserPassword {
    return { type: CHANGE_USER_PASSWORD, data };
}

export function doChangeUserFirstName(data: IDoChangeUserFirstNameProps): IDoChangeUserFirstName {
    return { type: CHANGE_USER_FIRST_NAME, data };
}

export function doChangeUserLastName(data: IDoChangeUserLastNameProps): IDoChangeUserLastName {
    return { type: CHANGE_USER_LAST_NAME, data };
}

export function getUser(data: IGetUserProps): IGetUser {
    return { type: GET_USER_DATA, data };
}

export function getConfiguration(): AnyAction {
    return { type: GET_CONFIGURATION };
}

//////////////////////////////////////////////////////////////////////

export function getDocuments(data: IGetDocumentsProps): IGetDocuments {
    return { type: GET_DOCUMENTS, data };
}

export function getTotalDocumentsCount(data: IGetDocumentsCountProps): IGetDocumentsCount {
    return { type: GET_TOTAL_DOCUMENTS_COUNT, data };
}

export function getFilteredDocumentsCount(data: IGetDocumentsCountProps): IGetDocumentsCount {
    return { type: GET_FILTERED_DOCUMENTS_COUNT, data };
}

export function getFolderItems(data: IGetFolderItemsProps): IGetFolderItems {
    return { type: GET_FOLDER_ITEMS, data };
}

export function getFilteredFolderItems(data: IGetFilteredFolderItemsProps): IGetFilteredFolderItems {
    return { type: GET_FILTERED_FOLDER_ITEMS, data };
}

export function getFolderPath(data: IGetFolderPathProps): IGetFolderPath {
    return { type: GET_FOLDER_PATH, data };
}

//////////////////////////////////////////////////////////////////////

export function getChannels(data: IGetChannelsProps): IGetChannels {
    return { type: GET_CHANNELS, data };
}

export function getChannelsCount(data: IGetChannelsCountProps): IGetChannelsCount {
    return { type: GET_CHANNELS_COUNT, data };
}

//////////////////////////////////////////////////////////////////////

export function getFavorites(data: IGetFavoritesProps): IGetFavorites {
    return { type: GET_FAVORITES, data };
}

export function getTotalFavoritesCount(data: IGetFavoritesCountProps): IGetFavoritesCount {
    return { type: GET_TOTAL_FAVORITES_COUNT, data };
}

export function getFilteredFavoritesCount(data: IGetFavoritesCountProps): IGetFavoritesCount {
    return { type: GET_FILTERED_FAVORITES_COUNT, data };
}

export function addFolderItemToFavorites(data: IAddFolderItemToFavoritesProps): IAddFolderItemToFavorites {
    return { type: ADD_FOLDER_ITEM_TO_FAVORITES, data };
}

export function deleteFolderItemFromFavorites(
    data: IDeleteFolderItemFromFavoritesProps
): IDeleteFolderItemFromFavorites {
    return { type: DELETE_FOLDER_ITEM_FROM_FAVORITES, data };
}

export function moveFavorite(data: IMoveFavoriteProps): IMoveFavorite {
    return { type: MOVE_FAVORITE, data };
}

export function deleteFavorite(data: IDeleteFavoriteProps): IDeleteFavorite {
    return { type: DELETE_FAVORITE, data };
}

//////////////////////////////////////////////////////////////////////

export function getRecentLinks(data: IGetRecentLinksProps): IGetRecentLinks {
    return { type: GET_RECENT_LINKS, data };
}

//////////////////////////////////////////////////////////////////////

export function getCustomTheme(data: IGetCustomThemeProps): ICustomAction<IGetCustomThemeProps> {
    return { type: GET_CUSTOM_THEME, data };
}

export function getCustomFooter(data: IGetCustomFooterProps): ICustomAction<IGetCustomFooterProps> {
    return { type: GET_CUSTOM_FOOTER, data };
}

export function getSearchResults(data: IGetSearchResultsProps): ICustomAction<IGetSearchResultsProps> {
    return { type: GET_SEARCH_RESULTS, data };
}

export function getSearchContentObjects(
    data: IGetSearchContentObjectsProps
): ICustomAction<IGetSearchContentObjectsProps> {
    return { type: GET_SEARCH_CONTENT_OBJECTS, data };
}

export function getChannelSearchData(data: IGetChannelSearchDataProps): ICustomAction<IGetChannelSearchDataProps> {
    return { type: GET_CHANNEL_SEARCH_DATA, data };
}

export function getClassificationsRoot(
    data: IGetClassificationsRootProps
): ICustomAction<IGetClassificationsRootProps> {
    return { type: GET_CLASSIFICATIONS_ROOT, data };
}

export function getClassificationsChildren(
    data: IGetClassificationsChildrenProps
): ICustomAction<IGetClassificationsChildrenProps> {
    return { type: GET_CLASSIFICATIONS_CHILDREN, data };
}

export function clearSearch(): AnyAction {
    return { type: CLEAR_SEARCH };
}

export function clearSearchResults(): AnyAction {
    return { type: CLEAR_SEARCH_RESULTS };
}

export function updateSearchFavorite(data: IUpdateSearchFavoriteProps): ICustomAction<IUpdateSearchFavoriteProps> {
    return { type: UPDATE_SEARCH_FAVORITE, data };
}

export function updateSearchQueryText(data: IUpdateSearchQueryTextProps): ICustomAction<IUpdateSearchQueryTextProps> {
    return { type: UPDATE_SEARCH_QUERYTEXT, data };
}

export function updateSearchSortBy(data: IUpdateSearchSortByProps): ICustomAction<IUpdateSearchSortByProps> {
    return { type: UPDATE_SEARCH_SORTBY, data };
}

export function updateSearchFacetsFilter(
    data: IUpdateSearchFacetsFilterProps
): ICustomAction<IUpdateSearchFacetsFilterProps> {
    return { type: UPDATE_SEARCH_FACETS_FILTER, data };
}

export function updateSearchClassificationsFilter(
    data: IUpdateSearchClassificationsFilterProps
): ICustomAction<IUpdateSearchClassificationsFilterProps> {
    return { type: UPDATE_SEARCH_CLASSIFICATIONS_FILTER, data };
}

export function updateSearchClassifications(
    data: IUpdateSearchClassificationsProps
): ICustomAction<IUpdateSearchClassificationsProps> {
    return { type: UPDATE_SEARCH_CLASSIFICATIONS, data };
}
