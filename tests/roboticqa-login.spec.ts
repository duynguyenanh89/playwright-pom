import { test, expect } from '@playwright/test';

test.describe('RoboticQA Login Tests', () => {
  test('login with standard_user credentials', async ({ page }) => {
    // Navigate to the application
    await page.goto('https://roboticqa.com/', { waitUntil: 'networkidle', timeout: 30000 });

    // Verify login page is loaded
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();

    // Fill username field
    const usernameField = page.getByRole('textbox', { name: /Username or Email/i });
    await usernameField.fill('standard_user');

    // Fill password field
    const passwordField = page.getByRole('textbox', { name: /Password/i });
    await passwordField.fill('password123');

    // Click Sign In button
    const signInButton = page.getByRole('button', { name: /Sign In/i });
    await signInButton.click();

    // Wait for navigation to home page
    await page.waitForURL('**/');
    await page.waitForLoadState('networkidle');

    // Verify successful login
    await expect(page.getByRole('heading', { name: 'Practice E-commerce Site' })).toBeVisible({ timeout: 10000 });

    // Verify user is logged in - check for username button in header
    await expect(page.getByRole('button', { name: 'standard_user' })).toBeVisible();

    // Verify success message is shown
    const successNotification = page.locator('text=You\'ve successfully logged in.').first();
    await expect(successNotification).toBeVisible({ timeout: 5000 });
  });
});
