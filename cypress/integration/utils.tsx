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
import { WorkModeEnum } from '../../src/utils/types';

const initialTestData = {
    workMode: WorkModeEnum.REPOS,
    repositories: [],
    repositoryLoading: false,
    developers: [],
    developersLoading: false,
    customFilter: {},
    starExecuted: false,
    followExecuted: false,
    error: false,
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
