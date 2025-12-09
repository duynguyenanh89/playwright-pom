## Playwright Project

## Overview
This is a Playwright project for automated testing, supporting multiple environments (dev, stg, test) with a modular and reusable structure.

## Project Structure
playwright-project/
├── data/
│   ├── credentials.json
│   ├── urls.json
├── files/
│   ├── sample.pdf
│   ├── image.png
│   ├── batch-upload.csv
├── pages/
│   ├── api
│   ├── fleet
│   ├── wallee
│   ├── webadmin
│   ├── webapp
│   │   ├── signup-page.ts
├── scripts/
│   ├── run-tests.sh
├── tests/
│   ├── api/
│   │   ├── create-booking/
│   │   │   ├── api-create-immediate-booking.spec.ts
│   │   │   └── api-create-schedule-booking.spec.ts
│   ├── fleet/
│   │   ├── auth/
│   │   │   ├── fleet-signin.spec.ts
│   ├── wallee/
│   │   ├── auth/
│   │   │   ├── wallee-signin.spec.ts
│   ├── webadmin/
│   │   ├── auth/
│   │   │   ├── webadmin-signin.spec.ts
│   │   ├── create-booking/
│   │   │   ├── webadmin-create-immediate-booking.spec.ts
│   │   │   └── webadmin-create-schedule-booking.spec.ts
│   ├── webapp/
│   │   ├── auth/
│   │   │   ├── webapp-signin.spec.ts
│   │   │   └── webapp-signup.spec.ts
│   │   ├── create-booking/
│   │   │   ├── webapp-create-immediate-booking.spec.ts
│   │   │   └── webapp-create-schedule-booking.spec.ts
├── types/
│   ├── account.d.ts
│   ├── env.d.ts
├── utils/
│   ├── auth.ts
│   ├── common.ts
│   ├── config-loader.ts
│   ├── config.ts
├── .gitignore
├── Jenkinsfile
├── package.json
├── README.md
└── playwright.config.ts


## install supported browsers
  `npx playwright install`

## Check playwright version
  `npx playwright --version`

## Install Playwright latest version
  `npm install playwright@latest`

## Add dependency and install browsers.
  `npm i -D @playwright/test`


## Running with Environments
- Dev11:    
    MacOS:  `ENV=dev11 npx playwright test`     
    Windows(PowerShell): `$env:ENV="dev11"; npx playwright test`
    Windows(Command Prompt): `set ENV=dev11 && npx playwright test`
- Staging:  `ENV=staging npx playwright test`
- Test: `ENV=test npx playwright test`


## Running
- Run with Codegen: `npx playwright codegen`
- Run specific test suite:  `npx playwright test <file_name>.spec.ts`
- Run test suite many times: 
  Sequential Run
    `for i in {1..5}; do ENV=stg npx playwright test tests/webapp/auth/webapp-signin.spec.ts; done`
  Parallel Run
    `ENV=stg npx playwright test tests/webapp/auth/webapp-signin.spec.ts --repeat-each 3`
- Run specific test case:  `npx playwright test -g "@Smoke" `
                           `npx playwright test -g "@Smoke|@Regression"`
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

###### Coding Conventions
To ensure consistency, maintainability, and collaboration across the team, please adhere to the following coding conventions:

