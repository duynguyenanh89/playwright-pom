import { test } from '@playwright/test';
import { createImmediateBookingPublicAPI, createScheduleBookingPublicAPI } from '@/utils/apiHelper';
import credentials from '@/data/credentials.json';


test.describe(`Public API-v10: `, () => {
  test('[Public API] Create an IMMEDIATE booking', async ({ request }) => {
    await createImmediateBookingPublicAPI(request, credentials.apiAuthorization['apiAuthorization-daniel-01'].apiAuthorization);
  });

  test('[Public API] Create an SCHEDULE booking', async ({ request }) => {
    await createScheduleBookingPublicAPI(request, credentials.apiAuthorization['apiAuthorization-daniel-01'].apiAuthorization);
  });

});
 