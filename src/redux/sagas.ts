import { put, takeLatest, all, call } from 'redux-saga/effects';
import {
    GET_REPOS,
    GET_REPOS_DONE,
    GET_DEVS,
    GET_DEVS_DONE
} from './actions';
import {
    IDeveloper,
    IRepository,
    ICustomFilter,
    IGitHubOptions
} from '../utils/types';
import { Const } from '../utils/const';

import githubTrends from 'github-trends-api';

//////////////////////////////////////////////////////////////////////////////

const prepareHeaders = (): HeadersInit => {
    const headers: HeadersInit = new Headers();

    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    return headers;
};

async function callApi(url: string, params: { [key: string]: any }): Promise<any> {
    const response = await fetch(url, params);
    return await response.json();
}

async function callPromise(promise: any, params: { [key: string]: any}): Promise<any> {
    return await promise(params);
}

//////////////////////////////////////////////////////////////////////////////

function* fetchRepos(data: any) {
    const headers: HeadersInit = prepareHeaders();
    const params = { method: 'GET', headers };

    const url = `${Const.ApiBaseUrl}/repositories`;

    const repositories: IRepository[] = yield call(callApi, url, params);

    yield put({
        type: GET_REPOS_DONE,
        repositories,
    });
}

function* fetchDevs(data: any) {
    const headers: HeadersInit = prepareHeaders();
    const params = { method: 'GET', headers };

    const url = `${Const.ApiBaseUrl}/developers`;

    const developers: IDeveloper[] = yield call(callApi, url, params);

    yield put({
        type: GET_DEVS_DONE,
        developers,
    });
}

function* fetchReposGitHubTrends(data: any) {
    const filter = data.data as ICustomFilter;

    const options: IGitHubOptions = {
        section: 'repositories',
        language: filter.language,
        spoken_language_code: filter.spokenLanguage,
        since: filter.dateRange,
    };

    const repositories: IRepository[] = yield call(callPromise, githubTrends, options);

    yield put({
        type: GET_REPOS_DONE,
        repositories,
    });
}

function* fetchDevsGitHubTrends(data: any) {
    const filter = data.data as ICustomFilter;

    const options: IGitHubOptions = {
        section: 'developers',
        language: filter.language,
        spoken_language_code: filter.spokenLanguage,
        since: filter.dateRange,
    };

    const repositories: IRepository[] = yield call(callPromise, githubTrends, options);

    yield put({
        type: GET_REPOS_DONE,
        repositories,
    });
}

//////////////////////////////////////////////////////////////////////

function* actionWatcher() {
    //yield takeLatest(GET_REPOS, fetchRepos);
    //yield takeLatest(GET_DEVS, fetchDevs);
    yield takeLatest(GET_REPOS, fetchReposGitHubTrends);
    yield takeLatest(GET_DEVS, fetchDevsGitHubTrends);
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}
