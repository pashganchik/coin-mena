export interface ShortUser {
    username: string;
    url: string;
    avatar: string;
}

export interface ShortRepository {
    repositoryName: string,
    description: string,
    url: string,
}

export interface Repository {
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
    builtBy: ShortUser[],
}

export interface Developer {
    rank: number,
    username: string,
    name: string,
    url: string,
    avatar: string,
    since: string,
    popularRepository: ShortRepository,
}
