import { Action, AnyAction } from 'redux';
import { WorkModeEnum, ICustomFilter } from '../utils/types';

export const GET_REPOS = 'GET_REPOS';
export const GET_REPOS_DONE = 'GET_REPOS_DONE';

export const GET_DEVS = 'GET_DEVS';
export const GET_DEVS_DONE = 'GET_DEVS_DONE';

export const SET_WORK_MODE = 'SET_WORK_MODE';
export const SET_CUSTOM_FILTER = 'SET_CUSTOM_FILTER';

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
