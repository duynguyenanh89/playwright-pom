import { test, expect } from '@playwright/test'
import { LoginPage } from '@/pages/LoginPage'
import credentials from '@/data/credentials.json'

test('Login with username and password @Login-WebApp', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.gotoLoginPage()
    await loginPage.login (credentials.customer['customer-daniel-01'].username, credentials.customer['customer-daniel-01'].password)
    await loginPage.isLogedIn()
});