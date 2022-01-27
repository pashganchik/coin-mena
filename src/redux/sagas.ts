import { put, takeLatest, all, call, delay } from 'redux-saga/effects';
import {
    GET_REPOS,
    GET_REPOS_DONE,
    GET_DEVS,
    GET_DEVS_DONE,
    SET_STAR_REPO,
    SET_FOLLOW_DEV,
    SET_UNFOLLOW_DEV,
    SET_STAR_REPO_DONE,
    SET_FOLLOW_DEV_DONE,
    SET_UNFOLLOW_DEV_DONE,
} from './actions';
import {
    IDeveloper,
    IRepository,
    ICustomFilter,
    IGitHubOptions,
    IRepositoryFull,
    IDeveloperFull,
} from '../utils/types';
import { Const } from '../utils/const';

// import githubTrends from 'github-trends-api'; // Begets CORS errors

//////////////////////////////////////////////////////////////////////////////

const prepareHeaders = (): HeadersInit => {
    const headers: HeadersInit = new Headers();

    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `token ${Const.GitHubAccessToken}`);

    return headers;
};

async function callApi(url: string, params: { [key: string]: any }): Promise<any> {
    const response = await fetch(url, params);
    return await response.json();
}

async function callPromise(promise: any, params: { [key: string]: any }): Promise<any> {
    return await promise(params);
}

//////////////////////////////////////////////////////////////////////////////

function* fetchRepos(data: any) {
    const headers: HeadersInit = prepareHeaders();
    const params = { method: 'GET', headers };

    const url = `${Const.ApiBaseUrl}/repositories`;

    let repositories: IRepository[] = yield call(callApi, url, params);

    // fill FullData
    const callsFullData = repositories.map((x) => {
        const urlFullData = `${Const.ApiBaseUrl}/repositories/${x.id}`;
        return call(callApi, urlFullData, params);
    });
    const fullData: IRepositoryFull[] = yield all(callsFullData);

    fullData.forEach((fullRepo) => {
        const repo = repositories.find((r) => r.id === fullRepo.id);
        if (repo) {
            repo.fullData = fullRepo;
        }
    });

    // fill Contributors
    const callsContributorsData = repositories.map((x) => {
        const urlFullData = `${Const.ApiBaseUrl}/repositories/${x.id}/contributors`;
        return call(callApi, urlFullData, params);
    });
    const contributorsData: IDeveloper[][] = yield all(callsContributorsData);

    contributorsData.forEach((contributors, idx) => {
        const repo = repositories[idx];
        if (repo) {
            repo.fullContributors = contributors;
        }
    });

    // This is emulation of filtering data (on client side, cause I haven't found filtering methods for the REST API endpoints)
    const filter: ICustomFilter = data.data;
    if (filter) {
        repositories = repositories.filter((repo) => {
            let result = true;
            if (filter.dateRange) {
                result = result && !!repo.fullData.pushed_at;
            }
            if (filter.spokenLanguage) {
                result = result && true; //??
            }
            if (filter.language) {
                result = result && repo.fullData.language === filter.language;
            }
            return result;
        });
    }

    yield put({
        type: GET_REPOS_DONE,
        repositories,
    });
}

