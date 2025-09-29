## Running
- Run with Codegen: `npx playwright codegen`
- Run specific test suite:  `npx playwright test <file_name>.spec.ts`
- Run test suite many times: 
  Sequential Run
    `for i in {1..5}; do ENV=stg npx playwright test tests/webapp/auth/webapp-signin.spec.ts; done`
  Parallel Run
    `ENV=stg npx playwright test tests/webapp/auth/webapp-signin.spec.ts --repeat-each 3`
- Run specific test case:  `npx playwright test -g "add a todo item" `
- Run last failed tests:  `npx playwright test --last-failed`
- Run headed mode: `npx playwright test --headed` 
- Run debug mode:  `npx playwright test --debug`
- Run UI mod: `npx playwright test --ui`


## Install Allure-Playwright
- `npm install -D allure-playwright`
- `npm install allure-commandline@latest --save-dev`

## Report with Allure
- View the report by yourself and do not save it: `allure serve allure-results`
- Remove/clean the Allure result/report folder: `rm -rf allure-results allure-report`
- Open Allure report: `allure generate allure-results -o allure-report --clean && allure open allure-report`
