import {Locator, Page, expect} from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly message: Locator;


    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.message = page.getByRole('heading', { name: 'Welcome to the Secure Area.' });
    }

    async gotoLoginPage(){
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async isLogedIn(){
        const message = await this.message.textContent();
        console.log(message);
        return await expect(this.message).toBeVisible();
       
    }
}