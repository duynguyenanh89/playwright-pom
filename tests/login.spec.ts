import { test, expect } from '@playwright/test';
import { LoginPage } from '@/pages/LoginPage';
import credentials from '@/data/credentials.json';

test('Login with username and password @Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login(credentials.customer['customer-test-01'].username, credentials.customer['customer-test-01'].password);
    await loginPage.isLogedIn();
});



