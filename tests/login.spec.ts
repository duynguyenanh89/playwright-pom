import { test, expect } from '@playwright/test';
import { LoginPageHeroku } from '@/pages/LoginPage-Heroku';
import credentials from '@/data/credentials.json';

test('Login with username and password @LoginHeroku', async ({ page }) => {
    const loginPage = new LoginPageHeroku(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(credentials.customer['customer-test-01'].username, credentials.customer['customer-test-01'].password);
    await loginPage.isLogedIn();
});



