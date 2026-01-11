import { test } from '@playwright/test';
import { registerPracticeAPI, loginPracticeAPI, registerPracticeAPIRandomEmail, loginPracticeAPIParams } from '@/utils/apiHelper';


test.describe('Practice API: @PracticeAPI ', () => {
    test('[PracticeAPI] Register a new account @PracticeAPI-1', async ({ request }) => {
        await registerPracticeAPI(request, 'tester0003', 'tester0003@gmail.com', '123456');
    });

    test('[PracticeAPI] Register a new account with random email @PracticeAPI-2', async ({ request }) => {
        await registerPracticeAPIRandomEmail(request);
    });

    test('[PracticeAPI] Login to get token @PracticeAPI-3', async ({ request }) => {
        await loginPracticeAPI(request);
    });

    test('[PracticeAPI] Login with Params to get token @PracticeAPI-4', async ({ request }) => {
        await loginPracticeAPIParams(request, 'tester0002@gmail.com','123456');
    });

});