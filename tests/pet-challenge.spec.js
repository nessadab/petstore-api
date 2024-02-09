const { test, expect } = require('@playwright/test');
const petData = require('../data/pet.json');
const petUpdate = require('../data/updatePet.json');


test('Adding a new pet', async ({ request }) => {
    const response = await request.post('pet', {
        data: petData
    });
    console.log(await response.json());
    expect(response.status()).toBe(200);
});

test('Checking that pet was added', async ({ request }) => {
    const response = await request.get(`pet/${petData.id}`);
    let json = await response.json();
    let petName = petData.name;
    let petNameJson = json.name;
    expect(petNameJson).toBe(petName);
});

test('Updating the pet', async ({ request }) => {
    const response = await request.put('pet', {
        data: petUpdate
    });
    console.log(await response.json());
    expect(response.status()).toBe(200);
});

test('Checking that pet was updated', async ({ request }) => {
    const response = await request.get(`pet/${petUpdate.id}`);
    let json = await response.json();
    let petName = petUpdate.name;
    let petNameJson = json.name;
    expect(petNameJson).toBe(petName);
});


test('Deleting the pet', async ({ request }) => {
    const response = await request.delete(`pet/${petUpdate.id}`);
    expect(response.status()).toBe(200);
});

test('Check that pet was deleted', async ({ request }) => {
    const response = await request.get(`pet/${petUpdate.id}`);
    expect(response.status()).toBe(404);
});