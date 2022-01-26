import { Const } from './const';

export const trimTrailingSlashes = (path: string): string => {
    return path.toLowerCase().replace(/(^\/)|(\/$)/g, ''); // trim trailing '/'
};

export const scrollToTop = (): void => {
    window.scrollTo(0, 0);
};

export const pathContainsPage = (pathName: string, pageName: string): boolean => {
    return trimTrailingSlashes(pathName).indexOf(trimTrailingSlashes(pageName)) >= 0;
};

export const pathEndsWithPage = (pathName: string, pageName: string): boolean => {
    return trimTrailingSlashes(pathName).endsWith(trimTrailingSlashes(pageName));
};
