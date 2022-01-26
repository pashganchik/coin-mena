import { put, takeLatest, all, call } from 'redux-saga/effects';
import {
    AUTHENTICATE_USER,
    AUTHENTICATE_USER_DONE,
    GET_CHANNELS,
    GET_CHANNELS_COUNT,
    GET_CHANNELS_COUNT_DONE,
    GET_CHANNELS_DONE,
    GET_CONFIGURATION,
    GET_CONFIGURATION_DONE,
    GET_CUSTOM_FOOTER,
    GET_CUSTOM_FOOTER_DONE,
    GET_CUSTOM_THEME,
    GET_CUSTOM_THEME_DONE,
    GET_DOCUMENTS,
    GET_DOCUMENTS_DONE,
    GET_FAVORITES,
    GET_FAVORITES_DONE,
    GET_FILTERED_DOCUMENTS_COUNT,
    GET_FILTERED_DOCUMENTS_COUNT_DONE,
    GET_FILTERED_FAVORITES_COUNT,
    GET_FILTERED_FAVORITES_COUNT_DONE,
    GET_FOLDER_ITEMS,
    GET_FOLDER_ITEMS_DONE,
    GET_FOLDER_PATH,
    GET_FOLDER_PATH_DONE,
    GET_RECENT_LINKS,
    GET_RECENT_LINKS_DONE,
    GET_TOTAL_DOCUMENTS_COUNT,
    GET_TOTAL_DOCUMENTS_COUNT_DONE,
    GET_TOTAL_FAVORITES_COUNT,
    GET_TOTAL_FAVORITES_COUNT_DONE,
    MOVE_FAVORITE,
    MOVE_FAVORITE_DONE,
    GET_SEARCH_RESULTS,
    GET_SEARCH_RESULTS_DONE,
    GET_SEARCH_CONTENT_OBJECTS,
    GET_SEARCH_CONTENT_OBJECTS_DONE,
    GET_FILTERED_FOLDER_ITEMS_DONE,
    GET_FILTERED_FOLDER_ITEMS,
    ADD_FOLDER_ITEM_TO_FAVORITES,
    DELETE_FOLDER_ITEM_FROM_FAVORITES,
    ADD_FOLDER_ITEM_TO_FAVORITES_DONE,
    DELETE_FOLDER_ITEM_FROM_FAVORITES_DONE,
    DELETE_FAVORITE_DONE,
    DELETE_FAVORITE,
    GET_CHANNEL_SEARCH_DATA,
    GET_CHANNEL_SEARCH_DATA_DONE,
    GET_CLASSIFICATIONS_ROOT,
    GET_CLASSIFICATIONS_CHILDREN,
    GET_CLASSIFICATIONS_ROOT_DONE,
    GET_CLASSIFICATIONS_CHILDREN_DONE,
    UPDATE_SEARCH_CLASSIFICATIONS,
    UPDATE_SEARCH_CLASSIFICATIONS_DONE,
    CHANGE_USER_LAST_NAME_DONE,
    CHANGE_USER_FIRST_NAME_DONE,
    CHANGE_USER_PASSWORD_DONE,
    GET_USER_DATA_DONE,
    CHANGE_USER_PASSWORD,
    CHANGE_USER_FIRST_NAME,
    CHANGE_USER_LAST_NAME,
    GET_USER_DATA,
} from './actions';
import {
    IAuthData,
    IChannelItems,
    IConfigurationData,
    ICustomFooter,
    ICustomTheme,
    IDocumentItems,
    IDocumentPath,
    IFavoriteItem,
    IFavoriteItems,
    IRecentLinkItems,
    ISearchResultsData,
    ISearchQuery,
    IClassifications,
    IClassificationTree,
    IClassificationTreeItem,
    IClassificationItem,
    IUserData,
    ITenantData,
} from '../utils/types';
import {
    convertToChannelData,
    convertToConfigurationData,
    convertToDocumentData,
    convertToDocumentPath,
    convertToFavoriteData,
    convertToRecentLinkData,
} from './convertors';