### 1. General Principles
- **Write clean code**: Prioritize readability and simplicity. Avoid overcomplicating logic.
- **Follow DRY (Don't Repeat Yourself)**: Reuse "auth, common" where possible.
- **Use TypeScript**: Leverage TypeScript for type safety and better IDE support.
- **Document code**: Add comments for complex logic or non-obvious implementations.
- **Keep security in mind**: Never hardcode sensitive data (e.g., passwords, API keys) in the codebase.


### 2. Naming Conventions
- **Folder / File / Test Suite** : use `kebab-case`
  Ex: `tests/web-admin/`, `user-authentication.spec.ts`

- **Test Suite description** : use `sentence case`
  Ex:  test.describe(`Login with valid credentials on webapp`, () => {}

- **Test Case name** : use `sentence case`
  Ex:  test(`Should display error message on the invalid login`, async () => {});

- **Function** : use `camelCase`
  Ex:  async function `loginUser` (page, username, password) {}
       async function `verifyErrorMessage` (page, expectedMessage) {}

- **Variable** : use `camelCase`
  Ex:  const `loginButton` = await page.locator('#login-btn');
       const `errorMessage` = 'Invalid credentials';

- **Class** : use `PascalCase`
  Ex:  class `LoginPage` {
          async navigateTo() {}}
       class `UserProfile` {
          constructor(page) {
          this.page = page;}}

- **Interfaces** : use `PascalCase`
  Ex:  interface `LoginCredentials` {
          username: string;
          password: string;
        }   

### 3. Code Formatting
- **Use Prettier**: Run `npm run format` to format code consistently (configured in `.prettierrc`).
- **Use ESLint**: Run `npm run lint` to catch potential issues (configured in `.eslintrc.json`).
- **Indentation**: Use 2 spaces for indentation.
- **Line length**: Keep lines under 100 characters for readability.
- **Semicolons**: Always use semicolons to terminate statements.
- **Quotes**: Use single quotes (`'`) for strings unless template literals are required.


### 4. TypeScript Conventions
- **Explicit types**: Always define types for function parameters and return values.
- **Avoid `any`**: Use specific types or interfaces instead of `any`.
- **Use interfaces for complex objects**: Define interfaces in the same file.
- **Organize imports**:
  - Group imports: External libraries first, then internal modules.
  - Example:
    ```typescript
    import { test, expect } from '@playwright/test';
    import config from '../data.config.json' assert { type: 'json' };
    ```

### 5. Playwright Test Writing
- **Descriptive test names**: Use `test.describe` for test suites and clear test names.
- **Example:** `test('should login successfully with valid credentials', ...)`.
- **Use page object model (POM) when applicable**: Create page objects in `utils/pages/` for complex pages.
- **Avoid hardcoding selectors**
- **Use fixtures for reusable setup**: Define fixtures in `data/fixtures/` for common actions like login.
- **Handle async/await properly**: Always `await` Playwright methods and handle errors.
- **Group tests by functionality**: Organize tests in `tests/api/`, `tests/webapp/auth`, or `tests/webapp/create-booking`


### 6. Environment and Data Management
- **Use environment variables**: Store environment-specific configs in `config/env/` (e.g., `dev.env`).
- **Manage test data**: Store test data in `data/test-data/` (JSON or CSV) and accounts in `data/accounts/`.
- **Secure sensitive data**: Never commit `accounts.production.json` or `.env` files to Git.


### 7. Git and Collaboration
- **Commit messages**: Use clear, descriptive commit messages.
  - Example: `Add login test for admin account in dev environment`.
- **Branching**:
  - Use `feature/<feature-name>` for new features.
  - Use `bugfix/<issue-id>` for bug fixes.
  - Merge to `develop` for integration, then `main` for production-ready code.
- **Pull requests**:
  - Include a description of changes and link to any related issues.
  - Ensure tests pass before merging.
- **Avoid conflicts**: Regularly pull updates from `develop` to your feature branch.
- **More details, please refer the GIT workflow guide on the Confluence** 
(https://inspirelabs.atlassian.net/wiki/spaces/PDC/pages/1628897369/GIT+Workflow+Guide+-+Deliveree+Playwright+Project) 


### 8. Error Handling and Logging
- **Use Playwright's expect**: Prefer `expect` assertions for clear failure messages.
- **Log meaningfully**: Add console logs for debugging but avoid excessive logging in production tests.
- **Handle failures gracefully**: Use `try/catch` for API calls or critical steps if needed.


### 9. Example Code
Below is an example of a well-structured test file adhering to these conventions:

```typescript
import { expect, test } from '@playwright/test';
import { getConfig } from '../../../utils/config';
import { signinWebAdmin } from '../../../utils/auth';
  
test.describe(`Sign in the WebAdmin `, () => {
  test('Sign in the WebAdmin by using a cookies', async ({ page, context }) => {
    const config = await getConfig();
    const cookies = config.account.webadminCookies;

    await page.goto(config.envConfig.webadminSignin);
    await page.waitForLoadState('load');
    await context.addCookies(cookies); 
    await page.reload();
    await page.waitForLoadState('load');
    await expect(page.getByRole('heading', { name: ' Bookings' })).toBeVisible();
    console.log('--------------------------------------------');
    console.log('Sign in the WebAdmin was successful!');
    console.log('--------------------------------------------');
    await page.waitForLoadState('load');
  });

  test('Sign in the WebAdmin by calling an auth function ', async ({page, context}) => {
      await signinWebAdmin ({page, context}); 
  });
});
```

## Contributing
- Follow the coding conventions above.
- Discuss major changes in the team before implementing.
- Update this README if new conventions are added.

## Contact
For any questions, reach out to the `Daniel Nguyen (daniel.nguyen@deliveree.com)` or `QC Team`.