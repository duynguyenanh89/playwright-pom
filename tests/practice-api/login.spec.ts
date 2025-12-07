import { test } from '@playwright/test';
import { registerPracticeAPI, loginPracticeAPI, registerPracticeAPIRandomEmail } from '@/utils/apiHelper';


test.describe('Practice API: @PracticeAPI ', () => {
    test('[PracticeAPI] Register a new account', async ({ request }) => {
        await registerPracticeAPI(request, 'tester0002', 'tester0002@gmail.com', '123456');
    });

    test('[PracticeAPI] Register a new account with random email', async ({ request }) => {
        await registerPracticeAPIRandomEmail(request);
    });

    test('[PracticeAPI] Login to get token', async ({ request }) => {
        await loginPracticeAPI(request);
    });

});