//////////////////////////////////////////////////////////////////////////////

const prepareHeaders = (authData?: IAuthData | undefined): HeadersInit => {
    const headers: HeadersInit = new Headers();

    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    if (authData) {
        headers.set(authData.name, authData.value);
    }

    return headers;
};

async function callApi(url: string, params: { [key: string]: any }): Promise<any> {
    const response = await fetch(url, params);
    return await response.json();
}

//////////////////////////////////////////////////////////////////////////////
// documents
//////////////////////////////////////////////////////////////////////////////

function* fetchDocuments(data: any) {
    const { authData, maxRows, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/documents?max=${maxRows}&orderBy=dateUpdated&orderDirection=desc`;

    const documents: IDocumentItems = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_DOCUMENTS_DONE,
        documents: documents.map((i) => convertToDocumentData(i)),
    });
}

function* fetchFilteredDocumentsCount(data: any) {
    const { authData, filterText, documentId, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/folders/${
        documentId || 'root'
    }/items/count?filterText=${filterText || ''}&includeUploads=true`;

    const { count } = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_FILTERED_DOCUMENTS_COUNT_DONE,
        count,
    });
}

function* fetchTotalDocumentsCount(data: any) {
    const { authData, documentId, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/folders/${
        documentId || 'root'
    }/items/count?includeUploads=true`;

    const { count } = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_TOTAL_DOCUMENTS_COUNT_DONE,
        count,
    });
}

function* fetchFilteredFolderItems(data: any) {
    const { authData, filterText, maxRows, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/folders/items?filterText=${
        filterText || ''
    }&max=${maxRows || 0}&orderBy=path&orderDirection=asc&paths=true`;

    const folderItems: IDocumentItems = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_FILTERED_FOLDER_ITEMS_DONE,
        filteredFolderItems: folderItems.map((i) => convertToDocumentData(i)),
    });
}

function* fetchFolderItems(data: any) {
    const { authData, filterText, maxRows, offset, orderBy, orderDirection, documentId, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/folders/${
        documentId || 'root'
    }/items?filterText=${filterText || ''}&includeUploads=true&max=${maxRows || 0}&offset=${offset || 0}&orderBy=${
        orderBy || 'name'
    }&orderDirection=${orderDirection || 'asc'}`;

    const folderItems: IDocumentItems = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_FOLDER_ITEMS_DONE,
        folderItems: folderItems.map((i) => convertToDocumentData(i)),
    });
}

function* fetchFolderPathById(authData: IAuthData, documentId: string, configurationData: IConfigurationData) {
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/folders/${documentId || 'root'}`;

    const folderPath: IDocumentPath = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    return convertToDocumentPath(folderPath);
}

function* fetchFolderPath(data: any) {
    const { authData, documentId, configurationData } = data.data;

    const paths = [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    let folderPath = yield fetchFolderPathById(authData, documentId, configurationData);
    if (folderPath) {
        paths.push(folderPath);
        while (folderPath.parentId) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            folderPath = yield fetchFolderPathById(authData, folderPath.parentId, configurationData);
            if (folderPath) {
                paths.push(folderPath);
            } else {
                break;
            }
        }
    }

    yield put({
        type: GET_FOLDER_PATH_DONE,
        folderPath: {
            documentId,
            paths,
        },
    });
}

//////////////////////////////////////////////////////////////////////////////
// recent links
//////////////////////////////////////////////////////////////////////////////

function* fetchRecentLinks(data: any) {
    const { authData, maxRows, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/recentLinks?max=${maxRows}`;

    const recentLinks: IRecentLinkItems = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_RECENT_LINKS_DONE,
        recentLinks: recentLinks.map((i) => convertToRecentLinkData(i)),
    });
}

//////////////////////////////////////////////////////////////////////////////
// favorites
//////////////////////////////////////////////////////////////////////////////

function* fetchFavorites(data: any) {
    const { authData, maxRows, offset, configurationData, filterText } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/favorites?filterText=${
        filterText || ''
    }&max=${maxRows}&offset=${offset || 0}&orderBy=index&orderDirection=desc`;

    const favorites: IFavoriteItems = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_FAVORITES_DONE,
        favorites: favorites.map((i) => convertToFavoriteData(i)),
    });
}

