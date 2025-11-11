import { APIRequestContext, expect } from "@playwright/test"
import urls from '@/data/urls.json'
import immediateBookingBody from '@/data/immediate-booking-body.json'
import scheduleBookingBody from '@/data/schedule-booking-body.json'

export async function createImmediateBookingPublicAPI(request: APIRequestContext, apiAuthorization: string) {
    const requestBody = immediateBookingBody
    const response = await request.post(`${urls.api}/${urls.apiEndpoint}`, {
      data: requestBody,
      headers: {
        'Content-Type':'application/json',
        'Authorization': apiAuthorization
      }
    });

    const responseBody = await response.json();
    console.log('--------------------------------------------');
    console.log('Status Code:', response.status());
    console.log('Response Body:', responseBody);
    
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('booking_id');
    const bookingId = responseBody.booking_id;
    console.log('Created IMMEDIATE booking from Public API-v10: ' + bookingId);
    console.log('--------------------------------------------');
    return bookingId;
}

export async function createScheduleBookingPublicAPI(request: APIRequestContext, apiAuthorization: string) {
    const requestBody = scheduleBookingBody
    const response = await request.post(`${urls.api}/${urls.apiEndpoint}`, {
      data: requestBody,
      headers: {
        'Content-Type':'application/json',
        'Authorization': apiAuthorization
      }
    });

    const responseBody = await response.json();
    console.log('--------------------------------------------');
    console.log('Status Code:', response.status());
    console.log('Response Body:', responseBody);
    
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('booking_id');
    const bookingId = responseBody.booking_id;
    console.log('Created SCHEDULE booking from Public API-v10: ' + bookingId);
    console.log('--------------------------------------------');
    return bookingId;
}