import { test } from '@playwright/test';
import { createImmediateBookingPublicAPI, createScheduleBookingPublicAPI } from '@/utils/apiHelper';
import credentials from '@/data/credentials.json';


test.describe('Public API-v10: @PublicAPI ', () => {

  test('[Public API][NonBP] Create an IMMEDIATE booking', async ({ request }) => {
    await createImmediateBookingPublicAPI(request, credentials.apiAuthorization['apiAuthorization-nonbp-17740'].apiAuthorization);
  });

  test('[Public API][NonBP] Create a SCHEDULE booking', async ({ request }) => {
    await createScheduleBookingPublicAPI(request, credentials.apiAuthorization['apiAuthorization-nonbp-17740'].apiAuthorization);
  });

  test('[Public API][BP] Create an IMMEDIATE booking', async ({ request }) => {
    await createImmediateBookingPublicAPI(request, credentials.apiAuthorization['apiAuthorization-bp-63'].apiAuthorization);
  });

  test('[Public API][BP] Create a SCHEDULE booking', async ({ request }) => {
    await createScheduleBookingPublicAPI(request, credentials.apiAuthorization['apiAuthorization-bp-63'].apiAuthorization);
  });

});
 