function* fetchFilteredFavoritesCount(data: any) {
    const { authData, filterText, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/favorites/count?filterText=${
        filterText || ''
    }`;

    const { count } = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_FILTERED_FAVORITES_COUNT_DONE,
        count,
    });
}

function* fetchTotalFavoritesCount(data: any) {
    const { authData, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/favorites/count`;

    const { count } = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_TOTAL_FAVORITES_COUNT_DONE,
        count,
    });
}

function* addFolderItemToFavorites(data: any) {
    const { authData, list, id, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/folders/${id}/favorites`;

    const favoriteData: IFavoriteItem = yield fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            list,
            id,
        }),
    }).then((response) => response.json());

    yield put({
        type: ADD_FOLDER_ITEM_TO_FAVORITES_DONE,
        favoriteData: convertToFavoriteData(favoriteData),
    });
}

function* deleteFolderItemFromFavorites(data: any) {
    const { authData, id, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/folders/${id}/favorites`;

    const favoriteData: IFavoriteItem = yield fetch(url, {
        method: 'DELETE',
        headers,
    }).then((response) => response.json());

    yield put({
        type: DELETE_FOLDER_ITEM_FROM_FAVORITES_DONE,
        favoriteData: convertToFavoriteData(favoriteData),
    });
}

function* deleteFavorite(data: any) {
    const { authData, id, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/favorites/${id}`;

    const favoriteData: IFavoriteItem = yield fetch(url, {
        method: 'DELETE',
        headers,
    }).then((response) => response.json());

    yield put({
        type: DELETE_FAVORITE_DONE,
        favoriteData: convertToFavoriteData(favoriteData),
    });
}

function* moveFavorite(data: any) {
    const { authData, id, configurationData, delta } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/favorites/${id}?delta=${delta}`;

    const favoriteData: IFavoriteItem = yield fetch(url, {
        method: 'POST',
        headers,
    }).then((response) => response.json());

    yield put({
        type: MOVE_FAVORITE_DONE,
        favoriteData: convertToFavoriteData(favoriteData),
    });
}

//////////////////////////////////////////////////////////////////////////////
// channels
//////////////////////////////////////////////////////////////////////////////

function* fetchChannels(data: any) {
    const { authData, maxRows, offset, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/channels?max=${maxRows || 0}&offset=${
        offset || 0
    }&orderBy=displayOrder&orderDirection=asc&requireReadAccess=true&statusFilter=true`;

    const channels: IChannelItems = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_CHANNELS_DONE,
        channels: channels.map((i) => convertToChannelData(i)),
    });
}

function* fetchChannelsCount(data: any) {
    const { authData, configurationData } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/channels/count?requireReadAccess=true&statusFilter=true`;

    const { count } = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_CHANNELS_COUNT_DONE,
        count,
    });
}

//////////////////////////////////////////////////////////////////////////////
// common stuff
//////////////////////////////////////////////////////////////////////////////

function* fetchUserData(data: any) {
    const { configurationData, authData, userId } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/users/${userId}`;

    const userData: IUserData = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_USER_DATA_DONE,
        userData,
    });
}

function* changeUserPassword(data: any) {
    const { configurationData, authData, tenantId, currentPassword, invalidate, newPassword, userName } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${
        configurationData.restPattern
    }/identities/${tenantId}?currentPassword=${currentPassword}&invalidate=${invalidate ? 'true' : 'false'}`;

    const tenantData: ITenantData = yield fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            password: newPassword,
            username: userName,
        }),
    }).then((response) => response.json());

    yield put({
        type: CHANGE_USER_PASSWORD_DONE,
        tenantData,
    });
}