function* fetchDevs(data: any) {
    const headers: HeadersInit = prepareHeaders();
    const params = { method: 'GET', headers };

    const url = `${Const.ApiBaseUrl}/users`;

    let developers: IDeveloper[] = yield call(callApi, url, params);

    // fill FullData
    const callsFullData = developers.map((x) => {
        const urlFullData = `${Const.ApiBaseUrl}/users/${x.id}`;
        return call(callApi, urlFullData, params);
    });

    const fullData: IDeveloperFull[] = yield all(callsFullData);

    fullData.forEach((fullDev) => {
        const dev = developers.find((d) => d.id === +fullDev.login);
        if (dev) {
            dev.fullData = fullDev;
        }
    });

    // fill Repos
    const callsReposData = developers.map((x) => {
        const urlFullData = `${Const.ApiBaseUrl}/users/${x.id}/repos`;
        return call(callApi, urlFullData, params);
    });
    const reposData: IRepositoryFull[][] = yield all(callsReposData);

    reposData.forEach((reposForUser) => {
        if (reposForUser.length === 0) return;

        const devId = reposForUser[0].owner.login;
        const dev = developers.find((d) => d.id === +devId);
        if (dev) {
            if (!dev.fullRepos) dev.fullRepos = [];
            dev.fullRepos.push(...reposForUser);
        }
    });

    // fill Followers
    const callsFollowersData = developers.map((x) => {
        const urlFullData = `${Const.ApiBaseUrl}/users/${x.id}/followers`;
        return call(callApi, urlFullData, params);
    });
    const followersData: IDeveloper[][] = yield all(callsFollowersData);

    followersData.forEach((followers, idx) => {
        const dev = developers[idx];
        if (dev) {
            dev.fullFollowers = followers;
        }
    });

    // This is emulation of filtering data (on client side, cause I haven't found filtering methods for the REST API endpoints)
    const filter: ICustomFilter = data.data;
    if (filter) {
        developers = developers.filter((dev) => {
            let result = true;
            if (filter.dateRange) {
                result = result && !!dev.fullData?.updated_at; //??
            }
            if (filter.spokenLanguage) {
                result = result && true; //??
            }
            if (filter.language) {
                result = result && dev.fullRepos && dev.fullRepos[0] && dev.fullRepos[0].language === filter.language;
            }
            return result;
        });
    }

    yield put({
        type: GET_DEVS_DONE,
        developers,
    });
}

/**
 * This method throws CORS error
 */
/*
function* fetchReposGitHubTrends(data: any) {
    const filter = data.data as ICustomFilter;

    const options: IGitHubOptions = {
        section: 'repositories',
        language: filter.language,
        spoken_language_code: filter.spokenLanguage,
        since: filter.dateRange || 'daily',
    };

    const repositories: IRepository[] = yield call(callPromise, githubTrends, options);

    yield put({
        type: GET_REPOS_DONE,
        repositories,
    });
}
*/

/**
 * This method throws CORS error
 */
/*
function* fetchDevsGitHubTrends(data: any) {
    const filter = data.data as ICustomFilter;

    const options: IGitHubOptions = {
        section: 'developers',
        language: filter.language,
        spoken_language_code: filter.spokenLanguage,
        since: filter.dateRange || 'daily',
    };

    const developers: IDeveloper[] = yield call(callPromise, githubTrends, options);

    yield put({
        type: GET_DEVS_DONE,
        developers,
    });
}
*/

//////////////////////////////////////////////////////////////////////

function* doSetStarRepo(data: any) {
    const repositoryId = data.data;

    yield delay(500); // this is just an emulation of API request. The process is the same: post data -> process result -> change state via reducer

    yield put({
        type: SET_STAR_REPO_DONE,
        repositoryId,
    });
}

function* doSetFollowDev(data: any) {
    const developerId = data.data;

    yield delay(500); // this is just an emulation of API request. The process is the same: post data -> process result -> change state via reducer

    yield put({
        type: SET_FOLLOW_DEV_DONE,
        developerId,
    });
}

function* doSetUnfollowDev(data: any) {
    const developerId = data.data;

    yield delay(500); // this is just an emulation of API request. The process is the same: post data -> process result -> change state via reducer

    yield put({
        type: SET_UNFOLLOW_DEV_DONE,
        developerId,
    });
}

//////////////////////////////////////////////////////////////////////

function* actionWatcher() {
    yield takeLatest(GET_REPOS, fetchRepos);
    yield takeLatest(GET_DEVS, fetchDevs);
    //yield takeLatest(GET_REPOS, fetchReposGitHubTrends);
    //yield takeLatest(GET_DEVS, fetchDevsGitHubTrends);

    yield takeLatest(SET_STAR_REPO, doSetStarRepo);
    yield takeLatest(SET_FOLLOW_DEV, doSetFollowDev);
    yield takeLatest(SET_UNFOLLOW_DEV, doSetUnfollowDev);
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}
