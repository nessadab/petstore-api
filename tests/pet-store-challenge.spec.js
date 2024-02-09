const { test, expect } = require('@playwright/test');
const storeData = require('../data/order.json');

test('Adding a new order', async ({ request }) => {
    const response = await request.post('store/order', {
        data: storeData
    });
    let resJson = await response.json();
    let statusJson = resJson.status    
    expect(response.status()).toBe(200);
    expect(statusJson).toBe(storeData.status)
});

test('Get the order created', async ({ request }) => {
    const response = await request.get(`store/order/${storeData.id}`);
    let resJson = await response.json();
    let id = resJson.id    
    expect(response.status()).toBe(200);
    expect(id).toBe(storeData.id)
});

test('Delete the order created', async ({ request }) => {
    const response = await request.delete(`store/order/${storeData.id}`);
    let resJson = await response.json();
    let message = resJson.message
    expect(response.status()).toBe(200);
    expect(message).toBe(storeData.id.toString())
});

test('Confirm that order was deleted', async ({ request }) => {
    const response = await request.get(`store/order/${storeData.id}`);
    expect(response.status()).toBe(404);
});

