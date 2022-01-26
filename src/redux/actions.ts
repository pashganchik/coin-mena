import { Action, AnyAction } from 'redux';
import {
} from '../utils/types';

export const GET_REPOS = 'GET_REPOS';
export const GET_REPOS_DONE = 'GET_REPOS_DONE';

export const GET_DEVS = 'GET_DEVS';
export const GET_DEVS_DONE = 'GET_DEVS_DONE';


//////////////////////////////////////////////////////////////////////
// interfaces
//////////////////////////////////////////////////////////////////////

export interface ICustomAction<T> extends Action<string> {
    type: string;
    data: T;
}

//////////////////////////////////////////////////////////////////////

export function getRepos(): AnyAction {
    return { type: GET_REPOS };
}

export function getDevs(): AnyAction {
    return { type: GET_DEVS };
}
