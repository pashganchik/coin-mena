# Coin Mena web app

## **About**

React-based application for Test React Functionality

<b><u>IMPORTANT:</u></b> all the endpoints from the task beget CORS errors: https://gh-trending-api.herokuapp.com and library https://www.npmjs.com/package/github-trends-api

That's why I used standard GitHub API to get data: https://api.github.com

Please, fill-up your value for the Developer Token in the file `src\utils\const.ts`, property `GitHubAccessToken` to have an access to implement API requests.

## **Requirements/dependencies**

- husky

## **Getting started**

Clone repository locally, and from its root folder run `npm install`

Then run `npm run prepare` to install husky hooks

## **Run application**

- Command to run in static mode       : `npm run start-app` (and then open http://localhost:3000)

- Command to build artifacts of site  : `npm run build` (used for deployment)

- Command to clear old artifacts      : `npm run clean`


Pages:
-   Repositories (`'/repos'`)
-   Developers (`'/devs'`)

## **Testing**

I use **Cypress** to test functionality. We may use any lightweight testing (Jest or Mocha/Chai/Sinon), but for this example I decided to use difficult framework, which I worked with.

There are two test kinds:

1. Integration/e2e testing. This is several tests to test elements interaction or some overall logic
1. Isolated components' testing. This is testing of components' rendering and possibly behavior.

There are two modes:

1. Visual mode. Works with Cypress runner window with browser
1. Headless mode. Works in the console

So, there is how we may run our tests:

| Kind\Mode               | Visual                       | Headless                    |
| ----------------------- | ---------------------------- | --------------------------- |
| Integration             | `npm run test:open-app`      | `npm run test:run-app`      |
| Isolated                | `npm run test:open-ct`       | `npm run test:run-ct`       |

And, there is command to run all the tests: `npm run test`

## **Code style requirements**

I use _Prettier_, _ESLint_, _Stylelint_ and _Typescript compilation_ to check that code is formatted and doesn't contain errors.

You may use some extensions for your IDE, but anyway we use pre-commit hook which performs all these checking, but not fixing!

If there are some errors - you may run Commands to fix (see table below), or fix errors/warnings manually.

(_The reason for this is that pre-commit makes changes in the code silent. This changes are not shown to the developer to review in the IDE._)


- *How to check all these rules manually:*

  | Check type        | Command to check          | Command to fix          |
    | -----------       | ----------------------    | ----------------------  |
  | Typescript        | `npm run tsc:check`       |  -                      |
  | Prettier          | `npm run prettier:check`  | `npm run prettier:fix`  |
  | ESLint            | `npm run eslint:check`    | `npm run eslint:fix`    |
  | StyleLint         | `npm run stylelint:check` | `npm run stylelint:fix` |
  | _**Everything**_  | _**`npm run all:check`**_ | _**`npm run all:fix`**_ |

- *Pre-commit hook:*

  Please, just find file `.husky/pre-commit`. It contains all necessary commands to check files before commit.

  ## **Localization**

  We have Wrapper Locales, cause these parts depends on outside data.

    - `WrapIntlProvider` - provide ability to specify any locale. <br/>
      Key points:
        1. Locale provided by our Browser
        1. Files with Translations placed in folder `src/i18n`.
