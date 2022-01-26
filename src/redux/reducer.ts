import { AnyAction, combineReducers } from 'redux';

import {
    IDataState, WorkModeEnum
} from '../utils/types';
import {
    GET_DEVS,
    GET_REPOS,
    GET_REPOS_DONE,
    GET_DEVS_DONE,
    SET_WORK_MODE,
    SET_CUSTOM_FILTER
} from './actions';

const initialState: IDataState = {
    workMode: WorkModeEnum.REPOS,
    repositories: [],
    repositoryLoading: false,
    developers: [],
    developersLoading: false,
    customFilter: {},
};

type InitialStateType = typeof initialState;

const mainReducer = (state = initialState, action: AnyAction): InitialStateType => {
    switch (action.type) {
        case GET_REPOS: {
            return { ...state, repositoryLoading: true };
        }
        case GET_REPOS_DONE: {
            const { repositories } = action;
            return { ...state, repositories, repositoryLoading: false };
        }
        case GET_DEVS: {
            return { ...state, developersLoading: true };
        }
        case GET_DEVS_DONE: {
            const { developers } = action;
            return { ...state, developers, repositoryLoading: false };
        }
        case SET_WORK_MODE: {
            const workMode = action.data;
            return { ...state, workMode, customFilter: {} };
        }
        case SET_CUSTOM_FILTER: {
            const customFilter = action.data;
            return { ...state, customFilter };
        }

        default:
            return state;
    }
};

export function createReducer(): any {
    return combineReducers({
        data: mainReducer,
    });
}
