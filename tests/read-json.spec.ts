import credentials from '@/data/credentials.json';
import {test} from '@playwright/test';

test('Print Json data file @Regression', async ({ }) => {
    console.log(credentials.customer['customer-test-01'].username);
    console.log(credentials.customer['customer-test-01'].password);
});