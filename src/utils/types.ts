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
    starExecuted: boolean;
    followExecuted: boolean;
    error: boolean;
}

/////////////////// ### Types by https://gh-trending-api.herokuapp.com/ ### //////////////////////////
// THROWS CORS ERROR

/*
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
*/

/////////////////// ### Options for github-trends-api library (CORS issue, not working) ### ///////////////////
// THROWS CORS ERROR

export interface IGitHubOptions {
    section?: string, // default: empty (repositories) - or 'developers'
    language?: string // default: empty (all) - or 'javascript', 'java' etc..
    since?: string // default: empty (daily) - or 'weekly', 'monthly'
    spoken_language_code?: string // default: empty (all) - or en - fs - zh ...
}

/////////////////// ### Types by https://api.github.com/ ### //////////////////////////

export interface IDeveloper {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    repos_url: string;
    type: string;
    site_admin: boolean;

    fullData: IDeveloperFull;
    fullRepos: IRepositoryFull[];
    fullFollowers: IDeveloper[];
}

export interface IRepository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: IDeveloper;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;

    fullData: IRepositoryFull;
}

export interface IRepositoryFull {
    id: number,
    node_id: string,
    name: string,
    full_name: string,
    private: boolean,
    owner: IDeveloper,
    html_url: string,
    description: string,
    fork: boolean,
    url: string,
    created_at: string,
    updated_at: string,
    pushed_at: string,
    homepage: string,
    size: number,
    watchers_count: number,
    language: string,
    has_issues: boolean,
    has_projects: boolean,
    has_downloads: boolean,
    has_wiki: boolean,
    has_pages: boolean,
    forks_count: number,
    archived: boolean,
    disabled: boolean,
    open_issues_count: number,
    license: {
        key: string,
        name: string,
    },
    allow_forking: boolean,
    is_template: boolean,
    visibility: string,
    forks: number,
    open_issues: number,
    watchers: number,
    default_branch: string,
    network_count: number,
    subscribers_count: number
}

export interface IDeveloperFull {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    type: string,
    site_admin: boolean,
    name: string,
    company: string,
    blog: string,
    location: string,
    email: string,
    hireable: boolean,
    bio: string,
    twitter_username: string,
    public_repos: number,
    public_gists: number,
    followers: number,
    following: number,
    created_at: string,
    updated_at: string,
}

/////////////////////////////////////////////////////////////////////////////////

export interface ICustomFilter {
    spokenLanguage?: string,
    language?: string,
    dateRange?: string,
}
