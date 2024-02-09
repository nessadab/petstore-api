const { test, expect } = require('@playwright/test');
const petData = require('../data/pet.json');

test('Adding a new available pet', async ({ request }) => {
    const response = await request.post('pet', {
        data: petData
    });
    console.log(await response.json());
    expect(response.status()).toBe(200);
});

test('Checking that pet was added successfully', async ({ request }) => {
    const response = await request.get(`pet/${petData.id}`);
    let json = await response.json();
    let petName = petData.category.name;
    let petNameJson = json.category.name;
    console.log(petName);
    console.log(petNameJson);
    expect(petNameJson).toBe(petName);
});

