import { APIRequestContext, expect } from "@playwright/test"
import practiceAPI from '@/data/practice-api.json'
import urls from '@/data/urls.json'
import immediateBookingBody from '@/data/immediate-booking-body.json'
import scheduleBookingBody from '@/data/schedule-booking-body.json'
import { nanoid } from 'nanoid';

export async function createImmediateBookingPublicAPI(request: APIRequestContext, apiAuthorization: string) {
  const requestBody = immediateBookingBody
  const response = await request.post(`${urls.api}/${urls.apiEndpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiAuthorization
    },
    data: requestBody

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
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiAuthorization
    },
    data: requestBody

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


export async function registerPracticeAPI(request: APIRequestContext, username: string, email: string, password: string) {
  const response = await request.post(`${practiceAPI.base_url}/users/register`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      "name": username,
      "email": email,
      "password": password
    }

  });

  const responseBody = await response.json();
  console.log('--------------------------------------------');
  console.log('Status Code:', response.status());
  console.log('Response Body:', responseBody);
  console.log('--------------------------------------------');

  expect(response.status()).toBe(201);
}

export async function registerPracticeAPIRandomEmail(request: APIRequestContext) {
  const email = 'User_' + nanoid(9)
  console.log('email: ' + email);
  const response = await request.post(`${practiceAPI.base_url}/users/register`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      "name": email,
      "email": email + '@gmail.com',
      "password": 123456
    }

  });

  const responseBody = await response.json();
  console.log('--------------------------------------------');
  console.log('Status Code:', response.status());
  console.log('Response Body:', responseBody);
  console.log('--------------------------------------------');

  expect(response.status()).toBe(201);
  return email;
}


export async function loginPracticeAPI(request: APIRequestContext) {
  const response = await request.post(`${practiceAPI.base_url}/users/login`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      "email": practiceAPI.email,
      "password": practiceAPI.password
    }

  });

  const responseBody = await response.json();
  console.log('--------------------------------------------');
  console.log('Status Code:', response.status());
  console.log('Response Body:', responseBody);

  expect(response.status()).toBe(200);
  expect(responseBody).toHaveProperty('success');
  const email = responseBody.data.email;
  const token = responseBody.data.token;
  console.log('Login to practice API: ' + email);
  console.log('Login to practice API token: ' + token);
  console.log('--------------------------------------------');
  return token;
}

export async function loginPracticeAPIParams(request: APIRequestContext, username: string, password: string) {
  const response = await request.post(`${practiceAPI.base_url}/users/login`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      "email": username,
      "password": password
    }

  });

  const responseBody = await response.json();
  console.log('--------------------------------------------');
  console.log('Status Code:', response.status());
  console.log('Response Body:', responseBody);

  expect(response.status()).toBe(200);
  expect(responseBody).toHaveProperty('success');
  const email = responseBody.data.email;
  const token = responseBody.data.token;
  console.log('Login to practice API: ' + email);
  console.log('Login to practice API token: ' + token);
  console.log('--------------------------------------------');
  return token;
}