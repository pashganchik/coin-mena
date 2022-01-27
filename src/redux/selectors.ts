import { IRootState, IRepository, IDeveloper, WorkModeEnum, ICustomFilter } from '../utils/types';

/////////////////////////////////////////////////////////////

export const selectRepositories = (state: IRootState): IRepository[] => state.data.repositories;
export const selectRepositoriesLoading = (state: IRootState): boolean => state.data.repositoryLoading;

export const selectDevelopers = (state: IRootState): IDeveloper[] => state.data.developers;
export const selectDevelopersLoading = (state: IRootState): boolean => state.data.developersLoading;

export const selectWorkMode = (state: IRootState): WorkModeEnum => state.data.workMode;
export const selectCustomFilter = (state: IRootState): ICustomFilter => state.data.customFilter;

export const selectStarExecuted = (state: IRootState): boolean => state.data.starExecuted;
export const selectFollowExecuted = (state: IRootState): boolean => state.data.followExecuted;

export const selectError = (state: IRootState): boolean => state.data.error;
