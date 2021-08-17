const getCakes = require('./getCakes');

test('returns array', async()=>{
    expect(await getCakes()).toEqual(expect.any(Array))
});

test('returns cake(s) in array', async()=>{
    const response = await getCakes();
    const firstRecord = response[0];
    expect(firstRecord).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        comment: expect.any(String),
        yumFactor: expect.any(Number),
        imageUrl: expect.any(String),
    });
});