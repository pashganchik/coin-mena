export interface IRootState {
    data: IDataState;
}

export enum WorkModeEnum {
    REPOS = 'REPOS',
    DEVS = 'DEVS',
}

export interface IDataState {
    workMode: WorkModeEnum,
    repositories: IRepository[],
    repositoryLoading: boolean,
    developers: IDeveloper[],
    developersLoading: boolean,
    customFilter: ICustomFilter,
}

/////////////////////////////////////////////////////////////
export interface IShortUser {
    username: string;
    url: string;
    avatar: string;
}

export interface IShortRepository {
    repositoryName: string,
    description: string,
    url: string,
}

export interface IRepository {
    rank: number,
    username: string,
    repositoryName: string,
    url: string,
    description: string,
    language: string,
    languageColor: string,
    totalStars: number,
    forks: number,
    StarsSince: number,
    since: string,
    builtBy: IShortUser[],
}

export interface IDeveloper {
    rank: number,
    username: string,
    name: string,
    url: string,
    avatar: string,
    since: string,
    popularRepository: IShortRepository,
}

export interface ICustomFilter {
    spokenLanguage?: string,
    language?: string,
    dateRange?: string,
}

export interface IGitHubOptions {
    section?: string, // default: empty (repositories) - or 'developers'
    language?: string // default: empty (all) - or 'javascript', 'java' etc..
    since?: string // default: empty (daily) - or 'weekly', 'monthly'
    spoken_language_code?: string // default: empty (all) - or en - fs - zh ...
}