function* changeUserFirstName(data: any) {
    const { configurationData, authData, userId, firstName } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/users/${userId}`;

    const userData: IUserData = yield fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            firstName,
        }),
    }).then((response) => response.json());

    yield put({
        type: CHANGE_USER_FIRST_NAME_DONE,
        userData,
    });
}

function* changeUserLastName(data: any) {
    const { configurationData, authData, userId, lastName } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/users/${userId}`;

    const userData: IUserData = yield fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            lastName,
        }),
    }).then((response) => response.json());

    yield put({
        type: CHANGE_USER_LAST_NAME_DONE,
        userData,
    });
}

function* doGetCustomTheme(data: any) {
    const { configurationData } = data.data;

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/resources/custom.json`;

    const themeData: ICustomTheme = yield fetch(url, {
        method: 'GET',
    }).then((response) => response.json());

    yield put({
        type: GET_CUSTOM_THEME_DONE,
        themeData,
    });
}

function* doGetCustomFooter(data: any) {
    const { configurationData } = data.data;

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/resources/custom-footer.json`;

    const footerData: ICustomFooter = yield fetch(url, {
        method: 'GET',
    }).then((response) => response.json());

    yield put({
        type: GET_CUSTOM_FOOTER_DONE,
        footerData,
    });
}

function prepareSearchQueryParams(searchQuery: ISearchQuery) {
    // example: ?query=test&facetFilters=%7B%7D&classifications=%5B%5D&start=0&limit=30&sortBy=SCORE
    // example: ?query=test&facetFilters=%7B%7D&classifications=%5B%5D&documentId=30932

    return Object.keys(searchQuery)
        .map((x) => `${x}=${searchQuery[x]}`)
        .join('&');
}

function* doGetSearchResults(data: any) {
    const { authData, configurationData, searchQuery, appendResults } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const queryParams = prepareSearchQueryParams(searchQuery);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/search?${queryParams}`;

    const searchResultsData: ISearchResultsData = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_SEARCH_RESULTS_DONE,
        searchResultsData,
        appendResults,
    });
}

function* doGetSearchContentObjects(data: any) {
    const { authData, configurationData, searchQuery, documentId } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const queryParams = prepareSearchQueryParams(searchQuery);

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/search?${queryParams}`;

    const searchContentObjectsData: ISearchResultsData = yield fetch(url, {
        method: 'GET',
        headers,
    }).then((response) => response.json());

    yield put({
        type: GET_SEARCH_CONTENT_OBJECTS_DONE,
        searchContentObjectsData,
        documentId,
    });
}

function* doGetChannelSearchData(data: any) {
    const { authData, configurationData, channelId } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);
    const paramsChannel = { method: 'GET', headers };

    const urlChannel = `${configurationData.coreBaseUrl}${configurationData.restPattern}/channels/${channelId}`;
    const urlChannelFacets = `${urlChannel}/facets`;
    const urlChannelClassifications = `${urlChannel}/classifications`;

    // [IChannelData, ISearchFacet[], IClassifications]
    const resultChannel: any[] = yield all([
        call(callApi, urlChannel, paramsChannel),
        call(callApi, urlChannelFacets, paramsChannel),
        call(callApi, urlChannelClassifications, paramsChannel),
    ]);

    const [channelData, facetsData, classificationsData] = resultChannel;

    const urlClassificationNames = `${configurationData.coreBaseUrl}${configurationData.restPattern}/classifications/getNames`;
    const callsNames = (classificationsData as IClassifications).map((x) => {
        const params = {
            method: 'POST',
            headers,
            body: JSON.stringify([x.id]),
        };
        return call(callApi, urlClassificationNames, params);
    });
    const classificationsNames: any[] = yield all(callsNames);

    yield put({
        type: GET_CHANNEL_SEARCH_DATA_DONE,
        channelData,
        facetsData,
        classificationsData,
        classificationsNames,
    });
}

