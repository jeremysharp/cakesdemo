const saveImage = require('./saveImage');
//const testFile = require('../../../test-image.json');
const fs = require('fs');
const path = require('path');
test('save image returns ok', async () => {
    const image = fs.readFileSync(path.join(process.cwd(), 'data/images/image-for-unit-tests.jpeg'));
    expect(await saveImage({ id: 999999, image: { name: 'test.jpeg', data: image } })).toEqual(true);
});
