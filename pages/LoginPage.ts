import {Locator, Page, expect} from '@playwright/test'
import urls from '@/data/urls.json'

export class LoginPage {
    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    //readonly message: Locator
    constructor(page: Page){
        this.page = page
        this.usernameInput = page.locator('#username-input')
        this.passwordInput = page.locator('#password-input')
        this.loginButton = page.getByRole('button', { name: 'Log In' })
    }

    async gotoLoginPage(){
        await this.page.goto(urls.webAppSignin)
    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async isLogedIn(){
        await expect(this.page.getByText('Manage Bookings')).toBeVisible()
    }   
}