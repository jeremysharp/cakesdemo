const deleteCake = require('./deleteCake')
const saveCake = require('./saveCake')

const TEST_CAKE = {
    name: 'Test Cake',
    comment: 'A test cake object',
    yumFactor: 1,
    imageUrl: '99999-test.jpg',
    id: 99999
};



test('deleting non-existant cake returns error', async () => {
    await expect(deleteCake(56416541684654654))
    .rejects
    .toThrow('not found');
})

it('deleting cake by id returns ok', async () => {
    await saveCake(TEST_CAKE)
    expect(await deleteCake(99999)).toMatch(/removed data/);
})
