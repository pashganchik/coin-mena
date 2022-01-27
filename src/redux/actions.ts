import { Action, AnyAction } from 'redux';
import { WorkModeEnum, ICustomFilter } from '../utils/types';

export const GET_REPOS = 'GET_REPOS';
export const GET_REPOS_DONE = 'GET_REPOS_DONE';

export const GET_DEVS = 'GET_DEVS';
export const GET_DEVS_DONE = 'GET_DEVS_DONE';

export const SET_WORK_MODE = 'SET_WORK_MODE';
export const SET_CUSTOM_FILTER = 'SET_CUSTOM_FILTER';

export const SET_STAR_REPO = 'SET_STAR_REPO';
export const SET_STAR_REPO_DONE = 'SET_STAR_REPO_DONE';

export const SET_FOLLOW_DEV = 'SET_FOLLOW_DEV';
export const SET_FOLLOW_DEV_DONE = 'SET_FOLLOW_DEV_DONE';

export const SET_UNFOLLOW_DEV = 'SET_UNFOLLOW_DEV';
export const SET_UNFOLLOW_DEV_DONE = 'SET_UNFOLLOW_DEV_DONE';

export const CLEAR_USER_ACTIONS = 'CLEAR_USER_ACTIONS';

//////////////////////////////////////////////////////////////////////
// interfaces
//////////////////////////////////////////////////////////////////////

export interface ICustomAction<T> extends Action<string> {
    type: string;
    data: T;
}

//////////////////////////////////////////////////////////////////////

export function getRepos(data: ICustomFilter): ICustomAction<ICustomFilter> {
    return { type: GET_REPOS, data };
}

export function getDevs(data: ICustomFilter): ICustomAction<ICustomFilter> {
    return { type: GET_DEVS, data };
}

export function setWorkMode(data: WorkModeEnum): ICustomAction<WorkModeEnum> {
    return { type: SET_WORK_MODE, data };
}

export function setCustomFilter(data: ICustomFilter): ICustomAction<ICustomFilter> {
    return { type: SET_CUSTOM_FILTER, data };
}

export function setStarRepo(data: number): ICustomAction<number> {
    return { type: SET_STAR_REPO, data };
}

export function setFollowDev(data: number): ICustomAction<number> {
    return { type: SET_FOLLOW_DEV, data };
}

export function setUnfollowDev(data: number): ICustomAction<number> {
    return { type: SET_UNFOLLOW_DEV, data };
}

export function clearUserActions(): AnyAction {
    return { type: CLEAR_USER_ACTIONS };
}
