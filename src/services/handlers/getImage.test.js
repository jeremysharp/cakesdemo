const getImage = require('./getImage');
const testFile = require('../../../test-image.json');

test('image served correctly', async() => {
    const imageFile = await getImage('image-for-unit-tests.jpeg')
    const fileCode = imageFile.toString('base64')
    expect(fileCode).toEqual(testFile.base64)
})
