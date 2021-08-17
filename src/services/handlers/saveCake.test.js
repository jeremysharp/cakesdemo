const saveCake = require('./saveCake');
const deleteCake = require('./deleteCake')
let TEST_CAKE = {
    name: 'Test Cake',
    comment: 'A test cake object',
    yumFactor: 1,
    imageUrl: 'test.jpg'
};

let id;

afterAll(() => {
  deleteCake(id)
});

test('save new cake object and modify object returns new id', async() => {
    const response = await saveCake(TEST_CAKE)
    expect(response).toEqual(expect.any(Number))
    id = response
    TEST_CAKE = {...TEST_CAKE, id, comment: 'changed comment'}
    expect(await saveCake(TEST_CAKE)).toEqual(expect.any(Number))

})

