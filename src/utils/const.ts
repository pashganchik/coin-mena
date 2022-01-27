export const Const = Object.freeze({
    //ApiBaseUrl: 'https://gh-trending-api.herokuapp.com', // CORS errors
    //ApiBaseUrl: 'https://github.com/trending', // NOT returns json data, returns raw HTML
    ApiBaseUrl: 'https://api.github.com',
    FakeCurrentUserId: 20921259,
    GitHubAccessToken: 'gh###p_5gKD87y###iQGeVNXLjooK03wnO5TeKRf0drbqK', // to have an ability to make multiple api calls
    SpokenLanguages: ['En', 'De', 'Zh'],
    Languages: ['Java', 'JavaScript', 'TypeScript', 'CSS', 'Python', 'Go', 'Ruby', 'Erlang', 'Emacs Lisp', 'Php'],
    DateRanges: ['daily', 'weekly', 'monthly'],
});