function* doGetClassificationsRoot(data: any) {
    const { authData, configurationData, checkedItems } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);
    const params = { method: 'POST', headers, body: JSON.stringify({ checkedItems }) };

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/classifications/roots/full`;

    const classificationTree: IClassificationTree = yield call(callApi, url, params);

    yield put({
        type: GET_CLASSIFICATIONS_ROOT_DONE,
        classificationTree,
    });
}

function* doGetClassificationsChildren(data: any) {
    const { authData, configurationData, classificationId } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);
    const params = { method: 'GET', headers };

    const url = `${configurationData.coreBaseUrl}${configurationData.restPattern}/classifications/${classificationId}/children`;

    const classificationChildren: IClassificationItem[] = yield call(callApi, url, params);

    yield put({
        type: GET_CLASSIFICATIONS_CHILDREN_DONE,
        classificationChildren,
        classificationId,
    });
}

function* doUpdateSearchClassifications(data: any) {
    const { authData, configurationData, searchClassifications } = data.data;
    const headers: HeadersInit = prepareHeaders(authData);

    const urlClassificationNames = `${configurationData.coreBaseUrl}${configurationData.restPattern}/classifications/getNames`;
    const callsNames = (searchClassifications as IClassifications).map((x) => {
        const params = {
            method: 'POST',
            headers,
            body: JSON.stringify([x.id]),
        };
        return call(callApi, urlClassificationNames, params);
    });
    const classificationsNames: any[] = yield all(callsNames);

    yield put({
        type: UPDATE_SEARCH_CLASSIFICATIONS_DONE,
        searchClassifications,
        classificationsNames,
    });
}

//////////////////////////////////////////////////////////////////////

function* actionWatcher() {
    yield takeLatest(GET_DOCUMENTS, fetchDocuments);
    yield takeLatest(GET_TOTAL_DOCUMENTS_COUNT, fetchTotalDocumentsCount);
    yield takeLatest(GET_FILTERED_DOCUMENTS_COUNT, fetchFilteredDocumentsCount);
    yield takeLatest(GET_CHANNELS, fetchChannels);
    yield takeLatest(GET_CHANNELS_COUNT, fetchChannelsCount);
    yield takeLatest(GET_FAVORITES, fetchFavorites);
    yield takeLatest(GET_RECENT_LINKS, fetchRecentLinks);
    yield takeLatest(GET_FOLDER_ITEMS, fetchFolderItems);
    yield takeLatest(ADD_FOLDER_ITEM_TO_FAVORITES, addFolderItemToFavorites);
    yield takeLatest(DELETE_FOLDER_ITEM_FROM_FAVORITES, deleteFolderItemFromFavorites);
    yield takeLatest(GET_FOLDER_PATH, fetchFolderPath);
    yield takeLatest(GET_CUSTOM_THEME, doGetCustomTheme);
    yield takeLatest(GET_CUSTOM_FOOTER, doGetCustomFooter);
    yield takeLatest(GET_TOTAL_FAVORITES_COUNT, fetchTotalFavoritesCount);
    yield takeLatest(GET_FILTERED_FAVORITES_COUNT, fetchFilteredFavoritesCount);
    yield takeLatest(MOVE_FAVORITE, moveFavorite);
    yield takeLatest(GET_SEARCH_RESULTS, doGetSearchResults);
    yield takeLatest(GET_SEARCH_CONTENT_OBJECTS, doGetSearchContentObjects);
    yield takeLatest(GET_CHANNEL_SEARCH_DATA, doGetChannelSearchData);
    yield takeLatest(GET_CLASSIFICATIONS_ROOT, doGetClassificationsRoot);
    yield takeLatest(GET_CLASSIFICATIONS_CHILDREN, doGetClassificationsChildren);
    yield takeLatest(UPDATE_SEARCH_CLASSIFICATIONS, doUpdateSearchClassifications);
    yield takeLatest(GET_FILTERED_FOLDER_ITEMS, fetchFilteredFolderItems);
    yield takeLatest(DELETE_FAVORITE, deleteFavorite);
    yield takeLatest(CHANGE_USER_PASSWORD, changeUserPassword);
    yield takeLatest(CHANGE_USER_FIRST_NAME, changeUserFirstName);
    yield takeLatest(CHANGE_USER_LAST_NAME, changeUserLastName);
    yield takeLatest(GET_USER_DATA, fetchUserData);
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}
