import { test, expect } from '@playwright/test';
import { LoginPage } from '@/pages/LoginPage';

test('test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await loginPage.isLogedIn();
});