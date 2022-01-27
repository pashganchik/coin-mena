export const Const = Object.freeze({
    //ApiBaseUrl: 'https://gh-trending-api.herokuapp.com', // CORS errors
    //ApiBaseUrl: 'https://github.com/trending', // NOT returns json data, returns raw HTML
    ApiBaseUrl: 'https://api.github.com',
    FakeCurrentUserId: 20921259,
    GitHubAccessToken: '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', // to have an ability to make multiple api calls
    SpokenLanguages: ['En', 'De', 'Zh'],
    Languages: ['Java', 'JavaScript', 'TypeScript', 'CSS', 'Python', 'Go', 'Ruby', 'Erlang', 'Emacs Lisp', 'Php'],
    DateRanges: ['daily', 'weekly', 'monthly'],
});
