import React from 'react';
import { Provider } from 'react-redux';
import { mount } from '@cypress/react';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

import { createReducer } from '../../src/redux/reducer';
import rootSaga from '../../src/redux/sagas';
import { LOCALES } from '../../src/utils/locale';
import { Const, Stubs } from './const';
import { WrapIntlProvider } from '../../src/utils/providers';

const initialTestData = {
    authData: Stubs.AuthenticateStub,
    userData: Stubs.UserDataStub,
    configurationData: Stubs.ConfigurationDataStub,
    recentLinks: null,
    loading: false,
    filterIsLoading: false,
    favoriteDocumentWasAdded: false, // indicates whether we need to reload documents grid to display or hide star marks
    favoriteDocumentWasDeleted: false, // indicates whether we need to reload documents grid to display or hide star marks
    userDataWasUpdated: false, // user data was updated and needs to be reloaded
    folderItems: null,
    filteredFolderItems: null,
    channels: null,
    documents: null,
    favorites: null,
    totalDocumentsCount: 0,
    filteredDocumentsCount: 0,
    recentFavoriteData: null, // last object which was changed with favorites
    folderPath: null,
    customThemeData: {},
    customFooterData: {},
    channelsCount: null,
};

export const createTestState = (dataState?: any) => {
    return { data: { ...initialTestData, ...dataState } };
};

export const RealStoreHoc = () => (component: React.ReactElement) => {
    const sagaMiddleware = createSagaMiddleware();
    const mockedStore = createStore(createReducer(), createTestState(), applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    return <Provider store={mockedStore}>{component}</Provider>;
};

export const MockStoreHoc =
    (initialState = {}) =>
    (component: React.ReactElement) => {
        const mockStore = configureMockStore([]);
        const mockedStore = mockStore(initialState);

        return <Provider store={mockedStore}>{component}</Provider>;
    };

export const ProvidersRealStoreHoc =
    (locale = LOCALES.ENGLISH, customJsonTheme = {}) =>
    (component: React.ReactElement) => {
        return RealStoreHoc()(
            <WrapIntlProvider locale={locale}>
                <BrowserRouter>{component}</BrowserRouter>
            </WrapIntlProvider>
        );
    };

export const ProvidersMockStoreHoc =
    (locale = LOCALES.ENGLISH, initialState = {}) =>
    (component: React.ReactElement) => {
        return MockStoreHoc(initialState)(
            <WrapIntlProvider locale={locale}>
                <BrowserRouter>{component}</BrowserRouter>
            </WrapIntlProvider>
        );
    };

export const mountWithProviders =
    (locale = LOCALES.ENGLISH, initialState?: any) =>
    (component: React.ReactElement) => {
        if (initialState) {
            return mount(ProvidersMockStoreHoc(locale, initialState)(component));
        } else {
            return mount(ProvidersRealStoreHoc(locale)(component));
        }
    };

export const mountWithStore = (initialState?: any) => (component: React.ReactElement) => {
    if (initialState) {
        return mount(MockStoreHoc(initialState)(component));
    } else {
        return mount(RealStoreHoc()(component));
    }
};

export const fakeVisitSite = () => {
    window.history.pushState({}, '', '/');
};
